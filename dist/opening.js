/* Tap to dive (24 October 2026; overhauled 29 October). The first open of the day is a little
 * adventure in five beats, about six seconds, all painted (styles and notes in opening.css):
 * Milo waits at a sunrise surface beside a glowing pearl, a painted hand showing the tap. The tap
 * unlocks sound for the session (iPads block audio until a tap) and Milo counts 3-2-1 in his own
 * recorded voice, then SPLASH, and he leads Haytham down past a turtle, a shoal and a jellyfish
 * while a depth gauge counts the metres. On the reef the tooth rises, the friends wiggle hello and
 * a first-dive pearl drops into the treasure chest. Then Milo's personal hello and Gizmo's shark
 * of the day. Any tap after the first skips to the reef; later opens the same day go straight
 * there. Reduced motion uses a simple fade.
 */

function openingTodayKey() {
  return typeof dayKey === 'function' ? dayKey() : new Date().toDateString();
}
function sharkOfTheDay(date = new Date()) {
  const pool = sharkBook.filter(s => s.facts?.length);
  const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
  const shark = pool[day % pool.length],
    fact = shark.facts[Math.floor(day / pool.length) % shark.facts.length];
  return {
    id: shark.id,
    name: shark.name,
    image: 'assets/' + (shark.image || 'visual-megalodon.jpg'),
    fact: fact[1],
    extinct: shark.group === 'prehistoric'
  };
}
// Milo's hello: time of day, then the most useful piece of news.
function openingGreeting(now = new Date()) {
  const hour = now.getHours(),
    parts = [
      hour < 12
        ? 'Good morning, Haytham!'
        : hour < 17
          ? 'Good afternoon, Haytham!'
          : 'Good evening, Haytham!'
    ];
  const tracks = typeof unlockedTrackCount === 'function' ? unlockedTrackCount() : 0;
  if (state.openingTracks !== undefined && tracks > state.openingTracks)
    parts.push('A new race track is open!');
  const due =
    typeof pathSkills !== 'undefined' ? pathSkills.find(s => skillStatus(s) === 'review') : null;
  if (due)
    parts.push(`${reefCrew[pathHelper[due.subject]]?.name || 'Milo'} has a quick review for you.`);
  else if (typeof pathNeedsCheck === 'function' && pathNeedsCheck())
    parts.push('Let’s dive into our first adventure!');
  else parts.push('Let’s do three adventures today!');
  return parts.join(' ');
}

