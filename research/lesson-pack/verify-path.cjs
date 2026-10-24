// Learning path rules: readiness (8 of last 10 without help, 2+ days), reviews (3/7/21 days),
// failed reviews return to practice, Play's choice of next lesson, and the starting check.
const fs = require('node:fs'),
  vm = require('node:vm'),
  assert = require('node:assert/strict');
const noop = () => {};
const context = {
  state: {
    history: [],
    completed: [],
    discoveries: [],
    readingAdventures: [],
    writingLessons: [],
    xp: 0
  },
  location: { hash: '#home' },
  render: noop,
  save: noop,
  speak: noop,
  updateMilo: noop,
  fitScreen: noop,
  finishReadingMission: noop,
  finish: noop,
  finishWritingAdventure: noop,
  libraryPage: noop,
  setTimeout: noop,
  document: { createElement: () => ({ setAttribute: noop }), body: { append: noop } },
  app: { querySelector: () => null },
  PEARLS: { adventure: 13, extra: 3 },
  window: { addEventListener: noop },
  Date
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('dist/path.js', 'utf8'), context);
const run = code => vm.runInContext(code, context);
const skills = run('pathSkills');

// Every lesson in the app belongs to exactly one skill.
const lessonIds = skills.flatMap(s => s.lessons);
assert.equal(new Set(lessonIds).size, lessonIds.length, 'no lesson in two skills');
assert.equal(lessonIds.filter(l => l.startsWith('R-F')).length, 16);
assert.equal(lessonIds.filter(l => l.startsWith('M-F')).length, 9);
assert.equal(lessonIds.filter(l => l.startsWith('W-F')).length, 4);

const day = n => `2026-11-${String(n).padStart(2, '0')}T10:00:00`;
const reset = () =>
  Object.assign(context.state, {
    history: [],
    completed: [],
    readingAdventures: [],
    writingLessons: [],
    path: { checked: '2026-11-01' }
  });
const counting = (n, independent, d, session = 's' + d) =>
  Array.from({ length: n }, () => ({
    type: 'maths',
    lesson: 'M-F-01',
    independent,
    at: day(d),
    session
  }));

// Readiness: 10 answers, 8 without help, but all on one day -> not ready; on two days -> ready.
reset();
context.state.history.push(...counting(10, true, 2));
assert.equal(
  run("skillMeetsRule(pathSkills.find(s => s.id === 'count'))"),
  false,
  'needs two different days'
);
reset();
context.state.history.push(
  ...counting(5, true, 2),
  ...counting(3, true, 3),
  ...counting(2, false, 3)
);
assert.equal(
  run("skillMeetsRule(pathSkills.find(s => s.id === 'count'))"),
  true,
  '8 of 10 over 2 days'
);
reset();
context.state.history.push(
  ...counting(5, true, 2),
  ...counting(2, true, 3),
  ...counting(3, false, 3)
);
assert.equal(
  run("skillMeetsRule(pathSkills.find(s => s.id === 'count'))"),
  false,
  'help is not independent'
);

// Reviews: star on day 3, review due 3 days later, then 7, then 21.
reset();
context.state.history.push(...counting(5, true, 2), ...counting(5, true, 3));
assert.equal(run("updatePathState('2026-11-03').map(s => s.id).join()"), 'count');
assert.equal(run("skillRecord('count').nextReview"), '2026-11-06');
assert.equal(run("skillStatus(pathSkills.find(s => s.id === 'count'), '2026-11-05')"), 'ready');
assert.equal(run("skillStatus(pathSkills.find(s => s.id === 'count'), '2026-11-06')"), 'review');
// Play picks a due review before anything new.
const pick = run("pathNextActivity(null, '2026-11-06')");
assert.equal(pick.skill, 'count');
assert.equal(pick.review, true);
// A good review moves the next one out 7 days; the dayKey for "today" is the real date, so check gaps.
run("finishPathActivity('count', true, 1)");
const r1 = run("skillRecord('count')");
assert.equal(r1.reviewsDone, 1);
assert.equal(run(`addDays(dayKey(), 7)`), r1.nextReview);
run("finishPathActivity('count', true, 0.8)");
assert.equal(run(`addDays(dayKey(), 21)`), run("skillRecord('count').nextReview"));
run("finishPathActivity('count', true, 1)");
assert.equal(run("skillRecord('count').nextReview"), null, 'reviews finish after the 21-day one');
// A shaky review sends the skill back to practice, keeping the history.
reset();
context.state.history.push(...counting(5, true, 2), ...counting(5, true, 3));
run("updatePathState('2026-11-03')");
context.state.history.push(...counting(4, false, 6, 'review'));
run("finishPathActivity('count', true, 0.25)");
assert.equal(run("skillRecord('count').readyAt"), undefined);
assert.equal(run("skillRecord('count').revisit"), true);
assert.equal(context.state.history.length, 14, 'history kept');

// Next activity: rotates subjects by adventures done today, skipping skills with stars.
reset();
assert.equal(run('pathNextActivity()').skill, 'cvc');
context.state.completed.push({ type: 'reading-adventure', at: new Date().toISOString() });
assert.equal(run('pathNextActivity()').subject, 'maths');
context.state.completed.push({ type: 'maths', at: new Date().toISOString() });
assert.equal(run('pathNextActivity()').subject, 'writing');
run("skillRecord('cvc').override = 'ready'");
assert.equal(run("pathNextActivity('reading')").skill, 'listen', 'next reading skill after a star');
// Within a skill, the least-played lesson comes next.
context.state.readingAdventures.push({ lesson: 'R-F-LS-01', attempts: [] });
assert.equal(run("pathNextActivity('reading')").lesson, 'R-F-LS-02');

// Starting check: strong answers give stars to the matching skills only.
reset();
delete context.state.path.checked;
assert.equal(run('pathNeedsCheck()'), true);
const stars = run(
  "applyPathCheck({ reading: [true, true, false], readingHarder: [true, true], maths: [true, false, false], mathsHarder: [] }, '2026-11-01')"
);
assert.deepEqual([...stars], ['cvc', 'digraph']);
assert.equal(run('pathNeedsCheck()'), false);
assert.equal(
  run("skillRecord('cvc').nextReview"),
  '2026-11-04',
  'checked skills are confirmed by a review'
);
assert.equal(run("skillRecord('count').readyAt"), undefined);

// Parent override: "practise again" keeps a skill off the star list even if the rule is met.
reset();
context.state.history.push(...counting(5, true, 2), ...counting(5, true, 3));
run("skillRecord('count').override = 'practise'");
assert.equal(run("updatePathState('2026-11-03').length"), 0);
console.log(
  'Passed: every lesson in one skill; 8-of-10 over two days; reviews at 3/7/21 days; shaky reviews revisit; subject rotation; starting check stars; parent override.'
);
