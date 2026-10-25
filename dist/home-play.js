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
