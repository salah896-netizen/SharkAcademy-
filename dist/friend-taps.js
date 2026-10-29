/* Friends answer every tap (25 October 2026). Haytham loves tapping his friends and the reef, and
 * was sad when nothing happened. Brought together from shark-taps.js, home-play.js and round 3's
 * feedback: each friend's trick and lines, the tappable home reef, Milo's whole corner, and the
 * picture badges under each friend. */

/* Shark taps (25 October 2026): Haytham loves tapping his friends, so every tap does something.
 *
 * - Each friend has a trick: Willa blows bubbles, Tiggy flips, Gizmo spins, Dash zooms, Milo twirls.
 * - Outside lessons, a tap gives a fun line: a joke, a true fact about their species or a cheer,
 *   never the same twice in a row.
 * - In lessons (play, writing, the starting check) a tap still gives encouragement and repeats
 *   the question, so help is always one tap away, now with the trick too.
 * - On the home reef, the first tap is a trick and a fun line, and a "Let's go!" bubble appears;
 *   tapping that friend again goes to their activity. The Play button is unchanged.
 * Facts here match the encyclopedia's sourced entries.
 */
const sharkTapLines = {
  milo: [
    'Hee hee, that tickles!',
    'Fin five, Haytham!',
    'My real cousin megalodon has a name that means big tooth!',
    'Whoosh! An ocean twirl, just for you!',
    'What do sharks put on toast? Jellyfish!',
    'Megalodon lived long, long ago. Scientists learn about it from fossil teeth.',
    'You’re my best ocean buddy!',
    'Why did the shark cross the reef? To get to the other tide!',
    'Chomp, chomp! Just kidding. I only eat pretend snacks.'
  ],
  willa: [
    'Hello, Haytham! Want to read with me?',
    'I’m a whale shark. I’m a fish, not a whale!',
    'I eat tiny plankton. Slurp!',
    'Look at my spots! Every whale shark has its own pattern.',
    'What’s a shark’s favourite story? Little Red Fishing Hood!',
    'Bubbles! Pop, pop, pop!',
    'Whale sharks are the biggest fish in the sea!',
    'You’re a super reader, Haytham!'
  ],
  tiggy: [
    'G’day, Haytham! Let’s count my stripes!',
    'Young tiger sharks have stripes, just like me!',
    'One, two, three, flip!',
    'Tiger sharks eat lots of different things, even turtles!',
    'What do sharks count with? Their fin-gers! Just joking, mate!',
    'You’re a number champion!',
    'Righto, watch this flip!',
    'Tiger sharks live in warm seas, including near Australia.'
  ],
  gizmo: [
    'Gizmo, reporting for science!',
    'My jaws can shoot forwards to catch food. Snap!',
    'I live deep, deep down, where it’s very dark.',
    'I look pink because you can see blood vessels through my skin!',
    'What do you call a shark who loves science? A fin-tastic scientist!',
    'Let’s discover something new!',
    'Hmm, curious! Very curious!',
    'My long, flat snout helps me find food.'
  ],
  dash: [
    'Zoom! I’m the speedy one!',
    'Makos are some of the fastest sharks in the sea!',
    'Watch me do a loop!',
    'Ready, steady, write!',
    'What’s a shark’s favourite letter? Sea!',
    'My pointed nose helps me slice through the water.',
    'Makos can leap right out of the water!',
    'High fin, Haytham!'
  ]
};
const sharkTricks = { milo: 'twirl', willa: 'bubbles', tiggy: 'flip', gizmo: 'spin', dash: 'zoom' };
const sharkTapIndex = {};
function nextSharkLine(key) {
  const lines = sharkTapLines[key] || sharkTapLines.milo;
  if (sharkTapIndex[key] === undefined) sharkTapIndex[key] = Math.floor(Math.random() * lines.length);
  return lines[sharkTapIndex[key]++ % lines.length];
}
function sharkTrick(element, key) {
  if (!element) return;
  const trick = sharkTricks[key] || 'twirl';
  element.classList.remove('trick-' + trick);
  void element.offsetWidth;
  element.classList.add('trick-' + trick);
  setTimeout(() => element.classList.remove('trick-' + trick), 1100);
  if (trick === 'bubbles') {
    const burst = document.createElement('span');
    burst.className = 'trick-bubble-burst';
    burst.setAttribute('aria-hidden', 'true');
    burst.innerHTML = Array.from({ length: 7 }, (_, i) => `<i style="--b:${i}"></i>`).join('');
    element.append(burst);
    setTimeout(() => burst.remove(), 1400);
  }
}
function inLessonNow() {
  return ['#play', '#writing', '#path/check'].includes(location.hash);
}
function sharkTapSay(key) {
  if (typeof setMiloMood === 'function' && key === 'milo') setMiloMood('happy', 2500);
  if (typeof reactCrew === 'function' && key !== 'milo') reactCrew('happy', key);
  speak(nextSharkLine(key), { speaker: key });
}

