/* School-aligned lesson batch, 24 October 2026.
 *
 * Follows Haytham's school (Reception, Term 4): Jolly Phonics sound groups and tricky words,
 * Heggerty-style listening warm-ups (no letters on screen), and Foundation maths with a
 * "how did you work it out?" step for the school's visible-thinking approach.
 *
 * Practice evidence only: picture matching and listening choices are not oral-reading or
 * mastery assessments. Help and retries are recorded as supported, exactly as before.
 * Loaded last; wraps readingArt, readingMission, makeQuestions and play.
 */

// ---------------------------------------------------------------- pictures
const schoolColours = { red: '#ee7d78', blue: '#86c6da', yellow: '#f2d274' };
function schoolColour(key, fallback) {
  const tint = key.split('-')[0];
  return schoolColours[tint] || fallback;
}
function schoolPicture(key) {
  const base = key.replace(/^(red|blue|yellow|big|small)-/, '');
  const small = key.startsWith('small-');
  const svg = body =>
    `<svg viewBox="0 0 120 100" aria-hidden="true">${small ? `<g transform="translate(30 30) scale(.5)">${body}</g>` : body}</svg>`;
  const ink = '#4d6b75';
  switch (base) {
    case 'ship':
      return svg(
        `<path d="M58 12V62" stroke="${ink}" stroke-width="4"/><path d="M61 15L95 56H61Z" fill="#f6efdc" stroke="${ink}" stroke-width="3"/><path d="M55 22L27 56H55Z" fill="#e8dfc4" stroke="${ink}" stroke-width="3"/><path d="M14 63H106L94 85H26Z" fill="${schoolColour(key, '#b88a5c')}" stroke="${ink}" stroke-width="3"/><path d="M8 90Q24 84 40 90T72 90T112 90" fill="none" stroke="#7fc4d4" stroke-width="4"/>`
      );
    case 'shell':
      return svg(
        `<path d="M60 88L22 52Q14 24 38 18Q48 6 60 14Q72 6 82 18Q106 24 98 52Z" fill="#f4d9c6" stroke="#c48d71" stroke-width="3"/><path d="M60 86V18M60 86L36 24M60 86L84 24M60 86L24 46M60 86L96 46" stroke="#d9a98c" stroke-width="3" fill="none"/><path d="M48 88H72V94H48Z" fill="#e7bfa6"/>`
      );
    case 'fish':
      return svg(
        `<path d="M16 50Q48 18 86 46L108 28L102 50L108 72L86 54Q48 82 16 50Z" fill="${schoolColour(key, '#f3a75b')}" stroke="#b5703c" stroke-width="3"/><circle cx="34" cy="45" r="4" fill="#1f3640"/><path d="M50 36Q56 50 50 64" fill="none" stroke="#b5703c" stroke-width="3"/>`
      );
    case 'dish':
      return svg(
        `<ellipse cx="60" cy="58" rx="48" ry="16" fill="#e9f2f2" stroke="${ink}" stroke-width="3"/><path d="M12 58Q60 98 108 58" fill="#d3e6e8" stroke="${ink}" stroke-width="3"/><ellipse cx="60" cy="58" rx="30" ry="8" fill="none" stroke="#a9c9cf" stroke-width="3"/>`
      );
    case 'chip':
      return svg(
        `<path d="M44 20L50 66M58 14L60 66M72 18L68 66M84 26L76 66M36 30L44 66" stroke="#f3c94d" stroke-width="9" stroke-linecap="round"/><path d="M32 52H88L80 92H40Z" fill="#e8665d" stroke="#a9433d" stroke-width="3"/><path d="M48 66H72" stroke="#ffd7cf" stroke-width="4"/>`
      );
    case 'duck':
      return svg(
        `<path d="M18 62Q22 86 58 86Q96 86 100 58Q84 66 70 58Q66 40 52 40Q34 40 36 58Q26 52 18 62Z" fill="#f5d356" stroke="#c39a2b" stroke-width="3"/><circle cx="52" cy="34" r="16" fill="#f5d356" stroke="#c39a2b" stroke-width="3"/><path d="M34 34L18 38L34 42Z" fill="#f08a3c"/><circle cx="48" cy="30" r="3" fill="#1f3640"/><path d="M8 92Q30 86 52 92T112 92" fill="none" stroke="#7fc4d4" stroke-width="4"/>`
      );
    case 'sock':
      return svg(
        `<path d="M46 10H78V56Q78 70 66 76L40 90Q22 94 20 80Q18 70 30 64L46 56Z" fill="${schoolColour(key, '#9fb7d8')}" stroke="${ink}" stroke-width="3"/><path d="M46 20H78M46 28H78" stroke="#ffffffaa" stroke-width="5"/>`
      );
    case 'rock':
      return svg(
        `<path d="M14 82Q10 52 34 40Q46 18 70 26Q98 26 106 56Q112 82 92 86H24Z" fill="#a3a9ad" stroke="#6e767b" stroke-width="3"/><path d="M40 52Q50 46 60 52M70 66Q80 60 88 66" stroke="#c4c9cc" stroke-width="4" fill="none"/>`
      );
    case 'bee':
      return svg(
        `<ellipse cx="44" cy="30" rx="16" ry="20" fill="#e3f4fa" stroke="#9cc6d3" stroke-width="3" transform="rotate(-25 44 30)"/><ellipse cx="72" cy="30" rx="16" ry="20" fill="#e3f4fa" stroke="#9cc6d3" stroke-width="3" transform="rotate(25 72 30)"/><ellipse cx="60" cy="60" rx="38" ry="26" fill="#f6cd45" stroke="#2e3438" stroke-width="3"/><path d="M48 36V84M64 34V86M80 40V80" stroke="#2e3438" stroke-width="7"/><circle cx="28" cy="56" r="4" fill="#2e3438"/>`
      );
    case 'tree':
      return svg(
        `<path d="M54 92V60H66V92Z" fill="#9b6d46" stroke="#6f4b2f" stroke-width="3"/><circle cx="60" cy="40" r="28" fill="#79b86d" stroke="#4f8a4a" stroke-width="3"/><circle cx="38" cy="54" r="16" fill="#79b86d" stroke="#4f8a4a" stroke-width="3"/><circle cx="82" cy="54" r="16" fill="#79b86d" stroke="#4f8a4a" stroke-width="3"/>`
      );
    case 'moon':
      return svg(
        `<path d="M70 12Q30 18 30 52Q30 86 72 90Q44 76 44 52Q44 26 70 12Z" fill="#f7e59a" stroke="#cbb050" stroke-width="3"/><circle cx="92" cy="26" r="3" fill="#f7e59a"/><circle cx="100" cy="58" r="2.5" fill="#f7e59a"/>`
      );
    case 'spoon':
      return svg(
        `<ellipse cx="38" cy="38" rx="20" ry="26" fill="#d9e3e6" stroke="${ink}" stroke-width="3" transform="rotate(-40 38 38)"/><path d="M52 54L100 92" stroke="#d9e3e6" stroke-width="10" stroke-linecap="round"/><path d="M52 54L100 92" stroke="${ink}" stroke-width="2" stroke-linecap="round" opacity=".5"/>`
      );
    case 'boot':
      return svg(
        `<path d="M40 10H72V60L100 66Q110 70 108 86H30Q26 50 40 40Z" fill="${schoolColour(key, '#8fb39a')}" stroke="${ink}" stroke-width="3"/><path d="M30 86H108" stroke="${ink}" stroke-width="7"/><path d="M42 20H70" stroke="#ffffff99" stroke-width="4"/>`
      );
    case 'rain':
      return svg(
        `<path d="M24 54Q10 52 12 38Q14 26 30 28Q34 10 54 12Q72 8 78 24Q100 20 104 38Q106 54 90 54Z" fill="#dce8ef" stroke="#8aa5b3" stroke-width="3"/><path d="M32 66L26 80M54 64L48 80M76 66L70 80M44 82L40 92M66 82L62 92" stroke="#4e9cd6" stroke-width="5" stroke-linecap="round"/>`
      );
    case 'train':
      return svg(
        `<path d="M14 30H62V74H14Z" fill="#e8665d" stroke="#8f3f39" stroke-width="3"/><path d="M62 44H104V74H62Z" fill="#e8665d" stroke="#8f3f39" stroke-width="3"/><path d="M80 44V24H94V44" fill="#4d6b75"/><path d="M22 38H54V54H22Z" fill="#cfe9f2"/><circle cx="30" cy="80" r="9" fill="#3c4c54"/><circle cx="58" cy="80" r="9" fill="#3c4c54"/><circle cx="88" cy="80" r="9" fill="#3c4c54"/><path d="M6 92H114" stroke="#8a7a68" stroke-width="4"/>`
      );
    case 'snail':
      return svg(
        `<path d="M12 84H96Q108 84 106 74L92 70H20Z" fill="#c9d78d" stroke="#7f8f4a" stroke-width="3"/><circle cx="58" cy="50" r="28" fill="${schoolColour(key, '#d99b6c')}" stroke="#8a5a3a" stroke-width="3"/><path d="M58 50m-6 0a6 6 0 1 1 12 0a12 12 0 1 1-24 0a18 18 0 1 1 36 0" fill="none" stroke="#8a5a3a" stroke-width="3"/><path d="M98 72L104 48M106 72L114 52" stroke="#7f8f4a" stroke-width="3"/><circle cx="104" cy="47" r="3" fill="#2f3a3f"/><circle cx="114" cy="51" r="3" fill="#2f3a3f"/>`
      );
    case 'shark':
      return svg(
        `<path d="M6 54Q30 32 70 36L80 14L88 38Q102 40 110 30L106 52L112 72Q100 62 88 64Q60 76 30 70Q14 66 6 54Z" fill="#8fa6b4" stroke="#4f6573" stroke-width="3"/><path d="M8 56Q40 70 88 62Q58 80 26 70Z" fill="#e9eef0"/><path d="M50 66L58 80L64 66" fill="#8fa6b4" stroke="#4f6573" stroke-width="2"/><circle cx="22" cy="50" r="3" fill="#1f3640"/><path d="M36 48V58M41 47V58M46 47V58" stroke="#4f6573" stroke-width="2"/><path d="M8 57Q14 60 20 58" stroke="#4f6573" stroke-width="2" fill="none"/>`
      );
    case 'teeth':
      return svg(
        `<path d="M10 30Q60 8 110 30V44Q60 30 10 44Z" fill="#e88f95" stroke="#a9555b" stroke-width="3"/><path d="M10 70Q60 92 110 70V56Q60 70 10 56Z" fill="#e88f95" stroke="#a9555b" stroke-width="3"/><path d="M16 42L22 58L28 40L34 57L40 38L46 56L52 37L58 55L64 37L70 55L76 38L82 56L88 39L94 57L100 41L106 56" fill="#fffbef" stroke="#c9b99a" stroke-width="2" stroke-linejoin="round"/>`
      );
    case 'tail':
      return svg(
        `<path d="M8 60Q30 54 50 56L92 10Q86 50 70 60Q86 72 96 94Q66 76 50 66Q30 68 8 64Z" fill="#8fa6b4" stroke="#4f6573" stroke-width="3"/><path d="M8 90Q30 84 52 90T112 90" fill="none" stroke="#7fc4d4" stroke-width="4"/>`
      );
    case 'sheep':
      return svg(
        `<path d="M30 60Q14 58 18 44Q16 30 32 30Q38 16 54 22Q66 12 78 24Q96 22 94 40Q106 50 94 62Q90 76 74 72Q62 82 48 72Q32 78 30 60Z" fill="#f5f3ec" stroke="#b9b3a3" stroke-width="3"/><path d="M40 72V90M54 74V92M72 74V90M84 70V88" stroke="#3e3a36" stroke-width="5" stroke-linecap="round"/><ellipse cx="96" cy="46" rx="12" ry="15" fill="#3e3a36"/><circle cx="100" cy="42" r="2.5" fill="#fff"/>`
      );
  }
  return null;
}
function wordCardArt(word) {
  const size = word.length > 4 ? 30 : word.length > 2 ? 38 : 46;
  return `<svg class="word-shell" viewBox="0 0 120 100" aria-hidden="true"><path d="M60 94L14 58Q2 20 34 16Q50 2 60 14Q70 2 86 16Q118 20 106 58Z" fill="#f8efe0" stroke="#d2b48c" stroke-width="3"/><text x="60" y="${54 + size / 3}" text-anchor="middle" font-family="ui-rounded, 'Trebuchet MS', system-ui, sans-serif" font-weight="700" font-size="${size}" fill="#24485a">${word}</text></svg>`;
}
readingPictureSources.unshift(schoolReadingPicture);
function schoolReadingPicture(key) {
  return key.startsWith('word:') ? wordCardArt(key.slice(5)) : schoolPicture(key);
}
function pictureName(key) {
  return key.startsWith('word:')
    ? key.slice(5)
    : key.replace(/^(red|blue|yellow|big|small)-/, '$1 ');
}

