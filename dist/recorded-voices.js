// Family-supplied ElevenLabs recordings. These clips are greetings, not a TTS model.
const characterGreetings = {
  milo: { src: 'audio/milo-welcome.mp3', name: 'Milo' },
  willa: { src: 'audio/willa-welcome.mp3', name: 'Willa' },
  gizmo: { src: 'audio/gizmo-welcome.mp3', name: 'Gizmo' },
  tiggy: { src: 'audio/tiggy-welcome.mp3', name: 'Tiggy' },
  dash: { src: 'audio/dash-welcome.mp3', name: 'Dash' }
};
let characterVoicePlayer = null;
function stopRecordedVoice() {
  if (!characterVoicePlayer) return;
  const player = characterVoicePlayer;
  characterVoicePlayer = null;
  player.onplaying = player.onpause = player.onwaiting = player.onended = player.onerror = null;
  player.pause();
  player.removeAttribute('src');
  player.load();
  player.remove();
  delete document.body.dataset.recordedVoice;
  recordedVoiceMessage('Tap a friend to hear their greeting again.');
}
function recordedVoiceMessage(text) {
  const greeting = $('#crewGreeting'),
    preview = $('#recordedVoiceStatus');
  if (greeting) greeting.textContent = text;
  if (preview) preview.textContent = text;
}
function playCharacterGreeting(key) {
  const clip = characterGreetings[key];
  if (!clip) return;
  stopStory();
  if (!state.voice) {
    recordedVoiceMessage('Voice is off. Turn Voice on to hear ' + clip.name + '.');
    return;
  }
  const token = speechSequence,
    player = document.createElement('audio');
  characterVoicePlayer = player;
  player.id = 'characterVoicePlayer';
  player.hidden = true;
  player.preload = 'auto';
  player.src = clip.src;
  player.setAttribute('aria-label', clip.name + '’s recorded greeting');
  document.body.append(player);
  const active = () => token === speechSequence && characterVoicePlayer === player;
  const speaking = on => {
    if (!active()) return;
    document.body.dataset.speaker = key;
    document.body.classList.toggle('milo-speaking', on && key === 'milo');
    document.body.classList.toggle('helper-speaking', on && key !== 'milo');
    fadeMusic(musicCurrent, musicTarget(), 200);
  };
  const finish = (failed = false) => {
    if (!active()) return;
    speaking(false);
    stopRecordedVoice();
    recordedVoiceMessage(
      failed
        ? 'That greeting could not play. Tap ' + clip.name + ' to try again.'
        : 'Tap a friend to hear their greeting again.'
    );
  };
  player.onplaying = () => {
    if (!active()) return;
    document.body.dataset.recordedVoice = key;
    speaking(true);
    recordedVoiceMessage('Listening to ' + clip.name + '’s welcome…');
  };
  player.onpause = () => speaking(false);
  player.onwaiting = () => speaking(false);
  player.onended = () => finish();
  player.onerror = () => finish(true);
  recordedVoiceMessage('Getting ' + clip.name + '’s welcome ready…');
  player.play().catch(() => finish(true));
}
