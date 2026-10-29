/* Science with Gizmo (24 October 2026). Foundation Science, built around real sharks.
 *
 * Five picture-based, voice-led adventures:
 *   S-F-01 Shark spotters      observe external features in real photos       AC9SFU01
 *   S-F-02 Fish or not a fish? group animals by features (fins and gills)      AC9SFU01, AC9SFI03
 *   S-F-03 Sink or float?      predict, then observe; materials               AC9SFI01, AC9SFI04, AC9SFU03
 *   S-F-04 How do they move?   how animals move                               AC9SFU02
 *   S-F-05 Real or pretend?    real today, extinct, or make-believe           AC9SFH01
 * Facts come from the encyclopedia's sourced entries where possible. Predictions are never
 * marked wrong: they are compared with what happened, as scientists do. Practice evidence only.
 */

const scienceCodes = {
  observe: ['AC9SFU01'],
  sort: ['AC9SFU01', 'AC9SFI03'],
  predict: ['AC9SFI01', 'AC9SFI04', 'AC9SFU03'],
  move: ['AC9SFU02'],
  real: ['AC9SFH01']
};
function photo(file, name) {
  return { art: `<img class="science-photo" src="assets/${file}" alt="">`, name };
}
const scienceArt = {
  hammerhead: photo('hammerhead.jpg', 'Hammerhead'),
  white: photo('white-shark.jpg', 'Great white'),
  whale: photo('whale-shark.jpg', 'Whale shark'),
  tiger: photo('tiger-shark.jpg', 'Tiger shark'),
  mako: photo('mako-shark.jpg', 'Mako'),
  goblin: photo('goblin-shark.jpg', 'Goblin shark'),
  basking: photo('basking-shark.jpg', 'Basking shark'),
  epaulette: photo('epaulette-shark.jpg', 'Epaulette shark'),
  megalodon: photo('visual-megalodon.jpg', 'Megalodon'),
  kraken: photo('visual-kraken.jpg', 'The Kraken'),
  milo: { art: '<img class="science-photo contain" src="assets/milo-3d.webp" alt="">', name: 'Milo' }
};
// Clearer pictures (25 Oct feedback: "the pictures weren't clear enough"): each shark uses its
// best encyclopedia photo, chosen so the feature in the question is easy to see, shown whole.
if (typeof sharkPhotoData !== 'undefined')
  for (const [key, id, n] of [
    ['hammerhead', 'hammerhead', 0],
    ['white', 'white', 0],
    ['whale', 'whale', 0],
    ['tiger', 'tiger', 0],
    ['mako', 'mako', 0],
    ['goblin', 'goblin', 0],
    ['basking', 'basking', 0],
    ['epaulette', 'epaulette', 0]
  ]) {
    const p = sharkPhotoData[id]?.[n];
    if (p)
      scienceArt[key].art = `<span class="science-photo-frame"><span class="science-photo-fill" style="background-image:url('assets/${p.file}')"></span><img class="science-photo contain" src="assets/${p.file}" alt=""></span>`;
  }
