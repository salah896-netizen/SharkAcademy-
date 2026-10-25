// Lists top-level functions and constants in dist/*.js that nothing else uses.
// Usage: NODE_PATH=/opt/npm-tools/node_modules node research/architecture/deadcode.cjs
const fs = require('fs'), path = require('path'), acorn = require('acorn');
const D = path.join(__dirname, '../../dist');
const files = fs.readdirSync(D).filter(f => f.endsWith('.js') && !['voice-manifest.js', 'shark-photos.js', 'sw.js'].includes(f));
const html = fs.readFileSync(path.join(D, 'index.html'), 'utf8');
const sources = Object.fromEntries(files.map(f => [f, fs.readFileSync(path.join(D, f), 'utf8')]));
const decls = [];
for (const [f, src] of Object.entries(sources)) {
  const ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script' });
  for (const node of ast.body) {
    if (node.type === 'FunctionDeclaration') decls.push([node.id.name, f]);
    if (node.type === 'VariableDeclaration')
      for (const d of node.declarations) if (d.id.type === 'Identifier') decls.push([d.id.name, f]);
  }
}
const all = Object.values(sources).join('\n') + html;
const unused = decls.filter(([name]) => (all.match(new RegExp('\\b' + name.replace('$', '\\$') + '\\b', 'g')) || []).length <= 1);
console.log(JSON.stringify(unused, null, 0));
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
console.log('scripts not loaded by index.html:', files.filter(f => !scripts.includes(f)));
const css = fs.readdirSync(D).filter(f => f.endsWith('.css'));
console.log('css not linked:', css.filter(c => !html.includes(c)));
