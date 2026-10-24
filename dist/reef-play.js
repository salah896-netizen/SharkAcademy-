function reefCreature(type) {
  if (type === 'submarine')
    return `<svg viewBox="0 0 220 130" aria-hidden="true"><path d="M83 45V20h45v12h-31v15" fill="none" stroke="#eab651" stroke-width="10" stroke-linejoin="round"/><path d="M175 68l30-15v44l-30-14" fill="#e29b2e"/><rect x="17" y="43" width="170" height="62" rx="31" fill="#ffc65a"/><path d="M38 96h125" stroke="#de9d37" stroke-width="10" stroke-linecap="round"/><g fill="#73d9eb" stroke="#fff0a7" stroke-width="6"><circle cx="59" cy="72" r="17"/><circle cx="108" cy="72" r="17"/><circle cx="155" cy="72" r="12"/></g><circle cx="50" cy="66" r="5" fill="white" opacity=".8"/><path class="sub-sonar" d="M8 58Q-10 72 8 86" fill="none" stroke="#aef6e3" stroke-width="3"/></svg>`;
  if (type === 'turtle')
    return `<svg viewBox="0 0 200 150" aria-hidden="true"><g class="turtle-flippers" fill="#70ad8c"><path d="M70 65Q38 10 20 28Q22 63 66 87M120 65Q155 9 170 31Q171 60 132 86M77 109Q55 147 40 128L64 97M124 104Q155 141 167 124L138 94"/></g><ellipse cx="101" cy="83" rx="49" ry="39" fill="#477f67" stroke="#a0c995" stroke-width="5"/><path d="M80 52l38 0 20 31-20 28H80L61 83Z" fill="#6da477" stroke="#b1d1a4" stroke-width="3"/><path d="M97 53v57M62 83h76" stroke="#a6c799" stroke-width="3"/><ellipse cx="101" cy="29" rx="22" ry="24" fill="#83b992"/><circle cx="91" cy="24" r="3" fill="#163f43"/><circle cx="111" cy="24" r="3" fill="#163f43"/><path d="M94 37q7 5 14 0" fill="none" stroke="#38685a" stroke-width="2"/></svg>`;
  if (type === 'chest')
    return `<svg viewBox="0 0 180 140" aria-hidden="true"><g class="treasure-lid"><path d="M23 65V45Q90-6 157 45v20Z" fill="#bd713d" stroke="#e5b664" stroke-width="7"/><path d="M50 27v37M130 27v37" stroke="#f7cd75" stroke-width="10"/></g><path d="M23 68h134l-8 55H31Z" fill="#9c562f" stroke="#e5b664" stroke-width="7"/><path d="M52 72v46M130 72v46" stroke="#edbd65" stroke-width="10"/><rect x="79" y="65" width="23" height="30" rx="4" fill="#ffe2a4"/><circle class="treasure-pearl" cx="90" cy="45" r="17" fill="#d4fff2"/><path d="M90 5v14M54 17l10 12M126 17l-10 12" stroke="#b0f7de" stroke-width="4"/></svg>`;
  return `<svg viewBox="0 0 140 140" aria-hidden="true"><path d="M10 130Q18 40 49 94Q62 125 69 68Q77 2 106 20Q132 44 95 65" fill="none" stroke="#9e8dc5" stroke-width="22" stroke-linecap="round"/><path d="M11 128Q20 51 49 99" fill="none" stroke="#d6afdd" stroke-width="4" stroke-dasharray="2 9"/></svg>`;
}
function reefMysteries() {
  return `<div class="reef-mysteries" aria-label="Reef surprises"><button class="reef-hotspot sub-hotspot" data-mystery="submarine" aria-label="Explore the little submarine">${reefCreature('submarine')}<span class="hotspot-spark">✦</span></button><button class="reef-hotspot turtle-hotspot" data-mystery="turtle" aria-label="Say hello to the sea turtle">${reefCreature('turtle')}<span class="hotspot-spark">✦</span></button><button class="reef-hotspot chest-hotspot" data-mystery="chest" aria-label="Open the mystery treasure chest">${reefCreature('chest')}<span class="hotspot-spark">✦</span></button><button class="reef-hotspot kraken-hotspot" data-mystery="kraken" aria-label="Discover the kraken’s secret cave">${reefCreature('kraken')}<span class="hotspot-spark">✦</span></button><p id="reefDiscovery" class="reef-discovery" aria-live="polite"></p></div>`;
}
function bindReefMysteries() {
  document.querySelectorAll('[data-mystery]').forEach(
    button =>
      (button.onclick = () => {
        const type = button.dataset.mystery;
        button.classList.remove('discovered');
        void button.offsetWidth;
        button.classList.add('discovered');
        const texts = {
          submarine:
            'You found the little research submarine! Ping, ping! Its crew is exploring the reef.',
          turtle:
            'Hello, sea turtle! Watch those flippers go. Turtles breathe air and come up to the surface.',
          chest: 'You found a secret pearl! The reef has so many little surprises.',
          kraken: 'A curling tentacle! You found the kraken cave. Shall we meet this sea legend?'
        };
        $('#reefDiscovery').textContent = texts[type];
        speak(texts[type]);
        if (type === 'kraken') openKraken();
        if (type === 'chest') {
          state.reefSecrets = state.reefSecrets || [];
          if (!state.reefSecrets.includes(type)) {
            state.reefSecrets.push(type);
            state.xp += PEARLS.extra;
            save();
            const pearls = document.querySelector('.ocean-progress>span:last-child');
            if (pearls) pearls.innerHTML = state.xp + ' <small>PEARLS</small>';
          }
        }
      })
  );
}
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
function picturePortal(key, title, desc, route) {
  return `<article class="picture-destination"><a href="#${route}" aria-label="${title}"><img src="assets/visual-${key}.jpg" alt="" loading="eager"><div class="picture-title"><h2>${title}</h2><span class="picture-go" aria-hidden="true">▶</span></div></a><button class="picture-listen" data-portal-name="${title}" aria-label="Hear ${title}">♫</button></article>`;
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
