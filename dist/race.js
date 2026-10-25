/* Shark Race (24 October 2026): a just-for-fun reward with a little practice inside.
 *
 * - Four tracks, each a real shark habitat. Sunny Lagoon is open; the others unlock with
 *   pearls (50, 100, 150), which he earns in learning adventures. (Until 26 Oct pearls bought
 *   cinema videos; the cinema was dropped and the race took its place.)
 * - Any of the five friends can race. Tap a lane (or swipe) to move between three lanes.
 * - Speed shells: swim through the shell that matches the clue for a burst of speed.
 *   Clues match the lessons: first sounds, numbers, digraphs and tricky words.
 * - Up to 3 pearls per race (the same as other extras), so racing never replaces learning.
 * - Every race ends with a sourced fact about the shark raced, from the encyclopedia.
 * - Results are practice play, not curriculum evidence.
 */

const raceTracks = [
  {
    id: 'lagoon',
    name: 'Sunny Lagoon',
    unlockAt: 0,
    gate: 'first-sound',
    helper: 'willa',
    obstacle: null,
    rival: [1.0, 0.9],
    fact: {
      shark: 'hammerhead',
      text: 'Young hammerhead sharks often grow up in shallow, sheltered water called nursery areas, a bit like this lagoon.'
    }
  },
  {
    id: 'reef',
    name: 'Coral Reef',
    unlockAt: 50,
    gate: 'number',
    helper: 'tiggy',
    obstacle: 'coral',
    rival: [1.02, 0.92],
    fact: {
      shark: 'epaulette',
      text: 'The epaulette shark lives on Australia’s Great Barrier Reef. It can bend its body and use its fins to walk along the bottom!'
    }
  },
  {
    id: 'ocean',
    name: 'Open Ocean',
    unlockAt: 100,
    gate: 'digraph',
    helper: 'willa',
    obstacle: 'jelly',
    rival: [1.03, 0.94],
    fact: {
      shark: 'white',
      text: 'A great white shark has a dark back and a light belly. This is called countershading, and it helps it blend in.'
    }
  },
  {
    id: 'trench',
    name: 'Deep Trench',
    unlockAt: 150,
    gate: 'tricky',
    helper: 'willa',
    obstacle: 'rock',
    rival: [1.04, 0.95],
    fact: {
      shark: 'goblin',
      text: 'Goblin sharks live in deep water. Their jaws can shoot forwards quickly to grab fish and squid.'
    }
  }
];
const racers = {
  milo: { name: 'Milo', book: 'megalodon', image: 'assets/milo-3d.webp' },
  willa: { name: 'Willa', book: 'whale', image: 'assets/crew-willa.webp' },
  tiggy: { name: 'Tiggy', book: 'tiger', image: 'assets/crew-tiggy.webp' },
  gizmo: { name: 'Gizmo', book: 'goblin', image: 'assets/crew-gizmo.webp' },
  dash: { name: 'Dash', book: 'mako', image: 'assets/crew-dash.webp' }
};
const RACE = {
  length: 10, // in screen widths
  speed: 0.18, // screen widths per second (slowed 25 Oct so Haytham has time to think)
  thinkZone: 0.9, // before each speed-shell gate everyone swims slowly…
  thinkSpeed: 0.6, // …at this fraction of normal speed
  boost: 1.65,
  boostTime: 2.6,
  bump: 0.55,
  bumpTime: 0.9,
  gates: [2.1, 4.1, 6.1, 8.1],
  pearls: [1.2, 5.0, 7.2],
  obstacles: [1.7, 3.2, 3.6, 5.6, 6.7, 7.7, 8.8],
  maxPearls: 3,
  lanes: 3
};

