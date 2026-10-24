/* Screen-based ocean adventures. Existing curriculum and practice records remain authoritative. */
const oceanSpecies = [
  'salmon',
  'tuna',
  'squid',
  'crab',
  'barracuda',
  'turtle',
  'blue-tang',
  'clownfish',
  'hammerhead'
];
function seaAnimal(kind = 'tuna') {
  const colours = {
    salmon: ['#789e9b', '#f4d4bf'],
    tuna: ['#244f8c', '#dbe8e9'],
    barracuda: ['#6b8a99', '#e6ece9'],
    'blue-tang': ['#167de0', '#ffdc45'],
    clownfish: ['#fc8b32', '#fff7df'],
    hammerhead: ['#6c9ba7', '#d2e4df']
  };
  let drawing = '';
  if (kind === 'turtle')
    drawing =
      '<ellipse cx="98" cy="54" rx="48" ry="32" fill="#629569" stroke="#244f4b" stroke-width="3"/><path d="M72 34L98 24L121 39L119 66L94 84L72 65Z" fill="none" stroke="#b7d091" stroke-width="4"/><path d="M65 36Q22 11 39 53L60 59M69 75Q43 106 84 87M125 35Q155 12 145 46M127 77Q153 100 141 69" fill="#b0c887"/><ellipse cx="158" cy="55" rx="23" ry="17" fill="#b0c887"/><circle cx="167" cy="50" r="3" fill="#183b45"/>';
  else if (kind === 'crab')
    drawing =
      '<g stroke="#bd523f" stroke-width="6" fill="none"><path d="M67 57L32 46L23 24M65 64L28 69L14 87M70 72L46 88L43 99M69 69L36 79L27 95M132 57L165 44L174 23M136 68L175 72L186 91M129 77L151 94L149 103M130 71L162 83L172 100"/></g><path d="M26 28Q-4 10 18 5L28 17L36 3Q55 13 26 28M174 28Q146 10 168 5L177 17L186 3Q202 16 174 28" fill="#ed8362"/><ellipse cx="100" cy="62" rx="44" ry="29" fill="#ea7659"/><path d="M82 38V22M117 38V22" stroke="#ed8362" stroke-width="8"/><circle cx="82" cy="20" r="6" fill="#153848"/><circle cx="117" cy="20" r="6" fill="#153848"/>';
  else if (kind === 'squid')
    drawing =
      '<path d="M51 54L90 13L132 39L111 70Z" fill="#d58ead"/><path d="M61 44Q110 15 156 52Q111 86 61 65Z" fill="#e8b7cd"/><g fill="none" stroke="#c783a4" stroke-width="5" stroke-linecap="round"><path d="M65 45Q15 3 13 31M66 51Q8 31 8 52M65 57Q6 70 19 84M68 65Q38 111 18 97M72 68Q56 92 42 84M65 48Q31 15 22 22M65 53Q22 44 17 41M65 61Q24 83 30 69M71 69Q66 108 48 99M62 59Q9 93 5 78"/></g><circle cx="90" cy="52" r="7" fill="#163848"/>';
  else if (kind === 'dolphin')
    drawing =
      '<path d="M15 73Q46 14 116 39L143 55L176 60L177 69L142 71Q123 91 66 78L39 94L44 72L18 93Z" fill="#91c7d2"/><path d="M83 39L101 10L108 43M106 70L126 98L89 78" fill="#6498b2"/><circle cx="139" cy="59" r="3" fill="#123744"/>';
  else if (kind === 'octopus')
    drawing =
      '<g fill="none" stroke="#d6a0d9" stroke-width="12" stroke-linecap="round"><path d="M70 60Q12 108 13 55M83 68Q39 113 34 81M96 72Q86 114 68 96M107 72Q122 113 135 93M119 65Q166 112 166 72M127 56Q188 98 188 45M76 65Q28 89 21 72M122 63Q157 93 179 84"/></g><ellipse cx="100" cy="44" rx="35" ry="34" fill="#d6a0d9"/><circle cx="87" cy="44" r="5" fill="#23364d"/><circle cx="112" cy="44" r="5" fill="#23364d"/>';
  else {
    const c = colours[kind] || colours.tuna;
    drawing = `<path d="M24 54Q72 13 153 48L185 20L175 57L186 91L152 67Q72 99 24 54Z" fill="${c[0]}"/><path d="M27 57Q84 64 156 57Q96 95 27 57Z" fill="${c[1]}"/><path d="M82 35L105 10L116 40M91 76L114 101L123 73" fill="${kind === 'blue-tang' ? '#15354e' : c[0]}"/><circle cx="47" cy="49" r="4" fill="#122c3b"/><path d="M63 42Q72 54 64 67" fill="none" stroke="#153d51" stroke-opacity=".5" stroke-width="2"/>`;
    if (kind === 'tuna')
      drawing +=
        '<path d="M124 39L133 35L136 43M138 43L146 40L149 47M128 73L136 78L139 69M143 67L152 71L155 64" fill="#edcd54"/>';
    if (kind === 'clownfish')
      drawing +=
        '<path d="M65 34L72 78M102 29L110 81M145 44L151 68" stroke="#fff9e8" stroke-width="13"/><path d="M57 34L65 78M94 29L102 81M138 44L144 68" stroke="#303b41" stroke-width="3"/>';
    if (kind === 'blue-tang')
      drawing +=
        '<path d="M72 32Q136 22 151 51L128 64L98 45L75 54Z" fill="#14364f"/><path d="M156 49L184 25L174 57L184 86L155 67Z" fill="#ffdf48"/>';
    if (kind === 'barracuda')
      drawing +=
        '<path d="M24 54L4 56L32 66M77 34L89 23L98 36M126 39L137 30L142 44" fill="#6b8a99"/><path d="M39 43L40 69M86 35L87 78M101 36L102 77M117 38L118 74" stroke="#344f64" stroke-width="3" opacity=".5"/>';
    if (kind === 'salmon')
      drawing +=
        '<g fill="#345762"><circle cx="84" cy="40" r="2"/><circle cx="97" cy="45" r="2"/><circle cx="109" cy="38" r="2"/><circle cx="124" cy="45" r="2"/><circle cx="138" cy="51" r="2"/></g>';
    if (kind === 'hammerhead')
      drawing +=
        '<path d="M29 39L12 30L7 40L18 57L8 74L16 82L37 69Z" fill="#7ba7af"/><circle cx="15" cy="36" r="3" fill="#172e3b"/>';
  }
  return `<svg class="sea-animal animal-${kind}" viewBox="0 0 200 112" role="img" aria-label="Cartoon ${kind === 'blue-tang' ? 'blue tang' : kind === 'tuna' ? 'bluefin tuna' : kind}">${drawing}</svg>`;
}
function museumPictogram(title) {
  const type = /when|old|time|live\?/i.test(title)
    ? 'clock'
    : /eat|food|jaws|teeth/i.test(title)
      ? 'mouth'
      : /know|evidence|scientist/i.test(title)
        ? 'person'
        : 'shark';
  const drawings = {
    clock: '<circle cx="50" cy="50" r="32"/><path d="M50 26V51L70 63"/>',
    person: '<circle cx="50" cy="32" r="15"/><path d="M21 84Q21 53 50 53Q79 53 79 84Z"/>',
    mouth: '<path d="M14 40Q50 12 86 40L72 80L59 50L47 79L34 49L23 72Z"/>',
    shark: '<path d="M9 55Q35 28 57 43L66 19L72 45L84 50L95 33L91 57L97 75L82 65Q44 81 9 55Z"/>'
  };
  return `<svg class="museum-pictogram" viewBox="0 0 110 105" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${drawings[type]}</g><circle cx="88" cy="19" r="15" fill="#e4efce"/><text x="88" y="26" text-anchor="middle" fill="#163d51" font-size="23" font-family="sans-serif">?</text></svg>`;
}