// ---------------------------------------------------------------- reading lessons
const PHONICS_CODES = {
  cvc: ['AC9EFLY12'],
  digraph: ['AC9EFLY12', 'AC9E1LY11'],
  longVowel: ['AC9E1LY11'],
  message: ['AC9EFLY04', 'AC9EFLY05'],
  tricky: ['AC9EFLY14'],
  listening: ['AC9EFLY09', 'AC9EFLY10']
};
function readClue(word, sounds, options, answer, reveal, codes) {
  return {
    kind: 'read',
    word,
    sounds,
    options,
    answer,
    reveal,
    codes,
    prompt: 'Read the word. Which picture matches?',
    hint: `Say each sound: ${sounds.join(', ')}. Two letters can make one sound, like ${sounds.find(s => s.length > 1) || sounds[0]}. Now blend them together.`
  };
}
function messageClue(word, options, answer, reveal, hint) {
  return {
    kind: 'read',
    word,
    options,
    answer,
    reveal,
    codes: PHONICS_CODES.message,
    prompt: 'Read the little message. Which picture matches?',
    hint:
      hint ||
      'Let’s read together, one word at a time. The colour word tells us which one to choose.'
  };
}
function trickyClue(target, options, reveal) {
  return {
    kind: 'tricky',
    word: target,
    options: options.map(w => 'word:' + w),
    answer: 'word:' + target,
    reveal,
    codes: PHONICS_CODES.tricky,
    prompt: `Find the word ${target}.`,
    hint: `${target} is a tricky word. We can’t sound it all out, so we remember how it looks. Look for ${[...target].join(', ')}.`
  };
}
function rhymeClue(target, options, answer, reveal) {
  const names = options.map(pictureName);
  return {
    kind: 'rhyme',
    word: target,
    target,
    options,
    answer,
    reveal,
    codes: PHONICS_CODES.listening,
    prompt: `Which one rhymes with ${target}? ${names.slice(0, -1).join(', ')}, or ${names.at(-1)}?`,
    hint: `Rhyming words sound the same at the end. Say ${target}, then say each picture. Which one ends like ${target}?`
  };
}
function firstSoundClue(target, options, answer, reveal) {
  const names = options.map(pictureName);
  return {
    kind: 'first',
    word: target,
    target,
    options,
    answer,
    reveal,
    codes: PHONICS_CODES.listening,
    prompt: `Which one starts with the same sound as ${target}? ${names.slice(0, -1).join(', ')}, or ${names.at(-1)}?`,
    hint: `Say ${target} slowly. Listen to the very first sound. Which picture starts the same way?`
  };
}
// Onsets use stretchy sounds only, written so device speech can say them (no b, d, g, k, p, t).
function blendClue(spokenParts, answer, options, reveal) {
  return {
    kind: 'blend',
    word: answer,
    parts: spokenParts,
    options,
    answer,
    reveal,
    codes: PHONICS_CODES.listening,
    prompt: `Listen. ${spokenParts.join('… ')}. Blend the sounds. Which picture is it?`,
    hint: `Say it faster: ${spokenParts.join('… ')}. Push the sounds together.`
  };
}
const schoolReadingLessons = [
  {
    id: 'R-F-LS-01',
    shelfName: 'Listening reef',
    items: [
      rhymeClue('cat', ['hat', 'sun', 'cup'], 'hat', 'Cat, hat! They rhyme.'),
      rhymeClue('sock', ['fish', 'rock', 'bee'], 'rock', 'Sock, rock! They end the same.'),
      firstSoundClue('sun', ['map', 'duck', 'sock'], 'sock', 'Sun and sock both start with sss.'),
      blendClue(['shh', 'ip'], 'ship', ['fish', 'ship', 'shell'], 'Shh… ip. Ship! You blended it.')
    ]
  },
  {
    id: 'R-F-JP-01',
    shelfName: 'Ship ahoy',
    items: [
      readClue(
        'ship',
        ['sh', 'i', 'p'],
        ['chip', 'ship', 'shell'],
        'ship',
        'A ship! Willa can see it on the waves.',
        PHONICS_CODES.digraph
      ),
      readClue(
        'shell',
        ['sh', 'e', 'll'],
        ['shell', 'fish', 'ship'],
        'shell',
        'A shell! Let’s keep it for the treasure chest.',
        PHONICS_CODES.digraph
      ),
      readClue(
        'fish',
        ['f', 'i', 'sh'],
        ['dish', 'ship', 'fish'],
        'fish',
        'A fish! It is swimming beside the ship.',
        PHONICS_CODES.digraph
      ),
      messageClue(
        'A red ship.',
        ['blue-ship', 'yellow-ship', 'red-ship'],
        'red-ship',
        'The red ship! All aboard for a shark discovery.'
      )
    ]
  },
  {
    id: 'R-F-TW-01',
    shelfName: 'Word shells',
    items: [
      trickyClue('she', ['he', 'she', 'the'], 'She! You found the tricky word.'),
      trickyClue('the', ['the', 'he', 'she'], 'The! We see that word in every book.'),
      trickyClue('was', ['we', 'me', 'was'], 'Was! That one is very tricky.'),
      trickyClue('he', ['she', 'he', 'we'], 'He! Two letters, one little word.')
    ]
  },
  {
    id: 'R-F-JP-02',
    shelfName: 'Duck and chips',
    items: [
      readClue(
        'duck',
        ['d', 'u', 'ck'],
        ['duck', 'sock', 'chip'],
        'duck',
        'A duck! It is floating on the water.',
        PHONICS_CODES.digraph
      ),
      readClue(
        'chip',
        ['ch', 'i', 'p'],
        ['ship', 'rock', 'chip'],
        'chip',
        'A chip! The duck would like a chip.',
        PHONICS_CODES.digraph
      ),
      readClue(
        'sock',
        ['s', 'o', 'ck'],
        ['rock', 'sock', 'duck'],
        'sock',
        'A sock! Someone left a sock on the beach.',
        PHONICS_CODES.digraph
      ),
      messageClue(
        'A red sock.',
        ['red-sock', 'blue-sock', 'yellow-sock'],
        'red-sock',
        'The red sock! Mystery solved.'
      )
    ]
  },
  {
    id: 'R-F-LS-02',
    shelfName: 'Sound detective',
    items: [
      rhymeClue('moon', ['cat', 'spoon', 'bee'], 'spoon', 'Moon, spoon! They rhyme.'),
      rhymeClue('rain', ['train', 'tree', 'ship'], 'train', 'Rain, train! Same ending sound.'),
      firstSoundClue('fish', ['net', 'fin', 'map'], 'fin', 'Fish and fin both start with fff.'),
      blendClue(['mmm', 'oon'], 'moon', ['map', 'bee', 'moon'], 'Mmm… oon. Moon! Great blending.')
    ]
  },
  {
    id: 'R-F-JP-03',
    shelfName: 'Moon and bee',
    items: [
      readClue(
        'bee',
        ['b', 'ee'],
        ['bee', 'tree', 'moon'],
        'bee',
        'A bee! It is buzzing over the beach.',
        PHONICS_CODES.longVowel
      ),
      readClue(
        'moon',
        ['m', 'oo', 'n'],
        ['spoon', 'moon', 'boot'],
        'moon',
        'The moon! It shines on the sea at night.',
        PHONICS_CODES.longVowel
      ),
      readClue(
        'sheep',
        ['sh', 'ee', 'p'],
        ['ship', 'bee', 'sheep'],
        'sheep',
        'A sheep! Not a ship. You read every sound.',
        PHONICS_CODES.longVowel
      ),
      messageClue(
        'A red boot.',
        ['blue-boot', 'red-boot', 'yellow-boot'],
        'red-boot',
        'The red boot! Ready for a rock pool walk.'
      )
    ]
  },
  {
    id: 'R-F-TW-02',
    shelfName: 'More word shells',
    items: [
      trickyClue('I', ['I', 'it', 'is'], 'I! Always a big letter on its own.'),
      trickyClue('to', ['do', 'go', 'to'], 'To! We swim to the reef.'),
      trickyClue('said', ['sad', 'said', 'sand'], 'Said! A very tricky word.'),
      trickyClue('you', ['you', 'yes', 'your'], 'You! Willa is talking to you, Haytham.')
    ]
  },
  {
    id: 'R-F-JP-04',
    shelfName: 'Rainy reef',
    items: [
      readClue(
        'rain',
        ['r', 'ai', 'n'],
        ['train', 'rain', 'snail'],
        'rain',
        'Rain! It is splashing on the sea.',
        PHONICS_CODES.longVowel
      ),
      readClue(
        'train',
        ['t', 'r', 'ai', 'n'],
        ['train', 'tree', 'rain'],
        'train',
        'A train! It is going to the beach.',
        PHONICS_CODES.longVowel
      ),
      readClue(
        'snail',
        ['s', 'n', 'ai', 'l'],
        ['shell', 'sheep', 'snail'],
        'snail',
        'A snail! It carries its shell on its back.',
        PHONICS_CODES.longVowel
      ),
      messageClue(
        'A red snail.',
        ['yellow-snail', 'red-snail', 'blue-snail'],
        'red-snail',
        'The red snail! Slowly does it.'
      )
    ]
  },
  {
    id: 'R-F-LS-03',
    shelfName: 'Shark listening',
    items: [
      rhymeClue(
        'tail',
        ['snail', 'fin', 'bee'],
        'snail',
        'Tail, snail! A shark’s tail pushes it through the water.'
      ),
      firstSoundClue(
        'shark',
        ['chip', 'fish', 'ship'],
        'ship',
        'Shark and ship both start with shh.'
      ),
      firstSoundClue(
        'teeth',
        ['moon', 'tail', 'fish'],
        'tail',
        'Teeth and tail both start with t.'
      ),
      blendClue(
        ['shh', 'ark'],
        'shark',
        ['ship', 'shark', 'shell'],
        'Shh… ark. Shark! Our favourite word.'
      )
    ]
  },
  {
    id: 'R-F-JP-05',
    shelfName: 'Shark parts',
    items: [
      readClue(
        'shark',
        ['sh', 'ar', 'k'],
        ['shell', 'shark', 'ship'],
        'shark',
        'A shark! Sharks are fish. They breathe with gills.',
        PHONICS_CODES.digraph
      ),
      readClue(
        'fin',
        ['f', 'i', 'n'],
        ['fish', 'net', 'fin'],
        'fin',
        'A fin! Fins help a shark balance and steer.',
        PHONICS_CODES.cvc
      ),
      readClue(
        'teeth',
        ['t', 'ee', 'th'],
        ['teeth', 'tree', 'bee'],
        'teeth',
        'Teeth! Sharks keep growing new teeth all their lives.',
        PHONICS_CODES.longVowel
      ),
      readClue(
        'tail',
        ['t', 'ai', 'l'],
        ['rain', 'tail', 'snail'],
        'tail',
        'A tail! A shark swings its tail from side to side to swim.',
        PHONICS_CODES.longVowel
      )
    ]
  }
];
schoolReadingLessons.forEach(lesson => (lesson.school = true));
readingMissionLibrary.push(...schoolReadingLessons);
// Interleave old and new so each session mixes listening, phonics and tricky words.
const readingOrder = [
  'R-F-PILOT-01',
  'R-F-LS-01',
  'R-F-JP-01',
  'R-F-PILOT-02',
  'R-F-TW-01',
  'R-F-JP-02',
  'R-F-LS-03',
  'R-F-PILOT-03',
  'R-F-LS-02',
  'R-F-JP-03',
  'R-F-PILOT-04',
  'R-F-TW-02',
  'R-F-JP-04',
  'R-F-JP-05',
  'R-F-PILOT-05',
  'R-F-PILOT-06'
];
readingMissionLibrary.sort((a, b) => readingOrder.indexOf(a.id) - readingOrder.indexOf(b.id));
const pilotShelfNames = {
  'R-F-PILOT-01': 'Secret reef',
  'R-F-PILOT-02': 'Sunken picnic',
  'R-F-PILOT-03': 'Captain’s hat',
  'R-F-PILOT-04': 'Treasure bag',
  'R-F-PILOT-05': 'Sunny voyage',
  'R-F-PILOT-06': 'Reef picnic'
};
readingMissionLibrary.forEach(l => (l.shelfName = l.shelfName || pilotShelfNames[l.id]));