// ---------------------------------------------------------------- clue banks
const raceClueBanks = {
  'first-sound': [
    ['sun', 's', ['s', 'm', 't']],
    ['map', 'm', ['n', 'm', 's']],
    ['fish', 'f', ['f', 'h', 'c']],
    ['net', 'n', ['m', 't', 'n']],
    ['hat', 'h', ['h', 'n', 'a']],
    ['cup', 'c', ['p', 'c', 's']],
    ['bee', 'b', ['d', 'b', 'p']],
    ['duck', 'd', ['b', 't', 'd']]
  ],
  digraph: [
    ['ship', 'sh', ['sh', 'ch', 's']],
    ['chip', 'ch', ['sh', 'th', 'ch']],
    ['sheep', 'sh', ['ch', 'sh', 'ee']],
    ['moon', 'oo', ['ee', 'oo', 'ai']],
    ['bee', 'ee', ['ee', 'oo', 'ai']],
    ['rain', 'ai', ['oo', 'ai', 'ee']],
    ['duck', 'ck', ['ck', 'ch', 'sh']],
    ['shell', 'sh', ['th', 'sh', 'ch']]
  ],
  tricky: [
    ['the', ['the', 'he', 'she']],
    ['she', ['he', 'she', 'we']],
    ['was', ['saw', 'was', 'we']],
    ['said', ['sad', 'said', 'sand']],
    ['you', ['your', 'yes', 'you']],
    ['to', ['to', 'do', 'go']],
    ['I', ['it', 'I', 'is']],
    ['he', ['he', 'me', 'be']]
  ]
};
function raceClue(track, index, seed) {
  if (track.gate === 'number') {
    const n = [4, 7, 3, 9, 6, 8, 5, 10][(seed + index * 3) % 8];
    const options = [n, n + 1, n - 1].map(String);
    return {
      answer: String(n),
      options: rotate(options, seed + index),
      cue: `<div class="race-cue-frame">${tenFrame(n, 'counter')}</div>`,
      say: 'How many? Find the number!'
    };
  }
  const bank = raceClueBanks[track.gate],
    item = bank[(seed + index * 3) % bank.length];
  if (track.gate === 'tricky')
    return {
      answer: item[0],
      options: rotate(item[1], seed + index),
      cue: '<div class="race-cue-ear" aria-hidden="true">♫</div>',
      say: 'Find the word ' + item[0] + '!'
    };
  return {
    answer: item[1],
    options: rotate(item[2], seed + index),
    cue: readingArt(item[0]),
    say:
      track.gate === 'digraph'
        ? item[0] + '! Find the sound in ' + item[0] + '.'
        : item[0] + '! Find the first sound.'
  };
}
function rotate(list, by) {
  const k = ((by % list.length) + list.length) % list.length;
  return [...list.slice(k), ...list.slice(0, k)];
}

// ---------------------------------------------------------------- progress and unlocking
function learningAdventuresDone() {
  return (state.completed || []).length + (state.writingLessons || []).length;
}
// Pearls unlock tracks (26 Oct, parent's decision, replacing the cinema): 50, 100 and 150.
// Pearls only come from learning, so racing still follows learning.
function trackUnlocked(track) {
  return (Number(state.xp) || 0) >= track.unlockAt;
}
function unlockedTrackCount() {
  return raceTracks.filter(trackUnlocked).length;
}
// Celebrate a newly opened track whenever learning progress is saved.
if (state.raceTracksOpen === undefined) state.raceTracksOpen = unlockedTrackCount();
const preRaceSave = save;
save = function () {
  preRaceSave();
  const open = unlockedTrackCount();
  if (state.raceTracksOpen === undefined) state.raceTracksOpen = open;
  else if (open > state.raceTracksOpen) {
    state.raceTracksOpen = open;
    preRaceSave();
    const track = raceTracks[open - 1];
    const badge = document.createElement('div');
    badge.className = 'video-unlocked race-unlocked';
    badge.setAttribute('role', 'status');
    badge.innerHTML = `<span aria-hidden="true">🏁</span><strong>New race track: ${track.name}!</strong>`;
    document.body.append(badge);
    setTimeout(() => badge.remove(), 3800);
    // Milo says it too (a recorded line), after the pearl sound settles.
    setTimeout(() => speak('A new race track is open!', { speaker: 'milo' }), 900);
  }
};

