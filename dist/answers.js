/* Answering, for a child who can't read yet (25 October 2026). Brought together from
 * kid-buttons.js, round 3's feedback and learning-checks.js: picture buttons, try again, short
 * win/lose lines, repeat the question, the blending bubbles, and two tries then show. */

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
  ['listen', '🔊', /^(♫\s*)?hear (our|the)/i]
];
// Painted pictures for the emoji kinds (icons.js); ▶ ↻ ✓ stay as bold shapes.
const kidButtonPictures = { home: 'home', path: 'map', tracks: 'flag', listen: 'speaker-blue' };
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
      button.innerHTML = `<span class="kid-icon" aria-hidden="true">${kidButtonPictures[kind[0]] ? paintedIcon(kidButtonPictures[kind[0]]) : kind[1]}</span>`;
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
speakLayers.unshift(function rememberQuestion(text, options, next) {
  if (kidAwaitQuestion && text && !options.repeat) {
    kidAwaitQuestion = false;
    kidQuestion = { text, speaker: options.speaker || 'milo' };
    syncRepeatButton();
  }
  return next(text, options);
});
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
    button.innerHTML = `<span aria-hidden="true">${paintedIcon('speaker')}</span>`;
    document.body.append(button);
  }
  button.onclick = () => {
    button.classList.remove('kid-repeat-pop');
    void button.offsetWidth;
    button.classList.add('kid-repeat-pop');
    // The lesson's own "hear the question" control says it best; otherwise replay what was said.
    const own = document.querySelector('#questInstructions, #app #listen');
    if (own) own.click();
    else if (kidQuestion) speak(kidQuestion.text, { speaker: kidQuestion.speaker, repeat: true });
  };
}
window.addEventListener('hashchange', () => setTimeout(syncRepeatButton, 50));

/* Friends' feedback, round 3 (25 October 2026): Jude's and Archer's families, and Haytham's.
 *
 * - Blending bubbles: the "listen and blend" question showed two blank bubbles and a plus sign,
 *   which children read as "bubble + bubble". Each bubble is now a numbered speaker that lights
 *   up and says its own part (shh… ip), one after the other, so the child hears the parts and
 *   pushes them together. No letters, as in the class's Heggerty-style listening.
 */
function blendPartsPlay(strip, parts, first = 0) {
  const bubbles = [...strip.querySelectorAll('.blend-bubble')];
  let i = 0;
  const next = () => {
    bubbles.forEach(b => b.classList.remove('blend-speaking'));
    if (i >= parts.length || !strip.isConnected) return;
    const bubble = bubbles[first + i];
    bubble?.classList.add('blend-speaking');
    const part = parts[i++];
    speak(part, {
      speaker: 'willa',
      end: () => setTimeout(next, 450),
      unavailable: () => setTimeout(next, 700)
    });
  };
  next();
}
function upgradeBlendQuestion() {
  const old = app.querySelector('.school-blend:not([data-upgraded])');
  if (!old || !game?.items) return;
  const q = game.items[game.index];
  if (!q?.parts) return;
  // A fresh copy drops the old "replay the whole question" listener; the strip now plays the parts.
  const strip = old.cloneNode(true);
  strip.dataset.upgraded = '1';
  old.replaceWith(strip);
  strip.querySelectorAll('.blend-bubble').forEach((bubble, i) => {
    bubble.innerHTML = `<span class="blend-ear" aria-hidden="true">${paintedIcon('speaker-blue')}</span><b class="blend-number" aria-hidden="true">${i + 1}</b>`;
    bubble.setAttribute('aria-label', 'Hear sound ' + (i + 1));
    bubble.addEventListener('click', e => {
      e.stopPropagation();
      blendPartsPlay(strip, [q.parts[i]], i);
    });
  });
  // The arrow between bubbles means "push them together", not "plus".
  strip.querySelectorAll(':scope > b').forEach(b => (b.textContent = '➜'));
  strip.addEventListener('click', () => blendPartsPlay(strip, q.parts, 0));
}
new MutationObserver(upgradeBlendQuestion).observe(app, { childList: true, subtree: true });

/* Learning checks (25 October 2026): stop guessing, and real tracing.
 *
 * Two tries, then we show you: with three pictures to choose from, tapping at random gets one
 * in three right. Now the first wrong tap gets the usual "try again"; on the second, the right
 * picture glows, the friend says the answer, and that question comes back once at the end of
 * the lesson, so he gets to answer it himself. Shown answers count as helped practice (they
 * never count towards a skill being "ready"), and pearls are never taken away.
 */
function showRightChoice(button) {
  if (!button) return;
  document.querySelector('.kid-try-again')?.remove();
  button.classList.add('kid-show-answer');
  document
    .querySelectorAll('#app button')
    .forEach(b => b !== button && b.matches('[data-quest-choice],[data-science-choice],[data-choice],[data-group-choice]') && (b.disabled = true));
}
function revisitLater(q) {
  if (!game?.items || q.revisit) return;
  game.items.push({ ...q, revisit: true });
}
function twoTries(name, { question, buttonFor, call }) {
  const original = window[name];
  window[name] = function (value, ...rest) {
    const q = question();
    if (!game || game.answered || !q || q.kind === 'predict' || value === q.answer)
      return original.call(this, value, ...rest);
    const index = game.index;
    game.wrongTaps = game.wrongTaps || {};
    game.wrongTaps[index] = (game.wrongTaps[index] || 0) + 1;
    if (game.wrongTaps[index] < 2) return original.call(this, value, ...rest);
    // Second wrong tap: show the right answer, then carry on as if it were chosen (as helped).
    if (game.showingAnswer) return;
    game.showingAnswer = true;
    game.assisted = true;
    const button = buttonFor(q.answer);
    showRightChoice(button);
    revisitLater(q);
    setTimeout(() => {
      game && (game.showingAnswer = false);
      if (!game || game.index !== index || game.answered) return;
      game.revealing = true;
      call(original, q.answer, button);
      if (game) game.revealing = false;
    }, 1100);
  };
}
twoTries('readingMissionAnswer', {
  question: () => game?.items?.[game.index],
  buttonFor: answer =>
    [...document.querySelectorAll('[data-quest-choice]')].find(
      b => game.items[game.index].options[+b.dataset.questChoice] === answer
    ),
  call: (original, answer) => original(answer)
});
twoTries('scienceAnswer', {
  question: () => (game?.science ? game.items[game.index] : null),
  buttonFor: answer =>
    [...document.querySelectorAll('[data-science-choice]')].find(
      b => game.items[game.index].options[+b.dataset.scienceChoice] === answer
    ),
  call: (original, answer, button) => original(answer, button)
});
twoTries('answer', {
  question: () => game?.items?.[game.index],
  buttonFor: answer =>
    document.querySelector(`[data-group-choice="${answer}"]`) ||
    [...document.querySelectorAll('#app [data-choice], #app .choices button')].find(
      b => b.textContent.trim() === String(answer) || b.dataset.choice === String(answer)
    ),
  call: (original, answer) => original(answer)
});
// A shown answer is said plainly ("A map!"), without "Yes!" or "Great job!".
const preCheckEncourage = encourage;
encourage = function (text, mood) {
  if (game?.revealing) return preCheckEncourage(firstSentence(text), 'happy');
  return preCheckEncourage(text, mood);
};
