// Original educational text. Book and primary-source references: research/ENCYCLOPEDIA-SOURCES.md.
const schoolSource = 'https://ocean.si.edu/ocean-life/sharks-rays/sharks';
const oceanTopics = [
  {
    id: 'body',
    title: 'Built to swim',
    desc: 'Fins, tails and bendy skeletons.',
    icon: 'body',
    text: 'A shark is a fish. Inside its body is a skeleton made of cartilage. That is the bendy material in your nose. A shark moves its tail from side to side to push through the sea.',
    more: 'The fins have different jobs. Pectoral fins on the sides help with steering and lift. Dorsal fins on the back help keep the shark steady. Sharks have no swim bladder; an oily liver helps with buoyancy.',
    activity:
      'Find the tail and the fin on a shark photo. Move your hand side to side like its tail.',
    question: 'Which way does a shark move its tail?',
    answers: ['Side to side', 'Up and down like a whale'],
    deepQuestion: 'What is a shark’s skeleton made of?',
    deepAnswers: ['Cartilage', 'The same hard bone as yours'],
    books: 'Eyewitness Shark, pp. 14–17, 26–27'
  },
  {
    id: 'gills',
    title: 'Breathe underwater',
    desc: 'Follow the water past the gills.',
    icon: 'gills',
    text: 'Sharks need oxygen, just like you. Their gills take oxygen out of water. Water goes in through the mouth and flows over the gills, then out through the gill slits.',
    more: 'Some sharks must keep swimming to move enough water over their gills. Others can pump water while resting. Most sharks have five pairs of gill slits, but some have six or seven.',
    activity: 'Look behind a shark’s head. Can you spot the gill slits?',
    question: 'What helps a shark get oxygen from water?',
    answers: ['Gills', 'A snorkel'],
    deepQuestion: 'Must every shark keep swimming to breathe?',
    deepAnswers: ['No, some can pump water while resting', 'Yes, every kind must'],
    books: 'Sharks, pp. 28–31; Eyewitness Shark, pp. 14–17'
  },
  {
    id: 'teeth',
    title: 'A changing smile',
    desc: 'New teeth move into place.',
    icon: 'teeth',
    text: 'Sharks lose teeth and grow replacements. New teeth wait in rows behind the front ones. Shark teeth come in different shapes for different meals.',
    more: 'Pointed teeth can grip slippery prey. Serrated edges help cut. Some bottom-feeding sharks have flatter teeth for crushing shells. Whale sharks have tiny teeth, but filter their food from the water.',
    activity: 'Draw a pointy tooth and a flat tooth. Which might help crush a shell?',
    question: 'What can replace a lost shark tooth?',
    answers: ['Another tooth from a row behind', 'A seashell'],
    deepQuestion: 'Why do sharks have different tooth shapes?',
    deepAnswers: ['They eat different kinds of food', 'Every shark eats the same food'],
    books: 'Eyewitness Shark, pp. 24–25; Sharks, pp. 38–42'
  },
  {
    id: 'skin',
    title: 'A coat of tiny teeth',
    desc: 'Meet the denticles.',
    icon: 'skin',
    text: 'Shark skin is covered in tiny scales called denticles. They are a bit like little teeth. The skin can feel rough, rather like sandpaper.',
    more: 'Denticles protect the skin and can help control water flowing over the body. Their shapes differ between sharks and between parts of one shark. “Dermal denticle” means a little skin tooth.',
    activity:
      'Look at sandpaper with a grown-up. Imagine thousands of tiny scales. We never need to touch a wild shark to learn about its skin.',
    question: 'What covers a shark’s skin?',
    answers: ['Tiny scales called denticles', 'Fluffy fur'],
    deepQuestion: 'Do all shark denticles have exactly the same shape?',
    deepAnswers: ['No, their shapes can differ', 'Yes, they are all identical'],
    books: 'Eyewitness Shark, pp. 14–17'
  },
  {
    id: 'senses',
    title: 'Ocean detectives',
    desc: 'Smells, sounds and ripples.',
    icon: 'senses',
    text: 'Sharks use their eyes, ears and noses to explore. Their nostrils are for smelling, not breathing. They can also feel nearby movements in the water.',
    more: 'A system called the lateral line runs along each side of the body. It detects water movements and vibrations. Sharks’ ears are inside their heads. No one sense does every job.',
    activity:
      'Gently make a ripple in a bowl of water. Watch it travel. A shark’s lateral line can sense water moving.',
    question: 'What are a shark’s nostrils for?',
    answers: ['Smelling', 'Breathing air'],
    deepQuestion: 'What does the lateral line detect?',
    deepAnswers: ['Water movements and vibrations', 'Words written on paper'],
    books: 'Eyewitness Shark, pp. 18–19; Sharks, pp. 44–47'
  },
  {
    id: 'electric',
    title: 'A secret sense',
    desc: 'Tiny signals from living things.',
    icon: 'electric',
    text: 'Animals make very weak electrical signals. Sharks have special sensors around their heads that can detect these signals close by. This can help them find hidden food.',
    more: 'The sensors are called ampullae of Lorenzini. Small pores connect to jelly-filled canals. A hammerhead’s broad head spreads its sensors over a wide area. This sense does not let a shark read minds!',
    activity:
      'Find the hammerhead in our shark collection. Imagine sweeping that wide head over the sand.',
    question: 'What can these special sensors detect?',
    answers: ['Weak electrical signals', 'Someone’s thoughts'],
    deepQuestion: 'Why can a broad hammerhead help search the seabed?',
    deepAnswers: ['It spreads sensors over a wide area', 'It has a built-in torch'],
    books: 'Eyewitness Shark, pp. 18–19; Sharks, pp. 44–47'
  },
  {
    id: 'babies',
    title: 'Hello, little pup',
    desc: 'Eggs and live babies.',
    icon: 'babies',
    text: 'A baby shark is called a pup. Some sharks lay eggs in tough cases. Other sharks give birth to live pups. Different kinds of shark begin life in different ways.',
    more: 'An egg case protects the growing pup. The yolk provides food as it develops. Some live-bearing sharks also use yolk inside the mother; others have different ways of supplying food. A nursery is a place used by young sharks.',
    activity: 'Draw a pup and a safe nursery full of places to hide.',
    question: 'What is a baby shark called?',
    answers: ['A pup', 'A kitten'],
    deepQuestion: 'Do all sharks lay eggs on the seabed?',
    deepAnswers: ['No, some give birth to live pups', 'Yes, all sharks do'],
    books: 'Eyewitness Shark, pp. 20–23; Sharks, pp. 32–35'
  },
  {
    id: 'food',
    title: 'What’s for dinner?',
    desc: 'Tiny meals and big hunters.',
    icon: 'food',
    text: 'Different sharks eat different food. Some catch fish or squid. Others eat crabs or shellfish. Whale sharks and basking sharks filter small food from the water.',
    more: 'Animals are linked by what they eat. These links form a food web. Sharks can be predators, and young sharks can also be prey. A change to one animal’s numbers can affect others in the web.',
    activity: 'Draw a fish and a shark. Add an arrow from the food to the animal that eats it.',
    question: 'Does every big shark eat big animals?',
    answers: ['No, some filter very small food', 'Yes, always'],
    deepQuestion: 'What connects animals in a food web?',
    deepAnswers: ['Who eats what', 'Their names'],
    books:
      'Eyewitness Shark, pp. 24–25; Everything You Need to Know About Sharks, shark facts section'
  },
  {
    id: 'homes',
    title: 'So many sea homes',
    desc: 'Reefs, open water and deep seas.',
    icon: 'homes',
    text: 'Sharks live in many ocean homes. Some explore coral reefs. Some travel through open water. Others, like the goblin shark, live far down in the sea.',
    more: 'A habitat provides the conditions an animal needs, including food and suitable water. Deep water has much less light than the surface. Sharks have different bodies and behaviours suited to different habitats.',
    activity: 'Choose a shark photo. Would you put it on a reef, in open water, or in the deep?',
    question: 'Where does a goblin shark usually live?',
    answers: ['Deep in the sea', 'In a tree'],
    deepQuestion: 'What is a habitat?',
    deepAnswers: ['The place and conditions where an animal lives', 'Only the animal’s food'],
    books: 'Sharks, shark groups and species profiles; Harvey, goblin shark, p. 117'
  },
  {
    id: 'journeys',
    title: 'Ocean journeys',
    desc: 'Follow a travelling shark.',
    icon: 'journeys',
    text: 'Some sharks travel a long way to find food or places to have pups. A regular journey between places is called migration. Not every kind of shark makes the same journey.',
    more: 'Scientists use tags to learn about sharks’ movements. Some tags send signals that help researchers work out where a shark has been. A track from one shark is a clue, not a map of every shark’s journey.',
    activity: 'Draw two sea homes. Trace a route between them with your finger.',
    question: 'What is migration?',
    answers: ['A journey between places', 'Growing a new tooth'],
    deepQuestion: 'Can one tagged shark show us what all sharks do?',
    deepAnswers: ['No, we need evidence from more sharks', 'Yes, all sharks take the same route'],
    books: 'Eyewitness Shark, p. 19; Sharks, pp. 50–53'
  },
  {
    id: 'fossils',
    title: 'Clues from long ago',
    desc: 'Megalodon’s fossil story.',
    icon: 'fossils',
    text: 'A fossil is a preserved clue from life long ago. Megalodon was a real shark, but it is extinct. Scientists study its fossil teeth and other remains to learn about it.',
    more: 'Teeth preserve more easily than a shark’s cartilage skeleton. Some megalodon vertebrae have also been found. Scientists compare remains and test ideas about its size and shape. They still debate its exact size and body shape.',
    activity:
      'Look at our megalodon illustration. Which parts are artistic guesses? Its exact colour is not known from its teeth.',
    question: 'Is megalodon alive today?',
    answers: ['No, it is extinct', 'Yes, it hides behind every reef'],
    deepQuestion: 'Can teeth tell us megalodon’s exact colour?',
    deepAnswers: ['No, that detail is unknown', 'Yes, every colour is preserved'],
    books: 'Eyewitness Shark, pp. 12–13; Sharks, pp. 8–9',
    source:
      'https://www.nhm.ac.uk/discover/megalodon--the-truth-about-the-largest-shark-that-ever-lived.html'
  },
  {
    id: 'care',
    title: 'Be an ocean helper',
    desc: 'Small actions for a big sea.',
    icon: 'care',
    text: 'Sharks belong in healthy oceans. They need clean water, food and safe places to grow. We can help by keeping rubbish out of the sea and caring for ocean homes.',
    more: 'Fishing can catch sharks on purpose or by accident. Habitat damage can remove places young sharks need. Scientists, communities and governments work on protecting sharks and managing fishing. Different sharks face different threats.',
    activity:
      'With a grown-up, sort rubbish into the right bins. At the beach, leave wildlife in its home and follow local safety advice.',
    question: 'Which action helps ocean animals?',
    answers: ['Keep rubbish out of the sea', 'Throw plastic into the water'],
    deepQuestion: 'Why do shark nursery habitats matter?',
    deepAnswers: ['Young sharks use them while growing', 'They are places for toy sharks only'],
    books: 'Sharks, pp. 54–55; Eyewitness Shark, conservation sections'
  }
];
const sharkWords = [
  ['Cartilage', 'The strong, bendy material that makes a shark’s skeleton.'],
  ['Gill', 'A body part that takes oxygen from water.'],
  ['Pup', 'A baby shark.'],
  ['Plankton', 'Living things that drift with water currents. Many are tiny.'],
  ['Denticle', 'A tiny tooth-like scale on shark skin.'],
  ['Habitat', 'The place and conditions where an animal lives.'],
  ['Fossil', 'A preserved remain or trace of life from long ago.'],
  ['Extinct', 'Having no living members left.'],
  ['Predator', 'An animal that catches and eats other animals.'],
  ['Migration', 'A journey between places, often at particular times of year.'],
  ['Camouflage', 'Colours, patterns or shapes that help something blend in.'],
  ['Evidence', 'Clues and observations we use to test an idea.']
];
