const stageLabels = {
  reading: ['Little words', 'Growing sentences', 'Story explorer'],
  maths: ['Numbers to 10', 'Numbers to 20', 'Numbers to 50'],
  writing: ['Guided letters', 'Independent letters', 'Words and names'],
  science: ['Shark discoveries', 'Shark scientist', 'Ocean investigator']
};
function learningState() {
  state.learning = state.learning || {};
  for (const type of Object.keys(stageLabels))
    state.learning[type] = state.learning[type] || { stage: 1, baseline: 0 };
  return state.learning;
}
function stageFor(type) {
  return Math.min(3, Math.max(1, Number(learningState()[type].stage) || 1));
}
function advanceLearning(type) {
  const progress = learningState()[type];
  if (!progress || progress.stage >= 3) return false;
  let ready = false,
    records;
  if (type === 'reading' || type === 'maths') {
    records = state.history.filter(x => x.type === type);
    const recent = records.slice(progress.baseline);
    ready =
      recent.length >= 15 &&
      recent.slice(-15).filter(x => x.independent).length >= 12 &&
      new Set(recent.slice(-15).map(x => x.session)).size >= 3;
  } else if (type === 'science') {
    records = state.scienceHistory || [];
    const recent = records.slice(progress.baseline);
    ready =
      recent.length >= 5 &&
      recent.filter(x => x.independent).length >= 4 &&
      new Set(recent.map(x => x.shark)).size >= 4;
  } else {
    records = state.writingHistory || [];
    const recent = records.slice(progress.baseline);
    ready =
      recent.length >= 8 &&
      new Set(recent.map(x => x.character)).size >= 4 &&
      (progress.stage === 1 || recent.filter(x => x.mode === 'free').length >= 4);
  }
  if (ready) {
    progress.stage++;
    progress.baseline = records.length;
    save();
    return true;
  }
  return false;
}
function stageDescription(type) {
  return stageLabels[type][stageFor(type) - 1];
}
function learningControls() {
  return `<h3>Learning that grows with Haytham</h3><p class="muted">Reading and maths advance after 15 new answers across at least three adventures, with at least 12 solved independently. Hints and retries count as helped. The first maths stage also practises all four new adventure types before advancing. Each stage needs new evidence. Writing advances on practice variety, not handwriting accuracy. Science advances through independent discoveries across different sharks.</p>${Object.keys(
    stageLabels
  )
    .map(
      type =>
        `<label>${type[0].toUpperCase() + type.slice(1)} <select data-learning-stage="${type}">${stageLabels[type].map((name, i) => `<option value="${i + 1}" ${stageFor(type) === i + 1 ? 'selected' : ''}>${i + 1} · ${name}</option>`).join('')}</select></label>`
    )
    .join('')}`;
}
function bindLearningControls() {
  document.querySelectorAll('[data-learning-stage]').forEach(
    select =>
      (select.onchange = () => {
        const type = select.dataset.learningStage;
        learningState()[type] = {
          stage: Number(select.value),
          baseline:
            type === 'writing'
              ? (state.writingHistory || []).length
              : type === 'science'
                ? (state.scienceHistory || []).length
                : state.history.filter(x => x.type === type).length
        };
        if (type === 'maths') state.range = [10, 20, 50][Number(select.value) - 1];
        save();
      })
  );
}
const growingWords = [
  ['ship', 'sh · i · p', 'ship', 'shop', 'shed'],
  ['fish', 'f · i · sh', 'fish', 'wish', 'dish'],
  ['shell', 'sh · e · ll', 'shell', 'shelf', 'ship'],
  ['The shark can see a fish.', 'What can the shark see?', 'fish', 'cat', 'net'],
  ['Milo has a long tail.', 'What is long?', 'tail', 'fin', 'nose'],
  [
    'The fish swim past the reef.',
    'Where do the fish swim?',
    'past the reef',
    'in a tree',
    'on the sand'
  ],
  ['A crab sits on the rock.', 'Where is the crab?', 'rock', 'bed', 'ship'],
  ['The boat is on the sea.', 'Where is the boat?', 'sea', 'road', 'sky']
];
const explorerReading = [
  [
    'Milo sees a net. A small fish is stuck. Milo lifts the net, and the fish swims away.',
    'Why does Milo lift the net?',
    'To help the fish',
    'To go to sleep',
    'To find a shell'
  ],
  [
    'The reef is dark. Haytham spots a tiny light. It is a glowing lantern, hanging by a cave.',
    'What is making the light?',
    'A lantern',
    'The sun',
    'A shell'
  ],
  [
    'A shark moves its tail from side to side. Its fins help it steer and stay balanced.',
    'What helps the shark steer?',
    'Its fins',
    'Its teeth',
    'Its eyes'
  ],
  [
    'Milo finds a tooth in the sand. It is hard and very old. He takes it to the fossil museum.',
    'Where does Milo take the tooth?',
    'The fossil museum',
    'His lunch box',
    'A tree'
  ]
];
const scienceDepth = {
  megalodon: [
    'Fossil detective',
    'A tooth is evidence from the past. Scientists compare fossil teeth with living sharks. Fossils give us clues, but they do not tell us the exact colour of a megalodon.',
    'Can a fossil tooth tell us the exact colour of a megalodon?',
    ['No, some details remain unknown', 'Yes, it shows every colour']
  ],
  whale: [
    'Filter-feeding scientist',
    'A whale shark takes water into its mouth and filters out food. Its enormous body can be fuelled by very small animals. Body size does not tell us the size of an animal’s food.',
    'Does a huge shark always eat huge animals?',
    ['No, whale sharks filter small food', 'Yes, all huge sharks do']
  ],
  white: [
    'Camouflage investigator',
    'A darker back can blend into deeper water when seen from above. A pale belly can blend into brighter water when seen from below. This two-colour camouflage is called countershading.',
    'What does countershading help a shark do?',
    ['Blend into its surroundings', 'Grow extra teeth']
  ],
  hammerhead: [
    'Sense detective',
    'Sharks have tiny sensors that detect weak electrical signals from other animals. A hammerhead’s wide head spreads these sensors across a broad area as it searches.',
    'What do these special sensors detect?',
    ['Weak electrical signals', 'Written words']
  ],
  tiger: [
    'Ocean food-web explorer',
    'Tiger sharks eat many kinds of animals. In a food web, animals are connected through what they eat. A change in one part of that web can affect other animals too.',
    'What connects animals in a food web?',
    ['What they eat', 'The letters in their names']
  ]
};
Object.assign(scienceDepth, {
  goblin: [
    'Deep-sea detective',
    'A goblin shark’s jaws can move forwards to reach prey. Its long snout carries sensors. Body parts can help animals find food in places with little light.',
    'Which body parts help a goblin shark find and catch prey?',
    ['Its sensing snout and moving jaws', 'Feathers and wings']
  ],
  mako: [
    'Swimming scientist',
    'A streamlined body reduces resistance as an animal moves through water. A mako’s strong crescent-shaped tail provides thrust. Its body and tail work together.',
    'Why does a streamlined body help a mako?',
    ['It reduces resistance in water', 'It makes the shark invisible']
  ],
  basking: [
    'Small-food investigator',
    'Gill rakers help a basking shark filter tiny animals from water. An enormous body can get energy from many very small meals. Look at its mouth without assuming it hunts large prey.',
    'What helps a basking shark collect tiny food?',
    ['Gill rakers', 'A long sticky tongue']
  ],
  epaulette: [
    'Reef explorer',
    'An epaulette shark bends its body and uses paired fins to clamber over the bottom. These movements help it explore shallow reef habitats. Different sharks move in different ways.',
    'What does an epaulette shark use to clamber along the bottom?',
    ['Its paired fins and bending body', 'Two legs hidden in its tail']
  ]
});
function deeperScience(s) {
  if (stageFor('science') === 1) return '';
  const d = scienceDepth[s.id];
  return `<section class="deep-science"><span class="tag">${stageFor('science') === 3 ? 'OCEAN INVESTIGATOR' : 'SHARK SCIENTIST'}</span><h2>${d[0]}</h2><p>${d[1]}</p>${stageFor('science') === 3 ? `<p><strong>Think like a scientist:</strong> ${scienceInvestigations[s.id]}</p>` : ''}<button id="deeperListen" class="listen">♫ Explore with Milo</button></section>`;
}
const scienceInvestigations = {
  megalodon:
    'A tooth gives us evidence about feeding. Would it be enough to draw the whole shark accurately? What other fossils would help?',
  whale:
    'Compare a whale shark and a great white. Both are large, but do they get food in the same way?',
  white:
    'Imagine viewing a shark from above, then from below. How might the two colours change what you can see?',
  hammerhead:
    'How could you test whether a broad head helps search a wider patch of sand? Describe a fair comparison.',
  tiger:
    'Imagine fewer turtles in one area. What questions would you ask about the other animals connected to them?',
  goblin:
    'Deep-sea sharks are hard to observe. How could a camera help us learn more without bringing a shark to the surface?',
  mako: 'Imagine two shapes moving through water. How could you compare which shape moves with less resistance?',
  basking:
    'A very big mouth does not prove an animal eats big prey. What evidence would you look for?',
  epaulette:
    'Compare a mako’s tail and an epaulette shark’s paired fins. How do their movements suit different homes?'
};