const oldHome = home,
  oldRender = render,
  oldPlay = play,
  oldStart = start,
  oldArticle = sharkArticle,
  oldTopic = oceanTopicPage,
  oldQuestions = makeQuestions,
  oldSave = save,
  oldAnswer = answer,
  oldReadingAnswer = readingMissionAnswer,
  oldEncourage = encourage,
  oldSpeak = speak,
  oldFinish = finish;
let lastPearls = state.xp,
  rewardIndex = 0,
  screenCleanup = () => {},
  speechGlow = null,
  narrationTimer = null,
  sessionIntroShown = false;
let screenNarration = '';
let autoAdvanceTimer = null;
function advanceAfterCelebration() {
  clearTimeout(autoAdvanceTimer);
  const active = game,
    index = active.index,
    started = Date.now(),
    waitLimit = active.mission
      ? Math.min(
          16000,
          Math.max(7000, (active.items[index].reveal || '').split(/\s+/).length * 500 + 2000)
        )
      : 6500;
  function advance() {
    if (game !== active || game.index !== index || !game.answered || location.hash !== '#play')
      return;
    const speaking =
      document.body.classList.contains('milo-speaking') ||
      document.body.classList.contains('helper-speaking');
    if (speaking && Date.now() - started < waitLimit) {
      autoAdvanceTimer = setTimeout(advance, 250);
      return;
    }
    active.index++;
    active.assisted = false;
    active.answered = false;
    if (active.mission) readingMission();
    else play();
  }
  autoAdvanceTimer = setTimeout(advance, 2400);
}
const previousHelperSpeak = helperSpeak,
  previousTouchMilo = touchMilo,
  previousGreetCrew = greetCrew;
