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
const preSafeParents = parents;
parents = function () {
  preSafeParents();
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
};
