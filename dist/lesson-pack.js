/* Foundation adventure pack. Practice evidence is kept separate from mastery. */
function clue(word, options, answer, reveal) {
  return {
    word,
    options,
    answer,
    prompt: word.includes(' ')
      ? 'Read the little message. Which picture matches?'
      : 'Read the clue. Which picture matches?',
    hint: word.includes(' ')
      ? 'Let’s read together: ' + word + ' Look at every word before choosing.'
      : 'Point to each letter in ' + word + '. Say its sound, then blend the sounds together.',
    codes: word.includes(' ') ? ['AC9EFLY04', 'AC9EFLY05'] : ['AC9EFLY12'],
    reveal
  };
}
readingMissionLibrary.push(
  {
    id: 'R-F-PILOT-03',
    name: 'The captain’s hat',
    items: [
      clue('hat', ['cup', 'hat', 'map'], 'hat', 'A hat! Our pretend captain has lost a hat.'),
      clue(
        'map',
        ['map', 'net', 'sun'],
        'map',
        'A map! We know this word. It shows the way to the boat.'
      ),
      clue('cat', ['bag', 'cup', 'cat'], 'cat', 'A cat! The captain’s cat is beside the hat.'),
      clue(
        'A red hat.',
        ['blue-hat', 'red-hat', 'yellow-hat'],
        'red-hat',
        'The red hat! The captain and cat are ready for their next pretend voyage.'
      )
    ]
  },
  {
    id: 'R-F-PILOT-04',
    name: 'The treasure bag',
    items: [
      clue('bag', ['net', 'bag', 'hat'], 'bag', 'A bag! We can put our pretend treasures inside.'),
      clue(
        'net',
        ['sun', 'hat', 'net'],
        'net',
        'A net! Let’s keep our treasure bag clear of the old net.'
      ),
      clue('cup', ['cup', 'map', 'bag'], 'cup', 'A cup! There is a little cup beside the bag.'),
      clue(
        'A red bag.',
        ['yellow-bag', 'blue-bag', 'red-bag'],
        'red-bag',
        'The red bag! We found our pretend treasure bag together.'
      )
    ]
  },
  {
    id: 'R-F-PILOT-05',
    name: 'A sunny voyage',
    items: [
      clue(
        'cat',
        ['cat', 'hat', 'bag'],
        'cat',
        'A cat! Our pretend ship’s cat is ready for a voyage.'
      ),
      clue('fin', ['net', 'fin', 'map'], 'fin', 'A fin! Milo is swimming beside the pretend boat.'),
      clue('sun', ['cup', 'sun', 'hat'], 'sun', 'The sun! Our pretend voyage is bright and sunny.'),
      clue(
        'A red fin.',
        ['red-fin', 'yellow-fin', 'blue-fin'],
        'red-fin',
        'The red-fin sign! We found our way back to the reef.'
      )
    ]
  },
  {
    id: 'R-F-PILOT-06',
    name: 'The reef review',
    items: [
      clue(
        'map',
        ['bag', 'map', 'cat'],
        'map',
        'A map! We can read a familiar clue in a new adventure.'
      ),
      clue('bag', ['hat', 'cup', 'bag'], 'bag', 'A bag! Let’s collect our pretend picnic things.'),
      clue(
        'hat',
        ['hat', 'net', 'sun'],
        'hat',
        'A hat! It belongs with the captain’s picnic things.'
      ),
      clue(
        'A red cup.',
        ['blue-cup', 'red-cup', 'yellow-cup'],
        'red-cup',
        'The red cup! Our reef picnic is ready. Let’s discover a shark fact.'
      )
    ]
  }
);
// Continue after the most recently completed lesson, including older pilot records.
function startReadingMission(requestedId) {
  const completed = state.readingAdventures || [],
    last = completed.at(-1),
    previous = readingMissionLibrary.findIndex(l => l.id === last?.lesson),
    lesson =
      readingMissionLibrary.find(l => typeof requestedId === 'string' && l.id === requestedId) ||
      readingMissionLibrary[
        last ? (previous + 1 + readingMissionLibrary.length) % readingMissionLibrary.length : 0
      ];
  game = {
    type: 'reading',
    mission: true,
    lesson: lesson.id,
    index: 0,
    assisted: false,
    answered: false,
    attempts: [],
    session: 'reading-reef-' + Date.now(),
    stage: 1,
    items: lesson.items
  };
  if (location.hash === '#play') render();
  else location.hash = 'play';
};
const packReadingArt = readingArt;
readingArt = function (key) {
  const colour = key.startsWith('red-')
    ? '#ee7d78'
    : key.startsWith('yellow-')
      ? '#f2d274'
      : '#86c6da';
  if (key === 'cat')
    return `<svg viewBox="0 0 120 100" aria-hidden="true"><path d="M31 38L28 12L49 26Q60 20 72 26L94 12L89 42Q107 89 62 90Q12 90 31 38Z" fill="#d9ac7a" stroke="#8b6854" stroke-width="3"/><path d="M40 56H48M75 56H83" stroke="#304e5b" stroke-width="5" stroke-linecap="round"/><path d="M56 66L63 72L70 66Z" fill="#bc7776"/><path d="M63 72V77M30 66L9 61M31 75L10 80M91 66L112 61M91 75L112 80" stroke="#8b6854" stroke-width="3"/></svg>`;
  if (key.includes('hat'))
    return `<svg viewBox="0 0 120 100" aria-hidden="true"><path d="M29 64L37 25Q60 10 83 25L91 64Z" fill="${key === 'hat' ? '#be9b70' : colour}" stroke="#6b777b" stroke-width="3"/><ellipse cx="60" cy="68" rx="51" ry="14" fill="${key === 'hat' ? '#d8b58a' : colour}" stroke="#6b777b" stroke-width="3"/><path d="M33 51Q60 60 87 51" fill="none" stroke="#f0e6c6" stroke-width="8"/></svg>`;
  if (key.includes('bag'))
    return `<svg viewBox="0 0 120 100" aria-hidden="true"><path d="M33 32Q35 11 60 12Q85 11 87 32" fill="none" stroke="#e8dfbb" stroke-width="8"/><path d="M23 32H97L105 88Q60 101 15 88Z" fill="${key === 'bag' ? '#b8a18a' : colour}" stroke="#697e82" stroke-width="3"/><path d="M35 37L30 79" stroke="#fff8d955" stroke-width="5" stroke-linecap="round"/></svg>`;
  return packReadingArt(key);
};

