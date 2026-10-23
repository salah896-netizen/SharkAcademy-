// Stroke paths use a consistent 400 × 300 practice board. Each array item is one pen-down stroke.
const letterStrokes = {
  c: {
    paths: ['M260 100 C150 30 105 240 260 210'],
    tip: 'Start at the dot. Curve around to make a c.'
  },
  a: {
    paths: ['M245 110 C125 65 120 240 230 210 Q250 198 245 110', 'M245 110 L245 220'],
    tip: 'Go around first. Then start at the top and draw down.'
  },
  t: {
    paths: ['M205 45 L205 220 Q210 238 238 220', 'M155 110 L255 110'],
    tip: 'Down and a little hook. Lift your finger, then cross.'
  },
  f: {
    paths: ['M250 55 Q195 15 185 85 L185 235', 'M145 110 L245 110'],
    tip: 'Curve over and down. Then cross the middle.'
  },
  i: {
    paths: ['M205 110 L205 220', 'M205 70 L205 73'],
    tip: 'Draw down. Lift your finger and add a dot.'
  },
  n: {
    paths: ['M155 110 L155 220', 'M155 160 Q160 90 205 110 Q245 115 245 155 L245 220'],
    tip: 'Down first. Return to the middle, go over and down.'
  },
  s: {
    paths: ['M250 115 C185 70 125 135 200 160 C285 190 215 245 150 205'],
    tip: 'Curve around, turn, and curve back the other way.'
  },
  m: {
    paths: [
      'M125 110 L125 220',
      'M125 155 Q145 75 195 125 L195 220',
      'M195 150 Q225 75 270 125 L270 220'
    ],
    tip: 'Draw down. Make one hill, then another hill.'
  },
  h: {
    paths: ['M155 45 L155 220', 'M155 160 Q165 90 215 115 Q245 130 245 165 L245 220'],
    tip: 'Tall line down. Then start halfway, curve over and down.'
  },
  y: {
    paths: ['M145 110 L200 205', 'M255 110 L175 270'],
    tip: 'Slant down. Lift your finger, then slant down the other way.'
  },
  H: {
    paths: ['M145 50 L145 220', 'M255 50 L255 220', 'M145 135 L255 135'],
    tip: 'Two tall lines down. Then a bridge across the middle.'
  },
  0: {
    paths: ['M205 55 C110 55 110 225 205 225 C295 225 295 55 205 55'],
    tip: 'Start at the top and go all the way around.'
  },
  1: { paths: ['M175 85 L205 55 L205 225'], tip: 'A little slope up, then a long line down.' },
  2: {
    paths: ['M140 95 C140 20 280 30 260 110 Q250 140 140 225 L270 225'],
    tip: 'Curve over, slide down, then go across the bottom.'
  },
  3: {
    paths: ['M145 70 C270 10 290 140 200 140 C300 140 280 270 140 215'],
    tip: 'Curve around once, then curve around again.'
  },
  4: {
    paths: ['M230 55 L130 165 L280 165', 'M240 55 L240 225'],
    tip: 'Slant down and go across. Then draw a tall line down.'
  },
  5: {
    paths: ['M270 55 L150 55 L150 135 C295 95 295 265 145 215'],
    tip: 'Across, down, and then a big curve around.'
  },
  6: {
    paths: ['M250 55 C130 35 95 250 205 225 C300 210 260 105 170 140'],
    tip: 'Curve down and around, then close the little loop.'
  },
  7: { paths: ['M130 55 L275 55 L175 225'], tip: 'Across the top, then slant down.' },
  8: {
    paths: [
      'M205 140 C100 105 150 25 215 55 C290 90 220 125 205 140 C100 170 150 260 220 225 C300 190 230 150 205 140'
    ],
    tip: 'Curve around the top, cross the middle, then loop around the bottom.'
  },
  9: {
    paths: ['M245 135 C135 180 120 45 205 55 Q260 55 245 135 L210 225'],
    tip: 'Make a small loop, then draw down.'
  }
};
Object.assign(letterStrokes, {
  b: {
    paths: ['M150 45 L150 220', 'M150 150 C270 45 285 260 150 210'],
    tip: 'Tall line down. Start halfway and curve around.'
  },
  d: {
    paths: ['M245 110 C125 65 120 240 230 210 Q250 198 245 110', 'M245 45 L245 220'],
    tip: 'Make the round part. Then a tall line down.'
  },
  e: {
    paths: ['M145 160 L255 160 C255 70 125 85 140 175 Q155 245 255 205'],
    tip: 'Across the middle, around the top, and curve back down.'
  },
  g: {
    paths: [
      'M245 110 C125 65 120 240 230 210 Q250 198 245 110',
      'M245 110 L245 245 Q240 285 165 255'
    ],
    tip: 'Make a round part. Then go down below the line and curve.'
  },
  j: {
    paths: ['M220 110 L220 245 Q210 285 165 255', 'M220 70 L220 73'],
    tip: 'Down below the line and a hook. Then add a dot.'
  },
  k: {
    paths: ['M160 45 L160 220', 'M250 110 L160 165 L255 220'],
    tip: 'Tall line down. Slant in to the middle, then out.'
  },
  l: { paths: ['M205 45 L205 220'], tip: 'Start high. Draw one tall line down.' },
  o: {
    paths: ['M205 105 C115 105 115 225 205 225 C295 225 295 105 205 105'],
    tip: 'Start at the top. Go around and close the circle.'
  },
  p: {
    paths: ['M150 110 L150 270', 'M150 145 C270 50 285 255 150 210'],
    tip: 'Down below the line. Return to the top and curve around.'
  },
  q: {
    paths: ['M245 110 C125 65 120 240 230 210 Q250 198 245 110', 'M245 110 L245 270'],
    tip: 'Make a round part, then draw down below the line.'
  },
  r: {
    paths: ['M165 110 L165 220', 'M165 150 Q185 90 240 115'],
    tip: 'Draw down. Return halfway up and curve over.'
  },
  u: {
    paths: ['M150 110 L150 190 Q150 250 245 205 L245 110', 'M245 110 L245 220'],
    tip: 'Down, around and up. Then finish with a line down.'
  },
  v: { paths: ['M140 110 L200 225 L260 110'], tip: 'Slant down to a point, then slant up.' },
  w: {
    paths: ['M100 110 L150 225 L200 135 L250 225 L300 110'],
    tip: 'Down, up, down, up. Make two little valleys.'
  },
  x: {
    paths: ['M145 110 L255 225', 'M255 110 L145 225'],
    tip: 'One slant down. Lift, then cross it with another slant.'
  },
  z: {
    paths: ['M145 110 L255 110 L145 225 L255 225'],
    tip: 'Across, slant down, then across again.'
  }
});
let writingChoice = 'c',
  writingMode = 'trace',
  writingCleanup = null;
