/* Encyclopedia, part 2 (25 October 2026), from Haytham's feedback: "read it all to me" and
 * "the pictures are weak".
 *
 * - Eight more sharks, five of them Australian (Port Jackson and wobbegong live near Adelaide).
 *   Wording is original and written for a 6-year-old. Facts were checked against museum and
 *   fisheries references and the family's four shark books (cited, never copied).
 * - Every shark has up to three real, licensed photos (Wikimedia Commons), with credits.
 * - Gizmo reads everything: each page starts reading as it opens, and every card, heading and
 *   question can be tapped to hear it. "Read to me" reads the whole page in order.
 * - A new "Australian sharks" tab on the encyclopedia shelf.
 */
const moreSharks = [
  {
    id: 'portjackson',
    name: 'Port Jackson shark',
    subtitle: 'The shell-crunching neighbour',
    group: 'reef',
    aussie: true,
    pronounce: 'port jak-sun shark',
    intro: 'A bumpy-headed shark that lives around southern Australia, even near Adelaide!',
    facts: [
      [
        'Where does it live?',
        'Along the southern coasts of Australia, including South Australia. It rests in caves and under rocky ledges.'
      ],
      [
        'What does it eat?',
        'Sea urchins, crabs and shellfish. Flat teeth at the back of its mouth crush the hard shells.'
      ],
      [
        'What do its eggs look like?',
        'Its egg cases are shaped like a twisty screw. The mother pushes them into rocky cracks to keep them safe.'
      ],
      [
        'How did it get its name?',
        'Port Jackson is the harbour in Sydney. That is where this shark was first described by scientists.'
      ]
    ],
    question: 'What shape is a Port Jackson shark’s egg case?',
    answers: ['A twisty screw', 'A round ball'],
    correct: 0,
    source:
      'https://australian.museum/learn/animals/fishes/port-jackson-shark-heterodontus-portusjacksoni-meyer-1793/',
    sourceName: 'Australian Museum'
  },
  {
    id: 'wobbegong',
    name: 'Spotted wobbegong',
    subtitle: 'The shark that looks like a rug',
    group: 'reef',
    aussie: true,
    pronounce: 'wob-ee-gong',
    intro: 'A flat, spotty shark that hides on the sea floor like a patterned rug.',
    facts: [
      [
        'Where is it hiding?',
        'It lies very still on reefs and sandy sea floors around southern and eastern Australia. Its spots and blotches help it blend in.'
      ],
      [
        'What are those frills?',
        'Flaps of skin around its mouth look like seaweed. Small fish swim closer to look, and then, snap!'
      ],
      ['When is it busy?', 'It mostly rests in the day, and hunts at night.'],
      [
        'What does its name mean?',
        'People think wobbegong comes from an Aboriginal word that means shaggy beard.'
      ]
    ],
    question: 'How does a wobbegong catch fish?',
    answers: ['It hides and waits', 'It chases them for hours'],
    correct: 0,
    source:
      'https://australian.museum/learn/animals/fishes/spotted-wobbegong-orectolobus-maculatus-bonnaterre-1788/',
    sourceName: 'Australian Museum'
  },
  {
    id: 'greynurse',
    name: 'Grey nurse shark',
    subtitle: 'Toothy, but calm',
    group: 'hunters',
    aussie: true,
    pronounce: 'gray nurss shark',
    intro: 'It looks fierce with its pointy teeth, but it is a calm, slow swimmer.',
    facts: [
      [
        'Why so many teeth?',
        'Its long, thin teeth stick out even when its mouth is closed. They help it hold on to slippery fish.'
      ],
      [
        'How does it float?',
        'It gulps air at the surface and keeps it in its tummy. This helps it hover in the water without sinking.'
      ],
      [
        'Where does it live?',
        'Off the east and west coasts of Australia, and in other seas too. It likes rocky caves and gutters.'
      ],
      [
        'Does it need our help?',
        'Yes. Not many are left on Australia’s east coast, so the law protects them.'
      ]
    ],
    question: 'How does a grey nurse shark hover in the water?',
    answers: ['It gulps air', 'It holds on to rocks'],
    correct: 0,
    source:
      'https://australian.museum/learn/animals/fishes/greynurse-shark-carcharias-taurus-rafinesque-1810/',
    sourceName: 'Australian Museum'
  },
  {
    id: 'bull',
    name: 'Bull shark',
    subtitle: 'The river explorer',
    group: 'hunters',
    aussie: true,
    pronounce: 'bool shark',
    intro: 'A strong, chunky shark that can swim from the sea right up into rivers.',
    facts: [
      [
        'Can it live in rivers?',
        'Yes! Bull sharks can swim in salty sea water and in fresh river water. Very few sharks can do that.'
      ],
      [
        'Why is it called a bull?',
        'It has a short, wide snout and a chunky body, a little like a bull.'
      ],
      [
        'What does it eat?',
        'Fish, rays, turtles and even other sharks. It often hunts in muddy water.'
      ],
      [
        'Where does it live?',
        'In warm seas, bays and rivers around the world, including northern and eastern Australia.'
      ]
    ],
    question: 'Where can a bull shark swim?',
    answers: ['In the sea and in rivers', 'Only in the deep sea'],
    correct: 0,
    source: 'https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/bull-shark/',
    sourceName: 'Florida Museum'
  },
  {
    id: 'blacktip',
    name: 'Blacktip reef shark',
    subtitle: 'Fins dipped in ink',
    group: 'reef',
    aussie: true,
    pronounce: 'blak-tip reef shark',
    intro: 'Look for the black tips on its fins!',
    facts: [
      [
        'How do you spot one?',
        'Its fins have black tips, as if they were dipped in ink. The fin on its back has the biggest black tip.'
      ],
      [
        'Where does it live?',
        'In shallow, warm water on coral reefs, including the Great Barrier Reef. Sometimes its fin pokes out of the water.'
      ],
      ['What does it eat?', 'Small fish, squid, octopus and shrimps.'],
      [
        'Where do the babies grow up?',
        'Young blacktips stay in very shallow water near the beach, where big animals can’t easily reach them.'
      ]
    ],
    question: 'What colour are the tips of its fins?',
    answers: ['Black', 'Pink'],
    correct: 0,
    source:
      'https://australian.museum/learn/animals/fishes/blacktip-reef-shark-carcharhinus-melanopterus-quoy-gaimard-1824/',
    sourceName: 'Australian Museum'
  },
  {
    id: 'thresher',
    name: 'Thresher shark',
    subtitle: 'The tail-whipper',
    group: 'hunters',
    pronounce: 'thresh-er shark',
    intro: 'This shark has a tail almost as long as the rest of its body!',
    facts: [
      [
        'Why such a long tail?',
        'The top part of its tail is very, very long. It can be almost as long as the rest of the shark.'
      ],
      [
        'How does it hunt?',
        'It swims up to a group of small fish and whips its tail to stun them. Then it gobbles them up.'
      ],
      ['What does it eat?', 'Small fish that swim in big groups, like sardines, and squid.'],
      ['Can it jump?', 'Yes! Thresher sharks sometimes leap right out of the water.']
    ],
    question: 'What does a thresher shark use its long tail for?',
    answers: ['To stun fish', 'To dig holes'],
    correct: 0,
    source: 'https://www.fisheries.noaa.gov/species/atlantic-common-thresher-shark',
    sourceName: 'NOAA Fisheries'
  },
  {
    id: 'greenland',
    name: 'Greenland shark',
    subtitle: 'The very old, very slow giant',
    group: 'deep',
    pronounce: 'green-lund shark',
    intro: 'A slow giant from the icy Arctic that can live for hundreds of years.',
    facts: [
      [
        'How old can it get?',
        'Scientists think some Greenland sharks live for more than 250 years. No other animal with a backbone is known to live that long.'
      ],
      ['Where does it live?', 'In very cold, dark water in the far north, near the Arctic.'],
      [
        'How fast does it swim?',
        'Very slowly! It usually swims slower than you walk. Living in icy water slows everything down.'
      ],
      ['How big is it?', 'It grows very big. Some are longer than a car.']
    ],
    question: 'Where does a Greenland shark live?',
    answers: ['In icy Arctic water', 'On warm coral reefs'],
    correct: 0,
    source: 'https://www.aaas.org/news/greenland-sharks-are-longest-living-vertebrates',
    sourceName: 'AAAS, reporting the 2016 study in Science'
  },
  {
    id: 'zebra',
    name: 'Zebra shark',
    subtitle: 'Stripes that turn into spots',
    group: 'reef',
    aussie: true,
    pronounce: 'zeb-ruh shark',
    intro: 'Its babies have stripes, but the grown-ups have spots!',
    facts: [
      [
        'Stripes or spots?',
        'Baby zebra sharks are dark with pale stripes. As they grow, the stripes change into spots. In Australia, some people call it a leopard shark.'
      ],
      [
        'Where does it live?',
        'On warm coral reefs and sandy sea floors, including northern Australia.'
      ],
      [
        'What does it eat?',
        'Snails, shellfish, crabs and small fish. It wriggles its head into cracks to find them.'
      ],
      ['What is special about its tail?', 'Its tail is very long, about half as long as its whole body.']
    ],
    question: 'What pattern does a grown-up zebra shark have?',
    answers: ['Spots', 'Stripes'],
    correct: 0,
    source: 'https://australian.museum/learn/animals/fishes/zebra-shark-stegostoma-tigrinum/',
    sourceName: 'Australian Museum'
  }
];
// New sharks join the book once their photos are in (shark-photos.js).
const sharkPhotoSet = typeof sharkPhotoData !== 'undefined' ? sharkPhotoData : {};
sharkBook.push(...moreSharks.filter(s => sharkPhotoSet[s.id]?.length));
sharkBook.forEach(s => {
  const photos = sharkPhotoSet[s.id];
  if (photos?.length && s.group !== 'prehistoric') s.image = photos[0].file;
});
['whale', 'white', 'hammerhead', 'tiger', 'mako', 'epaulette'].forEach(id => {
  const s = sharkBook.find(x => x.id === id);
  if (s) s.aussie = true;
});
Object.assign(sharkNames, {
  portjackson: 'Heterodontus portusjacksoni',
  wobbegong: 'Orectolobus maculatus',
  greynurse: 'Carcharias taurus',
  bull: 'Carcharhinus leucas',
  blacktip: 'Carcharhinus melanopterus',
  thresher: 'Alopias vulpinus',
  greenland: 'Somniosus microcephalus',
  zebra: 'Stegostoma tigrinum'
});
Object.assign(bookReferences, {
  portjackson: 'Eyewitness Shark, p. 24 (crushing teeth); Sharks, bullhead sharks.',
  wobbegong: 'Eyewitness Shark (camouflage on the seabed); Sharks, carpet sharks.',
  greynurse: 'Eyewitness Shark (sand tiger); Sharks, mackerel sharks.',
  bull: 'Harvey, bull shark profile; Everything You Need to Know About Sharks.',
  blacktip: 'Everything You Need to Know About Sharks, blacktip reef fact file.',
  thresher: 'Eyewitness Shark (thresher’s tail); Sharks, mackerel sharks.',
  greenland: 'Everything You Need to Know About Sharks, Greenland shark fact file.',
  zebra: 'Sharks, carpet sharks; Eyewitness Shark.'
});
Object.assign(scienceDepth, {
  portjackson: [
    'Teeth tell us about food',
    'Sharp teeth grab, and flat teeth crush. A Port Jackson has both kinds, so scientists can guess it eats animals with hard shells.',
    'Which teeth crush hard shells?',
    ['Flat teeth at the back', 'Long, thin teeth']
  ],
  wobbegong: [
    'Camouflage detective',
    'Camouflage means looking like the things around you. A still, blotchy wobbegong on a weedy reef is very hard to see.',
    'Why does a wobbegong’s pattern help it?',
    ['It blends in with the reef', 'It makes it swim faster']
  ],
  greynurse: [
    'Floating like a balloon',
    'Air is lighter than water. By keeping a gulp of air inside, a grey nurse shark can float in one spot without swimming hard.',
    'Why does a gulp of air help it float?',
    ['Air is lighter than water', 'Air is heavier than water']
  ],
  bull: [
    'Salty or fresh?',
    'Most sharks can only live in salty water. Bull sharks have special body parts that help them cope when the water is fresh.',
    'Can most sharks live in rivers?',
    ['No, only a few can', 'Yes, all of them can']
  ],
  blacktip: [
    'Safe nurseries',
    'Shallow water is a safe place for baby sharks. Big hunters cannot swim in water that shallow.',
    'Why do baby blacktips stay in shallow water?',
    ['To stay safe from big animals', 'Because the water is colder']
  ],
  thresher: [
    'Tools for hunting',
    'Animals use their bodies as tools. A thresher’s long tail works like a whip to stun fish.',
    'Which body part does a thresher use to hunt?',
    ['Its long tail', 'Its tiny eyes']
  ],
  greenland: [
    'Living slowly',
    'Very cold water makes the Greenland shark’s body work slowly. It grows slowly, swims slowly, and lives a very long time.',
    'What does icy water do to a Greenland shark’s body?',
    ['Makes it work slowly', 'Makes it work very fast']
  ],
  zebra: [
    'Animals change as they grow',
    'Many animals look different when they are young. A zebra shark’s stripes slowly change into spots.',
    'Does a zebra shark keep its stripes forever?',
    ['No, they change into spots', 'Yes, always stripes']
  ]
});
Object.assign(scienceInvestigations, {
  portjackson:
    'Look at a picture of your own teeth. Which ones are sharp, and which are flat? What job does each one do?',
  wobbegong:
    'Hide a toy on a patterned rug and a plain floor. Where is it harder to find? Why?',
  greynurse:
    'Put a blown-up balloon and a stone in a tub of water. Which floats? What is inside the balloon?',
  bull: 'Taste a tiny bit of salty water and plain water. How could you tell them apart without tasting?',
  blacktip: 'Draw a beach. Where is the water shallow? Where would a baby shark feel safest?',
  thresher: 'Which of your body parts are tools? What jobs do your hands and feet do?',
  greenland: 'Put an ice cube and a warm drink side by side. What does cold do to things?',
  zebra: 'Find a photo of you as a baby. What has changed as you have grown?'
});