const mathsAdventures = [
  {
    id: 'M-F-01',
    name: 'Tiggy’s fish census',
    codes: ['AC9MFN02', 'AC9MFN03'],
    kind: 'count',
    intro: 'Tiggy is checking the reef. Tap each animal once as you count. How many are here?'
  },
  {
    id: 'M-F-02',
    name: 'Two schools meet',
    codes: ['AC9MFN04', 'AC9MFN05'],
    kind: 'join',
    intro: 'Two little schools of fish are meeting. How many fish will there be altogether?'
  },
  {
    id: 'M-F-03',
    name: 'Swim-away cove',
    codes: ['AC9MFN05'],
    kind: 'away',
    intro: 'Some fish are swimming away. The faded fish have left. How many stay in the cove?'
  },
  {
    id: 'M-F-04',
    name: 'A fair reef picnic',
    codes: ['AC9MFN06'],
    kind: 'share',
    intro:
      'We are sharing the picnic fairly. Each basket needs the same number. How many animals are in each basket?'
  }
];
function animalCollection(count, kind, cls = '') {
  return `<div class="counting-school lesson-animals animals-${count} ${cls}" aria-label="Animals to count">${Array.from({ length: count }, (_, i) => `<span data-count-animal="${i}" aria-label="Animal ${i + 1}">${seaAnimal(kind)}</span>`).join('')}</div>`;
}
let requestedMathsLesson = null;
const prePackQuestions = makeQuestions;
makeQuestions = function (type) {
  if (type !== 'maths' || (stageFor('maths') !== 1 && !requestedMathsLesson))
    return prePackQuestions(type);
  const requested = requestedMathsLesson;
  requestedMathsLesson = null;
  const number = state.completed.filter(x => x.type === 'maths').length,
    lesson =
      mathsAdventures.find(l => l.id === requested) ||
      mathsAdventures[number % mathsAdventures.length],
    cycle = Math.floor(number / mathsAdventures.length);
  return Array.from({ length: 5 }, (_, i) => {
    const kind = oceanSpecies[(number + i) % oceanSpecies.length],
      a = 1 + ((i + cycle) % 4),
      b = 1 + ((i * 2 + cycle) % 3);
    let total = a + b,
      answer,
      scene,
      hint;
    switch (lesson.kind) {
      case 'count':
        answer = [3, 5, 7, 9, 4][(i + cycle) % 5];
        scene = animalCollection(answer, kind);
        hint =
          'Tap one animal at a time. Each one glows so you can keep track. Say the last number again: that tells you how many.';
        break;
      case 'join':
        answer = total;
        scene = `<div class="maths-model"><div class="maths-group">${animalCollection(a, kind)}</div><b aria-hidden="true">+</b><div class="maths-group">${animalCollection(b, kind)}</div></div>`;
        hint = `Count the first group. Now count on ${b} more, or count all the fish once.`;
        break;
      case 'away':
        total = 4 + ((i + cycle) % 6);
        const gone = 1 + ((i + cycle) % (total - 1));
        answer = total - gone;
        scene = `<div class="maths-model subtraction-model"><div class="maths-group">${animalCollection(answer, kind)}${animalCollection(gone, kind, 'swam-away')}</div></div>`;
        hint = `There were ${total} animals. ${gone} swam away. Count only the bright animals that are still here.`;
        break;
      case 'share':
        answer = 1 + ((i + cycle) % 5);
        scene = `<div class="maths-model sharing-model"><div class="maths-group picnic-basket">${animalCollection(answer, kind)}</div><b aria-hidden="true">=</b><div class="maths-group picnic-basket">${animalCollection(answer, kind)}</div></div>`;
        hint =
          'Look at one basket. Count its animals. Then check the other basket has the same number.';
        break;
    }
    return {
      lesson: lesson.id,
      codes: lesson.codes,
      skill: lesson.kind,
      title: lesson.name,
      scene,
      prompt: lesson.intro,
      spoken: lesson.intro,
      answer: String(answer),
      choices: shuffled([answer, answer + 1, answer > 0 ? answer - 1 : answer + 2].map(String)),
      hint
    };
  });
};
const packPlay = play;
play = function () {
  packPlay();
  if (game?.type !== 'maths' || game.mission || game.answered) return;
  document.querySelectorAll('[data-count-animal]').forEach(animal => {
    animal.setAttribute('role', 'button');
    animal.setAttribute('tabindex', '0');
    animal.setAttribute('aria-pressed', 'false');
    const toggle = () => {
      animal.classList.toggle('counted');
      animal.setAttribute('aria-pressed', String(animal.classList.contains('counted')));
    };
    animal.onclick = toggle;
    animal.onkeydown = e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    };
  });
  const progress = app.querySelector('.game>.track');
  if (progress) {
    progress.classList.add('lesson-progress');
    progress.setAttribute('aria-label', game.index + ' of 5 challenges completed');
    progress.innerHTML = [0, 1, 2, 3, 4]
      .map(
        i =>
          `<i class="${i < game.index ? 'complete' : ''}" aria-hidden="true">${i < game.index ? '🐚' : '○'}</i>`
      )
      .join('');
  }
  const hint = $('#hint');
  if (hint) {
    hint.innerHTML = '<span aria-hidden="true">💡</span> Help me';
    hint.classList.add('lesson-help');
  }
  requestAnimationFrame(fitScreen);
};

