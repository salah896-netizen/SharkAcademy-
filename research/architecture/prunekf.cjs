const fs = require('fs'), postcss = require('postcss');
const files = fs.readdirSync('dist').filter(f => f.endsWith('.css'));
const js = fs.readdirSync('dist').filter(f => f.endsWith('.js')).map(f => fs.readFileSync('dist/' + f, 'utf8')).join('\n');
let n = 0;
for (let pass = 0; pass < 2; pass++) for (const f of files) {
  const others = files.map(g => fs.readFileSync('dist/' + g, 'utf8')).join('\n').replace(/@keyframes\s+[\w-]+/g, '') + js;
  const root = postcss.parse(fs.readFileSync('dist/' + f, 'utf8'));
  root.walkAtRules(/keyframes$/, a => { if (!new RegExp('\\b' + a.params.trim() + '\\b').test(others)) { a.remove(); n++; } });
  fs.writeFileSync('dist/' + f, root.toString());
}
console.log('keyframes removed', n);
