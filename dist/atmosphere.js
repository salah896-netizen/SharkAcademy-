const oceanWorlds = {
  cinema: { image: 'stories', name: 'The Reef Picture House', track: 'stories' },
  home: { image: 'home', name: 'The Lost City', track: 'home' },
  museum: { image: 'sharks', name: 'The Blue Beyond', track: 'sharks' },
  expeditions: { image: 'learning', name: 'Corsair Reef', track: 'learning' },
  play: { image: 'learning', name: 'Corsair Reef', track: 'learning' },
  writing: { image: 'lagoon', name: 'Pearl Lagoon', track: 'writing' },
  stories: { image: 'stories', name: 'The Story Grotto', track: 'stories' },
  legend: { image: 'stories', name: 'The Kraken Grotto', track: 'sharks' },
  collection: { image: 'learning', name: 'The Treasure Anchorage', track: 'collection' }
};
let worldSide = 0,
  lastWorld = '',
  musicUnlocked = false,
  musicCurrent = null,
  musicCurrentTrack = '',
  musicFade = 0,
  musicEnabled = true,
  musicVolume = 0.27,
  musicContext = null;
const musicBuffers = new Map();
try {
  musicEnabled = localStorage.getItem('haytham-music') !== 'off';
  const rawVolume = localStorage.getItem('haytham-music-volume'),
    savedVolume = Number(rawVolume);
  if (rawVolume !== null && savedVolume >= 0 && savedVolume <= 0.5) musicVolume = savedVolume;
} catch {}
function worldImage(key) {
  return key === 'lagoon' ? 'assets/reef-background.jpg' : `assets/world-${key}.jpg`;
}
function setOceanWorld(route) {
  const world = oceanWorlds[route] || oceanWorlds.home;
  document.body.dataset.world = world.image;
  if (lastWorld !== world.image) {
    worldSide = 1 - worldSide;
    const next = $('#world' + worldSide),
      old = $('#world' + (1 - worldSide));
    next.style.backgroundImage = `url('${worldImage(world.image)}')`;
    next.style.opacity = '1';
    old.style.opacity = '0';
    lastWorld = world.image;
  }
  document.documentElement.style.setProperty(
    '--world-accent',
    route === 'stories'
      ? '#d0b6e7'
      : route === 'expeditions' || route === 'play'
        ? '#f5cb80'
        : route === 'writing'
          ? '#b6e5ca'
          : '#a6e5e4'
  );
  document.body.classList.remove('scene-enter');
  void app.offsetWidth;
  document.body.classList.add('scene-enter');
  updateAdventureMusic();
  updateMusicButton();
}
function musicTarget() {
  return document.hidden || !musicEnabled || document.body.classList.contains('cinema-playing')
    ? 0
    : document.body.classList.contains('milo-speaking') ||
        document.body.classList.contains('helper-speaking')
      ? musicVolume * 0.2
      : musicVolume;
}
function fadeMusic(player, target, milliseconds = 550) {
  if (!player || !musicContext) return;
  const now = musicContext.currentTime,
    gain = player.gain.gain;
  gain.cancelScheduledValues(now);
  gain.setValueAtTime(gain.value, now);
  gain.linearRampToValueAtTime(target, now + milliseconds / 1000);
}
async function loadMusic(track) {
  if (!musicBuffers.has(track))
    musicBuffers.set(
      track,
      fetch(`audio/${track}.m4a`)
        .then(r => {
          if (!r.ok) throw new Error('Music unavailable');
          return r.arrayBuffer();
        })
        .then(data => musicContext.decodeAudioData(data))
        .catch(error => {
          musicBuffers.delete(track);
          throw error;
        })
    );
  return musicBuffers.get(track);
}
function updateMusicButton() {
  const button = $('#music');
  if (!button) return;
  button.innerHTML = `${paintedIcon(musicEnabled ? 'note' : 'note-off')}${musicEnabled ? (musicUnlocked ? '' : ' Play') : ' Off'}`;
  button.setAttribute('aria-pressed', String(musicEnabled));
  button.setAttribute(
    'aria-label',
    musicEnabled
      ? musicUnlocked
        ? 'Turn adventure music off'
        : 'Start adventure music'
      : 'Turn adventure music on'
  );
  button.title = musicEnabled ? 'Adventure music · tap to mute' : 'Adventure music · tap to play';
}
async function updateAdventureMusic() {
  if (!musicUnlocked || !musicEnabled || !musicContext) return;
  const route = (location.hash.slice(1) || 'home').split('/')[0],
    // The race has its own livelier tune; drawing shares the calm writing theme.
    track =
      { race: 'race', draw: 'writing', path: 'learning', library: 'home' }[route] ||
      (oceanWorlds[route] || oceanWorlds.home).track;
  if (musicCurrent && musicCurrentTrack === track) {
    fadeMusic(musicCurrent, musicTarget());
    return;
  }
  const token = ++musicFade;
  try {
    const buffer = await loadMusic(track);
    if (token !== musicFade || !musicEnabled) return;
    const previous = musicCurrent,
      source = musicContext.createBufferSource(),
      gain = musicContext.createGain();
    source.buffer = buffer;
    source.loop = true;
    // Each music file carries a 0.064 s wrap-around margin at both ends (research/music/
    // compose.py); looping the middle keeps the repeat seamless on every device.
    const pad = 2048 / 32000;
    if (buffer.duration > pad * 4) {
      source.loopStart = pad;
      source.loopEnd = buffer.duration - pad;
    }
    gain.gain.value = 0;
    source.connect(gain);
    gain.connect(musicContext.destination);
    musicCurrent = { source, gain };
    musicCurrentTrack = track;
    source.start(0, buffer.duration > (2048 / 32000) * 4 ? 2048 / 32000 : 0);
    fadeMusic(musicCurrent, musicTarget(), 1200);
    if (previous) {
      fadeMusic(previous, 0, 1000);
      previous.source.stop(musicContext.currentTime + 1.2);
      previous.source.onended = () => {
        previous.source.disconnect();
        previous.gain.disconnect();
      };
    }
    updateMusicButton();
  } catch {
    musicUnlocked = false;
    updateMusicButton();
  }
}
function openMusicContext() {
  if (!musicContext) {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return false;
    musicContext = new Context();
  }
  musicContext.resume().catch(() => {
    musicUnlocked = false;
    updateMusicButton();
  });
  return true;
}
function unlockAdventureMusic() {
  if (!musicEnabled || musicUnlocked) return;
  if (!openMusicContext()) return;
  musicUnlocked = true;
  updateAdventureMusic();
  updateMusicButton();
}
function toggleAdventureMusic() {
  if (!musicUnlocked) {
    musicEnabled = true;
    if (!openMusicContext()) return;
    musicUnlocked = true;
    updateAdventureMusic();
  } else {
    musicEnabled = !musicEnabled;
    musicFade++;
    if (musicEnabled) {
      openMusicContext();
      updateAdventureMusic();
    } else fadeMusic(musicCurrent, 0, 300);
  }
  try {
    localStorage.setItem('haytham-music', musicEnabled ? 'on' : 'off');
  } catch {}
  updateMusicButton();
}
function initOceanAtmosphere() {
  $('#brandMilo').innerHTML = miloActor();
  $('#launchMilo').innerHTML = miloActor();
  const host = $('#livingOcean');
  host.innerHTML =
    Array.from({ length: 13 }, (_, i) => `<i class="ocean-drift" style="--n:${i}"></i>`).join('') +
    `<div class="far-fish fish-drift-one" aria-hidden="true">${sharkSilhouette}</div><div class="far-fish fish-drift-two" aria-hidden="true">${sharkSilhouette}</div>`;
  $('#music').onclick = toggleAdventureMusic;
  document.addEventListener(
    'pointerdown',
    e => {
      if (!e.target.closest('#music')) unlockAdventureMusic();
    },
    { passive: true }
  );
  document.addEventListener('keydown', e => {
    if (['Enter', ' '].includes(e.key) && e.target.id !== 'music') unlockAdventureMusic();
  });
  new MutationObserver(() => fadeMusic(musicCurrent, musicTarget(), 350)).observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (musicContext) musicContext.suspend().catch(() => {});
    } else if (musicUnlocked && musicEnabled) {
      openMusicContext();
      updateAdventureMusic();
    }
  });
  updateMusicButton();
  window.addEventListener('scroll', updateMiloDock, { passive: true });
  window.addEventListener('resize', updateMiloDock);
}