helperSpeak = function (text, options = {}) {
  screenNarration = text;
  previousHelperSpeak(text, options);
};
touchMilo = function () {
  if (document.body.dataset.route !== 'home' && screenNarration) {
    speak(screenNarration);
    return;
  }
  previousTouchMilo();
};
greetCrew = function (key) {
  if (document.body.dataset.route !== 'home' && screenNarration) {
    speak(screenNarration, { speaker: key });
    return;
  }
  previousGreetCrew(key);
};
function narratePanel(panel) {
  if (!panel) return;
  const heading = panel.querySelector('h1,h2,strong')?.textContent || '';
  const body = panel.querySelector('p')?.textContent || '';
  const choices = panel.matches('.shark-question')
    ? [...panel.querySelectorAll('[data-book-answer]')]
        .map((b, i) => 'Choice ' + (i + 1) + ': ' + (b.getAttribute('aria-label') || b.textContent))
        .join('. ')
    : '';
  const text = heading + '. ' + (choices || body);
  if (text.trim() !== '.') setSpeakingPanel(panel, text);
}
const previousUpdateSound = updateSound;
updateSound = function () {
  previousUpdateSound();
  document.body.classList.toggle('voice-muted', !state.voice);
  $('#oceanVoice')?.setAttribute('aria-pressed', String(state.voice));
};
save = function () {
  const gained = state.xp - lastPearls;
  oldSave();
  if (gained > 0) {
    pearlFlight(gained);
    if (Math.floor(state.xp / 50) > Math.floor(lastPearls / 50)) {
      state.videoUnlocks = earnedVideoCount();
      oldSave();
      showVideoUnlock();
    }
  }
  lastPearls = state.xp;
  updateTreasure();
};
function updateTreasure() {
  const count = $('#treasureCount');
  if (count) count.textContent = state.xp;
}
function pearlFlight(amount) {
  const fx = document.createElement('div');
  fx.className = 'pearl-flight';
  fx.innerHTML = `<span class="reward-clam"><svg viewBox="0 0 140 120" aria-hidden="true"><path d="M15 72Q70 125 125 72L110 101Q70 122 30 101Z" fill="#afc5e4" stroke="#e8e8f1" stroke-width="3"/><g class="clam-lid"><path d="M15 72Q-2 24 31 23Q39 0 57 17Q76-5 90 18Q122 5 127 37Q143 58 125 72Q70 103 15 72Z" fill="#e5cfe8" stroke="#f4efde" stroke-width="3"/><path d="M70 87L32 30M70 87L64 20M70 87L95 26M70 87L120 44" stroke="#a69ac2" stroke-width="3" fill="none"/></g></svg></span><i class="flying-pearl"></i><b>+${amount}</b>`;
  document.body.append(fx);
  setTimeout(() => fx.remove(), 1900);
}
function joyfulReaction(extra = '', speaker = 'milo') {
  const options = [
    ['hammerhead', 'Chomp-tastic!'],
    ['tuna', 'Speedy selection!'],
    ['octopus', 'Wonderful work!'],
    ['dolphin', 'Great trick!'],
    ['turtle', 'Awesome work, dude!']
  ];
  const [animal, line] = options[rewardIndex++ % options.length];
  $('#oceanReaction')?.remove();
  const fx = document.createElement('div');
  fx.id = 'oceanReaction';
  fx.className = 'ocean-reaction reaction-' + animal;
  fx.setAttribute('role', 'status');
  fx.innerHTML = seaAnimal(animal) + `<strong>${line}</strong>`;
  document.body.append(fx);
  playRewardChime();
  speak(line + (extra ? ' ' + extra : ''), { speaker });
  setTimeout(() => fx.remove(), 2300);
}
function playRewardChime() {
  if (!state.voice) return;
  try {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    const ctx = rewardAudio || (rewardAudio = new C());
    ctx.resume();
    [660, 880, 1100].forEach((f, i) => {
      const o = ctx.createOscillator(),
        g = ctx.createGain(),
        t = ctx.currentTime + i * 0.09;
      o.type = 'sine';
      o.frequency.value = f;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.045, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(t);
      o.stop(t + 0.27);
    });
  } catch {}
}
let rewardAudio = null;
function playDiveSplash() {
  if (!state.voice || !navigator.userActivation?.hasBeenActive) return;
  try {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    const ctx = rewardAudio || (rewardAudio = new C());
    ctx.resume();
    const duration = 0.95,
      buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate),
      data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++)
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 1.6);
    const source = ctx.createBufferSource(),
      filter = ctx.createBiquadFilter(),
      gain = ctx.createGain();
    source.buffer = buffer;
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.9);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.95);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(ctx.currentTime + 0.3);
  } catch {}
}
answer = function (value) {
  const good = game && !game.answered && value === game.items[game.index].answer;
  oldAnswer(value);
  if (good) {
    joyfulReaction();
    advanceAfterCelebration();
  }
};
readingMissionAnswer = function (value) {
  const good = game && !game.answered && value === game.items[game.index].answer;
  oldReadingAnswer(value);
  if (good) {
    joyfulReaction(game.items[game.index].reveal, 'willa');
    advanceAfterCelebration();
  }
};
finish = function () {
  const key = game?.type;
  oldFinish();
  if (!key) return;
  const s = sharkBook[state.completed.length % sharkBook.length];
  const fact = s.facts[0].join(' ');
  const panel = app.querySelector('.game-panel');
  if (panel) {
    const box = document.createElement('div');
    box.className = 'activity-fact-reward';
    box.innerHTML = `<strong>A discovery with your friends</strong><p>${s.name}: ${fact}</p><button id="hearActivityFact">♫ Hear our shark fact</button>`;
    panel.querySelector('.choices')?.before(box);
    $('#hearActivityFact').onclick = () => speak(s.name + '. ' + fact, { speaker: 'gizmo' });
    helperSpeak(s.name + '. ' + fact);
    requestAnimationFrame(fitScreen);
  }
};
makeQuestions = function (type) {
  const items = oldQuestions(type);
  if (type === 'maths')
    items.forEach((q, i) => {
      if (q.scene.includes('🐟')) {
        q.countingSpecies =
          oceanSpecies[
            (state.history.filter(x => x.type === 'maths').length + i) % oceanSpecies.length
          ];
        q.countingCount = Number(q.answer);
        const names = { 'blue-tang': 'blue tang', tuna: 'bluefin tuna' };
        const label = names[q.countingSpecies] || q.countingSpecies;
        q.scene = `<div class="counting-school" aria-label="Animals to count">${Array.from({ length: q.countingCount }, () => `<span>${seaAnimal(q.countingSpecies)}</span>`).join('')}</div>`;
        q.prompt = `How many ${['squid', 'salmon', 'bluefin tuna', 'blue tang'].includes(label) ? label : label === 'clownfish' ? 'clownfish' : label === 'hammerhead' ? 'hammerhead sharks' : label + 's'} can you count?`;
        q.spoken = q.prompt;
        q.hint = 'Point to one animal at a time. Count across each row, then the next row.';
      }
    });
  return items;
};
function shellBoard() {
  return `<img class="fossil-tooth" src="assets/fossil-gateway-carved.png" alt="Haytham’s Shark Adventures chiseled into a fossil shark tooth" width="1254" height="1254">`;
}
const sharkButtons = [
  ['willa', 'Reading', 'reading'],
  ['tiggy', 'Maths', 'maths'],
  ['milo', 'Daily adventure', 'daily'],
  ['gizmo', 'Sharks', 'museum'],
  ['dash', 'Writing', 'writing']
];
home = function () {
  app.innerHTML = `<section class="new-reef-home"><div class="home-light-rays" aria-hidden="true"></div><div class="home-board">${shellBoard()}<button id="dailyPlay" aria-label="Play today's learning adventure"><span aria-hidden="true">▶</span></button></div><p class="home-one-line">Your friends. Your ocean. A new adventure.</p><div class="home-fish" aria-hidden="true">${seaAnimal('tuna')}${seaAnimal('clownfish')}${seaAnimal('turtle')}</div><div class="home-friends" aria-label="Choose a friend to learn with">${sharkButtons.map(([k, label]) => `<button data-friend-route="${k}" aria-label="${k === 'milo' ? 'Milo' : reefCrew[k].name}: ${label}"><span>${k === 'milo' ? miloActor() : crewActor(k)}</span><strong>${k === 'milo' ? 'Milo' : reefCrew[k].name}</strong><small>${label}</small></button>`).join('')}</div></section>`;
  $('#dailyPlay').onclick = dailyAdventure;
  bindHomeGreetings();
  document.querySelectorAll('[data-friend-route]').forEach(
    b =>
      (b.onclick = () => {
        if (b.dataset.greetingHeld === 'true') {
          delete b.dataset.greetingHeld;
          return;
        }
        launchWithFriend(b.dataset.friendRoute);
      })
  );
};
function dailyAdventure() {
  const subjects = ['reading', 'maths', 'writing'];
  const today = new Date().toDateString();
  const done =
    state.completed.filter(x => new Date(x.at).toDateString() === today).length +
    (state.writingHistory || []).filter(x => new Date(x.at).toDateString() === today).length;
  const type = subjects[done % 3];
  if (type === 'writing') location.hash = 'writing';
  else start(type);
}
function libraryPage() {
  app.innerHTML = `<section class="sub-library"><span class="tag">THE SUBMARINE LIBRARY</span><h1>Choose an adventure</h1><div class="library-choices">${[
    ['reading', '📖', 'Read with Willa'],
    ['maths', '🧮', 'Maths with Tiggy'],
    ['writing', '🐚', 'Write with Dash'],
    ['museum', '🦈', 'Sharks with Gizmo'],
    ['stories', '📚', 'Stories with Willa'],
    ['collection', '💎', 'My treasures'],
    ['expeditions', '🧭', 'All learning games']
  ]
    .map(
      ([route, icon, label]) =>
        `<button data-library-route="${route}"><span class="library-picture"><img src="assets/visual-${{ reading: 'stories', maths: 'adventure', writing: 'writing', museum: 'sharks', stories: 'stories', collection: 'fossil', expeditions: 'adventure' }[route]}.jpg" alt=""></span>${label}</button>`
    )
    .join('')}</div></section>`;
  document.querySelectorAll('[data-library-route]').forEach(
    b =>
      (b.onclick = () => {
        const route = b.dataset.libraryRoute;
        if (['reading', 'maths'].includes(route)) start(route);
        else location.hash = route;
      })
  );
}
const subSVG =
  '<svg viewBox="0 0 140 85" aria-hidden="true"><path d="M30 35H100Q137 35 132 60Q128 78 100 78H30Q8 78 8 56Q8 35 30 35Z" fill="#e5c36f" stroke="#163c51" stroke-width="4"/><path d="M62 35V16H83V6" fill="none" stroke="#e5c36f" stroke-width="10"/><circle cx="43" cy="55" r="11" fill="#71cada" stroke="#866d44" stroke-width="4"/><circle cx="82" cy="55" r="11" fill="#71cada" stroke="#866d44" stroke-width="4"/><path d="M128 46L139 37V78L128 66" fill="#c39046"/></svg>';
