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
// Dash's drawing school (Jude's idea: "trace a shark or other shapes"). Easiest first.
const seaDrawings = [
  {
    id: 'fish',
    name: 'Fish',
    view: { x: 70, y: 70, w: 245, h: 160 },
    intro: 'Let’s draw a fish together, Haytham! One part at a time.',
    done: 'Fin-tastic! You drew a fish! Now pick a crayon and colour it in.',
    steps: [
      {
        name: 'Body',
        say: 'Draw a big lemon shape for the fish’s body. Start at the dot and go all the way round.',
        paths: ['M300 150 C260 90 160 95 130 150 C160 205 260 210 300 150']
      },
      {
        name: 'Tail',
        say: 'Now a triangle for the tail.',
        paths: ['M130 150 L80 110 L80 190 L130 150']
      },
      { name: 'Eye', say: 'Draw a round eye near the front.', paths: ['M258 140 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0'] },
      {
        name: 'Fin and stripe',
        say: 'Last one! Add a little fin on top, and a stripe down the middle.',
        paths: ['M190 112 Q205 80 232 109', 'M215 108 Q205 150 215 192']
      }
    ]
  },
  {
    id: 'starfish',
    name: 'Starfish',
    view: { x: 95, y: 45, w: 210, h: 200 },
    intro: 'Let’s draw a starfish together, Haytham!',
    done: 'Fin-tastic! You drew a starfish! Now pick a crayon and colour it in.',
    steps: [
      {
        name: 'Star',
        say: 'Start at the top dot. Go down and out, up and in, all the way round to make five points.',
        paths: ['M200 55 L224 118 L290 121 L238 162 L256 227 L200 190 L144 227 L162 162 L110 121 L176 118 L200 55']
      },
      {
        name: 'Spots',
        say: 'Starfish are bumpy. Draw three little spots in the middle.',
        paths: [
          'M196 140 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0',
          'M182 165 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0',
          'M210 165 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0'
        ]
      }
    ]
  },
  {
    id: 'turtle',
    name: 'Turtle',
    view: { x: 110, y: 85, w: 230, h: 135 },
    intro: 'Let’s draw a sea turtle together, Haytham!',
    done: 'Fin-tastic! You drew a sea turtle! Now pick a crayon and colour it in.',
    steps: [
      {
        name: 'Shell',
        say: 'Draw a big hill for the shell, then a straight line along the bottom.',
        paths: ['M120 170 C125 90 275 90 280 170 L120 170']
      },
      {
        name: 'Head',
        say: 'Now a round head poking out at the front.',
        paths: ['M280 150 C300 125 335 135 330 155 C325 172 295 172 280 165']
      },
      {
        name: 'Flippers',
        say: 'Sea turtles have flippers for swimming. Draw two pointy flippers underneath.',
        paths: ['M240 170 L262 206 L220 172', 'M160 170 L136 206 L182 172']
      },
      {
        name: 'Shell pattern',
        say: 'Give the shell a pattern, like a little house on top.',
        paths: ['M160 170 L175 130 L225 130 L240 170', 'M175 130 L200 108 L225 130']
      },
      { name: 'Eye', say: 'Last one! A little eye on the head.', paths: ['M312 148 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0'] }
    ]
  },
  {
    id: 'crab',
    name: 'Crab',
    view: { x: 85, y: 78, w: 230, h: 142 },
    intro: 'Let’s draw a crab together, Haytham!',
    done: 'Fin-tastic! You drew a crab! Now pick a crayon and colour it in.',
    steps: [
      {
        name: 'Body',
        say: 'Draw a wide oval for the crab’s body.',
        paths: ['M140 170 C140 120 260 120 260 170 C260 195 140 195 140 170']
      },
      {
        name: 'Eye stalks',
        say: 'Crabs have eyes on sticks! Draw two lines going up.',
        paths: ['M185 131 L180 102', 'M215 131 L220 102']
      },
      {
        name: 'Eyes',
        say: 'Now a round eye on top of each stick.',
        paths: ['M173 95 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0', 'M213 95 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0']
      },
      {
        name: 'Claws',
        say: 'Draw two arms with snappy claws, like the letter V.',
        paths: ['M145 152 L110 122 L100 92 M110 122 L132 96', 'M255 152 L290 122 L300 92 M290 122 L268 96']
      },
      {
        name: 'Legs',
        say: 'Last one! Two little legs on each side.',
        paths: ['M152 182 L120 202', 'M164 188 L138 214', 'M248 182 L280 202', 'M236 188 L262 214']
      }
    ]
  },
  {
    id: 'octopus',
    name: 'Octopus',
    view: { x: 120, y: 60, w: 160, h: 190 },
    intro: 'Let’s draw an octopus together, Haytham!',
    done: 'Fin-tastic! You drew an octopus! Now pick a crayon and colour it in.',
    steps: [
      {
        name: 'Head',
        say: 'Draw a big round head, like an upside-down bowl.',
        paths: ['M140 160 C135 70 265 70 260 160']
      },
      {
        name: 'Arms',
        say: 'Now the wiggly arms. Draw four wavy lines going down.',
        paths: [
          'M150 160 Q140 190 160 200 Q175 210 160 232',
          'M185 162 Q180 195 195 210 Q205 225 190 242',
          'M215 162 Q220 195 205 210 Q195 225 210 242',
          'M250 160 Q260 190 240 200 Q225 210 240 232'
        ]
      },
      {
        name: 'Eyes',
        say: 'Two big round eyes.',
        paths: ['M172 120 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0', 'M212 120 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0']
      },
      { name: 'Smile', say: 'Last one! A happy smile.', paths: ['M185 142 Q200 154 215 142'] }
    ]
  },
  {
    id: 'whale',
    name: 'Whale',
    view: { x: 70, y: 38, w: 305, h: 162 },
    intro: 'Let’s draw a whale together, Haytham!',
    done: 'Fin-tastic! You drew a whale! Now pick a crayon and colour it in.',
    steps: [
      {
        name: 'Body',
        say: 'Draw a big round body, like a giant jelly bean.',
        paths: ['M80 165 C80 95 250 85 300 140 C310 152 300 186 262 190 L120 190 C95 190 80 180 80 165']
      },
      {
        name: 'Tail',
        say: 'Now the tail, with two big flukes.',
        paths: ['M300 145 L336 112 L342 146 L366 132 L346 166 L305 162']
      },
      { name: 'Eye', say: 'Draw a little eye.', paths: ['M116 145 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0'] },
      {
        name: 'Spout',
        say: 'Whales breathe air through a blowhole. Draw a spout of water on top!',
        paths: ['M150 92 Q140 62 125 56', 'M150 92 Q150 58 150 46', 'M150 92 Q160 62 175 56']
      },
      { name: 'Smile', say: 'Last one! A long, happy smile.', paths: ['M86 168 Q112 179 142 172'] }
    ]
  },
  {
    id: 'shark',
    name: 'Shark',
    view: { x: 40, y: 40, w: 320, h: 205 },
    intro: 'Let’s draw a shark together, Haytham! One part at a time.',
    done: 'Fin-tastic! You drew a whole shark! Now pick a crayon and colour it in.',
    steps: sharkDrawSteps
  }
];
function instructionFor(d) {
  const drawing = currentDrawing();
  // The shark keeps its original (recorded) line.
  if (drawing.id === 'shark') return 'Draw any shark you like. Look at Dash’s shark if you want an idea.';
  return 'Draw your own ' + drawing.name.toLowerCase() + '. Look at Dash’s picture if you want an idea.';
}
function currentDrawing() {
  return seaDrawings.find(x => x.id === sharkDraw?.subject) || seaDrawings.find(x => x.id === 'shark');
}
function drawingThumb(drawing) {
  const v = drawing.view;
  return `<svg viewBox="${v.x - 8} ${v.y - 8} ${v.w + 16} ${v.h + 16}" aria-hidden="true">${drawing.steps.map(s => s.paths.map(p => `<path d="${p}"/>`).join('')).join('')}</svg>`;
}
let sharkDraw = null;