// Australian sharks: a filter on the full list and a tab on Gizmo's shelf (ocean-experience.js).
bookGroups.splice(1, 0, ['aussie', 'Australian sharks']);

/* ---------- Photos ---------- */
// Each shark: up to three licensed photos. The first is the big picture.
// Megalodon keeps its labelled illustration first, then real fossil photos.
const megalodonArt = {
  file: 'visual-megalodon.jpg',
  credit: 'Illustration made for this app; exact appearance unknown',
  page: '#',
  license: 'illustration',
  alt: 'An artist’s imagined megalodon'
};
function photosFor(s) {
  const set = sharkPhotoSet[s.id];
  if (s.group === 'prehistoric') return [megalodonArt, ...(set || [])];
  if (set?.length) return set;
  return s.image ? [{ file: s.image, credit: s.credit, page: s.photoSource, license: s.license }] : [];
}
function licenceText(p) {
  if (p.license === 'illustration') return 'Illustration';
  if (!p.license || p.license === 'public' || /public domain|^pd/i.test(p.license)) return 'Public domain';
  if (/^[0-9.]+$/.test(p.license)) return 'CC BY-SA ' + p.license;
  return p.license;
}
function licenceLink(p) {
  const m = licenceText(p).match(/^CC (BY(?:-SA)?) ([0-9.]+)/);
  return m ? `https://creativecommons.org/licenses/${m[1].toLowerCase()}/${m[2]}/` : null;
}

