// Every script, style and the manifest that index.html loads must be in sw.js's offline list,
// and everything in that list must exist, or the app breaks offline (or the install fails).
const fs = require('fs'), path = require('path');
const D = path.join(__dirname, '../../dist');
const html = fs.readFileSync(path.join(D, 'index.html'), 'utf8');
const sw = fs.readFileSync(path.join(D, 'sw.js'), 'utf8');
const needed = [...html.matchAll(/(?:src|href)="([^"#:]+\.(?:js|css|webmanifest))"/g)].map(m => m[1]);
const listed = [...sw.matchAll(/'\.\/([^']+)'/g)].map(m => m[1]).filter(Boolean);
const missing = needed.filter(n => !listed.includes(n));
const gone = listed.filter(f => !fs.existsSync(path.join(D, f)));
if (missing.length || gone.length) {
  console.error('Offline list out of date.', { 'not in sw.js': missing, 'in sw.js but no such file': gone });
  process.exit(1);
}
console.log(`Passed: all ${needed.length} scripts and styles are in the offline list, and every listed file exists.`);
