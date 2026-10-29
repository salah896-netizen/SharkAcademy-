/* Writing help (25 October 2026): the model letter drawn from the trace strokes, picture tool
 * buttons, and the real tracing check. From round 3's feedback and learning-checks.js. */

/* Writing (Archer's feedback): the little model letter above the sand used the computer font,
 * whose "a" has a hook on top, while the trace teaches the round school "a". The model is now
 * drawn from the very same strokes as the trace, bigger, so what he sees is what he writes.
 * The tool buttons are pictures, and the green ✓ pulses once he has written something, so it's
 * clear what to press next. */
function letterModelSVG(target) {
  const chars = Array.from(target).filter(c => letterStrokes[c]);
  if (!chars.length) return null;
  const strokes = (c, dx) =>
    letterStrokes[c].paths
      .map(d => `<path d="${d}" transform="translate(${dx} 0)"/>`)
      .join('');
  // Each letter sits in a 400-wide cell; crop to the part of the board letters use.
  const width = chars.length * 220;
  const body = chars.map((c, i) => strokes(c, i * 220 - 90)).join('');
  return `<svg class="letter-model" viewBox="0 30 ${width} 215" aria-hidden="true"><path class="model-lines" d="M0 110H${width} M0 225H${width}"/>${body}</svg>`;
}
const writingToolIcons = {
  showStrokes: ['eye', 'Show me'],
  undoInk: ['', 'Undo'],
  clearInk: ['sponge', 'Wave away']
};
const preRound3Writing = writing;
writing = function () {
  preRound3Writing();
  const page = app.querySelector('.writing-page');
  if (!page) return;
  const model = page.querySelector('.writing-mission-prompt strong');
  const svg = model && letterModelSVG(model.textContent.trim());
  if (svg) {
    model.setAttribute('aria-label', model.textContent.trim());
    model.innerHTML = svg;
    model.classList.add('model-drawn');
  }
  for (const [id, [icon, label]] of Object.entries(writingToolIcons)) {
    const b = document.getElementById(id);
    if (!b) continue;
    b.setAttribute('aria-label', b.textContent.trim() || label);
    b.classList.add('writing-tool');
    b.innerHTML = `<span aria-hidden="true">${icon ? paintedIcon(icon) : '↶'}</span>`;
  }
  const done = document.getElementById('finishWriting');
  if (done) {
    done.setAttribute('aria-label', done.textContent.trim() || 'I finished');
    done.classList.add('kid-btn', 'kid-done');
    done.innerHTML = '<span class="kid-icon" aria-hidden="true">✓</span>';
    const canvas = document.getElementById('writingCanvas');
    canvas?.addEventListener('pointerup', () => done.classList.add('writing-ready'));
  }
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
