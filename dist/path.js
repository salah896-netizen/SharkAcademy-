/* Learning path (24 October 2026), in the spirit of Khan Academy Kids' guided path.
 *
 * - 11 skills on one island path, mixing reading, maths and writing.
 * - Play (and tapping Willa, Tiggy or Dash) goes to the next useful lesson: reviews that are due
 *   first, then the next skill that isn't ready yet, rotating subjects.
 * - A skill is ready when 8 of its last 10 answers were right without help, across at least
 *   two different days. Help never counts against Haytham; it just isn't counted as independent.
 * - Ready skills come back for short reviews after about 3, 7 and 21 days. A shaky review sends
 *   the skill back for more practice; nothing is ever locked or lost.
 * - A short starting check the first time lets skills he already knows start with a star.
 * - Parents can mark a skill ready, send it back for practice, or redo the starting check.
 * Practice evidence only: this is not an assessment of curriculum achievement standards.
 */

const pathSkills = [
  {
    id: 'cvc',
    subject: 'reading',
    name: 'Three-letter words',
    glyph: 'cat',
    lessons: [
      'R-F-PILOT-01',
      'R-F-PILOT-02',
      'R-F-PILOT-03',
      'R-F-PILOT-04',
      'R-F-PILOT-05',
      'R-F-PILOT-06'
    ]
  },
  { id: 'count', subject: 'maths', name: 'Counting', glyph: '123', lessons: ['M-F-01', 'M-F-05'] },
  {
    id: 'sci-look',
    subject: 'science',
    name: 'Looking closely',
    glyph: 'eye',
    lessons: ['S-F-01', 'S-F-02']
  },
  {
    id: 'listen',
    subject: 'reading',
    name: 'Listening ears',
    glyph: 'ear',
    lessons: ['R-F-LS-01', 'R-F-LS-02', 'R-F-LS-03']
  },
  {
    id: 'letters',
    subject: 'writing',
    name: 'Sandy letters',
    glyph: 'a',
    lessons: ['W-F-01A', 'W-F-01B', 'W-F-01C', 'W-F-02A']
  },
  {
    id: 'add',
    subject: 'maths',
    name: 'Adding and ten',
    glyph: '+',
    lessons: ['M-F-02', 'M-F-06']
  },
  {
    id: 'digraph',
    subject: 'reading',
    name: 'sh ch ck',
    glyph: 'sh',
    lessons: ['R-F-JP-01', 'R-F-JP-02']
  },
  {
    id: 'sci-move',
    subject: 'science',
    name: 'Sink, float, move',
    glyph: 'wave',
    lessons: ['S-F-03', 'S-F-04']
  },
  {
    id: 'tricky',
    subject: 'reading',
    name: 'Tricky words',
    glyph: 'the',
    lessons: ['R-F-TW-01', 'R-F-TW-02']
  },
  {
    id: 'order',
    subject: 'maths',
    name: 'Numbers in order',
    glyph: '1 2 ?',
    lessons: ['M-F-07', 'M-F-08']
  },
  {
    id: 'vowels',
    subject: 'reading',
    name: 'ee oo ai ar',
    glyph: 'ee',
    lessons: ['R-F-JP-03', 'R-F-JP-04', 'R-F-JP-05']
  },
  {
    id: 'sci-real',
    subject: 'science',
    name: 'Real or pretend',
    glyph: 'star',
    lessons: ['S-F-05']
  },
  {
    id: 'takeshare',
    subject: 'maths',
    name: 'Take away and share',
    glyph: '−',
    lessons: ['M-F-03', 'M-F-04']
  },
  { id: 'patterns', subject: 'maths', name: 'Patterns', glyph: 'AB', lessons: ['M-F-09'] }
];
const PATH = {
  window: 10,
  needed: 8,
  days: 2,
  reviewGaps: [3, 7, 21],
  dailyGoal: 3,
  reviewPass: 0.75
};
const pathHelper = { reading: 'willa', maths: 'tiggy', writing: 'dash', science: 'gizmo' };

