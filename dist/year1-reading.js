/* Year 1 reading, phase 1 (29 October 2026). Australian Curriculum v9, Year 1 English; plan in the
 * project doc "year1-english-plan.md". Same lesson formats and rules as school-pack.js and
 * lessons-more.js (Jolly Phonics, Heggerty-style listening):
 *   Sound swap        (AC9E1LY10)  change, add or take away a sound, listening only, no letters
 *   Blend reef        (AC9E1LY09, AC9E1LY11)  read words with consonant clusters, sound tiles
 *   Long-vowel lagoon (AC9E1LY11, AC9E1LY12)  ay, ea, igh and the two sounds of ow
 *   Word shells 2     (AC9E1LY14)  Year 1 tricky words
 * Swap prompts only ever say stretchy sounds (sss, mmm, lll, fff, nnn, rrr, th) so the iPad voice
 * can say them properly until Willa's lines are recorded. Every answer word has a painted picture
 * in pictures.js. The four skills join the end of the learning path, so they open only after the
 * Foundation reading skills have stars (or when the grown-ups' reading level moves him on).
 * Loaded after lessons-more.js. */

const YEAR1_CODES = {
  swap: ['AC9E1LY10'],
  blend: ['AC9E1LY09', 'AC9E1LY11'],
  vowel: ['AC9E1LY11'],
  twoSounds: ['AC9E1LY11', 'AC9E1LY12'],
  tricky: ['AC9E1LY14']
};

// Listening: start from a picture word, change one sound, choose the new word.
const capital = text => text[0].toUpperCase() + text.slice(1);
function swapClue(from, prompt, answer, options, reveal, hint) {
  return {
    kind: 'swap',
    word: answer,
    target: from,
    options,
    answer,
    reveal,
    codes: YEAR1_CODES.swap,
    prompt: capital(prompt),
    hint
  };
}
const swapFirst = (from, sound, answer, options, reveal) =>
  swapClue(from, `${from}. Change the first sound to ${sound}. What’s the new word?`, answer, options, reveal,
    `Say ${from} slowly. Take off the first sound and put ${sound} there instead. ${sound}… Say it all together.`);
const swapLast = (from, sound, answer, options, reveal) =>
  swapClue(from, `${from}. Change the last sound to ${sound}. What’s the new word?`, answer, options, reveal,
    `Say ${from} slowly. Keep the start, then finish with ${sound}. Say it all together.`);
const takeAway = (from, sound, answer, options, reveal) =>
  swapClue(from, `${from}. Take away the ${sound} at the start. What’s left?`, answer, options, reveal,
    `Say ${from}, but don’t say ${sound}. Start with the next sound.`);
const addStart = (from, sound, answer, options, reveal) =>
  swapClue(from, `${from}. Put ${sound} at the start. What’s the new word?`, answer, options, reveal,
    `Say ${sound}, then straight away say ${from}. Push them together.`);

