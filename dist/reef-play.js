function openKraken() {
  if (location.hash !== '#legend/kraken') {
    location.hash = 'legend/kraken';
    return;
  }
  stopStory();
  app.innerHTML = `<article class="kraken-ocean-page"><a class="back-link" href="#museum">← Back to Sharks</a><span class="tag">SEA LEGENDS · MAKE-BELIEVE</span><h1>The Kraken’s secret cave</h1><button id="wakeKraken" class="kraken-picture" aria-label="Wake the kraken"><img src="assets/visual-kraken.jpg" alt="An imaginary kraken with enormous curling tentacles in a glowing cave"><span>✦</span></button><p>The kraken is a legendary sea monster. People told stories about its huge arms and tentacles.</p><p><strong>Real giant squid do exist.</strong> Our kraken is make-believe. It is not a shark!</p><button id="krakenListen" class="listen">♫ Tell me, Milo</button><p id="krakenReaction" aria-live="polite">Tap the kraken to wake its cave.</p><p class="credits">Illustration of a sea legend. <a href="https://www.nhm.ac.uk/discover/sea-monsters-inspiration-serpents-mermaids-the-kraken.html" target="_blank" rel="noopener">Natural History Museum</a>.</p></article>`;
  $('#krakenListen').onclick = () =>
    speak(
      'The kraken is a sea monster from old stories. Real giant squid exist, but this kraken is make-believe. It is not a shark!'
    );
  $('#wakeKraken').onclick = () => {
    const button = $('#wakeKraken');
    button.classList.remove('awake');
    void button.offsetWidth;
    button.classList.add('awake');
    $('#krakenReaction').textContent =
      'Whoooosh! The kraken curls its tentacles and sends bubbles through the cave.';
    speak('Whoosh! Hello, Haytham. You found my secret cave!');
  };
  window.scrollTo(0, 0);
}
function bindPictureNames() {
  document.querySelectorAll('[data-portal-name]').forEach(
    b =>
      (b.onclick = () => {
        b.closest('article').classList.add('picture-pop');
        setTimeout(() => b.closest('article')?.classList.remove('picture-pop'), 650);
        speak(b.dataset.portalName);
      })
  );
}
