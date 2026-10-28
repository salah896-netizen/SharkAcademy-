const fs = require('fs'), postcss = require('postcss'), sp = require('postcss-selector-parser');
const dead = new Set(fs.readFileSync('/tmp/claude-0/nodetools/dead-names.txt', 'utf8').split('\n').filter(Boolean));
let removedRules = 0, trimmed = 0, before = 0, after = 0;
for (const f of fs.readdirSync('dist').filter(f => f.endsWith('.css'))) {
  const src = fs.readFileSync('dist/' + f, 'utf8'); before += src.length;
  const root = postcss.parse(src);
  root.walkRules(rule => {
    if (rule.parent?.type === 'atrule' && /keyframes/.test(rule.parent.name)) return;
    const keep = rule.selectors.filter(sel => {
      let bad = false;
      sp(s => s.walk(n => { if ((n.type === 'class' || n.type === 'id') && dead.has(n.value)) bad = true; })).processSync(sel);
      return !bad;
    });
    if (!keep.length) { rule.remove(); removedRules++; }
    else if (keep.length < rule.selectors.length) { rule.selectors = keep; trimmed++; }
  });
  root.walkAtRules(a => { if (a.nodes && !a.nodes.length) a.remove(); });
  const out = root.toString(); after += out.length;
  if (out !== src) fs.writeFileSync('dist/' + f, out);
}
console.log({ removedRules, trimmed, bytesSaved: before - after });
