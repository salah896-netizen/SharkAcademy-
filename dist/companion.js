let miloMoodTimer = null,
  miloBubbleTimer = null,
  miloTouches = 0;
let miloActorCount = 0,
  miloMessage = 'I’m right here with you, Haytham.';
function miloActor() {
  const id = 'milo-' + ++miloActorCount;
  return `<svg class="milo-actor" viewBox="0 0 1536 1024" aria-hidden="true"><defs><clipPath id="${id}-body"><path d="M0 0H1180V1024H0Z"/></clipPath><clipPath id="${id}-tail"><path d="M1178 0H1536V1024H1178Z"/></clipPath><clipPath id="${id}-pectoral"><path d="M690 607Q760 595 872 705L1168 953Q940 924 763 745Z"/></clipPath><mask id="${id}-body-fin"><rect width="1536" height="1024" fill="white"/><path d="M690 607Q760 595 872 705L1168 953Q940 924 763 745Z" fill="black"/></mask><clipPath id="${id}-jaw"><path d="M130 550Q280 600 432 491L460 575Q350 710 175 637Z"/></clipPath></defs><image href="assets/milo-3d.webp" width="1536" height="1024" clip-path="url(#${id}-body)" mask="url(#${id}-body-fin)"/><g class="milo-original-fin"><image href="assets/milo-3d.webp" width="1536" height="1024" clip-path="url(#${id}-pectoral)"/></g><g class="milo-tail"><image href="assets/milo-3d.webp" width="1536" height="1024" clip-path="url(#${id}-tail)"/></g><g class="milo-jaw"><image href="assets/milo-3d.webp" width="1536" height="1024" clip-path="url(#${id}-jaw)"/></g><g class="milo-monocle"><circle cx="350" cy="407" r="47" fill="#8ad7e8" fill-opacity=".08" stroke="#d8af55" stroke-width="9"/><circle cx="350" cy="407" r="39" fill="none" stroke="#fff0ad" stroke-width="2"/><path d="M318 394Q324 374 344 370" fill="none" stroke="white" stroke-opacity=".75" stroke-width="5" stroke-linecap="round"/><path d="M392 427Q470 455 431 526Q409 572 479 611" fill="none" stroke="#d0a04d" stroke-width="6" stroke-linecap="round"/></g><g class="milo-high-fin"><path d="M675 630Q690 440 878 289Q940 422 828 615L730 701Z" fill="#6b8795" stroke="#aac2c8" stroke-width="5"/><path d="M713 615Q765 459 867 328" fill="none" stroke="#c8dbdf" stroke-opacity=".35" stroke-width="8"/></g><g class="milo-sparkles" fill="#c9fff0"><path d="M1000 190l14 35 35 14-35 14-14 35-14-35-35-14 35-14Z"/><path d="M1130 290l8 20 20 8-20 8-8 20-8-20-20-8 20-8Z"/></g><path class="milo-mouth" d="M143 550Q280 591 425 500Q315 610 165 574Z" fill="#23383c"/><path class="milo-teeth" d="M155 552l12 10 6-5 15 9 7-5 15 9 8-6 15 7 9-8 16 6 8-8 15 3 8-9 14 1 7-10 15-2 5-10 14-4 5-10 13-6" fill="#f3ecdb"/></svg>`;
}
function updateMilo(message) {
  const host = $('#miloCompanion');
  if (!host) return;
  const route = (location.hash.slice(1) || 'home').split('/')[0];
  host.hidden = route === 'home';
  document.body.classList.toggle('has-companion', route !== 'home');
  const messages = {
    home: 'My reef friends are here to help, Haytham. I’m staying right here with you!',
    cinema: 'I’ve saved you a seat, Haytham. Let’s watch together when the films are ready.',
    museum:
      'I’m a megalodon too! I’m your make-believe friend. Let’s meet real sharks and learn about my prehistoric family.',
    expeditions:
      'Let’s take a Learning Adventure. I’ll be here to help, one little discovery at a time.',
    writing: 'I’m right here, Haytham. Start at the dot, take your time, and have a go.',
    stories: 'Let’s read together! Tap a word for help, or listen while you follow along.',
    collection: 'Look at everything you’ve discovered! I’m proud of your practising.',
    play: 'Take your time, Haytham. We can work it out together.'
  };
  miloMessage = message || messages[route] || 'I’m right here with you, Haytham.';
  if (!host.querySelector('.companion-actor')) {
    host.innerHTML = `<button class="companion-actor" aria-label="Play with Milo">${miloActor()}</button><div class="companion-copy"><span>MILO SAYS</span><p id="miloMessage"></p></div><button id="miloHelp" class="quiet" aria-label="Ask Milo for help">♫</button><button class="fin-five-target" id="finFive" aria-label="Give Milo a fin high five"><svg class="fin-five-art" viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="ffBubble" cx="38%" cy="30%" r="75%"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset=".45" stop-color="#bff0ea" stop-opacity=".85"/><stop offset="1" stop-color="#4fb3c4" stop-opacity=".9"/></radialGradient><linearGradient id="ffFin" x1="0" y1="1" x2=".8" y2="0"><stop offset="0" stop-color="#3f5f70"/><stop offset=".55" stop-color="#6f93a5"/><stop offset="1" stop-color="#b9d3dc"/></linearGradient><radialGradient id="ffGlow" cx="50%" cy="50%" r="50%"><stop offset=".6" stop-color="#fff6c8" stop-opacity="0"/><stop offset="1" stop-color="#fff6c8" stop-opacity=".9"/></radialGradient></defs><circle class="ff-ring" cx="50" cy="50" r="47" fill="none" stroke="#fff6c8" stroke-width="3"/><circle cx="50" cy="50" r="43" fill="url(#ffBubble)" stroke="#e9fffb" stroke-width="2.5"/><ellipse cx="50" cy="80" rx="22" ry="5" fill="#1d5a68" opacity=".25"/><g class="ff-fin"><path d="M26 78 C30 58 44 36 70 18 C66 30 63 42 66 56 C67 62 70 66 74 68 C62 68 50 72 44 80 Z" fill="url(#ffFin)" stroke="#2c4a58" stroke-width="2.2" stroke-linejoin="round"/><path d="M33 74 C38 58 50 42 66 26" fill="none" stroke="#e6f3f6" stroke-opacity=".7" stroke-width="3.5" stroke-linecap="round"/><path d="M46 76 C54 70 62 68 72 68" fill="none" stroke="#1f3a47" stroke-opacity=".35" stroke-width="2"/><path d="M26 78 C34 76 40 77 44 80" fill="#e8eef0" opacity=".85"/></g><path d="M27 31 Q34 22 44 20" fill="none" stroke="#fff" stroke-opacity=".9" stroke-width="4" stroke-linecap="round"/><g class="ff-stars" fill="#ffe27a" stroke="#fff6c8" stroke-width="1"><path d="M76 20l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"/><path d="M82 52l2 4 4 2-4 2-2 4-2-4-4-2 4-2Z"/><path d="M18 50l2 4 4 2-4 2-2 4-2-4-4-2 4-2Z"/></g></svg></button><span class="milo-touch-hint">Tap Milo</span>`;
    host.querySelector('.companion-actor').onclick = () => touchMilo();
    $('#miloHelp').onclick = () => miloHelp();
    $('#finFive').onclick = () => giveMiloFive();
  }
  $('#miloMessage').textContent = miloMessage;
  showMiloMessage();
  host.setAttribute('aria-label', 'Milo, your learning companion');
  updateMiloDock();
  syncCrew();
}
function miloHelp() {
  if (game?.mission && location.hash === '#play') {
    readingMissionHelp();
    return;
  }
  if (storyPlaying) stopStory();
  if (game && location.hash === '#play' && !game.answered) {
    game.assisted = true;
    const hint = game.items[game.index].hint;
    updateMilo('Let’s try together. ' + hint.replaceAll('🐟', 'fish'));
    speak(miloMessage);
  } else speak(miloMessage);
}
function encourage(text, mood) {
  updateMilo(text);
  reactCrew(
    /good try|try again|try together|another go|look at the facts/i.test(text)
      ? 'thinking'
      : 'happy'
  );
  setMiloMood(
    mood ||
      (/good try|try again|try together|another go|look at the facts/i.test(text)
        ? 'retry'
        : 'celebrate')
  );
  speak(text, { speaker: (typeof crewForRoute === 'function' && crewForRoute()) || 'milo' });
}
let speechSequence = 0;
function stopSpeech() {
  speechSequence++;
  stopRecordedVoice();
  if (typeof stopVoiceLine === 'function') stopVoiceLine();
  document.body.classList.remove('milo-speaking', 'helper-speaking');
  fadeMusic(musicCurrent, musicTarget(), 350);
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}
// Everything said in the app goes through speak(). Later files can step in first by adding a layer
// to the front of this list (answers.js remembers the question; calm-scenes.js holds narration
// until the lesson journey arrives). Each layer gets (text, options, next) and calls next() to carry on.
const speakLayers = [];
function speak(t, options = {}) {
  let i = 0;
  const next = (text, opts) => (i < speakLayers.length ? speakLayers[i++](text, opts, next) : speakNow(text, opts));
  return next(t, options);
}
// Say it now: a recorded line in the character's voice if there is one, otherwise the device voice.
function speakNow(t, options = {}) {
  stopSpeech();
  if (!state.voice) {
    options.unavailable?.();
    return;
  }
  // Prefer a recorded line in the character's own voice; the device voice is the fallback.
  // If this friend hasn't recorded the line, another friend's recording beats the iPad voice.
  const found =
    typeof voiceClipsForAnyone === 'function'
      ? voiceClipsForAnyone(t, options.speaker || 'milo')
      : null;
  const clips = found?.files;
  if (found && found.speaker !== (options.speaker || 'milo'))
    options = { ...options, speaker: found.speaker };
  if (clips) {
    playVoiceClips(clips, t, options, () => speakWithDevice(t, options));
    return;
  }
  if (typeof logVoiceGap === 'function') logVoiceGap('iPad voice', options.speaker || 'milo', t);
  speakWithDevice(t, options);
}
function speakWithDevice(t, options = {}) {
  if (!('speechSynthesis' in window)) {
    options.unavailable?.();
    return;
  }
  const token = speechSequence,
    u = new SpeechSynthesisUtterance(t);
  u.voice = chosenVoice();
  u.lang = u.voice?.lang || 'en-AU';
  u.rate = 0.94;
  u.pitch = 1;
  u.onstart = () => {
    if (token !== speechSequence) return;
    document.body.dataset.speaker = options.speaker || 'milo';
    document.body.classList.add(
      options.speaker && options.speaker !== 'milo' ? 'helper-speaking' : 'milo-speaking'
    );
    options.start?.();
  };
  u.onboundary = e => {
    if (token === speechSequence) options.boundary?.(e.charIndex, e.charLength);
  };
  u.onend = () => {
    if (token !== speechSequence) return;
    document.body.classList.remove('milo-speaking', 'helper-speaking');
    options.end?.();
  };
  u.onerror = () => {
    if (token !== speechSequence) return;
    document.body.classList.remove('milo-speaking', 'helper-speaking');
    options.unavailable?.();
  };
  speechSynthesis.speak(u);
}