// Science pictures: the lesson's own art, then any extra source (real sea-animal photos from
// quiz-pictures.js), then the drawn sea animal, then any reading picture.
const sciencePictureSources = [];
function sciencePicture(key) {
  if (!key) return '';
  if (scienceArt[key]) return scienceArt[key].art;
  for (const source of sciencePictureSources) {
    const art = source(key);
    if (art) return art;
  }
  if (['tuna', 'crab', 'turtle', 'clownfish', 'squid', 'dolphin', 'octopus'].includes(key))
    return seaAnimal(key);
  return readingArt(key);
}
function moveIcon(kind) {
  const paths = {
    tail: '<path d="M10 40Q34 22 58 34L72 18L68 40L72 62L58 46Q34 58 10 40Z"/><path d="M78 28Q86 40 78 52M86 22Q98 40 86 58"/>',
    walk: '<path d="M14 54H72"/><path d="M24 54L30 40M38 54L32 40M50 54L56 40M64 54L58 40"/><ellipse cx="44" cy="34" rx="22" ry="9"/>',
    jet: '<path d="M30 22Q48 10 66 22Q72 40 48 64Q24 40 30 22Z"/><path d="M48 66V80M38 68L32 80M58 68L64 80"/>',
    flippers:
      '<ellipse cx="46" cy="40" rx="18" ry="13"/><path d="M30 34L10 22M30 46L12 58M62 34L80 24M62 46L78 58"/>',
    sink: '<path d="M10 22H80"/><path d="M45 30V72M33 60L45 72L57 60"/>',
    float: '<path d="M10 40Q22 34 34 40T58 40T82 40"/><circle cx="46" cy="28" r="9"/>',
    fish: '<path d="M12 40Q36 18 62 36L78 24L74 40L78 56L62 44Q36 62 12 40Z"/><circle cx="26" cy="37" r="2.5"/>',
    notfish: '<circle cx="46" cy="40" r="26"/><path d="M28 58L64 22"/>',
    today:
      '<circle cx="46" cy="40" r="20"/><path d="M46 8V16M46 64V72M14 40H22M70 40H78M23 17L29 23M63 57L69 63M23 63L29 57M63 23L69 17"/>',
    longago:
      '<path d="M30 16H62M30 64H62M34 16Q34 36 46 40Q58 44 58 64M58 16Q58 36 46 40Q34 44 34 64"/>',
    pretend: '<path d="M46 12L54 32L76 32L58 46L66 68L46 54L26 68L34 46L16 32L38 32Z"/>'
  };
  return `<svg class="science-icon" viewBox="0 0 92 80" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${paths[kind]}</svg>`;
}
const choiceLabels = {
  tail: 'Swishes its tail',
  walk: 'Walks',
  jet: 'Squirts water',
  flippers: 'Flaps flippers',
  sink: 'Sink',
  float: 'Float',
  fish: 'Fish',
  notfish: 'Not a fish',
  today: 'Real today',
  longago: 'Real long ago',
  pretend: 'Pretend'
};

