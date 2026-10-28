/* The grown-ups' area additions, in the order they appear: Voice check (27 Oct), progress saved
 * automatically with backup files (28 Oct), and "How's Haytham going?" (28 Oct). */

/* Grown-ups' area: "Voice check" (27 Oct). Haytham noticed the iPad voice sometimes taking over
 * from the friends' recordings. Lines that used the iPad voice (or a recording that couldn't
 * play) are listed here, with how many voices are saved for offline use, and a button to copy
 * the list so it can be sent over and recorded. */
parentsSteps.push(function addVoiceCheck() {
  const host = $('#modalContent');
  if (!host || host.querySelector('.voice-check')) return;
  const gaps = voiceGaps(),
    md = window.mediaDownload,
    saved = md ? `${md.total - md.left} of ${md.total} recordings and photos are saved on this iPad.` : '';
  const list = gaps
    .slice()
    .reverse()
    .slice(0, 30)
    .map(g => `<li><b>${g.speaker}</b> “${g.text.replace(/</g, '&lt;')}”${g.count > 1 ? ` ×${g.count}` : ''} <small>(${g.kind})</small></li>`)
    .join('');
  host.insertAdjacentHTML(
    'beforeend',
    `<section class="voice-check"><h3>Voice check</h3><p class="muted">${saved} ${gaps.length ? `The iPad voice was used for ${gaps.length} line${gaps.length > 1 ? 's' : ''}. Copy the list and send it over, and they can be recorded.` : 'Every line so far has used the friends’ recordings.'}</p>${gaps.length ? `<ul class="voice-gap-list">${list}</ul><div class="segmented"><button id="copyVoiceGaps">Copy the list</button><button id="clearVoiceGaps">Clear</button></div>` : ''}</section>`
  );
  $('#copyVoiceGaps')?.addEventListener('click', e => {
    const text = gaps.map(g => `${g.speaker} | ${g.text} | ${g.kind} | ${g.where || ''} | ${g.count}`).join('\n');
    navigator.clipboard?.writeText(text).then(
      () => (e.target.textContent = 'Copied ✓'),
      () => (e.target.textContent = 'Couldn’t copy')
    );
  });
  $('#clearVoiceGaps')?.addEventListener('click', () => {
    try {
      localStorage.removeItem('haytham-voice-gaps');
    } catch {}
    host.querySelector('.voice-check')?.remove();
  });
});

/* Progress saved automatically (28 Oct). Everything Haytham earns is already kept on the iPad as
 * he plays; this makes it much harder to lose:
 *  - every save is also copied into a second, separate store on the iPad (IndexedDB), with one
 *    copy per day for the last 14 days;
 *  - the app asks the iPad to keep its storage ("persistent storage"), so it isn't cleared to
 *    make room;
 *  - if the main copy is ever missing or older (cleared data, a browser hiccup), the app quietly
 *    brings back the newest copy when it opens;
 *  - the grown-ups' area shows when it last saved, and can also save a backup file to move to
 *    another iPad (Files, AirDrop or email) or restore from one.
 */
const progressDB = (() => {
  let opening = null;
  const open = () =>
    (opening ||= new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) return reject(new Error('no indexedDB'));
      const req = indexedDB.open('haytham-progress', 1);
      req.onupgradeneeded = () => req.result.createObjectStore('copies');
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    }));
  const run = (mode, fn) =>
    open().then(
      db =>
        new Promise((resolve, reject) => {
          const tx = db.transaction('copies', mode),
            store = tx.objectStore('copies'),
            result = fn(store);
          tx.oncomplete = () => resolve(result?.result);
          tx.onerror = () => reject(tx.error);
        })
    );
  return {
    put: (key, value) => run('readwrite', s => s.put(value, key)),
    get: key => run('readonly', s => s.get(key)),
    keys: () => run('readonly', s => s.getAllKeys()),
    remove: key => run('readwrite', s => s.delete(key))
  };
})();

// How much has been done: used to choose the fuller copy, never the emptier one.
function progressWeight(s) {
  if (!s) return -1;
  return (
    (Number(s.xp) || 0) +
    (s.history?.length || 0) +
    (s.completed?.length || 0) * 5 +
    (s.writingHistory?.length || 0) * 3 +
    (s.discoveries?.length || 0)
  );
}
function progressSnapshot() {
  const extras = {};
  for (const key of ['haytham-music', 'haytham-music-volume'])
    try {
      const v = localStorage.getItem(key);
      if (v !== null) extras[key] = v;
    } catch {}
  return { savedAt: new Date().toISOString(), app: 'haytham-shark-academy', state, extras };
}
let progressMirrorTimer = null,
  progressLastMirror = null;