// Lessons keep encouragement + the question; everywhere else gets a fun line. Both get a trick.
const preTapGreetCrew = greetCrew,
  preTapTouchMilo = touchMilo;
greetCrew = function (key) {
  sharkTrick(document.querySelector(`#subjectHelper [data-crew-hello="${key}"]`), key);
  if (document.body.dataset.route === 'home' || inLessonNow() || !sharkTapLines[key])
    return preTapGreetCrew(key);
  sharkTapSay(key);
};
touchMilo = function () {
  sharkTrick(document.querySelector('#miloCompanion .companion-actor'), 'milo');
  if (document.body.dataset.route === 'home' || inLessonNow()) return preTapTouchMilo();
  sharkTapSay('milo');
};

// Home reef: first tap = trick + fun line + "Let's go!" bubble; tap again to start.
homeSteps.push(function bindFriendTaps() {
  document.querySelectorAll('[data-friend-route]').forEach(button => {
    const key = button.dataset.friendRoute,
      launch = button.onclick;
    button.onclick = () => {
      if (button.dataset.greetingHeld === 'true') {
        delete button.dataset.greetingHeld;
        return;
      }
      const awake = Number(button.dataset.awake || 0);
      if (Date.now() - awake < 8000) {
        delete button.dataset.awake;
        button.querySelector('.lets-go-bubble')?.remove();
        return launch?.();
      }
      document.querySelectorAll('[data-friend-route][data-awake]').forEach(other => {
        delete other.dataset.awake;
        other.querySelector('.lets-go-bubble')?.remove();
      });
      button.dataset.awake = String(Date.now());
      sharkTrick(button.querySelector('span'), key);
      sharkTapSay(key);
      if (!button.querySelector('.lets-go-bubble'))
        button.insertAdjacentHTML('beforeend', '<em class="lets-go-bubble" aria-hidden="true">Let’s go! ▶</em>');
      setTimeout(() => {
        if (Date.now() - Number(button.dataset.awake || 0) >= 8000) button.querySelector('.lets-go-bubble')?.remove();
      }, 8100);
    };
  });
});

/* Tappable home reef (25 October 2026). Haytham tapped the turtle and the far-away sharks and
 * was sad when nothing happened. Now everything on the reef answers a tap:
 * - the swimming tuna, clownfish and turtle do a trick, and Milo shares a true fact;
 * - the shark shapes in the distance swim up close to say hello;
 * - anywhere else in the water, a burst of bubbles and a little school of fish darts away.
 */
