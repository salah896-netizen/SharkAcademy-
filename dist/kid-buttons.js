/* Picture buttons for a child who can't read yet (25 October 2026).
 *
 * 1. Try again: after a wrong answer, the choice he tapped wobbles and fades, and a big round
 *    ↻ "try again" bubble pops up over the question for a moment. No words needed.
 * 2. Action buttons (next, again, home, my path, race tracks, I finished, listen) become big
 *    picture buttons with one shape and colour each, everywhere in the app:
 *      ▶ green = go on / next     ↻ orange = again     🏠 blue = back to the reef
 *      🗺️ = my path     🏁 = race tracks     ✓ green = I finished     🔊 = hear it
 *    The words stay as the button's spoken label (aria-label) for grown-ups and screen readers.
 */
const kidButtonKinds = [
  ['next', '▶', /^(▶\s*)?(next|keep swimming|our shark discovery|finish story|let’s go|go)\b/i],
  ['again', '↻', /\bagain\b/i],
  ['home', '🏠', /back to (my )?(reef|ocean)|^home$/i],
  ['path', '🗺️', /^my path$/i],
  ['tracks', '🏁', /^race tracks$/i],
  ['done', '✓', /i practised|i finished/i],
  ['listen', '🔊', /^♫\s*hear (our|the)/i]
];
function kidButtonKind(text) {
  const clean = text.replace(/[→←✨✓]/g, '').trim();
  return kidButtonKinds.find(([, , pattern]) => pattern.test(clean));
}
function decorateKidButtons(root = document) {
  root
    .querySelectorAll(
      '#app button, #app a, .race-results button, .race-paused-card button'
    )
    .forEach(button => {
      if (button.closest('#screenNav, .draw-page, .choices, [data-quest-choice]')) return;
      if (button.matches('[data-quest-choice], [data-book-answer], [data-group-choice], [data-crayon]'))
        return;
      const text = button.dataset.kidText || button.textContent.trim();
      if (!text || button.querySelector('.kid-icon')) return;
      const kind = kidButtonKind(text);
      if (!kind) return;
      button.dataset.kidText = text;
      button.setAttribute('aria-label', button.getAttribute('aria-label') || text);
      button.classList.add('kid-btn', 'kid-' + kind[0]);
      button.innerHTML = `<span class="kid-icon" aria-hidden="true">${kind[1]}</span>`;
    });
}
const kidButtonObserver = new MutationObserver(() => decorateKidButtons());
kidButtonObserver.observe(document.body, { childList: true, subtree: true });
decorateKidButtons();

// Remember which choice was tapped, so a wrong one can wobble.
let lastChoiceTapped = null;
document.addEventListener(
  'pointerdown',
  e => {
    lastChoiceTapped = e.target.closest('#app button, #app [role=button]');
  },
  true
);
function showTryAgain() {
  const choice = lastChoiceTapped;
  if (choice && choice.isConnected && !choice.closest('#screenNav')) {
    choice.classList.remove('kid-wrong');
    void choice.offsetWidth;
    choice.classList.add('kid-wrong');
  }
  document.querySelector('.kid-try-again')?.remove();
  const bubble = document.createElement('div');
  bubble.className = 'kid-try-again';
  bubble.setAttribute('role', 'status');
  bubble.setAttribute('aria-label', 'Try again');
  bubble.innerHTML = '<span aria-hidden="true">↻</span>';
  document.body.append(bubble);
  setTimeout(() => bubble.remove(), 1700);
}
/* Short win/lose messages (25 Oct feedback: "keep the win/lose messages simple and short;
 * repeating longer sentences gets annoying"). Wrong answers get one of three tiny lines;
 * right answers get a short cheer plus the first sentence of the answer ("Yes! A map!"). */
const shortTryLines = ['Try again!', 'Oops! Try again.', 'Nearly! Try again.'],
  shortCheers = ['Yes!', 'Great job!', 'Fin-tastic!'];
let shortTryIndex = 0,
  shortCheerIndex = 0;
const retryPattern = /^(good try|great trying|nice try|let’s try another|oops)/i;
function shortRetry() {
  return shortTryLines[shortTryIndex++ % shortTryLines.length];
}
function firstSentence(text) {
  return voiceSentences(String(text || ''))[0] || text;
}
const preKidEncourage = encourage;
encourage = function (text, mood) {
  const t = String(text || '');
  if (mood === 'retry' || /good try|try again|another go|look again|have another/i.test(t)) {
    showTryAgain();
    return preKidEncourage(shortRetry(), 'retry');
  }
  if (/new learning stage/i.test(t)) return preKidEncourage(text, mood);
  if (mood === 'highfive' && voiceSentences(t).length > 1)
    return preKidEncourage(
      shortCheers[shortCheerIndex++ % shortCheers.length] + ' ' + firstSentence(t),
      mood
    );
  return preKidEncourage(firstSentence(t), mood);
};
const preKidHelperSpeak = helperSpeak;
helperSpeak = function (text, options) {
  if (retryPattern.test(String(text || '').trim()) && !document.body.classList.contains('race-running')) {
    showTryAgain();
    return preKidHelperSpeak(shortRetry(), options);
  }
  return preKidHelperSpeak(text, options);
};

/* Repeat the question (25 Oct feedback: "it's easy to miss a detail"). On every question screen a
 * big 🔊 sits above the answers. It replays the question exactly as it was first spoken, in the
 * same friend's voice, as often as he likes. The first line spoken after a new screen appears is
 * taken as that screen's question. */
let kidQuestion = null,
  kidAwaitQuestion = false;
new MutationObserver(() => {
  kidAwaitQuestion = true;
  kidQuestion = null;
  setTimeout(syncRepeatButton, 0);
}).observe(app, { childList: true });
const preKidSpeak = speak;
speak = function (text, options = {}) {
  if (kidAwaitQuestion && text && !options.repeat) {
    kidAwaitQuestion = false;
    kidQuestion = { text, speaker: options.speaker || 'milo' };
    syncRepeatButton();
  }
  return preKidSpeak(text, options);
};
function questionScreen() {
  return (
    document.body.classList.contains('activity-screen') &&
    !!app.querySelector(
      '[data-quest-choice], [data-science-choice], [data-check-choice], [data-group-choice], .choices button, .answer, [data-answer]'
    )
  );
}
function syncRepeatButton() {
  let button = document.getElementById('repeatQuestion');
  const show =
    questionScreen() && (kidQuestion || document.querySelector('#questInstructions, #app #listen'));
  if (!show) {
    button?.remove();
    return;
  }
  if (!button) {
    button = document.createElement('button');
    button.id = 'repeatQuestion';
    button.className = 'kid-repeat';
    button.setAttribute('aria-label', 'Hear the question again');
    button.innerHTML = '<span aria-hidden="true">🔊</span>';
    document.body.append(button);
  }
  button.onclick = () => {
    button.classList.remove('kid-repeat-pop');
    void button.offsetWidth;
    button.classList.add('kid-repeat-pop');
    // The lesson's own "hear the question" control says it best; otherwise replay what was said.
    const own = document.querySelector('#questInstructions, #app #listen');
    if (own) own.click();
    else if (kidQuestion) preKidSpeak(kidQuestion.text, { speaker: kidQuestion.speaker, repeat: true });
  };
}
window.addEventListener('hashchange', () => setTimeout(syncRepeatButton, 50));