const year1ReadingLessons = [
  // ---------------------------------------------------------------- Sound swap (AC9E1LY10)
  {
    id: 'R-1-SW-01',
    shelfName: 'Sound swap',
    items: [
      swapFirst('sock', 'rrr', 'rock', ['lock', 'rock', 'duck'], 'Sock… rock! A brand new word.'),
      swapFirst('dog', 'lll', 'log', ['log', 'frog', 'dog'], 'Dog… log! Clever swapping.'),
      swapFirst('bug', 'mmm', 'mug', ['bun', 'mug', 'bus'], 'Bug… mug! You changed one sound.'),
      swapFirst('pin', 'fff', 'fin', ['fin', 'fish', 'pig'], 'Pin… fin! Sharks have fins.')
    ]
  },
  {
    id: 'R-1-SW-02',
    shelfName: 'Take away, add on',
    items: [
      takeAway('snail', 'sss', 'nail', ['nail', 'rain', 'sail'], 'Snail without sss is nail!'),
      takeAway('seal', 'sss', 'eel', ['eel', 'fish', 'seal'], 'Seal without sss is eel. An eel is a long, wiggly fish.'),
      addStart('nail', 'sss', 'snail', ['tail', 'snail', 'nail'], 'Sss… nail. Snail! You added a sound.'),
      addStart('eel', 'sss', 'seal', ['seal', 'shell', 'eel'], 'Sss… eel. Seal! Seals swim in the sea.')
    ]
  },
  {
    id: 'R-1-SW-03',
    shelfName: 'Swap the end',
    items: [
      swapLast('pig', 'nnn', 'pin', ['pen', 'pin', 'pig'], 'Pig… pin! Just the end changed.'),
      swapLast('bus', 'nnn', 'bun', ['bun', 'bus', 'sun'], 'Bus… bun! A yummy swap.'),
      swapLast('bat', 'th', 'bath', ['bat', 'cat', 'bath'], 'Bat… bath! Splash.'),
      swapLast('cap', 'nnn', 'can', ['cap', 'can', 'cup'], 'Cap… can! You listened to the very end.')
    ]
  },

  // ---------------------------------------------------------------- Blend reef (AC9E1LY09, AC9E1LY11)
  {
    id: 'R-1-BL-01',
    shelfName: 'Starfish start',
    items: [
      readClue('star', ['s', 't', 'ar'], ['car', 'star', 'jar'], 'star', 'A star! S and t start the word together.', YEAR1_CODES.blend),
      readClue('spoon', ['s', 'p', 'oo', 'n'], ['moon', 'boot', 'spoon'], 'spoon', 'A spoon! S and p, then oo, n.', YEAR1_CODES.blend),
      readClue('snail', ['s', 'n', 'ai', 'l'], ['snail', 'nail', 'sail'], 'snail', 'A snail! Not a nail. You read the s.', YEAR1_CODES.blend),
      readClue('tree', ['t', 'r', 'ee'], ['bee', 'tree', 'feet'], 'tree', 'A tree! T and r blend together.', YEAR1_CODES.blend)
    ]
  },
  {
    id: 'R-1-BL-02',
    shelfName: 'Crab cove',
    items: [
      readClue('crab', ['c', 'r', 'a', 'b'], ['crab', 'cap', 'car'], 'crab', 'A crab! Crabs walk sideways on the sand.', YEAR1_CODES.blend),
      readClue('frog', ['f', 'r', 'o', 'g'], ['fox', 'log', 'frog'], 'frog', 'A frog! Ribbit.', YEAR1_CODES.blend),
      readClue('flag', ['f', 'l', 'a', 'g'], ['flag', 'bag', 'fin'], 'flag', 'A flag! Flapping on the boat.', YEAR1_CODES.blend),
      readClue('drum', ['d', 'r', 'u', 'm'], ['mug', 'drum', 'bus'], 'drum', 'A drum! Boom, boom.', YEAR1_CODES.blend)
    ]
  },
  {
    id: 'R-1-BL-03',
    shelfName: 'Sandy ends',
    items: [
      readClue('nest', ['n', 'e', 's', 't'], ['net', 'nest', 'egg'], 'nest', 'A nest! S and t at the end.', YEAR1_CODES.blend),
      readClue('tent', ['t', 'e', 'n', 't'], ['tent', 'pen', 'hen'], 'tent', 'A tent! Camping by the beach.', YEAR1_CODES.blend),
      readClue('hand', ['h', 'a', 'n', 'd'], ['hat', 'hen', 'hand'], 'hand', 'A hand! Give Willa a wave.', YEAR1_CODES.blend),
      readClue('lamp', ['l', 'a', 'm', 'p'], ['lamp', 'map', 'cap'], 'lamp', 'A lamp! It lights up the cave.', YEAR1_CODES.blend)
    ]
  },

  // ---------------------------------------------------------------- Long-vowel lagoon (AC9E1LY11, AC9E1LY12)
  {
    id: 'R-1-LV-01',
    shelfName: 'Tray day',
    items: [
      readClue('tray', ['t', 'r', 'ay'], ['train', 'tray', 'tree'], 'tray', 'A tray! a and y together say ai.', YEAR1_CODES.vowel),
      readClue('hay', ['h', 'ay'], ['hay', 'hat', 'hen'], 'hay', 'Hay! The cow likes to eat it.', YEAR1_CODES.vowel),
      readClue('snail', ['s', 'n', 'ai', 'l'], ['snail', 'tail', 'sail'], 'snail', 'A snail! Here a and i say ai.', YEAR1_CODES.vowel),
      readClue('chain', ['ch', 'ai', 'n'], ['chip', 'rain', 'chain'], 'chain', 'A chain! For the ship’s anchor.', YEAR1_CODES.vowel)
    ]
  },
  {
    id: 'R-1-LV-02',
    shelfName: 'Seal beach',
    items: [
      readClue('seal', ['s', 'ea', 'l'], ['seal', 'shell', 'eel'], 'seal', 'A seal! e and a together say ee.', YEAR1_CODES.vowel),
      readClue('leaf', ['l', 'ea', 'f'], ['log', 'leaf', 'leg'], 'leaf', 'A leaf! Floating on the water.', YEAR1_CODES.vowel),
      readClue('sea', ['s', 'ea'], ['sun', 'sea', 'seed'], 'sea', 'The sea! Where all our shark friends live.', YEAR1_CODES.vowel),
      readClue('feet', ['f', 'ee', 't'], ['fin', 'feet', 'net'], 'feet', 'Feet! Here two e’s say ee.', YEAR1_CODES.vowel)
    ]
  },
  {
    id: 'R-1-LV-03',
    shelfName: 'Night light',
    items: [
      readClue('light', ['l', 'igh', 't'], ['light', 'lamp', 'tie'], 'light', 'A light! i, g, h together say ie.', YEAR1_CODES.vowel),
      readClue('night', ['n', 'igh', 't'], ['net', 'moon', 'night'], 'night', 'Night! Time for the sharks to hunt.', YEAR1_CODES.vowel),
      readClue('tie', ['t', 'ie'], ['tie', 'tree', 'pie'], 'tie', 'A tie! Here i and e say ie.', YEAR1_CODES.vowel),
      readClue('pie', ['p', 'ie'], ['pig', 'pie', 'pin'], 'pie', 'A pie! A fishy pie for Milo.', YEAR1_CODES.vowel)
    ]
  },
  {
    id: 'R-1-LV-04',
    shelfName: 'Two sounds of ow',
    items: [
      readClue('snow', ['s', 'n', 'ow'], ['snow', 'snail', 'cow'], 'snow', 'Snow! Here ow says oa.', YEAR1_CODES.twoSounds),
      readClue('cow', ['c', 'ow'], ['cow', 'car', 'owl'], 'cow', 'A cow! Here ow says ou. The same letters, a different sound.', YEAR1_CODES.twoSounds),
      readClue('bow', ['b', 'ow'], ['boat', 'bow', 'box'], 'bow', 'A bow! ow says oa, like snow.', YEAR1_CODES.twoSounds),
      readClue('owl', ['ow', 'l'], ['bow', 'owl', 'log'], 'owl', 'An owl! ow says ou, like cow. Hoot!', YEAR1_CODES.twoSounds)
    ]
  },

  // ---------------------------------------------------------------- Word shells 2 (AC9E1LY14)
  {
    id: 'R-1-TW-01',
    shelfName: 'Year 1 word shells',
    items: [
      trickyClue('one', ['on', 'one', 'once'], 'One! One shark, one fin.'),
      trickyClue('by', ['my', 'by', 'be'], 'By! Swim by the reef.'),
      trickyClue('like', ['like', 'lick', 'lake'], 'Like! I like sharks.'),
      trickyClue('have', ['has', 'hive', 'have'], 'Have! Sharks have lots of teeth.')
    ]
  },
  {
    id: 'R-1-TW-02',
    shelfName: 'Where words',
    items: [
      trickyClue('here', ['here', 'her', 'there'], 'Here! The shark is here.'),
      trickyClue('there', ['three', 'there', 'here'], 'There! Look over there.'),
      trickyClue('where', ['when', 'were', 'where'], 'Where! Where is Milo?'),
      trickyClue('what', ['what', 'that', 'wet'], 'What! What can you see?')
    ]
  },
  {
    id: 'R-1-TW-03',
    shelfName: 'Little words',
    items: [
      trickyClue('little', ['little', 'litter', 'lift'], 'Little! A little fish.'),
      trickyClue('down', ['dawn', 'down', 'town'], 'Down! Dive down deep.'),
      trickyClue('of', ['off', 'if', 'of'], 'Of! A school of fish.'),
      trickyClue('your', ['you', 'your', 'four'], 'Your! Is that your shell?')
    ]
  }
];
year1ReadingLessons.forEach(lesson => {
  lesson.school = true;
  lesson.year = 1;
  lesson.items.forEach(q => q.kind === 'tricky' && (q.codes = YEAR1_CODES.tricky));
});
readingMissionLibrary.push(...year1ReadingLessons);

// ---------------------------------------------------------------- the learning path
pathSkills.push(
  { id: 'y1-swap', subject: 'reading', year: 1, name: 'Sound swap', glyph: 'c→h', lessons: ['R-1-SW-01', 'R-1-SW-02', 'R-1-SW-03'] },
  { id: 'y1-blend', subject: 'reading', year: 1, name: 'Blends', glyph: 'st', lessons: ['R-1-BL-01', 'R-1-BL-02', 'R-1-BL-03'] },
  { id: 'y1-vowels', subject: 'reading', year: 1, name: 'ay ea igh ow', glyph: 'igh', lessons: ['R-1-LV-01', 'R-1-LV-02', 'R-1-LV-03', 'R-1-LV-04'] },
  { id: 'y1-tricky', subject: 'reading', year: 1, name: 'Year 1 tricky words', glyph: 'one', lessons: ['R-1-TW-01', 'R-1-TW-02', 'R-1-TW-03'] }
);
