// Finds definitions that are replaced later in load order without anything keeping the old version.
const fs = require('fs'), acorn = require('acorn'), walk = require('acorn-walk');
const html = fs.readFileSync('dist/index.html', 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
const ev = {}; // name -> [{file, line, kind, size}]
const add = (n, e) => (ev[n] = ev[n] || []).push(e);
for (const f of scripts) {
  const src = fs.readFileSync('dist/' + f, 'utf8');
  const ast = acorn.parse(src, { ecmaVersion: 'latest', locations: true });
  for (const n of ast.body) {
    if (n.type === 'FunctionDeclaration') add(n.id.name, { f, line: n.loc.start.line, kind: 'def', size: n.end - n.start });
    if (n.type === 'ExpressionStatement' && n.expression.type === 'AssignmentExpression' && n.expression.left.type === 'Identifier' && /Function/.test(n.expression.right.type))
      add(n.expression.left.name, { f, line: n.loc.start.line, kind: 'def', size: n.end - n.start });
    if (n.type === 'VariableDeclaration') for (const d of n.declarations) if (d.init?.type === 'Identifier') add(d.init.name, { f, line: d.loc.start.line, kind: 'capture' });
  }
  // captures inside functions that read the name and store it (rare): any `= name` where name later redefined
}
for (const [name, list] of Object.entries(ev)) {
  const defs = list.filter(e => e.kind === 'def');
  if (defs.length < 2) continue;
  list.forEach((e, i) => {
    if (e.kind !== 'def') return;
    const next = list.slice(i + 1);
    const nextDef = next.findIndex(x => x.kind === 'def');
    if (nextDef < 0) return;
    const captured = next.slice(0, nextDef).some(x => x.kind === 'capture');
    if (!captured) console.log(`SHADOWED ${name}\t${e.f}:${e.line}\t${e.size} bytes\t-> replaced by ${next[nextDef].f}:${next[nextDef].line}`);
  });
}
