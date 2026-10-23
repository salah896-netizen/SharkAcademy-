/* A child must model equal groups before choosing the number in each group. */
function makeSharingModel(total) {
  if (!Number.isInteger(total) || total < 2 || total > 20 || total % 2)
    throw new Error('Sharing needs an even collection from 2 to 20.');
  return { total, places: Array(total).fill('tray'), moves: 0, unequalChecks: 0 };
}
function sharingCounts(model) {
  return {
    tray: model.places.filter(p => p === 'tray').length,
    left: model.places.filter(p => p === 'left').length,
    right: model.places.filter(p => p === 'right').length
  };
}
function sharingIsFair(model) {
  const counts = sharingCounts(model);
  return counts.tray === 0 && counts.left === counts.right;
}
function moveSharingAnimal(model, index, zone) {
  if (
    !Number.isInteger(index) ||
    index < 0 ||
    index >= model.total ||
    !['tray', 'left', 'right'].includes(zone) ||
    model.places[index] === zone
  )
    return false;
  model.places[index] = zone;
  model.moves++;
  return true;
}
function tapSharingAnimal(model, index, selected) {
  if (selected !== null && selected !== index && model.places[index] !== 'tray') {
    moveSharingAnimal(model, selected, model.places[index]);
    return null;
  }
  return selected === index ? null : index;
}
const preSharingQuestions = makeQuestions;
makeQuestions = function (type) {
  return preSharingQuestions(type).map(q => {
    if (type !== 'maths' || q.skill !== 'share') return q;
    const animal = q.scene.match(/animal-([a-z-]+)/)?.[1] || 'tuna';
    return {
      ...q,
      sharingTotal: Number(q.answer) * 2,
      sharingAnimal: animal,
      scene: '<div class="share-lagoon" aria-label="Share the pretend reef picnic"></div>',
      spoken:
        'Let’s share these ocean pictures fairly for our pretend reef picnic. Tap a picture, then a basket. Both baskets need the same amount.',
      prompt: 'Share the pictures fairly between the two baskets.',
      hint: 'Give one picture to the first basket and one to the second. Keep taking turns until the tray is empty. Then count one basket.'
    };
  });
};
let sharingRound = null;
function removeSharingDrag(round) {
  round?.ghost?.remove();
  if (round) {
    round.ghost = null;
    round.drag = null;
  }
}
function paintSharingRound(round) {
  if (round !== sharingRound || game !== round.game || game.index !== round.index || game.answered)
    return;
  const counts = sharingCounts(round.model),
    fair = sharingIsFair(round.model);
  const token = index =>
    `<button class="share-token ${round.selected === index ? 'share-selected' : ''}" data-share-token="${index}" aria-label="Picture ${index + 1}${round.selected === index ? ', selected' : ''}" aria-pressed="${round.selected === index}">${seaAnimal(round.animal)}</button>`;
  const tokens = zone =>
    round.model.places.map((place, index) => (place === zone ? token(index) : '')).join('');
  const basket = (zone, label) =>
    `<section class="sharing-basket ${fair ? 'fair-basket' : ''}" data-share-zone="${zone}" aria-label="${label}"><button class="share-destination" data-share-destination="${zone}" aria-label="Put the selected picture in the ${zone} basket"><svg viewBox="0 0 200 145" aria-hidden="true"><path d="M25 55H175L158 131Q100 147 42 131Z" fill="#dcc593" stroke="#a88d59" stroke-width="4"/><path d="M45 55Q49 8 100 8Q151 8 155 55" fill="none" stroke="#c4aa78" stroke-width="9"/><path d="M35 78H166M39 98H162M43 119H158M65 58L72 136M99 58V140M134 58L127 136" fill="none" stroke="#b79b67" stroke-width="3" opacity=".6"/></svg></button><div class="basket-pictures">${tokens(zone)}</div>${fair ? '<span class="fair-basket-glow" aria-hidden="true">✓</span>' : ''}</section>`;
  round.root.innerHTML = `<section class="sharing-tray" data-share-zone="tray" aria-label="Picture tray"><button class="share-tray-return" data-share-destination="tray" aria-label="Return the selected picture to the tray"><span aria-hidden="true">↩</span></button><div class="tray-pictures">${tokens('tray')}</div></section><div class="sharing-tap-guide" aria-hidden="true"><span class="${round.selected === null ? 'active' : ''}">☝</span><i>→</i><span class="${round.selected !== null ? 'active' : ''}">🧺</span></div><div class="sharing-baskets">${basket('left', 'Left picnic basket')}${basket('right', 'Right picnic basket')}</div><p class="sharing-caption" role="status">${fair ? 'Both baskets have the same amount. How many pictures are in each basket?' : counts.tray ? 'Choose a picture, then a basket.' : 'Can you make both baskets the same?'}</p>`;
  const choices = app.querySelector('.game .choices');
  if (choices) {
    choices.hidden = !fair;
    choices.setAttribute('aria-hidden', String(!fair));
  }
  round.root.querySelectorAll('[data-share-destination]').forEach(
    button =>
      (button.onclick = () => {
        if (round.selected === null) {
          helperSpeak('Tap a picture first. Then tap a basket.');
          return;
        }
        const zone = button.dataset.shareDestination;
        moveSharingAnimal(round.model, round.selected, zone);
        round.selected = null;
        paintSharingRound(round);
      })
  );
  round.root.querySelectorAll('[data-share-token]').forEach(button => {
    const index = Number(button.dataset.shareToken);
    button.onclick = e => {
      if (e.detail === 0) {
        round.selected = tapSharingAnimal(round.model, index, round.selected);
        paintSharingRound(round);
      }
    };
    button.onpointerdown = e => {
      if (!e.isPrimary || e.button !== 0) return;
      round.drag = { index, x: e.clientX, y: e.clientY, moved: false, pointer: e.pointerId };
      button.setPointerCapture(e.pointerId);
    };
    button.onpointermove = e => {
      const drag = round.drag;
      if (!drag || drag.pointer !== e.pointerId) return;
      if (!drag.moved && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 9) return;
      e.preventDefault();
      drag.moved = true;
      if (!round.ghost) {
        round.ghost = document.createElement('div');
        round.ghost.className = 'sharing-drag-ghost';
        round.ghost.innerHTML = seaAnimal(round.animal);
        round.ghost.setAttribute('aria-hidden', 'true');
        document.body.append(round.ghost);
      }
      round.ghost.style.left = e.clientX + 'px';
      round.ghost.style.top = e.clientY + 'px';
    };
    button.onpointerup = e => {
      const drag = round.drag;
      if (!drag || drag.pointer !== e.pointerId) return;
      if (button.hasPointerCapture(e.pointerId)) button.releasePointerCapture(e.pointerId);
      if (drag.moved) {
        const destination = document
          .elementFromPoint(e.clientX, e.clientY)
          ?.closest('[data-share-zone]');
        if (destination && round.root.contains(destination)) {
          moveSharingAnimal(round.model, index, destination.dataset.shareZone);
          round.selected = null;
        } else round.selected = index;
      } else round.selected = tapSharingAnimal(round.model, index, round.selected);
      removeSharingDrag(round);
      paintSharingRound(round);
    };
    button.onpointercancel = () => removeSharingDrag(round);
  });
  if (fair && round.status !== 'fair') {
    round.status = 'fair';
    helperSpeak('Both baskets have the same amount. How many pictures are in each basket?');
  } else if (!counts.tray && !fair && round.status !== 'unequal') {
    round.status = 'unequal';
    round.model.unequalChecks++;
    game.assisted = true;
    reactCrew('thinking', 'tiggy');
    helperSpeak(
      'Good sharing practice. Let’s make the baskets the same. Tap a picture in a basket, then move it to the other basket.'
    );
  } else if (counts.tray) round.status = 'sharing';
  requestAnimationFrame(fitScreen);
}
const preSharingPlay = play;
play = function () {
  removeSharingDrag(sharingRound);
  sharingRound = null;
  preSharingPlay();
  const root = app.querySelector('.share-lagoon'),
    q = game?.items?.[game.index];
  if (!root || !q?.sharingTotal) return;
  sharingRound = {
    root,
    game,
    index: game.index,
    model: makeSharingModel(q.sharingTotal),
    animal: q.sharingAnimal,
    selected: null,
    status: 'sharing',
    ghost: null,
    drag: null
  };
  paintSharingRound(sharingRound);
};
const preSharingAnswer = answer;
answer = function (value) {
  const round = sharingRound,
    active = round && game === round.game && game.index === round.index && !game.answered;
  if (active && !sharingIsFair(round.model)) return;
  const correct = active && value === game.items[game.index].answer,
    evidence = correct
      ? {
          kind: 'equal-sharing',
          total: round.model.total,
          groups: [sharingCounts(round.model).left, sharingCounts(round.model).right],
          moves: round.model.moves,
          supportedCorrections: round.model.unequalChecks
        }
      : null;
  preSharingAnswer(value);
  if (evidence) {
    round.root.querySelectorAll('button').forEach(button => (button.disabled = true));
    removeSharingDrag(round);
    const record = state.history.at(-1);
    if (record?.session === round.game.session) {
      record.model = evidence;
      save();
    }
  }
};
window.addEventListener('hashchange', () => removeSharingDrag(sharingRound));

function sharingPracticePreview() {
  const all = state.history.filter(record => record.model?.kind === 'equal-sharing'),
    attempts = all.slice(-3);
  if (!attempts.length)
    return '<p>Hands-on sharing records will appear here after a completed challenge.</p>';
  return (
    `<p>${all.length} sharing models · ${all.filter(record => record.independent).length} without help · ${all.filter(record => !record.independent).length} with help</p><div class="parent-sharing-models">` +
    attempts
      .map(record => {
        const groups = record.model.groups.map(n => Math.min(10, Math.max(0, Number(n) || 0)));
        return `<div class="parent-sharing-row"><div>${groups.map(count => `<span class="parent-sharing-basket" aria-label="${count} pictures">${'●'.repeat(count)}</span>`).join('<b> = </b>')}</div><strong>${groups[0]} in each basket</strong><span>${record.independent ? 'Without help' : 'With help'} · ${record.model.moves} picture moves</span></div>`;
      })
      .join('') +
    '</div><p class="muted">The record includes equal groups made in the game and the matching number choice. It is practice evidence, not a whole-year maths assessment.</p>'
  );
}
