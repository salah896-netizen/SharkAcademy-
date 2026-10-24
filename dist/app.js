'use strict';
const $ = s => document.querySelector(s),
  app = $('#app');
const defaults = () => ({
  xp: 0,
  voice: true,
  writingHistory: [],
  range: 10,
  history: [],
  completed: [],
  discoveries: []
});
let state = defaults(),
  storageOK = true;
try {
  const saved = JSON.parse(localStorage.getItem('haytham-v1') || 'null');
  if (
    saved &&
    Array.isArray(saved.history) &&
    Array.isArray(saved.completed) &&
    Array.isArray(saved.discoveries)
  )
    state = { ...state, ...saved };
} catch {
  storageOK = false;
}
// Pearl economy (agreed with family 24 Oct 2026): every learning adventure is worth 13 pearls,
// trickled out per step with the remainder on completion; extras (stories, profiles, secrets,
// free practice) are worth 3. Help and retries earn the same. 50 pearls bank one video.
const PEARLS = { adventure: 13, extra: 3 };
function pearlsPerStep(steps) {
  return Math.floor((PEARLS.adventure - 1) / Math.max(1, steps));
}
function pearlCompletionBonus(steps) {
  return PEARLS.adventure - pearlsPerStep(steps) * Math.max(1, steps);
}
function save() {
  try {
    localStorage.setItem('haytham-v1', JSON.stringify(state));
  } catch {
    storageOK = false;
    showSaveWarning();
  }
}
function showSaveWarning() {
  if (!$('#saveWarning'))
    document.body.insertAdjacentHTML(
      'afterbegin',
      '<p id="saveWarning">Progress could not be saved. Ask a grown-up to check browser storage.</p>'
    );
}
function englishVoices() {
  return 'speechSynthesis' in window
    ? speechSynthesis.getVoices().filter(v => /^en[-_]/i.test(v.lang))
    : [];
}
function voiceScore(v) {
  const female =
    /karen|catherine|samantha|ava|allison|susan|serena|moira|tessa|victoria|salli|joanna|zira|aria|jenny|female/i.test(
      v.name
    );
  return (
    (female ? 1000 : 0) +
    (v.localService ? 100 : 0) +
    (/premium/i.test(v.name) ? 40 : /enhanced|natural/i.test(v.name) ? 30 : 0) +
    (v.lang === 'en-AU' ? 20 : 0)
  );
}
function chosenVoice() {
  const voices = englishVoices();
  return (
    voices.find(v => v.voiceURI === state.voiceURI) ||
    voices.sort((a, b) => voiceScore(b) - voiceScore(a))[0] ||
    null
  );
}
function populateVoicePicker() {
  const select = $('#narrator');
  if (!select) return;
  select.replaceChildren();
  select.add(new Option('Automatic · prefer a female voice', ''));
  englishVoices()
    .sort((a, b) => voiceScore(b) - voiceScore(a))
    .forEach(v =>
      select.add(
        new Option(
          v.name + ' · ' + v.lang + (v.localService ? ' · device voice' : ' · may need internet'),
          v.voiceURI
        )
      )
    );
  select.value = state.voiceURI || '';
  const v = chosenVoice();
  $('#voiceNote').textContent = v
    ? 'Current narrator: ' + v.name + '. Listen to the sample to choose the sound you like.'
    : 'Voices are still loading. Reopen this area if no voices appear.';
}
if ('speechSynthesis' in window)
  speechSynthesis.addEventListener('voiceschanged', populateVoicePicker);
