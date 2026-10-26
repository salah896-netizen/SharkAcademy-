/* More lessons (26 October 2026): "each skill has only a few lessons, so after a week or two
 * he'll start seeing repeats." Adds lessons to every path skill, in the same formats and with
 * the same school alignment as before (Jolly Phonics groups and tricky words, Heggerty-style
 * listening, Foundation maths and science, SA letter formation):
 *   reading  +18  (three-letter words, sh ch ck ng th, ai oa ar or ou oi ie ee, tricky words, listening)
 *   maths    +7   (one more, doubles, teen numbers, shapes, longer or shorter, count back, after)
 *   science  +4   (more shark spotters, fish or not, sink or float, real or pretend, how they move)
 *   writing  +9   (o d g s i n and the words dog, sun, fin)
 * Every spoken line is recorded in the friends' voices. New picture words use detailed colour
 * pictures (Apple's emoji artwork on the iPad) where there's no drawing yet.
 * Loaded after school-pack.js, path.js and science.js.
 */

// ---------------------------------------------------------------- pictures
const morePictures = {
  dog: '🐶', pig: '🐷', bus: '🚌', pen: '🖊️', box: '📦', bed: '🛏️', hen: '🐔', fox: '🦊',
  egg: '🥚', pin: '📌', web: '🕸️', van: '🚐', ant: '🐜', bat: '🦇', cap: '🧢', mug: '☕',
  bug: '🐛', log: '🪵', leg: '🦵', chick: '🐥', chain: '⛓️', torch: '🔦', ring: '💍',
  king: '🤴', song: '🎶', bath: '🛁', lock: '🔒', boat: '⛵', goat: '🐐', coat: '🧥',
  soap: '🧼', star: '⭐', car: '🚗', jar: '🫙', fork: '🍴', corn: '🌽', cloud: '☁️',
  coin: '🪙', pie: '🥧', tie: '👔', feet: '🦶', seed: '🌱', mouse: '🐭', house: '🏠',
  cake: '🎂', snake: '🐍', apple: '🍎', key: '🔑', leaf: '🍃', sponge: '🧽', dinosaur: '🦕',
  mermaid: '🧜‍♀️', unicorn: '🦄', mammoth: '🦣', penguin: '🐧', lobster: '🦞'
};
function morePicture(key) {
  const size = key.match(/^(big|small)-/)?.[1] || '';
  const base = key.replace(/^(red|blue|yellow|big|small)-/, '');
  const emoji = morePictures[base];
  return emoji ? `<span class="emoji-pic ${size}" aria-hidden="true">${emoji}</span>` : null;
}
const preMoreReadingArt = readingArt;
readingArt = function (key) {
  if (typeof key !== 'string') return '';
  return morePicture(key) || preMoreReadingArt(key);
};

