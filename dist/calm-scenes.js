/* Calm learning canvases and one uninterrupted journey from the home Play action. */
function calmSceneFor() {
  const route = (location.hash.slice(1) || 'home').split('/')[0],
    subject = location.hash.split('/')[1];
  if (route === 'home') return 'home';
  if (route === 'writing') return 'sand';
  if (route === 'play' && game?.type === 'science') return 'science';
  if (route === 'play')
    return game?.type === 'reading'
      ? 'reading'
      : game?.type === 'fossil' || (!game && completedLessonType === 'fossil')
        ? 'discovery'
        : 'maths';
  if (route === 'library')
    return { reading: 'reading', maths: 'maths', writing: 'library-sand', science: 'science' }[subject] || (subject ? 'library' : 'library-room');
  if (['museum', 'legend'].includes(route)) return 'discovery';
  if (route === 'stories') return 'stories';
  if (route === 'cinema') return 'cinema';
  if (route === 'race') return 'race-room';
  return 'library';
}
function applyCalmScene() {
  const scene = calmSceneFor(),
    tone = ['reading', 'maths', 'library', 'library-room', 'library-sand', 'stories', 'science'].includes(scene)
      ? 'light'
      : 'dark';
  if (document.body.dataset.calmScene !== scene) document.body.dataset.calmScene = scene;
  if (document.body.dataset.calmTone !== tone) document.body.dataset.calmTone = tone;
  // Set the backdrop directly too (28 Oct): Safari on the iPad sometimes kept the sandy writing
  // colour after going home, because it didn't redraw the fixed ocean layer when only the body's
  // data attribute changed.
  const ocean = document.getElementById?.('oceanWorld');
  if (ocean) {
    const calm = scene !== 'home';
    const want = calm ? getComputedStyle(document.body).getPropertyValue('--calm-background').trim() : '';
    if (ocean.style.background !== want) {
      ocean.style.background = want;
      ocean.querySelectorAll('.world-backdrop, #livingOcean').forEach(el => (el.style.display = calm ? 'none' : ''));
      void ocean.offsetHeight;
    }
  }
  const playButton = $('#dailyPlay');
  if (playButton) playButton.onclick = dailyAdventure;
}
const calmContentObserver = new MutationObserver(applyCalmScene);
calmContentObserver.observe(app, { childList: true, subtree: true });
const calmRouteObserver = new MutationObserver(applyCalmScene);
calmRouteObserver.observe(document.body, { attributes: true, attributeFilter: ['data-route'] });
let lessonJourney = null;
const preJourneyDaily = dailyAdventure;
speakLayers.unshift(function holdForLessonJourney(text, options, next) {
  if (lessonJourney && !lessonJourney.revealed) {
    lessonJourney.narration = { text, options };
    return;
  }
  return next(text, options);
});
function stopLessonJourney() {
  const active = lessonJourney;
  if (!active) return;
  active.timers.forEach(clearTimeout);
  active.overlay.remove();
  document.body.classList.remove('journey-starting');
  lessonJourney = null;
}
dailyAdventure = function () {
  if (location.hash !== '#home' && location.hash !== '') {
    preJourneyDaily();
    return;
  }
  if (lessonJourney) return;
  stopSpeech();
  if (typeof pathNeedsCheck === 'function' && pathNeedsCheck()) {
    startPathCheck();
    return;
  }
  if (typeof pathNextActivity === 'function') pendingPathPick = pathNextActivity();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches,
    today = new Date().toDateString(),
    done =
      state.completed.filter(x => new Date(x.at).toDateString() === today).length +
      (state.writingHistory || []).filter(x => new Date(x.at).toDateString() === today).length,
    subject =
      (typeof pendingPathPick !== 'undefined' && pendingPathPick?.subject) ||
      ['reading', 'maths', 'writing'][done % 3],
    destination = subject === 'writing' ? '#writing' : '#play',
    overlay = document.createElement('div');
  overlay.className = 'lesson-journey' + (reduced ? ' reduced-journey' : '');
  overlay.setAttribute('role', 'status');
  overlay.setAttribute('aria-label', 'Swimming to your lesson');
  overlay.style.setProperty(
    '--journey-colour',
    subject === 'reading' ? '#cce4ef' : subject === 'maths' ? '#d0e9de' : '#ead4a3'
  );
  overlay.innerHTML = `<div class="journey-water"></div><div class="journey-bubbles" aria-hidden="true">${Array.from({ length: 8 }, (_, i) => `<i style="--bubble:${i}"></i>`).join('')}</div><div class="journey-milo" aria-hidden="true">${miloActor()}</div>`;
  const active = {
    overlay,
    timers: [],
    destination,
    narration: null,
    revealed: false,
    travelling: false
  };
  lessonJourney = active;
  document.body.append(overlay);
  document.body.classList.add('journey-starting');
  const later = (fn, delay) =>
    active.timers.push(
      setTimeout(() => {
        if (lessonJourney === active) fn();
      }, delay)
    );
  later(
    () => {
      if (!['#home', ''].includes(location.hash)) {
        stopLessonJourney();
        return;
      }
      active.travelling = true;
      preJourneyDaily();
      applyCalmScene();
    },
    reduced ? 80 : 1100
  );
  later(() => overlay.classList.add('journey-arrived'), reduced ? 160 : 1700);
  later(
    () => {
      if (location.hash !== destination) {
        stopLessonJourney();
        return;
      }
      const narration = active.narration;
      active.revealed = true;
      stopLessonJourney();
      if (narration) speakNow(narration.text, narration.options);
    },
    reduced ? 280 : 2050
  );
};
window.addEventListener('hashchange', () => {
  applyCalmScene();
  if (lessonJourney && lessonJourney.travelling && location.hash !== lessonJourney.destination)
    stopLessonJourney();
});
applyCalmScene();
