const fs = require('fs');
const js = fs.readdirSync('dist').filter(f => f.endsWith('.js')).map(f => fs.readFileSync('dist/' + f, 'utf8')).join('\n') + fs.readFileSync('dist/index.html', 'utf8');
const tokens = new Set(js.match(/[A-Za-z_][\w-]*/g));
// dynamic prefixes: `foo-${` or 'foo-' +
const dyn = [...js.matchAll(/([a-z][\w-]*-)(?:\$\{|['"]\s*\+)/g)].map(m => m[1]);
const report = {};
for (const f of fs.readdirSync('dist').filter(f => f.endsWith('.css'))) {
  const css = fs.readFileSync('dist/' + f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const names = new Set([...css.matchAll(/(?<![\w-])\.(-?[A-Za-z_][\w-]*)|#([A-Za-z_][\w-]*)(?=[^;{}]*\{)/g)].map(m => m[1] || m[2]).filter(n => n && !/^[0-9a-f]{3,8}$/i.test(n)));
  for (const n of names) if (!tokens.has(n) && !dyn.some(p => n.startsWith(p))) (report[f] ||= []).push(n);
}
let total = 0;
for (const [f, l] of Object.entries(report)) { total += l.length; console.log(f + ' (' + l.length + '): ' + l.join(' ')); }
console.log('unused selector names:', total);