const treasureSVG =
  '<svg viewBox="0 0 100 85" aria-hidden="true"><path d="M10 34Q11 7 50 7Q89 7 90 34V75H10Z" fill="#87613d" stroke="#e6c574" stroke-width="5"/><path d="M11 35H89M29 13V74M71 13V74" stroke="#d4ad5c" stroke-width="7"/><rect x="42" y="30" width="16" height="24" rx="4" fill="#f1d789"/><circle cx="50" cy="40" r="3" fill="#5d4e37"/><path d="M18 58H23M77 58H82" stroke="#593c28" stroke-width="3"/></svg>';
function installOceanChrome() {
  const chrome = document.createElement('div');
  chrome.id = 'oceanChrome';
  chrome.innerHTML = `<a class="submarine-library" href="#library" aria-label="Open the submarine library">${subSVG}<span>Library</span></a><div id="screenNav"><button id="screenHome" aria-label="Home: back to the reef"><svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15L16 5L28 15M8 12V27H14V19H18V27H24V12"/></svg> <span>Home</span></button><button id="screenBack" aria-label="Back to previous page">↩ <span>Back</span></button></div><button id="treasureChest" aria-label="Open treasure collection"><span aria-hidden="true">${treasureSVG}</span><i class="chest-pearl"></i><strong id="treasureCount">${state.xp}</strong><small>pearls</small></button><button id="oceanSettings" aria-label="Open parent settings">⚙</button><button id="oceanVoice" aria-label="Toggle character voices">♫</button>`;
  document.body.append(chrome);
  $('#treasureChest').onclick = () => (location.hash = 'collection');
  $('#oceanSettings').onclick = () => $('#parent').click();
  $('#oceanVoice').onclick = () => {
    $('#sound').click();
    $('#oceanVoice').setAttribute('aria-pressed', String(state.voice));
  };
  $('#screenBack').onclick = () => {
    stopSpeech();
    if (location.hash.startsWith('#museum/')) location.hash = 'museum';
    else location.hash = 'home';
  };
  $('#screenHome').onclick = goHomeNow;
}
// Always-available way home: stops talking and any activity in progress, then returns to the reef.
function goHomeNow() {
  stopSpeech();
  clearTimeout(autoAdvanceTimer);
  if (typeof stopLessonJourney === 'function') stopLessonJourney();
  if (typeof guidedWriting !== 'undefined') guidedWriting = null;
  if (typeof freeWriting !== 'undefined') freeWriting = false;
  game = null;
  screenStack = [];
  lastRoute = '';
  if ($('#modal')?.open) $('#modal').close();
  if (location.hash === '#home') render();
  else location.hash = 'home';
}