// ---------------------------------------------------------------- screens
function raceGame() {
  const [, trackId, racerId] = location.hash.slice(1).split('/');
  const track = raceTracks.find(t => t.id === trackId);
  stopRace();
  if (!track || !trackUnlocked(track)) return raceTrackPicker();
  if (!racers[racerId]) return raceRacerPicker(track);
  return raceStart(track, racerId);
}
function trackThumb(track) {
  return `<span class="race-thumb race-scene-${track.id}" aria-hidden="true"><i></i></span>`;
}
function raceTrackPicker() {
  const done = learningAdventuresDone();
  app.innerHTML = `<section class="race-picker"><span class="tag">SHARK RACE</span><h1>Choose a race track</h1><div class="race-track-cards">${raceTracks
    .map(track => {
      const open = trackUnlocked(track),
        have = Math.min(track.unlockAt, Number(state.xp) || 0),
        need = Math.max(0, track.unlockAt - have);
      // A locked track shows how full its pearl jar is: no reading needed.
      return `<button class="race-track-card ${open ? '' : 'locked'}" data-race-track="${track.id}" aria-label="${track.name}${open ? '' : ', locked. ' + need + ' more pearls to open it'}">${trackThumb(track)}<strong>${track.name}</strong>${open ? '' : `<span class="race-lock"><b aria-hidden="true">🔒</b><span class="race-pearl-jar" aria-hidden="true"><i style="width:${Math.round((have / track.unlockAt) * 100)}%"></i></span><small aria-hidden="true">${have} / ${track.unlockAt}</small></span>`}</button>`;
    })
    .join('')}</div></section>`;
  document.querySelectorAll('[data-race-track]').forEach(button => {
    const track = raceTracks.find(t => t.id === button.dataset.raceTrack);
    button.onclick = () => {
      if (trackUnlocked(track)) location.hash = 'race/' + track.id;
      else {
        // Locked: the jar fills with pearls from learning adventures.
        button.classList.remove('race-locked-nudge');
        void button.offsetWidth;
        button.classList.add('race-locked-nudge');
        speak('Let’s learn with our friends, then race!', { speaker: 'milo' });
      }
    };
    button.onpointerenter = e => {
      if (e.pointerType !== 'touch') speak(track.name, { speaker: 'dash' });
    };
  });
  helperSpeak('Shark race! Choose a race track, Haytham.');
  requestAnimationFrame(fitScreen);
}
function raceRacerPicker(track) {
  app.innerHTML = `<section class="race-picker"><span class="tag">${track.name.toUpperCase()}</span><h1>Who will race?</h1><div class="race-racer-cards">${Object.entries(
    racers
  )
    .map(
      ([key, r]) =>
        `<button class="race-racer-card" data-racer="${key}" aria-label="Race as ${r.name}"><img src="${r.image}" alt=""><strong>${r.name}</strong></button>`
    )
    .join('')}</div></section>`;
  document.querySelectorAll('[data-racer]').forEach(button => {
    const key = button.dataset.racer;
    button.onclick = () => (location.hash = `race/${track.id}/${key}`);
    button.onpointerenter = e => {
      if (e.pointerType !== 'touch') speak(racers[key].name, { speaker: key });
    };
  });
  helperSpeak('Who will race in ' + track.name + '?');
  requestAnimationFrame(fitScreen);
}