// ---------------------------------------------------------------- reading
// Three-letter words: tap each tile to hear its sound, then blend.
function cvcClue(word, options, reveal) {
  return {
    kind: 'read',
    word,
    sounds: [...word],
    options,
    answer: word,
    reveal,
    codes: PHONICS_CODES.cvc,
    prompt: 'Read the word. Which picture matches?',
    hint: `Say each sound: ${[...word].join(', ')}. Now blend them together.`
  };
}
function soundClue(word, sounds, options, reveal, codes = PHONICS_CODES.digraph) {
  return readClue(word, sounds, options, word, reveal, codes);
}
const sizeHint = 'Let’s read together, one word at a time. Is it big or small?';
const moreReadingLessons = [
  {
    id: 'R-F-CVC-01',
    shelfName: 'Dog’s day out',
    items: [
      cvcClue('dog', ['dog', 'pig', 'bus'], 'A dog! It wants to play on the beach.'),
      cvcClue('pig', ['pen', 'pig', 'box'], 'A pig! It is rolling in the mud.'),
      cvcClue('bus', ['bed', 'hen', 'bus'], 'A bus! Let’s ride to the sea.'),
      messageClue('A big dog.', ['small-dog', 'big-dog', 'big-pig'], 'big-dog', 'The big dog! Woof!', sizeHint)
    ]
  },
  {
    id: 'R-F-CVC-02',
    shelfName: 'Farm friends',
    items: [
      cvcClue('hen', ['hen', 'fox', 'egg'], 'A hen! She lays eggs.'),
      cvcClue('fox', ['box', 'dog', 'fox'], 'A fox! It has a bushy tail.'),
      cvcClue('egg', ['cup', 'egg', 'bed'], 'An egg! Crack, crack!'),
      messageClue('A small hen.', ['big-hen', 'small-hen', 'small-fox'], 'small-hen', 'The small hen! Cluck, cluck!', sizeHint)
    ]
  },
  {
    id: 'R-F-CVC-03',
    shelfName: 'Bedtime',
    items: [
      cvcClue('bed', ['bus', 'bed', 'pen'], 'A bed! Time to rest.'),
      cvcClue('pen', ['pen', 'pin', 'web'], 'A pen! Let’s draw a shark.'),
      cvcClue('web', ['van', 'bed', 'web'], 'A web! A spider made it.'),
      messageClue('A big bus.', ['small-bus', 'big-van', 'big-bus'], 'big-bus', 'The big bus! Beep, beep!', sizeHint)
    ]
  },
  {
    id: 'R-F-CVC-04',
    shelfName: 'Little bugs',
    items: [
      cvcClue('ant', ['ant', 'bat', 'cap'], 'An ant! It is tiny but strong.'),
      cvcClue('bug', ['mug', 'bus', 'bug'], 'A bug! It is crawling on a leaf.'),
      cvcClue('bat', ['cat', 'bat', 'hat'], 'A bat! It flies at night.'),
      cvcClue('mug', ['mug', 'cup', 'bug'], 'A mug! It is full of warm milk.')
    ]
  },
  {
    id: 'R-F-JP-06',
    shelfName: 'Chick and chain',
    items: [
      soundClue('chick', ['ch', 'i', 'ck'], ['duck', 'chick', 'chip'], 'A chick! Cheep, cheep!'),
      soundClue('chain', ['ch', 'ai', 'n'], ['chain', 'train', 'rain'], 'A chain! It holds the anchor.'),
      soundClue('torch', ['t', 'or', 'ch'], ['fork', 'chick', 'torch'], 'A torch! It lights up the deep sea.'),
      messageClue('A blue fish.', ['red-fish', 'blue-fish', 'yellow-fish'], 'blue-fish', 'The blue fish! It swims past the chain.')
    ]
  },
  {
    id: 'R-F-JP-07',
    shelfName: 'King of the reef',
    items: [
      soundClue('ring', ['r', 'i', 'ng'], ['king', 'ring', 'song'], 'A ring! It sparkles in the sand.'),
      soundClue('king', ['k', 'i', 'ng'], ['king', 'chick', 'ring'], 'A king! He has a golden crown.'),
      soundClue('song', ['s', 'o', 'ng'], ['ship', 'ring', 'song'], 'A song! Willa loves to sing.'),
      messageClue('A yellow ship.', ['yellow-ship', 'red-ship', 'blue-ship'], 'yellow-ship', 'The yellow ship! The king is on board.')
    ]
  },
  {
    id: 'R-F-JP-08',
    shelfName: 'Bath and dish',
    items: [
      soundClue('bath', ['b', 'a', 'th'], ['bed', 'bath', 'bus'], 'A bath! Splash, splash!'),
      soundClue('lock', ['l', 'o', 'ck'], ['sock', 'rock', 'lock'], 'A lock! It keeps the treasure safe.'),
      soundClue('dish', ['d', 'i', 'sh'], ['dish', 'fish', 'ship'], 'A dish! Dinner is ready.'),
      messageClue('A small shell.', ['big-shell', 'small-shell', 'small-fish'], 'small-shell', 'The small shell! It fits in my hand.', sizeHint)
    ]
  },
  {
    id: 'R-F-JP-09',
    shelfName: 'Goat in a boat',
    items: [
      soundClue('boat', ['b', 'oa', 't'], ['boat', 'goat', 'coat'], 'A boat! Let’s sail away.', PHONICS_CODES.longVowel),
      soundClue('goat', ['g', 'oa', 't'], ['coat', 'boat', 'goat'], 'A goat! It is in the boat.', PHONICS_CODES.longVowel),
      soundClue('coat', ['c', 'oa', 't'], ['coat', 'sock', 'boat'], 'A coat! It keeps the goat warm.', PHONICS_CODES.longVowel),
      soundClue('soap', ['s', 'oa', 'p'], ['snail', 'sock', 'soap'], 'Soap! Bubbles everywhere.', PHONICS_CODES.longVowel)
    ]
  },
  {
    id: 'R-F-JP-10',
    shelfName: 'Star car',
    items: [
      soundClue('star', ['s', 't', 'ar'], ['car', 'star', 'jar'], 'A star! It twinkles at night.', PHONICS_CODES.longVowel),
      soundClue('car', ['c', 'ar'], ['bus', 'jar', 'car'], 'A car! Vroom, vroom!', PHONICS_CODES.longVowel),
      soundClue('jar', ['j', 'ar'], ['jar', 'car', 'cup'], 'A jar! It is full of shells.', PHONICS_CODES.longVowel),
      soundClue('fork', ['f', 'or', 'k'], ['spoon', 'corn', 'fork'], 'A fork! Time for lunch.', PHONICS_CODES.longVowel)
    ]
  },
  {
    id: 'R-F-JP-11',
    shelfName: 'Cloud and coin',
    items: [
      soundClue('cloud', ['c', 'l', 'ou', 'd'], ['rain', 'cloud', 'moon'], 'A cloud! It floats in the sky.', PHONICS_CODES.longVowel),
      soundClue('coin', ['c', 'oi', 'n'], ['coin', 'corn', 'cup'], 'A coin! Pirate treasure!', PHONICS_CODES.longVowel),
      soundClue('pie', ['p', 'ie'], ['tie', 'bee', 'pie'], 'A pie! Yum, yum!', PHONICS_CODES.longVowel),
      soundClue('tie', ['t', 'ie'], ['tie', 'pie', 'boot'], 'A tie! The captain looks smart.', PHONICS_CODES.longVowel)
    ]
  },
  {
    id: 'R-F-JP-12',
    shelfName: 'Feet and seeds',
    items: [
      soundClue('feet', ['f', 'ee', 't'], ['boot', 'feet', 'tree'], 'Feet! Wiggle your toes.', PHONICS_CODES.longVowel),
      soundClue('seed', ['s', 'ee', 'd'], ['seed', 'sheep', 'bee'], 'A seed! It will grow into a plant.', PHONICS_CODES.longVowel),
      soundClue('tree', ['t', 'r', 'ee'], ['bee', 'seed', 'tree'], 'A tree! It grows tall and green.', PHONICS_CODES.longVowel),
      messageClue('A blue boot.', ['red-boot', 'yellow-boot', 'blue-boot'], 'blue-boot', 'The blue boot! Ready for puddles.')
    ]
  },
  {
    id: 'R-F-LS-04',
    shelfName: 'Rhyme time',
    items: [
      rhymeClue('dog', ['bee', 'log', 'sun'], 'log', 'Dog, log! They rhyme.'),
      rhymeClue('fox', ['pig', 'hat', 'box'], 'box', 'Fox, box! Same ending sound.'),
      firstSoundClue('bus', ['bed', 'sun', 'fish'], 'bed', 'Bus, bed! They start the same way.'),
      blendClue(['fff', 'ox'], 'fox', ['box', 'fox', 'dog'], 'Fff… ox. Fox! You blended it.')
    ]
  },
  {
    id: 'R-F-LS-05',
    shelfName: 'Listening king',
    items: [
      rhymeClue('king', ['ring', 'cat', 'moon'], 'ring', 'King, ring! They rhyme.'),
      rhymeClue('goat', ['bee', 'cup', 'boat'], 'boat', 'Goat, boat! Same ending sound.'),
      firstSoundClue('pig', ['hen', 'pen', 'dog'], 'pen', 'Pig, pen! They start the same way.'),
      blendClue(['mmm', 'ug'], 'mug', ['bug', 'cup', 'mug'], 'Mmm… ug. Mug! Great blending.')
    ]
  },
  {
    id: 'R-F-LS-06',
    shelfName: 'Star listening',
    items: [
      rhymeClue('star', ['fish', 'car', 'rock'], 'car', 'Star, car! They rhyme.'),
      rhymeClue('hen', ['pen', 'bus', 'tree'], 'pen', 'Hen, pen! Same ending sound.'),
      firstSoundClue('dog', ['cat', 'sun', 'duck'], 'duck', 'Dog, duck! They start the same way.'),
      blendClue(['rrr', 'ing'], 'ring', ['king', 'song', 'ring'], 'Rrr… ing. Ring! You blended it.')
    ]
  },
  {
    id: 'R-F-LS-07',
    shelfName: 'Mouse house',
    items: [
      rhymeClue('mouse', ['house', 'fox', 'bee'], 'house', 'Mouse, house! They rhyme.'),
      rhymeClue('cake', ['cat', 'snake', 'star'], 'snake', 'Cake, snake! Same ending sound.'),
      firstSoundClue('moon', ['net', 'map', 'cup'], 'map', 'Moon and map both start with mmm.'),
      blendClue(['lll', 'eg'], 'leg', ['egg', 'log', 'leg'], 'Lll… eg. Leg! Great blending.')
    ]
  },
  {
    id: 'R-F-TW-03',
    shelfName: 'We and me',
    items: [
      trickyClue('we', ['we', 'me', 'be'], 'We! We swim together.'),
      trickyClue('me', ['he', 'we', 'me'], 'Me! Swim with me.'),
      trickyClue('be', ['she', 'be', 'he'], 'Be! You can be a shark.'),
      trickyClue('go', ['no', 'so', 'go'], 'Go! Ready, set, go!')
    ]
  },
  {
    id: 'R-F-TW-04',
    shelfName: 'Go and do',
    items: [
      trickyClue('no', ['no', 'on', 'go'], 'No! No sharks in the bath.'),
      trickyClue('do', ['to', 'do', 'go'], 'Do! What do sharks eat?'),
      trickyClue('are', ['all', 'ant', 'are'], 'Are! You are a star.'),
      trickyClue('all', ['all', 'are', 'at'], 'All! All the fish swim away.')
    ]
  },
  {
    id: 'R-F-TW-05',
    shelfName: 'My word shells',
    items: [
      trickyClue('my', ['me', 'my', 'by'], 'My! This is my shell.'),
      trickyClue('they', ['the', 'then', 'they'], 'They! They are friends.'),
      trickyClue('come', ['come', 'some', 'cone'], 'Come! Come and see.'),
      trickyClue('some', ['same', 'come', 'some'], 'Some! Some fish are blue.')
    ]
  }
];
moreReadingLessons.forEach(l => (l.school = true));
readingMissionLibrary.push(...moreReadingLessons);
// Weave the new lessons in after the old ones of the same kind, so each session keeps mixing
// listening, sounds and tricky words, and the first lessons he knows stay first.
{
  const order = readingMissionLibrary.map(l => l.id).filter(id => !moreReadingLessons.some(l => l.id === id));
  const extra = ['R-F-CVC-01', 'R-F-LS-04', 'R-F-JP-06', 'R-F-TW-03', 'R-F-CVC-02', 'R-F-JP-09', 'R-F-LS-05',
    'R-F-JP-07', 'R-F-CVC-03', 'R-F-TW-04', 'R-F-JP-10', 'R-F-LS-06', 'R-F-JP-08', 'R-F-CVC-04', 'R-F-JP-11',
    'R-F-TW-05', 'R-F-LS-07', 'R-F-JP-12'];
  order.push(...extra);
  readingMissionLibrary.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}