let currentLessonDiscovery = null;
function nextLessonDiscovery(subject) {
  const pool = sharkBook.filter(s => s.image),
    used =
      Number(state.lessonDiscoveryCount) ||
      state.discoveries.filter(x => x.startsWith('lesson-fact-')).length,
    s = pool[used % pool.length],
    fact = s.facts[Math.floor(used / pool.length) % s.facts.length];
  currentLessonDiscovery = {
    id: 'lesson-fact-' + s.id + '-' + (Math.floor(used / pool.length) % s.facts.length),
    name: s.name,
    text: s.name + '. ' + fact[1],
    image: 'assets/' + s.image,
    source: s.source,
    subject
  };
  if (!state.discoveries.includes(currentLessonDiscovery.id)) {
    state.discoveries.push(currentLessonDiscovery.id);
  }
  state.lessonDiscoveryCount = used + 1;
  save();
  return currentLessonDiscovery;
}
let completedLessonType = null;
const packFinish = finish;
finish = function () {
  const active = game;
  if (active) completedLessonType = active.type;
  packFinish();
  if (active?.type !== 'maths') return;
  const discovery = nextLessonDiscovery('maths'),
    box = app.querySelector('.activity-fact-reward');
  if (box) {
    box.innerHTML = `<img class="lesson-discovery-photo" src="${discovery.image}" alt="${discovery.name}"><strong>${discovery.name}</strong><button id="hearLessonDiscovery">♫ Hear our discovery</button>`;
    $('#hearLessonDiscovery').onclick = () => helperSpeak(discovery.text);
    screenNarration = discovery.text;
    helperSpeak('We did it, Haytham! ' + discovery.text);
    requestAnimationFrame(fitScreen);
  }
};

