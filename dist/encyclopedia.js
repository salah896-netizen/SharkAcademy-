const sharkBook = [
  {
    id: 'megalodon',
    name: 'Megalodon',
    subtitle: 'The prehistoric giant',
    group: 'prehistoric',
    image: null,
    pronounce: 'meg-uh-luh-don',
    intro: 'An enormous shark from a world long ago.',
    facts: [
      [
        'When did it live?',
        'Millions of years ago. Megalodon is extinct. That means there are none alive today.'
      ],
      [
        'What did it eat?',
        'It ate large sea animals, including whales. Fossil bones sometimes show tooth marks.'
      ],
      ['How do we know?', 'Scientists study its huge fossil teeth. Its name means “big tooth”!'],
      [
        'Was it like Milo?',
        'Milo is our imaginary friend. Nobody has seen a living megalodon, so scientists use fossils to work out what it looked like.'
      ]
    ],
    question: 'How do scientists learn about megalodon?',
    answers: ['Fossil teeth', 'Photos of living ones'],
    correct: 0,
    source:
      'https://www.nhm.ac.uk/discover/megalodon--the-truth-about-the-largest-shark-that-ever-lived.html',
    sourceName: 'Natural History Museum'
  },
  {
    id: 'whale',
    name: 'Whale shark',
    subtitle: 'A giant with tiny food',
    group: 'giants',
    image: 'whale-shark.jpg',
    pronounce: 'wayl shark',
    intro: 'The biggest fish alive today has a spotty coat.',
    facts: [
      [
        'Is it a whale?',
        'No! It is a fish. Like other sharks, it breathes through gills. Whales breathe air with lungs.'
      ],
      [
        'What does it eat?',
        'Tiny animals called plankton, and small fish. It filters food from the water.'
      ],
      [
        'Where does it live?',
        'In warm seas around the world. Sometimes it swims near the surface.'
      ],
      [
        'What makes it special?',
        'Its back has pale spots and stripes. Look closely at the photo to find them.'
      ]
    ],
    question: 'Is a whale shark a fish or a whale?',
    answers: ['A fish', 'A whale'],
    correct: 0,
    source:
      'https://www.fisheries.noaa.gov/new-england-mid-atlantic/atlantic-highly-migratory-species/shark-identification-cooperative-shark-0',
    sourceName: 'NOAA Fisheries',
    credit: 'Zac Wolf; crop by Stefan; colour adjustment by Togabi',
    photoSource: 'https://commons.wikimedia.org/wiki/File:Whale_shark_Georgia_aquarium.jpg',
    license: '2.5'
  },
  {
    id: 'white',
    name: 'Great white shark',
    subtitle: 'The ocean explorer',
    group: 'hunters',
    image: 'white-shark.jpg',
    pronounce: 'grayt wyt shark',
    intro: 'A powerful swimmer with a grey back and pale belly.',
    facts: [
      ['Where does it live?', 'In many seas around the world, including around Australia.'],
      ['What does it eat?', 'Fish and other sea animals. Larger great whites also eat seals.'],
      [
        'Why two colours?',
        'A dark back and light belly help it blend in when seen from above or below. This is called countershading.'
      ],
      [
        'How does it swim?',
        'It moves its tail from side to side. Its fins help it balance and steer.'
      ]
    ],
    question: 'Which part pushes a shark through the water?',
    answers: ['Its tail', 'Its nose'],
    correct: 0,
    source: 'https://www.fisheries.noaa.gov/species/white-shark',
    sourceName: 'NOAA Fisheries',
    credit: 'Terry Goss; image adjustments by Wikimedia contributors',
    photoSource: 'https://commons.wikimedia.org/wiki/File:White_shark.jpg',
    license: '3.0'
  },
  {
    id: 'hammerhead',
    name: 'Scalloped hammerhead',
    subtitle: 'A very clever head',
    group: 'hunters',
    image: 'hammerhead.jpg',
    pronounce: 'skal-upt ham-er-hed',
    intro: 'Its wide head looks a little like a hammer.',
    facts: [
      [
        'Why that funny head?',
        'Its wide head has special sensors that help it find food. Its eyes sit near the ends.'
      ],
      ['What does it eat?', 'Fish, squid and rays. Young sharks often eat smaller food.'],
      [
        'Does it swim alone?',
        'Sometimes. Scalloped hammerheads can also gather in big groups called schools.'
      ],
      [
        'Where does it live?',
        'In warm seas. Adults often live offshore, while young sharks use shallower nursery areas.'
      ]
    ],
    question: 'A group of sharks can be called a…',
    answers: ['School', 'Forest'],
    correct: 0,
    source:
      'https://dar.hawaii.gov/learn-explore/species/sharks-and-rays/scalloped-hammerhead-shark/',
    sourceName: 'Hawaiʻi Division of Aquatic Resources',
    credit: 'Stealthwater; colour adjustment by Togabi',
    photoSource: 'https://commons.wikimedia.org/wiki/File:Scalloped_Hammerheads.jpg',
    license: '3.0'
  },
  {
    id: 'tiger',
    name: 'Tiger shark',
    subtitle: 'The striped explorer',
    group: 'hunters',
    image: 'tiger-shark.jpg',
    pronounce: 'ty-ger shark',
    intro: 'Dark stripes give this shark its tiger name.',
    facts: [
      [
        'Why “tiger”?',
        'Young tiger sharks have dark stripes on their sides. The stripes become less clear as they grow.'
      ],
      ['What does it eat?', 'Many kinds of sea animals, including fish, turtles and shellfish.'],
      ['Where does it live?', 'In tropical and warm seas, near coasts and farther out at sea.'],
      ['What can you spot?', 'Look for its broad head and striped sides in the real photo.']
    ],
    question: 'What gives a tiger shark its name?',
    answers: ['Its stripes', 'Its fur'],
    correct: 0,
    source:
      'https://www.fisheries.noaa.gov/new-england-mid-atlantic/atlantic-highly-migratory-species/shark-identification-cooperative-shark-0',
    sourceName: 'NOAA Fisheries',
    credit: 'Albert kok',
    photoSource: 'https://commons.wikimedia.org/wiki/File:Tiger_shark.jpg',
    license: '3.0'
  }
];
sharkBook.push(
  {
    id: 'goblin',
    name: 'Goblin shark',
    subtitle: 'Gizmo’s deep-sea relatives',
    group: 'deep',
    image: 'goblin-shark.jpg',
    pronounce: 'gob-lin shark',
    intro: 'A long snout and surprising jaws belong to a real deep-sea shark.',
    facts: [
      [
        'Where is its home?',
        'Mostly deep water near the edges of continents. People rarely see it.'
      ],
      ['Why the long snout?', 'Its flattened snout carries sensors that help it search for food.'],
      [
        'What can its jaws do?',
        'They shoot forwards quickly to grab prey, including fish and squid.'
      ],
      [
        'Why can it look pink?',
        'Blood vessels show through its skin. Gizmo is our imaginary helper, based on this real kind of shark.'
      ]
    ],
    question: 'What can a goblin shark’s jaws do?',
    answers: ['Shoot forwards to catch food', 'Turn into a fishing net'],
    correct: 0,
    source: 'https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/goblin-shark/',
    sourceName: 'Florida Museum',
    credit: 'Michigan State University / USFWS; Wikimedia crop by Lamnid13',
    photoSource: 'https://commons.wikimedia.org/wiki/File:Goblin_shark_(Mitsukurina_owstoni).jpg',
    license: 'public'
  },
  {
    id: 'mako',
    name: 'Shortfin mako',
    subtitle: 'Dash’s speedy relatives',
    group: 'hunters',
    image: 'mako-shark.jpg',
    pronounce: 'short-fin may-koh',
    intro: 'A sleek blue shark built for fast swimming.',
    facts: [
      [
        'What helps it swim?',
        'A pointed nose, streamlined body and strong, crescent-shaped tail help it move through water.'
      ],
      ['Where does it live?', 'In warm and temperate seas around the world, often in open water.'],
      ['What does it eat?', 'Fish and squid. Speed helps it catch moving prey.'],
      [
        'Is Dash a real shark?',
        'Dash is an imaginary mako friend. Real makos are wild animals, and they cannot write letters like Dash!'
      ]
    ],
    question: 'Which shape helps a mako swim quickly?',
    answers: ['A streamlined body', 'A big square body'],
    correct: 0,
    source: 'https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/shortfin-mako/',
    sourceName: 'Florida Museum',
    credit: 'Mark Conlin, SWFSC Large Pelagics Program / NOAA; contrast by Citron',
    photoSource: 'https://commons.wikimedia.org/wiki/File:Isurus_oxyrinchus_by_mark_conlin.jpg',
    license: 'public'
  },
  {
    id: 'basking',
    name: 'Basking shark',
    subtitle: 'Open wide for tiny food',
    group: 'giants',
    image: 'basking-shark.jpg',
    pronounce: 'bas-king shark',
    intro: 'An enormous mouth scoops up a very small dinner.',
    facts: [
      ['How big is it?', 'It is the second-largest living fish, after the whale shark.'],
      [
        'Why is its mouth open?',
        'Water flows into the mouth as it swims. Gill rakers help trap tiny drifting animals called zooplankton.'
      ],
      [
        'Does it have teeth?',
        'Yes, it has very small teeth. It filters food instead of using its teeth to catch big prey.'
      ],
      [
        'Where can it swim?',
        'In temperate seas, including around Britain. It can travel far and dive below the surface.'
      ]
    ],
    question: 'What does a basking shark eat?',
    answers: ['Tiny drifting animals', 'Surfboards'],
    correct: 0,
    source: 'https://www.nhm.ac.uk/discover/basking-shark-cetorhinus-maximus.html',
    sourceName: 'Natural History Museum',
    credit: 'Chris Gotschalk',
    photoSource: 'https://commons.wikimedia.org/wiki/File:Basking_Shark.jpg',
    license: 'public'
  },
  {
    id: 'epaulette',
    name: 'Epaulette shark',
    subtitle: 'A little reef walker',
    group: 'reef',
    image: 'epaulette-shark.jpg',
    pronounce: 'ep-uh-let shark',
    intro: 'This small shark can use its fins to walk across the reef.',
    facts: [
      [
        'Where does it live?',
        'In shallow coral-reef water, including Australia’s Great Barrier Reef.'
      ],
      [
        'Can it really walk?',
        'It bends its body and moves its paired fins to clamber along the bottom. It can swim too!'
      ],
      [
        'What does it eat?',
        'Small animals, including worms, crabs and shrimp. It often searches for food at night.'
      ],
      [
        'What is that dark patch?',
        'A large dark spot behind each side fin helps you recognise it. Look for the spot in the photo.'
      ]
    ],
    question: 'What can an epaulette shark use to walk?',
    answers: ['Its fins', 'A pair of boots'],
    correct: 0,
    source: 'https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/epaulette-shark/',
    sourceName: 'Florida Museum',
    credit: 'Richard Ling',
    photoSource: 'https://commons.wikimedia.org/wiki/File:Hemiscyllium_ocellatum.jpg',
    license: '2.0'
  }
);
const sharkNames = {
  megalodon: 'Otodus megalodon',
  whale: 'Rhincodon typus',
  white: 'Carcharodon carcharias',
  hammerhead: 'Sphyrna lewini',
  tiger: 'Galeocerdo cuvier',
  goblin: 'Mitsukurina owstoni',
  mako: 'Isurus oxyrinchus',
  basking: 'Cetorhinus maximus',
  epaulette: 'Hemiscyllium ocellatum'
};
const bookReferences = {
  megalodon: 'Eyewitness Shark, pp. 12–13; Sharks, early shark history.',
  whale: 'Sharks, carpet sharks; Eyewitness Shark, filter feeding.',
  white: 'Eyewitness Shark, pp. 28–31; Sharks, mackerel sharks.',
  hammerhead: 'Sharks, hammerheads; Eyewitness Shark, pp. 18–19.',
  tiger: 'Eyewitness Shark, p. 25; Sharks, ground sharks.',
  goblin: 'Harvey, Sharks and Other Deadly Ocean Creatures, p. 117; Sharks, p. 22.',
  mako: 'Sharks, mackerel sharks; Harvey, mako profile.',
  basking: 'Eyewitness Shark, p. 24; Sharks, mackerel sharks.',
  epaulette: 'Eyewitness Shark, p. 24; Sharks, carpet sharks.'
};
// Fossils include vertebrae as well as teeth. Exact body shape, colour and size remain uncertain.
sharkBook[0].facts[0] = [
  'When did it live?',
  'Millions of years ago, long before people. It disappeared about 3.6 million years ago. Extinct means none are alive today.'
];
sharkBook[0].facts[2] = [
  'How do we know?',
  'Scientists study huge fossil teeth and other remains, including some backbone fossils. Its name means “big tooth”.'
];
let bookFilter = 'all',
  bookSearch = '';