function sharkWelcome() {
  const s =
    sharkBook.find(x => !state.discoveries.includes('book-' + x.id)) ||
    sharkBook[new Date().getDate() % sharkBook.length];
  app.innerHTML = `<section class="meet-one"><span class="tag">GIZMO’S NEXT DISCOVERY</span><h1>Who’s in our ocean?</h1><button class="meet-feature" id="meetNewShark"><img src="assets/${s.image || 'visual-megalodon.jpg'}" alt="${s.image ? 'Real shark photograph' : 'Megalodon reconstruction'}"><span><strong>${s.name}</strong><small>${s.intro}</small><b>Meet this shark →</b></span></button><a class="all-sharks-link" href="#museum/all">🦈 Explore the shark encyclopedia</a></section>`;
  $('#meetNewShark').onclick = () => (location.hash = 'museum/' + s.id);
  helperSpeak('Let’s meet ' + s.name + '. ' + s.intro);
}
let shelfTab = 'sharks',
  shelfPage = 0;
function encyclopediaShelf() {
  const records =
    shelfTab === 'sharks' ? sharkBook : shelfTab === 'topics' ? oceanTopics : sharkWords;
  const size = shelfTab === 'words' ? 6 : 3;
  const pageCount = Math.ceil(records.length / size);
  shelfPage = Math.min(shelfPage, pageCount - 1);
  app.innerHTML = `<section class="encyclopedia-shelf"><span class="tag">THE SHARK ENCYCLOPEDIA</span><h1>Explore with Gizmo</h1><div class="shelf-tabs" role="group" aria-label="Encyclopedia sections">${[
    ['sharks', '🦈 Sharks'],
    ['topics', '🔎 Shark school'],
    ['words', '💎 Word chest']
  ]
    .map(
      ([key, label]) =>
        `<button data-shelf-tab="${key}" aria-pressed="${shelfTab === key}">${label}</button>`
    )
    .join('')}</div><div class="shelf-cards ${shelfTab === 'words' ? 'word-shelf' : ''}">${records
    .slice(shelfPage * size, (shelfPage + 1) * size)
    .map((r, i) =>
      shelfTab === 'sharks'
        ? `<a class="shelf-card" href="#museum/${r.id}"><img src="assets/${r.image || 'visual-megalodon.jpg'}" alt="${r.image ? 'Real' : 'Reconstruction of'} ${r.name}"><h2>${r.name}</h2><p>${r.subtitle}</p></a>`
        : shelfTab === 'topics'
          ? `<button class="shelf-card topic-card" data-topic="${r.id}"><span class="school-icon">${schoolIcon(r.icon)}</span><strong>${r.title}</strong><span>${r.desc}</span></button>`
          : `<button class="shelf-word" data-shelf-word="${shelfPage * size + i}">${museumPictogram(r[0])}<strong>${r[0]}</strong></button>`
    )
    .join(
      ''
    )}</div><p id="shelfMeaning" role="status"></p><div class="shelf-pagination"><button id="shelfPrevious" ${shelfPage === 0 ? 'disabled' : ''} aria-label="Previous discoveries">←</button><span>${shelfPage + 1} / ${pageCount}</span><button id="shelfNext" ${shelfPage === pageCount - 1 ? 'disabled' : ''} aria-label="Next discoveries">→</button></div><a class="legend-link" href="#legend">🐙 Sea legends: the imaginary Kraken</a></section>`;
  document.querySelectorAll('[data-shelf-tab]').forEach(
    b =>
      (b.onclick = () => {
        shelfTab = b.dataset.shelfTab;
        shelfPage = 0;
        encyclopediaShelf();
      })
  );
  $('#shelfPrevious').onclick = () => {
    shelfPage--;
    encyclopediaShelf();
  };
  $('#shelfNext').onclick = () => {
    shelfPage++;
    encyclopediaShelf();
  };
  document
    .querySelectorAll('[data-topic]')
    .forEach(b => (b.onclick = () => openTopic(b.dataset.topic)));
  document.querySelectorAll('[data-shelf-word]').forEach(
    b =>
      (b.onclick = () => {
        const w = sharkWords[+b.dataset.shelfWord];
        $('#shelfMeaning').textContent = w.join(': ');
        helperSpeak(w.join('. '));
      })
  );
  bindMuseumNarration();
  requestAnimationFrame(fitScreen);
}
function setSpeakingPanel(panel, text) {
  if (!panel || !panel.isConnected) return;
  document.querySelectorAll('.speaking-panel').forEach(p => p.classList.remove('speaking-panel'));
  speechGlow = panel;
  panel.classList.add('speaking-panel');
  helperSpeak(text, {
    end: () => panel.classList.remove('speaking-panel'),
    unavailable: () => panel.classList.remove('speaking-panel')
  });
}
function bindMuseumNarration() {
  document
    .querySelectorAll(
      '.fact-grid>section,.shark-question,.school-heading,.school-activity,.deep-science,.topic-card'
    )
    .forEach(panel => {
      if (panel.dataset.voiceBound) return;
      panel.dataset.voiceBound = '1';
      if (panel.matches('.fact-grid>section,.shark-question')) {
        const title = panel.querySelector('h2')?.textContent || '';
        panel.insertAdjacentHTML('afterbegin', museumPictogram(title));
      }
      const text = () => panel.querySelector('h2,h1,strong')?.textContent || '';
      let timer;
      const queue = () => {
        clearTimeout(timer);
        timer = setTimeout(() => setSpeakingPanel(panel, text()), 350);
      };
      panel.addEventListener('pointerenter', e => {
        if (e.pointerType !== 'touch') queue();
      });
      panel.addEventListener('focusin', e => {
        if (!e.target.matches('button')) queue();
      });
      panel.addEventListener('pointerleave', () => {
        clearTimeout(timer);
        if (speechGlow === panel) {
          stopSpeech();
          panel.classList.remove('speaking-panel');
          speechGlow = null;
        }
      });
      panel
        .querySelectorAll('[data-read-fact]')
        .forEach(
          b =>
            (b.onclick = () =>
              setSpeakingPanel(
                panel,
                (panel.querySelector('h2')?.textContent || '') +
                  '. ' +
                  (panel.querySelector('p')?.textContent || '')
              ))
        );
      if (panel.matches('.shark-question')) {
        panel.querySelectorAll('[data-book-answer]').forEach((b, i) => {
          const label = b.textContent.trim();
          b.setAttribute('aria-label', label);
          b.innerHTML =
            museumPictogram(label) +
            `<b class="answer-number">${i + 1}</b><span class="answer-caption">${label}</span>`;
        });
        panel
          .querySelector('#hearQuestion')
          ?.addEventListener('click', () => setSpeakingPanel(panel, text()));
        panel.querySelectorAll('[data-book-answer]').forEach(b => {
          b.addEventListener('pointerenter', e => {
            if (e.pointerType !== 'touch') {
              clearTimeout(timer);
              setSpeakingPanel(b, b.textContent);
            }
          });
          b.addEventListener('focus', () => setSpeakingPanel(b, b.textContent));
          b.addEventListener('click', () => {
            if (b.dataset.bookAnswer === '0') {
              joyfulReaction();
              updateTreasure();
            }
          });
        });
      }
    });
}
sharkArticle = function (s) {
  oldArticle(s);
  bindMuseumNarration();
  clearTimeout(narrationTimer);
  narrationTimer = setTimeout(() => {
    if (location.hash === '#museum/' + s.id)
      helperSpeak(
        s.name + '. ' + (s.group === 'prehistoric' ? 'Prehistoric shark. ' : '') + s.intro
      );
  }, 450);
};
oceanTopicPage = function (id) {
  oldTopic(id);
  bindMuseumNarration();
  const t = oceanTopics.find(x => x.id === id);
  if (t) helperSpeak(t.title + '. ' + t.desc);
};