// ---------------------------------------------------------------- the race
let raceRun = null;
function stopRace() {
  if (!raceRun) return;
  cancelAnimationFrame(raceRun.frame);
  raceRun.timers.forEach(clearTimeout);
  window.removeEventListener('keydown', raceRun.onKey);
  document.removeEventListener('visibilitychange', raceRun.onVisibility);
  document.body.classList.remove('race-running');
  raceRun = null;
}
function raceStart(track, racerId) {
  const others = Object.keys(racers).filter(k => k !== racerId),
    seed = (state.races || []).length;
  const rivals = [others[seed % others.length], others[(seed + 2) % others.length]];
  app.innerHTML = `<section class="race-screen race-scene-${track.id}" aria-label="${track.name} race"><div class="race-floor" aria-hidden="true"></div><div class="race-progress" aria-hidden="true"><i class="race-finish-flag">🏁</i>${[racerId, ...rivals].map((k, i) => `<img class="race-marker ${i === 0 ? 'you' : ''}" data-marker="${i}" src="${racers[k].image}" alt="">`).join('')}</div><div class="race-pearls" aria-live="polite"><span>0</span>/${RACE.maxPearls}</div><div class="race-lanes">${[0, 1, 2].map(l => `<button class="race-lane" data-lane="${l}" aria-label="Swim to lane ${l + 1}"></button>`).join('')}<div class="race-world"></div><div class="race-cue" hidden></div><img class="race-shark" src="${racers[racerId].image}" alt="${racers[racerId].name}"></div><button id="racePause" class="race-pause" aria-label="Pause the race" hidden><span aria-hidden="true">❚❚</span> Pause</button><div class="race-start"><button id="raceGo" class="primary">Go! <span aria-hidden="true">🏁</span></button><p>Tap a lane to swim there. Swim through the right shell to go faster!</p></div></section>`;
  const run = {
    track,
    racerId,
    rivals,
    seed,
    lane: 1,
    distance: 0,
    rivalDistance: [0, 0],
    speed: RACE.speed,
    boostUntil: 0,
    bumpUntil: 0,
    time: 0,
    pearls: 0,
    shells: [],
    items: [],
    timers: [],
    frame: 0,
    finished: false,
    started: false
  };
  raceRun = run;
  run.items = buildRaceCourse(track, seed);
  const world = app.querySelector('.race-world');
  run.items.forEach(item => {
    if (item.type === 'gate') {
      item.el = document.createElement('div');
      item.el.className = 'race-gate';
      item.el.innerHTML = item.clue.options
        .map(
          (o, lane) =>
            `<span class="speed-shell" data-shell-lane="${lane}"><svg viewBox="0 0 140 110" aria-hidden="true"><path d="M70 101L15 61Q-1 13 39 12Q65-3 70 16Q91-4 110 13Q145 11 130 60Z" fill="currentColor"/><path d="M70 100V23M70 100L33 26M70 100L111 27" stroke="white" stroke-opacity=".35" stroke-width="3"/></svg><b>${o}</b></span>`
        )
        .join('');
    } else {
      item.el = document.createElement('div');
      item.el.className = 'race-item race-' + (item.type === 'pearl' ? 'pearl' : track.obstacle);
      item.el.dataset.lane = item.lane;
      item.el.innerHTML = item.type === 'pearl' ? '<i></i>' : raceObstacleArt(track.obstacle);
    }
    world.append(item.el);
  });
  const shark = app.querySelector('.race-shark');
  const moveTo = lane => {
    if (!raceRun || run.finished) return;
    run.lane = Math.max(0, Math.min(2, lane));
    shark.dataset.lane = run.lane;
  };
  moveTo(1);
  app
    .querySelectorAll('[data-lane]')
    .forEach(b => (b.onpointerdown = () => moveTo(+b.dataset.lane)));
  let touchY = null;
  const lanes = app.querySelector('.race-lanes');
  lanes.addEventListener('touchstart', e => (touchY = e.touches[0].clientY), { passive: true });
  lanes.addEventListener(
    'touchend',
    e => {
      if (touchY === null) return;
      const dy = e.changedTouches[0].clientY - touchY;
      if (Math.abs(dy) > 40) moveTo(run.lane + (dy > 0 ? 1 : -1));
      touchY = null;
    },
    { passive: true }
  );
  run.onKey = e => {
    if (e.key === 'ArrowUp') moveTo(run.lane - 1);
    if (e.key === 'ArrowDown') moveTo(run.lane + 1);
  };
  window.addEventListener('keydown', run.onKey);
  // Leaving the app pauses the race, so nothing is missed.
  run.onVisibility = () => {
    if (document.hidden && raceRun === run) pauseRace(run);
  };
  document.addEventListener('visibilitychange', run.onVisibility);
  $('#raceGo').onclick = () => beginRace(run);
  $('#racePause').onclick = () => pauseRace(run);
  helperSpeak(`${racers[racerId].name} is ready. Tap Go!`);
  renderRace(run);
}
// Pearls, speed-shell gates and (after the lagoon) gentle obstacles, never on top of each other.
function buildRaceCourse(track, seed) {
  const items = [];
  RACE.pearls.forEach((at, i) => items.push({ type: 'pearl', at, lane: (seed + i * 2) % 3 }));
  RACE.gates.forEach((at, i) =>
    items.push({ type: 'gate', at, clue: raceClue(track, i, seed), index: i })
  );
  if (track.obstacle)
    RACE.obstacles.forEach((at, i) => {
      if (
        RACE.gates.some(g => Math.abs(g - at) < 0.45) ||
        RACE.pearls.some(p => Math.abs(p - at) < 0.3)
      )
        return;
      items.push({ type: 'obstacle', at, lane: (seed + i) % 3 });
    });
  return items;
}
function raceObstacleArt(kind) {
  if (kind === 'coral')
    return '<svg viewBox="0 0 100 90" aria-hidden="true"><path d="M50 88V50M50 60L28 34M28 34V16M28 34L14 26M50 56L72 30M72 30V12M72 30L86 22M50 50V24" stroke="#e8836f" stroke-width="10" stroke-linecap="round" fill="none"/><path d="M26 88H74" stroke="#c96b5c" stroke-width="8" stroke-linecap="round"/></svg>';
  if (kind === 'jelly')
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M14 46Q14 8 50 8Q86 8 86 46Q70 40 50 46Q30 40 14 46Z" fill="#e7c6f2cc" stroke="#c49ad8" stroke-width="3"/><path d="M28 46Q22 66 32 92M44 46Q40 70 48 94M58 46Q62 70 54 94M72 46Q78 66 68 92" stroke="#c49ad8" stroke-width="4" fill="none" stroke-linecap="round"/></svg>';
  return '<svg viewBox="0 0 100 80" aria-hidden="true"><path d="M8 76Q4 44 26 32Q36 10 60 16Q88 18 94 48Q98 72 84 76Z" fill="#46535c" stroke="#2c363c" stroke-width="3"/><circle cx="66" cy="34" r="4" fill="#7ff3e1"/><circle cx="34" cy="50" r="3" fill="#7ff3e1"/></svg>';
}
function beginRace(run) {
  if (run.started) return;
  run.started = true;
  $('.race-start')?.remove();
  document.body.classList.add('race-running');
  stopSpeech();
  const count = ['3', '2', '1', 'Go!'];
  const banner = document.createElement('div');
  banner.className = 'race-countdown';
  app.querySelector('.race-screen').append(banner);
  count.forEach((word, i) =>
    run.timers.push(
      setTimeout(() => {
        if (raceRun !== run) return;
        banner.textContent = word;
        banner.classList.remove('pop');
        void banner.offsetWidth;
        banner.classList.add('pop');
        speak(word === 'Go!' ? 'Go!' : word, { speaker: run.racerId });
        if (word === 'Go!') {
          run.timers.push(setTimeout(() => banner.remove(), 700));
          run.last = null;
          run.running = true;
          const pause = $('#racePause');
          if (pause) pause.hidden = false;
          run.frame = requestAnimationFrame(t => raceTick(run, t));
        }
      }, i * 800)
    )
  );
}
// Pause: everything freezes, the clue stays up so Haytham can have a think.
function pauseRace(run) {
  if (!run || raceRun !== run || !run.running || run.finished || run.paused) return;
  run.paused = true;
  cancelAnimationFrame(run.frame);
  stopSpeech();
  const screen = app.querySelector('.race-screen');
  screen?.classList.add('paused');
  const pauseButton = $('#racePause');
  if (pauseButton) pauseButton.hidden = true;
  const card = document.createElement('div');
  card.className = 'race-paused-card';
  card.innerHTML =
    '<div><strong>Paused</strong><p>Have a think. Take your time!</p><button id="raceResume" class="primary">▶ Keep swimming</button><button id="raceQuit">Race tracks</button></div>';
  screen?.append(card);
  $('#raceResume').onclick = () => resumeRace(run);
  $('#raceQuit').onclick = () => (location.hash = 'race');
  speak('Paused. Have a think, then tap Keep swimming!', { speaker: run.racerId });
}
function resumeRace(run) {
  if (!run.paused || raceRun !== run) return;
  stopSpeech();
  app.querySelector('.race-paused-card')?.remove();
  const banner = document.createElement('div');
  banner.className = 'race-countdown pop';
  banner.textContent = 'Ready…';
  app.querySelector('.race-screen')?.append(banner);
  run.timers.push(
    setTimeout(() => {
      if (raceRun !== run) return;
      banner.textContent = 'Go!';
      banner.classList.remove('pop');
      void banner.offsetWidth;
      banner.classList.add('pop');
      speak('Go!', { speaker: run.racerId });
      app.querySelector('.race-screen')?.classList.remove('paused');
      run.paused = false;
      run.last = null;
      const pauseButton = $('#racePause');
      if (pauseButton) pauseButton.hidden = false;
      run.frame = requestAnimationFrame(t => raceTick(run, t));
      run.timers.push(setTimeout(() => banner.remove(), 700));
    }, 900)
  );
}
// Calm water before each gate: the whole race slows so there's time to read the clue and choose.
function inThinkZone(run) {
  return run.items.some(
    i => i.type === 'gate' && !i.done && i.at - run.distance < RACE.thinkZone && i.at > run.distance
  );
}
function currentSpeed(run) {
  let v = RACE.speed;
  if (inThinkZone(run)) v *= RACE.thinkSpeed;
  if (run.time < run.boostUntil) v *= RACE.boost;
  if (run.time < run.bumpUntil) v *= RACE.bump;
  return v;
}
function raceTick(run, now) {
  if (raceRun !== run || run.finished || run.paused) return;
  const dt = run.last ? Math.min(0.05, (now - run.last) / 1000) : 0;
  run.last = now;
  stepRace(run, dt);
  renderRace(run);
  if (run.distance >= RACE.length) return finishRace(run);
  run.frame = requestAnimationFrame(t => raceTick(run, t));
}
// Pure simulation step (no DOM), so it can be tested.
function stepRace(run, dt) {
  run.time += dt;
  run.distance += currentSpeed(run) * dt;
  run.rivalDistance = run.rivalDistance.map((d, i) =>
    Math.min(
      RACE.length,
      d + RACE.speed * (inThinkZone(run) ? RACE.thinkSpeed : 1) * run.track.rival[i] * dt
    )
  );
  for (const item of run.items) {
    if (item.done || item.at > run.distance) continue;
    item.done = true;
    if (item.type === 'pearl' && item.lane === run.lane && run.pearls < RACE.maxPearls) {
      run.pearls++;
      raceEvent(run, 'pearl', item);
    } else if (item.type === 'obstacle' && item.lane === run.lane) {
      run.bumpUntil = run.time + RACE.bumpTime;
      raceEvent(run, 'bump', item);
    } else if (item.type === 'gate') {
      const chosen = item.clue.options[run.lane],
        right = chosen === item.clue.answer;
      run.shells.push({ answer: item.clue.answer, chosen, right });
      if (right) run.boostUntil = run.time + RACE.boostTime;
      raceEvent(run, right ? 'boost' : 'miss', item);
    } else raceEvent(run, 'pass', item);
  }
}
function raceEvent(run, kind, item) {
  if (!item.el) return;
  item.el.classList.add('ev-' + kind);
  if (kind === 'pearl') {
    const count = app.querySelector('.race-pearls span');
    if (count) count.textContent = run.pearls;
    playRewardChime?.();
  }
  if (kind === 'boost') {
    item.el.querySelector(`[data-shell-lane="${run.lane}"]`)?.classList.add('shell-right');
    app.querySelector('.race-shark')?.classList.add('boosting');
    run.timers.push(
      setTimeout(
        () => app.querySelector('.race-shark')?.classList.remove('boosting'),
        RACE.boostTime * 1000
      )
    );
    speak(['Zoom!', 'Super speed!', 'Whoosh!', 'Fin-tastic!'][item.index % 4], {
      speaker: run.racerId
    });
    playRewardChime?.();
  }
  if (kind === 'miss') {
    item.el.querySelector(`[data-shell-lane="${run.lane}"]`)?.classList.add('shell-tried');
    item.el
      .querySelector(`[data-shell-lane="${item.clue.options.indexOf(item.clue.answer)}"]`)
      ?.classList.add('shell-right');
    speak(
      ['Nice try!', 'Good try!', 'Keep swimming!'][item.index % 3] + ' Look for the next shell.',
      {
        speaker: run.track.helper
      }
    );
  }
  if (kind === 'bump') app.querySelector('.race-shark')?.classList.add('bumped');
  if (kind === 'bump')
    run.timers.push(
      setTimeout(() => app.querySelector('.race-shark')?.classList.remove('bumped'), 700)
    );
}
function renderRace(run) {
  const screen = app.querySelector('.race-screen');
  if (!screen) return;
  const view = run.distance;
  screen.style.setProperty('--race-scroll', String(view));
  for (const item of run.items) {
    const x = (item.at - view) * 100 + 22; // percent of the lane width; shark sits at 22%
    if (item.el) {
      item.el.style.left = x + '%';
      item.el.hidden = x < -25 || x > 125;
    }
    if (item.type === 'gate' && !item.cued && x < 175 && x > 22) {
      item.cued = true;
      const cue = app.querySelector('.race-cue');
      cue.innerHTML = item.clue.cue;
      cue.hidden = false;
      speak(item.clue.say, { speaker: run.track.helper });
      run.cueGate = item;
    }
    if (item === run.cueGate && item.done && x < 14) {
      app.querySelector('.race-cue').hidden = true;
      run.cueGate = null;
    }
  }
  const pct = d => Math.min(100, (d / RACE.length) * 100);
  screen.querySelectorAll('[data-marker]').forEach(marker => {
    const i = +marker.dataset.marker;
    marker.style.left = `calc(${pct(i === 0 ? run.distance : run.rivalDistance[i - 1])}% - 22px)`;
  });
}
function racePlace(run) {
  return 1 + run.rivalDistance.filter(d => d >= RACE.length).length;
}
function finishRace(run) {
  run.finished = true;
  cancelAnimationFrame(run.frame);
  const pauseButton = $('#racePause');
  if (pauseButton) pauseButton.hidden = true;
  document.body.classList.remove('race-running');
  const place = racePlace(run),
    right = run.shells.filter(s => s.right).length;
  state.races = state.races || [];
  state.races.push({
    track: run.track.id,
    racer: run.racerId,
    place,
    pearls: run.pearls,
    shells: run.shells,
    at: new Date().toISOString()
  });
  state.xp += run.pearls;
  save();
  const book = sharkBook.find(s => s.id === racers[run.racerId].book),
    fact = book.facts[(state.races.length - 1) % book.facts.length],
    trackBook = sharkBook.find(s => s.id === run.track.fact.shark);
  const medal = ['🥇', '🥈', '🥉'][place - 1];
  const words = ['first', 'second', 'third'][place - 1];
  const finishLine = `${racers[run.racerId].name} came ${words}! You caught ${run.pearls} ${run.pearls === 1 ? 'pearl' : 'pearls'} and found ${right} speed ${right === 1 ? 'shell' : 'shells'}.`;
  const overlay = document.createElement('div');
  overlay.className = 'race-results';
  overlay.innerHTML = `<div class="race-result-card"><div class="race-medal" aria-hidden="true">${medal}</div><h2>${racers[run.racerId].name} came ${words}!</h2><div class="race-tally"><span><i class="tally-pearl"></i>${run.pearls}</span><span><i class="tally-shell"></i>${right} / ${run.shells.length}</span></div><div class="race-fact"><img src="assets/${book.image || 'visual-megalodon.jpg'}" alt="${book.name}"><div><strong>${book.name}${book.group === 'prehistoric' ? ' · extinct' : ''}</strong><p>${fact[1]}</p><button id="raceFactListen">♫ Hear the fact</button></div></div><p class="race-track-fact"><b>${run.track.name}:</b> ${run.track.fact.text}</p><div class="race-actions"><button id="raceAgain" class="primary">Race again</button><button id="raceTracks">Race tracks</button></div></div>`;
  app.querySelector('.race-screen').append(overlay);
  const factText = book.name + '. ' + fact[1];
  $('#raceFactListen').onclick = () => speak(factText, { speaker: 'gizmo' });
  $('#raceAgain').onclick = () => raceGame();
  $('#raceTracks').onclick = () => (location.hash = 'race');
  screenNarration = finishLine + ' ' + factText;
  speak(finishLine + ' Here’s a real shark fact. ' + factText, { speaker: 'gizmo' });
  if (typeof setMiloMood === 'function') setMiloMood('highfive');
  if (trackBook) overlay.dataset.trackShark = trackBook.id;
}
function raceSummary() {
  const races = state.races || [];
  if (!races.length)
    return '<p class="muted">The shark race is a just-for-fun reward. Tracks open as learning adventures are finished. No races yet.</p>';
  const shells = races.flatMap(r => r.shells || []);
  return `<p>${races.length} ${races.length === 1 ? 'race' : 'races'} · ${unlockedTrackCount()} of ${raceTracks.length} tracks open · speed shells: ${shells.filter(s => s.right).length} of ${shells.length} matched</p><p class="muted">Speed shells use the same first sounds, numbers, digraphs and tricky words as the lessons. This is play, not assessment. Each race gives at most ${RACE.maxPearls} pearls.</p>`;
}