const scienceLessons = [
  {
    id: 'S-F-01',
    shelfName: 'Shark spotters',
    intro: 'Scientists look very closely. Let’s spot what makes each shark special!',
    items: [
      {
        kind: 'photo',
        ask: 'Which shark has a wide, hammer-shaped head?',
        options: ['white', 'hammerhead', 'whale'],
        answer: 'hammerhead',
        reveal: 'The hammerhead! Its wide head has special sensors that help it find food.'
      },
      {
        kind: 'photo',
        ask: 'Which shark has pale spots all over its back?',
        options: ['whale', 'tiger', 'mako'],
        answer: 'whale',
        reveal: 'The whale shark! It is the biggest fish in the sea.'
      },
      {
        kind: 'photo',
        ask: 'Which shark has a long, flat snout?',
        options: ['basking', 'white', 'goblin'],
        answer: 'goblin',
        reveal: 'The goblin shark! Its flat snout helps it search for food in the deep.'
      },
      {
        kind: 'photo',
        ask: 'Which shark has a big dark spot behind its fin?',
        options: ['tiger', 'epaulette', 'hammerhead'],
        answer: 'epaulette',
        reveal: 'The epaulette shark! That dark spot helps us recognise it.'
      },
      {
        kind: 'photo',
        ask: 'Which shark has a pointed nose and a strong tail for speed?',
        options: ['mako', 'whale', 'goblin'],
        answer: 'mako',
        reveal: 'The mako! Its pointed nose and strong tail help it swim fast, like Dash.'
      }
    ],
    codes: scienceCodes.observe
  },
  {
    id: 'S-F-02',
    shelfName: 'Fish or not a fish?',
    intro: 'Fish have fins and breathe with gills. Let’s sort the sea animals!',
    items: [
      {
        kind: 'sort',
        animal: 'tuna',
        ask: 'A tuna. Is it a fish?',
        options: ['fish', 'notfish'],
        answer: 'fish',
        reveal: 'Yes! A tuna has fins and breathes with gills.'
      },
      {
        kind: 'sort',
        animal: 'crab',
        ask: 'A crab. Is it a fish?',
        options: ['fish', 'notfish'],
        answer: 'notfish',
        reveal: 'Not a fish! A crab has legs and a hard shell, and no fins.'
      },
      {
        kind: 'sort',
        animal: 'whale',
        ask: 'A whale shark. Is it a fish?',
        options: ['fish', 'notfish'],
        answer: 'fish',
        reveal: 'Yes! A whale shark is a fish, even with whale in its name. It breathes with gills.'
      },
      {
        kind: 'sort',
        animal: 'turtle',
        ask: 'A sea turtle. Is it a fish?',
        options: ['fish', 'notfish'],
        answer: 'notfish',
        reveal: 'Not a fish! Sea turtles breathe air with lungs. They are reptiles.'
      },
      {
        kind: 'sort',
        animal: 'clownfish',
        ask: 'A clownfish. Is it a fish?',
        options: ['fish', 'notfish'],
        answer: 'fish',
        reveal: 'Yes! A clownfish has fins and gills.'
      },
      {
        kind: 'sort',
        animal: 'dolphin',
        ask: 'A dolphin. Is it a fish?',
        options: ['fish', 'notfish'],
        answer: 'notfish',
        reveal: 'Not a fish! Dolphins breathe air, like us. They are mammals.'
      }
    ],
    codes: scienceCodes.sort
  },
  {
    id: 'S-F-03',
    shelfName: 'Sink or float?',
    intro: 'Scientists guess first, then test. Will it sink or float? Make your guess!',
    items: [
      {
        kind: 'predict',
        object: 'rock',
        ask: 'A rock. Will it sink or float?',
        options: ['sink', 'float'],
        answer: 'sink',
        reveal: 'It sank! A rock is heavy for its size.'
      },
      {
        kind: 'predict',
        object: 'duck',
        ask: 'A toy duck. Will it sink or float?',
        options: ['sink', 'float'],
        answer: 'float',
        reveal: 'It floats! The plastic duck is full of air.'
      },
      {
        kind: 'predict',
        object: 'spoon',
        ask: 'A metal spoon. Will it sink or float?',
        options: ['sink', 'float'],
        answer: 'sink',
        reveal: 'It sank! This spoon is made of metal.'
      },
      {
        kind: 'predict',
        object: 'ship',
        ask: 'A little wooden boat. Will it sink or float?',
        options: ['sink', 'float'],
        answer: 'float',
        reveal: 'It floats! Wood floats, and the boat’s shape helps too.'
      },
      {
        kind: 'predict',
        object: 'shell',
        ask: 'A sea shell. Will it sink or float?',
        options: ['sink', 'float'],
        answer: 'sink',
        reveal: 'It sank to the bottom, where shells are found on the sea floor.'
      }
    ],
    outro:
      'Sharks don’t sink to the bottom when they swim. Most sharks have a big, oily liver that helps them stay up in the water.',
    codes: scienceCodes.predict
  },
  {
    id: 'S-F-04',
    shelfName: 'How do they move?',
    intro: 'Sea animals move in different ways. How does each one move?',
    items: [
      {
        kind: 'move',
        animal: 'white',
        ask: 'How does a great white shark swim?',
        options: ['tail', 'walk', 'jet'],
        answer: 'tail',
        reveal: 'It swishes its tail from side to side. Its fins help it steer.'
      },
      {
        kind: 'move',
        animal: 'crab',
        ask: 'How does a crab move?',
        options: ['jet', 'walk', 'tail'],
        answer: 'walk',
        reveal: 'A crab walks on its legs, often sideways!'
      },
      {
        kind: 'move',
        animal: 'squid',
        ask: 'How does a squid zoom away?',
        options: ['walk', 'tail', 'jet'],
        answer: 'jet',
        reveal: 'A squid squirts water out to shoot away, like a little rocket.'
      },
      {
        kind: 'move',
        animal: 'epaulette',
        ask: 'An epaulette shark. How does it get around the reef floor?',
        options: ['jet', 'walk', 'flippers'],
        answer: 'walk',
        reveal: 'It walks! It bends its body and uses its fins to clamber along the bottom.'
      },
      {
        kind: 'move',
        animal: 'turtle',
        ask: 'How does a sea turtle swim?',
        options: ['flippers', 'jet', 'walk'],
        answer: 'flippers',
        reveal: 'It flaps its big flippers, like wings under the water.'
      }
    ],
    codes: scienceCodes.move
  },
  {
    id: 'S-F-05',
    shelfName: 'Real or pretend?',
    intro: 'Is it a real animal today, a real animal from long ago, or pretend?',
    items: [
      {
        kind: 'real',
        animal: 'whale',
        ask: 'A whale shark.',
        options: ['today', 'longago', 'pretend'],
        answer: 'today',
        reveal: 'Real today! Whale sharks swim in warm seas right now.'
      },
      {
        kind: 'real',
        animal: 'megalodon',
        ask: 'Megalodon.',
        options: ['today', 'longago', 'pretend'],
        answer: 'longago',
        reveal:
          'Real, long ago! Megalodon is extinct. Scientists learn about it from huge fossil teeth.'
      },
      {
        kind: 'real',
        animal: 'kraken',
        ask: 'The Kraken.',
        options: ['today', 'longago', 'pretend'],
        answer: 'pretend',
        reveal: 'Pretend! The Kraken is a sea legend from old stories.'
      },
      {
        kind: 'real',
        animal: 'milo',
        ask: 'Milo, who talks and wears a monocle.',
        options: ['today', 'longago', 'pretend'],
        answer: 'pretend',
        reveal: 'Pretend! Milo is our imaginary friend. Real megalodons lived long ago.'
      },
      {
        kind: 'real',
        animal: 'white',
        ask: 'A great white shark.',
        options: ['today', 'longago', 'pretend'],
        answer: 'today',
        reveal: 'Real today! Great whites live in seas around Australia.'
      }
    ],
    codes: scienceCodes.real
  }
];