// Paginate content into complete screens; never put a second scroll area inside the app.
function screenPages() {
  screenCleanup();
  screenCleanup = () => {};
  if (document.body.dataset.route === 'home' || location.hash === '#museum/all') return;
  const route = document.body.dataset.route;
  const root = app.querySelector('.shark-article,.story-library,.collection') || app;
  const pages = [];
  if (root.matches('.shark-article')) {
    const groups = [...root.children];
    groups.forEach(el => {
      if (el.matches('.fact-grid')) {
        [...el.children].forEach(c => pages.push([c]));
        el.replaceWith(...el.children);
      } else if (!el.matches('.article-top,.shark-id,.back-link')) pages.push([el]);
    });
    root
      .querySelectorAll(':scope>.article-top,:scope>.shark-id,:scope>.back-link')
      .forEach(el => (el.hidden = true));
  } else if (route === 'museum' && location.hash === '#museum/all') {
    const nodes = [...app.children];
    nodes.forEach(n => {
      if (n.id === 'sharkCollection') {
        const cards = n.querySelector('#speciesCards');
        if (cards) {
          const keep = [...n.children].filter(x => x !== cards);
          pages.push(keep);
          [...cards.children].forEach(c => pages.push([c]));
          cards.replaceWith(...cards.children);
        }
      } else if (n.matches('.topic-section')) {
        const grid = n.querySelector('.topic-grid');
        if (grid) {
          [...grid.children].forEach(c => pages.push([c]));
          grid.replaceWith(...grid.children);
        }
      } else if (
        !n.matches('.ocean-secret-trail,.subject-helper,.book-head,.book-section-links,.book-note')
      )
        pages.push([n]);
    });
    app
      .querySelectorAll('.book-head,.book-section-links,.book-note')
      .forEach(x => (x.hidden = true));
  } else if (route === 'collection' && root.matches('.collection'))
    [...root.children].forEach(c => pages.push([c]));
  if (pages.length < 2) return;
  let current = 0;
  const all = pages.flat();
  const pager = document.createElement('div');
  pager.className = 'screen-pager';
  pager.innerHTML =
    '<button aria-label="Previous screen">←</button><span></span><button aria-label="Next screen">→</button>';
  document.body.append(pager);
  const show = () => {
    stopSpeech();
    all.forEach(n => (n.hidden = true));
    pages[current].forEach(n => (n.hidden = false));
    pager.querySelector('span').textContent = `${current + 1} / ${pages.length}`;
    pager.children[0].disabled = current === 0;
    pager.children[2].disabled = current === pages.length - 1;
    app.dataset.paged = 'true';
    bindMuseumNarration();
    fitScreen();
    if (current > 0) {
      const panel = pages[current][0];
      if (panel && !panel.matches('.science-sources')) narratePanel(panel);
    }
  };
  pager.children[0].onclick = () => {
    current--;
    show();
  };
  pager.children[2].onclick = () => {
    current++;
    show();
  };
  show();
  screenCleanup = () => {
    pager.remove();
    all.forEach(n => (n.hidden = false));
    delete app.dataset.paged;
  };
}
function fitScreen() {
  const content =
    app.querySelector(
      '.game,.reading-quest,.writing-page,.story-reader,.cinema-page,.story-library,.expedition-page,.sub-library,.lesson-shelf,.lesson-finish,.meet-one,.shark-article,.encyclopedia-shelf,.kraken-ocean-page'
    ) || app.firstElementChild;
  if (!content) return;
  content.style.zoom = '1';
  const available = app.clientHeight - 12;
  const needed = content.scrollHeight;
  if (needed > available && available > 0) {
    const scale = Math.min(1, available / needed);
    content.style.zoom = String(scale);
  } else content.style.zoom = '1';
}
let screenStack = [],
  lastRoute = '';
