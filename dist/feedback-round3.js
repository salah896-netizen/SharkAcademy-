/* Friends' feedback, round 3 (25 October 2026): Jude's and Archer's families, and Haytham's.
 *
 * - Blending bubbles: the "listen and blend" question showed two blank bubbles and a plus sign,
 *   which children read as "bubble + bubble". Each bubble is now a numbered speaker that lights
 *   up and says its own part (shh… ip), one after the other, so the child hears the parts and
 *   pushes them together. No letters, as in the class's Heggerty-style listening.
 */
function blendPartsPlay(strip, parts, first = 0) {
  const bubbles = [...strip.querySelectorAll('.blend-bubble')];
  let i = 0;
  const next = () => {
    bubbles.forEach(b => b.classList.remove('blend-speaking'));
    if (i >= parts.length || !strip.isConnected) return;
    const bubble = bubbles[first + i];
    bubble?.classList.add('blend-speaking');
    const part = parts[i++];
    speak(part, {
      speaker: 'willa',
      end: () => setTimeout(next, 450),
      unavailable: () => setTimeout(next, 700)
    });
  };
  next();
}
function upgradeBlendQuestion() {
  const old = app.querySelector('.school-blend:not([data-upgraded])');
  if (!old || !game?.items) return;
  const q = game.items[game.index];
  if (!q?.parts) return;
  // A fresh copy drops the old "replay the whole question" listener; the strip now plays the parts.
  const strip = old.cloneNode(true);
  strip.dataset.upgraded = '1';
  old.replaceWith(strip);
  strip.querySelectorAll('.blend-bubble').forEach((bubble, i) => {
    bubble.innerHTML = `<span class="blend-ear" aria-hidden="true">🔊</span><b class="blend-number" aria-hidden="true">${i + 1}</b>`;
    bubble.setAttribute('aria-label', 'Hear sound ' + (i + 1));
    bubble.addEventListener('click', e => {
      e.stopPropagation();
      blendPartsPlay(strip, [q.parts[i]], i);
    });
  });
  // The arrow between bubbles means "push them together", not "plus".
  strip.querySelectorAll(':scope > b').forEach(b => (b.textContent = '➜'));
  strip.addEventListener('click', () => blendPartsPlay(strip, q.parts, 0));
}
new MutationObserver(upgradeBlendQuestion).observe(app, { childList: true, subtree: true });

/* Writing (Archer's feedback): the little model letter above the sand used the computer font,
 * whose "a" has a hook on top, while the trace teaches the round school "a". The model is now
 * drawn from the very same strokes as the trace, bigger, so what he sees is what he writes.
 * The tool buttons are pictures, and the green ✓ pulses once he has written something, so it's
 * clear what to press next. */
function letterModelSVG(target) {
  const chars = Array.from(target).filter(c => letterStrokes[c]);
  if (!chars.length) return null;
  const strokes = (c, dx) =>
    letterStrokes[c].paths
      .map(d => `<path d="${d}" transform="translate(${dx} 0)"/>`)
      .join('');
  // Each letter sits in a 400-wide cell; crop to the part of the board letters use.
  const width = chars.length * 220;
  const body = chars.map((c, i) => strokes(c, i * 220 - 90)).join('');
  return `<svg class="letter-model" viewBox="0 30 ${width} 215" aria-hidden="true"><path class="model-lines" d="M0 110H${width} M0 225H${width}"/>${body}</svg>`;
}
const writingToolIcons = {
  showStrokes: ['👀', 'Show me'],
  undoInk: ['↶', 'Undo'],
  clearInk: ['🧽', 'Wave away']
};
const preRound3Writing = writing;
writing = function () {
  preRound3Writing();
  const page = app.querySelector('.writing-page');
  if (!page) return;
  const model = page.querySelector('.writing-mission-prompt strong');
  const svg = model && letterModelSVG(model.textContent.trim());
  if (svg) {
    model.setAttribute('aria-label', model.textContent.trim());
    model.innerHTML = svg;
    model.classList.add('model-drawn');
  }
  for (const [id, [icon, label]] of Object.entries(writingToolIcons)) {
    const b = document.getElementById(id);
    if (!b) continue;
    b.setAttribute('aria-label', b.textContent.trim() || label);
    b.classList.add('writing-tool');
    b.innerHTML = `<span aria-hidden="true">${icon}</span>`;
  }
  const done = document.getElementById('finishWriting');
  if (done) {
    done.setAttribute('aria-label', done.textContent.trim() || 'I finished');
    done.classList.add('kid-btn', 'kid-done');
    done.innerHTML = '<span class="kid-icon" aria-hidden="true">✓</span>';
    const canvas = document.getElementById('writingCanvas');
    canvas?.addEventListener('pointerup', () => done.classList.add('writing-ready'));
  }
};

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
 * adventure, 🔬 science and sharks, ✏️ writing. The word underneath is for grown-ups. */