// ---------------------------------------------------------------- maths
function photoShark(id, width) {
  const p = typeof sharkPhotoData !== 'undefined' ? sharkPhotoData[id]?.[0] : null;
  return p ? `<img class="measure-shark" style="width:${width}%" src="assets/${p.file}" alt="">` : seaAnimal('hammerhead');
}
const shapeArt = {
  circle: '<circle cx="50" cy="50" r="38"/>',
  triangle: '<path d="M50 12L90 86H10Z"/>',
  square: '<rect x="14" y="14" width="72" height="72" rx="4"/>',
  rectangle: '<rect x="4" y="26" width="92" height="48" rx="4"/>'
};
function shapeButton(name, value, colour) {
  return `<button class="compare-group shape-choice" data-group-choice="${value}" aria-label="${name}"><svg viewBox="0 0 100 100" aria-hidden="true"><g fill="${colour}" stroke="#2c4a57" stroke-width="4">${shapeArt[name]}</g></svg></button>`;
}
Object.assign(schoolMathsBuilders, {
  onemore(i, cycle, lesson, number) {
    const n = [3, 5, 2, 7, 4, 6, 8, 1, 9][(i * 2 + cycle) % 9],
      kind = oceanSpecies[(number + i) % oceanSpecies.length];
    return {
      scene: `<div class="maths-model"><div class="maths-group">${animalCollection(n, kind)}</div><b aria-hidden="true">+</b><div class="maths-group one-more-arrives">${animalCollection(1, kind)}</div></div>`,
      prompt: 'One more is coming! How many will there be?',
      answer: n + 1,
      choices: numberChoices(n + 1, [n]),
      hint: 'Count the first group. Then say the next number. One more is the next number.'
    };
  },
  doubles(i, cycle, lesson, number) {
    const n = [2, 3, 1, 4, 5][(i + cycle) % 5],
      kind = oceanSpecies[(number + i * 3) % oceanSpecies.length];
    return {
      scene: `<div class="maths-model doubles-model"><div class="maths-group">${animalCollection(n, kind)}</div><b aria-hidden="true">|</b><div class="maths-group">${animalCollection(n, kind)}</div></div>`,
      prompt: 'Double! Both sides are the same. How many altogether?',
      answer: n * 2,
      choices: numberChoices(n * 2, [n]),
      hint: 'Count one side. The other side is the same. Now count them all.'
    };
  },
  teen(i, cycle) {
    const extra = [3, 6, 1, 8, 4, 2, 7, 5, 9][(i * 2 + cycle) % 9];
    return {
      scene: `<div class="teen-model">${tenFrame(10)}${tenFrame(extra)}</div>`,
      prompt: 'Ten, and some more. How many counters?',
      answer: 10 + extra,
      choices: numberChoices(10 + extra),
      hint: 'The first ten-frame is full. That is ten. Count on from ten.'
    };
  },
  shapes(i, cycle) {
    const names = ['circle', 'triangle', 'square', 'rectangle'],
      target = names[(i + cycle) % 4],
      colours = ['#f2c84b', '#ee7d78', '#86c6da'],
      others = names.filter(n => n !== target),
      shown = [target, others[(i + cycle) % 3], others[(i + cycle + 1) % 3]],
      order = [0, 1, 2].map(k => shown[(k + i) % 3]);
    return {
      scene: `<div class="compare-model shapes-model">${order.map((n, k) => shapeButton(n, n === target ? 'yes' : 'no-' + k, colours[k])).join('')}</div>`,
      prompt: `Find the ${target}.`,
      answer: 'yes',
      choices: ['yes', 'no-0', 'no-1', 'no-2'],
      groupChoice: true,
      hint: {
        circle: 'A circle is round all the way around. It has no corners.',
        triangle: 'A triangle has three sides and three corners.',
        square: 'A square has four sides, all the same length.',
        rectangle: 'A rectangle has four sides. Two are long and two are short.'
      }[target]
    };
  },
  measure(i, cycle) {
    const sharks = ['white', 'tiger', 'mako', 'hammerhead', 'whale', 'bull'],
      a = sharks[(i + cycle) % sharks.length],
      b = sharks[(i + cycle + 2) % sharks.length],
      firstLonger = (i + cycle) % 2 === 0,
      askLonger = (i * 3 + cycle) % 2 === 0,
      answer = firstLonger === askLonger ? 'first' : 'second',
      lane = (id, w, value) =>
        `<button class="compare-group measure-lane" data-group-choice="${value}" aria-label="${value === 'first' ? 'Top shark' : 'Bottom shark'}">${photoShark(id, w)}</button>`;
    return {
      scene: `<div class="compare-model measure-model">${lane(a, firstLonger ? 92 : 52, 'first')}${lane(b, firstLonger ? 52 : 92, 'second')}</div>`,
      prompt: askLonger ? 'Which shark picture is longer? Tap it.' : 'Which shark picture is shorter? Tap it.',
      answer,
      choices: ['first', 'second'],
      groupChoice: true,
      hint: askLonger
        ? 'Line up the noses. Which tail reaches further?'
        : 'Line up the noses. Which tail stops first?'
    };
  },
  countback(i, cycle) {
    const start = [5, 8, 10, 6, 9, 7, 4][(i + cycle) % 7],
      shown = [start, start - 1, start - 2];
    return {
      scene: `<div class="number-swim countdown" aria-label="Counting back">${shown.map(n => `<span>${n}</span>`).join('<i aria-hidden="true"></i>')}<i aria-hidden="true"></i><span class="missing">?</span></div>`,
      prompt: `Count back. ${shown.join(', ')}. What comes next?`,
      answer: start - 3,
      choices: numberChoices(start - 3, [start - 1]),
      hint: 'Counting back, each number is one less. Say the numbers again, slowly.'
    };
  },
  after(i, cycle) {
    const n = [4, 9, 12, 6, 15, 8, 11, 17, 3][(i * 2 + cycle) % 9];
    return {
      scene: `<div class="number-swim" aria-label="Number line">${[n - 1, n, '?'].map(v => `<span class="${v === '?' ? 'missing' : ''}">${v}</span>`).join('<i aria-hidden="true"></i>')}</div>`,
      prompt: `What number comes after ${n}?`,
      answer: n + 1,
      choices: numberChoices(n + 1, [n - 1]),
      hint: 'Count up to the number, then say one more.'
    };
  }
});
const moreMathsLessons = [
  { id: 'M-F-10', kind: 'onemore', shelfName: 'One more fish', name: 'One more fish', codes: ['AC9MFN01', 'AC9MFN04'] },
  { id: 'M-F-11', kind: 'doubles', shelfName: 'Double trouble', name: 'Double trouble', codes: ['AC9MFN04'] },
  { id: 'M-F-12', kind: 'teen', shelfName: 'Ten and more', name: 'Ten and more', codes: ['AC9MFN01', 'AC9MFN02'] },
  { id: 'M-F-13', kind: 'shapes', shelfName: 'Shape hunt', name: 'Shape hunt', codes: ['AC9MFSP01'] },
  { id: 'M-F-14', kind: 'measure', shelfName: 'Longer or shorter', name: 'Longer or shorter', codes: ['AC9MFM01'] },
  { id: 'M-F-15', kind: 'countback', shelfName: 'Countdown', name: 'Countdown', codes: ['AC9MFN01'] },
  { id: 'M-F-16', kind: 'after', shelfName: 'What comes next?', name: 'What comes next?', codes: ['AC9MFN01'] }
];
mathsAdventures.push(...moreMathsLessons);
{
  const order = ['M-F-01', 'M-F-05', 'M-F-10', 'M-F-02', 'M-F-13', 'M-F-06', 'M-F-07', 'M-F-11', 'M-F-03',
    'M-F-16', 'M-F-08', 'M-F-14', 'M-F-04', 'M-F-12', 'M-F-09', 'M-F-15'];
  mathsAdventures.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}