const previousSyncCrew = syncCrew,
  previousDock = updateMiloDock;
syncCrew = function () {
  previousSyncCrew();
  const helper = $('#subjectHelper');
  if (helper) {
    if (helper.parentElement !== document.body) document.body.append(helper);
    if (!helper.dataset.persistentBound) {
      helper.dataset.persistentBound = 'true';
      helper.querySelector('[data-crew-hello]').onclick = () => greetCrew(helper.dataset.crew);
      helper.querySelector('[data-crew-help]').onclick = () => crewHelp(helper.dataset.crew);
    }
  }
};
updateMiloDock = function () {
  previousDock();
  const host = $('#miloCompanion');
  if (!host) return;
  if (document.body.dataset.route !== 'home') {
    host.hidden = false;
    if (!host.querySelector('.companion-actor')) updateMilo();
  }
};
const friendLaunchLines = {
  willa: 'Let’s read together!',
  tiggy: 'Let’s go counting!',
  gizmo: 'Let’s discover sharks!',
  dash: 'Let’s make sandy letters!',
  milo: 'Let’s go, Haytham!'
};
let friendLaunchPending = false;
function launchWithFriend(key) {
  if (friendLaunchPending || !friendLaunchLines[key]) return;
  friendLaunchPending = true;
  const homePanel = $('.home-friends');
  const go = () => {
    if (!friendLaunchPending) return;
    friendLaunchPending = false;
    clearTimeout(fallback);
    if (!homePanel?.isConnected || !['#home', ''].includes(location.hash)) return;
    if (key === 'willa') start('reading');
    else if (key === 'tiggy') start('maths');
    else if (key === 'gizmo') location.hash = 'museum';
    else if (key === 'dash') location.hash = 'writing';
    else dailyAdventure();
  };
  const fallback = setTimeout(go, 3200);
  reactCrew('happy', key);
  speak(friendLaunchLines[key], { speaker: key, end: go, unavailable: go });
}
function bindHomeGreetings() {
  document.querySelectorAll('[data-friend-route]').forEach(button => {
    let timer;
    const key = button.dataset.friendRoute;
    button.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'touch') return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (button.isConnected) {
          button.dataset.greetingHeld = 'true';
          playCharacterGreeting(key);
        }
      }, 450);
    });
    button.addEventListener('blur', () => clearTimeout(timer));
    button.addEventListener('pointerup', () => clearTimeout(timer));
    button.addEventListener('pointercancel', () => clearTimeout(timer));
    button.addEventListener('pointerenter', event => {
      if (event.pointerType === 'touch') return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!friendLaunchPending && button.isConnected && document.body.dataset.route === 'home')
          playCharacterGreeting(key);
      }, 300);
    });
    button.addEventListener('pointerleave', () => clearTimeout(timer));
    button.addEventListener('focus', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!friendLaunchPending && button.isConnected && document.body.dataset.route === 'home')
          playCharacterGreeting(key);
      }, 300);
    });
  });
}
function earnedVideoCount() {
  return Math.floor(Math.max(0, Number(state.xp) || 0) / 50);
}
function showVideoUnlock() {
  const badge = document.createElement('div');
  badge.className = 'video-unlocked';
  badge.setAttribute('role', 'status');
  badge.innerHTML = '<span aria-hidden="true">🐚 🎬</span><strong>Shark video unlocked!</strong>';
  document.body.append(badge);
  setTimeout(() => badge.remove(), 3500);
}
const previousCinema = cinema;
cinema = function () {
  previousCinema();
  const earned = earnedVideoCount(),
    available = Math.min(earned, cinemaVideos.length);
  const progress = document.createElement('section');
  progress.className = 'cinema-pearl-progress';
  progress.innerHTML = `<strong>${earned} video ${earned === 1 ? 'unlock' : 'unlocks'} earned</strong><p>${50 - (state.xp % 50)} more pearls to your next shark video.</p><div class="video-pearl-track"><i style="width:${(state.xp % 50) * 2}%"></i></div><small>${cinemaVideos.length ? available + ' films ready to choose.' : 'Your unlocks are saved. Your family’s films will appear here when they are ready.'}</small>`;
  app.querySelector('.cinema-page').append(progress);
  document.querySelectorAll('[data-movie]').forEach((button, index) => {
    button.disabled = index >= available;
    if (button.disabled) {
      button.textContent = '🔒 ' + button.textContent;
      button.setAttribute('aria-label', 'Locked: earn ' + (index + 1) * 50 + ' pearls');
    }
  });
  if (!available) {
    const player = $('#sharkMovie');
    if (player) {
      player.pause();
      player.removeAttribute('src');
      player.load();
      player.setAttribute('aria-label', 'Earn 50 pearls to unlock your first shark video');
    }
  }
  screenNarration = 'Every fifty pearls unlocks another shark video, Haytham. I’ll watch with you.';
  updateMilo(screenNarration);
  requestAnimationFrame(fitScreen);
};
const originalParentView = parents;
parents = function () {
  originalParentView();
  const host = $('#modalContent'),
    nodes = [...host.children],
    groups = [];
  let current = [];
  for (const node of nodes) {
    if (node.tagName === 'H3' && current.length) {
      groups.push(current);
      current = [];
    }
    current.push(node);
  }
  if (current.length) groups.push(current);
  const controls = document.createElement('label');
  controls.className = 'parent-page-choice';
  controls.textContent = 'Settings section ';
  const select = document.createElement('select');
  groups.forEach((g, i) =>
    select.add(
      new Option(g.find(n => /^H[23]$/.test(n.tagName))?.textContent || 'Progress', String(i))
    )
  );
  controls.append(select);
  host.prepend(controls);
  const show = () => {
    groups.flat().forEach(n => (n.hidden = true));
    groups[+select.value].forEach(n => (n.hidden = false));
    $('#modal').scrollTop = 0;
  };
  select.onchange = show;
  show();
};
render = function () {
  clearTimeout(autoAdvanceTimer);
  screenNarration = '';
  clearTimeout(narrationTimer);
  screenCleanup();
  screenCleanup = () => {};
  stopStory();
  if (writingCleanup) writingCleanup();
  const route = (location.hash.slice(1) || 'home').split('/')[0];
  if (lastRoute && lastRoute !== location.hash) screenStack.push(lastRoute);
  lastRoute = location.hash;
  document.body.classList.toggle('activity-screen', ['play', 'writing'].includes(route));
  document.body.dataset.route = route;
  if (route === 'library') {
    stopSpeech();
    setOceanWorld('museum');
    libraryPage();
    updateMilo('All your adventures live in our submarine library.');
    syncCrew();
  } else if (location.hash === '#museum/all') {
    stopSpeech();
    setOceanWorld('museum');
    encyclopediaShelf();
    updateMilo('Choose a shark or a discovery. Gizmo and I are here with you.');
    syncCrew();
  } else if (route === 'museum' && !location.hash.includes('/')) {
    stopSpeech();
    setOceanWorld('museum');
    sharkWelcome();
    updateMilo('Gizmo has a new shark discovery for us, Haytham. Let’s explore together.');
    syncCrew();
  } else oldRender();
  $('#screenBack').hidden = route === 'home';
  $('#screenHome').hidden = route === 'home';
  $('#screenBack').onclick = () => {
    stopSpeech();
    let target = screenStack.pop();
    while (target === location.hash) target = screenStack.pop();
    const next = target || 'home';
    lastRoute = '';
    location.hash = next;
  };
  if (!screenNarration && route !== 'home') screenNarration = miloMessage;
  updateTreasure();
  requestAnimationFrame(() => {
    screenPages();
    fitScreen();
  });
};
play = function () {
  oldPlay();
  requestAnimationFrame(fitScreen);
};
const previousMission = readingMission;
readingMission = function () {
  previousMission();
  requestAnimationFrame(fitScreen);
};
const previousReadingFinish = finishReadingMission;
finishReadingMission = function () {
  previousReadingFinish();
  screenNarration =
    'We did it, Haytham! ' + (currentLessonDiscovery?.text || 'Let’s hear our shark discovery.');
  requestAnimationFrame(fitScreen);
};