// ---------------------------------------------------------------- dates
function dayKey(when = new Date()) {
  const d = new Date(when);
  return (
    d.getFullYear() +
    '-' +
    String(d.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(d.getDate()).padStart(2, '0')
  );
}
function addDays(key, days) {
  const [y, m, d] = key.split('-').map(Number);
  return dayKey(new Date(y, m - 1, d + days));
}

// ---------------------------------------------------------------- evidence
function pathData() {
  state.path = state.path || {};
  state.path.skills = state.path.skills || {};
  return state.path;
}
function skillRecord(id) {
  const data = pathData();
  return (data.skills[id] = data.skills[id] || {});
}
// Every answered item for a skill, oldest first: { independent, day, lesson }.
function skillEvidence(skill) {
  if (skill.subject === 'reading')
    return (state.readingAdventures || [])
      .filter(s => skill.lessons.includes(s.lesson))
      .flatMap(s =>
        (s.attempts || []).map(a => ({
          independent: !a.supported,
          day: dayKey(a.at || s.at),
          lesson: s.lesson
        }))
      );
  if (skill.subject === 'science')
    // Predictions are never right or wrong, so they don't count towards readiness.
    return (state.scienceLessons || [])
      .filter(s => skill.lessons.includes(s.lesson))
      .flatMap(s =>
        (s.attempts || [])
          .filter(a => a.kind !== 'predict')
          .map(a => ({ independent: !a.supported, day: dayKey(a.at || s.at), lesson: s.lesson }))
      );
  if (skill.subject === 'maths')
    return (state.history || [])
      .filter(x => x.type === 'maths' && skill.lessons.includes(x.lesson))
      .map(x => ({ independent: !!x.independent, day: dayKey(x.at), lesson: x.lesson }));
  // Writing has no automatic marking: each finished three-step adventure counts once,
  // as independent only when the final, on-my-own step needed no help.
  return (state.writingLessons || [])
    .filter(l => skill.lessons.includes(l.id))
    .map(l => ({
      independent: !(l.samples || []).at(-1)?.supported,
      day: dayKey(l.at),
      lesson: l.id
    }));
}
function skillMeetsRule(skill) {
  const evidence = skillEvidence(skill);
  if (skill.subject === 'writing') {
    // Every letter tried at least once, a final step done without help, on two different days.
    const tried = new Set(evidence.map(e => e.lesson));
    return (
      skill.lessons.every(l => tried.has(l)) &&
      evidence.some(e => e.independent) &&
      new Set(evidence.map(e => e.day)).size >= PATH.days
    );
  }
  const recent = evidence.slice(-PATH.window);
  return (
    recent.length >= PATH.window &&
    recent.filter(e => e.independent).length >= PATH.needed &&
    new Set(recent.map(e => e.day)).size >= PATH.days
  );
}
function lessonPlays(skill, lesson) {
  if (skill.subject === 'reading')
    return (state.readingAdventures || []).filter(s => s.lesson === lesson);
  if (skill.subject === 'science')
    return (state.scienceLessons || []).filter(s => s.lesson === lesson);
  if (skill.subject === 'maths')
    return [
      ...new Set((state.history || []).filter(x => x.lesson === lesson).map(x => x.session))
    ].map(session => ({ session }));
  return (state.writingLessons || []).filter(l => l.id === lesson);
}

// Bring stored skill states up to date. Returns skills that just earned their star.
function updatePathState(today = dayKey()) {
  const fresh = [];
  for (const skill of pathSkills) {
    const record = skillRecord(skill.id);
    if (record.override === 'practise') continue;
    if (!record.readyAt && (record.override === 'ready' || skillMeetsRule(skill))) {
      record.readyAt = today;
      record.reviewsDone = 0;
      record.nextReview = addDays(today, PATH.reviewGaps[0]);
      delete record.revisit;
      fresh.push(skill);
    }
  }
  return fresh;
}
function skillStatus(skill, today = dayKey()) {
  const record = skillRecord(skill.id);
  if (record.readyAt && record.nextReview && record.nextReview <= today) return 'review';
  if (record.readyAt) return 'ready';
  return skillEvidence(skill).length ? 'learning' : 'new';
}
function skillProgress(skill) {
  const recent = skillEvidence(skill).slice(-PATH.window);
  return {
    right: recent.filter(e => e.independent).length,
    tries: recent.length,
    days: new Set(recent.map(e => e.day)).size
  };
}

// ---------------------------------------------------------------- what's next
function adventuresToday(today = dayKey()) {
  return (
    (state.completed || []).filter(x => dayKey(x.at) === today).length +
    (state.writingLessons || []).filter(x => dayKey(x.at) === today).length
  );
}
function reviewedToday(skill, today) {
  return skillRecord(skill.id).lastReview === today;
}
function nextLessonInSkill(skill, review = false) {
  const plays = skill.lessons.map((lesson, order) => ({
    lesson,
    order,
    count: lessonPlays(skill, lesson).length
  }));
  // New learning: the least-played lesson, in order. Review: the one practised longest ago.
  plays.sort((a, b) => a.count - b.count || a.order - b.order);
  if (review) plays.sort((a, b) => a.count - b.count || b.order - a.order);
  return plays[0].lesson;
}
function pathNextActivity(subjectWanted = null, today = dayKey()) {
  updatePathState(today);
  const done = adventuresToday(today);
  if (!subjectWanted) {
    const due = pathSkills.find(
      s => skillStatus(s, today) === 'review' && !reviewedToday(s, today)
    );
    if (due)
      return {
        skill: due.id,
        subject: due.subject,
        lesson: nextLessonInSkill(due, true),
        review: true
      };
  }
  const rotation = ['reading', 'maths', 'science', 'writing'];
  const order = subjectWanted
    ? [subjectWanted]
    : rotation.map((_, i) => rotation[(done + i) % rotation.length]);
  for (const subject of order) {
    const skill = pathSkillsInLevelOrder(subject).find(s => !skillRecord(s.id).readyAt);
    if (skill) return { skill: skill.id, subject, lesson: nextLessonInSkill(skill), review: false };
  }
  // Everything here has a star: practise the skill visited longest ago in that subject.
  const pool = pathSkills.filter(s => !subjectWanted || s.subject === subjectWanted);
  const stale = pool
    .map(s => ({ s, last: Math.max(0, ...skillEvidence(s).map(e => Date.parse(e.day) || 0)) }))
    .sort((a, b) => a.last - b.last)[0].s;
  return {
    skill: stale.id,
    subject: stale.subject,
    lesson: nextLessonInSkill(stale, true),
    review: false
  };
}
// Easy / medium / hard per subject (set in the grown-ups' area): medium starts a third of the
// way along that subject's skills, hard two thirds; the earlier skills come after, not never.
function pathSkillsInLevelOrder(subject) {
  const skills = pathSkills.filter(s => s.subject === subject),
    level = (state.levels || {})[subject],
    skip = Math.floor((skills.length * { medium: 1, hard: 2 }[level] || 0) / 3);
  return [...skills.slice(skip), ...skills.slice(0, skip)];
}
function pathCurrentSkill(today = dayKey()) {
  const next = pathNextActivity(null, today);
  return pathSkills.find(s => s.id === next.skill);
}

// ---------------------------------------------------------------- launching lessons
let pendingPathPick = null;
function launchPathActivity(pick) {
  if (!pick) return;
  if (pick.subject === 'reading') {
    startReadingMission(pick.lesson);
  } else if (pick.subject === 'science') {
    startScienceMission(pick.lesson);
  } else if (pick.subject === 'maths') {
    requestedMathsLesson = pick.lesson;
    start('maths');
    game.stage = 1;
  } else {
    const record = writingAdventures.find(w => w.id === pick.lesson) || writingAdventures[0];
    freeWriting = false;
    guidedWriting = {
      lesson: record,
      step: 0,
      samples: [],
      session: 'writing-' + Date.now(),
      pathSkill: pick.skill,
      pathReview: pick.review
    };
    if (location.hash === '#writing') render();
    else location.hash = 'writing';
    return;
  }
  if (game) {
    game.pathSkill = pick.skill;
    game.pathReview = pick.review;
  }
}
function pathNeedsCheck() {
  return !pathData().checked;
}
function pathLaunchSubject(subject) {
  launchPathActivity(pathNextActivity(subject));
}

// ---------------------------------------------------------------- after each adventure
function finishPathActivity(skillId, review, independentShare) {
  if (!skillId) return;
  const today = dayKey(),
    record = skillRecord(skillId);
  if (review && record.readyAt) {
    record.lastReview = today;
    if (independentShare >= PATH.reviewPass) {
      record.reviewsDone = (record.reviewsDone || 0) + 1;
      const gap = PATH.reviewGaps[record.reviewsDone];
      record.nextReview = gap ? addDays(today, gap) : null;
    } else {
      // Not quite remembered yet: back to practice. History is kept; the star comes back later.
      delete record.readyAt;
      delete record.nextReview;
      record.reviewsDone = 0;
      record.revisit = true;
      if (record.override === 'ready') delete record.override;
    }
  }
  const fresh = updatePathState(today);
  save();
  fresh.forEach((skill, i) =>
    setTimeout(() => pathToast(`⭐ New star: ${skill.name}!`), 1200 + i * 3800)
  );
  if (adventuresToday(today) === PATH.dailyGoal)
    setTimeout(
      () => pathToast('🏁 Today’s goal done! Race or story time?', true),
      1400 + fresh.length * 3800
    );
}
function pathToast(text, raceLink = false) {
  const badge = document.createElement(raceLink ? 'a' : 'div');
  badge.className = 'video-unlocked path-toast';
  badge.setAttribute('role', 'status');
  if (raceLink) badge.href = '#race';
  badge.innerHTML = `<strong>${text}</strong>`;
  document.body.append(badge);
  setTimeout(() => badge.remove(), 4200);
}
const prePathReadingFinish = finishReadingMission;
finishReadingMission = function () {
  const finished = game;
  prePathReadingFinish();
  pathFinishButtons();
  if (!finished?.pathSkill) return;
  const attempts = finished.attempts || [];
  finishPathActivity(
    finished.pathSkill,
    finished.pathReview,
    attempts.length ? attempts.filter(a => !a.supported).length / attempts.length : 0
  );
  pathFinishButtons();
};
finishSteps.push(function pathFinish(finished) {
  if (finished?.type === 'maths') pathFinishButtons();
  if (finished?.type !== 'maths' || !finished.pathSkill) return;
  const answers = (state.history || []).filter(x => x.session === finished.session);
  finishPathActivity(
    finished.pathSkill,
    finished.pathReview,
    answers.length ? answers.filter(x => x.independent).length / answers.length : 0
  );
  pathFinishButtons();
});
const prePathWritingFinish = finishWritingAdventure;
finishWritingAdventure = function (active) {
  prePathWritingFinish(active);
  pathFinishButtons();
  const skill = active.pathSkill || pathSkills.find(s => s.lessons.includes(active.lesson.id))?.id;
  const last = active.samples.at(-1);
  finishPathActivity(skill, active.pathReview, last && !last.supported ? 1 : 0);
  pathFinishButtons();
};
// Every finish screen offers the next adventure and the map, Khan Academy Kids style.
function pathFinishButtons() {
  const host = app.querySelector('.quest-actions, .lesson-finish, .game-panel .choices');
  if (!host || host.querySelector('#pathNext')) return;
  host.insertAdjacentHTML(
    'beforeend',
    '<button class="primary" id="pathNext">Next adventure ▶</button><a id="pathMapLink" href="#path">My path</a>'
  );
  $('#pathNext').onclick = () => {
    stopSpeech();
    launchPathActivity(pathNextActivity());
  };
  requestAnimationFrame(fitScreen);
}

// ---------------------------------------------------------------- starting check
const pathCheckItems = {
  reading: [
    { word: 'cat', options: ['hat', 'cat', 'cup'], answer: 'cat' },
    { word: 'sun', options: ['sun', 'net', 'map'], answer: 'sun' },
    { word: 'bag', options: ['cup', 'map', 'bag'], answer: 'bag' }
  ],
  readingHarder: [
    { word: 'ship', sounds: ['sh', 'i', 'p'], options: ['chip', 'ship', 'shell'], answer: 'ship' },
    { word: 'duck', sounds: ['d', 'u', 'ck'], options: ['sock', 'chip', 'duck'], answer: 'duck' }
  ],
  maths: [
    { kind: 'count', n: 6, options: ['5', '6', '7'], answer: '6' },
    { kind: 'frame', n: 8, options: ['7', '8', '9'], answer: '8' },
    { kind: 'join', a: 3, b: 2, options: ['4', '5', '6'], answer: '5' }
  ],
  mathsHarder: [
    { kind: 'make10', n: 7, options: ['2', '3', '4'], answer: '3' },
    { kind: 'join', a: 4, b: 4, options: ['7', '8', '9'], answer: '8' }
  ]
};
let pathCheck = null;
function startPathCheck() {
  pathCheck = {
    stage: 'reading',
    index: 0,
    results: { reading: [], readingHarder: [], maths: [], mathsHarder: [] }
  };
  location.hash = 'path/check';
}
function pathCheckScreen() {
  if (!pathCheck)
    pathCheck = {
      stage: 'reading',
      index: 0,
      results: { reading: [], readingHarder: [], maths: [], mathsHarder: [] }
    };
  const item = pathCheckItems[pathCheck.stage][pathCheck.index];
  if (!item) return advancePathCheck();
  const reading = pathCheck.stage.startsWith('reading'),
    friend = reading ? 'willa' : 'tiggy';
  let clue;
  if (reading)
    clue = item.sounds
      ? `<div class="quest-word school-sounds" aria-label="${item.word}">${item.sounds.map(s => `<span class="sound-letter ${s.length > 1 ? 'sound-digraph' : ''}">${s}</span>`).join('')}</div>`
      : `<div class="quest-word" aria-label="${item.word}">${item.word}</div>`;
  else if (item.kind === 'count') clue = animalCollection(item.n, 'clownfish');
  else if (item.kind === 'frame' || item.kind === 'make10') clue = tenFrame(item.n);
  else
    clue = `<div class="maths-model"><div class="maths-group">${animalCollection(item.a, 'turtle')}</div><b aria-hidden="true">+</b><div class="maths-group">${animalCollection(item.b, 'turtle')}</div></div>`;
  const prompt = reading
    ? 'Read the word. Which picture matches?'
    : item.kind === 'make10'
      ? 'How many more counters will fill the ten-frame?'
      : item.kind === 'join'
        ? 'How many turtles altogether?'
        : 'How many are here?';
  const total = pathCheckItems.reading.length + pathCheckItems.maths.length,
    doneCount = pathCheck.results.reading.length + pathCheck.results.maths.length;
  app.innerHTML = `<section class="reading-quest school-quest path-check"><div class="path-check-dots" aria-label="Starting check">${Array.from({ length: total }, (_, i) => `<i class="${i < doneCount ? 'done' : ''}"></i>`).join('')}</div><div class="quest-scroll"><p>${prompt}</p>${clue}<div class="quest-pictures ${reading ? '' : 'number-choices'}">${item.options.map((o, i) => `<button data-check-choice="${i}" aria-label="${o}">${reading ? readingArt(o) : `<span class="check-number">${o}</span>`}</button>`).join('')}</div></div></section>`;
  const intro =
    pathCheck.index === 0 && pathCheck.stage === 'reading'
      ? 'Willa and Tiggy want to see what you already know. Just have a go! '
      : pathCheck.index === 0 && pathCheck.stage === 'maths'
        ? 'Let’s go, Haytham! Let’s go counting! '
        : '';
  speak(intro + prompt, { speaker: friend });
  document.querySelectorAll('[data-check-choice]').forEach(button => {
    button.onclick = () => {
      if (button.disabled) return;
      document.querySelectorAll('[data-check-choice]').forEach(b => (b.disabled = true));
      const value = item.options[+button.dataset.checkChoice];
      pathCheck.results[pathCheck.stage].push(value === item.answer);
      // No right/wrong feedback in a starting check: every answer just moves on kindly.
      button.classList.add('check-picked');
      speak(['Thank you!', 'Got it!', 'Great trying!'][pathCheck.index % 3], { speaker: friend });
      setTimeout(() => {
        if (location.hash !== '#path/check') return;
        pathCheck.index++;
        pathCheckScreen();
      }, 1100);
    };
  });
  requestAnimationFrame(fitScreen);
}
function advancePathCheck() {
  const r = pathCheck.results,
    passed = list => list.filter(Boolean).length;
  pathCheck.index = 0;
  if (pathCheck.stage === 'reading')
    pathCheck.stage = passed(r.reading) >= 2 ? 'readingHarder' : 'maths';
  else if (pathCheck.stage === 'readingHarder') pathCheck.stage = 'maths';
  else if (pathCheck.stage === 'maths')
    pathCheck.stage = passed(r.maths) >= 2 ? 'mathsHarder' : 'done';
  else pathCheck.stage = 'done';
  if (pathCheck.stage !== 'done') return pathCheckScreen();
  finishPathCheck(r);
}
// Correct answers in the check give a skill its star; the next review confirms it.
function applyPathCheck(results, today = dayKey()) {
  const passed = list => list.filter(Boolean).length,
    stars = [];
  if (passed(results.reading) >= 2) stars.push('cvc');
  if (passed(results.reading) >= 2 && passed(results.readingHarder) === 2) stars.push('digraph');
  if (passed(results.maths) >= 2) stars.push('count');
  if (passed(results.maths) >= 2 && passed(results.mathsHarder) === 2) stars.push('add');
  const data = pathData();
  data.checked = today;
  data.check = { at: new Date().toISOString(), results };
  for (const id of stars) {
    const record = skillRecord(id);
    record.readyAt = today;
    record.placed = true;
    record.reviewsDone = 0;
    record.nextReview = addDays(today, PATH.reviewGaps[0]);
  }
  return stars;
}
function finishPathCheck(results) {
  const stars = applyPathCheck(results);
  state.xp += PEARLS.extra;
  save();
  pathCheck = null;
  pathData().justChecked = stars;
  location.hash = 'path';
}

// ---------------------------------------------------------------- island map
function islandGlyph(skill) {
  if (['eye', 'wave', 'star'].includes(skill.glyph)) {
    const paths = {
      eye: '<path d="M4 20Q20 4 36 20Q20 36 4 20Z"/><circle cx="20" cy="20" r="5"/>',
      wave: '<path d="M4 16Q10 10 16 16T28 16T40 16M4 26Q10 20 16 26T28 26T40 26"/>',
      star: '<path d="M20 4L24 15L36 15L26 22L30 34L20 27L10 34L14 22L4 15L16 15Z"/>'
    };
    return `<svg viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">${paths[skill.glyph]}</svg>`;
  }
  if (skill.glyph === 'ear')
    return '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 18H16L28 8V40L16 30H8Z" fill="currentColor"/><path d="M34 16Q40 24 34 32M38 10Q48 24 38 38" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/></svg>';
  return `<b>${skill.glyph}</b>`;
}
// A dotted route joins the islands in order, like a treasure map.
function drawPathRoute() {
  const host = app.querySelector('.path-islands');
  if (!host) return;
  host.querySelector('.path-route')?.remove();
  const box = host.getBoundingClientRect(),
    zoom = parseFloat(getComputedStyle(app.querySelector('.path-map')).zoom) || 1;
  const points = [...host.querySelectorAll('.island-top')].map(el => {
    const r = el.getBoundingClientRect();
    return [(r.left + r.width / 2 - box.left) / zoom, (r.top + r.height / 2 - box.top) / zoom];
  });
  if (points.length < 2) return;
  const d = points
    .map(([x, y], i) => {
      if (!i) return `M${x} ${y}`;
      const [px, py] = points[i - 1];
      return py === y
        ? `L${x} ${y}`
        : `C${px + (px > box.width / 2 / zoom ? 90 : -90)} ${py} ${x + (x > box.width / 2 / zoom ? 90 : -90)} ${y} ${x} ${y}`;
    })
    .join(' ');
  host.insertAdjacentHTML(
    'beforeend',
    `<svg class="path-route" width="${box.width / zoom}" height="${box.height / zoom}" aria-hidden="true"><path d="${d}"/></svg>`
  );
}
window.addEventListener('resize', () => {
  if (location.hash === '#path') requestAnimationFrame(drawPathRoute);
});
function pathMap() {
  updatePathState();
  const today = dayKey(),
    current = pathCurrentSkill(today),
    done = adventuresToday(today),
    justChecked = pathData().justChecked;
  delete pathData().justChecked;
  const statusLabel = {
    new: 'Not tried yet',
    learning: 'Practising',
    ready: 'Star earned',
    review: 'Time for a quick review'
  };
  app.innerHTML = `<section class="path-map"><div class="path-head"><h1>Haytham’s path</h1><div class="path-goal" aria-label="Today’s goal: ${Math.min(done, PATH.dailyGoal)} of ${PATH.dailyGoal} adventures">${Array.from({ length: PATH.dailyGoal }, (_, i) => `<i class="${i < done ? 'done' : ''}"></i>`).join('')}<span>Today</span></div></div><div class="path-islands">${pathSkills
    .map((skill, i) => {
      const status = skillStatus(skill, today);
      return `<button class="path-island subject-${skill.subject} status-${status} ${skill === current ? 'current' : ''}" style="--i:${i}" data-path-skill="${skill.id}" aria-label="${skill.name}: ${statusLabel[status]}"><span class="island-top">${islandGlyph(skill)}${status === 'ready' || status === 'review' ? '<em class="island-star" aria-hidden="true">★</em>' : ''}${status === 'review' ? '<em class="island-review" aria-hidden="true">↻</em>' : ''}</span><small>${skill.name}</small>${skill === current ? `<span class="island-milo" aria-hidden="true">${miloActor()}</span>` : ''}</button>`;
    })
    .join('')}</div><button id="pathPlay" class="primary">▶ Next adventure</button></section>`;
  document.querySelectorAll('[data-path-skill]').forEach(button => {
    const skill = pathSkills.find(s => s.id === button.dataset.pathSkill);
    button.onclick = () => {
      stopSpeech();
      const status = skillStatus(skill);
      launchPathActivity({
        skill: skill.id,
        subject: skill.subject,
        lesson: nextLessonInSkill(skill, status !== 'new' && status !== 'learning'),
        review: status === 'review'
      });
    };
    button.onpointerenter = e => {
      if (e.pointerType !== 'touch') speak(skill.name, { speaker: pathHelper[skill.subject] });
    };
  });
  $('#pathPlay').onclick = () => {
    stopSpeech();
    launchPathActivity(pathNextActivity());
  };
  const line = justChecked?.length
    ? `Thanks for showing us, Haytham! You already know ${justChecked.length === 1 ? 'one skill' : justChecked.length + ' skills'}. Each star is a skill you know. Let’s keep going!`
    : done >= PATH.dailyGoal
      ? 'You did your three adventures today! You can keep going, or have a race or a story.'
      : 'Here’s our path, Haytham. Milo shows where we’re up to. Tap Next adventure!';
  speak(line, { speaker: 'milo' });
  updateMilo(line);
  requestAnimationFrame(() => {
    fitScreen();
    drawPathRoute();
  });
}
function pathPage() {
  if (location.hash === '#path/check') return pathCheckScreen();
  pathMap();
}

// ---------------------------------------------------------------- parent area
function pathParentSummary() {
  updatePathState();
  const label = { new: 'not tried', learning: 'practising', ready: 'ready', review: 'review due' };
  const check = pathData().check;
  return `<p class="muted">Each skill is marked ready after 8 of the last 10 answers are right without help, across at least two days (writing: every letter tried, with a final step done without help). Ready skills come back for reviews after about 3, 7 and 21 days. This is practice evidence, not assessment against curriculum standards.</p><table class="path-parent"><tbody>${pathSkills
    .map(skill => {
      const p = skillProgress(skill),
        record = skillRecord(skill.id),
        status = skillStatus(skill);
      return `<tr><th>${skill.name}</th><td>${label[status]}${record.placed ? ' (starting check)' : ''}${record.override ? ' (set by you)' : ''}${record.revisit ? ' · revisiting' : ''}</td><td>${skill.subject === 'writing' ? p.tries + ' adventures' : p.right + ' of last ' + p.tries + ' without help'} · ${p.days} ${p.days === 1 ? 'day' : 'days'}${record.nextReview ? ' · review ' + record.nextReview : ''}</td><td><button data-path-ready="${skill.id}">Mark ready</button> <button data-path-practise="${skill.id}">Practise again</button></td></tr>`;
    })
    .join(
      ''
    )}</tbody></table><p class="muted">${check ? 'Starting check done ' + pathData().checked + '. ' : 'The starting check runs the first time Play is pressed. '}<button id="pathRedoCheck">Redo starting check</button></p>`;
}
function bindPathParent() {
  document.querySelectorAll('[data-path-ready]').forEach(
    b =>
      (b.onclick = () => {
        const record = skillRecord(b.dataset.pathReady);
        record.override = 'ready';
        delete record.readyAt;
        updatePathState();
        save();
        b.textContent = 'Marked ready ✓';
      })
  );
  document.querySelectorAll('[data-path-practise]').forEach(
    b =>
      (b.onclick = () => {
        const record = skillRecord(b.dataset.pathPractise);
        Object.keys(record).forEach(k => delete record[k]);
        record.override = 'practise';
        save();
        b.textContent = 'Back to practice ✓';
      })
  );
  const redo = $('#pathRedoCheck');
  if (redo)
    redo.onclick = () => {
      delete pathData().checked;
      save();
      redo.textContent = 'The check will run next time Play is pressed ✓';
    };
}

// ---------------------------------------------------------------- ways in
const prePathLibrary = libraryPage;
libraryPage = function () {
  prePathLibrary();
  const grid = app.querySelector('.library-choices');
  if (!grid || grid.querySelector('[data-library-route="path"]')) return;
  grid.insertAdjacentHTML(
    'afterbegin',
    '<button data-library-route="path"><span class="library-picture path-library-picture" aria-hidden="true"><i></i><i></i><i></i></span>My path</button>'
  );
  grid.querySelector('[data-library-route="path"]').onclick = () => (location.hash = 'path');
};