function mirrorProgress() {
  clearTimeout(progressMirrorTimer);
  progressMirrorTimer = setTimeout(async () => {
    try {
      const snap = progressSnapshot(),
        day = 'day-' + snap.savedAt.slice(0, 10);
      await progressDB.put('latest', snap);
      await progressDB.put(day, snap);
      progressLastMirror = snap.savedAt;
      // Keep two weeks of daily copies.
      const days = (await progressDB.keys()).filter(k => String(k).startsWith('day-')).sort();
      for (const old of days.slice(0, Math.max(0, days.length - 14))) await progressDB.remove(old);
    } catch {}
  }, 60);
}
const preSafeSave = save;
save = function () {
  preSafeSave();
  mirrorProgress();
};

// On opening: ask to keep storage, and bring back the newest copy if the main one is missing.
(async () => {
  try {
    if (navigator.storage?.persist && !(await navigator.storage.persisted())) await navigator.storage.persist();
  } catch {}
  try {
    const copy = await progressDB.get('latest');
    if (copy?.state && progressWeight(copy.state) > progressWeight(state)) {
      restoreProgress(copy, false);
      return;
    }
    progressLastMirror = copy?.savedAt || null;
    mirrorProgress();
  } catch {}
})();

function restoreProgress(snap, announce = true) {
  const s = snap?.state;
  if (!s || !Array.isArray(s.history) || !Array.isArray(s.completed)) return false;
  try {
    localStorage.setItem('haytham-v1', JSON.stringify(s));
    for (const [k, v] of Object.entries(snap.extras || {})) localStorage.setItem(k, v);
  } catch {
    return false;
  }
  if (announce) alertProgress('Progress restored. The app will reopen.');
  setTimeout(() => location.reload(), announce ? 1200 : 0);
  return true;
}
function alertProgress(text) {
  const note = document.createElement('div');
  note.className = 'progress-note';
  note.setAttribute('role', 'status');
  note.textContent = text;
  document.body.append(note);
  setTimeout(() => note.remove(), 3000);
}

// Grown-ups' area: last saved, plus a backup file to move to another iPad.
parentsSteps.push(function addProgressBackup() {
  const host = $('#modalContent');
  if (!host || host.querySelector('.progress-safe')) return;
  const oldExport = document.getElementById('export');
  if (oldExport) oldExport.hidden = true; // replaced by "Save a backup file" below
  const when = progressLastMirror
    ? new Date(progressLastMirror).toLocaleString('en-AU', { weekday: 'short', hour: 'numeric', minute: '2-digit' })
    : 'just now';
  host.insertAdjacentHTML(
    'beforeend',
    `<section class="progress-safe"><h3>Saving progress</h3><p class="muted">Haytham’s progress saves automatically on this iPad as he plays, with a spare copy for each of the last 14 days. Last saved: <b>${when}</b>. To move to a new iPad, save a backup file and open it there.</p><div class="segmented"><button id="saveProgressFile">Save a backup file</button><button id="restoreProgressFile">Restore from a file</button></div><input type="file" id="progressFile" accept="application/json,.json" hidden></section>`
  );
  $('#saveProgressFile').onclick = async () => {
    const snap = progressSnapshot(),
      name = `haytham-shark-academy-${snap.savedAt.slice(0, 10)}.json`,
      file = new File([JSON.stringify(snap)], name, { type: 'application/json' });
    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Haytham’s Shark Academy backup' });
        return;
      }
    } catch (e) {
      if (e?.name === 'AbortError') return;
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  };
  $('#restoreProgressFile').onclick = () => $('#progressFile').click();
  $('#progressFile').onchange = async e => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      let snap = JSON.parse(await f.text());
      // Older "Export progress" files hold the progress on its own.
      if (snap && !snap.app && Array.isArray(snap.history)) snap = { app: 'haytham-shark-academy', state: snap };
      if (snap?.app !== 'haytham-shark-academy' || !restoreProgress(snap)) throw new Error('not a backup');
    } catch {
      alertProgress('That file isn’t a Shark Academy backup.');
    }
  };
});

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