function showDiveOpening() {
  if (sessionIntroShown) return;
  sessionIntroShown = true;
  document.body.classList.add('intro-running');
  if (location.hash !== '#home') location.hash = 'home';
  const intro = document.createElement('section');
  intro.id = 'diveOpening';
  intro.setAttribute('aria-label', 'The sharks dive from the surface into Haytham’s ocean');
  intro.innerHTML = `<div class="dive-camera"><div class="dive-sky"><div class="dive-sun"></div><div class="surface-wave"></div></div><div class="dive-water"></div><div class="dive-bottom"></div><div class="dive-wildlife" aria-label="Sea creatures swimming at different depths">${['tuna', 'turtle', 'clownfish', 'squid', 'hammerhead', 'blue-tang'].map((kind, i) => `<div class="depth-creature depth-${i}">${seaAnimal(kind)}</div>`).join('')}</div><div class="passing-sub" aria-label="An exploring submarine">${subSVG}<i></i><i></i><i></i></div><div class="passing-diver" aria-label="A scuba explorer waving to the sharks"><svg viewBox="0 0 220 210" aria-hidden="true"><g transform="rotate(-18 110 110)"><path d="M95 83L77 147L104 169L129 117L145 100" fill="#e6a144" stroke="#163849" stroke-width="9"/><path d="M99 158L89 190L62 196M114 157L144 176L169 169" fill="none" stroke="#153849" stroke-width="13" stroke-linecap="round"/><path d="M61 196L31 186L36 207L64 208M167 169L190 151L199 169L178 183" fill="#86d9d5"/><rect x="75" y="75" width="25" height="65" rx="9" fill="#b2c5cc" stroke="#163849" stroke-width="5"/><path d="M130 99L161 104L177 67M114 106L139 139" fill="none" stroke="#183e53" stroke-width="12" stroke-linecap="round"/><circle cx="124" cy="60" r="30" fill="#d4b196"/><rect x="103" y="46" width="44" height="23" rx="9" fill="#80d7de" stroke="#183e53" stroke-width="6"/><path d="M138 76Q181 91 153 120" fill="none" stroke="#163c50" stroke-width="6"/><circle cx="170" cy="52" r="5" fill="none" stroke="#d5f9f3" stroke-width="3"/><circle cx="183" cy="31" r="8" fill="none" stroke="#d5f9f3" stroke-width="3"/></g></svg></div><div class="dive-crew">${sharkButtons.map(([k], i) => `<div style="--dive-i:${i}">${k === 'milo' ? miloActor() : crewActor(k)}</div>`).join('')}</div></div><button id="skipDive">Skip dive →</button>`;
  document.body.append(intro);
  let timer;
  const close = () => {
    clearTimeout(timer);
    intro.classList.add('dive-out');
    document.body.classList.remove('intro-running');
    setTimeout(() => intro.remove(), 950);
  };
  $('#skipDive').onclick = close;
  const begin = () => {
    playDiveSplash();
    intro.classList.add('diving');
    timer = setTimeout(close, 5500);
  };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setTimeout(close, 700);
  else begin();
}
const layoutObserver = new MutationObserver(() => requestAnimationFrame(fitScreen));
layoutObserver.observe(app, { childList: true, subtree: true });
document.addEventListener(
  'load',
  e => {
    if (e.target instanceof HTMLImageElement) fitScreen();
  },
  true
);
installOceanChrome();
updateSound();
window.removeEventListener('hashchange', oldRender);
window.addEventListener('hashchange', render);
window.addEventListener('resize', fitScreen);
render();
showDiveOpening();