const writingAdventures = [
  { id: 'W-F-01A', target: 'c', goal: 'Let’s make a little c for our captain’s log.' },
  { id: 'W-F-01B', target: 'a', goal: 'Let’s make an a for our adventure log.' },
  { id: 'W-F-01C', target: 't', goal: 'Let’s make a t for our treasure label.' },
  { id: 'W-F-02A', target: 'cat', goal: 'Let’s write cat for our pretend ship’s cat.' }
];
let guidedWriting = null,
  freeWriting = false,
  writingStepTimer = null;
const packWriting = writing;
writing = function () {
  clearTimeout(writingStepTimer);
  if (freeWriting) {
    packWriting();
    decorateWritingLagoon();
    const resume = document.createElement('button');
    resume.className = 'quiet';
    resume.textContent = 'Dash’s adventure';
    resume.onclick = () => {
      freeWriting = false;
      guidedWriting = null;
      writing();
    };
    app.querySelector('.writing-controls').append(resume);
    const finish = $('#finishWriting'),
      submit = finish.onclick;
    finish.onclick = () => {
      const before = (state.writingHistory || []).length;
      submit();
      if ((state.writingHistory || []).length > before) {
        const discovery = nextLessonDiscovery('writing');
        helperSpeak('Lovely practising, Haytham! ' + discovery.text);
      }
    };
    return;
  }
  if (!guidedWriting) {
    const count = (state.writingLessons || []).length;
    guidedWriting = {
      lesson: writingAdventures[count % writingAdventures.length],
      step: 0,
      samples: [],
      session: 'writing-' + Date.now()
    };
  }
  const active = guidedWriting,
    step = active.step;
  writingChoice = active.lesson.target;
  writingMode = active.guideOverride || (step === 0 ? 'trace' : 'free');
  packWriting();
  decorateWritingLagoon();
  const board = $('.writing-board'),
    banner = document.createElement('div');
  banner.className = 'writing-mission-prompt';
  banner.innerHTML = `<strong>${active.lesson.target}</strong><span>${['Trace in the sand', 'Copy in the sand', 'Your sandy letter'][step]}</span><div class="writing-shell-steps" aria-label="${step} of 3 writing steps completed">${[0, 1, 2].map(i => `<i class="${i < step ? 'complete' : ''}" aria-hidden="true">${i < step ? '🐚' : '○'}</i>`).join('')}</div>`;
  board.before(banner);
  const instruction =
    active.lesson.goal +
    ' ' +
    [
      'First, watch the strokes if you want, then trace the glowing trail in the sand.',
      'Now copy the letter or word above into the sand. Take your time.',
      'Now have another go on your own. You can ask Dash for help or bring the guide back.'
    ][step];
  if (step === 2) banner.querySelector('strong').classList.add('independent-model');
  helperSpeak(instruction);
  const choose = $('#writingChoice'),
    originalChange = choose.onchange;
  choose.onchange = e => {
    freeWriting = true;
    guidedWriting = null;
    originalChange(e);
  };
  document.querySelectorAll('[data-writing-mode]').forEach(
    b =>
      (b.onclick = () => {
        active.guideOverride = b.dataset.writingMode;
        if (active.guideOverride === 'trace' && step > 0) active.helped = true;
        writing();
      })
  );
  if (writingMode === 'free') {
    $('#showStrokes').textContent = 'Show guide';
    $('#showStrokes').onclick = () => {
      active.guideOverride = 'trace';
      active.helped = true;
      writing();
    };
  }
  const done = $('#finishWriting'),
    originalDone = done.onclick;
  done.onclick = () => {
    const before = (state.writingHistory || []).length;
    originalDone();
    if ((state.writingHistory || []).length === before) return;
    const sample = state.writingHistory.at(-1);
    Object.assign(sample, {
      lesson: active.lesson.id,
      step: ['trace', 'copy', 'independent-try'][step],
      supported: step < 2 || !!active.helped || sample.mode === 'trace',
      codes: ['AC9EFLY08', ...(active.lesson.target.length > 1 ? ['AC9EFLY12'] : [])]
    });
    active.samples.push({ ...sample });
    // The base sample earns an extra's pearls; guided steps top up to the adventure rate.
    state.xp += Math.max(0, pearlsPerStep(3) - PEARLS.extra);
    save();
    const started = Date.now();
    function next() {
      if (guidedWriting !== active || location.hash !== '#writing') return;
      if (document.body.classList.contains('milo-speaking') && Date.now() - started < 7000) {
        writingStepTimer = setTimeout(next, 250);
        return;
      }
      if (step < 2) {
        active.step++;
        delete active.guideOverride;
        active.helped = false;
        writing();
      } else finishWritingAdventure(active);
    }
    writingStepTimer = setTimeout(next, 2600);
  };
  requestAnimationFrame(fitScreen);
};
function finishWritingAdventure(active) {
  state.writingLessons = state.writingLessons || [];
  if (!state.writingLessons.some(l => l.session === active.session)) {
    state.writingLessons.push({
      id: active.lesson.id,
      session: active.session,
      samples: active.samples,
      at: new Date().toISOString()
    });
    state.xp += pearlCompletionBonus(3);
    save();
  }
  guidedWriting = null;
  const discovery = nextLessonDiscovery('writing');
  if (writingCleanup) writingCleanup();
  app.innerHTML = `<section class="lesson-finish"><h1>Lovely practising!</h1><img class="lesson-discovery-photo" src="${discovery.image}" alt="${discovery.name}"><h2>${discovery.name}</h2><button id="writingDiscoveryListen">♫ Hear our discovery</button><a class="primary" href="#home">Back to My Reef</a></section>`;
  $('#writingDiscoveryListen').onclick = () => helperSpeak(discovery.text);
  screenNarration = discovery.text;
  helperSpeak('Lovely practising, Haytham! ' + discovery.text);
  setMiloMood('highfive');
  requestAnimationFrame(fitScreen);
}

