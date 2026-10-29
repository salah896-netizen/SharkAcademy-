/* Lesson pictures (29 October 2026): one soft painted style for every reading picture, in place
 * of the mix of emoji and flat drawings. Chosen from three samples (research/pictures/).
 *
 * Each picture is a list of parts on a 120 x 100 board, drawn back to front. The helpers below
 * make one part each: p (path), c (circle), e (ellipse), r (rect), l (a line, stroke only) and
 * eye (a pupil with its shine). A part's colour is a role from COLOURS or a #hex. 'main' is the
 * colour lessons change: 'red-hat', 'blue-fish' (mainDark is a shade of it). 'big-' and 'small-'
 * keys draw the same picture smaller or full size. The svg shows 6..114 x 6..100, trimming the
 * empty edge so pictures fill their frame; styles are in pictures.css.
 *
 * Adds itself to the front of readingPictureSources, so any key drawn here wins; keys it doesn't
 * know (word cards, a few unused emoji) fall through to the older sources. */
(function () {
  const p = (d, col, o) => ['path', { d }, col, o],
    c = (cx, cy, r, col, o) => ['circle', { cx, cy, r }, col, o],
    e = (cx, cy, rx, ry, col, o) => ['ellipse', { cx, cy, rx, ry }, col, o],
    r = (x, y, width, height, rx, col, o) => ['rect', { x, y, width, height, rx }, col, o],
    l = (d, col, w = 2, o = {}) => ['path', { d }, col, { ...o, line: 1, w }],
    eye = (cx, cy, size = 3) => [c(cx, cy, size, 'dark', { flat: 1 }), c(cx + size * 0.35, cy - size * 0.35, size * 0.34, 'white', { bare: 1 })];

  const COLOURS = {
    fur: '#e9a25a', light: '#f7e6cc', pink: '#ee9a9a', dark: '#22313b', white: '#ffffff', ear: '#a8693f',
    red: '#e0473d', beak: '#f2b33d', orange: '#f39039', stripe: '#fff6e8', band: '#f4ead5',
    inner: '#2e6782', drink: '#a8643a', steam: '#bccbd2', sun: '#f7c443', ray: '#f4a93a', bark: '#946640',
    leaf: '#6cb256', glass: '#bfe5f2', lamp: '#fff2a8', trim: '#8796a3', hub: '#dfe3e6', water: '#7cc6e0',
    grey: '#9aa8b2', metal: '#b4bec6', gold: '#f2c14e', wood: '#b9824e', paper: '#f3e7c9', cream: '#fbf6ea'
  };
  const MAIN = { red: '#e0473d', blue: '#3e8fd6', yellow: '#f5c63c' };

  const P = {};
  // ---------------------------------------------------------------- the first ten (samples)
  P.cat = [
    p('M82 80Q106 80 104 58Q103 50 97 52Q99 70 80 72Z', 'fur'),
    e(60, 72, 26, 21, 'fur'), e(60, 77, 13, 11, 'light'),
    p('M36 40L38 13L52 25Q60 22 68 25L82 13L84 40Q86 59 60 60Q34 59 36 40Z', 'fur'),
    p('M41 21L42 32L49 26Z', 'pink', { flat: 1 }), p('M79 21L78 32L71 26Z', 'pink', { flat: 1 }),
    e(60, 49, 10, 6.5, 'light'), ...eye(51, 40, 3.4), ...eye(69, 40, 3.4),
    p('M57 45H63L60 48.5Z', 'pink', { flat: 1 }),
    l('M49 49L37 47M49 52L38 55M71 49L83 47M71 52L82 55', 'dark', 1.6),
    e(50, 90, 7, 4, 'light'), e(70, 90, 7, 4, 'light')
  ];
  P.dog = [
    p('M80 82Q100 82 98 62Q96 58 93 61Q94 74 80 76Z', '#c98b55'),
    e(60, 72, 24, 20, '#c98b55'), e(60, 78, 12, 11, '#f3dfc4'), c(60, 40, 20, '#c98b55'),
    p('M43 27Q29 29 31 53Q37 58 44 47Z', '#7d4f30'), p('M77 27Q91 29 89 53Q83 58 76 47Z', '#7d4f30'),
    e(60, 49.5, 12.5, 9, '#f3dfc4'), ...eye(52, 36, 3.2), ...eye(68, 36, 3.2),
    p('M57 55Q60 63 63 55Z', 'pink', { flat: 1 }),
    l('M60 47Q60 53 55 54.5M60 47Q60 53 65 54.5', 'dark', 1.8),
    e(60, 45, 4.8, 3.4, 'dark', { flat: 1 }), e(50, 90, 7, 4, '#f3dfc4'), e(70, 90, 7, 4, '#f3dfc4')
  ];
  P.hen = [
    p('M34 60Q18 44 25 28Q33 38 38 44Q32 28 42 22Q47 38 47 48Z', '#c8743f'),
    l('M51 82L49 94M46 94H53M67 82L69 94M66 94H73', 'beak', 3),
    e(58, 63, 30, 23, '#c8743f'), p('M41 59Q56 50 73 57Q71 67 62 72Q49 74 41 59Z', '#9e5528'),
    l('M50 63Q57 61 64 63M53 68Q59 66 65 67', '#9e5528', 1.8, { shade: 1 }),
    p('M71 21Q72 12 77 17Q80 9 84 17Q90 13 88 24Z', 'red'), c(79, 33, 13, '#c8743f'),
    p('M90 31L101 35L90 39Z', 'beak'), p('M87 40Q90 48 85.5 48Q83 43 85 40Z', 'red'), ...eye(82, 30, 2.7)
  ];
  P.fish = [
    p('M87 50L109 31Q103 50 109 69Z', 'mainDark'), p('M43 33Q55 15 70 34Z', 'mainDark'),
    p('M17 52Q39 24 74 34Q87 38 92 50Q87 63 74 66Q39 76 17 52Z', 'main'),
    p('M40.5 37.5Q35 52 40.5 66.5L47.5 68Q42.5 52 47.5 35.5Z', 'stripe'),
    p('M70 36Q66 51 70 64.5L76 62.5Q72.5 51 76 37.5Z', 'stripe'),
    p('M54 55Q66 56 63 67Q56 64 54 55Z', 'mainDark'), ...eye(29, 47, 4.3), l('M18 55Q21 57.5 25 56', 'dark', 1.8)
  ];
  P.hat = [
    e(60, 73, 46, 12, 'main'), p('M33 72Q32 33 60 31Q88 33 87 72Q60 80 33 72Z', 'main'),
    p('M34 59Q60 66 86 59L87 69Q60 76 33 69Z', 'band'), l('M60 33Q57 44 60 55', 'main', 2, { shade: 1 })
  ];
  P.cup = [
    e(58, 86, 40, 7, 'main'), e(58, 84.5, 30, 4.2, 'mainDark', { flat: 1 }),
    p('M84 46Q101 45 100 58Q99 71 82 72L82 65Q92 64 92 58Q92 52 84 53Z', 'main'),
    p('M28 38L88 38Q87 70 72 80Q58 86 44 80Q29 70 28 38Z', 'main'),
    e(58, 38, 30, 6.5, 'inner'), e(58, 39.3, 25.5, 4.3, 'drink', { flat: 1 }),
    l('M48 28Q43 22 48 16M60 28Q55 21 60 14M72 28Q67 22 72 16', 'steam', 2.6)
  ];
  P.sun = (() => {
    const rays = [];
    for (let k = 0; k < 8; k++) {
      const a = (k * Math.PI) / 4,
        pt = (rad, off = 0) => [60 + Math.cos(a) * rad - Math.sin(a) * off, 50 + Math.sin(a) * rad + Math.cos(a) * off].map(n => n.toFixed(1)).join(' ');
      rays.push(p(`M${pt(29, 5.5)}L${pt(45)}L${pt(29, -5.5)}Z`, 'ray'));
    }
    return [
      ...rays, c(60, 50, 25, 'sun'),
      c(46.5, 56, 3.6, 'pink', { flat: 1, soft: 1 }), c(73.5, 56, 3.6, 'pink', { flat: 1, soft: 1 }),
      ...eye(52, 46, 2.8), ...eye(68, 46, 2.8), l('M51 56Q60 64 69 56', 'dark', 2.2)
    ];
  })();
  P.tree = [
    p('M54 93L56 60H64L66 93Z', 'bark'),
    p('M30 62Q19 50 30 40Q30 21 48 22Q56 9 71 16Q87 13 90 30Q103 38 96 52Q100 67 84 68Q72 77 60 70Q46 77 36 68Q28 68 30 62Z', 'leaf'),
    l('M43 40Q48 35 53 38M69 29Q74 25 79 29M63 52Q68 47 73 50M38 55Q42 52 46 54', 'leaf', 2, { shade: 1 })
  ];
  P.bus = [
    r(11, 28, 98, 52, 11, 'main'), r(11, 58, 98, 7, 0, '#e07a3c', { flat: 1 }),
    r(19, 36, 16, 16, 3.5, 'glass'), r(39, 36, 16, 16, 3.5, 'glass'), r(59, 36, 16, 16, 3.5, 'glass'), r(81, 36, 21, 22, 4, 'glass'),
    c(104, 70, 3, 'lamp', { flat: 1 }), r(9, 74, 102, 6, 3, 'trim'),
    c(33, 81, 9.5, 'dark'), c(87, 81, 9.5, 'dark'), c(33, 81, 3.8, 'hub', { flat: 1 }), c(87, 81, 3.8, 'hub', { flat: 1 })
  ];
  P.apple = [
    l('M59.5 34Q58 24 62.5 15', 'bark', 4),
    p('M60 34Q44 24 32 36Q20 50 28 70Q36 90 52 88Q60 85 68 88Q84 90 92 70Q100 50 88 36Q76 24 60 34Z', 'red'),
    p('M62.5 24Q72 11 85 17Q75 30 62.5 24Z', 'leaf')
  ];

  // ---------------------------------------------------------------- animals
  P.ant = [
    l('M40 66L30 86M54 68L50 88M66 66L72 88M78 62L90 82', '#4a2f24', 3),
    l('M90 44Q96 28 106 26M86 42Q86 28 94 20', '#4a2f24', 2.4),
    e(34, 60, 19, 15, '#5b3a2b'), e(62, 61, 11, 9, '#5b3a2b'), c(86, 52, 13, '#5b3a2b'),
    c(90, 49, 4.6, 'white', { flat: 1 }), ...eye(91, 49.5, 2.6), l('M86 59Q90 61 94 58', 'dark', 1.6)
  ];
  P.bat = [
    p('M52 46Q34 28 10 36Q18 43 16 52Q25 50 29 58Q36 54 41 63Q46 57 53 59Z', '#3f3350'),
    p('M68 46Q86 28 110 36Q102 43 104 52Q95 50 91 58Q84 54 79 63Q74 57 67 59Z', '#3f3350'),
    e(60, 56, 13, 17, '#5b4a6b'), p('M51 31L48 16L58 26Z', '#5b4a6b'), p('M69 31L72 16L62 26Z', '#5b4a6b'),
    c(60, 38, 12, '#5b4a6b'), c(55, 37, 3.6, 'white', { flat: 1 }), c(65, 37, 3.6, 'white', { flat: 1 }),
    ...eye(55.5, 37.5, 2.2), ...eye(65.5, 37.5, 2.2),
    p('M56.5 44L57.5 48L58.5 44Z', 'white', { flat: 1 }), p('M61.5 44L62.5 48L63.5 44Z', 'white', { flat: 1 })
  ];
  P.bee = [
    e(52, 34, 11, 16, '#e6f4fb'), e(68, 33, 10, 14, '#e6f4fb'),
    p('M86 58L98 60L86 64Z', 'dark', { flat: 1 }),
    e(60, 60, 27, 20, '#f5c63c'),
    p('M50 41Q46 60 50 79L58 80Q54 60 58 40Z', '#2f2a28', { flat: 1 }),
    p('M70 42Q66 60 70 78L77 76Q73 60 77 44Z', '#2f2a28', { flat: 1 }),
    l('M28 47Q22 34 15 33M35 46Q35 33 41 28', 'dark', 2.2),
    c(32, 58, 12, '#2f2a28'), c(29, 55, 4, 'white', { flat: 1 }), ...eye(29, 55.5, 2.3), l('M26 63Q30 66 34 63', 'white', 1.6)
  ];
  P.bug = [
    l('M36 58L24 52M35 70L23 76M84 58L96 52M85 70L97 76', 'dark', 3),
    l('M54 30Q50 18 42 15M66 30Q70 18 78 15', 'dark', 2.2),
    e(60, 37, 15, 11, '#2b3238'), c(60, 63, 27, 'red'),
    l('M60 37V90', '#2b3238', 2.4), c(47, 53, 5.5, '#2b3238', { flat: 1 }), c(73, 53, 5.5, '#2b3238', { flat: 1 }),
    c(45, 72, 5, '#2b3238', { flat: 1 }), c(75, 72, 5, '#2b3238', { flat: 1 }),
    c(54, 33, 3.4, 'white', { flat: 1 }), c(66, 33, 3.4, 'white', { flat: 1 }), ...eye(54.5, 33.5, 1.8), ...eye(66.5, 33.5, 1.8)
  ];
  P.chick = [
    l('M52 84L49 93M45 93H53M68 84L71 93M67 93H75', 'orange', 2.6),
    e(60, 65, 27, 22, '#f7d24a'), c(66, 39, 16, '#f7d24a'),
    l('M63 24Q65 16 69 22Q71 14 75 22', '#e2b52e', 2.4),
    p('M44 63Q56 54 68 65Q59 76 46 71Z', '#e9b83a'), p('M80 38L90 41L80 45Z', 'orange'), ...eye(71, 35, 2.8),
    c(76, 46, 3, 'pink', { flat: 1, soft: 1 })
  ];
  P.duck = [
    l('M10 90Q20 86 30 90T50 90T70 90T90 90T110 90', 'water', 3),
    p('M22 62L12 48L30 56Z', '#f6f1e6'), e(54, 68, 33, 18, '#f6f1e6'), c(81, 44, 15, '#f6f1e6'),
    p('M93 42Q107 41 107 46Q105 51 93 51Z', 'orange'), ...eye(85, 40, 2.6),
    p('M36 64Q53 53 71 63Q61 78 40 74Z', '#e4dccb')
  ];
  P.fox = [
    p('M76 84Q104 86 100 60Q96 50 88 56Q92 74 76 76Z', '#e8793a'), p('M100 60Q97 51 89 55Q94 58 99 64Z', 'white', { flat: 1 }),
    e(60, 72, 20, 18, '#e8793a'), e(60, 74, 10, 13, 'cream'),
    p('M34 30L42 11L53 26Q60 24 67 26L78 11L86 30Q84 50 60 56Q36 50 34 30Z', '#e8793a'),
    p('M43 17L46 27L51 24Z', '#5a3020', { flat: 1 }), p('M77 17L74 27L69 24Z', '#5a3020', { flat: 1 }),
    p('M37 36Q47 47 60 55Q45 55 37 41Z', 'cream', { flat: 1 }), p('M83 36Q73 47 60 55Q75 55 83 41Z', 'cream', { flat: 1 }),
    ...eye(51, 36, 3), ...eye(69, 36, 3), p('M56.5 49H63.5L60 53Z', 'dark', { flat: 1 }),
    e(52, 90, 6.5, 3.5, '#5a3020'), e(68, 90, 6.5, 3.5, '#5a3020')
  ];
  P.goat = [
    r(34, 64, 7, 26, 3, '#e3d8c4'), r(46, 66, 7, 24, 3, '#e3d8c4'), r(64, 66, 7, 24, 3, '#e3d8c4'), r(76, 64, 7, 26, 3, '#e3d8c4'),
    r(33.5, 87, 8, 6, 2, '#5c5048', { flat: 1 }), r(45.5, 87, 8, 6, 2, '#5c5048', { flat: 1 }), r(63.5, 87, 8, 6, 2, '#5c5048', { flat: 1 }), r(75.5, 87, 8, 6, 2, '#5c5048', { flat: 1 }),
    p('M28 50Q19 43 22 36Q29 43 31 48Z', '#e3d8c4'), e(56, 56, 30, 17, '#e3d8c4'),
    p('M86 30Q84 15 72 12Q81 19 81 31Z', '#9a8a70'),
    p('M80 40Q82 25 94 25Q105 27 105 42Q103 53 95 53Q86 51 80 40Z', '#e3d8c4'),
    p('M85 35Q74 36 71 43Q80 44 87 40Z', '#d2c4ab'), p('M96 51L93 62L101 52Z', '#d2c4ab'), ...eye(95, 36, 2.5),
    e(102, 47, 1.4, 1.8, 'dark', { flat: 1, bare: 1 })
  ];
  P.mouse = [
    l('M27 76Q8 74 10 57Q12 49 19 51', '#e79aa3', 2.8),
    e(53, 69, 28, 19, '#a9a9b6'), p('M72 52Q84 39 99 54Q107 60 105 64Q97 70 80 68Z', '#a9a9b6'),
    c(79, 42, 11, '#a9a9b6'), c(79, 42, 6.5, '#f0b4bd', { flat: 1 }), ...eye(92, 54, 2.5),
    c(104.5, 63, 2.8, '#e98a9b', { flat: 1 }), l('M100 60L113 56M100 63.5L113 65', 'dark', 1.3),
    e(43, 88, 7.5, 3.2, '#f0b4bd'), e(65, 88, 7.5, 3.2, '#f0b4bd')
  ];
  P.penguin = [
    e(51, 91, 8, 3.6, 'orange'), e(69, 91, 8, 3.6, 'orange'),
    p('M36 48Q25 66 33 79Q40 67 40 53Z', '#2b3742'), p('M84 48Q95 66 87 79Q80 67 80 53Z', '#2b3742'),
    e(60, 57, 25, 34, '#2b3742'), e(60, 61, 17, 28, 'white'),
    ...eye(53.5, 41, 2.8), ...eye(66.5, 41, 2.8), p('M55.5 47H64.5L60 53.5Z', 'orange'),
    c(49, 50, 3, 'pink', { flat: 1, soft: 1 }), c(71, 50, 3, 'pink', { flat: 1, soft: 1 })
  ];
  P.pig = [
    r(38, 74, 9, 16, 4, '#f2a7b3'), r(51, 76, 9, 15, 4, '#f2a7b3'), r(66, 76, 9, 15, 4, '#f2a7b3'), r(79, 74, 9, 16, 4, '#f2a7b3'),
    l('M30 58Q20 52 25 46Q30 43 28 51', '#d97f90', 2.4),
    e(58, 63, 30, 21, '#f2a7b3'), p('M77 37L75 24L88 32Z', '#e48b9c'), c(86, 50, 17, '#f2a7b3'),
    e(101, 55, 6.5, 8, '#e98a9b'), e(100, 52, 1.4, 2, 'dark', { flat: 1, bare: 1 }), e(100, 58, 1.4, 2, 'dark', { flat: 1, bare: 1 }),
    ...eye(89, 45, 2.7), c(84, 57, 3.4, 'pink', { flat: 1, soft: 1 })
  ];
  P.sheep = [
    r(39, 66, 6, 25, 3, '#3a3a40'), r(51, 68, 6, 23, 3, '#3a3a40'), r(66, 68, 6, 23, 3, '#3a3a40'), r(78, 66, 6, 25, 3, '#3a3a40'),
    p('M30 62Q20 54 28 46Q28 34 42 36Q48 26 60 30Q72 24 80 34Q92 34 92 46Q100 54 90 62Q90 74 76 72Q66 80 56 74Q42 80 36 70Q26 70 30 62Z', '#f6f2ea'),
    p('M89 40Q80 33 77 40Q81 45 89 45Z', '#3a3a40'), e(95, 49, 11, 13, '#3a3a40'),
    c(98, 47, 3.4, 'white', { flat: 1 }), ...eye(98.6, 47.4, 1.8)
  ];
  P.snail = [
    p('M18 83Q22 71 38 72L80 72Q92 72 94 60Q96 46 104 49Q111 53 105 62Q101 72 96 78Q92 85 80 85H26Q18 85 18 83Z', '#c9d88a'),
    l('M99 51L97 36M104 51L111 38', '#a9b96a', 2.6), c(97, 35, 3.2, 'dark', { flat: 1 }), c(111, 37, 3.2, 'dark', { flat: 1 }),
    c(54, 53, 23, 'main'), l('M56 54Q50 55 50 49Q51 43 58 43Q66 45 66 53Q65 63 54 64Q42 63 41 51Q42 37 59 35', 'main', 2.4, { shade: 1 })
  ];
  P.snake = [
    l('M18 82Q38 94 58 82Q73 72 60 59Q47 46 62 36Q74 28 86 34', '#3f7f3a', 17),
    l('M18 82Q38 94 58 82Q73 72 60 59Q47 46 62 36Q74 28 86 34', '#7ac06a', 12),
    l('M30 87L34 84M48 86L50 82M62 72L66 70M54 54L58 52', '#5a9e4c', 2.4),
    e(91, 35, 11, 8.5, '#7ac06a'), ...eye(94, 32, 2.2), l('M101 37L108 37M105 37L110 34M105 37L110 40', 'red', 1.6)
  ];
  P.shark = [
    p('M100 52L116 32L110 54L116 74Z', '#7f97a6'), p('M54 40L64 18L75 41Z', '#7f97a6'),
    p('M14 58Q34 34 70 38Q92 40 104 52Q92 66 70 68Q34 72 14 58Z', '#7f97a6'),
    p('M22 60Q60 73 100 56Q90 66 70 68Q36 72 22 60Z', 'white', { flat: 1 }),
    p('M52 63L44 81L65 67Z', '#6d8494'), ...eye(31, 51, 2.8),
    l('M21 60Q29 64 37 61', 'dark', 1.8), l('M45 48Q43 54 45 60M50 48Q48 54 50 60', '#7f97a6', 1.8, { shade: 1 })
  ];
  P.unicorn = [
    p('M40 88Q38 62 44 47Q46 29 62 25Q80 25 88 41Q96 51 96 59Q94 67 84 67Q76 65 72 61Q68 72 70 88Z', '#f7f1f7'),
    p('M44 47Q33 37 39 25Q46 18 57 22Q47 31 50 45Q44 54 48 66Q40 72 40 88Q33 73 39 61Q33 55 44 47Z', '#c79ce0'),
    p('M58 26L66 3L71 28Z', 'gold'), l('M61 18L69 16M63 11L68 10', '#c9962e', 1.6),
    p('M71 29L77 14L81 31Z', '#f7f1f7'), ...eye(75, 42, 2.8), c(91, 58, 1.9, '#b9a6b8', { flat: 1 }),
    c(82, 53, 4, 'pink', { flat: 1, soft: 1 })
  ];

  // ---------------------------------------------------------------- around the house
  const ring = (cx, cy, rx, ry, col, w) => [
    ['ellipse', { cx, cy, rx, ry }, col, { line: 1, w: w + 3, shade: 1 }],
    ['ellipse', { cx, cy, rx, ry }, col, { line: 1, w }]
  ];
  const shell = (x, y, s, col) => [
    ['path', { d: 'M0 9L-11 -1Q-11 -9 -4 -9Q0 -12 4 -9Q11 -9 11 -1Z', transform: `translate(${x} ${y}) scale(${s})` }, col],
    ['path', { d: 'M0 8L-6 -7M0 8L0 -10M0 8L6 -7', transform: `translate(${x} ${y}) scale(${s})` }, col, { line: 1, w: 1.3, shade: 1 }]
  ];
  const tilt = (shape, a, col, deg, o) => [shape, { ...a, transform: `rotate(${deg} 60 53)` }, col, o];
  P.bag = [
    l('M40 42Q40 16 60 16Q80 16 80 42', 'mainDark', 5),
    p('M24 40H96L102 88Q60 96 18 88Z', 'main'), l('M34 54H86', 'main', 2.2, { shade: 1 }),
    r(54, 50, 12, 9, 2.5, 'gold')
  ];
  P.bath = [
    c(40, 44, 8, '#dff2fa'), c(54, 37, 10, '#dff2fa'), c(70, 41, 9, '#dff2fa'), c(84, 38, 6.5, '#dff2fa'),
    l('M99 47V31Q99 25 93 25H87', 'metal', 4),
    l('M30 83L26 92M90 83L94 92', 'gold', 4),
    p('M14 52H106Q104 80 84 85H36Q16 80 14 52Z', '#f4f6f8'), r(10, 46, 100, 9, 4.5, '#e2e8ec')
  ];
  P.bed = [
    l('M19 86V93M101 86V93', 'wood', 4),
    r(12, 30, 15, 58, 5, 'wood'), r(94, 46, 13, 42, 5, 'wood'),
    r(22, 56, 78, 22, 6, 'white'), e(37, 54, 13, 7.5, 'cream'),
    r(44, 52, 58, 27, 6, '#6a9be0'), l('M45 61H101', '#6a9be0', 2, { shade: 1 })
  ];
  P.box = [
    p('M24 44L60 56V92L24 80Z', '#d9a66a'), p('M60 56L96 44V80L60 92Z', '#c18c50'),
    p('M24 44L10 34L46 22L60 32Z', '#e8bd84'), p('M96 44L110 34L74 22L60 32Z', '#e8bd84'),
    p('M38 48.7L46 51.3V88L38 85.3Z', '#f1dcb0', { flat: 1 })
  ];
  P.cap = [
    p('M26 64Q25 30 58 30Q91 30 90 64Z', 'main'),
    l('M58 32Q47 44 45 63M58 32Q69 44 71 63', 'main', 1.8, { shade: 1 }), c(58, 30, 4, 'mainDark'),
    p('M58 60Q96 55 109 66Q105 73 87 73H58Z', 'mainDark')
  ];
  P.chain = [
    r(28, 54.5, 30, 7, 3.5, 'metal'), r(72, 54.5, 30, 7, 3.5, 'metal'),
    ...ring(22, 58, 13, 9, 'metal', 5.5), ...ring(65, 58, 13, 9, 'metal', 5.5), ...ring(108, 58, 9, 9, 'metal', 5.5)
  ];
  P.coat = [
    p('M36 26L50 20Q60 30 70 20L84 26L101 45L92 53L86 47V88H34V47L28 53L19 45Z', 'main'),
    l('M50 20L60 42L70 20M60 42V88', 'main', 2.2, { shade: 1 }),
    c(66, 52, 2.8, 'dark', { flat: 1 }), c(66, 64, 2.8, 'dark', { flat: 1 }), c(66, 76, 2.8, 'dark', { flat: 1 }),
    l('M40 68H52M74 68H82', 'main', 2, { shade: 1 })
  ];
  P.coin = [
    c(60, 56, 31, 'gold'), ['circle', { cx: 60, cy: 56, r: 23 }, '#c9962e', { line: 1, w: 2.6 }],
    p('M47 67L60 40L73 67Q60 61 47 67Z', '#d9a63a', { flat: 1 }), l('M41 41Q45 34 52 32', 'white', 3)
  ];
  P.dish = [
    e(60, 66, 49, 20, 'white'), e(60, 64, 36, 13, '#eaeff2', { flat: 1 }),
    e(47, 60, 13, 7.5, '#c8743f'), e(76, 63, 10, 6.5, 'cream'),
    c(62, 66, 3.4, 'leaf'), c(68, 68, 3.4, 'leaf'), c(57, 69, 3.4, 'leaf')
  ];
  P.fork = [
    p('M57 50H63L64 88Q60 94 56 88Z', 'metal'),
    p('M44 14H49V34H53V14H58V34H62V14H67V34H71V14H76V36Q76 52 60 52Q44 52 44 36Z', 'metal')
  ];
  P.jar = [
    p('M34 30H86V40Q94 44 94 56V82Q94 92 82 92H38Q26 92 26 82V56Q26 44 34 40Z', '#d6eef5'),
    ...shell(46, 80, 0.95, '#f4b8a4'), ...shell(66, 82, 1, '#f7d6a0'), ...shell(80, 72, 0.8, '#e8a3c4'), ...shell(56, 64, 0.85, '#f0c6a8'),
    r(31, 19, 58, 13, 4, '#d9534a'), l('M36 52V80', 'white', 3.2)
  ];
  P.lock = [
    l('M42 50V36Q42 20 60 20Q78 20 78 36V50', 'metal', 11, { shade: 1 }), l('M42 50V36Q42 20 60 20Q78 20 78 36V50', 'metal', 7),
    r(30, 46, 60, 44, 8, 'gold'), c(60, 63, 5.5, 'dark', { flat: 1 }), p('M57.5 65L56 79H64L62.5 65Z', 'dark', { flat: 1 })
  ];
  P.log = [
    p('M26 48H94Q104 65 94 82H26Z', 'wood'), l('M42 56H70M52 74H86M76 63H92', 'wood', 2, { shade: 1 }),
    e(26, 65, 12, 17, '#e8c08a'), ['ellipse', { cx: 26, cy: 65, rx: 7, ry: 10.5 }, '#b98a5c', { line: 1, w: 2 }], c(26, 65, 2.4, '#b98a5c', { flat: 1 }),
    p('M76 48Q74 38 80 34Q84 42 80 48Z', 'leaf')
  ];
  P.mug = [
    p('M84 42Q103 42 103 59Q103 76 84 76V67Q94 67 94 59Q94 51 84 51Z', 'main'),
    r(24, 28, 62, 62, 11, 'main'), e(55, 30, 30, 6, 'white'),
    p('M47 57Q47 50 54 52.5Q61 50 61 57Q61 64 54 69Q47 64 47 57Z', 'white', { flat: 1 })
  ];
  P.pen = [
    tilt('rect', { x: 22, y: 46, width: 64, height: 14, rx: 5 }, 'main', -30),
    tilt('path', { d: 'M86 46.5L100 53L86 59.5Z' }, '#e6d3b0', -30), tilt('path', { d: 'M96 51L100 53L96 55Z' }, 'dark', -30, { flat: 1 })
  ];
  P.pin = [
    p('M58.5 60L60 92L61.5 60Z', 'metal'), e(60, 58, 23, 7, 'red'),
    p('M48 34H72L66 56H54Z', 'red'), e(60, 31, 20, 8, 'red')
  ];
  P.ring = [
    ...ring(60, 66, 27, 20, 'gold', 8),
    p('M48 42L54 33H66L72 42L60 56Z', '#7fd3ee'), l('M48 42H72M54 33L60 56M66 33L60 56', 'white', 1.4),
    l('M88 28V40M82 34H94M30 26V34M26 30H34', 'gold', 2.4)
  ];
  P.soap = [
    c(38, 42, 8, '#e3f3fa'), c(55, 33, 10, '#e3f3fa'), c(73, 40, 7, '#e3f3fa'), c(86, 27, 5, '#e3f3fa'),
    r(24, 52, 72, 35, 15, '#f4a9c6'), l('M38 62Q60 58 82 62', 'white', 3)
  ];
  P.sock = [
    p('M44 14H76V58Q76 66 82 70L93 76Q103 84 95 92Q88 98 78 92L52 78Q40 72 42 60Z', 'main'),
    p('M84 72L93 76Q103 84 95 92Q90 96 82 91Q88 84 84 72Z', 'white', { flat: 1 }),
    r(42, 12, 36, 13, 4, 'white'), l('M44 40H76M44 48H76', 'white', 3)
  ];
  P.boot = [
    p('M40 16H70V62Q70 68 77 70L92 74Q104 78 102 88H38Z', 'main'), r(36, 84, 68, 9, 3, '#3b4650'),
    r(37, 12, 36, 9, 3, 'mainDark'), l('M47 26V66', 'white', 3, { soft: 1 })
  ];
  P.spoon = [
    p('M57 47Q56 70 58 90Q60 94 62 90Q64 70 63 47Z', 'metal'),
    e(60, 30, 15, 20, 'metal'), e(60, 32, 10, 14, '#d5dde2', { flat: 1 })
  ];
  P.tie = [
    p('M54 30H66L74 76L60 92L46 76Z', 'main'),
    l('M56 41L65 46M53.5 55L68 62M51 69L71 78', 'gold', 3),
    p('M51 15H69L66 31H54Z', 'mainDark')
  ];
  P.torch = [
    p('M94 34L117 20V90L94 76Z', 'lamp', { soft: 1 }),
    r(16, 44, 62, 22, 7, '#3e8fd6'), p('M76 40L92 32V78L76 70Z', '#5d6b78'),
    e(92, 55, 4.5, 22, 'lamp', { flat: 1 }), r(36, 39.5, 12, 6, 2, 'red')
  ];
  P.web = (() => {
    const ang = [...Array(8)].map((_, i) => (i * Math.PI) / 4 - Math.PI / 2),
      pt = (a, rad) => [60 + Math.cos(a) * rad * 1.15, 50 + Math.sin(a) * rad].map(n => n.toFixed(1)).join(' ');
    const spokes = ang.map(a => `M60 50L${pt(a, 42)}`).join('');
    const rings = [12, 23, 34].map(rad => 'M' + ang.map((a, i) => (i ? 'Q' + pt((a + ang[i - 1]) / 2, rad * 0.86) + ' ' : '') + pt(a, rad)).join('') + 'Q' + pt(ang[7] + Math.PI / 8, rad * 0.86) + ' ' + pt(ang[0], rad)).join('');
    return [l(spokes, '#8f9ea8', 1.8), l(rings, '#8f9ea8', 1.8),
      l('M82 20V30M78 28L74 24M86 28L90 24M78 32L73 34M86 32L91 34', 'dark', 1.6), c(82, 32, 5, '#2b3238')];
  })();
  P.king = [
    p('M24 94Q28 74 60 74Q92 74 96 94Z', '#7d4fb4'), e(60, 77, 23, 6, 'white'),
    c(60, 55, 21, '#f3c9a5'), c(46, 60, 3.4, 'pink', { flat: 1, soft: 1 }), c(74, 60, 3.4, 'pink', { flat: 1, soft: 1 }),
    p('M39 38L37 14L49 26L60 10L71 26L83 14L81 38Z', 'gold'), r(38, 33, 44, 8, 3, 'gold'),
    c(60, 23, 3, 'red', { flat: 1 }), c(47, 31, 2.4, '#3e8fd6', { flat: 1 }), c(73, 31, 2.4, 'leaf', { flat: 1 }),
    ...eye(52, 52, 2.8), ...eye(68, 52, 2.8), l('M54 62Q60 66 66 62', 'dark', 2)
  ];
  P.song = [
    ['ellipse', { cx: 39, cy: 76, rx: 11, ry: 8, transform: 'rotate(-20 39 76)' }, '#7a5cc7'],
    ['ellipse', { cx: 79, cy: 66, rx: 11, ry: 8, transform: 'rotate(-20 79 66)' }, '#7a5cc7'],
    r(46, 30, 5, 45, 2, '#7a5cc7'), r(86, 20, 5, 45, 2, '#7a5cc7'),
    p('M46 30L91 19V29L46 40Z', '#7a5cc7'), l('M100 72V82M95 77H105M20 40V48M16 44H24', 'gold', 2.2)
  ];

  // ---------------------------------------------------------------- food, nature, sea and travel
  const star = (cx, cy, R, rr, col, o) => p('M' + [...Array(10)].map((_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5, rad = i % 2 ? rr : R;
    return (cx + Math.cos(a) * rad).toFixed(1) + ' ' + (cy + Math.sin(a) * rad).toFixed(1);
  }).join('L') + 'Z', col, o);
  const drop = (x, y, col = 'water') => p(`M${x} ${y}Q${x - 6} ${y + 10} ${x} ${y + 14}Q${x + 6} ${y + 10} ${x} ${y}Z`, col);
  const waves = y => l(`M8 ${y}Q18 ${y - 4} 28 ${y}T48 ${y}T68 ${y}T88 ${y}T112 ${y}`, 'water', 3);
  P.cake = [
    e(60, 90, 46, 6, 'white'),
    r(44, 30, 6, 22, 2, '#7fb6e8'), r(57, 28, 6, 24, 2, '#f5c63c'), r(70, 30, 6, 22, 2, '#8fd07a'),
    p('M47 30Q42 24 47 16Q52 24 47 30Z', 'orange'), p('M60 28Q55 22 60 14Q65 22 60 28Z', 'orange'), p('M73 30Q68 24 73 16Q78 24 73 30Z', 'orange'),
    r(22, 52, 76, 36, 8, '#f4b8c8'),
    p('M22 60Q22 52 30 52H90Q98 52 98 60Q94 67 90 61Q86 69 80 61Q74 69 68 61Q62 69 56 61Q50 69 44 61Q38 69 32 61Q26 67 22 60Z', 'white'),
    l('M34 76L38 74M50 81L54 79M68 76L72 78M82 81L86 79', 'red', 2.2)
  ];
  P.chip = [
    ...[[34, -14], [44, -6], [54, 2], [64, 8], [74, 14], [50, -2], [62, -10]].map(([x, deg]) =>
      ['rect', { x, y: 18, width: 9, height: 50, rx: 3, transform: `rotate(${deg} ${x + 4} 60)` }, '#f7cf4f']),
    p('M28 46H92L84 92H36Z', 'red'), p('M31 56H89L88 64H32Z', 'white', { flat: 1 })
  ];
  P.corn = [
    e(60, 46, 17, 33, '#f5c63c'),
    l('M45 30H75M44 40H76M44 50H76M45 60H75M47 70H73M52 14V80M60 13V81M68 14V80', '#f5c63c', 1.6, { shade: 1 }),
    p('M44 60Q28 82 52 94Q52 80 58 70Z', 'leaf'), p('M76 60Q92 82 68 94Q68 80 62 70Z', 'leaf')
  ];
  P.egg = [e(60, 56, 25, 33, '#f6e7cf'), l('M38 58L47 51L53 60L60 51L67 60L73 51L82 58', '#b9a27e', 2.2)];
  P.pie = [
    l('M44 34Q40 28 44 22M60 32Q56 26 60 20M76 34Q72 28 76 22', 'steam', 2.4),
    p('M14 64H106L96 86H24Z', '#c98b55'), p('M16 64Q16 44 60 42Q104 44 104 64Z', '#e9b46a'),
    l('M16 64Q22 58 28 64T40 64T52 64T64 64T76 64T88 64T104 64', '#c98b55', 2.6),
    l('M47 54L54 51M59 51L66 49M71 54L78 51', '#b9824e', 2.6)
  ];
  P.seed = [
    l('M60 78Q57 62 62 46', '#5d9c48', 4), p('M61 54Q46 42 39 50Q49 61 61 54Z', 'leaf'), p('M62 47Q76 32 85 40Q77 53 62 47Z', 'leaf'),
    p('M16 88Q60 64 104 88Z', '#8b5e3c'), e(60, 80, 9, 6, '#d6ad73')
  ];
  P.cloud = [
    p('M28 74Q13 74 13 61Q13 48 28 48Q30 31 48 31Q60 21 75 31Q91 29 95 46Q109 48 107 62Q105 75 90 74Z', '#f4f8fb'),
    ...eye(50, 54, 2.8), ...eye(70, 54, 2.8), l('M54 62Q60 67 66 62', 'dark', 2),
    c(44, 61, 3.2, 'pink', { flat: 1, soft: 1 }), c(76, 61, 3.2, 'pink', { flat: 1, soft: 1 })
  ];
  P.moon = [
    p('M72 14Q44 22 43 50Q43 78 72 88Q40 94 25 70Q11 43 32 23Q49 10 72 14Z', '#f7d774'),
    star(86, 30, 8, 3.4, 'gold'), star(96, 64, 5.5, 2.3, 'gold'), star(76, 50, 4, 1.7, 'gold')
  ];
  P.rain = [
    p('M30 52Q18 52 18 42Q18 32 30 32Q32 18 48 18Q58 10 70 18Q84 16 88 30Q100 32 100 42Q100 52 88 52Z', '#c3cfd8'),
    drop(34, 60), drop(56, 62), drop(78, 60), drop(45, 76), drop(67, 78), drop(89, 74)
  ];
  P.rock = [
    p('M14 88Q12 66 28 55Q38 38 60 40Q80 35 93 52Q108 64 106 88Z', '#9aa3a8'),
    l('M44 52Q51 66 46 88M74 45Q70 63 81 88', '#9aa3a8', 2, { shade: 1 }), p('M28 86Q36 74 48 80Q42 88 28 86Z', '#86b46e')
  ];
  P.star = [
    star(60, 52, 40, 17, 'gold'),
    ...eye(52, 52, 2.8), ...eye(68, 52, 2.8), l('M54 61Q60 66 66 61', 'dark', 2),
    c(46, 60, 3.2, 'pink', { flat: 1, soft: 1 }), c(74, 60, 3.2, 'pink', { flat: 1, soft: 1 })
  ];
  P.shell = [
    p('M60 88L22 52Q19 26 42 22Q52 12 60 20Q68 12 78 22Q101 26 98 52Z', '#f4c2a8'),
    l('M60 86L33 34M60 86L48 22M60 86V20M60 86L72 22M60 86L87 34', '#f4c2a8', 2, { shade: 1 }),
    p('M50 84H70L66 94H54Z', '#e8a888')
  ];
  P.fin = [p('M30 80Q50 60 58 16Q72 50 96 80Z', 'main'), p('M8 80Q18 74 28 80T48 80T68 80T88 80T112 80V92H8Z', 'water')];
  P.tail = [
    p('M6 58Q24 49 46 57V73Q24 80 6 71Z', '#7f97a6'),
    p('M42 57Q55 55 63 49L99 11Q91 40 85 54Q95 70 106 89Q85 77 67 67Q54 71 42 73Z', '#7f97a6'),
    l('M18 34Q22 28 29 26M26 43Q30 37 37 35', 'water', 2.6)
  ];
  P.teeth = (() => {
    // Shark jaws: a row of teeth along each gum's curve, with a clear gap between the rows.
    const along = (y0, yMid, n, from, to) => [...Array(n)].map((_, i) => {
      const t = (i + 0.5) / n, x = from + (to - from) * t;
      return [x, y0 + (yMid - y0) * 4 * t * (1 - t)];
    });
    const w = 7;
    return [
      e(60, 58, 47, 27, '#5a2d36'),
      p('M12 28Q60 46 108 28V16H12Z', '#e98a9b'),
      ...along(28, 37, 6, 16, 104).map(([x, y]) => p(`M${(x - w).toFixed(1)} ${(y - 1).toFixed(1)}L${(x + w).toFixed(1)} ${(y - 1).toFixed(1)}L${x.toFixed(1)} ${(y + 16).toFixed(1)}Z`, 'white')),
      p('M12 88Q60 68 108 88V98H12Z', '#e98a9b'),
      ...along(86, 77, 5, 24, 96).map(([x, y]) => p(`M${(x - w).toFixed(1)} ${(y + 1).toFixed(1)}L${(x + w).toFixed(1)} ${(y + 1).toFixed(1)}L${x.toFixed(1)} ${(y - 13).toFixed(1)}Z`, 'white'))
    ];
  })();
  P.map = [
    p('M14 26L42 18L78 28L106 20V78L78 86L42 76L14 84Z', 'paper'), p('M42 18L78 28V86L42 76Z', '#e9d9b2', { flat: 1 }),
    p('M20 42Q24 32 34 36Q38 46 29 49Q20 49 20 42Z', 'leaf'),
    l('M28 68Q38 48 54 58T84 40', '#c0763a', 2.6, { dash: '5 5' }), l('M85 32L95 42M95 32L85 42', 'red', 3.6)
  ];
  P.net = [
    l('M14 92L48 58', 'wood', 6),
    p('M45 46Q50 86 72 88Q94 82 93 46Z', '#e6f1f4', { soft: 1 }),
    l('M50 49L72 86M60 47L84 81M70 46L91 66M81 46L93 54M90 48L66 87M80 46L55 82M70 46L47 66M59 46L45 55', '#8796a3', 1.4),
    ...ring(69, 46, 24, 7, 'metal', 3.2)
  ];
  P.ship = [
    waves(90),
    l('M60 66V10', 'wood', 3.6), p('M62 14L96 58H62Z', 'white'), p('M58 20L28 58H58Z', 'cream'), p('M60 10L75 14L60 18Z', 'red'),
    p('M12 62H108L95 87H25Z', 'main'), c(40, 72, 3.4, 'glass', { flat: 1 }), c(60, 72, 3.4, 'glass', { flat: 1 }), c(80, 72, 3.4, 'glass', { flat: 1 })
  ];
  P.boat = [
    waves(88), l('M60 72V20', 'wood', 3), p('M63 22Q88 44 92 68H63Z', '#f7c443'), p('M26 70H96L86 86H36Z', '#e0473d'),
    l('M30 76H92', 'white', 2.4)
  ];
  P.car = [
    p('M14 74V60Q14 52 24 50L38 36Q42 32 50 32H74Q80 32 86 38L98 50Q108 52 108 62V74Z', '#e0473d'),
    p('M43 38H59V50H33Z', 'glass'), p('M65 38H76Q80 38 84 42L90 50H65Z', 'glass'), l('M62 52V72', '#e0473d', 2, { shade: 1 }),
    c(104, 62, 3, 'lamp', { flat: 1 }), c(34, 75, 10, 'dark'), c(88, 75, 10, 'dark'), c(34, 75, 4, 'hub', { flat: 1 }), c(88, 75, 4, 'hub', { flat: 1 })
  ];
  P.van = [
    p('M10 78V36Q10 28 18 28H78Q84 28 89 34L104 54Q110 58 110 66V78Z', '#5aa6c8'),
    p('M83 34L98 54H83Z', 'glass'), r(18, 36, 24, 16, 3, 'glass'), r(48, 36, 26, 16, 3, 'glass'), r(10, 60, 100, 6, 0, '#f5c63c', { flat: 1 }),
    c(106, 70, 2.8, 'lamp', { flat: 1 }), c(32, 79, 10, 'dark'), c(88, 79, 10, 'dark'), c(32, 79, 4, 'hub', { flat: 1 }), c(88, 79, 4, 'hub', { flat: 1 })
  ];
  P.train = [
    l('M4 93H116', 'trim', 3), c(86, 18, 6, '#e5eaee'), c(97, 10, 7, '#e5eaee'),
    r(77, 28, 11, 20, 2, '#3b4650'), r(44, 46, 54, 32, 10, '#3e8fd6'), r(16, 32, 34, 46, 4, '#e0473d'), r(11, 26, 44, 8, 3, '#3b4650'),
    r(23, 40, 20, 15, 3, 'glass'), r(94, 70, 12, 6, 2, '#3b4650'),
    c(30, 83, 9, 'dark'), c(58, 83, 9, 'dark'), c(84, 83, 9, 'dark'), c(30, 83, 3.4, 'hub', { flat: 1 }), c(58, 83, 3.4, 'hub', { flat: 1 }), c(84, 83, 3.4, 'hub', { flat: 1 })
  ];
  P.house = [
    r(76, 20, 11, 22, 2, '#b5543f'), r(26, 46, 68, 44, 4, '#f4d9a8'), p('M16 50L60 15L104 50Z', '#d9534a'),
    p('M52 90V71Q52 63 60 63Q68 63 68 71V90Z', '#946640'), c(64, 78, 1.6, 'gold', { flat: 1 }),
    r(32, 56, 14, 14, 2, 'glass'), r(74, 56, 14, 14, 2, 'glass'), l('M39 56V70M32 63H46M81 56V70M74 63H88', '#8796a3', 1.6)
  ];
  const foot = (flip = false) => {
    const X = x => (flip ? 120 - x : x);
    return [
      p(`M${X(40)} 90Q${X(25)} 88 ${X(27)} 66Q${X(29)} 47 ${X(41)} 45Q${X(53)} 47 ${X(53)} 66Q${X(53)} 88 ${X(40)} 90Z`, '#f3c9a5'),
      c(X(48), 38, 5.4, '#f3c9a5'), c(X(39.5), 35.5, 4, '#f3c9a5'), c(X(33), 37.5, 3.5, '#f3c9a5'), c(X(28), 41.5, 3.1, '#f3c9a5'), c(X(25), 47, 2.7, '#f3c9a5')
    ];
  };
  P.feet = [...foot(), ...foot(true)];
  P.leg = [
    p('M49 22H66L64 70Q64 78 70 80L90 83Q99 86 97 92H50Q46 90 48 80Z', '#f3c9a5'),
    l('M51 50Q57 52 63 50', '#f3c9a5', 2, { shade: 1 }), r(43, 6, 28, 26, 6, '#3e8fd6'),
    p('M46 79H70Q88 79 99 86Q101 95 92 95H46Z', '#e0473d'), l('M46 87H99', 'white', 2)
  ];

  // ---------------------------------------------------------------- Year 1 reading (29 Oct 2026)
  // Sound swap, Blend reef and Long-vowel lagoon words (year1-reading.js).
  P.nail = [
    p('M30 30L36 24L94 82L90 90Z', '#b4bec6'), l('M40 34L86 80', '#e6ecf0', 2),
    e(32, 26, 15, 6, '#9aa8b2'), p('M90 90L100 98L92 86Z', '#8796a3')
  ];
  P.eel = [
    l('M14 64Q30 44 46 62Q62 80 78 60Q90 44 104 54', '#5c8f5a', 15),
    l('M14 64Q30 44 46 62Q62 80 78 60Q90 44 104 54', '#8fc07a', 10),
    l('M40 58Q46 64 52 68M70 62Q76 56 82 54', '#c8e3b4', 2.4),
    c(104, 54, 9, '#8fc07a'), ...eye(107, 51, 2.2), l('M108 58Q111 59 113 57', 'dark', 1.4),
    p('M14 64L4 56L6 70Z', '#5c8f5a')
  ];
  P.seal = [
    p('M20 80Q8 72 12 62Q20 70 30 72Z', '#8a96a0'),
    p('M18 78Q30 50 64 44Q88 40 96 26Q104 18 108 30Q110 44 98 56Q84 76 54 82Q34 86 18 78Z', '#9aa6b0'),
    p('M56 76Q66 92 82 90Q74 82 72 74Z', '#7f8c96'),
    c(100, 30, 3.2, 'white', { flat: 1 }), ...eye(100.5, 30, 2.2), c(110, 36, 2.6, 'dark', { flat: 1 }),
    l('M106 40L116 38M106 43L116 45', 'dark', 1.2), l('M40 60Q56 54 76 56', '#c6ced4', 2.4)
  ];
  P.sail = [
    waves(90), p('M24 76H96L86 88H34Z', '#9a6a43'), l('M58 14V76', '#7a5a3a', 3),
    p('M61 16Q90 40 92 70H61Z', 'cream'), p('M55 22Q34 44 30 70H55Z', 'main'),
    l('M61 40H84M61 56H90', '#e7dcc4', 2)
  ];
  P.bun = [
    e(60, 76, 42, 10, '#c98a4a'), p('M18 74Q20 34 60 32Q100 34 102 74Q60 84 18 74Z', '#e0a35a'),
    ...[[44, 48], [58, 42], [72, 48], [52, 58], [68, 58], [84, 60], [36, 60]].map(([x, y]) => e(x, y, 2.6, 1.6, '#fff4dc', { flat: 1 })),
    l('M30 46Q44 36 60 36', 'white', 2.4, { soft: 1 })
  ];
  P.can = [
    e(60, 28, 24, 7, '#c6d0d7'), r(36, 28, 48, 56, 4, 'main'), e(60, 84, 24, 7, '#9aa8b2'),
    r(36, 44, 48, 24, 0, 'cream', { flat: 1 }), c(60, 56, 7, 'main', { flat: 1 }), l('M42 34V80', 'white', 3, { soft: 1 })
  ];
  P.crab = [
    l('M40 70L24 76L18 88M42 76L30 88M80 70L96 76L102 88M78 76L90 88', '#c74c3a', 4),
    l('M42 58L28 44M78 58L92 44', '#c74c3a', 5),
    p('M20 44Q8 34 16 24L24 32L28 22Q40 32 28 44Q24 48 20 44Z', '#ee6f55'),
    p('M100 44Q112 34 104 24L96 32L92 22Q80 32 92 44Q96 48 100 44Z', '#ee6f55'),
    l('M52 52V40M68 52V40', '#e2614a', 4), e(60, 64, 28, 18, '#ee6f55'),
    c(52, 38, 4, 'white', { flat: 1 }), ...eye(52, 38, 2.4), c(68, 38, 4, 'white', { flat: 1 }), ...eye(68, 38, 2.4),
    l('M54 70Q60 75 66 70', '#7a2a20', 2)
  ];
  P.frog = [
    p('M24 86Q20 74 32 70L44 78Z', '#5ea84e'), p('M96 86Q100 74 88 70L76 78Z', '#5ea84e'),
    e(60, 70, 32, 20, '#7cc06a'), e(60, 76, 18, 12, '#d8efb8'),
    c(44, 44, 12, '#7cc06a'), c(76, 44, 12, '#7cc06a'),
    c(44, 42, 7, 'white', { flat: 1 }), ...eye(44, 42, 4), c(76, 42, 7, 'white', { flat: 1 }), ...eye(76, 42, 4),
    l('M44 62Q60 72 76 62', '#3f7f3a', 2.4), c(36, 60, 3, 'pink', { flat: 1, soft: 1 }), c(84, 60, 3, 'pink', { flat: 1, soft: 1 })
  ];
  P.flag = [
    l('M34 12V92', '#7a5a3a', 4), e(34, 92, 10, 3, '#5a4632'),
    p('M36 16Q60 8 76 18Q92 28 106 20V56Q92 64 76 54Q60 44 36 52Z', 'main'),
    l('M36 22Q58 14 74 24', 'white', 2.4, { soft: 1 })
  ];
  P.drum = [
    l('M30 18L54 40M90 18L66 40', '#b9824e', 4), c(30, 18, 4, '#e6c574'), c(90, 18, 4, '#e6c574'),
    r(26, 46, 68, 38, 6, 'main'), e(60, 46, 34, 9, '#f6efdc'), e(60, 84, 34, 8, 'mainDark'),
    l('M28 52L42 82L56 52L70 82L84 52L92 70', '#f6efdc', 2.4)
  ];
  P.nest = [
    c(48, 50, 10, '#cfe7f2'), c(62, 46, 10, '#cfe7f2'), c(74, 52, 9, '#cfe7f2'),
    p('M16 54Q20 84 60 86Q100 84 104 54Q60 64 16 54Z', '#a8733f'),
    l('M20 60Q60 72 100 60M24 70Q60 80 96 70M30 78Q60 86 90 78', '#7a4f2a', 2),
    l('M14 54Q40 48 60 54T106 54', '#c9955f', 3)
  ];
  P.tent = [
    p('M10 88L60 18L110 88Z', 'main'), p('M60 18L60 88L42 88Z', 'mainDark'),
    p('M60 46L48 88H72Z', '#3a2f2a', { flat: 1 }), l('M60 18V10', '#7a5a3a', 2.6), p('M60 10L72 14L60 18Z', '#f5c63c')
  ];
  P.hand = [
    p('M40 92Q34 70 34 56L32 34Q32 28 37 28Q42 28 42 34L44 52L44 22Q44 16 50 16Q56 16 56 22V50L58 18Q58 12 64 12Q70 12 70 18L68 50L72 24Q72 18 78 18Q84 18 83 25L80 56Q90 46 96 48Q102 52 96 60L82 80Q76 92 64 92Z', '#f3c9a5'),
    l('M44 52V56M56 50V54M68 50V54', '#d9a37f', 1.6)
  ];
  P.lamp = [
    c(60, 40, 30, '#fff2a8', { flat: 1, soft: 1 }),
    p('M36 46L46 16H74L84 46Z', 'main'), r(57, 46, 6, 34, 2, '#b4bec6'), e(60, 84, 22, 7, '#8796a3'),
    l('M48 22H72', 'white', 2.4, { soft: 1 })
  ];
  P.tray = [
    e(60, 82, 48, 6, '#0b2d3a', { flat: 1, soft: 1 }),
    p('M10 70L18 58H102L110 70L100 80H20Z', 'main'), p('M22 62H98L104 70L96 76H24L16 70Z', 'mainDark', { flat: 1 }),
    r(38, 46, 16, 16, 3, 'cream'), c(74, 58, 8, 'red')
  ];
  P.hay = [
    e(60, 88, 44, 6, '#b8962e'), p('M18 86Q16 46 60 44Q104 46 102 86Z', '#ecc65a'),
    l('M28 80Q30 58 60 54Q90 58 92 80M40 84Q44 66 60 64Q76 66 80 84', '#c9a23a', 2.2),
    l('M20 70Q14 66 10 70M100 70Q106 66 110 70', '#ecc65a', 2)
  ];
  P.leaf = [
    p('M20 84Q14 40 56 22Q90 10 104 20Q108 60 70 80Q44 92 20 84Z', '#6cb256'),
    l('M22 82Q60 56 98 24', '#4f8a3f', 2.6), l('M44 66L40 46M58 56L58 34M72 46L80 30M50 62L70 64M66 50L84 52', '#4f8a3f', 1.8)
  ];
  P.sea = [
    r(8, 20, 104, 74, 14, '#7cc6e0'), c(86, 36, 9, 'sun'),
    l('M12 52Q24 46 36 52T60 52T84 52T108 52', 'white', 3),
    l('M12 68Q24 62 36 68T60 68T84 68T108 68', '#e8f8ff', 3), l('M12 84Q24 78 36 84T60 84T84 84T108 84', '#e8f8ff', 3)
  ];
  P.light = [
    c(60, 42, 34, '#fff2a8', { flat: 1, soft: 1 }),
    p('M60 14Q84 14 84 40Q84 52 74 60Q70 64 70 70H50Q50 64 46 60Q36 52 36 40Q36 14 60 14Z', 'lamp'),
    l('M54 66Q54 50 60 44Q66 50 66 66', '#e7a428', 2), r(50, 70, 20, 8, 3, '#b4bec6'), r(52, 78, 16, 7, 3, '#9aa8b2'),
    l('M44 30Q48 20 58 19', 'white', 3)
  ];
  P.night = [
    r(8, 14, 104, 80, 16, '#2c3f6b'), p('M76 28Q56 32 56 52Q56 72 78 76Q62 68 62 52Q62 36 76 28Z', '#f7e59a'),
    ...[[28, 32], [40, 62], [96, 40], [92, 74], [24, 80]].map(([x, y]) => star(x, y, 5, 2.2, '#fff6c8', { flat: 1 }))
  ];
  P.snow = [
    e(60, 92, 30, 4, '#0b2d3a', { flat: 1, soft: 1 }),
    c(60, 72, 22, '#f4f8fb'), c(60, 38, 15, '#f4f8fb'), r(46, 18, 28, 8, 2, '#2b3238'), r(51, 6, 18, 14, 2, '#2b3238'),
    ...eye(54, 35, 2), ...eye(66, 35, 2), p('M60 40L74 43L60 45Z', 'orange'),
    c(60, 64, 2.4, 'dark', { flat: 1 }), c(60, 74, 2.4, 'dark', { flat: 1 }),
    l('M44 56L28 46M76 56L92 46', '#8a5a3a', 2.6), l('M48 50Q60 56 72 50', 'red', 4)
  ];
  P.bow = [
    p('M60 52L22 30Q12 30 14 52Q12 74 22 74Z', 'main'), p('M60 52L98 30Q108 30 106 52Q108 74 98 74Z', 'main'),
    p('M54 56L44 92L54 86L58 92L60 58Z', 'mainDark'), p('M66 56L76 92L66 86L62 92L60 58Z', 'mainDark'),
    c(60, 52, 9, 'mainDark'), l('M22 40Q28 36 36 40', 'white', 2, { soft: 1 })
  ];
  P.cow = [
    r(36, 66, 8, 24, 3, '#f4f1ea'), r(48, 68, 8, 22, 3, '#f4f1ea'), r(66, 68, 8, 22, 3, '#f4f1ea'), r(78, 66, 8, 24, 3, '#f4f1ea'),
    l('M28 56Q20 62 22 74', '#f4f1ea', 2.4), e(56, 56, 32, 18, '#f4f1ea'),
    p('M42 44Q52 40 54 50Q48 60 38 54Z', '#2b3238', { flat: 1 }), p('M62 60Q72 56 76 66Q68 72 60 66Z', '#2b3238', { flat: 1 }),
    p('M84 30L80 22M98 30L102 22', '#c9b18a', 2.4), e(91, 44, 13, 15, '#f4f1ea'), e(92, 56, 10, 7, '#f2b4bd'),
    ...eye(86, 40, 2.2), ...eye(97, 40, 2.2), c(89, 57, 1.4, 'dark', { flat: 1 }), c(95, 57, 1.4, 'dark', { flat: 1 })
  ];
  P.owl = [
    e(60, 60, 28, 32, '#a8733f'), e(60, 66, 18, 22, '#e8cfa6'),
    p('M36 34L40 20L50 30Z', '#8a5a30'), p('M84 34L80 20L70 30Z', '#8a5a30'),
    c(48, 44, 11, 'white'), c(72, 44, 11, 'white'), ...eye(48, 44, 5.4), ...eye(72, 44, 5.4),
    p('M56 52L64 52L60 60Z', 'orange'), l('M50 72L54 76M66 72L70 76M58 80L62 84', '#c9a477', 1.8),
    l('M44 92L48 88L52 92M68 92L72 88L76 92', 'orange', 2.4)
  ];

  // ---------------------------------------------------------------- drawing
  const hex = h => h.replace('#', '').match(/../g).map(x => parseInt(x, 16));
  const toHex = a => '#' + a.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  const mix = (a, b, t) => toHex(hex(a).map((v, i) => v + (hex(b)[i] - v) * t));
  const lighten = (x, t) => mix(x, '#ffffff', t),
    darken = (x, t) => mix(x, '#10202c', t);
  const attrs = o => Object.entries(o).map(([k, v]) => `${k}="${v}"`).join(' ');
  const DEFAULT_MAIN = {
    hat: '#d9534a', cup: '#4f9cc4', bus: '#f2b33d', fish: '#f39039', snail: '#e59a5a', bag: '#b98a5c',
    ship: '#9a6a43', fin: '#7f97a6', sail: '#3e8fd6', can: '#d9534a', flag: '#e0473d', drum: '#3e8fd6', tent: '#5c9e6a', lamp: '#f39039', tray: '#4f9cc4', bow: '#e86a9a', cap: '#3e8fd6', coat: '#d45c4a', mug: '#e07a3c', pen: '#3e8fd6', sock: '#e0473d', boot: '#5c9e6a', tie: '#d9534a'
  };
  let uid = 0;

  function render(parts, colour, id) {
    const defs = [],
      grads = {};
    const fillFor = x => {
      if (!grads[x]) {
        grads[x] = `${id}g${Object.keys(grads).length}`;
        defs.push(`<radialGradient id="${grads[x]}" cx=".38" cy=".3" r=".85"><stop offset="0" stop-color="${lighten(x, 0.34)}"/><stop offset=".5" stop-color="${x}"/><stop offset="1" stop-color="${darken(x, 0.22)}"/></radialGradient>`);
      }
      return `url(#${grads[x]})`;
    };
    const body = parts.map(([shape, a, role, o = {}]) => {
      const x = colour(role);
      if (o.line) return `<${shape} ${attrs(a)} fill="none" stroke="${o.shade ? darken(x, 0.3) : x}" stroke-width="${o.w}" stroke-linecap="round" stroke-linejoin="round"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;
      if (o.bare) return `<${shape} ${attrs(a)} fill="${x}"/>`;
      const look = o.soft ? 'opacity=".55"' : `stroke="${darken(x, 0.4)}" stroke-width="1.8" stroke-linejoin="round"`;
      return `<${shape} ${attrs(a)} fill="${o.flat ? x : fillFor(x)}" ${look}/>`;
    });
    return `<defs>${defs.join('')}</defs><ellipse cx="60" cy="94" rx="36" ry="4.5" fill="#0b2d3a" opacity=".16"/>${body.join('')}`;
  }

  function drawPicture(key) {
    const m = String(key).match(/^(?:(red|blue|yellow)-|(big|small)-)?(.+)$/);
    const parts = m && P[m[3]];
    if (!parts) return null;
    const main = (m[1] && MAIN[m[1]]) || DEFAULT_MAIN[m[3]] || COLOURS.red;
    const colour = role =>
      role === 'main' ? main : role === 'mainDark' ? darken(main, 0.16) : COLOURS[role] || (role.startsWith('#') ? role : COLOURS.grey);
    const inner = render(parts, colour, 'pic' + ++uid);
    const label = m[3] + (m[1] ? ', ' + m[1] : '') + (m[2] ? ', ' + m[2] : '');
    return `<svg class="pic${m[2] ? ' pic-' + m[2] : ''}" viewBox="6 6 108 94" role="img" aria-label="${label}">${
      m[2] === 'small' ? `<g transform="translate(60 96) scale(.6) translate(-60 -96)">${inner}</g>` : inner
    }</svg>`;
  }
  window.lessonPictures = { draw: drawPicture, names: Object.keys(P) };
  if (typeof readingPictureSources !== 'undefined') readingPictureSources.unshift(drawPicture);
})();