// The board fills the screen. Drawing coordinates stay 400 × 300, scaled evenly and centred,
// so the guide (SVG, "meet") and Haytham's ink (canvas) always line up.
// The page shows the part of the board where the shark is, so the shark is as big as possible.
function drawFit(canvas) {
  const r = canvas.getBoundingClientRect(),
    v = currentDrawing().view,
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
    sharkDraw = {
      mode: 'steps',
      subject: 'shark',
      step: 0,
      strokes: [],
      colour: '#20313a',
      tool: 'pen',
      saved: false
    };
  const drawing = currentDrawing(),
    sharkDrawSteps = drawing.steps,
    view = drawing.view;
  const d = sharkDraw,
    stepping = d.mode === 'steps' && d.step < sharkDrawSteps.length,
    colouring = d.mode === 'steps' && d.step >= sharkDrawSteps.length,
    step = sharkDrawSteps[d.step];
  if (stepping && d.tool !== 'erase') d.tool = 'pen';
  const instruction = stepping
    ? step.say
    : colouring
      ? 'Pick a crayon and colour your shark. Make it any colour you like!'
      : instructionFor(d);
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
      <div class="draw-picks" role="group" aria-label="Choose what to draw">${seaDrawings.map(x => `<button class="draw-pick${x.id === drawing.id ? ' chosen' : ''}${(state.drawings || []).some(r => r.subject === x.id) ? ' drawn' : ''}" data-draw-pick="${x.id}" aria-label="Draw a ${x.name.toLowerCase()}" aria-pressed="${x.id === drawing.id}">${drawingThumb(x)}</button>`).join('')}</div>
      <button class="draw-say" id="drawSay" aria-label="Hear Dash again">${paintedIcon('speaker-blue')} <span>${stepping ? `<b>${step.name}</b>` : colouring ? '🖍️' : '✏️'}</span></button>
    </div>
    <div class="draw-board"><svg viewBox="${view.x} ${view.y} ${view.w} ${view.h}" aria-hidden="true">${guide}</svg>${d.mode === 'free' ? `<svg class="draw-model" viewBox="${view.x - 8} ${view.y - 8} ${view.w + 16} ${view.h + 16}" aria-label="A ${drawing.name.toLowerCase()} to copy">${model}</svg>` : ''}<canvas id="drawCanvas" aria-label="Drawing page. Draw with your finger or Apple Pencil."></canvas></div>
    <div class="draw-tools">
      ${stepping ? `<button id="drawWatch" class="draw-tool" aria-label="Watch how">👀</button>` : crayons}
      <button id="drawPen" class="draw-tool" aria-label="Pencil" aria-pressed="${d.tool === 'pen'}">✏️</button>
      <button id="drawEraser" class="draw-tool" aria-label="Eraser" aria-pressed="${d.tool === 'erase'}"><span class="eraser-icon" aria-hidden="true"></span></button>
      <button id="drawUndo" class="draw-tool" aria-label="Undo">↶</button>
      <button id="drawClear" class="draw-tool" aria-label="Start this part again">🧽</button>
      ${stepping ? `<button id="drawNext" class="draw-go" aria-label="${d.step === sharkDrawSteps.length - 1 ? 'Finish drawing' : 'Next part'}">▶</button>` : `<button id="drawDone" class="draw-go" aria-label="I finished my drawing" ${d.saved ? 'disabled' : ''}>✓</button>`}
    </div></section>`;

  $('#drawSay').onclick = () => dashSays(instruction);
  document.querySelectorAll('[data-draw-pick]').forEach(
    b =>
      (b.onclick = () => {
        if (b.dataset.drawPick === drawing.id) return;
        sharkDraw = {
          mode: d.mode,
          subject: b.dataset.drawPick,
          step: 0,
          strokes: [],
          colour: '#20313a',
          tool: 'pen',
          saved: false
        };
        drawShark();
        if (sharkDraw.mode === 'free') dashSays(instructionFor(sharkDraw));
      })
  );
  document.querySelectorAll('[data-draw-mode]').forEach(
    b =>
      (b.onclick = () => {
        if (b.dataset.drawMode === d.mode) return;
        sharkDraw = {
          mode: b.dataset.drawMode,
          subject: d.subject,
          step: 0,
          strokes: [],
          colour: '#20313a',
          tool: 'pen',
          saved: false
        };
        drawShark();
        if (sharkDraw.mode === 'free') dashSays(instructionFor(sharkDraw));
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
      // Same pen size on screen whichever animal (smaller animals are zoomed in more).
      width: (erase ? 22 : colouring ? 14 : 5) * (view.w / 320),
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
      else dashSays(drawing.done);
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
        kind: d.mode === 'steps' ? 'steps' : 'free',
        subject: drawing.id,
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
      dashSays('Great job! Fin-tastic!');
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
    dashSays(drawing.intro + ' ' + step.say);
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
    '<button id="drawSharkLink" class="draw-shark-link" aria-label="Drawing school: draw sea animals with Dash">🎨 Draw sea animals</button>'
  );
  $('#drawSharkLink').onclick = startSharkDrawing;
};
