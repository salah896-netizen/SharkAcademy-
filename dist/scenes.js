/* Painted scenes (28 October 2026): the library cards, the Shark race track cards and the library
 * background, in the same soft painted style as the lesson pictures (pictures.js): soft radial
 * shading, a darker outline of the same colour, and gentle shadows. Replaces the old mix of
 * generated photos, emoji and flat CSS drawings on those screens.
 *
 * paintedScene(name) returns an <svg> for a wide card (350 x 100 board, cropped to fit its frame
 * with the subject kept near the middle). Names: path, reading, maths, writing, science, museum,
 * stories, collection, expeditions, race, and the race tracks lagoon, reef, ocean, trench. */
(function () {
  let uid = 0;
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const mix = (h, t, k) =>
    '#' + hex(h).map((v, i) => Math.round(v + (hex(t)[i] - v) * k).toString(16).padStart(2, '0')).join('');
  const light = (h, k = 0.35) => mix(h, '#ffffff', k),
    dark = (h, k = 0.3) => mix(h, '#000000', k);

  // One scene's drawing kit: shaded shapes that share one <defs>.
  function kit() {
    const id = 'sc' + ++uid,
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
        : `fill="${fill(col)}" stroke="${dark(col, 0.42)}" stroke-width="${o.w || 1.8}" stroke-linejoin="round"${o.op ? ` opacity="${o.op}"` : ''}`;
    const k = {
      p: (d, col, o) => `<path d="${d}" ${look(col, o)}/>`,
      c: (cx, cy, r, col, o) => `<circle cx="${cx}" cy="${cy}" r="${r}" ${look(col, o)}/>`,
      e: (cx, cy, rx, ry, col, o) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" ${look(col, o)}/>`,
      r: (x, y, w, h, rx, col, o) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ${look(col, o)}/>`,
      l: (d, col, w = 2, o = {}) =>
        `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}${o.op ? ` opacity="${o.op}"` : ''}/>`,
      shadow: (cx, cy, rx, ry = 5) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#0b2d3a" opacity=".16"/>`,
      eye: (cx, cy, s = 2.6) =>
        `<circle cx="${cx}" cy="${cy}" r="${s}" fill="#22313b"/><circle cx="${cx + s * 0.35}" cy="${cy - s * 0.35}" r="${s * 0.36}" fill="#fff"/>`,
      // Sea backdrop: water gradient, soft light rays, sandy floor.
      sea: (top, bottom, floor, o = {}) => {
        const g = id + '-sea';
        defs.push(
          `<linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient>`,
          `<linearGradient id="${g}r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="${o.rays ?? 0.32}"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`,
          `<linearGradient id="${g}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${light(floor, 0.18)}"/><stop offset="1" stop-color="${dark(floor, 0.12)}"/></linearGradient>`
        );
        return (
          `<rect y="-40" width="350" height="140" fill="url(#${g})"/>` +
          `<path d="M78 -40L113 -40L40 100L-5 100Z M178 -40L198 -40L160 100L128 100Z M270 -40L310 -40L272 100L230 100Z M120 -40L132 -40L110 100L96 100Z" fill="url(#${g}r)"/>` +
          (o.noFloor ? '' : `<path d="M0 ${o.floorY || 82}Q90 ${(o.floorY || 82) - 8} 175 ${o.floorY || 82}T350 ${(o.floorY || 82) - 2}V100H0Z" fill="url(#${g}f)"/>`)
        );
      },
      bubbles: (pts, col = '#ffffff') =>
        pts
          .map(
            ([x, y, r]) =>
              `<circle cx="${x}" cy="${y}" r="${r}" fill="${col}" fill-opacity=".28" stroke="${col}" stroke-opacity=".75" stroke-width="1"/><circle cx="${x - r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.28}" fill="#fff" fill-opacity=".8"/>`
          )
          .join(''),
      weed: (x, h, col = '#5fa36e', flip = 1) =>
        `<path d="M${x} 100Q${x - 8 * flip} ${100 - h * 0.35} ${x + 2 * flip} ${100 - h * 0.6}Q${x + 10 * flip} ${100 - h * 0.85} ${x + 1 * flip} ${100 - h}Q${x + 12 * flip} ${100 - h * 0.8} ${x + 9 * flip} ${100 - h * 0.55}Q${x + 6 * flip} ${100 - h * 0.3} ${x + 9 * flip} 100Z" ${look(col)}/>`,
      shell: (x, y, s = 1, col = '#f3c9b4') =>
        `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-9 4Q-10 -8 0 -9Q10 -8 9 4Z" ${look(col)}/><path d="M-5 3L-3 -6M0 3V-8M5 3L3 -6" fill="none" stroke="${dark(col, 0.3)}" stroke-width="1.2" stroke-linecap="round"/></g>`,
      star: (x, y, s = 1, col = '#f39a62') => {
        const pts = [];
        for (let i = 0; i < 10; i++) {
          const a = -Math.PI / 2 + (i * Math.PI) / 5,
            rr = i % 2 ? 4.6 : 11;
          pts.push(`${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`);
        }
        return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M${pts.join('L')}Z" ${look(col)}/><circle cx="-2" cy="-1" r="1" fill="${light(col, 0.5)}"/><circle cx="2.5" cy="1.5" r="1" fill="${light(col, 0.5)}"/></g>`;
      },
      // A friendly cartoon shark (not one of the imaginary friends): body colour, facing right.
      shark: (x, y, s = 1, col = '#7f9fb2', flip = false) =>
        `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">` +
        `<path d="M-46 -2L-62 -18Q-58 -2 -63 14Z" ${look(dark(col, 0.08))}/>` +
        `<path d="M-6 -12L4 -30Q12 -18 12 -10Z" ${look(dark(col, 0.08))}/>` +
        `<path d="M-50 0Q-30 -16 6 -14Q34 -12 46 -2Q50 2 44 6Q22 16 -10 12Q-34 10 -50 0Z" ${look(col)}/>` +
        `<path d="M-30 6Q0 16 40 6Q30 14 4 15Q-18 14 -30 6Z" fill="#f4f1e8" opacity=".95"/>` +
        `<path d="M-2 8L-14 22Q-2 18 6 10Z" ${look(dark(col, 0.08))}/>` +
        `<path d="M24 -6V2M28 -6V2M32 -5V2" stroke="${dark(col, 0.4)}" stroke-width="1.3" stroke-linecap="round"/>` +
        `<circle cx="36" cy="-3" r="2.2" fill="#22313b"/><circle cx="36.8" cy="-3.8" r=".8" fill="#fff"/>` +
        `<path d="M34 4Q40 7 45 3" fill="none" stroke="#22313b" stroke-width="1.6" stroke-linecap="round"/></g>`,
      fish: (x, y, s = 1, col = '#f39039', flip = false) =>
        `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><path d="M-12 0L-20 -7Q-18 0 -20 7Z" ${look(dark(col, 0.1))}/><path d="M-14 0Q-4 -10 8 -6Q14 -3 14 0Q14 3 8 6Q-4 10 -14 0Z" ${look(col)}/><path d="M-3 -7Q-6 0 -3 7" fill="none" stroke="#fff6e8" stroke-width="2.4"/><circle cx="8" cy="-1.5" r="1.7" fill="#22313b"/><circle cx="8.5" cy="-2" r=".6" fill="#fff"/></g>`,
      svg: (body, label, vb = '0 0 350 100') =>
        `<svg class="painted-scene" viewBox="${vb}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label}"><defs>${defs.join('')}</defs>${body}</svg>`
    };
    return k;
  }

  const S = {};

  // ---------------------------------------------------------------- library cards
  S.path = k => {
    const islands = [
      [95, 66, 26],
      [175, 50, 22],
      [255, 64, 28]
    ];
    return k.svg(
      k.sea('#bfe9ee', '#7cc8d8', '#7cc8d8', { noFloor: 1, rays: 0.18 }) +
        k.l('M40 40Q50 30 62 40', '#ffffff', 1.6, { op: 0.6 }) +
        k.l('M300 28Q310 20 322 28', '#ffffff', 1.6, { op: 0.6 }) +
        k.l('M115 62Q140 40 158 50M195 50Q218 44 232 60', '#8a5b3a', 2.6, { dash: '1 7' }) +
        islands
          .map(
            ([x, y, w]) =>
              k.e(x, y + 6, w + 6, 8, '#9fd8e2', { flat: 1, op: 0.8 }) + k.e(x, y, w, 10, '#f1d6a0') + k.e(x - 4, y - 4, w * 0.55, 5, '#8bc98f')
          )
          .join('') +
        // palm on the middle island
        k.l('M175 46Q172 30 178 20', '#946640', 3.5) +
        k.p('M178 20Q165 14 158 22Q168 19 178 22Q170 26 166 34Q176 26 179 22Q186 26 190 33Q186 24 180 20Q190 15 198 20Q188 13 178 20Z', '#6cb256') +
        // a star on the first (done), a flag on the last
        k.star(95, 55, 0.9, '#f5c63c') +
        k.l('M262 58V30', '#7a5a3a', 2.4) +
        k.p('M262 30L282 36L262 43Z', '#e0473d') +
        // a friendly fin heading for the next island
        k.p('M214 74Q222 58 232 54Q230 66 236 74Z', '#7f97a6') +
        k.l('M204 76Q218 72 244 76', '#ffffff', 1.6, { op: 0.8 }),
      'My path'
    );
  };

  S.reading = k =>
    k.svg(
      k.sea('#c7ecef', '#8fcfdc', '#f1dca5') +
        k.weed(28, 52) +
        k.weed(40, 36, '#7cbf86', -1) +
        k.weed(316, 48, '#7cbf86') +
        k.shadow(175, 88, 70) +
        // open book
        k.p('M106 84Q140 74 175 82Q210 74 244 84L240 46Q208 36 175 44Q142 36 110 46Z', '#e7d7b4') +
        k.p('M112 80Q142 70 175 78V42Q142 34 112 42Z', '#fbf6ea') +
        k.p('M238 80Q208 70 175 78V42Q208 34 238 42Z', '#fbf6ea') +
        k.l('M175 42V80', '#c9b58c', 1.6) +
        k.l('M124 50Q145 46 164 50M124 58Q145 54 164 58M124 66Q145 62 160 66', '#9eb4bd', 2.4) +
        k.l('M186 50Q206 46 226 50M186 58Q206 54 226 58M186 66Q206 62 220 66', '#9eb4bd', 2.4) +
        // letters rising in bubbles
        [
          [140, 24, 'a', '#e0473d'],
          [176, 14, 's', '#3e8fd6'],
          [212, 26, 't', '#f39039']
        ]
          .map(
            ([x, y, ch, col]) =>
              k.c(x, y, 12, '#e8fbff', { op: 0.95 }) +
              `<text x="${x}" y="${y + 5.5}" text-anchor="middle" font-family="'Andika','Comic Sans MS',system-ui,sans-serif" font-size="17" font-weight="700" fill="${col}">${ch}</text>`
          )
          .join('') +
        k.bubbles([[110, 30, 3], [248, 18, 4], [262, 34, 2.5]]) +
        k.shell(290, 86, 1) +
        k.star(66, 86, 0.8),
      'Read with Willa'
    );

  S.maths = k =>
    k.svg(
      k.sea('#c9eee3', '#8fd2c6', '#f1dca5') +
        k.weed(30, 46, '#6cb256') +
        k.weed(322, 40, '#7cbf86', -1) +
        k.shadow(175, 90, 82) +
        // a ten-frame tray with shell counters
        k.r(96, 40, 158, 48, 9, '#c69a62') +
        [0, 1, 2, 3, 4]
          .flatMap(i => [0, 1].map(j => k.r(103 + i * 30, 46 + j * 20, 26, 17, 4, '#f6ead1', { w: 1.2 })))
          .join('') +
        [0, 1, 2, 3, 4, 5, 6]
          .map(i => {
            const x = 116 + (i % 5) * 30,
              y = 55 + Math.floor(i / 5) * 20;
            return k.c(x, y, 6.5, i < 5 ? '#f39039' : '#3e8fd6');
          })
          .join('') +
        // numbers floating above
        [
          [130, 20, '1', '#e0473d'],
          [175, 15, '2', '#3e8fd6'],
          [220, 20, '3', '#5c9e6a']
        ]
          .map(
            ([x, y, n, col]) =>
              k.c(x, y, 11, '#fff7e6', { op: 0.95 }) +
              `<text x="${x}" y="${y + 5.5}" text-anchor="middle" font-family="'Andika',system-ui,sans-serif" font-size="16" font-weight="800" fill="${col}">${n}</text>`
          )
          .join('') +
        k.fish(64, 40, 1, '#f5c63c') +
        k.fish(290, 30, 0.9, '#ee9a9a', true) +
        k.bubbles([[80, 22, 3], [276, 52, 2.5]]),
      'Maths with Tiggy'
    );

  S.writing = k =>
    k.svg(
      k.sea('#d6eef0', '#a9dbe2', '#f0d9a6', { floorY: 62 }) +
        // a big letter written in the sand
        `<ellipse cx="134" cy="70" rx="12" ry="11" fill="none" stroke="#c9a96b" stroke-width="6"/><path d="M147 57V83" stroke="#c9a96b" stroke-width="6" stroke-linecap="round"/>` +
        `<ellipse cx="134" cy="70" rx="12" ry="11" fill="none" stroke="#fff2d4" stroke-width="2.2"/><path d="M147 57V83" stroke="#fff2d4" stroke-width="2.2" stroke-linecap="round"/>` +
        k.l('M168 82Q176 60 186 74Q194 86 204 64', '#c9a96b', 5, { dash: '0.1 9' }) +
        // pencil
        `<g transform="translate(236 56) rotate(-38)">` +
        k.r(-6, -46, 12, 50, 2, '#f39039') +
        k.r(-6, -54, 12, 9, 2, '#ee9a9a') +
        k.r(-6, -46, 12, 4, 0, '#b4bec6', { w: 1 }) +
        k.p('M-6 4L0 18L6 4Z', '#f3dcb0') +
        k.p('M-2 13L0 18L2 13Z', '#22313b', { flat: 1 }) +
        `</g>` +
        k.shell(292, 82, 1.1, '#f6c8d6') +
        k.shell(64, 84, 0.9) +
        k.star(90, 72, 0.7, '#f5c63c') +
        k.bubbles([[260, 18, 3], [276, 30, 2]]),
      'Write with Dash'
    );

  S.science = k =>
    k.svg(
      k.sea('#bfe6ec', '#79bfd1', '#ecd6a4') +
        k.weed(34, 50, '#5fa36e') +
        k.weed(46, 32, '#7cbf86', -1) +
        // crab on the sand
        k.shadow(150, 88, 26) +
        k.l('M132 80L122 88M136 82L128 91M164 80L174 88M160 82L168 91', '#d9534a', 3) +
        k.p('M126 62Q118 54 122 48Q128 52 128 58Z', '#e0473d') +
        k.p('M174 62Q182 54 178 48Q172 52 172 58Z', '#e0473d') +
        k.e(150, 74, 24, 13, '#e0473d') +
        k.l('M142 64V56M158 64V56', '#c63f36', 2) +
        k.eye(142, 55, 2.6) +
        k.eye(158, 55, 2.6) +
        k.l('M144 78Q150 82 156 78', '#22313b', 1.6) +
        // magnifying glass
        `<circle cx="196" cy="48" r="26" fill="#e8fbff" fill-opacity=".35"/>` +
        k.l('M214 66L238 92', '#946640', 9) +
        `<circle cx="196" cy="48" r="26" fill="none" stroke="#2c4a58" stroke-width="5"/>` +
        `<circle cx="196" cy="48" r="26" fill="none" stroke="#b4bec6" stroke-width="2.5"/>` +
        k.l('M182 36Q188 28 198 27', '#ffffff', 3, { op: 0.9 }) +
        k.fish(286, 36, 1.1, '#3e8fd6', true) +
        k.bubbles([[260, 18, 3], [300, 60, 2.5], [86, 30, 3]]),
      'Science with Gizmo'
    );

  S.museum = k =>
    k.svg(
      k.sea('#9fd6e6', '#3d93b5', '#d9c79a', { rays: 0.4 }) +
        k.weed(300, 54, '#4f9a72') +
        k.weed(316, 38, '#6db48a', -1) +
        k.weed(26, 44, '#4f9a72') +
        k.fish(70, 26, 0.7, '#f5c63c') +
        k.fish(84, 36, 0.6, '#f5c63c') +
        k.fish(262, 22, 0.7, '#ee9a9a', true) +
        k.shark(176, 48, 1.25, '#7f9fb2') +
        k.bubbles([[240, 34, 3], [250, 24, 2], [120, 22, 2.5]]),
      'Sharks with Gizmo'
    );

  S.stories = k =>
    k.svg(
      `<rect width="350" height="100" fill="#4b4f86"/>` +
        `<rect y="58" width="350" height="42" fill="#3a6f99"/>` +
        k.c(272, 26, 14, '#fbeec2') +
        k.c(279, 21, 12, '#4b4f86', { flat: 1 }) +
        [[60, 18], [96, 34], [140, 14], [210, 22], [318, 40], [36, 44]]
          .map(([x, y]) => k.star(x, y, 0.35, '#fbe7a1'))
          .join('') +
        k.l('M0 62Q40 56 80 62T160 62T240 62T350 62', '#7cc6e0', 2, { op: 0.6 }) +
        // little sailing boat on a story-book wave
        k.shadow(176, 70, 40, 4) +
        k.p('M140 58H212L200 72H152Z', '#b9824e') +
        k.l('M176 58V20', '#7a5a3a', 2.4) +
        k.p('M178 22L204 54H178Z', '#fbf6ea') +
        k.p('M174 26L154 54H174Z', '#f3c9b4') +
        // open book in front
        k.p('M120 98Q148 88 175 94Q202 88 230 98L228 80Q202 72 175 78Q148 72 122 80Z', '#e7d7b4') +
        k.p('M126 94Q150 86 175 90V77Q150 70 126 78Z', '#fbf6ea') +
        k.p('M224 94Q200 86 175 90V77Q200 70 224 78Z', '#fbf6ea'),
      'Stories with Willa'
    );

  S.collection = k =>
    k.svg(
      k.sea('#c6e7ea', '#86c4d2', '#ecd39a') +
        k.weed(40, 48, '#5fa36e') +
        k.weed(310, 44, '#7cbf86', -1) +
        k.shadow(175, 90, 62) +
        // open treasure chest
        k.p('M126 46Q128 18 175 18Q222 18 224 46Z', '#9a6a43') +
        k.p('M132 44Q134 24 175 24Q216 24 218 44Z', '#5e3c25', { flat: 1 }) +
        k.r(124, 46, 102, 42, 6, '#a8733f') +
        k.l('M124 58H226', '#e6c574', 4) +
        k.r(166, 52, 18, 18, 4, '#f2c14e') +
        k.c(175, 61, 2.6, '#5d4e37', { flat: 1 }) +
        // pearls and a fossil tooth spilling out
        [[146, 44, 6], [158, 40, 5.5], [192, 41, 6], [205, 45, 5]].map(([x, y, rr]) => k.c(x, y, rr, '#f3eef8')).join('') +
        k.p('M168 44L176 22L184 44Q176 48 168 44Z', '#d8c7a2') +
        k.c(240, 86, 5, '#f3eef8') +
        k.c(110, 88, 4.5, '#f3eef8') +
        k.star(270, 82, 0.8, '#f39a62') +
        k.shell(84, 84, 1, '#f6c8d6') +
        `<g fill="#fff6c8">${[[140, 22], [214, 26], [196, 12]]
          .map(([x, y]) => `<path d="M${x} ${y - 6}l2 4 4 2-4 2-2 4-2-4-4-2 4-2Z"/>`)
          .join('')}</g>`,
      'My treasures'
    );

  S.expeditions = k =>
    k.svg(
      k.sea('#cbeaf0', '#91cbd9', '#efd7a0') +
        k.weed(30, 44, '#5fa36e') +
        k.weed(322, 50, '#7cbf86', -1) +
        // a row of activity bubbles: a, 3, a pencil stroke, a shark fin
        [
          [100, 46, '#fff4e4'],
          [150, 40, '#e9f6ff'],
          [200, 40, '#fdeef0'],
          [250, 46, '#eaf8ec']
        ]
          .map(([x, y, col]) => k.shadow(x, 88, 18, 3) + k.c(x, y, 22, col))
          .join('') +
        `<text x="100" y="54" text-anchor="middle" font-family="'Andika',system-ui,sans-serif" font-size="24" font-weight="700" fill="#e0473d">a</text>` +
        `<text x="150" y="48" text-anchor="middle" font-family="'Andika',system-ui,sans-serif" font-size="24" font-weight="800" fill="#3e8fd6">3</text>` +
        k.l('M188 46Q196 32 204 44Q210 52 214 36', '#d9534a', 3.5) +
        k.p('M238 56Q246 38 260 30Q256 46 264 56Z', '#7f97a6') +
        k.l('M232 58Q250 54 270 58', '#3e8fd6', 1.8, { op: 0.7 }) +
        k.bubbles([[66, 24, 3], [290, 22, 3.5], [300, 38, 2]]),
      'All learning games'
    );

  // ---------------------------------------------------------------- race tracks
  const racer = (k, x, y, s, col) =>
    k.l(`M${x - 92 * s} ${y - 6}H${x - 60 * s}M${x - 100 * s} ${y + 4}H${x - 66 * s}M${x - 86 * s} ${y + 13}H${x - 58 * s}`, '#ffffff', 2.2, { op: 0.75 }) +
    k.shark(x, y, s, col);
  const buoy = (k, x, y, col = '#f39039') =>
    k.l(`M${x} ${y - 4}V${y - 24}`, '#5d4e37', 1.6) +
    `<path d="M${x} ${y - 24}h12v4h-6v4h6v4h-12z" fill="#22313b"/><path d="M${x} ${y - 24}h6v4h-6zM${x + 6} ${y - 20}h6v4h-6zM${x} ${y - 16}h6v4h-6z" fill="#fff"/>` +
    k.e(x, y, 9, 6, col);

  // Track cards are nearly square: drawn for the window x 88..262, y -30..100.
  const SQ = '88 -30 174 130';
  S.lagoon = k =>
    k.svg(
      k.sea('#bff0f2', '#6cc7d6', '#f6e3b0', { rays: 0.4 }) +
        k.c(236, -12, 11, '#fbe48a', { flat: 1, op: 0.75 }) +
        k.l('M100 -18Q110 -26 120 -18', '#ffffff', 1.6, { op: 0.7 }) +
        k.weed(100, 34, '#6cb256') +
        k.weed(112, 24, '#8bc98f', -1) +
        k.shell(200, 89, 1) +
        k.star(150, 90, 0.8) +
        buoy(k, 238, 74) +
        racer(k, 196, 34, 0.75, '#8fb0c1') +
        k.fish(130, 66, 0.8, '#f5c63c') +
        k.bubbles([[124, 20, 2.5], [132, 10, 2]]),
      'Sunny Lagoon',
      SQ
    );

  S.reef = k =>
    k.svg(
      k.sea('#7fd2e0', '#2c8fae', '#edc89e') +
        k.p('M90 100Q86 64 100 54Q100 72 108 68Q106 50 118 44Q122 70 114 100Z', '#ee8a76') +
        k.p('M122 100Q124 80 134 76Q140 86 138 100Z', '#f5c63c') +
        k.p('M222 100Q218 70 232 62Q236 76 244 70Q246 56 258 52Q264 74 256 100Z', '#c77dd0') +
        k.c(206, 92, 8, '#f39a62') +
        k.fish(120, -6, 0.75, '#f39039') +
        k.fish(134, 4, 0.65, '#f39039') +
        k.fish(240, 24, 0.75, '#f5c63c', true) +
        buoy(k, 172, 86, '#e0473d') +
        racer(k, 196, 30, 0.75, '#7f9fb2'),
      'Coral Reef',
      SQ
    );

  S.ocean = k =>
    k.svg(
      k.sea('#4aa3cf', '#0f4a78', '#0f4a78', { noFloor: 1, rays: 0.28 }) +
        `<g opacity=".4">${k.p('M150 -14Q170 -26 200 -20Q218 -16 226 -22L232 -30Q236 -18 230 -12Q200 0 166 -4Q150 -6 150 -14Z', '#cfe4ef', { flat: 1 })}</g>` +
        k.fish(118, 74, 0.6, '#9fd0e8') +
        k.fish(130, 82, 0.5, '#9fd0e8') +
        k.fish(110, 88, 0.55, '#9fd0e8') +
        k.fish(244, 64, 0.5, '#9fd0e8', true) +
        buoy(k, 222, 92, '#f5c63c') +
        racer(k, 196, 36, 0.75, '#6f93a8') +
        k.bubbles([[122, 24, 3], [134, 14, 2.2], [176, 76, 2.5]], '#cfe9f6'),
      'Open Ocean',
      SQ
    );

  S.trench = k => {
    const glow = (x, y, col) =>
      `<circle cx="${x}" cy="${y}" r="10" fill="${col}" opacity=".18"/><circle cx="${x}" cy="${y}" r="4" fill="${col}" opacity=".9"/>`;
    return k.svg(
      k.sea('#16405f', '#04101f', '#0a1a2b', { rays: 0.08 }) +
        k.p('M104 -8Q104 -22 118 -22Q132 -22 132 -8Z', '#c78be0', { op: 0.85 }) +
        k.l('M108 -8Q106 2 110 10M115 -8Q114 6 117 14M122 -8Q124 4 120 12M128 -8Q130 0 127 6', '#c78be0', 1.6, { op: 0.7 }) +
        k.p('M226 64Q226 54 236 54Q246 54 246 64Z', '#7ff3e1', { op: 0.8 }) +
        k.l('M230 64Q228 72 231 78M236 64Q236 74 238 80M242 64Q244 72 241 76', '#7ff3e1', 1.6, { op: 0.7 }) +
        glow(120, 84, '#7ff3e1') +
        glow(200, 90, '#fbe48a') +
        `<g fill="#cfe9f6" opacity=".6">${[[150, -20], [210, -10], [250, 10], [100, 40], [180, 66]]
          .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2"/>`)
          .join('')}</g>` +
        racer(k, 196, 30, 0.75, '#5f8396'),
      'Deep Trench',
      SQ
    );
  };
  S.race = k =>
    k.svg(
      k.sea('#bff0f2', '#6cc7d6', '#f6e3b0', { rays: 0.4 }) +
        k.weed(40, 30, '#6cb256') +
        k.weed(52, 22, '#8bc98f', -1) +
        k.shell(250, 88, 1) +
        k.star(96, 88, 0.7) +
        buoy(k, 304, 60) +
        racer(k, 190, 46, 0.95, '#8fb0c1') +
        k.bubbles([[110, 32, 2.5], [122, 22, 2]]),
      'Shark race'
    );

  window.paintedScene = name => (S[name] ? S[name](kit()) : '');
  window.paintedSceneNames = Object.keys(S);
})();
