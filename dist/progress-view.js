/* "How's Haytham going?" (28 Oct): a plain-words summary at the top of the grown-ups' area.
 * For each subject: what he's mastered, what he's practising (and how it's going), and what's
 * next, plus this week at a glance. Built from the learning path's own evidence (path.js);
 * the detailed table further down stays for fine control. */
const progressSubjects = [
  ['reading', 'Reading', 'Willa', 'abc', '#e7a24b'],
  ['maths', 'Maths', 'Tiggy', '123', '#e26d5c'],
  ['writing', 'Writing', 'Dash', '✏️', '#2f7fc0'],
  ['science', 'Science', 'Gizmo', '🔬', '#9b6bc4']
];
function progressWeek() {
  const since = Date.now() - 7 * 864e5,
    when = x => new Date(x?.at || 0).getTime() >= since,
    sessions = [
      ...(state.readingAdventures || []),
      ...(state.scienceLessons || []),
      ...(state.writingLessons || []),
      ...(state.completed || []).filter(x => x.type === 'maths')
    ].filter(when);
  const days = new Set(sessions.map(x => new Date(x.at).toDateString())).size;
  return { lessons: sessions.length, days };
}
function progressOverview() {
  if (typeof pathSkills === 'undefined') return '';
  updatePathState();
  const levelName = s => ({ easy: 'Easy', medium: 'Medium', hard: 'Hard' })[(state.levels || {})[s]] || 'Automatic';
  const week = progressWeek();
  const cards = progressSubjects
    .map(([subject, name, friend, icon, colour]) => {
      const skills =
        typeof pathSkillsInLevelOrder === 'function'
          ? pathSkillsInLevelOrder(subject)
          : pathSkills.filter(s => s.subject === subject);
      const status = s => skillStatus(s);
      const mastered = skills.filter(s => ['ready', 'review'].includes(status(s)));
      const practising = skills.filter(s => status(s) === 'learning');
      const review = skills.filter(s => status(s) === 'review');
      const next = skills.find(s => status(s) === 'new');
      const chip = s => {
        const st = status(s);
        const mark = { ready: '⭐', review: '🔁', learning: '🌱', new: '○' }[st];
        return `<span class="pv-chip pv-${st}">${mark} ${s.name}</span>`;
      };
      let doing;
      if (practising.length) {
        const s = practising.at(-1),
          p = skillProgress(s);
        doing =
          subject === 'writing'
            ? `Working on <b>${s.name}</b>: ${p.tries} adventure${p.tries === 1 ? '' : 's'} so far.`
            : `Working on <b>${s.name}</b>: ${p.right} of his last ${p.tries} answers right on his own${p.tries < PATH.window ? ' (still early days)' : ''}.`;
      } else if (mastered.length === skills.length && skills.length) doing = 'Every skill here is mastered. Brilliant!';
      else doing = next ? `Ready to start <b>${next.name}</b>.` : 'Nothing started yet.';
      return `<article class="pv-card" style="--pv:${colour}"><div class="pv-head"><b class="pv-icon">${icon}</b><div><strong class="pv-name">${name}</strong> <span class="pv-sub">with ${friend} · ${levelName(subject)}</span><p>${mastered.length} of ${skills.length} skill${skills.length === 1 ? "" : "s"} mastered</p></div></div><p class="pv-doing">${doing}${review.length ? ` ${review.length === 1 ? 'One skill is' : review.length + ' skills are'} due a quick review.` : ''}${next && practising.length ? ` Next up: <b>${next.name}</b>.` : ''}</p><div class="pv-chips">${skills.map(chip).join('')}</div></article>`;
    })
    .join('');
  return `<section class="progress-view"><h3>How’s Haytham going?</h3><p class="pv-week">This week: <b>${week.lessons}</b> lesson${week.lessons === 1 ? '' : 's'} on <b>${week.days}</b> day${week.days === 1 ? '' : 's'} · <b>${Number(state.xp) || 0}</b> pearls so far</p><div class="pv-cards">${cards}</div><p class="muted pv-key">⭐ mastered (8 of the last 10 right on his own, over two days) · 🌱 practising · 🔁 review due · ○ not started yet. Practice evidence, not a school assessment.</p></section>`;
}
parentsSteps.push(function addProgressOverview() {
  const host = $('#modalContent');
  if (!host || host.querySelector('.progress-view')) return;
  host.insertAdjacentHTML('afterbegin', progressOverview());
});