Object.assign(thinkingByKind, {
  onemore: ['counted-on', 'one-by-one', 'fingers'],
  doubles: ['one-by-one', 'counted-on', 'fingers'],
  teen: ['counted-on', 'one-by-one', 'just-saw'],
  shapes: ['just-saw', 'one-by-one', 'matched'],
  measure: ['matched', 'just-saw', 'one-by-one'],
  countback: ['counted-back', 'fingers', 'just-saw'],
  after: ['counted-along', 'fingers', 'just-saw']
});
const preMoreMathsCardArt = schoolMathsCardArt;
schoolMathsCardArt = function (record) {
  if (record.kind === 'onemore')
    return `<div class="lesson-mini-model">${seaAnimal('tuna')}${seaAnimal('tuna')}<b>+1</b></div>`;
  if (record.kind === 'doubles')
    return `<div class="lesson-mini-model">${seaAnimal('crab')}<b>|</b>${seaAnimal('crab')}</div>`;
  if (record.kind === 'teen') return tenFrame(10);
  if (record.kind === 'shapes')
    return `<svg class="shape-card" viewBox="0 0 300 100" aria-hidden="true"><g stroke="#2c4a57" stroke-width="4"><circle cx="50" cy="50" r="36" fill="#f2c84b"/><path d="M150 14L188 86H112Z" fill="#ee7d78"/><rect x="214" y="16" width="70" height="70" rx="4" fill="#86c6da"/></g></svg>`;
  if (record.kind === 'measure') return `<div class="measure-card">${photoShark('mako', 90)}${photoShark('mako', 55)}</div>`;
  if (record.kind === 'countback')
    return '<div class="number-swim mini"><span>3</span><i></i><span>2</span><i></i><span class="missing">?</span></div>';
  if (record.kind === 'after')
    return '<div class="number-swim mini"><span>7</span><i></i><span>8</span><i></i><span class="missing">?</span></div>';
  return preMoreMathsCardArt(record);
};

