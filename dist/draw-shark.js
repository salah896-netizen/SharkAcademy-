/* Draw a shark with Dash (25 October 2026). Haytham asked to learn how to draw a shark.
 *
 * Step by step: eight small parts (back, tummy, tail, fins, eye, gills, smile). Each step shows
 * one glowing trail with a start dot, Dash says what to draw, and "Watch" shows the stroke.
 * Haytham's own lines stay on the page, so the shark builds up as he goes. Then he colours it in.
 * "Draw on my own" is a blank page with crayons and a small finished shark to copy.
 * Finished drawings are saved on this device (parent area) and earn the extra-activity pearls.
 * Same 400 × 300 board as the writing lagoon.
 */
const sharkDrawSteps = [
  {
    name: 'Shark’s back',
    say: 'First, draw a big curve for the shark’s back. Start at the nose dot.',
    paths: ['M335 150 C290 95 170 100 105 140']
  },
  {
    name: 'Tummy',
    say: 'Now the tummy. Start at the nose again and curve down and along.',
    paths: ['M335 150 C290 195 170 190 105 160']
  },
  {
    name: 'Tail',
    say: 'Now the tail. Go up to a point, back to the middle, then down to a point.',
    paths: ['M105 140 L58 92 L82 150 L58 205 L105 160']
  },
  {
    name: 'Top fin',
    say: 'Draw a pointy fin on its back, like a triangle.',
    paths: ['M205 112 L192 58 L250 108']
  },
  {
    name: 'Side fin',
    say: 'Add a side fin underneath. Sharks use it to steer.',
    paths: ['M252 181 L234 228 L278 178']
  },
  {
    name: 'Eye',
    say: 'Draw a round eye near the nose.',
    paths: ['M296 137 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0']
  },
  {
    name: 'Gills',
    say: 'Sharks breathe with gills. Draw three little curvy lines.',
    paths: ['M268 140 Q262 153 268 166', 'M256 140 Q250 153 256 166', 'M244 141 Q238 153 244 165']
  },
  {
    name: 'Smile',
    say: 'Last one! Give your shark a toothy smile. Zig, zag, zig, zag!',
    paths: ['M326 165 L320 174 L314 167 L308 175 L302 168 L296 174 L290 167']
  }
];
const sharkCrayons = [
  ['#6d8794', 'grey'],
  ['#2f7fc0', 'blue'],
  ['#f08fb3', 'pink'],
  ['#f2c84b', 'yellow'],
  ['#4caf7a', 'green'],
  ['#ffffff', 'white'],
  ['#20313a', 'black']
];
let sharkDraw = null;

// The board fills the screen. Drawing coordinates stay 400 × 300, scaled evenly and centred,
// so the guide (SVG, "meet") and Haytham's ink (canvas) always line up.
// The page shows the part of the board where the shark is, so the shark is as big as possible.
const DRAW_VIEW = { x: 40, y: 40, w: 320, h: 205 };
function drawFit(canvas) {
  const r = canvas.getBoundingClientRect(),
    v = DRAW_VIEW,
    scale = Math.min(r.width / v.w, r.height / v.h);
  return {
    r,
    scale,
    x: (r.width - v.w * scale) / 2 - v.x * scale,
    y: (r.height - v.h * scale) / 2 - v.y * scale
  };
}
let drawSayToken = 0;
function dashSays(text) {
  // Each new instruction replaces the last (speak stops anything still playing).
  drawSayToken++;
  speak(text, { speaker: 'dash' });
}

