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
function voiceSoundFile(id) {
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

let voiceLineToken = null;
function stopVoiceLine() {
  voiceLineToken = null;
  voiceLinePlayer.onended = voiceLinePlayer.onerror = null;
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
  const fail = () => {
    if (!active()) return;
    stopVoiceLine();
    speaking(false);
    // Nothing played yet: let the device voice say it instead, so no line is ever lost.
    if (!started && fallback) fallback();
    else options.end?.();
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