// ---------------------------------------------------------------- science
if (typeof sharkPhotoData !== 'undefined')
  for (const [id, name] of [
    ['thresher', 'Thresher shark'],
    ['wobbegong', 'Wobbegong'],
    ['blacktip', 'Blacktip reef shark'],
    ['portjackson', 'Port Jackson shark'],
    ['zebra', 'Zebra shark'],
    ['bull', 'Bull shark'],
    ['greynurse', 'Grey nurse shark'],
    ['greenland', 'Greenland shark']
  ]) {
    const p = sharkPhotoData[id]?.[0];
    if (p && !scienceArt[id])
      scienceArt[id] = {
        name,
        art: `<span class="science-photo-frame"><span class="science-photo-fill" style="background-image:url('assets/${p.file}')"></span><img class="science-photo contain" src="assets/${p.file}" alt=""></span>`
      };
  }
const moreScienceLessons = [
  {
    id: 'S-F-06',
    shelfName: 'Aussie shark spotters',
    picture: 'wobbegong',
    intro: 'More sharks to spot! Look very closely at each one.',
    items: [
      { kind: 'photo', ask: 'Which shark has a long tail, like a whip?', options: ['bull', 'thresher', 'zebra'], answer: 'thresher', reveal: 'The thresher shark! It whips its tail to stun little fish.' },
      { kind: 'photo', ask: 'Which shark has blotchy skin, so it can hide on the sea floor?', options: ['wobbegong', 'blacktip', 'greynurse'], answer: 'wobbegong', reveal: 'The wobbegong! It hides and waits for food to swim past.' },
      { kind: 'photo', ask: 'Which shark has black tips on its fins?', options: ['portjackson', 'thresher', 'blacktip'], answer: 'blacktip', reveal: 'The blacktip reef shark! Look at its dark fin tips.' },
      { kind: 'photo', ask: 'Which shark has dark stripes, like a harness?', options: ['bull', 'portjackson', 'greynurse'], answer: 'portjackson', reveal: 'The Port Jackson shark! It lives near Adelaide too.' },
      { kind: 'photo', ask: 'Which shark has lots of dark spots?', options: ['zebra', 'thresher', 'bull'], answer: 'zebra', reveal: 'The zebra shark! Babies have stripes, grown-ups have spots.' }
    ],
    codes: scienceCodes.observe
  },
  {
    id: 'S-F-07',
    shelfName: 'Fish or not? Part two',
    picture: 'octopus',
    intro: 'Fish have fins and breathe with gills. Let’s sort some more sea animals!',
    items: [
      { kind: 'sort', animal: 'octopus', ask: 'An octopus. Is it a fish?', options: ['fish', 'notfish'], answer: 'notfish', reveal: 'Not a fish! An octopus has eight arms and no fins.' },
      { kind: 'sort', animal: 'tuna', ask: 'A tuna. Is it a fish?', options: ['fish', 'notfish'], answer: 'fish', reveal: 'A fish! It has fins and breathes with gills.' },
      { kind: 'sort', animal: 'squid', ask: 'A squid. Is it a fish?', options: ['fish', 'notfish'], answer: 'notfish', reveal: 'Not a fish! A squid is a cousin of the octopus.' },
      { kind: 'sort', animal: 'wobbegong', ask: 'A wobbegong shark. Is it a fish?', options: ['fish', 'notfish'], answer: 'fish', reveal: 'A fish! All sharks are fish.' },
      { kind: 'sort', animal: 'penguin', ask: 'A penguin. Is it a fish?', options: ['fish', 'notfish'], answer: 'notfish', reveal: 'Not a fish! A penguin is a bird that swims.' }
    ],
    codes: scienceCodes.sort
  },
  {
    id: 'S-F-08',
    shelfName: 'Sink or float? Part two',
    picture: 'apple',
    intro: 'Scientists guess first, then test. Will it sink or float? Make your guess!',
    items: [
      { kind: 'predict', object: 'apple', ask: 'An apple. Will it sink or float?', options: ['sink', 'float'], answer: 'float', reveal: 'It floated! An apple has air inside.' },
      { kind: 'predict', object: 'coin', ask: 'A coin. Will it sink or float?', options: ['sink', 'float'], answer: 'sink', reveal: 'It sank! Metal coins are heavy for their size.' },
      { kind: 'predict', object: 'leaf', ask: 'A leaf. Will it sink or float?', options: ['sink', 'float'], answer: 'float', reveal: 'It floated! A leaf is light and flat.' },
      { kind: 'predict', object: 'key', ask: 'A key. Will it sink or float?', options: ['sink', 'float'], answer: 'sink', reveal: 'It sank! A metal key is heavy for its size.' },
      { kind: 'predict', object: 'sponge', ask: 'A dry sponge. Will it sink or float?', options: ['sink', 'float'], answer: 'float', reveal: 'It floated! A sponge is full of air holes.' }
    ],
    codes: scienceCodes.predict
  },
  {
    id: 'S-F-09',
    shelfName: 'How do they move? Part two',
    picture: 'penguin',
    intro: 'Sea animals move in different ways. How does each one move?',
    items: [
      { kind: 'move', animal: 'dolphin', ask: 'How does a dolphin swim?', options: ['walk', 'tail', 'jet'], answer: 'tail', reveal: 'Its tail! A dolphin moves its tail up and down.' },
      { kind: 'move', animal: 'octopus', ask: 'How does an octopus zoom away?', options: ['jet', 'flippers', 'tail'], answer: 'jet', reveal: 'It squirts water, like a jet!' },
      { kind: 'move', animal: 'penguin', ask: 'How does a penguin swim?', options: ['walk', 'jet', 'flippers'], answer: 'flippers', reveal: 'Flippers! A penguin flies through the water.' },
      { kind: 'move', animal: 'lobster', ask: 'How does a lobster get around the sea floor?', options: ['tail', 'walk', 'flippers'], answer: 'walk', reveal: 'It walks on its legs!' },
      { kind: 'move', animal: 'tuna', ask: 'How does a tuna swim so fast?', options: ['flippers', 'walk', 'tail'], answer: 'tail', reveal: 'Its tail! It swishes from side to side.' }
    ],
    codes: scienceCodes.move
  },
  {
    id: 'S-F-10',
    shelfName: 'Real or pretend? Part two',
    picture: 'unicorn',
    intro: 'Is it a real animal today, a real animal from long ago, or pretend?',
    items: [
      { kind: 'real', animal: 'dinosaur', ask: 'A dinosaur.', options: ['today', 'longago', 'pretend'], answer: 'longago', reveal: 'Real, long ago! We find dinosaur fossils.' },
      { kind: 'real', animal: 'mermaid', ask: 'A mermaid.', options: ['today', 'longago', 'pretend'], answer: 'pretend', reveal: 'Pretend! Mermaids live in stories.' },
      { kind: 'real', animal: 'greenland', ask: 'A Greenland shark.', options: ['today', 'longago', 'pretend'], answer: 'today', reveal: 'Real today! It swims in icy seas right now.' },
      { kind: 'real', animal: 'unicorn', ask: 'A unicorn.', options: ['today', 'longago', 'pretend'], answer: 'pretend', reveal: 'Pretend! Unicorns are make-believe.' },
      { kind: 'real', animal: 'mammoth', ask: 'A woolly mammoth.', options: ['today', 'longago', 'pretend'], answer: 'longago', reveal: 'Real, long ago! Mammoths lived in the ice age.' }
    ],
    codes: scienceCodes.real
  }
];
scienceLessons.push(...moreScienceLessons);
{
  const order = ['S-F-01', 'S-F-02', 'S-F-03', 'S-F-06', 'S-F-04', 'S-F-07', 'S-F-05', 'S-F-08', 'S-F-09', 'S-F-10'];
  scienceLessons.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}
