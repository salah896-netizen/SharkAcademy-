// Checks the school-aligned batch: lesson data, sequencing, maths generation and pearl totals.
const fs = require('node:fs'),
  vm = require('node:vm'),
  assert = require('node:assert/strict');
const allowedCodes = new Set([
  'AC9EFLY04',
  'AC9EFLY05',
  'AC9EFLY09',
  'AC9EFLY10',
  'AC9EFLY12',
  'AC9EFLY14',
  'AC9E1LY11',
  'AC9MFN01',
  'AC9MFN02',
  'AC9MFN03',
  'AC9MFN04',
  'AC9MFN05',
  'AC9MFN06',
  'AC9MFA01'
]);
const context = {
  state: { history: [], completed: [], discoveries: [], readingAdventures: [], xp: 0 },
  location: { hash: '#play' },
  render() {},
  Date,
  stageFor: () => 1,
  makeQuestions: () => ['existing'],
  play() {},
  finish() {},
  writing() {},
  advanceLearning() {
    return true;
  },
  libraryPage() {},
  crewForRoute() {
    return null;
  },
  oceanSpecies: [
    'salmon',
    'tuna',
    'squid',
    'crab',
    'barracuda',
    'turtle',
    'blue-tang',
    'clownfish',
    'hammerhead'
  ],
  seaAnimal: k => `<svg data-kind="${k}"></svg>`,
  shuffled: x => [...x].reverse(),
  sharkBook: [
    { id: 'whale', image: 'whale.jpg', name: 'Whale shark', source: 's', facts: [['a', 'b']] }
  ],
  save() {},
  learningState: () => ({ maths: { baseline: 0 } }),
  app: { querySelector: () => null }
};
vm.createContext(context);
// app.js pearl rule, extracted so the test doesn't need a browser.
const appSource = fs.readFileSync('dist/app.js', 'utf8');
const pearlRule = appSource.slice(
  appSource.indexOf('const PEARLS'),
  appSource.indexOf('function save()')
);
vm.runInContext(pearlRule, context);
for (const f of ['reading-adventure.js', 'lesson-pack.js', 'school-pack.js'])
  vm.runInContext(fs.readFileSync('dist/' + f, 'utf8'), context);

// Pearls: every adventure totals 13, whatever its number of steps.
for (const steps of [3, 4, 5]) {
  const total = vm.runInContext(
    `pearlsPerStep(${steps}) * ${steps} + pearlCompletionBonus(${steps})`,
    context
  );
  assert.equal(total, 13, `adventure with ${steps} steps`);
}
assert.equal(vm.runInContext('PEARLS.extra', context), 3);

// Reading library: 14 lessons in the agreed interleaved order, every clue well formed.
const library = vm.runInContext('readingMissionLibrary', context);
assert.equal(library.length, 16);
assert.deepEqual(
  library.map(l => l.id),
  vm.runInContext('readingOrder', context)
);
const pictureKeys = new Set();
for (const lesson of library) {
  assert(lesson.shelfName, lesson.id + ' has a shelf name');
  assert.equal(lesson.items.length, 4);
  for (const q of lesson.items) {
    assert(q.options.includes(q.answer), `${lesson.id} ${q.word}: answer offered`);
    assert.equal(new Set(q.options).size, 3, `${lesson.id} ${q.word}: three different choices`);
    assert(q.codes.length && q.codes.every(c => allowedCodes.has(c)), `${lesson.id}: known codes`);
    assert(q.reveal && q.prompt && q.hint);
    if (lesson.school) q.options.forEach(k => pictureKeys.add(k));
    if (q.kind === 'read' && q.sounds)
      assert.equal(q.sounds.join(''), q.word, `${q.word} sound tiles spell the word`);
    if (q.kind === 'read')
      assert(
        !q.prompt.toLowerCase().includes(q.word.toLowerCase()),
        'reading prompts never say the word'
      );
    if (q.kind === 'blend')
      q.parts.forEach(p => assert(!/^[bdgkpt]/.test(p), 'blend onsets are stretchy sounds'));
  }
}
// Every picture used by a new lesson has real artwork (no emoji fallback).
for (const key of pictureKeys) {
  const art = context.readingArt(key);
  assert(art.startsWith('<svg'), 'artwork for ' + key);
}
// Rotation continues through the full sequence and wraps.
context.state.readingAdventures = [];
for (let i = 0; i < 20; i++) {
  context.startReadingMission();
  assert.equal(context.game.lesson, library[i % 16].id);
  context.state.readingAdventures.push({ lesson: context.game.lesson });
}

// Maths: nine first-stage adventures in the agreed order, varied and valid over many cycles.
const maths = vm.runInContext('mathsAdventures', context);
assert.deepEqual(JSON.parse(JSON.stringify(maths.map(m => m.id))), [
  'M-F-01',
  'M-F-05',
  'M-F-02',
  'M-F-06',
  'M-F-07',
  'M-F-03',
  'M-F-08',
  'M-F-04',
  'M-F-09'
]);
for (let n = 0; n < 45; n++) {
  context.state.completed = Array.from({ length: n }, () => ({ type: 'maths' }));
  const lesson = maths[n % maths.length];
  const items = context.makeQuestions('maths');
  if (!vm.runInContext('schoolMathsBuilders', context)[lesson.kind]) continue;
  assert.equal(items.length, 5);
  for (const q of items) {
    assert.equal(q.lesson, lesson.id);
    assert(q.choices.includes(q.answer), `${lesson.id}: answer offered`);
    assert.equal(new Set(q.choices).size, q.groupChoice ? 2 : 3);
    assert(q.codes.every(c => allowedCodes.has(c)));
    if (lesson.kind === 'tenframe') assert(+q.answer >= 1 && +q.answer <= 10);
    if (lesson.kind === 'make10')
      assert(+q.answer >= 1 && +q.answer <= 9 && q.choices.every(c => +c >= 0));
    if (lesson.kind === 'numberline')
      assert(+q.answer >= 2 && +q.answer <= 20 && q.scene.includes('missing'));
    if (lesson.kind === 'pattern')
      assert(q.choiceArt && q.choices.every(k => typeof k === 'string'));
  }
  if (lesson.kind === 'moreless')
    assert(
      items.some(q => q.prompt.includes('more')) && items.some(q => q.prompt.includes('fewer'))
    );
}
// A library pick plays that exact lesson.
vm.runInContext("requestedMathsLesson = 'M-F-09'", context);
assert(context.makeQuestions('maths').every(q => q.lesson === 'M-F-09'));

// Visible thinking: every lesson kind offers three strategies with words and pictures.
const byKind = vm.runInContext('thinkingByKind', context),
  strategies = vm.runInContext('thinkingStrategies', context);
for (const lesson of maths) {
  assert.equal(byKind[lesson.kind].length, 3, lesson.kind);
  byKind[lesson.kind].forEach(k =>
    assert(strategies[k] && vm.runInContext('thinkingReplies', context)[k])
  );
}
console.log(
  'Passed: 13-pearl adventures; 16 reading lessons in Jolly Phonics order with artwork; 9 maths adventures over 45 cycles; visible-thinking choices.'
);