function showMiloMessage() {
  const host = $('#miloCompanion');
  if (!host) return;
  host.classList.add('show-message');
  clearTimeout(miloBubbleTimer);
  miloBubbleTimer = setTimeout(() => {
    if (!document.body.classList.contains('milo-speaking')) host.classList.remove('show-message');
  }, 9000);
}
function setMiloMood(mood = 'idle', duration = 12000) {
  clearTimeout(miloMoodTimer);
  document.body.dataset.miloMood = mood;
  if (mood !== 'idle')
    miloMoodTimer = setTimeout(() => {
      document.body.dataset.miloMood = 'idle';
    }, duration);
}
function giveMiloFive() {
  stopStory();
  setMiloMood('highfive', 10000);
  updateMilo('Fin five, Haytham! We make a great team.');
  speak(miloMessage);
  const button = $('#finFive');
  if (button) {
    button.classList.remove('five-pop');
    void button.offsetWidth;
    button.classList.add('five-pop');
    const splash = document.createElement('span');
    splash.className = 'fin-five-splash';
    splash.innerHTML = '<i></i><i></i><i></i><i></i><i></i><i></i><b></b>';
    button.appendChild(splash);
    setTimeout(() => splash.remove(), 900);
  }
}
function touchMilo() {
  stopStory();
  miloTouches++;
  if (['celebrate', 'highfive'].includes(document.body.dataset.miloMood) || miloTouches % 3 === 1) {
    giveMiloFive();
    return;
  }
  if (miloTouches % 3 === 2) {
    setMiloMood('spin', 2300);
    updateMilo('Whoosh! A little ocean twirl, just for you!');
  } else {
    setMiloMood('peek', 2600);
    updateMilo('Hello, Haytham! I’m happy to be here with you.');
  }
  speak(miloMessage);
}
