/* Recorded character lines (ElevenLabs, generated 24 Oct 2026).
 *
 * speak() calls voiceClipsFor() first. When every sentence of a line has a recording in that
 * character's voice, the recordings play in order; otherwise the device voice speaks as before.
 * One reused <audio> element, unlocked by the first tap, so iPads allow later automatic playback.
 * The clip list lives in voice-manifest.js (generated from the recording batch).
 */
function voiceKey(speaker, text) {
  return (
    speaker +
    '|' +
    String(text)
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/([!?])\.+$/, '$1') // "Is it a whale?." reads the same as "Is it a whale?"
      .toLowerCase()
  );
}
function voiceSentences(text) {
  return String(text)
    .trim()
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);
}
// Longest-first matching, so a whole recorded line wins over its separate sentences.
function voiceClipsFor(text, speaker = 'milo') {
  const lines = typeof voiceManifest !== 'undefined' ? voiceManifest.lines : null;
  if (!lines || !text) return null;
  const whole = lines[voiceKey(speaker, text)];
  if (whole) return [whole];
  const parts = voiceSentences(text),
    files = [];
  for (let i = 0; i < parts.length; ) {
    let found = false;
    for (let j = parts.length; j > i; j--) {
      const file = lines[voiceKey(speaker, parts.slice(i, j).join(' '))];
      if (file) {
        files.push(file);
        i = j;
        found = true;
        break;
      }
    }
    if (!found) return null;
  }
  return files.length ? files : null;
}
// Who can say this? The asked-for friend first, then the friend for this screen, then Milo,
// then anyone. Whole lines in one voice are preferred; failing that, sentence by sentence.
function voiceClipsForAnyone(text, speaker = 'milo') {
  const order = [
    speaker,
    typeof crewForRoute === 'function' ? crewForRoute() : null,
    'milo',
    'willa',
    'tiggy',
    'gizmo',
    'dash'
  ].filter((s, i, all) => s && all.indexOf(s) === i);
  for (const s of order) {
    const files = voiceClipsFor(text, s);
    if (files) return { files, speaker: s };
  }
  const files = [];
  for (const sentence of voiceSentences(text)) {
    const who = order.find(s => voiceClipsFor(sentence, s));
    if (who) {
      files.push(...voiceClipsFor(sentence, who));
      continue;
    }
    // Lines made up as you play ("4, 5, hmm, 7, 8.", "crab, squid, crab… What comes next?") are
    // built from recorded pieces: each number, animal and phrase on its own.
    const pieces = voicePieces(sentence);
    if (!pieces) return null;
    files.push(...pieces);
  }
  return files.length ? { files, speaker } : null;
}
function voicePieces(sentence) {
  const lines = typeof voiceManifest !== 'undefined' ? voiceManifest.lines : null;
  if (!lines) return null;
  const parts = sentence
    .split(/[,…:·]+\s*|\.\.\.\s*/)
    .map(p => p.replace(/[.!?]+$/, '').trim())
    .filter(Boolean);
  const files = [];
  // Numbers split a piece further: "45 fish and 3 more fish" → 45 · fish and · 3 · more fish.
  const pieces = parts.flatMap(p =>
    lines[voiceKey('tiggy', p)] || lines[voiceKey('willa', p)]
      ? [p]
      : p
          .split(/(\d+)/)
          .map(x => x.trim())
          .filter(Boolean)
  );
  for (const part of pieces) {
    const who = ['tiggy', 'willa', 'milo', 'gizmo', 'dash'].find(s => lines[voiceKey(s, part)]);
    // A single letter or digraph is said as its Jolly Phonics sound ("f · i · n").
    const sound = /^[a-z]{1,2}$/i.test(part) ? voiceSoundFile(part.toLowerCase()) : null;
    if (!who && !sound) return null;
    files.push(who ? lines[voiceKey(who, part)] : sound);
  }
  return files.length ? files : null;
}
function voiceSoundFile(id) {
  // Letters that share a Jolly Phonics sound: c and k say ck; ll says l; oo says the long oo.
  id = { c: 'ck', k: 'ck', ll: 'l', oo: 'oo-long' }[id] || id;
  return typeof voiceManifest !== 'undefined' ? voiceManifest.sounds[id] || null : null;
}

const voiceLinePlayer = document.createElement('audio');
voiceLinePlayer.id = 'voiceLinePlayer';
voiceLinePlayer.preload = 'auto';
voiceLinePlayer.hidden = true;
document.body.append(voiceLinePlayer);
let voiceLineUnlocked = false;
// A tiny silent sound played inside the first tap lets iPad Safari play later lines on its own.
function unlockVoiceLines() {
  if (voiceLineUnlocked) return;
  voiceLineUnlocked = true;
  try {
    voiceLinePlayer.src =
      'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=';
    const p = voiceLinePlayer.play();
    if (p) p.then(() => voiceLinePlayer.pause()).catch(() => {});
  } catch {}
}
['pointerdown', 'keydown', 'touchend'].forEach(type =>
  document.addEventListener(type, unlockVoiceLines, { once: true, capture: true })
);

let voiceLineToken = null,
  voiceLineWatchdog = null;