// Which recorded Jolly Phonics sound a letter tile makes in this word.
function tileSoundId(tile, word) {
  if (tile === 'll') return 'l';
  if (['c', 'k', 'ck'].includes(tile)) return 'ck';
  if (tile === 'oo') return /book|look|cook|foot/.test(word) ? 'oo-short' : 'oo-long';
  if (tile === 'th') return /^(this|that|the|them|then)$/.test(word) ? 'th-voiced' : 'th';
  // Year 1 alternative spellings (29 Oct) share a Jolly Phonics sound: ay says ai, ea says ee,
  // igh says ie, and ow says ou (cow, owl) or oa (snow, bow).
  if (tile === 'ay') return 'ai';
  if (tile === 'ea') return 'ee';
  if (tile === 'igh') return 'ie';
  if (tile === 'ow') return /^(cow|owl|how|now|down|town|clown|brown)$/.test(word) ? 'ou' : 'oa';
  return tile;
}
function schoolLessonFor(currentGame) {
  return currentGame?.mission
    ? readingMissionLibrary.find(l => l.id === currentGame.lesson && l.school)
    : null;
}
function schoolCluePanel(q) {
  if (q.kind === 'read') {
    if (!q.sounds)
      return `<div class="quest-word school-message" aria-label="${q.word}">${q.word}</div>`;
    return `<div class="quest-word school-sounds" aria-label="${q.word}">${q.sounds.map(s => `<button class="sound-letter ${s.length > 1 ? 'sound-digraph' : ''}" data-sound-tile="${tileSoundId(s, q.word)}" aria-label="Hear this sound">${s}</button>`).join('')}</div>`;
  }
  if (q.kind === 'tricky')
    return `<button class="school-listen" id="schoolListen" aria-label="Hear the word again"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 18H16L28 8V40L16 30H8Z" fill="currentColor"/><path d="M34 16Q40 24 34 32M38 10Q48 24 38 38" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/></svg></button>`;
  if (q.kind === 'blend')
    return `<button class="school-listen school-blend" id="schoolListen" aria-label="Hear the sounds again">${q.parts.map(() => '<span class="blend-bubble" aria-hidden="true"></span>').join('<b aria-hidden="true">+</b>')}</button>`;
  return `<button class="school-target" id="schoolListen" aria-label="Hear it again: ${q.target}">${readingArt(q.target)}<span class="school-ear" aria-hidden="true">♫</span></button>`;
}
const preSchoolMission = readingMission;
readingMission = function () {
  const lesson = schoolLessonFor(game);
  if (!lesson) return preSchoolMission();
  const q = game.items[game.index];
  if (!q) {
    finishReadingMission();
    return;
  }
  const total = game.items.length;
  const listening = ['rhyme', 'first', 'blend', 'swap'].includes(q.kind);
  app.innerHTML = `<section class="reading-quest school-quest kind-${q.kind}"><div class="game-top"><button id="questInstructions" class="quiet">${paintedIcon('speaker-blue')} Hear instructions</button></div><span class="tag">WILLA’S ${listening ? 'LISTENING REEF' : q.kind === 'tricky' ? 'WORD SHELLS' : 'SOUND SHELLS'}</span><h1>${lesson.shelfName}</h1><p class="quest-story">${game.index === 0 ? 'Willa has a new sound adventure for us.' : game.items[game.index - 1].reveal}</p><div class="quest-trail" aria-label="${game.index} of ${total} clues solved">${game.items.map((_, i) => `<span class="${i < game.index ? 'found' : ''}" aria-hidden="true">${paintedIcon(i < game.index ? 'shell' : 'spot')}</span>`).join('<i>···</i>')}</div><div class="quest-scroll"><p>${q.prompt}</p>${schoolCluePanel(q)}<div class="quest-pictures ${q.kind === 'tricky' ? 'word-choices' : ''}">${q.options.map((key, i) => `<button data-quest-choice="${i}" aria-label="${pictureName(key)}">${readingArt(key)}</button>`).join('')}</div><p id="questFeedback" role="status">Take your time. Willa and Milo are with you.</p><div class="quest-actions"><button id="questHint"><span aria-hidden="true">${paintedIcon('bulb')}</span><span class="hint-label">Help me</span></button><button id="questNext" class="primary" hidden>${game.index === total - 1 ? 'Our shark discovery ✨' : 'Next clue →'}</button></div></div><details class="quest-parent"><summary>For grown-ups</summary><p>${listening ? 'Listening warm-up in the style of Heggerty: no letters on screen. Device speech is used until recordings are made, so the sounds may be imperfect.' : q.kind === 'tricky' ? 'Jolly Phonics tricky words: recognised by sight, not sounded out.' : 'Decodable words using Jolly Phonics digraphs. Joined tiles show two letters making one sound.'} Codes: ${q.codes.join(', ')}. Practice evidence only; help and retries are recorded as supported.</p></details></section>`;
  const say = () => helperSpeak(q.prompt);
  $('#questInstructions').onclick = say;
  $('#schoolListen')?.addEventListener('click', say);
  $('#questHint').onclick = readingMissionHelp;
  // Tap a tile to hear Willa say its sound. Hearing the sounds is help, so it's recorded as supported.
  document.querySelectorAll('[data-sound-tile]').forEach(tile => {
    tile.onclick = () => {
      if (typeof playPhonicsSound === 'function' && playPhonicsSound(tile.dataset.soundTile)) {
        if (!game.answered) game.assisted = true;
        tile.classList.remove('sound-tapped');
        void tile.offsetWidth;
        tile.classList.add('sound-tapped');
      }
    };
  });
  $('#questNext').onclick = () => {
    game.index++;
    game.assisted = false;
    game.answered = false;
    readingMission();
  };
  document.querySelectorAll('[data-quest-choice]').forEach(b => {
    const key = q.options[+b.dataset.questChoice];
    b.onclick = () => readingMissionAnswer(key);
    // Mouse and Pencil hover names a picture; reading choices stay silent so the word isn't given away.
    if (listening)
      b.onpointerenter = e => {
        if (e.pointerType !== 'touch') speak(pictureName(key), { speaker: 'willa' });
      };
  });
  updateMilo('I’m with you, Haytham. Let’s listen and look with Willa.');
  say();
  requestAnimationFrame(fitScreen);
};

