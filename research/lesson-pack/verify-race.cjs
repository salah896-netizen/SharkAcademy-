// Shark Race: unlocking, course layout, pearls cap, speed shells and fair placing — no browser needed.
const fs = require('node:fs'),
  vm = require('node:vm'),
  assert = require('node:assert/strict');
const noop = () => {};
const context = {
  state: { history: [], completed: [], discoveries: [], readingAdventures: [], xp: 0, races: [] },
  location: { hash: '#home' },
  document: {
    createElement: () => ({ setAttribute: noop }),
    body: { append: noop, classList: { add: noop, remove: noop } },
    addEventListener: noop
  },
  window: { addEventListener: noop },
  save: noop,
  libraryPage: noop,
  speak: noop,
  helperSpeak: noop,
  readingArt: k => '<svg>' + k + '</svg>',
  tenFrame: n => '<div>' + n + '</div>',
  sharkBook: [
    'megalodon',
    'whale',
    'tiger',
    'goblin',
    'mako',
    'hammerhead',
    'epaulette',
    'white'
  ].map(id => ({ id, name: id, facts: [['q', 'fact']] }))
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('dist/race.js', 'utf8'), context);
const tracks = vm.runInContext('raceTracks', context),
  RACE = vm.runInContext('RACE', context);

// Unlocking: lagoon open from the start; others need learning adventures (reading, maths or writing).
assert.equal(tracks.length, 4);
const open = () => vm.runInContext('unlockedTrackCount()', context);
assert.equal(open(), 1);
for (const [done, expected] of [
  [1, 1],
  [2, 2],
  [5, 3],
  [9, 4]
]) {
  context.state.completed = Array.from({ length: done - 1 }, () => ({ type: 'maths' }));
  context.state.writingLessons = [{}];
  assert.equal(open(), expected, done + ' adventures');
}
// Every racer has a real encyclopedia entry and every track fact names a real shark.
for (const r of Object.values(vm.runInContext('racers', context)))
  assert(context.sharkBook.some(s => s.id === r.book));
for (const t of tracks) assert(context.sharkBook.some(s => s.id === t.fact.shark));

function race(track, seed, chooseRight, pearlLanes = true) {
  const run = {
    track,
    racerId: 'milo',
    lane: 1,
    distance: 0,
    rivalDistance: [0, 0],
    time: 0,
    boostUntil: 0,
    bumpUntil: 0,
    pearls: 0,
    shells: [],
    items: context.buildRaceCourse(track, seed),
    timers: []
  };
  for (let t = 0; t < 120 && run.distance < RACE.length; t += 0.05) {
    // Steer like a child would: towards the next thing ahead.
    const next = run.items.find(i => !i.done && i.at > run.distance && i.at - run.distance < 0.5);
    if (next?.type === 'gate')
      run.lane = chooseRight
        ? next.clue.options.indexOf(next.clue.answer)
        : (next.clue.options.indexOf(next.clue.answer) + 1) % 3;
    else if (next?.type === 'pearl' && pearlLanes) run.lane = next.lane;
    else if (next?.type === 'obstacle' && next.lane === run.lane) run.lane = (run.lane + 1) % 3;
    context.stepRace(run, 0.05);
  }
  return { run, place: context.racePlace(run) };
}
for (const track of tracks) {
  for (let seed = 0; seed < 8; seed++) {
    const course = context.buildRaceCourse(track, seed);
    const gates = course.filter(i => i.type === 'gate');
    assert.equal(gates.length, 4);
    for (const g of gates) {
      assert.equal(g.clue.options.length, 3);
      assert.equal(new Set(g.clue.options).size, 3, track.id + ' distinct shells');
      assert(g.clue.options.includes(g.clue.answer));
    }
    if (!track.obstacle)
      assert(!course.some(i => i.type === 'obstacle'), 'lagoon has no obstacles');
    for (const o of course.filter(i => i.type === 'obstacle'))
      assert(!gates.some(g => Math.abs(g.at - o.at) < 0.45), 'obstacles never sit on a gate');
    const good = race(track, seed, true),
      poor = race(track, seed, false, false);
    assert.equal(good.run.distance >= RACE.length, true);
    assert.equal(good.run.pearls, RACE.maxPearls, 'all pearls catchable');
    assert(poor.run.pearls <= RACE.maxPearls);
    assert.equal(good.run.shells.filter(s => s.right).length, 4);
    assert.equal(good.place, 1, track.id + ': matching shells wins');
    assert(poor.place >= 1 && poor.place <= 3);
    assert(good.run.time < 90, 'a race lasts about a minute and a bit (slowed 25 Oct)');
    if (track.id === 'lagoon') console.log('lagoon race time with shells', good.run.time.toFixed(1), 's; without', poor.run.time.toFixed(1), 's');
  }
}
console.log(
  'Passed: 4 tracks unlock by learning; sourced facts; course layout; 3-pearl cap; speed shells win races; races about a minute.'
);