const reefCreatureLines = {
  tuna: [
    'Zoom! Tuna are some of the fastest fish in the sea.',
    'Tuna swim together in big groups called schools.',
    'A tuna keeps swimming all the time, even when it rests.'
  ],
  clownfish: [
    'Peekaboo, little clownfish!',
    'A clownfish lives safely in a sea anemone.',
    'Clownfish are orange with white stripes.'
  ],
  turtle: [
    'Wheee! A turtle twirl!',
    'Sea turtles swim up to the surface to breathe air.',
    'A sea turtle can’t pull its head into its shell like a tortoise can.'
  ],
  shark: [
    'A shark is swimming by! Hello, shark!',
    'Look! A shark in the distance.',
    'That shark is off exploring the reef.'
  ]
};
const reefCreatureTricks = { tuna: 'reef-zoom', clownfish: 'reef-peek', turtle: 'reef-flip' };
const reefLineIndex = {};
function reefLine(kind) {
  const lines = reefCreatureLines[kind];
  reefLineIndex[kind] = ((reefLineIndex[kind] ?? -1) + 1) % lines.length;
  return lines[reefLineIndex[kind]];
}
function reefBubbles(x, y, fish = true) {
  const burst = document.createElement('div');
  burst.className = 'reef-tap-burst';
  burst.style.left = x + 'px';
  burst.style.top = y + 'px';
  burst.setAttribute('aria-hidden', 'true');
  burst.innerHTML =
    Array.from({ length: 9 }, (_, i) => `<i style="--b:${i}"></i>`).join('') +
    (fish
      ? Array.from(
          { length: 5 },
          (_, i) =>
            `<b style="--f:${i}"><svg viewBox="0 0 40 20"><path d="M2 10Q12 0 26 6L38 1L34 10L38 19L26 14Q12 20 2 10Z" fill="currentColor"/></svg></b>`
        ).join('')
      : '');
  document.body.append(burst);
  setTimeout(() => burst.remove(), 1600);
}
function hitCreature(x, y) {
  const near = (el, pad = 16) => {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.width && x > r.left - pad && x < r.right + pad && y > r.top - pad && y < r.bottom + pad;
  };
  for (const el of document.querySelectorAll('.home-fish .sea-animal')) {
    const kind = ['tuna', 'clownfish', 'turtle'].find(k => el.classList.contains('animal-' + k));
    if (kind && near(el)) return { kind, el };
  }
  for (const el of document.querySelectorAll('#livingOcean .far-fish'))
    if (near(el, 30)) return { kind: 'shark', el };
  return null;
}
let reefTapBusy = 0;
document.addEventListener('pointerdown', e => {
  if (document.body.dataset.route !== 'home' || document.body.classList.contains('intro-running'))
    return;
  if (e.target.closest('button, a, input, [role=button], #oceanChrome, .shark-of-day, .lets-go-bubble'))
    return;
  const hit = hitCreature(e.clientX, e.clientY);
  if (!hit) {
    reefBubbles(e.clientX, e.clientY);
    return;
  }
  if (Date.now() - reefTapBusy < 700) return;
  reefTapBusy = Date.now();
  const trick = hit.kind === 'shark' ? 'reef-hello' : reefCreatureTricks[hit.kind];
  hit.el.classList.remove(trick);
  void hit.el.getBoundingClientRect();
  hit.el.classList.add(trick);
  setTimeout(() => hit.el.classList.remove(trick), hit.kind === 'shark' ? 3200 : 1400);
  reefBubbles(e.clientX, e.clientY, false);
  const line = reefLine(hit.kind);
  if (typeof setMiloMood === 'function') setMiloMood('happy', 3000);
  speak(line, { speaker: 'milo' });
});

/* Milo always answers a tap ("sometimes he doesn't do anything"). His button was smaller than
 * he looks, so taps on his tail, fins or speech bubble did nothing. Now his whole corner counts,
 * and every tap shows a trick straight away, even before he starts talking. */
let miloTapAt = 0;
document.addEventListener(
  'pointerup',
  e => {
    const corner = document.getElementById('miloCompanion');
    if (!corner || document.body.dataset.route === 'home') return;
    if (e.target.closest('#miloHelp, #finFive')) return;
    const r = corner.getBoundingClientRect();
    const inside =
      r.width && e.clientX > r.left - 10 && e.clientX < r.right + 10 && e.clientY > r.top - 10 && e.clientY < r.bottom + 10;
    if (!inside) return;
    if (Date.now() - miloTapAt < 250) return;
    miloTapAt = Date.now();
    e.preventDefault();
    touchMilo();
  },
  true
);
// The button's own click would make a second reaction; the corner handler above does it once.
document.addEventListener(
  'click',
  e => {
    if (e.target.closest('#miloCompanion .companion-actor') && Date.now() - miloTapAt < 400) {
      e.stopPropagation();
      e.preventDefault();
    }
  },
  true
);

/* What each friend is for, at a glance ("clear distinction at the bottom with each shark").
 * A picture badge sits under every friend on the home reef: abc reading, 123 maths, ▶ today's
 * adventure, a painted magnifier for science and sharks, a painted pencil for writing. The word underneath is for grown-ups. */
const friendBadges = {
  willa: ['abc', 'Reading', '#e7a24b'],
  tiggy: ['123', 'Maths', '#e26d5c'],
  milo: ['▶', 'Play', '#2fa36b'],
  gizmo: ['magnifier', 'Science', '#9b6bc4'],
  dash: ['pencil', 'Writing', '#2f7fc0']
};
homeSteps.push(function addFriendBadges() {
  document.querySelectorAll('.home-friends [data-friend-route]').forEach(button => {
    const badge = friendBadges[button.dataset.friendRoute];
    if (!badge || button.querySelector('.friend-badge')) return;
    button.insertAdjacentHTML(
      'beforeend',
      `<i class="friend-badge" style="--badge:${badge[2]}" aria-hidden="true"><b>${/^[a-z]{4,}$/.test(badge[0]) ? paintedIcon(badge[0]) : badge[0]}</b><small>${badge[1]}</small></i>`
    );
  });
});