// ---------------------------------------------------------------- maths lessons
function tenFrame(filled, kind = 'counter') {
  return `<div class="ten-frame" role="img" aria-label="Ten-frame with ${filled} filled">${Array.from({ length: 10 }, (_, i) => `<span class="${i < filled ? 'filled' : ''}">${i < filled ? `<i class="counter-${kind}"></i>` : ''}</span>`).join('')}</div>`;
}
function numberChoices(answer, extra = []) {
  const options = [answer, ...extra, answer + 1, answer - 1, answer + 2].filter(
    (n, i, all) => n >= 0 && all.indexOf(n) === i
  );
  return shuffled(options.slice(0, 3).map(String));
}
function patternKinds(seed) {
  const pool = ['clownfish', 'crab', 'turtle', 'blue-tang', 'squid', 'salmon'];
  return [0, 1, 2, 3]
    .map(j => pool[(seed + j * 2) % pool.length])
    .filter((k, i, a) => a.indexOf(k) === i);
}
const schoolMathsBuilders = {
  tenframe(i, cycle, lesson) {
    const n = [3, 5, 7, 9, 4, 6, 8, 10, 2][(i * 2 + cycle) % 9];
    const teeth = i % 2 === 1;
    return {
      scene: tenFrame(n, teeth ? 'tooth' : 'counter'),
      prompt: teeth
        ? 'How many shark teeth are in the ten-frame?'
        : 'How many counters are in the ten-frame?',
      answer: n,
      choices: numberChoices(n),
      hint:
        n > 5
          ? 'The top row is full. That’s five. Count on from five: six, seven…'
          : 'Look at the top row. Can you see how many without counting one by one?'
    };
  },
  make10(i, cycle) {
    const n = [6, 8, 3, 7, 5, 9, 4, 2][(i + cycle * 3) % 8];
    return {
      scene: tenFrame(n, 'tooth'),
      prompt:
        (i === 0 ? 'Sharks grow new teeth all their lives! ' : '') +
        'How many more teeth will fill the ten-frame?',
      answer: 10 - n,
      choices: numberChoices(10 - n, [n]),
      hint: 'Count the empty spaces. Each empty space needs one more counter to make ten.'
    };
  },
  numberline(i, cycle) {
    const start = 1 + ((i * 3 + cycle * 2) % 14),
      gap = 1 + ((i + cycle) % 4),
      numbers = [0, 1, 2, 3, 4].map(k => start + k),
      answer = numbers[gap];
    return {
      scene: `<div class="number-swim" aria-label="Number line with one missing number">${numbers.map((n, k) => `<span class="${k === gap ? 'missing' : ''}">${k === gap ? '?' : n}</span>`).join('<i aria-hidden="true"></i>')}</div>`,
      prompt: `${numbers.map((n, k) => (k === gap ? 'hmm' : n)).join(', ')}. Which number is missing?`,
      answer,
      choices: numberChoices(answer),
      hint: `Count along the line: ${numbers.slice(0, gap).join(', ')}… what comes next?`
    };
  },
  moreless(i, cycle, lesson, number) {
    const pairs = [
      [3, 6],
      [7, 4],
      [5, 8],
      [9, 6],
      [2, 5],
      [8, 10],
      [4, 7],
      [6, 3]
    ];
    const [a, b] = pairs[(i + cycle) % pairs.length],
      askMore = (i + cycle) % 2 === 0,
      kind = oceanSpecies[(number + i) % oceanSpecies.length],
      answer = (askMore ? a > b : a < b) ? 'first' : 'second';
    const group = (count, which) =>
      `<button class="compare-group" data-group-choice="${which}" aria-label="${which === 'first' ? 'This group' : 'That group'}"><span class="counting-school compare-animals animals-${count}">${Array.from({ length: count }, () => `<span>${seaAnimal(kind)}</span>`).join('')}</span></button>`;
    return {
      scene: `<div class="compare-model">${group(a, 'first')}${group(b, 'second')}</div>`,
      prompt: askMore
        ? 'Which group has more? Tap the group.'
        : 'Which group has fewer? Tap the group.',
      answer,
      choices: ['first', 'second'],
      groupChoice: true,
      hint: askMore
        ? 'Count each group. The bigger number has more.'
        : 'Count each group. The smaller number has fewer.'
    };
  },
  pattern(i, cycle, lesson, number) {
    const units = [
        [0, 1],
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 2]
      ],
      unit = units[(i + cycle) % units.length],
      kinds = patternKinds(number + i),
      sequence = [...unit, ...unit],
      shown = (i + cycle) % unit.length,
      visible = [...sequence, ...unit.slice(0, shown)],
      answer = kinds[unit[shown]],
      options = [...new Set([...unit.map(u => kinds[u]), kinds[3] || kinds[0]])].slice(0, 3);
    while (options.length < 3)
      options.push(['octopus', 'dolphin', 'hammerhead'].find(k => !options.includes(k)));
    const names = visible.map(u => kinds[u].replace('-', ' '));
    return {
      scene: `<div class="reef-pattern" aria-label="Pattern: ${names.join(', ')}, then a gap">${visible.map(u => `<span>${seaAnimal(kinds[u])}</span>`).join('')}<span class="pattern-gap">?</span></div>`,
      prompt: `${names.join(', ')}… What comes next?`,
      answer,
      choices: shuffled(options),
      choiceArt: true,
      hint: `Say the pattern out loud: ${names.join(', ')}. Find the part that repeats.`
    };
  }
};
const schoolMathsLessons = [
  {
    id: 'M-F-05',
    kind: 'tenframe',
    shelfName: 'Ten-frame flash',
    name: 'Ten-frame flash',
    codes: ['AC9MFN02', 'AC9MFN01']
  },
  { id: 'M-F-06', kind: 'make10', shelfName: 'Make ten', name: 'Make ten', codes: ['AC9MFN04'] },
  {
    id: 'M-F-07',
    kind: 'numberline',
    shelfName: 'Number line swim',
    name: 'Number line swim',
    codes: ['AC9MFN01']
  },
  {
    id: 'M-F-08',
    kind: 'moreless',
    shelfName: 'More or fewer',
    name: 'More or fewer',
    codes: ['AC9MFN03']
  },
  {
    id: 'M-F-09',
    kind: 'pattern',
    shelfName: 'Reef patterns',
    name: 'Reef patterns',
    codes: ['AC9MFA01']
  }
];
mathsAdventures.push(...schoolMathsLessons);
const mathsOrder = [
  'M-F-01',
  'M-F-05',
  'M-F-02',
  'M-F-06',
  'M-F-07',
  'M-F-03',
  'M-F-08',
  'M-F-04',
  'M-F-09'
];
mathsAdventures.sort((a, b) => mathsOrder.indexOf(a.id) - mathsOrder.indexOf(b.id));
const oldShelfNames = {
  'M-F-01': 'Count the fish',
  'M-F-02': 'Fish friends meet',
  'M-F-03': 'Swim-away cove',
  'M-F-04': 'Share a picnic'
};
mathsAdventures.forEach(l => (l.shelfName = l.shelfName || oldShelfNames[l.id]));

