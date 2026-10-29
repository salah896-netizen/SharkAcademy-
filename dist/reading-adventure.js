// A bounded Foundation pilot: picture matching is practice evidence, not oral-reading assessment.
const readingMissionItems = [
  {
    word: 'map',
    prompt: 'Read the clue. Which picture matches?',
    options: ['map', 'sun', 'net'],
    answer: 'map',
    hint: 'Look at each letter in map. Say its sound, then blend the sounds together.',
    codes: ['AC9EFLY12'],
    reveal: 'A map! Now we can find the secret reef.'
  },
  {
    word: 'net',
    prompt: 'Read the next clue. Which picture matches?',
    options: ['sun', 'net', 'fin'],
    answer: 'net',
    hint: 'Look at each letter in net. Say its sound, then blend the sounds together.',
    codes: ['AC9EFLY12'],
    reveal: 'A net! We found an old net beside the reef.'
  },
  {
    word: 'fin',
    prompt: 'Read the clue. What can we see beyond the net?',
    options: ['fin', 'map', 'sun'],
    answer: 'fin',
    hint: 'Look at each letter in fin. Say its sound, then blend the sounds together.',
    codes: ['AC9EFLY12'],
    reveal: 'A fin! Our little shark friend is waiting nearby.'
  },
  {
    word: 'A red fin.',
    prompt: 'Read the message. Which fin does it describe?',
    options: ['blue-fin', 'red-fin', 'yellow-fin'],
    answer: 'red-fin',
    hint: 'Let’s read together: A red fin. The word red tells us which fin to choose.',
    codes: ['AC9EFLY04', 'AC9EFLY05'],
    reveal: 'You found our friend at the red-fin sign! Let’s swim home together.'
  }
];
const readingPicnicItems = [
  {
    word: 'cup',
    prompt: 'Willa and Milo found a sunken picnic. Read the clue. Which picture matches?',
    options: ['sun', 'cup', 'map'],
    answer: 'cup',
    hint: 'Look at each letter in cup. Say its sound, then blend the sounds together.',
    codes: ['AC9EFLY12'],
    reveal: 'A cup! Let’s find a place for our picnic.'
  },
  {
    word: 'map',
    prompt: 'We have seen this word before. Read the clue and choose its picture.',
    options: ['cup', 'map', 'net'],
    answer: 'map',
    hint: 'Look at each letter in map. Say its sound, then blend the sounds together.',
    codes: ['AC9EFLY12'],
    reveal: 'A map! It shows us a quiet spot beside the reef.'
  },
  {
    word: 'sun',
    prompt: 'Read the next clue. Which picture matches?',
    options: ['net', 'cup', 'sun'],
    answer: 'sun',
    hint: 'Look at each letter in sun. Say its sound, then blend the sounds together.',
    codes: ['AC9EFLY12'],
    reveal: 'The sun! We can see its light dancing through the water.'
  },
  {
    word: 'A red cup.',
    prompt: 'Read the message. Which cup does it describe?',
    options: ['yellow-cup', 'blue-cup', 'red-cup'],
    answer: 'red-cup',
    hint: 'Let’s read together: A red cup. The word red tells us which cup to choose.',
    codes: ['AC9EFLY04', 'AC9EFLY05'],
    reveal: 'You found the red cup! Our pretend picnic is ready. Time for a shark discovery.'
  }
];
const readingMissionLibrary = [
  { id: 'R-F-PILOT-01', items: readingMissionItems },
  { id: 'R-F-PILOT-02', items: readingPicnicItems }
];
function readingPracticeSummary() {
  const sessions = state.readingAdventures || [],
    attempts = sessions.flatMap(s => s.attempts || []),
    independent = attempts.filter(a => !a.supported).length;
  return `${sessions.length} short adventures · ${independent} picture matches without help · ${attempts.length - independent} with help. These are practice records, not an oral-reading assessment or proof of mastery.`;
}
// Every reading picture comes through here. Later files add a picture source to the front of this
// list (lessons-more.js, school-pack.js, lesson-pack.js), so the newest source is asked first; the
// first one with a picture for the key wins, and the original drawings below are the fallback.
const readingPictureSources = [];
function readingArt(key) {
  if (typeof key !== 'string') return '';
  for (const source of readingPictureSources) {
    const art = source(key);
    if (art) return art;
  }
  return basicReadingArt(key);
}
function basicReadingArt(key) {
  if (key.includes('cup')) {
    const colour =
      key === 'red-cup'
        ? '#ef7774'
        : key === 'yellow-cup'
          ? '#f5cf6e'
          : key === 'blue-cup'
            ? '#77bddd'
            : '#a9cbd3';
    return `<svg viewBox="0 0 120 100" aria-hidden="true"><path d="M81 29H94Q115 29 108 51Q103 65 85 63" fill="none" stroke="${colour}" stroke-width="10"/><path d="M24 23H87L80 76Q54 90 31 76Z" fill="${colour}" stroke="#547a87" stroke-width="3"/><ellipse cx="55" cy="23" rx="31" ry="8" fill="#eaf4df" stroke="#547a87" stroke-width="3"/><path d="M36 35L40 66" stroke="#ffffff77" stroke-width="5" stroke-linecap="round"/></svg>`;
  }
  if (key === 'map')
    return `<svg viewBox="0 0 120 100" aria-hidden="true"><path d="M10 20L43 10L77 20L110 10V80L77 90L43 80L10 90Z" fill="#f7e4b5" stroke="#8c7251" stroke-width="4"/><path d="M43 10V80M77 20V90" stroke="#d6bc88" stroke-width="3"/><path d="M25 63Q35 31 56 49T95 37" stroke="#3f8a99" stroke-width="4" stroke-dasharray="5 5" fill="none"/><path d="M86 29L101 44M101 29L86 44" stroke="#d56753" stroke-width="5"/></svg>`;
  if (key === 'sun')
    return `<svg viewBox="0 0 120 100" aria-hidden="true"><g stroke="#ffdc75" stroke-width="6" stroke-linecap="round"><path d="M60 6V17M60 83V94M16 50H27M93 50H104M28 18L36 26M84 74L92 82M28 82L36 74M84 26L92 18"/></g><circle cx="60" cy="50" r="25" fill="#ffd26d" stroke="#e5ad4b" stroke-width="3"/></svg>`;
  if (key === 'net')
    return `<svg viewBox="0 0 120 100" aria-hidden="true"><path d="M25 14H98L80 77H42Z" fill="#cce7dd" stroke="#466e7b" stroke-width="4"/><path d="M35 30H92M39 46H87M43 62H83M43 16L53 77M61 16L63 77M80 16L72 77M25 14L9 90" fill="none" stroke="#466e7b" stroke-width="3"/></svg>`;
  if (key.includes('fin')) {
    const colour = key === 'red-fin' ? '#f47679' : key === 'yellow-fin' ? '#f9da74' : '#81cfe3';
    return `<svg viewBox="0 0 120 100" aria-hidden="true"><path d="M12 82Q40 73 55 16Q91 31 98 82Z" fill="${colour}" stroke="#e2ffff" stroke-width="3"/><path d="M8 85Q34 75 59 85T112 85" fill="none" stroke="#8df0df" stroke-width="5"/></svg>`;
  }
  return `<span aria-hidden="true">${{ map: '🗺️', sun: '☀️', net: '🥅' }[key]}</span>`;
}
function readingMission() {
  if (!game?.mission) return;
  const q = game.items[game.index];
  if (!q) {
    finishReadingMission();
    return;
  }
  app.innerHTML = `<section class="reading-quest"><div class="game-top"><a class="back-link" href="#expeditions">← Back to adventures</a><button id="questInstructions" class="quiet">${paintedIcon('speaker-blue')} Hear instructions</button></div><span class="tag">WILLA’S SECRET REEF</span><h1>Find our shark friend</h1><p class="quest-story">${game.index === 0 ? 'A message has washed into the reef. Can you help Willa and Milo follow its clues?' : game.items[game.index - 1].reveal}</p><div class="quest-trail" aria-label="${game.index} of 4 clues solved">${game.items.map((_, i) => `<span class="${i < game.index ? 'found' : ''}" aria-hidden="true">${paintedIcon(i < game.index ? 'shell' : 'spot')}</span>`).join('<i>···</i>')}</div><div class="quest-scroll"><p>${q.prompt}</p><div class="quest-word" aria-label="${q.word}">${q.word.length === 3 ? [...q.word].map(letter => `<span class="sound-letter" aria-hidden="true">${letter}</span>`).join('') : q.word}</div><div class="quest-pictures">${q.options.map((key, i) => `<button data-quest-choice="${i}" aria-label="${key.replace('-', ' ')}">${readingArt(key)}</button>`).join('')}</div><p id="questFeedback" role="status">Take your time. Willa and Milo are with you.</p><div class="quest-actions"><button id="questHint"><span aria-hidden="true">${paintedIcon('bulb')}</span><span class="hint-label">Help me</span></button><button id="questNext" class="primary" hidden>${game.index === 3 ? 'Our shark discovery ✨' : 'Follow the clue →'}</button></div></div><details class="quest-parent"><summary>For grown-ups: this reading trial</summary><p>Foundation English · AC9EFLY12 (CVC blending practice), AC9EFLY04 and AC9EFLY05 (reading and meaning). Assumes the sounds in map, net, fin, red, cup and sun are taught; A needs familiar-word support. The two short adventures practise CVC words, review a familiar word and match a short message to a picture. Picture matching cannot verify reading aloud. Shared reading and retries are recorded as supported. This short pilot does not change the existing reading level.</p><p>For the clearest trial, let Haytham try before reading the clue aloud. Help is always welcome. Other lesson narration currently uses the device voice.</p></details></section>`;
  $('#questInstructions').onclick = () => helperSpeak(q.prompt);
  $('#questHint').onclick = readingMissionHelp;
  $('#questNext').onclick = () => {
    game.index++;
    game.assisted = false;
    game.answered = false;
    readingMission();
  };
  document
    .querySelectorAll('[data-quest-choice]')
    .forEach(b => (b.onclick = () => readingMissionAnswer(q.options[+b.dataset.questChoice])));
  updateMilo('I’m with you, Haytham. Let’s help Willa follow the clues.');
  helperSpeak(q.prompt);
  window.scrollTo(0, 0);
  app.scrollTop = 0;
}
function readingMissionHelp() {
  if (!game?.mission || game.answered) return;
  game.assisted = true;
  const q = game.items[game.index];
  $('#questFeedback').textContent = 'Willa: ' + q.hint;
  reactCrew('thinking', 'willa');
  helperSpeak(q.hint);
  const word = $('.quest-word');
  word?.classList.add('sound-support');
}
function readingMissionAnswer(value) {
  if (game.answered) return;
  const q = game.items[game.index];
  if (value !== q.answer) {
    game.assisted = true;
    const choice = [...document.querySelectorAll('[data-quest-choice]')].find(
      b => q.options[+b.dataset.questChoice] === value
    );
    choice?.classList.add('tried-choice');
    $('#questFeedback').textContent = 'Let’s try another picture. Tap the light for help.';
    reactCrew('thinking', 'willa');
    helperSpeak(
      'Good try, Haytham. Look at the letters again. Tap the light if you want a little help.'
    );
    return;
  }
  game.answered = true;
  state.xp += pearlsPerStep(game.items.length);
  save();
  game.attempts.push({
    clue: game.index,
    word: q.word,
    codes: q.codes,
    supported: game.assisted,
    at: new Date().toISOString()
  });
  document.querySelectorAll('[data-quest-choice]').forEach(b => {
    b.disabled = true;
    b.classList.toggle('chosen-correct', q.options[+b.dataset.questChoice] === value);
  });
  ($('#questHint') || {}).hidden = true;
  ($('#questNext') || {}).hidden = false;
  $('#questFeedback').textContent = q.reveal;
  $('.quest-scroll').classList.add('clue-solved');
  encourage(q.reveal, 'highfive');
}
function finishReadingMission() {
  const finished = game;
  state.readingAdventures = state.readingAdventures || [];
  if (!state.readingAdventures.some(x => x.session === finished.session)) {
    state.readingAdventures.push({
      session: finished.session,
      lesson: finished.lesson || 'R-F-PILOT-01',
      attempts: finished.attempts,
      at: new Date().toISOString()
    });
    state.xp += pearlCompletionBonus(finished.items.length);
    state.completed.push({
      type: 'reading-adventure',
      session: finished.session,
      at: new Date().toISOString()
    });
    state.discoveries = state.discoveries || [];
    if (!state.discoveries.includes('reading-whale-shark-fish'))
      state.discoveries.push('reading-whale-shark-fish');
    save();
  }
  game.answered = true;
  const discovery = nextLessonDiscovery('reading');
  const fact = discovery.text;
  app.innerHTML = `<section class="reading-quest quest-finish"><span class="tag">A DISCOVERY WITH YOUR FRIENDS</span><h1>We did it, Haytham!</h1><p>You followed the clues and found our shark friend. Fin five!</p><img class="quest-fact-photo" src="${discovery.image}" alt="${discovery.name}"><div class="quest-fact"><h2>${discovery.name}</h2><p>${fact}</p><button id="questFactListen">${paintedIcon('speaker-blue')} Hear our shark discovery</button></div><p>You earned ${PEARLS.adventure} pearls. This discovery is saved on this device.</p><div class="quest-actions"><button class="primary" id="questAgain">Explore again</button><a class="primary" href="#home">Back to My Reef</a></div><p class="muted">Your documentary adventures are coming when your films are ready.</p></section>`;
  $('#questFactListen').onclick = () => speak(fact, { speaker: 'willa' });
  $('#questAgain').onclick = startReadingMission;
  updateMilo('Fin five! We followed the clues together. Now Willa has a shark discovery for us.');
  setMiloMood('highfive');
  speak('We did it, Haytham! ' + fact, { speaker: 'willa' });
}
