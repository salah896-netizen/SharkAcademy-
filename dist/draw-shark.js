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
    name: 'Back',
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

function drawShark() {
  if (typeof writingCleanup === 'function' && writingCleanup) writingCleanup();
  if (!sharkDraw) sharkDraw = { mode: 'steps', step: 0, strokes: [], colour: '#20313a', saved: false };
  const d = sharkDraw,
    stepping = d.mode === 'steps' && d.step < sharkDrawSteps.length,
    colouring = d.mode === 'steps' && d.step >= sharkDrawSteps.length,
    step = sharkDrawSteps[d.step];
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
  app.innerHTML = `<section class="draw-page"><div class="draw-head"><span class="tag">DASH’S DRAWING SCHOOL</span><h1>${colouring ? 'Colour your shark!' : d.mode === 'free' ? 'Draw on my own' : 'Draw a shark'}</h1><div class="segmented" role="group" aria-label="Drawing mode"><button data-draw-mode="steps" aria-pressed="${d.mode === 'steps'}">Step by step</button><button data-draw-mode="free" aria-pressed="${d.mode === 'free'}">Draw on my own</button></div></div>${
    stepping
      ? `<div class="draw-steps" aria-label="Step ${d.step + 1} of ${sharkDrawSteps.length}">${sharkDrawSteps.map((s, i) => `<i class="${i < d.step ? 'done' : i === d.step ? 'now' : ''}" title="${s.name}">${i < d.step ? '🦈' : i + 1}</i>`).join('')}</div><p class="draw-say tap-to-hear" id="drawSay"><b>${step.name}:</b> ${step.say}</p>`
      : `<p class="draw-say tap-to-hear" id="drawSay">${colouring ? 'Pick a crayon and colour your shark. Make it any colour you like!' : 'Draw any shark you like. Look at Dash’s shark if you want an idea.'}</p>`
  }<div class="draw-board"><svg viewBox="0 0 400 300" aria-hidden="true">${guide}</svg>${d.mode === 'free' ? `<svg class="draw-model" viewBox="40 40 310 200" aria-label="A shark to copy">${model}</svg>` : ''}<canvas id="drawCanvas" aria-label="Drawing page. Draw with your finger or Apple Pencil."></canvas></div><div class="draw-tools">${
    stepping
      ? `<button id="drawWatch" class="quiet">▷ Watch</button>`
      : `<div class="crayons" role="group" aria-label="Crayons">${sharkCrayons.map(([c, n]) => `<button data-crayon="${c}" aria-label="${n} crayon" aria-pressed="${d.colour === c}" style="--c:${c}"></button>`).join('')}</div>`
  }<button id="drawUndo" class="quiet">↶ Undo</button><button id="drawClear" class="quiet">Clear</button>${
    stepping
      ? `<button id="drawNext" class="primary">${d.step === sharkDrawSteps.length - 1 ? 'Finish drawing ▶' : 'Next part ▶'}</button>`
      : `<button id="drawDone" class="primary" ${d.saved ? 'disabled' : ''}>I finished my shark! ✓</button>`
  }</div></section>`;

  const say = () =>
    speak(stepping ? step.say : $('#drawSay').textContent, { speaker: 'dash' });
  $('#drawSay').onclick = say;
  document.querySelectorAll('[data-draw-mode]').forEach(
    b =>
      (b.onclick = () => {
        if (b.dataset.drawMode === d.mode) return;
        sharkDraw = { mode: b.dataset.drawMode, step: 0, strokes: [], colour: '#20313a', saved: false };
        drawShark();
      })
  );
  document.querySelectorAll('[data-crayon]').forEach(
    b =>
      (b.onclick = () => {
        d.colour = b.dataset.crayon;
        document
          .querySelectorAll('[data-crayon]')
          .forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      })
  );

  // Ink: Haytham's strokes stay on the page across steps.
  const canvas = $('#drawCanvas'),
    ctx = canvas.getContext('2d');
  let active = null,
    pointer = null;
  const point = e => {
    const r = canvas.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * 400, y: ((e.clientY - r.top) / r.height) * 300 };
  };
  function paint() {
    const r = canvas.getBoundingClientRect(),
      dpr = Math.min(devicePixelRatio || 1, 2);
    const w = Math.round(r.width * dpr),
      h = Math.round(r.height * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(canvas.width / 400, 0, 0, canvas.height / 300, 0, 0);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const s of d.strokes) {
      ctx.strokeStyle = ctx.fillStyle = s.colour;
      ctx.lineWidth = s.width;
      ctx.globalAlpha = s.width > 6 ? 0.75 : 1;
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
    active = {
      points: [point(e)],
      colour: stepping ? '#20313a' : d.colour,
      width: colouring ? 14 : 5,
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
      if (!d.strokes.some(s => s.step === d.step)) {
        $('#drawSay').classList.add('nudge');
        speak('Have a go at drawing it first. You can tap Watch to see how.', { speaker: 'dash' });
        setTimeout(() => $('#drawSay')?.classList.remove('nudge'), 600);
        return;
      }
      d.step++;
      if (d.step === sharkDrawSteps.length)
        speak('Fin-tastic! You drew a whole shark! Now pick a crayon and colour it in.', {
          speaker: 'dash'
        });
      drawShark();
      if (d.step < sharkDrawSteps.length) say();
    };
  if ($('#drawDone'))
    $('#drawDone').onclick = () => {
      if (!d.strokes.some(s => s.points.length > 3)) {
        speak('Try drawing something first, Haytham!', { speaker: 'dash' });
        return;
      }
      if (d.saved) return;
      d.saved = true;
      state.drawings = state.drawings || [];
      state.drawings.push({
        kind: d.mode === 'steps' ? 'shark-steps' : 'shark-free',
        ink: d.strokes.slice(0, 120).map(s => ({
          c: s.colour,
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
      speak('What an amazing shark, Haytham! You’re a real artist. Pearls for your collection!', {
        speaker: 'dash'
      });
      if (typeof setMiloMood === 'function') setMiloMood('highfive');
    };

  const observer = new ResizeObserver(paint);
  observer.observe(canvas);
  writingCleanup = () => {
    observer.disconnect();
    writingCleanup = null;
  };
  paint();
  updateMilo(
    stepping ? 'Dash will show you how to draw a shark, one part at a time.' : 'I love your drawing, Haytham!'
  );
  if (stepping && d.step === 0 && !d.strokes.length)
    speak('Let’s draw a shark together, Haytham! One part at a time. ' + step.say, {
      speaker: 'dash'
    });
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
