/* Grown-ups' area: "Voice check" (27 Oct). Haytham noticed the iPad voice sometimes taking over
 * from the friends' recordings. Lines that used the iPad voice (or a recording that couldn't
 * play) are listed here, with how many voices are saved for offline use, and a button to copy
 * the list so it can be sent over and recorded. */
const preVoiceCheckParents = parents;
parents = function () {
  preVoiceCheckParents();
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
};
