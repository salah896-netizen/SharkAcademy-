// One-off cleanup (25 Oct): removes unused functions/aliases and the old automatic-dive styles.
const fs = require('fs'), acorn = require('acorn');
const D = __dirname + '/../../dist/';
function dropFunctions(file, names) {
  let src = fs.readFileSync(D + file, 'utf8');
  const ast = acorn.parse(src, { ecmaVersion: 'latest' });
  const cuts = [];
  for (const node of ast.body) {
    if (node.type === 'FunctionDeclaration' && names.includes(node.id.name)) cuts.push([node.start, node.end]);
    if (node.type === 'VariableDeclaration' && node.declarations.length > 1) {
      const keep = node.declarations.filter(d => !names.includes(d.id.name));
      if (keep.length !== node.declarations.length) {
        const text = node.kind + ' ' + keep.map(d => src.slice(d.start, d.end)).join(',\n  ') + ';';
        cuts.push([node.start, node.end, text]);
      }
    }
  }
  cuts.sort((a, b) => b[0] - a[0]).forEach(([s, e, text = '']) => (src = src.slice(0, s) + text + src.slice(e)));
  fs.writeFileSync(D + file, src.replace(/\n{3,}/g, '\n\n'));
  return cuts.length;
}
console.log('atmosphere', dropFunctions('atmosphere.js', ['inlineOceanLesson']));
console.log('crew', dropFunctions('crew.js', ['cinemaPortal']));
console.log('ocean-experience', dropFunctions('ocean-experience.js', ['showDiveOpening', 'oldHome', 'oldStart', 'oldEncourage', 'oldSpeak']));
// CSS: drop rules whose every selector belongs to the retired automatic dive.
const dead = /#diveOpening|\.dive-|depth-creature|passing-sub|passing-diver|#skipDive/;
function dropCss(file) {
  const css = fs.readFileSync(D + file, 'utf8');
  let out = '', i = 0, removed = 0;
  function block(text) {
    let res = '', pos = 0;
    while (pos < text.length) {
      const open = text.indexOf('{', pos);
      if (open < 0) { res += text.slice(pos); break; }
      let depth = 1, j = open + 1;
      while (depth && j < text.length) { if (text[j] === '{') depth++; else if (text[j] === '}') depth--; j++; }
      const head = text.slice(pos, open), body = text.slice(open + 1, j - 1);
      const selector = head.trim();
      if (selector.startsWith('@media') || selector.startsWith('@supports')) {
        const inner = block(body);
        res += inner.trim() ? head + '{' + inner + '}' : '';
      } else if (!selector.startsWith('@') && selector.split(',').every(s => dead.test(s))) {
        removed++;
        // keep leading comments/whitespace before the selector, drop the rule
        res += head.slice(0, head.length - head.trimStart().length);
      } else res += head + '{' + body + '}';
      pos = j;
    }
    return res;
  }
  out = block(css);
  fs.writeFileSync(D + file, out.replace(/\n{3,}/g, '\n\n'));
  return removed;
}
for (const f of fs.readdirSync(D).filter(f => f.endsWith('.css'))) {
  const n = dropCss(f);
  if (n) console.log(f, 'removed rules', n);
}