function writing() {
  if (writingCleanup) writingCleanup();
  const phrase =
      writingChoice === 'name'
        ? 'Haytham'
        : ['cat', 'fin', 'shark'].includes(writingChoice)
          ? writingChoice
          : null,
    name = !!phrase,
    guide = letterStrokes[writingChoice];
  app.innerHTML = `<section class="writing-page"><div class="article-top"><a href="#home" class="back-link">← Back to reef</a><button id="writingListen" class="listen">♫ Listen</button></div><span class="tag">WRITING LAGOON</span><h1>Write with Milo</h1><p class="writing-intro">A finger or an Apple Pencil. A little practice. A big discovery.</p><div class="writing-controls"><label>Practise <select id="writingChoice"><optgroup label="Letters">${Object.keys(
    letterStrokes
  )
    .filter(c => isNaN(Number(c)))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map(c => `<option value="${c}">${c}</option>`)
    .join(
      ''
    )}</optgroup><optgroup label="Numbers">${Array.from({ length: 10 }, (_, i) => `<option value="${i}">${i}</option>`).join('')}</optgroup><option value="name">My name: Haytham</option><optgroup label="Words"><option value="cat">cat</option><option value="fin">fin</option><option value="shark">shark</option></optgroup></select></label><div class="segmented" role="group" aria-label="Writing mode"><button data-writing-mode="trace" aria-pressed="${writingMode === 'trace'}">Trace</button><button data-writing-mode="free" aria-pressed="${writingMode === 'free'}">Try on my own</button></div></div><div class="writing-hint"><span>✎</span><p>${writingMode === 'free' ? 'Try it yourself. You can bring the guide back whenever you like.' : name ? (writingChoice === 'name' ? 'Trace your name. Start with the capital H, then follow the smaller letters.' : 'Trace the letters in ' + phrase + '. Work from left to right.') : guide.tip}</p></div><div class="writing-board"><svg id="writingGuide" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true"><path d="M0 55H400 M0 110H400 M0 225H400" stroke="#b5d5d8" stroke-width="1" stroke-dasharray="5 6"/>${
    writingMode === 'trace'
      ? name
        ? Array.from(phrase)
            .map(
              (c, i) =>
                `<g transform="translate(${(400 - phrase.length * 48) / 2 + i * 48} 85) scale(.3 .5) translate(-120 0)">${letterStrokes[c].paths.map(d => `<path d="${d}" fill="none" stroke="#a4c6c8" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}</g>`
            )
            .join('')
        : guide.paths
            .map((d, i) => {
              const m = d.match(/M([\d.]+) ([\d.]+)/);
              return `<path d="${d}" fill="none" stroke="#a4c6c8" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#f1f9f7" stroke-width="2" stroke-dasharray="3 6"/>${writingStartMarker(guide.paths, i)}`;
            })
            .join('')
      : ''
  }</svg><canvas id="writingCanvas" aria-label="Writing practice area. Draw with your finger or Apple Pencil."></canvas></div><div class="writing-toolbar"><button id="showStrokes" class="quiet">▷ Watch strokes</button><button id="undoInk" class="quiet">↶ Undo</button><button id="clearInk" class="quiet">Clear page</button><button id="finishWriting" class="primary">I practised! ✓</button></div><p id="writingFeedback" aria-live="polite" class="writing-feedback">${writingMode === 'free' ? 'Try your own writing. Bring the guide back whenever you like.' : name ? 'Follow the letters from left to right. Lift your finger between strokes.' : 'Follow the numbered dots. Lift your finger between strokes.'}</p><p class="muted">Every attempt is practice. A grown-up can help with letter shape and pencil grip.</p></section>`;
  $('#writingChoice').value = writingChoice;
  $('#writingChoice').onchange = e => {
    writingChoice = e.target.value;
    writing();
  };
  document.querySelectorAll('[data-writing-mode]').forEach(
    b =>
      (b.onclick = () => {
        writingMode = b.dataset.writingMode;
        writing();
      })
  );
  $('#writingListen').onclick = () =>
    helperSpeak(
      name
        ? 'Let’s write ' + phrase + '. Work from left to right.'
        : `Let’s write ${writingChoice}. ${guide.tip}`
    );
  $('#showStrokes').onclick = () => {
    const svg = $('#writingGuide');
    svg.querySelectorAll('.stroke-demo').forEach(p => p.remove());
    if (name || writingMode === 'free') {
      $('#writingFeedback').textContent =
        'Choose a single letter or number in Trace mode to watch its strokes.';
      return;
    }
    guide.paths.forEach((d, i) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('class', 'stroke-demo');
      path.setAttribute('pathLength', '1');
      path.style.animationDelay = i * 1.8 + 's';
      svg.append(path);
    });
    $('#writingFeedback').textContent =
      'Watch the stroke begin at each numbered dot. Then have a go.';
  };
  const canvas = $('#writingCanvas'),
    ctx = canvas.getContext('2d');
  let strokes = [],
    active = null,
    pointer = null,
    practiceSaved = false;
  const point = e => {
    const r = canvas.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * 400, y: ((e.clientY - r.top) / r.height) * 300 };
  };
  function draw() {
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
    const groove = ctx.createLinearGradient(0, 60, 0, 250);
    groove.addColorStop(0, '#72502f');
    groove.addColorStop(0.5, '#996d3c');
    groove.addColorStop(1, '#785431');
    ctx.strokeStyle = groove;
    ctx.fillStyle = '#8d6238';
    ctx.shadowColor = '#fff1c5';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetY = 2;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const stroke of strokes) {
      if (stroke.length === 1) {
        ctx.beginPath();
        ctx.arc(stroke[0].x, stroke[0].y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(stroke[0].x, stroke[0].y);
        stroke.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
        ctx.stroke();
      }
    }
  }
  function end(e) {
    if (pointer !== e.pointerId) return;
    active = null;
    pointer = null;
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
  }
  canvas.onpointerdown = e => {
    if (pointer !== null || !e.isPrimary) return;
    e.preventDefault();
    pointer = e.pointerId;
    active = [point(e)];
    strokes.push(active);
    canvas.setPointerCapture(e.pointerId);
    draw();
  };
  canvas.onpointermove = e => {
    if (pointer !== e.pointerId || !active) return;
    e.preventDefault();
    for (const sample of e.getCoalescedEvents ? e.getCoalescedEvents() : [e])
      active.push(point(sample));
    draw();
  };
  canvas.onpointerup = end;
  canvas.onpointercancel = end;
  canvas.onlostpointercapture = () => {
    pointer = null;
    active = null;
  };
  $('#undoInk').onclick = () => {
    strokes.pop();
    draw();
  };
  $('#clearInk').onclick = () => {
    strokes = [];
    active = null;
    draw();
  };
  $('#finishWriting').onclick = () => {
    if (!strokes.some(s => s.length > 3)) {
      $('#writingFeedback').textContent = 'Try making some marks on the page first.';
      return;
    }
    if (practiceSaved) return;
    practiceSaved = true;
    state.writingHistory = state.writingHistory || [];
    state.writingHistory.push({
      character: writingChoice,
      mode: writingMode,
      aspect: Number(
        (canvas.getBoundingClientRect().width / canvas.getBoundingClientRect().height).toFixed(4)
      ),
      ink: strokes
        .slice(0, 40)
        .map(s =>
          s
            .filter(
              (_, i) => i % Math.max(1, Math.ceil(s.length / 300)) === 0 || i === s.length - 1
            )
            .map(p => ({ x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10 }))
        ),
      at: new Date().toISOString()
    });
    state.xp += 6;
    const advanced = advanceLearning('writing');
    save();
    $('#writingFeedback').textContent =
      'Lovely practising, Haytham! Six pearls earned. Choose another letter when you’re ready.';
    $('#finishWriting').disabled = true;
    encourage(
      advanced
        ? 'You’ve tried lots of writing, Haytham. Let’s try a little more on your own next time.'
        : 'Lovely practising, Haytham! Every try helps you learn.'
    );
  };
  const observer = new ResizeObserver(draw);
  observer.observe(canvas);
  writingCleanup = () => {
    observer.disconnect();
    writingCleanup = null;
  };
  draw();
  updateMilo(
    'Let’s practise ' +
      (phrase || writingChoice) +
      '. ' +
      (writingMode === 'free'
        ? 'Have a go yourself. I’m here if you need the guide.'
        : name
          ? 'Work from left to right.'
          : guide.tip)
  );
}

function writingStartMarker(paths, index) {
  const points = paths.map(path => path.match(/M([\d.]+) ([\d.]+)/)),
    point = points[index];
  if (!point) return '';
  const shared = points
    .map((p, i) => (p && p[1] === point[1] && p[2] === point[2] ? i : -1))
    .filter(i => i >= 0);
  if (shared[0] !== index) return '';
  return `<circle cx="${point[1]}" cy="${point[2]}" r="${shared.length > 1 ? 15 : 10}" fill="#148b84"/><text x="${point[1]}" y="${+point[2] + 3.5}" text-anchor="middle" fill="white" font-size="${shared.length > 1 ? 9 : 10}">${shared.map(i => i + 1).join(', ')}</text>`;
}