function schoolMathsCardArt(record) {
  if (record.kind === 'tenframe') return tenFrame(7);
  if (record.kind === 'make10') return tenFrame(6);
  if (record.kind === 'numberline')
    return '<div class="number-swim mini"><span>3</span><i></i><span class="missing">?</span><i></i><span>5</span></div>';
  if (record.kind === 'moreless')
    return `<div class="lesson-mini-model">${seaAnimal('crab')}${seaAnimal('crab')}<b>&gt;</b>${seaAnimal('crab')}</div>`;
  if (record.kind === 'pattern')
    return `<div class="lesson-mini-model">${seaAnimal('clownfish')}${seaAnimal('crab')}${seaAnimal('clownfish')}<b>?</b></div>`;
  return null;
}

questionLayers.unshift(function schoolMathsLessons(type, next) {
  if (type !== 'maths' || (stageFor('maths') !== 1 && !requestedMathsLesson))
    return next(type);
  const number = state.completed.filter(x => x.type === 'maths').length,
    lesson =
      mathsAdventures.find(l => l.id === requestedMathsLesson) ||
      mathsAdventures[number % mathsAdventures.length],
    build = schoolMathsBuilders[lesson.kind];
  if (!build) return next(type);
  requestedMathsLesson = null;
  const cycle = Math.floor(number / mathsAdventures.length);
  return Array.from({ length: 5 }, (_, i) => {
    const q = build(i, cycle, lesson, number);
    return {
      ...q,
      lesson: lesson.id,
      codes: lesson.codes,
      skill: lesson.kind,
      title: lesson.name,
      answer: String(q.answer),
      spoken: q.prompt
    };
  });
});