const friendBadges = {
  willa: ['abc', 'Reading', '#e7a24b'],
  tiggy: ['123', 'Maths', '#e26d5c'],
  milo: ['▶', 'Play', '#2fa36b'],
  gizmo: ['🔬', 'Science', '#9b6bc4'],
  dash: ['✏️', 'Writing', '#2f7fc0']
};
const preBadgeHome = home;
home = function () {
  preBadgeHome();
  document.querySelectorAll('.home-friends [data-friend-route]').forEach(button => {
    const badge = friendBadges[button.dataset.friendRoute];
    if (!badge || button.querySelector('.friend-badge')) return;
    button.insertAdjacentHTML(
      'beforeend',
      `<i class="friend-badge" style="--badge:${badge[2]}" aria-hidden="true"><b>${badge[0]}</b><small>${badge[1]}</small></i>`
    );
  });
};
if (document.body.dataset.route === 'home') render();

/* Easy / medium / hard for each subject (Haytham may be ahead in maths and not in reading).
 * Set in the grown-ups' area. Each level:
 *  - sets that subject's stage (1 / 2 / 3), which already controls question difficulty, the
 *    number range (maths up to 10 / 20 / 50), writing with or without the trace, and science depth;
 *  - starts the learning path further along that subject's skills (path.js);
 *  - in maths, medium and hard mix in the bigger-number adventures every other time.
 * "Automatic" (the default) keeps the app's own adaptive steps. */
const levelNames = { easy: 'Easy', medium: 'Medium', hard: 'Hard' },
  levelSubjects = [
    ['reading', 'Reading', 'abc'],
    ['maths', 'Maths', '123'],
    ['writing', 'Writing', '✏️'],
    ['science', 'Science', '🔬']
  ];
function setSubjectLevel(subject, level) {
  state.levels = state.levels || {};
  if (level === 'auto') delete state.levels[subject];
  else {
    state.levels[subject] = level;
    const stage = { easy: 1, medium: 2, hard: 3 }[level];
    learningState()[subject] = {
      stage,
      baseline:
        subject === 'writing'
          ? (state.writingHistory || []).length
          : subject === 'science'
            ? (state.scienceHistory || []).length
            : state.history.filter(x => x.type === subject).length
    };
    if (subject === 'maths') state.range = [10, 20, 50][stage - 1];
  }
  save();
}
function levelControls() {
  const levels = state.levels || {};
  return `<section class="level-controls"><h3>How tricky? Set each subject on its own</h3><p class="muted">Easy is Foundation (Reception). Medium and Hard start further along the path and use bigger numbers and harder words. Automatic lets the app move up when he's ready.</p>${levelSubjects
    .map(
      ([key, name, icon]) =>
        `<div class="level-row"><span class="level-name"><b>${icon}</b> ${name}</span><div class="segmented" role="group" aria-label="${name} level">${['auto', 'easy', 'medium', 'hard'].map(l => `<button data-level-subject="${key}" data-level="${l}" aria-pressed="${(levels[key] || 'auto') === l}">${l === 'auto' ? 'Automatic' : levelNames[l]}</button>`).join('')}</div></div>`
    )
    .join('')}</section>`;
}
const preLevelParents = parents;
parents = function () {
  preLevelParents();
  const host = $('#modalContent');
  if (!host || host.querySelector('.level-controls')) return;
  const firstHeading = host.querySelector('h3');
  if (firstHeading) firstHeading.insertAdjacentHTML('beforebegin', levelControls());
  else host.insertAdjacentHTML('beforeend', levelControls());
  host.querySelectorAll('[data-level-subject]').forEach(
    b =>
      (b.onclick = () => {
        setSubjectLevel(b.dataset.levelSubject, b.dataset.level);
        host
          .querySelectorAll(`[data-level-subject="${b.dataset.levelSubject}"]`)
          .forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      })
  );
};
// Maths on medium/hard: every other maths adventure from the path is a bigger-number one.
let levelMathsCount = 0;
const preLevelLaunch = launchPathActivity;
launchPathActivity = function (pick) {
  const level = (state.levels || {}).maths;
  if (pick?.subject === 'maths' && (level === 'medium' || level === 'hard') && levelMathsCount++ % 2) {
    requestedMathsLesson = null;
    start('maths');
    if (game) {
      game.pathSkill = pick.skill;
      game.pathReview = pick.review;
    }
    return;
  }
  return preLevelLaunch(pick);
};