let launchStarted = false;
function finishLaunch() {
  if (launchStarted) return;
  launchStarted = true;
  const world = oceanWorlds[(location.hash.slice(1) || 'home').split('/')[0]] || oceanWorlds.home,
    img = new Image();
  img.src = worldImage(world.image);
  const loaded = img.decode ? img.decode().catch(() => {}) : Promise.resolve();
  Promise.race([
    Promise.allSettled([
      loaded,
      document
        .querySelector('.welcome-treasure-art')
        ?.decode()
        .catch(() => {}),
      document.fonts.ready
    ]),
    new Promise(resolve => setTimeout(resolve, 3500))
  ]).then(() => {
    const screen = $('#launchScreen');
    screen.classList.add('launch-done');
    setTimeout(() => {
      screen.hidden = true;
      screen.setAttribute('aria-hidden', 'true');
    }, 450);
  });
}
function updateMiloDock() {
  const host = $('#miloCompanion');
  if (!host) return;
  const hero = document.querySelector('.reef-scene');
  if (document.body.dataset.route === 'home') {
    host.hidden = !!hero && hero.getBoundingClientRect().bottom > 110;
    host.classList.remove('dock-above-writing');
    return;
  }
  if (document.body.dataset.route === 'cinema') {
    const seat = document.querySelector('.cinema-audience')?.getBoundingClientRect();
    host.hidden = !!seat && seat.top < innerHeight - 100 && seat.bottom > 100;
    host.classList.remove('dock-above-writing');
    return;
  }
  host.hidden = false;
  host.classList.remove('dock-above-writing');
}