// ---------------------------------------------------------------- visible thinking
const thinkingIcons = {
  finger:
    '<path d="M30 54V20Q30 13 36 13Q42 13 42 20V38L58 40Q66 42 64 52L60 76H32Z"/><path d="M18 20L24 26M30 4V10M42 10L46 4"/>',
  eye: '<path d="M6 40Q38 6 74 40Q38 74 6 40Z"/><circle cx="40" cy="40" r="11"/>',
  hand: '<path d="M22 70Q10 56 12 40L14 26Q15 20 20 21Q24 22 24 28V40M24 40V14Q24 8 30 8Q35 8 35 14V38M35 38V10Q35 4 41 4Q46 4 46 10V38M46 38V14Q46 8 52 8Q57 8 57 14V48Q66 40 72 44Q74 48 66 58L54 72Q46 78 36 76Z"/>',
  onwards:
    '<path d="M8 50H72M16 44V56M36 44V56M56 44V56"/><path d="M18 36Q26 20 34 36M38 36Q46 20 54 36" /><path d="M50 30L54 36L58 30"/>',
  back: '<path d="M8 50H72M24 44V56M44 44V56M64 44V56"/><path d="M62 36Q54 20 46 36M42 36Q34 20 26 36"/><path d="M30 30L26 36L22 30"/>',
  match:
    '<circle cx="18" cy="20" r="7"/><circle cx="18" cy="40" r="7"/><circle cx="18" cy="60" r="7"/><circle cx="62" cy="20" r="7"/><circle cx="62" cy="40" r="7"/><path d="M26 20H54M26 40H54M26 60H44"/>',
  repeat:
    '<path d="M14 30Q14 14 40 14H62M54 6L64 14L54 22M66 50Q66 66 40 66H18M26 74L16 66L26 58"/>',
  frame:
    '<rect x="6" y="20" width="68" height="40" rx="4"/><path d="M19 20V60M33 20V60M47 20V60M61 20V60M6 40H74"/><circle cx="12.5" cy="30" r="4"/><circle cx="26" cy="30" r="4"/><circle cx="40" cy="30" r="4"/><circle cx="54" cy="30" r="4"/><circle cx="67" cy="30" r="4"/>',
  share:
    '<circle cx="40" cy="14" r="8"/><path d="M34 20L16 50M46 20L64 50"/><rect x="4" y="52" width="26" height="18" rx="6"/><rect x="50" y="52" width="26" height="18" rx="6"/>'
};
const thinkingStrategies = {
  'one-by-one': ['finger', 'I counted one by one'],
  'just-saw': ['eye', 'I just saw it'],
  fingers: ['hand', 'I used my fingers'],
  'counted-on': ['onwards', 'I counted on'],
  'counted-back': ['back', 'I counted back'],
  'five-and-more': ['frame', 'I saw five, then counted on'],
  'empty-spaces': ['frame', 'I counted the empty spaces'],
  'counted-along': ['onwards', 'I counted along the line'],
  matched: ['match', 'I matched them up'],
  'said-it': ['repeat', 'I said the pattern out loud'],
  'one-each': ['share', 'I gave one each, turn by turn']
};
const thinkingByKind = {
  count: ['one-by-one', 'just-saw', 'fingers'],
  tenframe: ['just-saw', 'five-and-more', 'one-by-one'],
  join: ['one-by-one', 'counted-on', 'fingers'],
  make10: ['empty-spaces', 'fingers', 'just-saw'],
  numberline: ['counted-along', 'just-saw', 'fingers'],
  away: ['one-by-one', 'counted-back', 'fingers'],
  moreless: ['one-by-one', 'matched', 'just-saw'],
  share: ['one-each', 'one-by-one', 'just-saw'],
  pattern: ['said-it', 'just-saw', 'one-by-one']
};
const thinkingReplies = {
  'one-by-one': 'Counting one by one is careful thinking. Every animal gets one number.',
  'just-saw': 'Seeing a number without counting is a super skill.',
  fingers: 'Fingers are great maths helpers!',
  'counted-on': 'Counting on is a clever, quick way to add.',
  'counted-back': 'Counting back is a smart way to take away.',
  'five-and-more': 'Five and some more. That’s how ten-frames help us!',
  'empty-spaces': 'The empty spaces tell us how many more make ten. Clever!',
  'counted-along': 'Counting along the line helps us find the missing number.',
  matched: 'Matching them up shows which group has extra. Smart thinking!',
  'said-it': 'Saying a pattern out loud helps us hear what repeats.',
  'one-each': 'One each, turn by turn, keeps sharing fair.'
};
function thinkingIcon(name) {
  return `<svg viewBox="0 0 80 80" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${thinkingIcons[name]}</svg>`;
}
function showThinkingStep() {
  const active = game,
    kind = active.items[0].skill,
    options = thinkingByKind[kind] || thinkingByKind.count;
  app.innerHTML = `<section class="game school-thinking"><div class="game-panel"><h2 class="thinking-title">How did you work it out?</h2><div class="thinking-choices">${options.map(key => `<button data-thinking="${key}">${thinkingIcon(thinkingStrategies[key][0])}<span>${thinkingStrategies[key][1]}</span></button>`).join('')}</div></div></section>`;
  const question =
    'How did you work it out, Haytham? ' +
    options.map(key => thinkingStrategies[key][1]).join('. Or, ') +
    '.';
  helperSpeak(question);
  if (typeof setMiloMood === 'function') setMiloMood('thinking');
  let chosen = false;
  document.querySelectorAll('[data-thinking]').forEach(button => {
    const key = button.dataset.thinking;
    button.onpointerenter = e => {
      if (e.pointerType !== 'touch') speak(thinkingStrategies[key][1], { speaker: 'tiggy' });
    };
    button.onclick = () => {
      if (chosen || game !== active) return;
      chosen = true;
      button.classList.add('chosen-correct');
      state.thinking = state.thinking || [];
      state.thinking.push({
        lesson: active.items[0].lesson,
        skill: kind,
        strategy: key,
        session: active.session,
        at: new Date().toISOString()
      });
      save();
      const go = () => {
        clearTimeout(fallback);
        if (game !== active || location.hash !== '#play' || active.thinkingShared) return;
        active.thinkingShared = true;
        play();
      };
      const fallback = setTimeout(go, 4200);
      if (typeof reactCrew === 'function') reactCrew('happy', 'tiggy');
      speak(thinkingReplies[key], { speaker: 'tiggy', end: go, unavailable: go });
    };
  });
  requestAnimationFrame(fitScreen);
}
function thinkingSummary() {
  const records = state.thinking || [];
  if (!records.length)
    return '<p class="muted">After each maths adventure, Haytham chooses how he worked it out. Nothing recorded yet.</p>';
  const counts = {};
  records.forEach(r => (counts[r.strategy] = (counts[r.strategy] || 0) + 1));
  return `<p>${Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([k, n]) => `${thinkingStrategies[k]?.[1] || k}: ${n}`)
    .join(
      ' · '
    )}</p><p class="muted">Self-reported strategies after maths adventures, matching the school’s visible-thinking approach. Ask him to show you one. These are conversation starters, not scores.</p>`;
}