/* ---------- Reading everything aloud ---------- */
function gizmoRead(text, options = {}) {
  speak(text, { ...options, speaker: 'gizmo' });
}
// "What does it eat?" + "Fish…" reads as two sentences, so each matches a recorded clip.
function joinHeading(heading, body) {
  heading = heading.trim();
  if (!heading) return body;
  return heading + (/[.!?]$/.test(heading) ? ' ' : '. ') + body;
}
narratePanel = function (panel) {
  if (!panel) return;
  const heading = panel.querySelector('h1,h2,strong')?.textContent || '';
  const body = panel.querySelector('p')?.textContent || '';
  const choices = panel.matches('.shark-question')
    ? [...panel.querySelectorAll('[data-book-answer]')]
        .map(b => (b.getAttribute('aria-label') || b.textContent).trim() + '.')
        .join(' ')
    : '';
  const text = joinHeading(heading, choices || body);
  if (text.trim()) setSpeakingPanel(panel, text);
};
// iPads have no hover, so a tap on any card reads it.
function tapToHear(panel, read) {
  if (!panel || panel.dataset.tapToHear) return;
  panel.dataset.tapToHear = '1';
  panel.classList.add('tap-to-hear');
  panel.addEventListener('click', e => {
    if (e.target.closest('button,a,input,summary')) return;
    read();
  });
}

