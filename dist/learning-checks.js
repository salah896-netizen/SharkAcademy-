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

/* Real tracing (writing lagoon). A scribble and a tap on ✓ used to earn pearls. Now, when he
 * presses ✓, the app looks at what he drew:
 *  - tracing: does his ink run along most of the glowing guide (and mostly stay near it)?
 *  - copying / on his own: is there about a letter's worth of writing on the page?
 * It's deliberately generous for a 5-year-old. If it's not there yet, the board wiggles, Dash
 * shows the strokes again and says "Start at the dot and follow the stroke slowly." Nothing is
 * marked wrong and nothing is taken away; the ✓ simply works once there's a real try. */
function inkPixels(canvas) {
  const ctx = canvas.getContext('2d'),
    { width, height } = canvas;
  if (!width || !height) return [];
  const data = ctx.getImageData(0, 0, width, height).data,
    step = Math.max(2, Math.round(width / 300)),
    out = [];
  for (let y = 0; y < height; y += step)
    for (let x = 0; x < width; x += step) if (data[(y * width + x) * 4 + 3] > 60) out.push([x, y]);
  return { points: out, step };
}
function guidePixels(canvas) {
  const rect = canvas.getBoundingClientRect(),
    sx = canvas.width / rect.width,
    sy = canvas.height / rect.height,
    out = [];
  document
    .querySelectorAll('#writingGuide path[stroke="#a4c6c8"]')
    .forEach(path => {
      const length = path.getTotalLength(),
        m = path.getScreenCTM();
      if (!m || !length) return;
      for (let d = 0; d <= length; d += 4) {
        const p = path.getPointAtLength(d);
        out.push([(p.x * m.a + p.y * m.c + m.e - rect.left) * sx, (p.x * m.b + p.y * m.d + m.f - rect.top) * sy]);
      }
    });
  return out;
}
function nearest(points, x, y) {
  let best = Infinity;
  for (const [px, py] of points) {
    const d = (px - x) ** 2 + (py - y) ** 2;
    if (d < best) best = d;
  }
  return Math.sqrt(best);
}
function writingAttemptOK() {
  const canvas = document.getElementById('writingCanvas');
  if (!canvas) return true;
  const ink = inkPixels(canvas);
  if (!ink.points.length) return false;
  const guide = guidePixels(canvas),
    tolerance = canvas.width * 0.06;
  if (guide.length) {
    // Tracing: most of the guide covered, and most of the ink close to the guide.
    const covered = guide.filter(([x, y]) => nearest(ink.points, x, y) < tolerance).length / guide.length;
    const sample = ink.points.filter((_, i) => i % 3 === 0);
    const onTrack = sample.filter(([x, y]) => nearest(guide, x, y) < tolerance * 1.4).length / sample.length;
    return covered >= 0.5 && onTrack >= 0.5;
  }
  // Copying or writing on his own: about a letter's worth of ink (a dot or a dash won't do).
  const inkLength = (ink.points.length * ink.step) / Math.max(1, canvas.width / 400) / 6;
  const target = document.querySelector('.writing-mission-prompt strong')?.getAttribute('aria-label') || writingChoice || 'c';
  return inkLength >= 60 * Math.min(3, Array.from(String(target)).length);
}
document.addEventListener(
  'click',
  e => {
    const done = e.target.closest('#finishWriting');
    if (!done || done.disabled || writingAttemptOK()) return;
    e.stopImmediatePropagation();
    e.preventDefault();
    const board = document.querySelector('.writing-board');
    board?.classList.remove('kid-wrong');
    void board?.offsetWidth;
    board?.classList.add('kid-wrong');
    setTimeout(() => board?.classList.remove('kid-wrong'), 700);
    document.getElementById('showStrokes')?.click();
    speak(
      document.querySelector('#writingGuide path[stroke="#a4c6c8"]')
        ? 'Start at the dot and follow the stroke slowly.'
        : 'Have a go at drawing it first. You can tap Watch to see how.',
      { speaker: 'dash' }
    );
  },
  true
);
