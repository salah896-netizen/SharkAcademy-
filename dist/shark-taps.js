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
const preTapHome = home;
home = function () {
  preTapHome();
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
};
if (document.body.dataset.route === 'home') render();