function stopVoiceLine() {
  voiceLineToken = null;
  voiceLinePlayer.onended = voiceLinePlayer.onerror = voiceLinePlayer.onpause = null;
  clearTimeout(voiceLineWatchdog);
  try {
    voiceLinePlayer.pause();
  } catch {}
}
function playVoiceClips(files, text, options = {}, fallback) {
  const token = speechSequence,
    speaker = options.speaker || 'milo';
  voiceLineToken = token;
  let index = 0,
    started = false;
  const active = () => voiceLineToken === token && token === speechSequence;
  const speaking = on => {
    document.body.dataset.speaker = speaker;
    document.body.classList.toggle('milo-speaking', on && speaker === 'milo');
    document.body.classList.toggle('helper-speaking', on && speaker !== 'milo');
    if (typeof fadeMusic === 'function') fadeMusic(musicCurrent, musicTarget(), 200);
  };
  const finish = () => {
    if (!active()) return;
    stopVoiceLine();
    speaking(false);
    options.end?.();
  };
  // A recording that won't play (still downloading, or a network hiccup) is fetched and tried
  // again rather than handed to the iPad voice, which Haytham noticed and disliked (27 Oct).
  // Only if it still can't play does the line end quietly; its words are on screen.
  let retried = false;
  const fail = () => {
    if (!active()) return;
    if (!retried) {
      retried = true;
      const file = files[Math.max(0, index - 1)];
      clearTimeout(voiceLineWatchdog);
      voiceLineWatchdog = setTimeout(() => active() && !started && giveUp(), 9000);
      fetch(file)
        .then(r => (r.ok ? r.blob() : Promise.reject()))
        .then(() => {
          if (!active()) return;
          index = Math.max(0, index - 1);
          next();
        })
        .catch(giveUp);
      return;
    }
    giveUp();
  };
  const giveUp = () => {
    if (!active()) return;
    stopVoiceLine();
    speaking(false);
    logVoiceGap('could not play', speaker, text);
    options.end?.();
  };
  const next = () => {
    if (!active()) return;
    if (index >= files.length) return finish();
    voiceLinePlayer.src = files[index++];
    const playing = voiceLinePlayer.play();
    const begin = () => {
      if (!active() || started) return;
      started = true;
      speaking(true);
      options.start?.();
    };
    if (playing && playing.then) playing.then(begin).catch(fail);
    else begin();
  };
  voiceLinePlayer.onended = next;
  voiceLinePlayer.onerror = fail;
  // If the device pauses us (e.g. another app takes the audio), treat the line as finished
  // so lessons never wait forever.
  voiceLinePlayer.onpause = () => {
    if (active() && started && !voiceLinePlayer.ended) finish();
  };
  // Safety net: a recording that hasn't started within 3 seconds is fetched and tried again.
  clearTimeout(voiceLineWatchdog);
  voiceLineWatchdog = setTimeout(() => {
    if (active() && !started) fail();
  }, 3000);
  next();
}
// Tap a sound tile to hear Willa say that Jolly Phonics sound.
function playPhonicsSound(id) {
  const file = voiceSoundFile(id);
  if (!file || !state.voice) return false;
  stopSpeech();
  playVoiceClips([file], id, { speaker: 'willa' });
  return true;
}

/* Lines that used the iPad voice, or a recording that couldn't play, are noted on this device
 * (grown-ups' area → "Voice check") so they can be recorded. Never more than 200. */
function logVoiceGap(kind, speaker, text) {
  try {
    const key = 'haytham-voice-gaps',
      gaps = JSON.parse(localStorage.getItem(key) || '[]'),
      line = String(text || '').trim().slice(0, 300);
    if (!line) return;
    const found = gaps.find(g => g.text === line && g.speaker === speaker && g.kind === kind);
    if (found) {
      found.count++;
      found.at = new Date().toISOString();
    } else gaps.push({ kind, speaker, text: line, count: 1, at: new Date().toISOString(), where: location.hash });
    localStorage.setItem(key, JSON.stringify(gaps.slice(-200)));
  } catch {}
}
function voiceGaps() {
  try {
    return JSON.parse(localStorage.getItem('haytham-voice-gaps') || '[]');
  } catch {
    return [];
  }
}

/* Get ahead: when a lesson starts, fetch the recordings for all of its questions, hints and
 * answers in the background, so each line is already on the iPad when it's needed. */
let voicePrefetchedGame = null;
function prefetchLessonVoices() {
  if (typeof game === 'undefined' || !game || game === voicePrefetchedGame || !game.items) return;
  voicePrefetchedGame = game;
  const speaker =
    { reading: 'willa', maths: 'tiggy', science: 'gizmo', writing: 'dash' }[game.type] ||
    (typeof crewForRoute === 'function' ? crewForRoute() : null) ||
    'milo';
  const files = new Set();
  for (const q of game.items)
    for (const t of [q.prompt, q.spoken, q.hint, q.reveal, q.ask, q.fact])
      if (typeof t === 'string')
        (voiceClipsForAnyone(t, speaker)?.files || []).forEach(f => files.add(f));
  let delay = 0;
  for (const f of files) setTimeout(() => fetch(f).catch(() => {}), (delay += 120));
}
new MutationObserver(() => setTimeout(prefetchLessonVoices, 50)).observe(document.getElementById('app'), {
  childList: true
});
