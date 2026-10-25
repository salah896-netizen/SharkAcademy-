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
const preKidEncourage = encourage;
encourage = function (text, mood) {
  if (
    mood === 'retry' ||
    /good try|try again|another go|look again|have another/i.test(text || '')
  )
    showTryAgain();
  return preKidEncourage(text, mood);
};
const preKidHelperSpeak = helperSpeak;
helperSpeak = function (text, options) {
  if (/^(good try|great trying|nice try)/i.test(String(text || '').trim()) && !document.body.classList.contains('race-running'))
    showTryAgain();
  return preKidHelperSpeak(text, options);
};