const bookGroups = [
  ['all', 'All sharks'],
  ['prehistoric', 'Long ago'],
  ['giants', 'Gentle giants'],
  ['hunters', 'Ocean hunters'],
  ['reef', 'Reef friends'],
  ['deep', 'Deep sea']
];
function encyclopedia() {
  const selected = location.hash.split('/')[1];
  if (selected?.startsWith('topic-')) {
    oceanTopicPage(selected.slice(6));
    return;
  }
  if (selected) {
    const entry = sharkBook.find(s => s.id === selected);
    if (entry) {
      sharkArticle(entry);
      return;
    }
  }
  app.innerHTML = `<section class="book-head"><span class="tag">HAYTHAM’S SHARK ENCYCLOPEDIA</span><h1>Meet the sharks</h1><p>Big teeth. Tiny dinners. Secret senses.<br>Choose a picture. Gizmo and Milo will explore with you.</p><button class="listen" id="bookWelcome">♫ What can I discover?</button><span class="book-progress">${sharkBook.filter(s => state.discoveries.includes('book-' + s.id)).length} of ${sharkBook.length} sharks explored · ${oceanTopics.length} shark-school discoveries</span></section><div class="book-section-links"><button data-book-jump="sharkCollection">${paintedIcon('shark')} Meet a shark</button><button data-book-jump="sharkSchool">${paintedIcon('magnifier')} Shark school</button><button data-book-jump="wordChest">${paintedIcon('chest')} Word chest</button></div><section id="sharkCollection"><label class="book-search">Find a shark <input id="sharkSearch" type="search" placeholder="Try mako, spots or deep…" autocomplete="off"></label><div class="book-filters" role="group" aria-label="Filter sharks">${bookGroups.map(([id, label]) => `<button data-filter="${id}" aria-pressed="${bookFilter === id}">${label}</button>`).join('')}</div><p id="bookResults" class="muted" role="status"></p><section class="species-grid" id="speciesCards"></section></section><section class="topic-section" id="sharkSchool"><span class="tag">LITTLE QUESTIONS. AMAZING ANSWERS.</span><h2>Shark school</h2><p class="muted">Tap a picture. Listen, discover, and try a little question.</p><div class="topic-grid">${oceanTopics.map(t => `<button class="topic-card illustrated-topic" data-topic="${t.id}"><span class="school-icon" aria-hidden="true">${schoolIcon(t.icon)}</span><strong>${t.title}</strong><span>${t.desc}</span><span>${(state.topicDiscoveries || []).includes(t.id) ? 'Discovered ✓' : 'Dive in →'}</span></button>`).join('')}</div></section><section class="word-chest" id="wordChest"><span class="tag">YOUR TREASURE OF NEW WORDS</span><h2>Ocean word chest</h2><p>Tap a word to hear what it means.</p><div>${sharkWords.map(([word], i) => `<button data-word="${i}">${word} <span aria-hidden="true">♫</span></button>`).join('')}</div><p id="wordMeaning" aria-live="polite">Which word shall we open first?</p></section><button class="kraken-discover-card" id="encyclopediaKraken"><img src="assets/visual-kraken.jpg" alt="Imaginary kraken in an underwater cavern"><span><small>SEA LEGENDS · MAKE-BELIEVE</small><strong>The Kraken’s secret cave</strong><span>Meet the legend →</span></span></button>${encyclopediaBibliography()}<p class="muted book-note">Every discovery is open. No pearls needed.</p>`;
  document
    .querySelectorAll('[data-book-jump]')
    .forEach(
      b =>
        (b.onclick = () =>
          document
            .getElementById(b.dataset.bookJump)
            .scrollIntoView({
              behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
              block: 'start'
            }))
    );
  $('#bookWelcome').onclick = () =>
    helperSpeak(
      'Welcome to your shark encyclopedia, Haytham! Pick a shark picture, visit shark school, or tap a treasure word. I will read with you.'
    );
  $('#encyclopediaKraken').onclick = openKraken;
  $('#sharkSearch').value = bookSearch;
  $('#sharkSearch').oninput = e => {
    bookSearch = e.target.value;
    renderSpecies();
  };
  document.querySelectorAll('[data-filter]').forEach(
    b =>
      (b.onclick = () => {
        bookFilter = b.dataset.filter;
        document
          .querySelectorAll('[data-filter]')
          .forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        renderSpecies();
      })
  );
  document
    .querySelectorAll('[data-topic]')
    .forEach(b => (b.onclick = () => openTopic(b.dataset.topic)));
  document.querySelectorAll('[data-word]').forEach(
    b =>
      (b.onclick = () => {
        const w = sharkWords[+b.dataset.word];
        $('#wordMeaning').textContent = w[0] + ': ' + w[1];
        helperSpeak(w.join('. '));
      })
  );
  renderSpecies();
}
function renderSpecies() {
  const query = bookSearch.toLocaleLowerCase().trim();
  const sharks = sharkBook.filter(
    s =>
      (bookFilter === 'all' || s.group === bookFilter || (bookFilter === 'aussie' && s.aussie)) &&
      [s.name, s.subtitle, s.intro, ...s.facts.flat()].join(' ').toLocaleLowerCase().includes(query)
  );
  $('#bookResults').textContent =
    sharks.length + ' shark' + (sharks.length === 1 ? '' : 's') + ' to meet';
  $('#speciesCards').innerHTML = sharks.length
    ? sharks
        .map(
          s =>
            `<a class="species-card" href="#museum/${s.id}">${s.image ? `<img loading="lazy" src="assets/${s.image}" alt="Real ${s.name.toLowerCase()}">` : `<div class="prehistoric-art"><img src="assets/visual-megalodon.jpg" alt="An artist’s imagined megalodon"><span>ILLUSTRATED RECONSTRUCTION</span></div>`}<div class="species-copy"><span class="tag">${s.group === 'prehistoric' ? 'LIVED LONG AGO' : 'ALIVE TODAY'} ${state.discoveries.includes('book-' + s.id) ? '· EXPLORED ✓' : ''}</span><h2>${s.name}</h2><p>${s.subtitle}</p><span class="explore-link">Meet this shark <span>↗</span></span></div></a>`
        )
        .join('')
    : '<p>No shark found. Try another word or choose All sharks.</p>';
}
function openTopic(id) {
  location.hash = 'museum/topic-' + id;
}
function oceanTopicPage(id) {
  const t = oceanTopics.find(t => t.id === id);
  if (!t) {
    location.hash = 'museum';
    return;
  }
  app.dataset.scienceHelped = 'false';
  const deeper = stageFor('science') > 1;
  app.innerHTML = `<article class="school-page shark-article"><div class="article-top"><a class="back-link" href="#museum">← Shark encyclopedia</a><button class="listen" id="readTopic">♫ Read to me</button></div><div class="school-heading"><span class="school-icon" aria-hidden="true">${schoolIcon(t.icon)}</span><span class="tag">SHARK SCHOOL · ${stageDescription('science')}</span><h1>${t.title}</h1><p class="topic-text">${t.text}</p></div><section class="deep-science"><span class="tag">${deeper ? 'DIVE DEEPER' : 'CURIOUS? THERE’S MORE'}</span><details ${deeper ? 'open' : ''}><summary>Explore a little deeper</summary><p>${t.more}</p><button class="listen" id="readMore">♫ Listen</button></details></section><section class="school-activity"><span class="tag">YOUR LITTLE EXPLORATION</span><h2>Try this, Haytham</h2><p>${t.activity}</p><button class="quiet" id="readActivity">♫ Hear my mission</button></section>${discoveryQuestion(deeper ? t.deepQuestion : t.question, deeper ? t.deepAnswers : t.answers)}<details class="science-sources"><summary>Sources for grown-ups</summary><p>Original child-friendly explanation informed by ${t.books}. Checked against <a href="${t.source || schoolSource}" target="_blank" rel="noopener">${t.source ? 'Natural History Museum' : 'Smithsonian Ocean'}</a>.</p></details><a class="back-link" href="#museum">Choose another discovery →</a></article>`;
  $('#readTopic').onclick = () => helperSpeak(t.title + '. ' + t.text);
  $('#readMore').onclick = () => helperSpeak(t.more);
  $('#readActivity').onclick = () => helperSpeak(t.activity);
  bindDiscovery(t.id, deeper ? t.deepAnswers : t.answers, 'topic');
}
function discoveryQuestion(question, answers) {
  const order = shuffled(answers.map((answer, i) => ({ answer, i })));
  return `<section class="shark-question"><span class="tag">YOUR LITTLE DISCOVERY</span><h2>${question}</h2><button class="quiet" id="hearQuestion">♫ Hear the question</button><div class="choices">${order.map(x => `<button data-book-answer="${x.i}">${x.answer}</button>`).join('')}</div><p aria-live="polite" id="bookFeedback">Take your time. You can listen to the facts again.</p></section>`;
}
function bindDiscovery(id, answers, type = 'book') {
  let helped = false;
  const stage = stageFor('science');
  $('#hearQuestion').onclick = () =>
    helperSpeak($('.shark-question h2').textContent + '. ' + answers.join('. Or, '));
  document.querySelectorAll('[data-book-answer]').forEach(
    b =>
      (b.onclick = () => {
        if (+b.dataset.bookAnswer !== 0) {
          helped = true;
          $('#bookFeedback').textContent =
            'Good thinking. Let’s listen to the facts and try again.';
          encourage('Let’s look for another clue, Haytham. You can try again.', 'retry');
          return;
        }
        const key = type + '-' + id + '-stage-' + stage;
        const fresh = !state.discoveries.includes(key);
        if (fresh) {
          state.discoveries.push(key);
          if (type === 'book') {
            if (!state.discoveries.includes('book-' + id)) state.discoveries.push('book-' + id);
            state.scienceHistory = state.scienceHistory || [];
            state.scienceHistory.push({
              shark: id,
              independent: !helped && app.dataset.scienceHelped !== 'true',
              stage,
              at: new Date().toISOString()
            });
            state.xp += PEARLS.extra;
            advanceLearning('science');
          } else {
            state.topicDiscoveries = state.topicDiscoveries || [];
            if (!state.topicDiscoveries.includes(id)) state.topicDiscoveries.push(id);
            state.xp += PEARLS.extra;
          }
          save();
        }
        $('#bookFeedback').textContent = fresh
          ? type === 'book'
            ? 'You discovered it! Pearls for your collection.'
            : 'Discovery made! Pearls for your collection.'
          : 'You remembered! This discovery is already in your log.';
        encourage('Wonderful exploring, Haytham! You found the clue.');
        document.querySelectorAll('[data-book-answer]').forEach(x => (x.disabled = true));
      })
  );
}
function sharkArticle(s) {
  app.dataset.scienceHelped = 'false';
  const depth = scienceDepth[s.id];
  const question = stageFor('science') > 1 ? depth[2] : s.question,
    answers = stageFor('science') > 1 ? depth[3] : s.answers;
  app.innerHTML = `<article class="shark-article"><div class="article-top"><a class="back-link" href="#museum">← All sharks</a><button class="listen" id="readShark">♫ Read to me</button></div><div class="article-hero">${s.image ? `<img src="assets/${s.image}" alt="A real ${s.name.toLowerCase()}">` : `<div class="mega-illustration"><img src="assets/visual-megalodon.jpg" alt="An artistic reconstruction of the extinct megalodon"><span>Illustration · exact appearance uncertain</span></div>`}<div class="article-title"><span class="tag">${s.group === 'prehistoric' ? 'PREHISTORIC SHARK' : 'MEET A REAL SHARK'}</span><h1>${s.name}</h1><p>${s.intro}</p></div></div><div class="shark-id"><p class="pronunciation">SAY IT: ${s.pronounce}</p><p><em>${sharkNames[s.id]}</em> · ${stageDescription('science')}</p></div><div class="fact-grid">${s.facts.map(([title, text], i) => `<section><span class="topic-number">0${i + 1}</span><h2>${title}</h2><p>${text}</p><button class="quiet" data-read-fact="${i}" aria-label="Listen: ${title}">♫ Listen</button></section>`).join('')}</div>${deeperScience(s)}${discoveryQuestion(question, answers)}<details class="science-sources"><summary>Sources & photo credits for grown-ups</summary><p>Science checked against <a href="${s.source}" target="_blank" rel="noopener">${s.sourceName}</a>. Book references: ${bookReferences[s.id]}</p><p>${s.image ? `Photo: ${s.credit}. <a href="${s.photoSource}" target="_blank" rel="noopener">Original photograph and licence</a>. ${s.license === 'public' ? 'Public domain.' : `<a href="https://creativecommons.org/licenses/by-sa/${s.license}/" target="_blank" rel="noopener">CC BY-SA ${s.license}</a>; the resized image remains under this licence.`} Resized and shown in cropped frames.` : 'Megalodon is extinct. This picture is an imagined reconstruction. Milo is fictional. Neither is evidence of its exact body shape or colour.'}</p></details><a href="#museum" class="back-link">Explore another shark →</a></article>`;
  if ($('#deeperListen'))
    $('#deeperListen').onclick = () => helperSpeak(depth.slice(0, 2).join('. '));
  $('#readShark').onclick = () =>
    helperSpeak(s.name + '. ' + s.intro + ' ' + s.facts.map(f => f.join(' ')).join(' '));
  document
    .querySelectorAll('[data-read-fact]')
    .forEach(b => (b.onclick = () => helperSpeak(s.facts[+b.dataset.readFact].join(' '))));
  bindDiscovery(s.id, answers);
}
function encyclopediaBibliography() {
  return `<details class="science-sources encyclopedia-bibliography"><summary>Our encyclopedia bookshelf · for grown-ups</summary><p>Original explanations created for Haytham using these family-provided reference books: Sarah L. Fowler, <em>Sharks</em>; Derek Harvey, <em>Sharks and Other Deadly Ocean Creatures</em>; DK, <em>Everything You Need to Know About Sharks</em>; Miranda MacQuitty / DK, <em>Eyewitness Shark</em>.</p><p>Key facts checked against museum and marine-science references. Each profile and lesson lists its sources. Book pages and photographs are not reproduced. Living sharks use separately licensed photos; megalodon uses a labelled illustration. The Kraken and our talking helpers are fictional.</p><p>Reading starts with short facts. Science questions become deeper as Haytham advances through three stages. Topic practice earns pearls separately; science progression uses discoveries across different shark profiles. Progress stays on this device. References reviewed October 2026.</p></details>`;
}
function schoolIcon(kind) {
  const paths = {
    body: 'M14 52Q40 20 85 37L94 12L105 39L137 53L164 30L154 57L164 79L136 65Q70 91 14 52ZM40 49h1M78 66L99 91',
    gills:
      'M25 50Q75 15 142 49Q95 88 25 50M70 35Q82 50 70 68M85 35Q97 50 85 68M100 39Q112 52 100 66',
    teeth: 'M25 22Q90 43 155 22L135 78L113 42L89 84L66 42L44 78Z',
    skin: 'M35 25L57 44L35 62L15 44ZM85 25L107 44L85 62L65 44ZM135 25L157 44L135 62L115 44ZM60 60L82 79L60 97L40 79ZM110 60L132 79L110 97L90 79',
    senses: 'M30 60Q86 4 148 60Q88 112 30 60ZM90 39A21 21 0 1 0 90 81A21 21 0 1 0 90 39',
    electric: 'M104 9L61 59H91L75 101L124 44H94Z',
    babies:
      'M40 21Q90 -6 135 21L125 84Q90 107 50 84ZM65 62Q88 37 113 62L120 48L120 77L110 67Q82 82 65 62',
    food: 'M20 52Q47 26 75 51L90 31V74L73 60Q45 81 20 52M117 33h1M143 55h1M119 77h1M148 27h1',
    homes:
      'M15 87H165M44 85V25M44 53L25 36M44 47L61 24M120 85V39M120 60L142 39M80 85V62M80 70L68 57',
    journeys: 'M34 30Q148 3 143 47Q136 91 42 78M42 78L60 65M42 78L62 93M31 30h1',
    fossils: 'M91 12L45 82L79 73L91 91L103 73L140 82ZM80 31L74 55M101 31L109 55',
    care: 'M88 89L30 43Q9 12 42 12Q68 5 88 27Q109 5 135 12Q168 15 147 45Z'
  };
  return `<svg viewBox="0 0 180 110" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="${paths[kind] || paths.body}"/></svg>`;
}
// Sea legends: the imaginary kraken (make-believe, and not a shark).
function openKraken() {
  if (location.hash !== '#legend/kraken') {
    location.hash = 'legend/kraken';
    return;
  }
  stopStory();
  app.innerHTML = `<article class="kraken-ocean-page"><a class="back-link" href="#museum">← Back to Sharks</a><span class="tag">SEA LEGENDS · MAKE-BELIEVE</span><h1>The Kraken’s secret cave</h1><button id="wakeKraken" class="kraken-picture" aria-label="Wake the kraken"><img src="assets/visual-kraken.jpg" alt="An imaginary kraken with enormous curling tentacles in a glowing cave"><span>✦</span></button><p>The kraken is a legendary sea monster. People told stories about its huge arms and tentacles.</p><p><strong>Real giant squid do exist.</strong> Our kraken is make-believe. It is not a shark!</p><button id="krakenListen" class="listen">♫ Tell me, Milo</button><p id="krakenReaction" aria-live="polite">Tap the kraken to wake its cave.</p><p class="credits">Illustration of a sea legend. <a href="https://www.nhm.ac.uk/discover/sea-monsters-inspiration-serpents-mermaids-the-kraken.html" target="_blank" rel="noopener">Natural History Museum</a>.</p></article>`;
  $('#krakenListen').onclick = () =>
    speak(
      'The kraken is a sea monster from old stories. Real giant squid exist, but this kraken is make-believe. It is not a shark!'
    );
  $('#wakeKraken').onclick = () => {
    const button = $('#wakeKraken');
    button.classList.remove('awake');
    void button.offsetWidth;
    button.classList.add('awake');
    $('#krakenReaction').textContent =
      'Whoooosh! The kraken curls its tentacles and sends bubbles through the cave.';
    speak('Whoosh! Hello, Haytham. You found my secret cave!');
  };
  window.scrollTo(0, 0);
}