function drawShark() {
  if (typeof writingCleanup === 'function' && writingCleanup) writingCleanup();
  if (!sharkDraw)
    sharkDraw = { mode: 'steps', step: 0, strokes: [], colour: '#20313a', tool: 'pen', saved: false };
  const d = sharkDraw,
    stepping = d.mode === 'steps' && d.step < sharkDrawSteps.length,
    colouring = d.mode === 'steps' && d.step >= sharkDrawSteps.length,
    step = sharkDrawSteps[d.step];
  if (stepping && d.tool !== 'erase') d.tool = 'pen';
  const instruction = stepping
    ? step.say
    : colouring
      ? 'Pick a crayon and colour your shark. Make it any colour you like!'
      : 'Draw any shark you like. Look at Dash’s shark if you want an idea.';
  const guide = sharkDrawSteps
    .map((s, i) => {
      if (d.mode !== 'steps') return '';
      if (i < d.step || colouring)
        return s.paths.map(p => `<path d="${p}" class="draw-done"/>`).join('');
      if (i === d.step)
        return s.paths
          .map(
            (p, j) =>
              `<path d="${p}" class="draw-next"/><path d="${p}" class="draw-next-dash"/>${j === 0 ? `<circle cx="${p.match(/M([\d.]+)/)[1]}" cy="${p.match(/M[\d.]+ ([\d.]+)/)[1]}" r="9" class="draw-start"/>` : ''}`
          )
          .join('');
      return '';
    })
    .join('');
  const model = sharkDrawSteps.map(s => s.paths.map(p => `<path d="${p}"/>`).join('')).join('');
  const crayons = `<div class="crayons" role="group" aria-label="Crayons">${sharkCrayons.map(([c, n]) => `<button data-crayon="${c}" aria-label="${n} crayon" aria-pressed="${d.tool === 'pen' && d.colour === c}" style="--c:${c}"></button>`).join('')}</div>`;
  app.innerHTML = `<section class="draw-page" data-mode="${d.mode}">
    <div class="draw-top">
      <div class="segmented draw-modes" role="group" aria-label="Drawing mode"><button data-draw-mode="steps" aria-pressed="${d.mode === 'steps'}" aria-label="Step by step">🦈 1 2 3</button><button data-draw-mode="free" aria-pressed="${d.mode === 'free'}" aria-label="Draw on my own">✏️</button></div>
      ${stepping ? `<div class="draw-steps" aria-label="Part ${d.step + 1} of ${sharkDrawSteps.length}">${sharkDrawSteps.map((s, i) => `<i class="${i < d.step ? 'done' : i === d.step ? 'now' : ''}">${i < d.step ? '✓' : i + 1}</i>`).join('')}</div>` : ''}
      <button class="draw-say" id="drawSay" aria-label="Hear Dash again">🔊 <span>${stepping ? `<b>${step.name}</b>` : colouring ? '🖍️' : '✏️'}</span></button>
    </div>
    <div class="draw-board"><svg viewBox="${DRAW_VIEW.x} ${DRAW_VIEW.y} ${DRAW_VIEW.w} ${DRAW_VIEW.h}" aria-hidden="true">${guide}</svg>${d.mode === 'free' ? `<svg class="draw-model" viewBox="40 40 310 200" aria-label="A shark to copy">${model}</svg>` : ''}<canvas id="drawCanvas" aria-label="Drawing page. Draw with your finger or Apple Pencil."></canvas></div>
    <div class="draw-tools">
      ${stepping ? `<button id="drawWatch" class="draw-tool" aria-label="Watch how">👀</button>` : crayons}
      <button id="drawPen" class="draw-tool" aria-label="Pencil" aria-pressed="${d.tool === 'pen'}">✏️</button>
      <button id="drawEraser" class="draw-tool" aria-label="Eraser" aria-pressed="${d.tool === 'erase'}"><span class="eraser-icon" aria-hidden="true"></span></button>
      <button id="drawUndo" class="draw-tool" aria-label="Undo">↶</button>
      <button id="drawClear" class="draw-tool" aria-label="Start this part again">🧽</button>
      ${stepping ? `<button id="drawNext" class="draw-go" aria-label="${d.step === sharkDrawSteps.length - 1 ? 'Finish drawing' : 'Next part'}">▶</button>` : `<button id="drawDone" class="draw-go" aria-label="I finished my shark" ${d.saved ? 'disabled' : ''}>✓</button>`}
    </div></section>`;

  $('#drawSay').onclick = () => dashSays(instruction);
  document.querySelectorAll('[data-draw-mode]').forEach(
    b =>
      (b.onclick = () => {
        if (b.dataset.drawMode === d.mode) return;
        sharkDraw = {
          mode: b.dataset.drawMode,
          step: 0,
          strokes: [],
          colour: '#20313a',
          tool: 'pen',
          saved: false
        };
        drawShark();
        if (sharkDraw.mode === 'free') dashSays('Draw any shark you like. Look at Dash’s shark if you want an idea.');
      })
  );
  const setTool = tool => {
    d.tool = tool;
    $('#drawPen')?.setAttribute('aria-pressed', String(tool === 'pen'));
    $('#drawEraser')?.setAttribute('aria-pressed', String(tool === 'erase'));
    document.querySelectorAll('[data-crayon]').forEach(x =>
      x.setAttribute('aria-pressed', String(tool === 'pen' && x.dataset.crayon === d.colour))
    );
  };
  document.querySelectorAll('[data-crayon]').forEach(
    b =>
      (b.onclick = () => {
        d.colour = b.dataset.crayon;
        setTool('pen');
      })
  );
  $('#drawPen').onclick = () => setTool('pen');
  $('#drawEraser').onclick = () => setTool('erase');

  // Ink: Haytham's strokes stay on the page across steps. Eraser strokes rub out ink only,
  // never Dash's guide.
  const canvas = $('#drawCanvas'),
    ctx = canvas.getContext('2d');
  let active = null,
    pointer = null;
  const point = e => {
    const f = drawFit(canvas);
    return { x: (e.clientX - f.r.left - f.x) / f.scale, y: (e.clientY - f.r.top - f.y) / f.scale };
  };
  function paint() {
    const f = drawFit(canvas),
      dpr = Math.min(devicePixelRatio || 1, 2);
    const w = Math.round(f.r.width * dpr),
      h = Math.round(f.r.height * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(f.scale * dpr, 0, 0, f.scale * dpr, f.x * dpr, f.y * dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const s of d.strokes) {
      ctx.globalCompositeOperation = s.erase ? 'destination-out' : 'source-over';
      ctx.strokeStyle = ctx.fillStyle = s.erase ? '#000' : s.colour;
      ctx.lineWidth = s.width;
      ctx.globalAlpha = s.erase ? 1 : s.width > 6 ? 0.75 : 1;
      if (s.points.length === 1) {
        ctx.beginPath();
        ctx.arc(s.points[0].x, s.points[0].y, s.width / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(s.points[0].x, s.points[0].y);
        s.points.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }
  const end = e => {
    if (pointer !== e.pointerId) return;
    active = null;
    pointer = null;
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    $('#drawNext')?.classList.add('ready');
  };
  canvas.onpointerdown = e => {
    if (pointer !== null || !e.isPrimary) return;
    e.preventDefault();
    pointer = e.pointerId;
    const erase = d.tool === 'erase';
    active = {
      points: [point(e)],
      colour: stepping ? '#20313a' : d.colour,
      width: erase ? 22 : colouring ? 14 : 5,
      erase,
      step: d.step
    };
    d.strokes.push(active);
    canvas.setPointerCapture(e.pointerId);
    paint();
  };
  canvas.onpointermove = e => {
    if (pointer !== e.pointerId || !active) return;
    e.preventDefault();
    for (const sample of e.getCoalescedEvents ? e.getCoalescedEvents() : [e])
      active.points.push(point(sample));
    paint();
  };
  canvas.onpointerup = canvas.onpointercancel = end;
  canvas.onlostpointercapture = () => {
    pointer = null;
    active = null;
  };
  $('#drawUndo').onclick = () => {
    d.strokes.pop();
    paint();
  };
  $('#drawClear').onclick = () => {
    // In step mode, clear only this part, so earlier parts stay.
    d.strokes = stepping ? d.strokes.filter(s => s.step !== d.step) : [];
    paint();
  };
  if ($('#drawWatch'))
    $('#drawWatch').onclick = () => {
      const svg = app.querySelector('.draw-board svg');
      svg.querySelectorAll('.draw-demo').forEach(p => p.remove());
      step.paths.forEach((p, i) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', p);
        path.setAttribute('class', 'draw-demo');
        path.setAttribute('pathLength', '1');
        path.style.animationDelay = i * 1.2 + 's';
        svg.append(path);
      });
    };
  if ($('#drawNext'))
    $('#drawNext').onclick = () => {
      if (!d.strokes.some(s => s.step === d.step && !s.erase)) {
        $('#drawSay').classList.add('nudge');
        dashSays('Have a go at drawing it first. You can tap Watch to see how.');
        setTimeout(() => $('#drawSay')?.classList.remove('nudge'), 600);
        return;
      }
      d.step++;
      drawShark();
      // Always the new part's words, never the old ones.
      if (d.step < sharkDrawSteps.length) dashSays(sharkDrawSteps[d.step].say);
      else dashSays('Fin-tastic! You drew a whole shark! Now pick a crayon and colour it in.');
    };
  if ($('#drawDone'))
    $('#drawDone').onclick = () => {
      if (!d.strokes.some(s => s.points.length > 3 && !s.erase)) {
        dashSays('Try drawing something first, Haytham!');
        return;
      }
      if (d.saved) return;
      d.saved = true;
      state.drawings = state.drawings || [];
      state.drawings.push({
        kind: d.mode === 'steps' ? 'shark-steps' : 'shark-free',
        ink: d.strokes.slice(0, 120).map(s => ({
          c: s.erase ? 'erase' : s.colour,
          w: s.width,
          p: s.points
            .filter((_, i) => i % Math.max(1, Math.ceil(s.points.length / 200)) === 0)
            .map(p => [Math.round(p.x), Math.round(p.y)])
        })),
        at: new Date().toISOString()
      });
      state.xp += PEARLS.extra;
      save();
      $('#drawDone').disabled = true;
      app.querySelector('.draw-board').classList.add('draw-celebrate');
      dashSays('What an amazing shark, Haytham! You’re a real artist. Pearls for your collection!');
      if (typeof setMiloMood === 'function') setMiloMood('highfive');
    };

  const observer = new ResizeObserver(paint);
  observer.observe(canvas);
  writingCleanup = () => {
    observer.disconnect();
    drawSayToken++;
    writingCleanup = null;
  };
  paint();
  if (stepping && d.step === 0 && !d.strokes.length)
    dashSays('Let’s draw a shark together, Haytham! One part at a time. ' + step.say);
}
function startSharkDrawing() {
  sharkDraw = null;
  location.hash = 'draw';
}

// A way in from the writing lagoon.
const preDrawWriting = writing;
writing = function () {
  preDrawWriting();
  const controls = app.querySelector('.writing-controls');
  if (!controls || controls.querySelector('#drawSharkLink')) return;
  controls.insertAdjacentHTML(
    'beforeend',
    '<button id="drawSharkLink" class="draw-shark-link">🦈 Draw a shark</button>'
  );
  $('#drawSharkLink').onclick = startSharkDrawing;
};
if (location.hash === '#draw') render();