const preSchoolPlay = play;
play = function () {
  if (
    game &&
    !game.mission &&
    game.type === 'maths' &&
    game.index >= game.items.length &&
    game.items[0]?.lesson &&
    !game.thinkingShared
  ) {
    showThinkingStep();
    return;
  }
  preSchoolPlay();
  if (!game || game.mission || game.type !== 'maths' || game.index >= game.items.length) return;
  const q = game.items[game.index];
  const panel = app.querySelector('.game-panel');
  if (!panel) return;
  panel.classList.toggle('school-maths', !!schoolMathsBuilders[q.skill]);
  if (q.choiceArt)
    document.querySelectorAll('[data-choice]').forEach(button => {
      const kind = q.choices[+button.dataset.choice];
      button.classList.add('picture-choice');
      button.setAttribute('aria-label', kind.replace('-', ' '));
      button.innerHTML = seaAnimal(kind);
    });
  if (q.groupChoice) {
    panel.querySelector('.choices')?.setAttribute('hidden', '');
    document.querySelectorAll('[data-group-choice]').forEach(button => {
      button.onclick = () => {
        if (game.answered) return;
        const value = button.dataset.groupChoice;
        if (value !== q.answer) button.classList.add('tried-choice');
        answer(value);
        if (game.answered)
          document.querySelectorAll('[data-group-choice]').forEach(b => {
            b.disabled = true;
            b.classList.toggle('chosen-correct', b.dataset.groupChoice === q.answer);
          });
      };
    });
  }
  requestAnimationFrame(fitScreen);
};