const preMoreSharkArticle = sharkArticle;
sharkArticle = function (s) {
  preMoreSharkArticle(s);
  const article = app.querySelector('.shark-article');
  if (!article) return;
  const photos = photosFor(s);
  const hero = article.querySelector('.article-hero');
  if (photos.length && hero) {
    hero.querySelector(':scope > img, :scope > .mega-illustration')?.remove();
    hero.insertAdjacentHTML(
      'afterbegin',
      `<div class="shark-gallery" data-count="${photos.length}">${photos.map((p, i) => `<button class="gallery-photo${i === 0 ? ' main' : ''}" data-photo="${i}" aria-label="Look closer at photo ${i + 1} of the ${s.name.toLowerCase()}"><span class="gallery-fill" style="background-image:url('assets/${p.file}')"></span><img src="assets/${p.file}" alt="${p.alt || 'A real ' + s.name.toLowerCase()}" ${i ? 'loading="lazy"' : ''}>${p.license === 'illustration' ? '<em class="gallery-label">Illustration</em>' : ''}</button>`).join('')}</div>`
    );
    hero.classList.add('has-gallery');
    article.querySelectorAll('[data-photo]').forEach(
      b =>
        (b.onclick = () => {
          const p = photos[+b.dataset.photo];
          openPhotoViewer(p, s);
          if (p.say) gizmoRead(p.say);
        })
    );
    const credits = article.querySelector('.science-sources');
    if (credits)
      credits.lastElementChild.innerHTML =
        photos
          .map(p => {
            const link = licenceLink(p);
            if (p.license === 'illustration') return 'Picture 1: an illustration made for this app. Megalodon is extinct, so nobody knows exactly how it looked.';
            return `Photo: ${p.credit}. <a href="${p.page}" target="_blank" rel="noopener">Original and licence</a>. ${link ? `<a href="${link}" target="_blank" rel="noopener">${licenceText(p)}</a>` : licenceText(p)}.`;
          })
          .join('<br>') + ' Resized and cropped for this app.';
  }
  tapToHear(article.querySelector('.article-title'), () =>
    setSpeakingPanel(article.querySelector('.article-title'), s.name + '. ' + s.intro)
  );
  article
    .querySelectorAll('.fact-grid > section, .shark-question, .deep-science')
    .forEach(panel => tapToHear(panel, () => narratePanel(panel)));
};
function openPhotoViewer(p, s) {
  const viewer = document.createElement('div');
  viewer.className = 'photo-viewer';
  viewer.innerHTML = `<button class="photo-viewer-close" aria-label="Close the photo">✕</button><img src="assets/${p.file}" alt="${p.alt || 'A real ' + s.name.toLowerCase()}"><p>${p.caption || s.name}</p>`;
  viewer.onclick = () => viewer.remove();
  document.body.append(viewer);
  window.addEventListener('hashchange', () => viewer.remove(), { once: true });
}

const preMoreTopicPage = oceanTopicPage;
oceanTopicPage = function (id) {
  preMoreTopicPage(id);
  const t = oceanTopics.find(t => t.id === id);
  const page = app.querySelector('.school-page');
  if (!t || !page) return;
  const heading = page.querySelector('.school-heading'),
    activity = page.querySelector('.school-activity'),
    more = page.querySelector('.deep-science');
  tapToHear(heading, () => setSpeakingPanel(heading, t.title + '. ' + t.text));
  tapToHear(activity, () => setSpeakingPanel(activity, 'Try this, Haytham. ' + t.activity));
  tapToHear(more, () => setSpeakingPanel(more, t.more));
  tapToHear(page.querySelector('.shark-question'), () => narratePanel(page.querySelector('.shark-question')));
  $('#readTopic').onclick = () => setSpeakingPanel(heading, t.title + '. ' + t.text);
  $('#readMore').onclick = () => setSpeakingPanel(more, t.more);
  $('#readActivity').onclick = () => setSpeakingPanel(activity, 'Try this, Haytham. ' + t.activity);
  // Read the whole explanation as the page opens, not just its title.
  setSpeakingPanel(heading, t.title + '. ' + t.text);
};
if (document.body.dataset.route === 'museum') render();
