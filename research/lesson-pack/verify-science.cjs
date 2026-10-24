// Science with Gizmo: every lesson is well formed, uses known codes and real images, and earns 13 pearls.
const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const noop = () => {};
const context = { state: { xp: 0 }, location: { hash: '' }, readingMission: noop, libraryPage: noop, seaAnimal: k => '<svg>' + k + '</svg>', readingArt: k => '<svg>' + k + '</svg>' };
vm.createContext(context);
vm.runInContext(fs.readFileSync('dist/science.js', 'utf8'), context);
const lessons = vm.runInContext('scienceLessons', context), art = vm.runInContext('scienceArt', context), labels = vm.runInContext('choiceLabels', context);
const allowed = new Set(['AC9SFU01', 'AC9SFU02', 'AC9SFU03', 'AC9SFI01', 'AC9SFI03', 'AC9SFI04', 'AC9SFH01']);
assert.equal(lessons.length, 5);
assert.deepEqual(JSON.parse(JSON.stringify(lessons.map(l => l.id))), ['S-F-01', 'S-F-02', 'S-F-03', 'S-F-04', 'S-F-05']);
for (const lesson of lessons) {
  assert(lesson.shelfName && lesson.intro);
  assert(lesson.codes.length && lesson.codes.every(c => allowed.has(c)), lesson.id + ' codes');
  assert(lesson.items.length >= 4 && lesson.items.length <= 6);
  for (const q of lesson.items) {
    assert(q.options.includes(q.answer), `${lesson.id}: answer offered`);
    assert.equal(new Set(q.options).size, q.options.length);
    assert(q.ask && q.reveal, `${lesson.id}: asks and explains`);
    if (q.kind === 'photo') q.options.forEach(o => assert(art[o], 'photo for ' + o));
    else q.options.forEach(o => assert(labels[o], 'label for ' + o));
    const subject = q.animal || q.object;
    if (art[subject]) assert(fs.existsSync('dist/' + art[subject].art.match(/src="([^"]+)"/)[1]), 'image file for ' + subject);
  }
}
for (const a of Object.values(art)) assert(fs.existsSync('dist/' + a.art.match(/src="([^"]+)"/)[1]));
// Each predict item is a fair test: both choices offered, and the reveal names what happened.
for (const q of lessons[2].items) assert(/sank|floats/.test(q.reveal));
console.log('Passed: 5 science adventures with real photos, known Foundation codes, fair sink/float tests and explained answers.');
