/* One drawing per picture, rendered in any of the candidate styles (October 2026 picture-style
 * samples). Each picture is a list of parts on a 120 x 100 board:
 *   [shape, attributes, colour role, options]
 * shape: 'path' | 'circle' | 'ellipse' | 'rect'; options.line = stroke only (whiskers, steam),
 * options.flat = no shading (eyes), options.w = line width. Colour roles are looked up in the
 * style's palette; 'main' is the colour lessons change (red hat, blue cup).
 * drawPicture(key, style) returns an <svg>. Keys follow the app: 'red-hat', 'big-dog'. */
(function (global) {
  const P = {};
  P.cat = [
    ['path', { d: 'M82 80Q106 80 104 58Q103 50 97 52Q99 70 80 72Z' }, 'fur'],
    ['ellipse', { cx: 60, cy: 72, rx: 26, ry: 21 }, 'fur'],
    ['ellipse', { cx: 60, cy: 77, rx: 13, ry: 11 }, 'light'],
    ['path', { d: 'M36 40L38 13L52 25Q60 22 68 25L82 13L84 40Q86 59 60 60Q34 59 36 40Z' }, 'fur'],
    ['path', { d: 'M41 21L42 32L49 26Z' }, 'pink', { flat: 1 }],
    ['path', { d: 'M79 21L78 32L71 26Z' }, 'pink', { flat: 1 }],
    ['ellipse', { cx: 60, cy: 49, rx: 10, ry: 6.5 }, 'light'],
    ['circle', { cx: 51, cy: 40, r: 3.4 }, 'dark', { flat: 1 }],
    ['circle', { cx: 69, cy: 40, r: 3.4 }, 'dark', { flat: 1 }],
    ['circle', { cx: 52.2, cy: 38.8, r: 1.1 }, 'white', { flat: 1, bare: 1 }],
    ['circle', { cx: 70.2, cy: 38.8, r: 1.1 }, 'white', { flat: 1, bare: 1 }],
    ['path', { d: 'M57 45H63L60 48.5Z' }, 'pink', { flat: 1 }],
    ['path', { d: 'M49 49L37 47M49 52L38 55M71 49L83 47M71 52L82 55' }, 'dark', { line: 1, w: 1.6 }],
    ['ellipse', { cx: 50, cy: 90, rx: 7, ry: 4 }, 'light'],
    ['ellipse', { cx: 70, cy: 90, rx: 7, ry: 4 }, 'light']
  ];
  P.dog = [
    ['path', { d: 'M80 82Q100 82 98 62Q96 58 93 61Q94 74 80 76Z' }, 'fur'],
    ['ellipse', { cx: 60, cy: 72, rx: 24, ry: 20 }, 'fur'],
    ['ellipse', { cx: 60, cy: 78, rx: 12, ry: 11 }, 'light'],
    ['circle', { cx: 60, cy: 40, r: 20 }, 'fur'],
    ['path', { d: 'M43 27Q29 29 31 53Q37 58 44 47Z' }, 'ear'],
    ['path', { d: 'M77 27Q91 29 89 53Q83 58 76 47Z' }, 'ear'],
    ['ellipse', { cx: 60, cy: 49.5, rx: 12.5, ry: 9 }, 'light'],
    ['circle', { cx: 52, cy: 36, r: 3.2 }, 'dark', { flat: 1 }],
    ['circle', { cx: 68, cy: 36, r: 3.2 }, 'dark', { flat: 1 }],
    ['circle', { cx: 53.1, cy: 34.9, r: 1 }, 'white', { flat: 1, bare: 1 }],
    ['circle', { cx: 69.1, cy: 34.9, r: 1 }, 'white', { flat: 1, bare: 1 }],
    ['path', { d: 'M57 55Q60 63 63 55Z' }, 'pink', { flat: 1 }],
    ['path', { d: 'M60 47Q60 53 55 54.5M60 47Q60 53 65 54.5' }, 'dark', { line: 1, w: 1.8 }],
    ['ellipse', { cx: 60, cy: 45, rx: 4.8, ry: 3.4 }, 'dark', { flat: 1 }],
    ['ellipse', { cx: 50, cy: 90, rx: 7, ry: 4 }, 'light'],
    ['ellipse', { cx: 70, cy: 90, rx: 7, ry: 4 }, 'light']
  ];
  P.hen = [
    ['path', { d: 'M34 60Q18 44 25 28Q33 38 38 44Q32 28 42 22Q47 38 47 48Z' }, 'fur'],
    ['path', { d: 'M51 82L49 94M46 94H53M67 82L69 94M66 94H73' }, 'beak', { line: 1, w: 3 }],
    ['ellipse', { cx: 58, cy: 63, rx: 30, ry: 23 }, 'fur'],
    ['path', { d: 'M41 59Q56 50 73 57Q71 67 62 72Q49 74 41 59Z' }, 'ear'],
    ['path', { d: 'M50 63Q57 61 64 63M53 68Q59 66 65 67' }, 'ear', { line: 1, w: 1.8, shade: 1 }],
    ['path', { d: 'M71 21Q72 12 77 17Q80 9 84 17Q90 13 88 24Z' }, 'red'],
    ['circle', { cx: 79, cy: 33, r: 13 }, 'fur'],
    ['path', { d: 'M90 31L101 35L90 39Z' }, 'beak'],
    ['path', { d: 'M87 40Q90 48 85.5 48Q83 43 85 40Z' }, 'red'],
    ['circle', { cx: 82, cy: 30, r: 2.7 }, 'dark', { flat: 1 }],
    ['circle', { cx: 82.9, cy: 29.1, r: 0.9 }, 'white', { flat: 1, bare: 1 }]
  ];
  P.fish = [
    ['path', { d: 'M87 50L109 31Q103 50 109 69Z' }, 'fin'],
    ['path', { d: 'M43 33Q55 15 70 34Z' }, 'fin'],
    ['path', { d: 'M17 52Q39 24 74 34Q87 38 92 50Q87 63 74 66Q39 76 17 52Z' }, 'orange'],
    ['path', { d: 'M40.5 37.5Q35 52 40.5 66.5L47.5 68Q42.5 52 47.5 35.5Z' }, 'stripe'],
    ['path', { d: 'M70 36Q66 51 70 64.5L76 62.5Q72.5 51 76 37.5Z' }, 'stripe'],
    ['path', { d: 'M54 55Q66 56 63 67Q56 64 54 55Z' }, 'fin'],
    ['circle', { cx: 29, cy: 47, r: 4.3 }, 'dark', { flat: 1 }],
    ['circle', { cx: 30.4, cy: 45.7, r: 1.4 }, 'white', { flat: 1, bare: 1 }],
    ['path', { d: 'M18 55Q21 57.5 25 56' }, 'dark', { line: 1, w: 1.8 }]
  ];
  P.hat = [
    ['ellipse', { cx: 60, cy: 73, rx: 46, ry: 12 }, 'main'],
    ['path', { d: 'M33 72Q32 33 60 31Q88 33 87 72Q60 80 33 72Z' }, 'main'],
    ['path', { d: 'M34 59Q60 66 86 59L87 69Q60 76 33 69Z' }, 'band'],
    ['path', { d: 'M60 33Q57 44 60 55' }, 'main', { line: 1, w: 2, shade: 1 }]
  ];
  P.cup = [
    ['path', { d: 'M81 43Q101 43 101 60Q101 77 81 77L81 68Q91 68 91 60Q91 52 81 52Z' }, 'main'],
    ['path', { d: 'M30 31L85 31L80 82Q79 89 72 89L43 89Q36 89 35 82Z' }, 'main'],
    ['ellipse', { cx: 57.5, cy: 31, rx: 27.5, ry: 6.5 }, 'inner'],
    ['ellipse', { cx: 57.5, cy: 32.5, rx: 23, ry: 4.4 }, 'drink', { flat: 1 }],
    ['path', { d: 'M48 21Q43 15 48 9M60 21Q55 14 60 7M72 21Q67 15 72 9' }, 'steam', { line: 1, w: 2.6 }]
  ];
  P.sun = (() => {
    const rays = [];
    for (let k = 0; k < 8; k++) {
      const a = (k * Math.PI) / 4,
        x = r => (60 + Math.cos(a) * r).toFixed(1),
        y = r => (50 + Math.sin(a) * r).toFixed(1),
        side = r => [Math.cos(a + Math.PI / 2) * r, Math.sin(a + Math.PI / 2) * r];
      const [sx, sy] = side(5.5);
      rays.push(['path', { d: `M${(+x(29) + sx).toFixed(1)} ${(+y(29) + sy).toFixed(1)}L${x(45)} ${y(45)}L${(+x(29) - sx).toFixed(1)} ${(+y(29) - sy).toFixed(1)}Z` }, 'ray']);
    }
    return [
      ...rays,
      ['circle', { cx: 60, cy: 50, r: 25 }, 'sun'],
      ['circle', { cx: 46.5, cy: 56, r: 3.6 }, 'pink', { flat: 1, soft: 1 }],
      ['circle', { cx: 73.5, cy: 56, r: 3.6 }, 'pink', { flat: 1, soft: 1 }],
      ['circle', { cx: 52, cy: 46, r: 2.8 }, 'dark', { flat: 1 }],
      ['circle', { cx: 68, cy: 46, r: 2.8 }, 'dark', { flat: 1 }],
      ['path', { d: 'M51 56Q60 64 69 56' }, 'dark', { line: 1, w: 2.2 }]
    ];
  })();
  P.tree = [
    ['path', { d: 'M54 93L56 60H64L66 93Z' }, 'bark'],
    ['path', { d: 'M30 62Q19 50 30 40Q30 21 48 22Q56 9 71 16Q87 13 90 30Q103 38 96 52Q100 67 84 68Q72 77 60 70Q46 77 36 68Q28 68 30 62Z' }, 'leaf'],
    ['path', { d: 'M43 40Q48 35 53 38M69 29Q74 25 79 29M63 52Q68 47 73 50M38 55Q42 52 46 54' }, 'leaf', { line: 1, w: 2, shade: 1 }]
  ];
  P.bus = [
    ['rect', { x: 11, y: 28, width: 98, height: 52, rx: 11 }, 'main'],
    ['rect', { x: 11, y: 58, width: 98, height: 7 }, 'band', { flat: 1 }],
    ['rect', { x: 19, y: 36, width: 16, height: 16, rx: 3.5 }, 'glass'],
    ['rect', { x: 39, y: 36, width: 16, height: 16, rx: 3.5 }, 'glass'],
    ['rect', { x: 59, y: 36, width: 16, height: 16, rx: 3.5 }, 'glass'],
    ['rect', { x: 81, y: 36, width: 21, height: 22, rx: 4 }, 'glass'],
    ['circle', { cx: 104, cy: 70, r: 3 }, 'lamp', { flat: 1 }],
    ['rect', { x: 9, y: 74, width: 102, height: 6, rx: 3 }, 'trim'],
    ['circle', { cx: 33, cy: 81, r: 9.5 }, 'dark'],
    ['circle', { cx: 87, cy: 81, r: 9.5 }, 'dark'],
    ['circle', { cx: 33, cy: 81, r: 3.8 }, 'hub', { flat: 1 }],
    ['circle', { cx: 87, cy: 81, r: 3.8 }, 'hub', { flat: 1 }]
  ];
  P.apple = [
    ['path', { d: 'M59.5 34Q58 24 62.5 15' }, 'bark', { line: 1, w: 4 }],
    ['path', { d: 'M60 34Q44 24 32 36Q20 50 28 70Q36 90 52 88Q60 85 68 88Q84 90 92 70Q100 50 88 36Q76 24 60 34Z' }, 'red'],
    ['path', { d: 'M62.5 24Q72 11 85 17Q75 30 62.5 24Z' }, 'leaf']
  ];
  const DEFAULT_MAIN = { hat: '#d9534a', cup: '#4f9cc4', bus: '#f2b33d' };
  const COLOUR_WORDS = { red: '#e0473d', blue: '#3e8fd6', yellow: '#f5c63c' };

  // ---- colour helpers
  const hex = c => c.replace('#', '').match(/../g).map(h => parseInt(h, 16));
  const toHex = a => '#' + a.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  const mix = (c, d, t) => toHex(hex(c).map((v, i) => v + (hex(d)[i] - v) * t));
  const lighten = (c, t) => mix(c, '#ffffff', t), darken = (c, t) => mix(c, '#10202c', t);

  const BASE = {
    fur: '#e9a25a', light: '#f7e6cc', pink: '#ee9a9a', dark: '#22313b', white: '#ffffff', ear: '#a8693f',
    red: '#e0473d', beak: '#f2b33d', orange: '#f39039', fin: '#e0692d', stripe: '#fff6e8', band: '#f4ead5',
    inner: '#2e6782', drink: '#a8643a', steam: '#bccbd2', sun: '#f7c443', ray: '#f4a93a', bark: '#946640',
    leaf: '#6cb256', glass: '#bfe5f2', lamp: '#fff2a8', trim: '#8796a3', hub: '#dfe3e6'
  };
  const subjectPalette = { dog: { fur: '#c98b55', ear: '#7d4f30', light: '#f3dfc4' }, hen: { fur: '#c8743f', ear: '#9e5528' } };

  // ---- styles
  let uid = 0;
  const attrs = o => Object.entries(o).map(([k, v]) => `${k}="${v}"`).join(' ');
  const STYLES = {
    painted: {
      name: 'Soft painted',
      palette: c => c,
      render(parts, pal, id) {
        const defs = [], grads = {};
        const grad = c => {
          if (!grads[c]) {
            const g = `${id}g${Object.keys(grads).length}`;
            grads[c] = g;
            defs.push(`<radialGradient id="${g}" cx=".38" cy=".3" r=".85"><stop offset="0" stop-color="${lighten(c, 0.34)}"/><stop offset=".5" stop-color="${c}"/><stop offset="1" stop-color="${darken(c, 0.22)}"/></radialGradient>`);
          }
          return `url(#${grads[c]})`;
        };
        const body = parts.map(([shape, a, role, o = {}]) => {
          const c = pal(role);
          if (o.line) return `<${shape} ${attrs(a)} fill="none" stroke="${o.shade ? darken(c, 0.3) : c}" stroke-width="${o.w || 2}" stroke-linecap="round" stroke-linejoin="round"/>`;
          if (o.bare) return `<${shape} ${attrs(a)} fill="${c}"/>`;
          const fill = o.flat ? c : grad(c);
          return `<${shape} ${attrs(a)} fill="${fill}" ${o.soft ? 'opacity=".55"' : `stroke="${darken(c, 0.4)}" stroke-width="1.8" stroke-linejoin="round"`}/>`;
        });
        return `<defs>${defs.join('')}</defs><ellipse cx="60" cy="94" rx="36" ry="4.5" fill="#0b2d3a" opacity=".16"/>${body.join('')}`;
      }
    },
    crayon: {
      name: 'Storybook crayon',
      palette: c => mix(c, '#f3e6cf', 0.22),
      render(parts, pal, id) {
        const ink = '#5b4434';
        const body = parts.map(([shape, a, role, o = {}]) => {
          const c = pal(role);
          if (o.line) return `<${shape} ${attrs(a)} fill="none" stroke="${o.shade ? mix(c, ink, 0.55) : role === 'dark' ? ink : c}" stroke-width="${(o.w || 2) + 0.4}" stroke-linecap="round" stroke-linejoin="round"/>`;
          if (o.bare) return `<${shape} ${attrs(a)} fill="${c}"/>`;
          return `<${shape} ${attrs(a)} fill="${c}" ${o.soft ? 'opacity=".5"' : `stroke="${ink}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"`}/>`;
        });
        return `<defs><filter id="${id}w" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="1" seed="3" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 .3  0 0 0 0 .22  0 0 0 0 .14  0 0 0 -1.1 .62" result="gr"/><feComposite in="gr" in2="d" operator="in" result="tex"/><feMerge><feMergeNode in="d"/><feMergeNode in="tex"/></feMerge></filter></defs><path d="M26 94Q60 90 94 94" stroke="#8c7a62" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".5"/><g filter="url(#${id}w)">${body.join('')}</g>`;
      }
    },
    sticker: {
      name: 'Bold sticker',
      palette: c => c,
      render(parts, pal, id) {
        const ink = '#1d3346';
        const body = parts.map(([shape, a, role, o = {}]) => {
          const c = pal(role);
          if (o.line) return `<${shape} ${attrs(a)} fill="none" stroke="${o.shade ? darken(c, 0.35) : role === 'dark' ? ink : c}" stroke-width="${(o.w || 2) + 0.6}" stroke-linecap="round" stroke-linejoin="round"/>`;
          if (o.bare) return `<${shape} ${attrs(a)} fill="${c}"/>`;
          return `<${shape} ${attrs(a)} fill="${c}" ${o.soft ? 'opacity=".55"' : `stroke="${ink}" stroke-width="3.2" stroke-linejoin="round"`}/>`;
        });
        return `<defs><filter id="${id}s" x="-15%" y="-15%" width="130%" height="130%"><feMorphology in="SourceAlpha" operator="dilate" radius="3.6" result="big"/><feFlood flood-color="#ffffff"/><feComposite in2="big" operator="in" result="edge"/><feOffset in="big" dy="2.2" result="dropA"/><feFlood flood-color="#0b2d3a" flood-opacity=".22"/><feComposite in2="dropA" operator="in" result="drop"/><feMerge><feMergeNode in="drop"/><feMergeNode in="edge"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g filter="url(#${id}s)">${body.join('')}</g>`;
      }
    }
  };

  function drawPicture(key, styleName = 'painted', { label = '' } = {}) {
    const m = String(key).match(/^(?:(red|blue|yellow)-|(big|small)-)?(.+)$/);
    const colourWord = m[1], size = m[2], base = m[3];
    const parts = P[base];
    if (!parts) return null;
    const style = STYLES[styleName];
    const roles = { ...BASE, ...(subjectPalette[base] || {}), main: (colourWord && COLOUR_WORDS[colourWord]) || DEFAULT_MAIN[base] || BASE.red };
    const pal = role => style.palette(roles[role] || '#cccccc');
    const id = 'pic' + ++uid;
    const inner = style.render(parts, pal, id);
    const scaled = size === 'small' ? `<g transform="translate(60 96) scale(.6) translate(-60 -96)">${inner}</g>` : inner;
    return `<svg class="pic pic-${styleName}" viewBox="0 0 120 100" role="img" aria-label="${label || key.replace('-', ' ')}">${scaled}</svg>`;
  }
  global.Pictures = { drawPicture, STYLES, subjects: Object.keys(P) };
})(typeof window !== 'undefined' ? window : globalThis);
