/* Tap to dive (24 October 2026). Replaces the old automatic dive.
 *
 * First open of the day: a calm painted sea surface with Milo's fin circling and one glowing
 * bubble. Haytham's tap is the start: it makes the splash, unlocks sound for the whole session
 * (iPads block audio until a tap), and plunges the camera down through rushing bubbles while the
 * friends swoop in and the fossil tooth rises. Then Milo says a personal hello (time of day and
 * what's new) and Gizmo shares the shark of the day with a real photo and a sourced fact.
 * Later opens the same day go straight to the reef. Reduced motion uses a simple fade.
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

function showTapToDive() {
  if (location.hash !== '#home') location.hash = 'home';
  const today = openingTodayKey();
  if (state.lastOpening === today) return; // already dived today: straight to the reef
  document.body.classList.add('intro-running');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const friends = ['willa', 'tiggy', 'milo', 'gizmo', 'dash'];
  const intro = document.createElement('section');
  intro.id = 'tapToDive';
  intro.className = 'tap-dive' + (reduced ? ' reduced' : '');
  intro.setAttribute('aria-label', 'Tap to dive into Haytham’s ocean');
  intro.innerHTML = `<div class="td-camera"><div class="td-sky"><i class="td-sun"></i><i class="td-cloud c1"></i><i class="td-cloud c2"></i></div><div class="td-surface"><svg viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true"><path class="w1" d="M0 60Q75 40 150 60T300 60T450 60T600 60T750 60T900 60T1050 60T1200 60T1350 60T1500 60V120H0Z"/><path class="w2" d="M0 74Q75 58 150 74T300 74T450 74T600 74T750 74T900 74T1050 74T1200 74T1350 74T1500 74V120H0Z"/></svg><div class="td-fin" aria-hidden="true"><svg viewBox="0 0 80 70"><path d="M8 66Q26 54 38 6Q58 30 72 66Z" fill="#6b8795" stroke="#aac2c8" stroke-width="3"/><path d="M2 66Q40 58 78 66" stroke="#e8fbff" stroke-width="5" fill="none" stroke-linecap="round"/></svg></div></div><div class="td-mid"><i class="ray r1"></i><i class="ray r2"></i><i class="ray r3"></i></div><div class="td-deep"></div></div><div class="td-rush" aria-hidden="true">${Array.from({ length: 22 }, (_, i) => `<i style="--x:${(i * 37) % 100}%;--s:${8 + ((i * 7) % 22)}px;--d:${((i * 13) % 10) / 10}s"></i>`).join('')}</div><div class="td-friends" aria-hidden="true">${friends.map((k, i) => `<div class="td-friend f${i}">${k === 'milo' ? miloActor() : crewActor(k)}</div>`).join('')}</div><button class="td-bubble" id="tapToDiveButton" aria-label="Tap to dive"><span>Tap to dive!</span><i class="td-finger" aria-hidden="true">☝</i></button>`;
  document.body.append(intro);
  let dived = false,
    timers = [];
  const finish = () => {
    timers.forEach(clearTimeout);
    if (!intro.isConnected) return;
    intro.classList.add('td-out');
    document.body.classList.remove('intro-running');
    document.body.classList.add('reef-arrive');
    setTimeout(() => document.body.classList.remove('reef-arrive'), 1400);
    setTimeout(() => intro.remove(), 700);
    state.lastOpening = today;
    state.openingTracks = typeof unlockedTrackCount === 'function' ? unlockedTrackCount() : 0;
    save();
    openingHello();
  };
  const dive = () => {
    if (dived) return finish(); // a second tap skips the rest
    dived = true;
    if (typeof unlockVoiceLines === 'function') unlockVoiceLines();
    if (typeof playDiveSplash === 'function') playDiveSplash();
    intro.classList.add('diving');
    timers.push(setTimeout(finish, reduced ? 350 : 2600));
  };
  intro.addEventListener('click', dive);
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
showTapToDive();
