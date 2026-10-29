const stories = [
  {
    id: 'halloween',
    title: 'Milo and the Pumpkin Glow',
    theme: 'A gentle Halloween adventure',
    icon: 'pumpkin',
    pages: [
      [
        'Milo sees a light.',
        'It glows beside the reef.',
        'Tonight is Halloween, and a little orange light is bobbing beside the quiet reef.'
      ],
      [
        '“Come, Haytham!” says Milo.',
        '“Let us look at the light.”',
        'Milo swishes his tail. “Come, Haytham! Let’s find out where that lovely light is coming from.”'
      ],
      [
        'A crab has a big hat.',
        'The hat has a bat on it.',
        'A little crab peeps out from behind a rock. It is wearing a purple hat with a paper bat on top.'
      ],
      [
        '“Is it a ghost?” asks the crab.',
        '“I can see it glow!”',
        '“Is it a sea ghost?” whispers the crab. Milo smiles. “Let’s look carefully before we decide.”'
      ],
      [
        'Milo looks in the sand.',
        'He sees a shell by a rock.',
        'Haytham follows the glow to a smooth shell beside a rock. Inside it sits a tiny waterproof lantern.'
      ],
      [
        'It is a lamp!',
        'The lamp is in a shell.',
        'The lantern has a pumpkin face on its cover. Its warm light shines through two round eyes and a crooked smile.'
      ],
      [
        '“No ghost!” says Milo.',
        '“It is a fun lamp!”',
        '“We solved the mystery!” says Milo. “It wasn’t a ghost at all. It was our friend’s Halloween lantern.”'
      ],
      [
        'The crab can hop.',
        'Milo and Haytham grin.',
        'The crab does a happy little dance. Milo, Haytham and the reef friends share a cheerful Halloween parade.'
      ]
    ],
    question: 'What made the orange light?',
    answers: ['A lamp in a shell', 'A real ghost'],
    correct: 0
  },
  {
    id: 'rescue',
    title: 'Milo and the Little Fin',
    theme: 'A story about helping a friend',
    icon: 'fish',
    pages: [
      [
        'Milo sees a fish.',
        'The fish is by a net.',
        'Milo is exploring the reef when he notices a small fish beside an old fishing net.'
      ],
      [
        'The fish is stuck.',
        'It cannot swim away.',
        'One corner of the net has caught around a rock. The little fish cannot find a clear way out.'
      ],
      [
        '“I can help,” says Milo.',
        '“Let us lift the net.”',
        '“Let’s think together,” says Milo. Haytham points to a loose edge that can be lifted away from the rock.'
      ],
      [
        'Up goes the net.',
        'The fish can swim out.',
        'Milo gently lifts the loose edge. A space opens up, and the little fish slips through into the open water.'
      ],
      [
        'The fish is free.',
        '“Thank you!” says the fish.',
        'The fish circles back to wave its tiny fin. Milo smiles. Thinking carefully and helping together made a difference.'
      ],
      [
        'Milo and Haytham grin.',
        'It is good to help a friend.',
        'Milo and Haytham carry on exploring. They have made a new friend and helped keep the reef a little safer.'
      ]
    ],
    question: 'Why did Milo lift the net?',
    answers: ['To help the fish', 'To take a nap'],
    correct: 0
  }
];
let storyPage = 0,
  storyPlaying = false,
  storyRun = 0,
  storyHelped = false;