// ---------------------------------------------------------------- painted pieces
function divePearlArt(id = 'dp') {
  return `<svg viewBox="0 0 120 120" aria-hidden="true"><defs><radialGradient id="${id}a" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#f6eefa"/><stop offset=".8" stop-color="#d9d3ec"/><stop offset="1" stop-color="#b7b4d6"/></radialGradient><radialGradient id="${id}g" cx=".5" cy=".5" r=".5"><stop offset=".55" stop-color="#fff6c8" stop-opacity=".9"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></radialGradient><linearGradient id="${id}i" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#ffc8e0" stop-opacity=".55"/><stop offset=".5" stop-color="#c8f0ff" stop-opacity="0"/><stop offset="1" stop-color="#d8ffe8" stop-opacity=".5"/></linearGradient></defs><circle class="glow" cx="60" cy="60" r="58" fill="url(#${id}g)"/><circle cx="60" cy="60" r="36" fill="url(#${id}a)" stroke="#a9a3cc" stroke-width="2"/><circle cx="60" cy="60" r="36" fill="url(#${id}i)"/><ellipse cx="48" cy="46" rx="11" ry="7" fill="#fff" opacity=".9" transform="rotate(-30 48 46)"/><path d="M96 22l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z M24 88l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#fff6c8"/></svg>`;
}
function diveHandArt() {
  return '<svg viewBox="0 0 80 90" aria-hidden="true"><defs><radialGradient id="dhH" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#ffe2c4"/><stop offset=".6" stop-color="#f4c49a"/><stop offset="1" stop-color="#d99a6c"/></radialGradient></defs><path d="M24 40V12Q24 4 31 4Q38 4 38 12V36Q40 30 46 30Q52 30 53 37Q55 32 61 33Q67 35 67 42Q69 38 74 40Q79 43 78 50V64Q78 84 56 86H44Q30 86 22 74L8 54Q4 48 9 44Q14 41 19 46L24 52Z" fill="url(#dhH)" stroke="#b07448" stroke-width="2.4" stroke-linejoin="round"/><path d="M38 40V50M53 40V50M67 46V54" stroke="#b07448" stroke-width="2" stroke-linecap="round" opacity=".6"/><path d="M28 10Q30 7 33 8" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></svg>';
}
function diveSkyArt() {
  const cloud = (x, y, k) =>
    `<g transform="translate(${x} ${y}) scale(${k})"><ellipse cx="0" cy="18" rx="62" ry="16" fill="#e7eef5"/><circle cx="-30" cy="6" r="22" fill="url(#dsC)"/><circle cx="2" cy="-6" r="30" fill="url(#dsC)"/><circle cx="34" cy="6" r="22" fill="url(#dsC)"/><ellipse cx="0" cy="16" rx="58" ry="12" fill="url(#dsC)"/></g>`;
  return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><defs><linearGradient id="dsS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ec3e6"/><stop offset=".55" stop-color="#bfe3ef"/><stop offset=".85" stop-color="#ffe9c7"/><stop offset="1" stop-color="#ffd9a8"/></linearGradient><radialGradient id="dsG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff6d8"/><stop offset=".25" stop-color="#ffe7a8" stop-opacity=".9"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/></radialGradient><radialGradient id="dsC" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#f6f8fb"/><stop offset="1" stop-color="#dce6ef"/></radialGradient></defs><rect width="1200" height="800" fill="url(#dsS)"/><circle cx="880" cy="250" r="220" fill="url(#dsG)"/><circle cx="880" cy="250" r="52" fill="#fff8e0"/><g class="td-clouds">${cloud(220, 170, 1.4)}${cloud(560, 300, 0.9)}${cloud(1040, 120, 1.1)}</g><g fill="none" stroke="#5a7082" stroke-width="4" stroke-linecap="round"><path d="M640 200q12-10 24 0q12-10 24 0"/><path d="M710 240q9-8 18 0q9-8 18 0"/></g><path d="M80 800Q120 700 230 690Q330 700 360 800Z" fill="#7fae9a" opacity=".55"/><path d="M200 700Q196 640 214 600" stroke="#7a6a4f" stroke-width="7" fill="none" stroke-linecap="round" opacity=".55"/><path d="M214 600q-30-8-46 10q22-6 46 0q-14 14-16 34q14-20 18-34q22 4 34 22q-8-22-30-32q20-12 42-6q-24-14-48 6Z" fill="#6aa585" opacity=".6"/></svg>`;
}
function diveWaveArt(cls, fill, line) {
  let d = 'M0 40',
    l = 'M0 40';
  for (let x = 0; x < 1500; x += 150) {
    d += ` Q${x + 37.5} 18 ${x + 75} 40 T${x + 150} 40`;
    l += ` Q${x + 37.5} 18 ${x + 75} 40 T${x + 150} 40`;
  }
  return `<svg class="td-wave ${cls}" viewBox="0 0 1500 160" preserveAspectRatio="none" aria-hidden="true"><path d="${d} V160 H0 Z" fill="${fill}"/><path d="${l}" fill="none" stroke="${line}" stroke-width="5" stroke-linecap="round" opacity=".8"/></svg>`;
}
function diveSplashArt() {
  // A crown of water jets rising from the surface, white foam at the base, droplets flying out.
  const drops = [
    [-190, -230, 15], [-120, -300, 13], [-50, -340, 17], [30, -350, 14], [100, -310, 16], [175, -240, 12],
    [-240, -120, 11], [250, -110, 12], [-80, -200, 10], [80, -210, 10], [0, -380, 12], [-150, -170, 9], [150, -170, 9]
  ];
  return `<svg viewBox="-300 -400 600 440" aria-hidden="true"><defs><linearGradient id="spJ" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#7fd0e6"/><stop offset=".55" stop-color="#d9f6fc"/><stop offset="1" stop-color="#ffffff"/></linearGradient><radialGradient id="spD" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#e2f7fc"/><stop offset="1" stop-color="#8fd3e6"/></radialGradient></defs><path d="M-230 20Q-215 -40 -190 -70Q-188 -20 -170 -10Q-165 -120 -130 -170Q-128 -60 -105 -40Q-100 -200 -60 -250Q-55 -90 -30 -70Q-20 -250 10 -290Q18 -100 35 -75Q55 -220 95 -250Q95 -80 115 -45Q140 -160 175 -180Q170 -50 190 -20Q210 -60 230 -70Q232 -10 240 20Z" fill="url(#spJ)" stroke="#5fb8d2" stroke-width="4" stroke-linejoin="round"/><path d="M-90 -40Q-75 -150 -55 -200M20 -70Q22 -180 12 -250M110 -50Q125 -140 150 -160" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".85"/>${drops
    .map(([dx, dy, r]) => `<circle class="drop" cx="0" cy="-40" r="${r}" fill="url(#spD)" stroke="#5fb8d2" stroke-width="2.5" style="--dx:${dx}px;--dy:${dy}px"/>`)
    .join('')}<ellipse cx="0" cy="22" rx="280" ry="30" fill="#ffffff" stroke="#bfe9f4" stroke-width="3"/><g fill="#ffffff"><circle cx="-200" cy="10" r="22"/><circle cx="-140" cy="4" r="26"/><circle cx="-70" cy="0" r="30"/><circle cx="0" cy="-4" r="32"/><circle cx="70" cy="0" r="30"/><circle cx="140" cy="4" r="26"/><circle cx="200" cy="10" r="22"/></g></svg>`;
}
function showTapToDive() {
  if (location.hash !== '#home') location.hash = 'home';
  const today = openingTodayKey();
  if (state.lastOpening === today) return; // already dived today: straight to the reef
  document.body.classList.add('intro-running');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const jelly = typeof raceObstacleArt === 'function' ? raceObstacleArt('jelly') : '';
  const intro = document.createElement('section');
  intro.id = 'tapToDive';
  intro.className = 'tap-dive' + (reduced ? ' reduced' : '');
  intro.setAttribute('aria-label', 'Tap to dive into Haytham’s ocean');
  intro.innerHTML =
    `<div class="td-camera">` +
    `<div class="td-sky">${diveSkyArt()}</div>` +
    `<div class="td-under"><i class="ray"></i><i class="ray"></i><i class="ray"></i>` +
    `<div class="td-creature td-turtle">${seaAnimal('turtle')}</div>` +
    `<div class="td-creature td-shoal">${Array.from({ length: 8 }, () => `<span>${seaAnimal('blue-tang')}</span>`).join('')}</div>` +
    `<div class="td-creature td-jelly">${jelly}</div></div>` +
    `<div class="td-surface">${diveWaveArt('back', '#3aa6c4', '#bff0f6')}<div class="td-milo">${miloActor()}</div>${diveWaveArt('front', '#2a93b6', '#e8fbff')}</div>` +
    `</div>` +
    `<button class="td-pearl" id="tapToDiveButton" aria-label="Tap to dive">${divePearlArt()}<span class="td-hand">${diveHandArt()}</span></button>` +
    `<div class="td-count" aria-hidden="true"></div>` +
    `<div class="td-splash" aria-hidden="true">${diveSplashArt()}</div>` +
    `<div class="td-leader" aria-hidden="true">${miloActor()}</div>` +
    `<div class="td-rush" aria-hidden="true">${Array.from({ length: 24 }, (_, i) => `<i style="--x:${(i * 37) % 100}%;--s:${10 + ((i * 7) % 24)}px;--d:${((i * 13) % 10) / 12}s"></i>`).join('')}</div>` +
    `<div class="td-depth" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3V19M5 13L12 20L19 13" fill="none" stroke="#fff8e0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><b>0</b><small>metres</small></div>`;
  document.body.append(intro);
  let started = false,
    timers = [],
    depthTimer = null;
  const later = (ms, fn) => timers.push(setTimeout(fn, ms));
  const finish = () => {
    timers.forEach(clearTimeout);
    clearInterval(depthTimer);
    if (!intro.isConnected || intro.classList.contains('td-out')) return;
    intro.classList.add('td-out');
    document.body.classList.remove('intro-running');
    document.body.classList.add('reef-arrive');
    setTimeout(() => document.body.classList.remove('reef-arrive'), 1800);
    setTimeout(() => intro.remove(), 700);
    state.lastOpening = today;
    state.openingTracks = typeof unlockedTrackCount === 'function' ? unlockedTrackCount() : 0;
    state.xp = (Number(state.xp) || 0) + 1; // the first-dive pearl
    save();
    if (!reduced) setTimeout(firstDivePearl, 900);
    else if ($('#treasureCount')) $('#treasureCount').textContent = state.xp;
    openingHello();
  };
  const count = (word, cls) => {
    const el = intro.querySelector('.td-count');
    el.textContent = word;
    el.classList.toggle('go', word === 'Go!');
    el.classList.remove('pop');
    void el.offsetWidth;
    el.classList.add('pop');
    intro.classList.remove('count-3', 'count-2', 'count-1');
    if (cls) intro.classList.add(cls);
    speak(word, { speaker: 'milo' });
  };
  const start = () => {
    if (started) return finish(); // any later tap skips to the reef
    started = true;
    if (typeof unlockVoiceLines === 'function') unlockVoiceLines();
    if (reduced) {
      intro.classList.add('splashed');
      return later(350, finish);
    }
    intro.classList.add('counting');
    count('3', 'count-3');
    later(800, () => count('2', 'count-2'));
    later(1600, () => count('1', 'count-1'));
    later(2400, () => {
      count('Go!');
      if (typeof playDiveSplash === 'function') playDiveSplash();
      intro.classList.add('splash-go', 'td-shake');
    });
    later(2650, () => {
      intro.classList.add('splashed');
      intro.querySelector('.td-count').textContent = '';
      let metres = 0;
      const gauge = intro.querySelector('.td-depth b');
      depthTimer = setInterval(() => {
        metres = Math.min(20, metres + 1);
        gauge.textContent = metres;
        if (metres === 20) clearInterval(depthTimer);
      }, 115);
    });
    later(3300, () => speak('Whoosh!', { speaker: 'milo' }));
    later(5400, finish);
  };
  intro.addEventListener('click', start);
}
// The first-dive pearl floats up in the middle of the reef, then drops into the treasure chest.
function firstDivePearl() {
  const chest = $('#treasureChest');
  const pearl = document.createElement('div');
  pearl.className = 'dive-pearl';
  pearl.innerHTML = divePearlArt('fdp');
  document.body.append(pearl);
  setTimeout(() => {
    const r = chest?.getBoundingClientRect();
    if (!r) return pearl.remove();
    pearl.classList.add('fly');
    pearl.style.left = r.left + r.width * 0.3 + 'px';
    pearl.style.top = r.top + r.height * 0.4 + 'px';
    pearl.style.width = '34px';
    setTimeout(() => {
      pearl.remove();
      if ($('#treasureCount')) $('#treasureCount').textContent = state.xp;
      chest.classList.remove('chest-pop');
      void chest.offsetWidth;
      chest.classList.add('chest-pop');
    }, 950);
  }, 1100);
}
// Milo's hello, then Gizmo's shark of the day with its photo card.
function openingHello() {
  const shark = sharkOfTheDay(),
    hello = openingGreeting();
  const card = document.createElement('button');
  card.className = 'shark-of-day';
  card.setAttribute('aria-label', 'Shark of the day: ' + shark.name);
  card.innerHTML = `<img src="${shark.image}" alt=""><span><small>SHARK OF THE DAY</small><strong>${shark.name}${shark.extinct ? ' · extinct' : ''}</strong></span>`;
  const sharkLine = 'Here’s today’s shark! ' + shark.name + '. ' + shark.fact;
  card.onclick = () => speak(sharkLine, { speaker: 'gizmo' });
  let hideTimer = null;
  const hide = () => {
    clearTimeout(hideTimer);
    card.classList.add('sod-out');
    setTimeout(() => card.remove(), 500);
  };
  const gizmoTurn = () => {
    if (location.hash !== '#home' && location.hash !== '') return;
    document.body.append(card);
    speak(sharkLine, { speaker: 'gizmo', end: () => (hideTimer = setTimeout(hide, 4000)) });
    hideTimer = setTimeout(hide, 16000);
  };
  window.addEventListener('hashchange', hide, { once: true });
  updateMilo(hello);
  speak(hello, { speaker: 'milo', end: gizmoTurn, unavailable: gizmoTurn });
}