// Shelf cards for the new science lessons show their own picture.
const preMoreScienceShelf = scienceShelf;
scienceShelf = function () {
  preMoreScienceShelf();
  document.querySelectorAll('[data-science-lesson]').forEach(card => {
    const lesson = scienceLessons.find(l => l.id === card.dataset.scienceLesson);
    const art = card.querySelector('.lesson-card-art');
    if (lesson?.picture && art) art.innerHTML = sciencePicture(lesson.picture);
  });
};
const preMoreSciencePicture = sciencePicture;
sciencePicture = function (key) {
  if (!key) return '';
  return preMoreSciencePicture(key);
};

// ---------------------------------------------------------------- writing
const moreWritingLessons = [
  { id: 'W-F-01D', target: 'o', shelfName: 'Bubble o', goal: 'Let’s make an o, round like a bubble.' },
  { id: 'W-F-01E', target: 'd', shelfName: 'Diving d', goal: 'Let’s make a d for our diving log.' },
  { id: 'W-F-01F', target: 'g', shelfName: 'Glowing g', goal: 'Let’s make a g for a glowing fish.' },
  { id: 'W-F-01G', target: 's', shelfName: 'Snaky s', goal: 'Let’s make an s, wiggly like a sea snake.' },
  { id: 'W-F-01H', target: 'i', shelfName: 'Little i', goal: 'Let’s make an i, with a dot on top.' },
  { id: 'W-F-01I', target: 'n', shelfName: 'Net n', goal: 'Let’s make an n for our fishing net.' },
  { id: 'W-F-02B', target: 'dog', shelfName: 'Sea dog', goal: 'Let’s write dog, for a dog on the beach.' },
  { id: 'W-F-02C', target: 'sun', shelfName: 'Sunny sun', goal: 'Let’s write sun, for a sunny day.' },
  { id: 'W-F-02D', target: 'fin', shelfName: 'Shark fin', goal: 'Let’s write fin, like a shark’s fin.' }
];
const oldWritingNames = ['Captain’s c', 'Adventure a', 'Treasure t', 'Ship’s cat'];
writingAdventures.forEach((l, i) => (l.shelfName = l.shelfName || oldWritingNames[i]));
writingAdventures.push(...moreWritingLessons);
{
  const order = ['W-F-01A', 'W-F-01B', 'W-F-01D', 'W-F-01E', 'W-F-01F', 'W-F-01C', 'W-F-02A', 'W-F-01G',
    'W-F-01H', 'W-F-01I', 'W-F-02C', 'W-F-02D', 'W-F-02B'];
  writingAdventures.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}