function stopStory() {
  storyRun++;
  storyPlaying = false;
  stopSpeech();
  const b = $('#storyRead');
  if (b) b.innerHTML = paintedIcon('speaker-blue') + ' Read together';
  document.querySelectorAll('.story-word').forEach(w => w.classList.remove('spoken-word'));
}
function storyText(s, index) {
  const stage = stageFor('reading'),
    p = s.pages[index];
  return stage === 1
    ? p[0]
    : stage === 2
      ? p[0] + ' ' + p[1]
      : p[2] +
        ' ' +
        (index < s.pages.length - 1
          ? s.pages[index + 1][1]
          : 'What a wonderful day to be an ocean explorer.');
}
function storiesPage() {
  const id = location.hash.split('/')[1],
    s = stories.find(x => x.id === id);
  if (s) {
    storyReader(s);
    return;
  }
  app.innerHTML = `<section class="story-library"><span class="tag">READ WITH WILLA & MILO</span><h1>A sea of stories.</h1><p>Little adventures, one page at a time. Willa helps you read. Milo stays with you.</p><span class="book-progress">${stageDescription('reading')} · stories grow with your reading</span><div class="story-cards">${stories.map(s => `<a class="story-card ${s.id}" href="#stories/${s.id}"><div class="story-cover"><span>${paintedIcon(s.icon)}</span><span class="cover-shark">${miloActor()}</span></div><div class="species-copy"><span class="tag">${s.id === 'halloween' ? 'HALLOWEEN SPECIAL' : 'REEF READ-ALONG'}</span><h2>${s.title}</h2><p>${s.theme}</p><span class="explore-link">Read together <span>→</span></span></div></a>`).join('')}</div></section>`;
  storyPage = 0;
  storyHelped = false;
}
function storyReader(s) {
  storyPage = Math.min(storyPage, s.pages.length);
  const complete = storyPage === s.pages.length;
  if (complete) {
    storyEnding(s);
    return;
  }
  const text = storyText(s, storyPage);
  app.innerHTML = `<section class="story-reader"><div class="article-top"><a class="back-link" href="#stories">← All stories</a><small>PAGE ${storyPage + 1} OF ${s.pages.length}</small></div><span class="tag">${s.title}</span><div class="story-stage ${s.id}"><span class="story-prop" aria-hidden="true">${s.id === 'halloween' ? (storyPage < 4 ? paintedIcon('pumpkin') : paintedIcon('shell')) : paintedIcon('fish')}</span><div class="story-milo">${miloActor()}</div><span class="story-bubbles" aria-hidden="true">◦ · ◦</span></div><p class="story-text" id="storyText">${text
    .split(/(\s+)/)
    .map((word, i) =>
      /^\s+$/.test(word)
        ? word
        : `<button class="story-word" data-word="${i}" data-offset="${text.split(/(\s+)/).slice(0, i).join('').length}">${word}</button>`
    )
    .join(
      ''
    )}</p><div class="story-actions"><button class="quiet" id="storyPrevious" ${storyPage === 0 ? 'disabled' : ''}>← Back</button><button class="primary" id="storyRead">${paintedIcon('speaker-blue')} Read together</button><button class="quiet" id="storyNext">${storyPage === s.pages.length - 1 ? 'Finish story' : 'Next page'} →</button></div><p class="muted" id="storyReadStatus" aria-live="polite">Tap any word to hear it. Listen once, then have a go yourself.</p><div class="track"><div style="width:${((storyPage + 1) / s.pages.length) * 100}%"></div></div></section>`;
  $('#storyPrevious').onclick = () => {
    stopStory();
    storyPage--;
    storyReader(s);
  };
  $('#storyNext').onclick = () => {
    stopStory();
    storyPage++;
    storyReader(s);
  };
  $('#storyRead').onclick = () => {
    if (storyPlaying) {
      stopStory();
      return;
    }
    readStoryPassage(text);
  };
  document.querySelectorAll('[data-word]').forEach(
    b =>
      (b.onclick = () => {
        stopStory();
        document.querySelectorAll('.story-word').forEach(w => w.classList.remove('spoken-word'));
        b.classList.add('spoken-word');
        helperSpeak(b.textContent, {
          end: () => b.classList.remove('spoken-word'),
          unavailable: () => {
            $('#storyReadStatus').textContent = 'Turn Voice on to hear Willa read.';
          }
        });
      })
  );
  updateMilo('Let’s read this page together. Tap a word if you want to hear it.');
}
function readStoryPassage(text) {
  storyPlaying = true;
  const run = ++storyRun;
  $('#storyRead').textContent = 'Ⅱ Stop reading';
  const words = [...document.querySelectorAll('[data-offset]')];
  const sentences = [...text.matchAll(/[^.!?]+[.!?]?/g)].filter(m => m[0].trim());
  let index = 0;
  function readNext() {
    if (run !== storyRun || !$('#storyText')) return;
    if (index >= sentences.length) {
      storyPlaying = false;
      $('#storyRead').innerHTML = paintedIcon('speaker-blue') + ' Read together';
      words.forEach(w => w.classList.remove('spoken-word'));
      $('#storyReadStatus').textContent = 'Your turn! Try reading the page aloud.';
      return;
    }
    const sentence = sentences[index],
      start = sentence.index,
      end = start + sentence[0].length;
    helperSpeak(sentence[0], {
      start: () => {
        words.forEach(w =>
          w.classList.toggle('spoken-word', +w.dataset.offset >= start && +w.dataset.offset < end)
        );
        $('#storyReadStatus').textContent =
          'Follow the highlighted sentence. Word highlighting is available when your device supports it.';
      },
      boundary: offset => {
        const position = start + offset;
        let current = words.filter(w => +w.dataset.offset <= position).at(-1);
        if (current) words.forEach(w => w.classList.toggle('spoken-word', w === current));
      },
      end: () => {
        index++;
        readNext();
      },
      unavailable: () => {
        storyPlaying = false;
        if ($('#storyRead')) $('#storyRead').innerHTML = paintedIcon('speaker-blue') + ' Read together';
        if ($('#storyReadStatus'))
          $('#storyReadStatus').textContent =
            'Turn Voice on, or try a different narrator in Parents. You can still read together.';
      }
    });
  }
  readNext();
}
function storyEnding(s) {
  app.innerHTML = `<section class="story-ending game-panel"><span class="reward">${paintedIcon(s.icon)}</span><span class="tag">YOU REACHED THE END</span><h1>One little question.</h1><h2>${s.question}</h2><div class="choices">${s.answers.map((a, i) => `<button data-story-answer="${i}">${a}</button>`).join('')}</div><p id="storyFeedback" aria-live="polite">Think back to what happened.</p><a href="#stories" class="back-link">Choose another story →</a></section>`;
  updateMilo('You finished the story! Let’s think about what happened.');
  document.querySelectorAll('[data-story-answer]').forEach(
    b =>
      (b.onclick = () => {
        if (+b.dataset.storyAnswer !== s.correct) {
          storyHelped = true;
          $('#storyFeedback').textContent = 'Let’s think back. We can read it again together.';
          encourage('Good try. We can read it again together.', 'retry');
          return;
        }
        state.storyCompletions = state.storyCompletions || [];
        const key = s.id + '-' + stageFor('reading');
        const fresh = !state.storyCompletions.includes(key);
        if (fresh) {
          state.storyCompletions.push(key);
          state.xp += PEARLS.extra;
          state.history.push({
            type: 'story',
            skill: 'Story comprehension',
            independent: !storyHelped,
            session: 'story-' + s.id + '-' + Date.now(),
            at: new Date().toISOString()
          });
          save();
        }
        $('#storyFeedback').textContent = fresh
          ? 'You remembered! Pearls earned.'
          : 'You remembered the story. Lovely reading!';
        document.querySelectorAll('[data-story-answer]').forEach(b => (b.disabled = true));
        encourage('You remembered, Haytham! I loved reading this story with you.');
      })
  );
}
