/* Sea animals (29 October 2026): the counting animals, pattern animals, sharing tokens and home-reef
 * fish, redrawn in the soft painted style of the lesson pictures (pictures.js) and library scenes
 * (scenes.js): soft radial shading, a darker outline of the same colour, a little shine in each eye
 * and a soft ground shadow. Replaces the flat drawings that lived in ocean-experience.js.
 *
 * seaAnimal(kind) keeps the old contract so every caller is unchanged: a 200 x 112 <svg> with the
 * classes "sea-animal animal-<kind>" and a spoken label. Fish face left (head near x 24), as before.
 * Kinds: salmon, tuna, squid, crab, barracuda, turtle, blue-tang, clownfish, hammerhead, dolphin,
 * octopus. Anything else draws a tuna. Loaded before ocean-experience.js. */
const oceanSpecies = ['salmon', 'tuna', 'squid', 'crab', 'barracuda', 'turtle', 'blue-tang', 'clownfish', 'hammerhead'];

const seaAnimal = (function () {
  let uid = 0;
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const mix = (h, t, k) =>
    '#' + hex(h).map((v, i) => Math.round(v + (hex(t)[i] - v) * k).toString(16).padStart(2, '0')).join('');
  const light = (h, k = 0.34) => mix(h, '#ffffff', k),
    dark = (h, k = 0.3) => mix(h, '#000000', k);

  function kit() {
    const id = 'sa' + ++uid,
      defs = [],
      made = {};
    const fill = col => {
      if (!made[col]) {
        made[col] = `${id}-${Object.keys(made).length}`;
        defs.push(
          `<radialGradient id="${made[col]}" cx=".38" cy=".3" r=".9"><stop offset="0" stop-color="${light(col)}"/><stop offset=".55" stop-color="${col}"/><stop offset="1" stop-color="${dark(col, 0.2)}"/></radialGradient>`
        );
      }
      return `url(#${made[col]})`;
    };
    const look = (col, o = {}) =>
      o.flat
        ? `fill="${col}"${o.op ? ` opacity="${o.op}"` : ''}`
        : `fill="${fill(col)}" stroke="${dark(col, 0.42)}" stroke-width="${o.w || 2.4}" stroke-linejoin="round"${o.op ? ` opacity="${o.op}"` : ''}`;
    const k = {
      p: (d, col, o) => `<path d="${d}" ${look(col, o)}/>`,
      c: (cx, cy, r, col, o) => `<circle cx="${cx}" cy="${cy}" r="${r}" ${look(col, o)}/>`,
      e: (cx, cy, rx, ry, col, o) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" ${look(col, o)}/>`,
      l: (d, col, w = 2.4, o = {}) =>
        `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${o.op ? ` opacity="${o.op}"` : ''}/>`,
      eye: (cx, cy, s = 5) =>
        `<circle cx="${cx}" cy="${cy}" r="${s + 1.6}" fill="#fff"/><circle cx="${cx}" cy="${cy}" r="${s}" fill="#22313b"/><circle cx="${cx - s * 0.32}" cy="${cy - s * 0.36}" r="${s * 0.38}" fill="#fff"/>`,
      // Draw `inner` only where `shape` is (stripes and bands that follow the body).
      clip: (shape, inner) => {
        const cid = `${id}-c${defs.length}`;
        defs.push(`<clipPath id="${cid}"><path d="${shape}"/></clipPath>`);
        return `<g clip-path="url(#${cid})">${inner}</g>`;
      },
      shadow: (cx = 100, rx = 70) => `<ellipse cx="${cx}" cy="104" rx="${rx}" ry="5" fill="#0b2d3a" opacity=".14"/>`,
      done: body => `<defs>${defs.join('')}</defs>${body}`
    };
    return k;
  }

  // A fish facing left, in parts, so each kind can change the shape and add its own markings.
  const FISH = 'M22 56Q56 20 124 32Q150 38 160 56Q150 74 124 80Q56 92 22 56Z';
  function fish(k, o) {
    const body = o.body || FISH;
    return (
      k.shadow(96, 64) +
      k.p(o.tail || 'M152 56L188 26Q176 56 188 86Z', o.fin || dark(o.top, 0.08)) +
      k.p(o.dorsal || 'M78 34Q98 6 126 36Z', o.fin || dark(o.top, 0.08)) +
      k.p(o.anal || 'M100 78Q118 98 132 76Z', o.fin || dark(o.top, 0.08)) +
      k.p(body, o.top) +
      k.clip(body, (o.belly ? k.p(o.bellyPath || 'M10 62Q80 76 170 58V100H10Z', o.belly, { flat: 1 }) : '') + (o.marks || '')) +
      `<path d="${body}" fill="none" stroke="${dark(o.top, 0.42)}" stroke-width="2.4" stroke-linejoin="round"/>` +
      k.l(o.gill || 'M60 40Q70 56 60 74', dark(o.top, 0.35), 2, { op: 0.55 }) +
      k.p(o.pectoral || 'M66 62Q82 78 96 68Q82 58 66 62Z', o.fin || dark(o.top, 0.08)) +
      k.l('M42 36Q52 30 62 30', '#ffffff', 3, { op: 0.55 }) +
      k.eye(o.eyeX || 42, o.eyeY || 50, o.eyeR || 5.2) +
      k.l(o.mouth || 'M24 60Q30 63 36 60', dark(o.top, 0.5), 2.2) +
      (o.extra || '')
    );
  }

  const A = {
    tuna: k =>
      fish(k, {
        top: '#2f63a3',
        belly: '#e3eef0',
        marks: '<path d="M30 58Q90 66 160 56" fill="none" stroke="#f2c94c" stroke-width="3" opacity=".7"/>',
        extra: [126, 134, 142]
          .map(x => `<path d="M${x} 38l5-4 1 6Z M${x} 74l5 4 1-6Z" fill="#f2c94c" stroke="#c99a24" stroke-width="1"/>`)
          .join('')
      }),
    salmon: k =>
      fish(k, {
        top: '#7fa6a8',
        belly: '#f4bfa6',
        marks: [[84, 40], [98, 46], [110, 38], [124, 46], [136, 52], [92, 34]]
          .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" fill="#365c64"/>`)
          .join('')
      }),
    barracuda: k =>
      fish(k, {
        top: '#8aa6b4',
        belly: '#eef3f1',
        body: 'M8 58Q44 40 128 44Q158 48 168 56Q158 64 128 68Q44 74 8 58Z',
        bellyPath: 'M0 60Q80 68 180 58V100H0Z',
        tail: 'M160 56L192 34Q182 56 192 78Z',
        dorsal: 'M92 46Q104 30 116 46Z',
        anal: 'M106 66Q116 80 126 66Z',
        gill: 'M44 48Q50 58 44 66',
        pectoral: 'M52 62Q62 72 72 66Q62 58 52 62Z',
        eyeX: 28,
        eyeY: 53,
        eyeR: 4.2,
        mouth: 'M9 59L26 61M10 57L22 54',
        marks: [70, 86, 102, 118, 134].map(x => `<path d="M${x} 42L${x + 6} 70" stroke="#4d6878" stroke-width="4" opacity=".35"/>`).join('')
      }),
    'blue-tang': k =>
      fish(k, {
        top: '#2b7fd6',
        fin: '#2464b0',
        body: 'M26 56Q46 20 108 22Q150 26 160 56Q150 86 108 90Q46 92 26 56Z',
        tail: 'M154 56L186 32Q178 56 186 80Z',
        dorsal: 'M60 26Q100 4 146 34Q110 22 60 26Z',
        anal: 'M66 88Q104 104 142 78Q104 90 66 88Z',
        eyeX: 46,
        eyeY: 48,
        marks:
          '<path d="M64 34Q120 18 150 50Q134 62 112 48Q96 40 76 50Q60 54 64 34Z" fill="#163a66"/><path d="M84 66Q110 60 132 70" fill="none" stroke="#163a66" stroke-width="5" stroke-linecap="round"/>',
        extra: '<path d="M154 56L186 32Q178 56 186 80Z" fill="#ffd84a" stroke="#c9a12a" stroke-width="2.2" stroke-linejoin="round"/>'
      }),
    clownfish: k =>
      fish(k, {
        top: '#f7862e',
        body: 'M24 56Q46 24 104 26Q148 30 158 56Q148 82 104 86Q46 88 24 56Z',
        tail: 'M150 56Q172 30 186 40Q178 56 186 72Q172 82 150 56Z',
        dorsal: 'M62 30Q80 10 100 28Q118 12 136 36Z',
        anal: 'M90 84Q108 100 126 80Z',
        eyeX: 40,
        eyeY: 50,
        marks: [
          'M56 20Q48 56 58 92L74 92Q64 56 72 20Z',
          'M98 20Q90 56 100 92L116 92Q106 56 114 20Z',
          'M140 26Q134 56 142 88L160 88Q150 56 156 26Z'
        ]
          .map(d => `<path d="${d}" fill="#fffaf0" stroke="#2c3238" stroke-width="2.6"/>`)
          .join(''),
        extra: '<path d="M150 56Q172 30 186 40Q178 56 186 72Q172 82 150 56Z" fill="none" stroke="#2c3238" stroke-width="2.6"/>'
      }),
    hammerhead: k =>
      fish(k, {
        top: '#7ea6b2',
        belly: '#e7efec',
        body: 'M30 56Q60 30 126 38Q154 44 162 56Q154 68 126 74Q60 82 30 56Z',
        tail: 'M154 56L190 22Q180 50 186 58L176 64Q170 76 178 88Z',
        dorsal: 'M84 40Q96 6 112 40Z',
        anal: 'M112 72Q120 86 130 70Z',
        pectoral: 'M70 66Q86 92 100 70Z',
        gill: 'M58 46V66M64 45V67M70 45V67',
        eyeX: 14,
        eyeY: 32,
        eyeR: 3.8,
        mouth: 'M30 64Q36 67 42 64',
        extra:
          k.p('M36 44Q24 40 18 26Q12 22 8 28Q10 56 8 84Q12 90 18 86Q24 72 36 68Z', '#7ea6b2') +
          k.eye(13, 32, 3.8) +
          k.eye(13, 80, 3.8) +
          k.l('M22 32Q30 30 34 36', '#ffffff', 2.4, { op: 0.6 })
      }),
    dolphin: k =>
      k.shadow(96, 70) +
      k.p('M150 54L188 30Q176 56 188 80Z', '#6f9fb8') +
      k.p('M92 36Q106 4 122 38Z', '#6f9fb8') +
      k.p('M10 60Q20 54 34 54Q60 26 124 36Q156 44 160 56Q150 76 112 80Q60 86 34 66Q20 66 10 60Z', '#8ec2d4') +
      k.clip(
        'M10 60Q20 54 34 54Q60 26 124 36Q156 44 160 56Q150 76 112 80Q60 86 34 66Q20 66 10 60Z',
        '<path d="M10 62Q60 70 130 64Q160 62 170 58V100H10Z" fill="#eaf5f7"/>'
      ) +
      '<path d="M10 60Q20 54 34 54Q60 26 124 36Q156 44 160 56Q150 76 112 80Q60 86 34 66Q20 66 10 60Z" fill="none" stroke="#4d7b8f" stroke-width="2.4" stroke-linejoin="round"/>' +
      k.p('M78 70Q90 94 104 72Z', '#6f9fb8') +
      k.l('M50 40Q64 32 80 32', '#ffffff', 3, { op: 0.55 }) +
      k.eye(46, 52, 4.4) +
      k.l('M12 61Q24 64 36 62', '#33586a', 2.2),
    turtle: k =>
      k.shadow(104, 66) +
      // flippers, head (facing left) and tail
      k.p('M62 40Q36 14 18 22Q30 40 56 50Z', '#a9c97f') +
      k.p('M66 74Q42 100 24 94Q34 76 60 66Z', '#a9c97f') +
      k.p('M140 42Q166 20 180 28Q170 44 146 52Z', '#a9c97f') +
      k.p('M140 72Q162 92 176 86Q168 72 146 64Z', '#a9c97f') +
      k.p('M150 56L172 52L156 64Z', '#a9c97f') +
      k.e(40, 56, 22, 16, '#b5d18c') +
      k.eye(32, 51, 4) +
      k.l('M20 60Q26 63 32 61', '#4f6b3a', 2.2) +
      // shell with plates
      k.e(102, 56, 50, 34, '#5f9a64') +
      k.clip(
        'M52 56A50 34 0 1 0 152 56A50 34 0 1 0 52 56Z',
        '<g fill="none" stroke="#b9d68f" stroke-width="3.5" stroke-linejoin="round" opacity=".9"><path d="M84 36L102 28L120 36L122 56L102 66L82 56Z"/><path d="M82 56L62 62M122 56L142 62M84 36L70 26M120 36L134 26M102 66V90M82 56L72 80M122 56L132 80"/></g>'
      ) +
      k.l('M74 34Q90 24 108 24', '#ffffff', 3.5, { op: 0.5 }),
    crab: k =>
      k.shadow(100, 62) +
      // legs
      k.l('M64 66L34 72L22 90M66 74L40 86L34 100M70 80L52 96M136 66L166 72L178 90M134 74L160 86L166 100M130 80L148 96', '#c74c3a', 6) +
      // arms and claws
      k.l('M66 52L44 38M134 52L156 38', '#c74c3a', 7) +
      k.p('M30 38Q14 24 26 10L36 22L44 8Q60 22 44 40Q38 46 30 38Z', '#ee6f55') +
      k.p('M170 38Q186 24 174 10L164 22L156 8Q140 22 156 40Q162 46 170 38Z', '#ee6f55') +
      // eye stalks
      k.l('M86 40V22M114 40V22', '#e2614a', 5) +
      // body
      k.e(100, 62, 44, 28, '#ee6f55') +
      k.l('M76 46Q92 38 112 40', '#ffffff', 3.5, { op: 0.5 }) +
      k.eye(86, 20, 5) +
      k.eye(114, 20, 5) +
      k.l('M90 70Q100 77 110 70', '#7a2a20', 2.6) +
      `<circle cx="80" cy="66" r="4" fill="#f59a8a" opacity=".7"/><circle cx="120" cy="66" r="4" fill="#f59a8a" opacity=".7"/>`,
    squid: k =>
      k.shadow(104, 70) +
      // tentacles trailing left
      k.l('M70 48Q40 26 18 34M70 54Q36 46 10 56M70 60Q36 70 14 82M72 66Q46 90 26 98', '#d887ac', 5.5) +
      k.l('M70 52Q30 38 22 20M72 64Q40 98 46 104', '#d887ac', 4) +
      [[18, 34], [10, 56], [14, 82], [26, 98]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="#e9a3c3"/>`).join('') +
      // mantle pointing right, with fins
      k.p('M150 56L176 30Q192 56 176 82Z', '#d887ac') +
      k.p('M64 56Q72 34 110 32Q152 34 172 56Q152 78 110 80Q72 78 64 56Z', '#eeb4cf') +
      [[118, 44], [132, 62], [146, 50], [104, 66]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#d06f9b" opacity=".7"/>`).join('') +
      k.l('M90 40Q108 34 128 36', '#ffffff', 3.5, { op: 0.55 }) +
      k.eye(84, 52, 6) +
      k.l('M70 62Q76 66 82 62', '#8a3c62', 2.2),
    octopus: k =>
      k.shadow(100, 72) +
      k.l(
        'M72 62Q40 96 18 80Q10 72 20 70M84 70Q60 104 40 100M96 74Q92 106 74 104M108 74Q114 106 130 102M120 70Q146 104 166 96M130 62Q164 92 184 76Q190 68 180 66',
        '#c98ad2',
        11
      ) +
      k.l(
        'M72 62Q40 96 18 80M84 70Q60 104 40 100M96 74Q92 106 74 104M108 74Q114 106 130 102M120 70Q146 104 166 96M130 62Q164 92 184 76',
        '#e3b6e8',
        3,
        { op: 0.6 }
      ) +
      k.p('M60 56Q60 10 100 10Q140 10 140 56Q140 78 100 78Q60 78 60 56Z', '#d79ce0') +
      k.l('M76 26Q86 16 102 16', '#ffffff', 4, { op: 0.55 }) +
      k.eye(86, 46, 5.4) +
      k.eye(114, 46, 5.4) +
      k.l('M92 62Q100 68 108 62', '#7a3f86', 2.6) +
      `<circle cx="76" cy="58" r="4.5" fill="#f2a7c8" opacity=".7"/><circle cx="124" cy="58" r="4.5" fill="#f2a7c8" opacity=".7"/>`
  };

  const NAMES = { 'blue-tang': 'blue tang', tuna: 'bluefin tuna' };
  return function seaAnimal(kind = 'tuna') {
    const draw = A[kind] ? kind : 'tuna';
    const k = kit();
    return `<svg class="sea-animal animal-${kind}" viewBox="0 0 200 112" role="img" aria-label="Cartoon ${NAMES[kind] || kind}">${k.done(A[draw](k))}</svg>`;
  };
})();