// ---------------------------------------------------------------- the learning path
{
  const add = (skill, ids) => {
    const s = pathSkills.find(x => x.id === skill);
    if (s) s.lessons.push(...ids.filter(id => !s.lessons.includes(id)));
  };
  add('cvc', ['R-F-CVC-01', 'R-F-CVC-02', 'R-F-CVC-03', 'R-F-CVC-04']);
  add('listen', ['R-F-LS-04', 'R-F-LS-05', 'R-F-LS-06', 'R-F-LS-07']);
  add('digraph', ['R-F-JP-06', 'R-F-JP-07', 'R-F-JP-08']);
  add('vowels', ['R-F-JP-09', 'R-F-JP-10', 'R-F-JP-11', 'R-F-JP-12']);
  add('tricky', ['R-F-TW-03', 'R-F-TW-04', 'R-F-TW-05']);
  add('count', ['M-F-10', 'M-F-12', 'M-F-16']);
  add('add', ['M-F-11']);
  add('order', ['M-F-15']);
  add('patterns', ['M-F-13', 'M-F-14']);
  add('sci-look', ['S-F-06', 'S-F-07']);
  add('sci-move', ['S-F-08', 'S-F-09']);
  add('sci-real', ['S-F-10']);
  add('letters', ['W-F-01D', 'W-F-01E', 'W-F-01F', 'W-F-01G', 'W-F-01H', 'W-F-01I', 'W-F-02B', 'W-F-02C', 'W-F-02D']);
}