const packAdvanceLearning = advanceLearning;
advanceLearning = function (type) {
  if (type === 'maths') {
    const progress = learningState().maths,
      current = stageFor('maths');
    if (game?.type === 'maths' && game.stage !== current) return false;
    const recent = state.history
      .filter(x => x.type === 'maths')
      .slice(progress.baseline)
      .filter(x => !x.stage || x.stage === current);
    if (
      recent.length < 15 ||
      recent.slice(-15).filter(x => x.independent).length < 12 ||
      new Set(recent.slice(-15).map(x => x.session)).size < 3
    )
      return false;
    if (
      current === 1 &&
      mathsAdventures.some(lesson => recent.filter(x => x.lesson === lesson.id).length < 5)
    )
      return false;
  }
  return packAdvanceLearning(type);
};

function writingPracticePreview() {
  const samples = (state.writingHistory || []).filter(s => Array.isArray(s.ink)).slice(-3);
  if (!samples.length) return '';
  return (
    '<div class="parent-writing-samples" aria-label="Recent saved writing samples">' +
    samples
      .map(s => {
        const target = String(s.character)
          .replace(/[^a-zA-Z0-9]/g, '')
          .slice(0, 10);
        const height = Math.round(400 / (Number(s.aspect) || 4 / 3));
        const paths = s.ink.map(points =>
          points
            .filter(p => Number.isFinite(p.x) && Number.isFinite(p.y))
            .map((p, i) => (i ? 'L' : 'M') + p.x + ' ' + p.y)
            .join(' ')
        );
        return `<figure><svg viewBox="0 0 400 ${height}" role="img" aria-label="Saved practice of ${target}"><g transform="scale(1 ${height / 300})"><path d="M0 110H400M0 225H400" stroke="#a2bec4" stroke-dasharray="5 6"/>${paths.map(d => `<path d="${d}" fill="none" stroke="#075e74" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}</g></svg><figcaption>${target} · ${s.mode === 'trace' ? 'traced' : s.step === 'copy' ? 'copied' : 'freehand practice'}</figcaption></figure>`;
      })
      .join('') +
    '</div><p class="muted">Recent writing is saved on this device for grown-up review. The app does not grade letter formation.</p>'
  );
}

function decorateWritingLagoon() {
  const board = $('.writing-board');
  if (!board) return;
  board.classList.add('sand-lagoon');
  $('#writingGuide').setAttribute('preserveAspectRatio', 'xMidYMid meet');
  board.insertAdjacentHTML(
    'afterbegin',
    `<svg class="lagoon-reef-border" viewBox="0 0 800 400" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke-linecap="round"><path d="M20 400Q50 335 18 310M35 400Q70 355 63 325M777 400Q741 345 770 314M761 400Q724 375 730 344" stroke="#72a894" stroke-width="8"/><path d="M17 400Q39 360 26 342M782 400Q763 367 779 338" stroke="#a0c3a2" stroke-width="5"/></g><g transform="translate(42 35) rotate(-18)"><path d="M0 25L-20 1Q-25-20-9-15Q0-33 9-15Q27-17 20 1Z" fill="#f5e4c4" stroke="#c6a378" stroke-width="2"/><path d="M0 25V-16M0 25L-14-9M0 25L14-9" stroke="#d1ae89" stroke-width="1.5"/></g><path d="M747 31L752 44L768 43L756 54L762 69L748 61L734 69L738 54L725 44L742 44Z" fill="#d99175" opacity=".8"/></svg><div class="sand-sparkles" aria-hidden="true"></div><div class="sand-wash" aria-hidden="true"></div>`
  );
  const canvas = $('#writingCanvas'),
    particles = board.querySelector('.sand-sparkles');
  let last = 0;
  const magic = e => {
    if (e.type === 'pointermove' && !e.buttons) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const now = performance.now();
    if (now - last < 45) return;
    last = now;
    const r = board.getBoundingClientRect(),
      bubble = document.createElement('i');
    bubble.className = 'sand-bubble';
    bubble.style.left = e.clientX - r.left + 'px';
    bubble.style.top = e.clientY - r.top + 'px';
    bubble.style.setProperty('--bubble-drift', (Math.random() - 0.5) * 35 + 'px');
    particles.append(bubble);
    setTimeout(() => bubble.remove(), 900);
  };
  canvas.addEventListener('pointerdown', magic);
  canvas.addEventListener('pointermove', magic);
  const clear = $('#clearInk'),
    originalClear = clear.onclick;
  clear.onclick = () => {
    originalClear();
    board.classList.remove('washing-sand');
    void board.offsetWidth;
    board.classList.add('washing-sand');
    setTimeout(() => board.classList.remove('washing-sand'), 1000);
  };
  const icons = {
    showStrokes: '<path d="M16 3L19 12L28 16L19 19L16 28L12 19L3 16L12 12Z"/>',
    undoInk: '<path d="M10 7L3 14L10 21M4 14H19Q31 14 27 25"/>',
    clearInk: '<path d="M2 12Q7 5 12 12T22 12T32 12M2 23Q7 16 12 23T22 23T32 23"/>',
    finishWriting: '<path d="M4 17L12 25L28 7"/>'
  };
  for (const [id, path] of Object.entries(icons)) {
    const button = $('#' + id);
    button.innerHTML = `<svg viewBox="0 0 34 34" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${path}</svg><span>${id === 'clearInk' ? 'Wave away' : id === 'finishWriting' ? 'My sandy letter' : id === 'undoInk' ? 'Undo' : 'Show me'}</span>`;
  }
  $('#writingCanvas').setAttribute(
    'aria-label',
    'Sand writing lagoon. Trace or write with your finger or Apple Pencil.'
  );
}

const readingAdventureNames = [
  'Secret reef',
  'Sunken picnic',
  'Captain’s hat',
  'Treasure bag',
  'Sunny voyage',
  'Reef picnic'
];
const mathsAdventureNames = [
  'Count the fish',
  'Fish friends meet',
  'Swim-away cove',
  'Share a picnic'
];
let lessonShelfPage = 0,
  lessonShelfType = null;
const packLibraryPage = libraryPage;
libraryPage = function () {
  const type = location.hash.split('/')[1];
  if (!['reading', 'maths', 'writing'].includes(type)) {
    packLibraryPage();
    document.querySelectorAll('[data-library-route]').forEach(b => {
      if (['reading', 'maths', 'writing'].includes(b.dataset.libraryRoute))
        b.onclick = () => {
          lessonShelfPage = 0;
          location.hash = 'library/' + b.dataset.libraryRoute;
        };
    });
    return;
  }
  if (lessonShelfType !== type) {
    lessonShelfPage = 0;
    lessonShelfType = type;
  }
  const records =
    type === 'reading'
      ? readingMissionLibrary
      : type === 'maths'
        ? mathsAdventures
        : writingAdventures;
  const pages = Math.ceil(records.length / 3);
  lessonShelfPage = Math.max(0, Math.min(lessonShelfPage, pages - 1));
  const friend = { reading: 'Willa', maths: 'Tiggy', writing: 'Dash' }[type];
  const name = (record, index) =>
    record.shelfName ||
    (type === 'reading'
      ? readingAdventureNames[index]
      : type === 'maths'
        ? mathsAdventureNames[index]
        : ['Captain’s c', 'Adventure a', 'Treasure t', 'Ship’s cat'][index]);
  const practised = record =>
    type === 'reading'
      ? (state.readingAdventures || []).some(s => s.lesson === record.id)
      : type === 'maths'
        ? state.history.some(s => s.lesson === record.id)
        : (state.writingLessons || []).some(s => s.id === record.id);
  const art = (record, index) =>
    type === 'reading'
      ? readingArt(record.items[0].answer)
      : type === 'writing'
        ? `<svg viewBox="0 0 180 120" aria-hidden="true"><path d="M12 99H168" stroke="#c0aa79" stroke-width="3" stroke-dasharray="5 7"/><text x="90" y="87" text-anchor="middle" fill="#765332" font-family="Trebuchet MS,system-ui,sans-serif" font-weight="700" font-size="${record.target.length > 1 ? 62 : 92}">${record.target}</text></svg>`
        : typeof schoolMathsCardArt === 'function' && schoolMathsCardArt(record)
          ? schoolMathsCardArt(record)
          : record.kind === 'count'
            ? seaAnimal('tuna')
            : record.kind === 'join'
              ? `<div class="lesson-mini-model">${seaAnimal('clownfish')}<b>+</b>${seaAnimal('clownfish')}</div>`
              : record.kind === 'away'
                ? `<div class="lesson-mini-model">${seaAnimal('salmon')}<b>→</b></div>`
                : `<div class="lesson-mini-model">${seaAnimal('turtle')}<b>=</b>${seaAnimal('turtle')}</div>`;
  app.innerHTML = `<section class="lesson-shelf"><h1>Adventures with ${friend}</h1><div class="lesson-shelf-cards">${records
    .slice(lessonShelfPage * 3, lessonShelfPage * 3 + 3)
    .map((record, offset) => {
      const index = lessonShelfPage * 3 + offset;
      return `<button class="lesson-shelf-card" data-lesson="${record.id}" aria-label="Play ${name(record, index)}${practised(record) ? ', practised before' : ''}"><span class="lesson-card-art ${type === 'writing' ? 'sand-card' : ''}">${art(record, index)}</span><strong>${name(record, index)}</strong>${practised(record) ? '<span class="lesson-practised" aria-hidden="true">🐚</span>' : ''}</button>`;
    })
    .join(
      ''
    )}</div><div class="lesson-shelf-pages"><button id="previousLessonPage" aria-label="Previous adventures" ${lessonShelfPage === 0 ? 'disabled' : ''}>←</button><span>${lessonShelfPage + 1} / ${pages}</span><button id="nextLessonPage" aria-label="More adventures" ${lessonShelfPage === pages - 1 ? 'disabled' : ''}>→</button></div></section>`;
  $('#previousLessonPage').onclick = () => {
    lessonShelfPage--;
    libraryPage();
  };
  $('#nextLessonPage').onclick = () => {
    lessonShelfPage++;
    libraryPage();
  };
  document.querySelectorAll('[data-lesson]').forEach(button => {
    const index = records.findIndex(r => r.id === button.dataset.lesson),
      record = records[index];
    button.onclick = () => {
      stopSpeech();
      if (type === 'reading') startReadingMission(record.id);
      if (type === 'maths') {
        requestedMathsLesson = record.id;
        start('maths');
        game.stage = 1;
      }
      if (type === 'writing') {
        freeWriting = false;
        guidedWriting = { lesson: record, step: 0, samples: [], session: 'writing-' + Date.now() };
        location.hash = 'writing';
      }
    };
    button.onpointerenter = e => {
      if (e.pointerType !== 'touch') helperSpeak(name(record, index));
    };
    button.onfocus = () => helperSpeak(name(record, index));
  });
  helperSpeak('Choose a picture, Haytham. ' + friend + ' and Milo are ready for an adventure.');
  requestAnimationFrame(fitScreen);
};
const packCrewForRoute = crewForRoute;
crewForRoute = function () {
  if (location.hash === '#play' && !game && completedLessonType)
    return completedLessonType === 'fossil' || completedLessonType === 'science'
      ? 'gizmo'
      : completedLessonType === 'reading'
        ? 'willa'
        : 'tiggy';
  if (location.hash.startsWith('#library/'))
    return (
      { reading: 'willa', maths: 'tiggy', writing: 'dash' }[location.hash.split('/')[1]] || null
    );
  return packCrewForRoute();
};