const shark = `<svg viewBox="0 0 450 260" role="img" aria-label="Milo, a friendly illustrated megalodon with realistic shark fins and colouring"><defs><linearGradient id="miloBody" x2="0.2" y2="1"><stop stop-color="#425e72"/><stop offset=".52" stop-color="#809da9"/><stop offset="1" stop-color="#c5d6d6"/></linearGradient><linearGradient id="miloFin" x2="1" y2="1"><stop stop-color="#354f63"/><stop offset="1" stop-color="#90aab3"/></linearGradient></defs><path d="M323 131Q367 100 409 38L391 121L374 147L407 211Q362 189 328 166" fill="url(#miloFin)"/><path d="M182 101Q196 64 216 25Q244 64 249 105" fill="url(#miloFin)"/><path d="M243 161L294 211L268 162" fill="#607f91"/><path d="M41 147Q80 112 128 101Q190 83 267 110Q323 121 353 146Q321 176 264 185Q165 206 83 179Q53 169 41 147" fill="url(#miloBody)"/><path d="M43 150Q111 165 174 162Q260 163 347 149Q305 186 220 190Q103 200 43 150" fill="#e2e6db"/><path d="M180 160Q194 183 239 235Q238 188 216 160" fill="url(#miloFin)"/><path d="M64 153Q91 166 126 158" fill="none" stroke="#334a53" stroke-width="3" stroke-linecap="round"/><path d="M82 158L86 164L91 160M99 161L103 166L108 161" fill="#fff9e6"/><circle cx="100" cy="137" r="6.5" fill="#142b36"/><circle cx="98" cy="135" r="2" fill="#f1f6ee"/><path d="M142 128Q151 143 145 158M155 126Q165 143 158 160M169 127Q179 144 172 161M182 130Q192 146 184 162M195 134Q205 148 197 163" fill="none" stroke="#4e6c7c" stroke-width="2.8" stroke-linecap="round"/><path d="M59 142Q114 109 172 108" fill="none" stroke="#c2d8db" stroke-width="2" opacity=".5"/><circle cx="59" cy="149" r="1.8" fill="#4d6770"/></svg>`;
const ranks = [
  'Shark Pup',
  'Reef Explorer',
  'Shark Ranger',
  'Deep-Sea Scientist',
  'Megalodon Master'
];
const rank = () => Math.min(4, Math.floor(state.xp / 100));
const rewards = [
  ['🦈', 'Milo the megalodon', 0],
  ['🐚', 'Pearl shell', 30],
  ['🪸', 'Coral garden', 60],
  ['🦷', 'Megalodon tooth', 100],
  ['🐢', 'Turtle friend', 160],
  ['🏆', 'Ocean explorer trophy', 240]
];
const words = [
  ['fin', 'f · i · n', 'fin', 'fan', 'fit'],
  ['cat', 'c · a · t', 'cat', 'cap', 'can'],
  ['sun', 's · u · n', 'sun', 'sit', 'sad'],
  ['map', 'm · a · p', 'map', 'mat', 'man'],
  ['net', 'n · e · t', 'net', 'nap', 'nut'],
  ['big', 'b · i · g', 'big', 'bag', 'bin'],
  ['red', 'r · e · d', 'red', 'rid', 'rod'],
  ['sit', 's · i · t', 'sit', 'sat', 'sun'],
  ['The fin is big.', 'Which word means large?', 'big', 'fin', 'is'],
  ['A cat can sit.', 'What can the cat do?', 'sit', 'hop', 'run'],
  ['The sun is hot.', 'What is hot?', 'sun', 'net', 'cat'],
  ['A fish can swim.', 'What can a fish do?', 'swim', 'run', 'sit']
];
let game = null;
function shuffled(a) {
  return [...a].sort(() => Math.random() - 0.5);
}
const sharkSilhouette = `<svg viewBox="0 0 450 260" aria-hidden="true"><path d="M41 147Q100 85 182 101L216 25L249 105Q315 118 353 146L409 38L391 121L374 147L407 211L328 166Q280 192 216 190L239 235L180 191Q85 192 41 147" fill="currentColor"/></svg>`;
let reefMotion = true;
function home() {
  app.innerHTML = `<section class="ocean-home"><div class="ocean-welcome treasure-welcome"><h1 aria-label="Haytham’s Shark Adventures"><img class="welcome-treasure-art" src="assets/haytham-surfboard-bite.webp" alt="Haytham’s Shark Adventures — a painted surfboard with a shark bite in its tail" fetchpriority="high" width="1500" height="507"></h1></div><div class="reef-scene" aria-label="An underwater reef with sharks swimming in the distance"><div class="sun-rays" aria-hidden="true"></div><div class="distant-shark shark-one" aria-hidden="true">${sharkSilhouette}</div><div class="distant-shark shark-two" aria-hidden="true">${sharkSilhouette}</div><div class="distant-shark shark-three" aria-hidden="true">${sharkSilhouette}</div><div class="fish-school" aria-hidden="true">${Array.from({ length: 7 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div><div class="sea-particles" aria-hidden="true">${Array.from({ length: 14 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div>${homeCrew()}${reefMysteries()}<div class="scene-controls"><button class="quiet" id="motionToggle" aria-pressed="${!reefMotion}">${reefMotion ? 'Ⅱ Pause ocean' : '▷ Resume ocean'}</button></div></div><section class="picture-ocean-paths" aria-label="Choose an ocean adventure">${picturePortal('sharks', 'Meet the sharks', 'Discover amazing sharks.', 'museum')}${picturePortal('adventure', 'Learning Adventure', 'Play with Milo.', 'expeditions')}${picturePortal('writing', 'Write with Milo', 'Draw letters and numbers.', 'writing')}${picturePortal('stories', 'A sea of stories', 'Read with Milo.', 'stories')}</section><a class="ocean-progress" href="#collection" aria-label="View my ocean treasures"><span class="progress-star">✧</span><div><strong>${ranks[rank()]} <span>· Level ${rank() + 1}</span></strong><div class="track"><div style="width:${rank() === 4 ? 100 : state.xp % 100}%"></div></div></div><span>${state.xp} <small>PEARLS</small></span></a></section>`;
  $('#greetMilo').onclick = () => {
    expandTappedShark('milo');
    setMiloMood('idle');
    playCharacterGreeting('milo');
  };
  $('#motionToggle').onclick = () => {
    reefMotion = !reefMotion;
    $('.reef-scene').classList.toggle('paused', !reefMotion);
    $('#motionToggle').textContent = reefMotion ? 'Ⅱ Pause ocean' : '▷ Resume ocean';
    $('#motionToggle').setAttribute('aria-pressed', String(!reefMotion));
  };
  $('.reef-scene').classList.toggle('paused', !reefMotion);
  bindReefMysteries();
  bindPictureNames();
  bindAdventureInvites();
}
function icon(name) {
  const paths = {
    book: 'M4 5Q9 3 16 6Q23 3 28 5V26Q23 24 16 27Q9 24 4 26ZM16 6V27',
    compass: 'M16 3A13 13 0 1 0 16 29A13 13 0 1 0 16 3M21 11L18 18L11 21L14 14Z',
    pencil: 'M6 22L5 28L11 27L27 11L21 5ZM18 8L24 14'
  };
  return `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]}"/></svg>`;
}
function expeditions() {
  app.innerHTML = `<section class="expedition-page"><a class="back-link" href="#home">← Back to reef</a><span class="tag">PLAY A LITTLE. LEARN A LOT.</span><h1>Learning Adventure</h1><p>Choose a picture. Milo is ready to play!</p><p class="muted">Reading: ${stageDescription('reading')} · Maths: ${stageDescription('maths')}</p><section class="picture-games">${[
    ['reading', 'stories', 'Willa’s Secret Reef', 'Follow clues. Find our shark friend.'],
    ['maths', 'adventure', 'Feed the Shark', 'Count fish with Tiggy and Milo.'],
    ['fossil', 'fossil', 'Fossil Dig', 'Find fossil clues with Gizmo and Milo.']
  ]
    .map(
      ([id, image, title, desc]) =>
        `<article class="picture-game"><button data-game="${id}" aria-label="Play ${title}"><div class="game-picture"><img src="assets/visual-${image}.jpg" alt=""><span class="game-play-symbol" aria-hidden="true">▶</span>${crewGameBadge(id)}</div><h2>${title}</h2><p>${desc}</p></button><button class="picture-listen" data-portal-name="${title}" aria-label="Hear ${title}">♫</button></article>`
    )
    .join('')}</section></section>`;
  document.querySelectorAll('[data-game]').forEach(b => (b.onclick = () => start(b.dataset.game)));
  bindPictureNames();
}
function start(type) {
  if (type === 'reading') {
    startReadingMission();
    return;
  }
  game = {
    type,
    index: 0,
    assisted: false,
    answered: false,
    correct: 0,
    session: 'game-' + Date.now(),
    stage: stageFor(type === 'fossil' ? 'maths' : type),
    items: makeQuestions(type)
  };
  if (location.hash === '#play') {
    render();
  } else location.hash = 'play';
}
function makeQuestions(type) {
  if (type === 'reading') {
    const n = state.history.filter(x => x.type === 'reading').length;
    return Array.from({ length: 5 }, (_, i) => {
      const bank =
        stageFor('reading') === 1
          ? words
          : stageFor('reading') === 2
            ? growingWords
            : explorerReading;
      const w = bank[(n + i) % bank.length];
      return {
        title: w[1].includes('·') ? 'Build the word' : 'Read and solve',
        scene: w[1].includes('·') ? w[0].slice(0, -1) + ' _' : w[0],
        prompt: w[1].includes('·')
          ? 'Finish the word: ' + w[1] + '. Which letter is missing?'
          : w[1],
        answer: w[1].includes('·') ? w[0].slice(-1) : w[2],
        choices: shuffled(
          w[1].includes('·')
            ? [
                w[0].slice(-1),
                ...['s', 't', 'n', 'p', 'g', 'd'].filter(c => c !== w[0].slice(-1)).slice(0, 2)
              ]
            : w.slice(2)
        ),
        spoken: w[1].includes('·')
          ? 'Finish the word ' + w[0] + '. Which letter is missing?'
          : w[0] + ' ' + w[1],
        hint: w[1].includes('·')
          ? 'Say each sound, then blend them together: ' + w[1]
          : 'Read it again slowly: ' + w[0]
      };
    });
  }
  if (type === 'maths') {
    const stage = stageFor('maths'),
      max = [10, 20, 50][stage - 1];
    return Array.from({ length: 5 }, (_, i) => {
      const a = 1 + Math.floor(Math.random() * (max - 2)),
        b = 1 + Math.floor(Math.random() * (max - a)),
        total = a + b;
      let scene, prompt, spoken, hint, answer;
      if ((stage === 1 && i < 2) || (stage === 2 && i === 0)) {
        answer = total;
        scene = '🐟 '.repeat(total);
        prompt = 'How many fish can you count?';
        spoken = 'Count the fish. How many can you see?';
        hint = 'Point to each fish once as you count.';
      } else if (stage >= 2 && i % 2 === 1) {
        const smaller = Math.floor(Math.random() * a);
        answer = a - smaller;
        scene = `${a} − ${smaller} = ?`;
        prompt = 'Some fish swim away. How many are left?';
        spoken = `There are ${a} fish. ${smaller} swim away. How many are left?`;
        hint = `Start at ${a} and count back ${smaller}.`;
      } else if (stage === 3 && i === 4) {
        answer = b;
        scene = `${a} + ? = ${total}`;
        prompt = 'Find the missing number.';
        spoken = `${a} plus what number makes ${total}?`;
        hint = `Count up from ${a} to ${total}. How many steps did you take?`;
      } else {
        answer = total;
        scene = `${a} + ${b} = ?`;
        prompt = 'How many fish altogether?';
        spoken = `${a} fish and ${b} more fish. How many altogether?`;
        hint = `Start at ${a} and count on ${b} more.`;
      }
      return {
        title:
          stage === 1 ? 'Feed the Shark' : stage === 2 ? 'Reef Number Quest' : 'Deep-Sea Maths',
        scene,
        prompt,
        answer: String(answer),
        choices: shuffled([answer, answer + 1, answer > 1 ? answer - 1 : answer + 2].map(String)),
        spoken,
        hint
      };
    });
  }
  return Array.from({ length: 5 }, (_, i) => {
    const step =
        stageFor('maths') === 1
          ? (i % 2) + 1
          : stageFor('maths') === 2
            ? [2, 5][i % 2]
            : [5, 10][i % 2],
      first = 1 + Math.floor(Math.random() * 3),
      answer = first + step * 3;
    return {
      title: 'Fossil Dig',
      scene: `${first}, ${first + step}, ${first + 2 * step}, ?`,
      prompt: `What comes next? Count in ${step === 1 ? 'ones' : step === 2 ? 'twos' : step === 5 ? 'fives' : 'tens'}.`,
      answer: String(answer),
      choices: shuffled([answer, answer + 1, answer + 3].map(String)),
      spoken: `${first}, ${first + step}, ${first + 2 * step}. What comes next?`,
      hint: `Add ${step} each time. After ${first + 2 * step}, count ${step} more.`
    };
  });
}
function play() {
  if (game?.mission) {
    readingMission();
    return;
  }
  if (!game) {
    location.hash = 'home';
    return;
  }
  if (game.index === 5) {
    finish();
    return;
  }
  const q = game.items[game.index];
  app.innerHTML = `<section class="game"><div class="game-top"><button class="quiet" id="exit">← Back to ocean</button><small>DISCOVERY ${game.index + 1} OF 5</small><button class="listen" id="listen" aria-label="Listen to instructions">♫ Listen</button></div><div class="track"><div style="width:${game.index * 20}%"></div></div><div class="game-panel"><span class="tag">${game.type === 'fossil' ? '🦷 ' + game.index + ' / 5 FOSSIL PIECES' : 'YOUR NEXT LITTLE CHALLENGE'}</span><h1 style="font-size:36px">${q.title}</h1><p id="prompt">${q.prompt}</p><div class="scene sentence">${q.scene}</div><div class="choices">${q.choices.map((c, i) => `<button class="choice shell-choice" data-choice="${i}"><svg viewBox="0 0 140 110" aria-hidden="true"><path d="M70 101L15 61Q-1 13 39 12Q65-3 70 16Q91-4 110 13Q145 11 130 60Z" fill="currentColor"/><path d="M70 100V23M70 100L33 26M70 100L111 27" stroke="white" stroke-opacity=".3" stroke-width="3"/></svg><span>${c}</span></button>`).join('')}</div><div class="feedback" aria-live="polite"></div><button class="quiet" id="hint">Help me, ${reefCrew[crewForRoute()].name}</button><button class="primary" id="next" hidden>Next discovery →</button></div></section>`;
  $('#listen').onclick = () => helperSpeak(q.spoken);
  $('#exit').onclick = () => {
    game = null;
    location.hash = 'home';
  };
  $('#hint').onclick = () => {
    crewHelp(crewForRoute());
  };
  document
    .querySelectorAll('[data-choice]')
    .forEach(b => (b.onclick = () => answer(q.choices[+b.dataset.choice])));
  $('#next').onclick = () => {
    game.index++;
    game.assisted = false;
    game.answered = false;
    play();
  };
  updateMilo('I’m here, Haytham. ' + q.spoken);
  helperSpeak(q.spoken);
}
function answer(value) {
  if (game.answered) return;
  const q = game.items[game.index];
  if (value !== q.answer) {
    game.assisted = true;
    $('.feedback').textContent = 'Good try! Ask Milo for a hint, then try again.';
    encourage('Good try, Haytham. I’m here with you. Let’s have another go.', 'retry');
    return;
  }
  game.answered = true;
  game.correct++;
  const stepPearls = pearlsPerStep(game.items.length);
  state.xp += stepPearls;
  state.history.push({
    type: game.type,
    skill: q.skill || q.title,
    lesson: q.lesson || null,
    codes: q.codes || [],
    independent: !game.assisted,
    stage: game.stage,
    session: game.session,
    at: new Date().toISOString()
  });
  const advanced = game.type !== 'fossil' && advanceLearning(game.type);
  save();
  $('.feedback').textContent = game.assisted
    ? `You worked it out with help! +${stepPearls} pearls ✦`
    : `You worked it out! +${stepPearls} pearls ✦`;
  document.querySelectorAll('[data-choice]').forEach(b => (b.disabled = true));
  $('#hint').hidden = true;
  $('#next').hidden = false;
  encourage(
    advanced
      ? 'You’re ready for a new learning stage, Haytham! Your next adventure will have a new challenge.'
      : game.assisted
        ? 'You kept trying and worked it out! That’s how we learn.'
        : [
            'You worked it out, Haytham!',
            'Great thinking! I knew you could have a go.',
            'Another little discovery. Well done for practising!'
          ][game.index % 3],
    'celebrate'
  );
}
function finish() {
  state.completed.push({ type: game.type, at: new Date().toISOString() });
  state.xp += pearlCompletionBonus(game.items.length);
  save();
  app.innerHTML = `<section class="game game-panel"><div class="reward">${game.type === 'fossil' ? '🦷' : '🌟'}</div><span class="tag">EXPEDITION COMPLETE</span><h1>Fin-tastic, Haytham!</h1><p>You made five discoveries and earned <strong>${PEARLS.adventure} pearls</strong>.</p><p>New treasures appear in your collection as you explore.</p><div class="choices"><button class="primary" id="done">Back to ocean →</button><button id="viewCollection">My collection</button></div><p class="muted">That’s a great place to stop for a break, too.</p></section>`;
  $('#done').onclick = () => (location.hash = 'home');
  $('#viewCollection').onclick = () => (location.hash = 'collection');
  game = null;
  updateMilo('Fin-tastic, Haytham! We finished an adventure together.');
  speak('Fin-tastic, Haytham! We finished an adventure together.');
}
function collection() {
  app.innerHTML = `<div class="section-head"><div><span class="tag">YOUR OCEAN TREASURES</span><h1>My collection</h1><p>Meet Milo now. Find more treasures as you learn!</p></div></div><div class="collection">${rewards.map(([icon, name, xp]) => `<article class="collect ${state.xp < xp ? 'locked' : ''}"><span>${state.xp >= xp ? icon : '🔒'}</span><h3>${name}</h3><p class="muted">${state.xp >= xp ? 'Discovered!' : `Unlock at ${xp} pearls`}</p></article>`).join('')}</div><p class="muted">Milo is a pretend megalodon companion. Real megalodons are extinct.</p>`;
}
function museum() {
  encyclopedia();
}
$('#parent').onclick = () => {
  $('#modalContent').innerHTML =
    '<h2>Grown-ups’ area</h2><p>To open progress and settings, enter the answer.</p><label>What is twelve plus seven? <input id="gate" inputmode="numeric" autocomplete="off"></label><button id="unlock">Open parent area</button><p id="gateFeedback" aria-live="polite"></p>';
  $('#modal').showModal();
  $('#unlock').onclick = () => {
    if ($('#gate').value.trim() === '19') parents();
    else $('#gateFeedback').textContent = 'Please ask a grown-up to help.';
  };
};
function parents() {
  const summary = t => {
    const h = state.history.filter(x => x.type === t),
      practice =
        t === 'reading' ? (state.readingAdventures || []).flatMap(s => s.attempts || []) : [];
    return `${h.filter(x => x.independent).length + practice.filter(x => !x.supported).length} without help / ${h.length + practice.length} solved`;
  };
  $('#modalContent').innerHTML =
    `<h2>Haytham’s progress</h2><p class="muted">Saved on this device. These are practice records, not a formal reading assessment.</p><div class="stats"><div class="stat"><strong>${state.completed.length}</strong>expeditions</div><div class="stat"><strong>${state.xp}</strong>pearls</div><div class="stat"><strong>${state.history.filter(x => x.independent).length + (state.readingAdventures || []).flatMap(s => s.attempts || []).filter(x => !x.supported).length}</strong>answers without help</div></div><p><strong>Reading:</strong> ${summary('reading')}<br><strong>Counting & addition:</strong> ${summary('maths')}<br><strong>Patterns:</strong> ${summary('fossil')}<br><strong>Writing:</strong> ${(state.writingHistory || []).length} practice pages; ${(state.writingLessons || []).length} three-step adventures (self-reported)<br><strong>Stories:</strong> ${(state.storyCompletions || []).length} story-stage completions</p><h3>Writing samples</h3>${writingPracticePreview()}<h3>Maths models</h3>${sharingPracticePreview()}<h3>Explaining thinking</h3>${typeof thinkingSummary === 'function' ? thinkingSummary() : ''}<h3>Shark race</h3>${typeof raceSummary === 'function' ? raceSummary() : ''}<h3>Learning path</h3>${typeof pathParentSummary === 'function' ? pathParentSummary() : ''}<h3>Number settings</h3><label>Counting and addition range <select id="range"><option value="10">Up to 10</option><option value="20">Up to 20</option><option value="50">Up to 50</option></select></label><p class="muted">Wrong answers and hints count as assisted practice. Difficulty changes apply to the next expedition.</p>${learningControls()}<h3>Reading adventure trial</h3><p>Foundation English: AC9EFLY12, AC9EFLY04, AC9EFLY05. ${readingPracticeSummary()} ${readingMissionLibrary.length} short Foundation adventures are available, following the school's Jolly Phonics sequence. Existing reading level unchanged.</p><h3>Adventure music</h3><label>Music volume <input id="musicVolumeControl" type="range" min="0" max="50" value="${Math.round(musicVolume * 100)}" aria-label="Adventure music volume"></label><p class="muted">Each area has its own original instrumental theme. Music softens while Milo speaks. Use the music button at the top to mute it.</p><h3>Character voices</h3><p class="muted">${Object.values(
      characterGreetings
    )
      .map(c => c.name)
      .join(
        ', '
      )} use your supplied ElevenLabs recordings for their greetings. Tap a character on the reef to hear them. Other dialogue and learning narration still use the device voice below.</p>${Object.entries(
      characterGreetings
    )
      .map(
        ([key, c]) => `<button data-preview-character="${key}">♫ Hear ${c.name}’s welcome</button>`
      )
      .join(
        ' '
      )}<p id="recordedVoiceStatus" aria-live="polite"></p><h3>Learning narrator voice</h3><label>Choose a voice <select id="narrator"></select></label><p id="voiceNote" class="muted"></p><button id="sampleVoice">♫ Hear a sample</button><p class="muted">For a more natural offline voice, download an Enhanced or Premium English voice in iPad Settings → Accessibility → Spoken Content (or Read & Speak) → Voices. Reopen this app afterwards. Only voices made available by your browser appear here.</p><button id="export">Export progress backup</button><p class="muted">For offline play: open in Safari, choose Share → Add to Home Screen, open the new icon while online, and wait for “Offline pack ready”. Then test in Airplane Mode. Device voices may need downloading in iPad settings for offline narration.</p><button class="quiet" id="reset">Reset progress…</button><p id="resetArea"></p>`;
  bindLearningControls();
  if (typeof bindPathParent === 'function') bindPathParent();
  document
    .querySelectorAll('[data-preview-character]')
    .forEach(b => (b.onclick = () => playCharacterGreeting(b.dataset.previewCharacter)));
  $('#musicVolumeControl').oninput = e => {
    musicVolume = Number(e.target.value) / 100;
    try {
      localStorage.setItem('haytham-music-volume', String(musicVolume));
    } catch {}
    fadeMusic(musicCurrent, musicTarget(), 200);
  };
  populateVoicePicker();
  $('#narrator').onchange = e => {
    state.voiceURI = e.target.value;
    save();
    populateVoicePicker();
  };
  $('#sampleVoice').onclick = () => {
    const was = state.voice;
    state.voice = true;
    speak(
      'Hello Haytham! I’m Milo. Let’s explore the ocean and make some amazing discoveries together.'
    );
    state.voice = was;
  };
  $('#range').value = String(state.range);
  $('#range').onchange = e => {
    state.range = Number(e.target.value);
    learningState().maths = {
      stage: state.range === 50 ? 3 : state.range === 20 ? 2 : 1,
      baseline: state.history.filter(x => x.type === 'maths').length
    };
    save();
  };
  $('#export').onclick = () => {
    const u = URL.createObjectURL(
      new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    );
    const a = document.createElement('a');
    a.href = u;
    a.download = 'haytham-progress.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(u), 1000);
  };
  $('#reset').onclick = () => {
    $('#resetArea').innerHTML =
      'This clears all pearls and practice on this device. <button id="confirmReset">Clear all progress</button>';
    $('#confirmReset').onclick = () => {
      state = defaults();
      save();
      $('#modal').close();
      render();
    };
  };
}
$('#closeModal').onclick = () => {
  stopSpeech();
  $('#modal').close();
};
$('#sound').onclick = () => {
  state.voice = !state.voice;
  save();
  updateSound();
  if (!state.voice) stopStory();
};
function updateSound() {
  $('#sound').textContent = state.voice ? 'Voice on ♫' : 'Voice off ♫';
  $('#sound').setAttribute('aria-pressed', String(state.voice));
}
function render() {
  document.body.classList.remove('cinema-playing');
  stopStory();
  if (writingCleanup) writingCleanup();
  const route = (location.hash.slice(1) || 'home').split('/')[0];
  document.body.dataset.route = route;
  setOceanWorld(route);
  document
    .querySelectorAll('nav a')
    .forEach(a =>
      a.classList.toggle('active', a.hash === '#' + (route === 'legend' ? 'museum' : route))
    );
  setMiloMood('idle');
  if (route === 'writing') {
    writingMode = stageFor('writing') >= 2 ? 'free' : 'trace';
    if (stageFor('writing') === 3 && writingChoice.length === 1) writingChoice = 'cat';
  }
  (
    ({
      home,
      play,
      collection,
      museum,
      writing,
      expeditions,
      stories: storiesPage,
      legend: openKraken,
      cinema,
      // race.js loads last; until then (e.g. reopening on #race) show home, then race.js re-renders.
      race: () => (typeof raceGame === 'function' ? raceGame() : home()),
      path: () => (typeof pathPage === 'function' ? pathPage() : home()),
      draw: () => (typeof drawShark === 'function' ? drawShark() : home())
    })[route] || home
  )();
  if (!['play', 'writing'].includes(route)) updateMilo();
  window.scrollTo(0, 0);
  app.scrollTop = 0;
  updateSound();
  if (!storageOK) showSaveWarning();
  updateMiloDock();
  finishLaunch();
  playPendingAdventureInvite(route);
}
initReefCrew();
initOceanAtmosphere();
window.addEventListener('hashchange', render);
render();
if ('serviceWorker' in navigator) {
  let reloading = false;
  const wasControlled = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (wasControlled && !reloading) {
      reloading = true;
      location.reload();
    }
  });
  navigator.serviceWorker
    .register('./sw.js', { updateViaCache: 'none' })
    .then(async registration => {
      await registration.update().catch(() => {});
      await navigator.serviceWorker.ready;
      const cache = await caches.open('haytham-sharks-v89');
      const files = [
        './assets/fossil-gateway-carved.webp',
        './assets/writing-sand.svg',
        './calm-scenes.js',
        './calm-scenes.css',
        './hands-on-sharing.js',
        './hands-on-sharing.css',
        './lesson-pack.js',
        './ocean-experience.js',
        './ocean-experience.css',
        './reading-adventure.js',
        './reading-adventure.css',
        './recorded-voices.js',
        './audio/milo-welcome.mp3',
        './audio/willa-welcome.mp3',
        './audio/gizmo-welcome.mp3',
        './audio/tiggy-welcome.mp3',
        './audio/dash-welcome.mp3',
        './shark-school.js',
        './shark-school.css',
        './assets/goblin-shark.jpg',
        './assets/mako-shark.jpg',
        './assets/basking-shark.jpg',
        './assets/epaulette-shark.jpg',
        './secrets.js',
        './band.css',
        './ocean-titles.css',
        './assets/title-reef.svg',
        './assets/haytham-surfboard-bite.webp',
        './crew.js',
        './crew.css',
        './assets/crew-willa.webp',
        './assets/crew-tiggy.webp',
        './assets/crew-gizmo.webp',
        './assets/crew-dash.webp',
        './assets/cinema-seats-rear.webp',
        './assets/cinema-milo-rear.webp',
        './atmosphere.js',
        './ocean-worlds.css',
        './audio/home.m4a',
        './audio/learning.m4a',
        './audio/sharks.m4a',
        './audio/writing.m4a',
        './audio/stories.m4a',
        './audio/collection.m4a',
        './assets/world-home.jpg',
        './assets/world-learning.jpg',
        './assets/world-sharks.jpg',
        './assets/world-stories.jpg',
        './reef-play.js',
        './visual-play.css',
        './assets/visual-sharks.jpg',
        './assets/visual-adventure.jpg',
        './assets/visual-writing.jpg',
        './assets/visual-stories.jpg',
        './assets/visual-fossil.jpg',
        './assets/visual-megalodon.jpg',
        './assets/visual-kraken.jpg',
        './companion.js',
        './learning.js',
        './stories.js',
        './milo.css',
        './app.js',
        './encyclopedia.js',
        './writing.js',
        './premium.css',
        './assets/reef-background.jpg',
        './assets/milo-3d.webp',
        './assets/whale-shark.jpg',
        './assets/hammerhead.jpg',
        './assets/tiger-shark.jpg',
        './assets/white-shark.jpg'
      ];
      const ready = (await Promise.all(files.map(f => cache.match(f)))).every(Boolean);
      $('#offline').textContent = ready
        ? '● Offline pack ready'
        : 'Updating offline pack… reopen online';
    })
    .catch(() => {
      $('#offline').textContent = 'Offline setup failed — reconnect and reopen';
    });
} else $('#offline').textContent = 'Offline play unavailable in this browser';
