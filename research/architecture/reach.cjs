// Reachability over top-level names. A definition's body counts only if that definition is live
// (not shadowed). Over-approximates liveness: any identifier mention keeps a name alive.
const fs = require('fs'), acorn = require('acorn'), walk = require('acorn-walk');
const html = fs.readFileSync('dist/index.html', 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
const SHADOWED = new Set(process.argv.slice(2)); // "file:line"
const defs = {}; // name -> [{f,line,node}]
const roots = []; // nodes always executed
const ids = node => { const s = new Set(); walk.full(node, n => { if (n.type === 'Identifier') s.add(n.name); }); return s; };
for (const f of scripts) {
  const ast = acorn.parse(fs.readFileSync('dist/' + f, 'utf8'), { ecmaVersion: 'latest', locations: true });
  for (const n of ast.body) {
    const key = f + ':' + n.loc.start.line;
    const dead = SHADOWED.has(key);
    if (n.type === 'FunctionDeclaration') { (defs[n.id.name] ||= []).push({ key, body: dead ? null : n, size: n.end - n.start }); continue; }
    if (n.type === 'VariableDeclaration') {
      for (const d of n.declarations) {
        if (d.id.type !== 'Identifier') { roots.push(d); continue; }
        const lazy = d.init && /Function|Literal|TemplateLiteral|ObjectExpression|ArrayExpression/.test(d.init.type) && !hasCall(d.init);
        (defs[d.id.name] ||= []).push({ key: f + ':' + d.loc.start.line, body: d.init, size: d.end - d.start, lazy });
        if (d.init && !lazy) roots.push(d.init);
      }
      continue;
    }
    if (n.type === 'ExpressionStatement' && n.expression.type === 'AssignmentExpression' && n.expression.left.type === 'Identifier' && /Function/.test(n.expression.right.type)) {
      (defs[n.expression.left.name] ||= []).push({ key, body: dead ? null : n.expression.right, size: n.end - n.start }); continue;
    }
    roots.push(n);
  }
}
function hasCall(node) { let c = false; walk.full(node, n => { if ((n.type === 'CallExpression' || n.type === 'NewExpression') && !insideFn(node, n)) c = true; }); return c; }
function insideFn(root, target) { let inside = false; walk.ancestor(root, { CallExpression(n, anc) { if (n === target) inside = anc.some(a => a !== root && /Function/.test(a.type)); }, NewExpression(n, anc) { if (n === target) inside = anc.some(a => a !== root && /Function/.test(a.type)); } }); return inside; }
const live = new Set(), queue = [];
const touch = s => { for (const name of s) if (defs[name] && !live.has(name)) { live.add(name); queue.push(name); } };
touch(new Set([...html.matchAll(/\b[a-zA-Z_$][\w$]*\b/g)].map(m => m[0])));
for (const r of roots) touch(ids(r));
while (queue.length) for (const d of defs[queue.shift()]) if (d.body) touch(ids(d.body));
let total = 0;
for (const [name, list] of Object.entries(defs)) if (!live.has(name)) { const sz = list.reduce((a, d) => a + d.size, 0); total += sz; console.log(`DEAD ${name}\t${list.map(d => d.key).join(', ')}\t${sz}`); }
console.log('dead bytes', total);