// ---------------------------------------------------------------- playing
function startScienceMission(id) {
  const done = state.scienceLessons || [],
    last = done.at(-1),
    previous = scienceLessons.findIndex(l => l.id === last?.lesson),
    lesson =
      scienceLessons.find(l => l.id === id) ||
      scienceLessons[last ? (previous + 1) % scienceLessons.length : 0];
  game = {
    type: 'science',
    mission: true,
    science: true,
    lesson: lesson.id,
    index: 0,
    assisted: false,
    answered: false,
    attempts: [],
    session: 'science-' + Date.now(),
    stage: 1,
    items: lesson.items.map(q => ({ ...q, codes: lesson.codes }))
  };
  if (location.hash === '#play') render();
  else location.hash = 'play';
}
function scienceLesson() {
  return scienceLessons.find(l => l.id === game?.lesson);
}
function scienceSubject(q) {
  if (q.kind === 'photo') return '';
  const key = q.animal || q.object;
  return `<div class="science-subject ${q.kind === 'predict' ? 'science-tank' : ''}">${q.kind === 'predict' ? '<i class="tank-water"></i>' : ''}<span class="science-thing">${sciencePicture(key)}</span></div>`;
}
function scienceMission() {
  const lesson = scienceLesson(),
    q = game.items[game.index];
  if (!q) return finishScienceMission();
  const total = game.items.length,
    photos = q.kind === 'photo';
  app.innerHTML = `<section class="reading-quest school-quest science-quest kind-${q.kind}"><div class="game-top"><button id="questInstructions" class="quiet">${paintedIcon('speaker-blue')} Hear instructions</button></div><span class="tag">GIZMO’S SCIENCE</span><h1>${lesson.shelfName}</h1><div class="quest-trail" aria-label="${game.index} of ${total} solved">${game.items.map((_, i) => `<span class="${i < game.index ? 'found' : ''}" aria-hidden="true">${paintedIcon(i < game.index ? 'shell' : 'spot')}</span>`).join('<i>···</i>')}</div><div class="quest-scroll"><p>${q.ask}</p>${scienceSubject(q)}<div class="quest-pictures science-choices ${photos ? 'photo-choices' : 'icon-choices'}">${q.options.map((key, i) => `<button data-science-choice="${i}" aria-label="${photos ? scienceArt[key].name : choiceLabels[key]}">${photos ? `${scienceArt[key].art}<span class="science-label">${scienceArt[key].name}</span>` : `${moveIcon(key)}<span class="science-label">${choiceLabels[key]}</span>`}</button>`).join('')}</div><p id="questFeedback" role="status"></p><div class="quest-actions"><button id="questHint"><span aria-hidden="true">${paintedIcon('bulb')}</span><span class="hint-label">Help me</span></button><button id="questNext" class="primary" hidden>Next →</button></div></div></section>`;
  const say = () =>
    helperSpeak(
      (game.index === 0 ? lesson.intro + ' ' : '') +
        q.ask +
        (photos ? '' : ' ' + q.options.map(k => choiceLabels[k]).join(', or ') + '?')
    );
  $('#questInstructions').onclick = say;
  $('#questHint').onclick = () => scienceHelp(q);
  $('#questNext').onclick = () => {
    game.index++;
    game.assisted = false;
    game.answered = false;
    scienceMission();
  };
  document.querySelectorAll('[data-science-choice]').forEach(b => {
    const key = q.options[+b.dataset.scienceChoice];
    b.onclick = () => scienceAnswer(key, b);
    b.onpointerenter = e => {
      if (e.pointerType !== 'touch')
        speak(photos ? scienceArt[key].name : choiceLabels[key], { speaker: 'gizmo' });
    };
  });
  updateMilo('Gizmo and I are science explorers today, Haytham!');
  say();
  requestAnimationFrame(fitScreen);
}
function scienceHelp(q) {
  if (game.answered) return;
  if (q.kind !== 'predict') game.assisted = true;
  const tips = {
    photo: 'Look closely at each photo. Find the shark with that special feature.',
    sort: 'Does it have fins and breathe with gills under water? Then it is a fish.',
    predict: 'Think about it: is it heavy for its size? Is it full of air? There’s no wrong guess.',
    move: 'Think about its body. Does it have a tail, legs, or big flippers?',
    real: 'Can we see it in the sea today? Did it live long ago? Or is it from a story?'
  };
  $('#questFeedback').textContent = tips[q.kind];
  if (typeof reactCrew === 'function') reactCrew('thinking', 'gizmo');
  helperSpeak(tips[q.kind]);
}
function scienceAnswer(value, button) {
  if (!game?.science || game.answered) return;
  const q = game.items[game.index],
    predict = q.kind === 'predict';
  if (!predict && value !== q.answer) {
    game.assisted = true;
    button.classList.add('tried-choice');
    $('#questFeedback').textContent = 'Good try! Let’s look again.';
    if (typeof reactCrew === 'function') reactCrew('thinking', 'gizmo');
    helperSpeak('Good try, Haytham. Let’s look again.');
    return;
  }
  game.answered = true;
  state.xp += pearlsPerStep(game.items.length);
  game.attempts.push({
    item: game.index,
    kind: q.kind,
    codes: q.codes,
    prediction: predict ? value : undefined,
    matched: predict ? value === q.answer : undefined,
    supported: predict ? undefined : game.assisted,
    at: new Date().toISOString()
  });
  save();
  document.querySelectorAll('[data-science-choice]').forEach(b => {
    b.disabled = true;
    b.classList.toggle('chosen-correct', b === button);
  });
  ($('#questHint') || {}).hidden = true;
  ($('#questNext') || {}).hidden = false;
  let line = q.reveal;
  if (predict) {
    // Show the test: the object drops to the bottom or bobs at the top of the water.
    app
      .querySelector('.science-tank')
      ?.classList.add(q.answer === 'sink' ? 'test-sink' : 'test-float');
    line = (value === q.answer ? 'Your guess matched! ' : 'Let’s see what happened. ') + q.reveal;
  }
  $('#questFeedback').textContent = line;
  joyfulReaction(line, 'gizmo');
  advanceAfterCelebration();
}
function finishScienceMission() {
  const finished = game,
    lesson = scienceLesson();
  state.scienceLessons = state.scienceLessons || [];
  if (!state.scienceLessons.some(x => x.session === finished.session)) {
    state.scienceLessons.push({
      lesson: finished.lesson,
      session: finished.session,
      attempts: finished.attempts,
      at: new Date().toISOString()
    });
    state.completed.push({
      type: 'science-adventure',
      session: finished.session,
      at: new Date().toISOString()
    });
    state.xp += pearlCompletionBonus(finished.items.length);
    save();
  }
  game.answered = true;
  const predictions = finished.attempts.filter(a => a.kind === 'predict'),
    matched = predictions.filter(a => a.matched).length;
  const discovery = nextLessonDiscovery('science');
  const summary = predictions.length
    ? `You made ${predictions.length} predictions and ${matched} matched what happened. Testing ideas is what scientists do! `
    : 'You looked closely, like a real scientist! ';
  app.innerHTML = `<section class="reading-quest quest-finish science-finish"><span class="tag">GIZMO’S SCIENCE</span><h1>Super science, Haytham!</h1><p>${summary}${lesson.outro || ''}</p><img class="quest-fact-photo" src="${discovery.image}" alt="${discovery.name}"><div class="quest-fact"><h2>${discovery.name}</h2><p>${discovery.text}</p><button id="questFactListen">${paintedIcon('speaker-blue')} Hear our shark discovery</button></div><div class="quest-actions"><button class="primary" id="questAgain">Explore again</button><a class="primary" href="#home">Back to My Reef</a></div></section>`;
  $('#questFactListen').onclick = () => speak(discovery.text, { speaker: 'gizmo' });
  $('#questAgain').onclick = () => startScienceMission(finished.lesson);
  screenNarration = summary + (lesson.outro || '') + ' ' + discovery.text;
  speak(summary + (lesson.outro ? lesson.outro + ' ' : '') + discovery.text, { speaker: 'gizmo' });
  if (typeof setMiloMood === 'function') setMiloMood('highfive');
  if (typeof pathFinishButtons === 'function') pathFinishButtons();
  if (finished.pathSkill && typeof finishPathActivity === 'function') {
    const scored = finished.attempts.filter(a => a.kind !== 'predict');
    finishPathActivity(
      finished.pathSkill,
      finished.pathReview,
      scored.length ? scored.filter(a => !a.supported).length / scored.length : 1
    );
    pathFinishButtons();
  }
  requestAnimationFrame(fitScreen);
}
// Hook into the shared lesson screen: science missions use their own screens.
const preScienceMission = readingMission;
readingMission = function () {
  if (game?.science) return scienceMission();
  return preScienceMission();
};