// ---------------------------------------------------------------- ways in
// The race lives where the cinema shell was (bottom left, every screen). 26 Oct: the cinema is gone.
function installRaceEntry() {
  const buoy = document.getElementById?.('cinemaShell') || document.createElement('a');
  buoy.id = 'raceBuoy';
  buoy.className = 'race-corner';
  buoy.href = '#race';
  buoy.removeAttribute?.('title');
  buoy.setAttribute('aria-label', 'Shark race');
  buoy.innerHTML =
    '<svg viewBox="0 0 90 90" aria-hidden="true"><path d="M45 8V46" stroke="#3b4b54" stroke-width="4"/><path d="M47 9H79V31H47Z" fill="#fff"/><path d="M47 9H55V16H47ZM63 9H71V16H63ZM55 16H63V23H55ZM71 16H79V23H71ZM47 23H55V31H47ZM63 23H71V31H63Z" fill="#26343c"/><path d="M14 58Q45 38 76 58L70 76Q45 86 20 76Z" fill="#f08a3c" stroke="#b5612b" stroke-width="3"/><path d="M18 64Q45 52 72 64" stroke="#fff" stroke-width="6" fill="none"/></svg><span>Race</span>';
  if (!buoy.isConnected) document.body.append(buoy);
}
installRaceEntry();
const preRaceLibrary = libraryPage;
libraryPage = function () {
  preRaceLibrary();
  const grid = app.querySelector('.library-choices');
  if (!grid || grid.querySelector('[data-library-route="race"]')) return;
  grid.insertAdjacentHTML(
    'beforeend',
    '<button data-library-route="race"><span class="library-picture race-library-picture"><span class="race-thumb race-scene-lagoon"><i></i></span></span>Shark race</button>'
  );
  grid.querySelector('[data-library-route="race"]').onclick = () => (location.hash = 'race');
};
window.addEventListener('hashchange', () => {
  if (!location.hash.startsWith('#race')) stopRace();
});
// If the app was opened straight onto a race page, draw it now that the race code exists.
if (location.hash.startsWith('#race')) render();