// ---------------------------------------------------------------- library shelf
const preScienceLibrary = libraryPage;
libraryPage = function () {
  if (location.hash === '#library/science') return scienceShelf();
  preScienceLibrary();
  const grid = app.querySelector('.library-choices');
  if (!grid || grid.querySelector('[data-library-route="science"]')) return;
  const sharks = grid.querySelector('[data-library-route="museum"]');
  const card =
    `<button data-library-route="science"><span class="library-picture" aria-hidden="true">${paintedScene('science')}</span>Science with Gizmo</button>`;
  if (sharks) sharks.insertAdjacentHTML('beforebegin', card);
  else grid.insertAdjacentHTML('beforeend', card);
  grid.querySelector('[data-library-route="science"]').onclick = () =>
    (location.hash = 'library/science');
};
let scienceShelfPage = 0;
function scienceShelf() {
  const pages = Math.ceil(scienceLessons.length / 3);
  scienceShelfPage = Math.max(0, Math.min(scienceShelfPage, pages - 1));
  const pictures = {
    'S-F-01': 'hammerhead',
    'S-F-02': 'clownfish',
    'S-F-03': 'ship',
    'S-F-04': 'squid',
    'S-F-05': 'megalodon'
  };
  app.innerHTML = `<section class="lesson-shelf"><h1>Adventures with Gizmo</h1><div class="lesson-shelf-cards">${scienceLessons
    .slice(scienceShelfPage * 3, scienceShelfPage * 3 + 3)
    .map(
      l =>
        `<button class="lesson-shelf-card" data-science-lesson="${l.id}" aria-label="Play ${l.shelfName}"><span class="lesson-card-art">${sciencePicture(pictures[l.id])}</span><strong>${l.shelfName}</strong>${(state.scienceLessons || []).some(s => s.lesson === l.id) ? '<span class="lesson-practised" aria-hidden="true">🐚</span>' : ''}</button>`
    )
    .join(
      ''
    )}</div><div class="lesson-shelf-pages"><button id="previousLessonPage" aria-label="Previous adventures" ${scienceShelfPage === 0 ? 'disabled' : ''}>←</button><span>${scienceShelfPage + 1} / ${pages}</span><button id="nextLessonPage" aria-label="More adventures" ${scienceShelfPage === pages - 1 ? 'disabled' : ''}>→</button></div></section>`;
  $('#previousLessonPage').onclick = () => {
    scienceShelfPage--;
    scienceShelf();
  };
  $('#nextLessonPage').onclick = () => {
    scienceShelfPage++;
    scienceShelf();
  };
  document.querySelectorAll('[data-science-lesson]').forEach(b => {
    b.onclick = () => {
      stopSpeech();
      startScienceMission(b.dataset.scienceLesson);
    };
  });
  helperSpeak('Choose a science adventure, Haytham. Gizmo and Milo are ready to explore.');
  requestAnimationFrame(fitScreen);
}
