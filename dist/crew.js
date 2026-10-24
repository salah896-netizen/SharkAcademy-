const reefCrew = {
  willa: {
    name: 'Willa',
    species: 'Whale shark',
    subject: 'Reading & stories',
    symbol: 'book',
    colour: '#a5eadf',
    intro:
      'Hello, Haytham! I’m Willa the whale shark. I love words and stories. Milo and I will read with you, one little word at a time.',
    tip: 'Say each sound slowly, then slide the sounds together. We can read it again.'
  },
  tiggy: {
    name: 'Tiggy',
    species: 'Tiger shark',
    subject: 'Counting & maths',
    symbol: 'number',
    colour: '#f4d198',
    intro:
      'Hi, Haytham! I’m Tiggy the tiger shark. Let’s count fish and solve number puzzles! Milo is on our team too.',
    tip: 'Point to each fish once. When you add, start with the first number and count on.'
  },
  gizmo: {
    name: 'Gizmo',
    species: 'Goblin shark',
    subject: 'Shark science',
    symbol: 'science',
    colour: '#f0b9ce',
    intro:
      'Hello, Haytham! I’m Gizmo the goblin shark. I’m a curious shark detective. Let’s explore amazing sharks with Milo!',
    tip: 'Look closely at the picture. Read or listen to the facts again, then look for a clue.'
  },
  dash: {
    name: 'Dash',
    species: 'Mako shark',
    subject: 'Writing',
    symbol: 'pencil',
    colour: '#a8d6ff',
    intro:
      'Hey, Haytham! I’m Dash the mako shark. Let’s practise letters and numbers. I swim fast, but we can write slowly. Milo will stay right here!',
    tip: 'Start at the dot and follow the stroke slowly. Lift your finger between strokes. Every try is practice.'
  }
};
let crewActorCount = 0,
  crewReactionTimer = null,
  crewTipTimer = null;
function crewSymbol(kind) {
  const paths = {
    book: 'M4 7Q10 3 16 7Q22 3 28 7V26Q22 22 16 26Q10 22 4 26ZM16 7V26',
    number: 'M8 8h16M8 24h16M11 4v8M21 20v8M6 16h20',
    science: 'M15 5a9 9 0 1 0 0 18a9 9 0 1 0 0-18M22 22l7 7M15 9v10M10 14h10',
    pencil: 'M5 23L4 29L10 28L28 10L22 4ZM19 7L25 13',
    film: 'M4 5H28V27H4ZM9 5V27M23 5V27M4 11H9M4 21H9M23 11H28M23 21H28M14 11L20 16L14 21Z'
  };
  return `<svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${paths[kind]}"/></svg>`;
}
function crewActor(key) {
  const id = 'crew-' + ++crewActorCount,
    c = reefCrew[key];
  return `<svg class="crew-actor crew-${key}" data-actor="${key}" viewBox="0 0 1536 1024" aria-hidden="true"><defs><clipPath id="${id}-body"><path d="M0 0H1200V1024H0Z"/></clipPath><clipPath id="${id}-tail"><path d="M1198 0H1536V1024H1198Z"/></clipPath></defs><image href="assets/crew-${key}.webp" width="1536" height="1024" clip-path="url(#${id}-body)"/><g class="crew-tail"><image href="assets/crew-${key}.webp" width="1536" height="1024" clip-path="url(#${id}-tail)"/></g><g class="crew-mouth-opening" style="--jaw-x:${key === 'gizmo' ? 350 : 180}px;--jaw-y:525px"><path d="${key === 'gizmo' ? 'M282 540Q349 554 421 520Q377 585 300 558Z' : key === 'willa' ? 'M40 508Q145 522 269 523Q175 569 67 531Z' : key === 'dash' ? 'M145 556Q216 559 289 520Q240 587 158 574Z' : 'M130 540Q208 546 301 490Q230 567 147 554Z'}" fill="#392a3d"/><path d="${key === 'gizmo' ? 'M300 545l8 12 9-9 9 13 9-12 9 11 9-14 10 9 8-12 10 7 8-12' : key === 'willa' ? 'M62 516l5 6 7-5 7 6 8-5 7 7 8-6 8 7 8-6 8 7 8-6 8 7 8-7 8 6 8-7 8 6 8-8' : 'M153 543l8 13 9-9 10 12 9-12 9 10 9-14 10 9 9-13 9 6 9-13 9 5 9-13'}" fill="#fff6db"/><path d="${key === 'gizmo' ? 'M320 562Q360 571 389 549' : 'M167 552Q204 562 240 544'}" stroke="#b16c85" stroke-width="6" stroke-linecap="round" fill="none"/></g></svg>`;
}
function homeCrew() {
  const friend = key => {
    const c = reefCrew[key];
    return `<button class="crew-friend" data-crew-hello="${key}" aria-label="Meet ${c.name} the ${c.species.toLowerCase()}, ${c.subject}" style="--crew-colour:${c.colour};--arrival-delay:${{ willa: 0.1, dash: 1.4, tiggy: 2.7, gizmo: 4 }[key]}s"><span class="crew-swimmer">${crewActor(key)}</span><span class="crew-name">${c.name}<span class="crew-subject-icon">${crewSymbol(c.symbol)}</span></span><small>${c.subject}</small></button>`;
  };
  return `<section class="reef-crew band-crew" aria-label="Milo and his reef friends together"><div class="crew-swim-lane">${friend('willa')}${friend('tiggy')}<button class="crew-friend band-milo" id="greetMilo" aria-label="Hear Milo greet Haytham" style="--crew-colour:#f3dfb1;--arrival-delay:5.4s"><span class="crew-swimmer">${miloActor()}</span><span class="crew-name">Milo</span><small>Your ocean friend</small></button>${friend('gizmo')}${friend('dash')}</div><p id="crewGreeting" class="crew-greeting" aria-live="polite">Tap a friend to say hello.</p></section>`;
}
function crewForRoute() {
  const route = (location.hash.slice(1) || 'home').split('/')[0];
  if (route === 'play')
    return game?.type === 'reading'
      ? 'willa'
      : game?.type === 'fossil' || game?.type === 'science'
        ? 'gizmo'
        : 'tiggy';
  return { stories: 'willa', writing: 'dash', draw: 'dash', museum: 'gizmo', legend: 'gizmo' }[route] || null;
}
function helperSpeak(text, options = {}) {
  speak(text, { ...options, speaker: crewForRoute() || 'milo' });
}
function greetCrew(key) {
  expandTappedShark(key);
  const c = reefCrew[key];
  if (!c) return;
  stopStory();
  const greeting = $('#crewGreeting'),
    message = characterGreetings[key] ? c.name + ' is saying hello to Haytham.' : c.intro;
  if (greeting) greeting.textContent = message;
  showCrewTip(message);
  reactCrew('happy', key);
  if (characterGreetings[key]) playCharacterGreeting(key);
  else speak(c.intro, { speaker: key });
}
function crewHelp(key) {
  if (game?.mission && location.hash === '#play') {
    readingMissionHelp();
    return;
  }
  stopStory();
  const c = reefCrew[key];
  let tip = c.tip;
  const route = (location.hash.slice(1) || 'home').split('/')[0];
  if (route === 'play' && game && !game.answered) {
    game.assisted = true;
    tip = game.items[game.index].hint.replaceAll('🐟', 'fish');
    const feedback = $('.feedback');
    if (feedback) feedback.textContent = c.name + ': ' + tip;
  } else if (route === 'writing') {
    tip = $('.writing-hint p')?.textContent || tip;
  } else if (route === 'stories') {
    tip =
      $('#storyText')?.textContent?.trim() ||
      'Choose a story picture. We can read it together, then you can have a go.';
  } else if (route === 'museum') {
    app.dataset.scienceHelped = 'true';
    const article = sharkBook.find(s => s.id === location.hash.split('/')[1]);
    if (article) tip = article.intro + ' ' + article.facts[0].join('. ');
    else
      tip =
        $('.topic-text')?.textContent ||
        'Choose a shark picture. We’ll explore it together. Milo is right here.';
  }
  const message = $('#crewTip');
  if (message) message.textContent = tip;
  showCrewTip(tip);
  reactCrew('thinking', key);
  speak(tip, { speaker: key });
}
function reactCrew(mood, key = crewForRoute()) {
  if (!key) return;
  clearTimeout(crewReactionTimer);
  document.body.dataset.crewReaction = mood;
  document.body.dataset.reactingCrew = key;
  crewReactionTimer = setTimeout(() => {
    delete document.body.dataset.crewReaction;
    delete document.body.dataset.reactingCrew;
  }, 2300);
}
function syncCrew() {
  syncSecrets();
  const key = crewForRoute();
  document.body.dataset.helper = key || '';
  if (!key) {
    $('#subjectHelper')?.remove();
    return;
  }
  if ($('#subjectHelper')?.dataset.crew === key) return;
  $('#subjectHelper')?.remove();
  const c = reefCrew[key],
    band = document.createElement('section');
  band.id = 'subjectHelper';
  band.className = 'subject-helper';
  band.dataset.crew = key;
  band.style.setProperty('--crew-colour', c.colour);
  band.setAttribute('aria-label', c.name + ', your ' + c.subject.toLowerCase() + ' helper');
  band.innerHTML = `<button class="helper-character" data-crew-hello="${key}" aria-label="Say hello to ${c.name}"><span class="helper-facing">${crewActor(key)}</span></button><div class="helper-intro"><span class="helper-eyebrow">${crewSymbol(c.symbol)} ${c.subject}</span><h2>${c.name} <small>the ${c.species.toLowerCase()}</small></h2><p id="crewTip" aria-live="polite">${key === 'dash' ? 'Let’s write slowly, one stroke at a time.' : key === 'willa' ? 'Let’s read together, one word at a time.' : key === 'tiggy' ? 'Let’s count and work it out together.' : 'Let’s look for clues together.'} Milo’s here too!</p></div><button class="helper-help" data-crew-help="${key}" aria-label="Ask ${c.name} for help">♫ <span>Help me</span></button>`;
  app.prepend(band);
}
function initReefCrew() {
  app.addEventListener('click', e => {
    const hello = e.target.closest('[data-crew-hello]'),
      help = e.target.closest('[data-crew-help]');
    if (hello) greetCrew(hello.dataset.crewHello);
    if (help) crewHelp(help.dataset.crewHelp);
  });
  new MutationObserver(syncCrew).observe(app, { childList: true });
  syncCrew();
}
// Add supplied, self-hosted video records here when the family’s content is ready.
// {title:'...',src:'videos/....mp4',poster:'assets/....jpg',captions:'videos/....vtt'}
const cinemaVideos = [];
function cinema() {
  app.innerHTML = `<section class="cinema-page"><span class="tag">THE REEF PICTURE HOUSE</span><h1>Shark Cinema</h1><div class="reef-cinema ${cinemaVideos.length ? '' : 'cinema-waiting'}"><div class="cinema-lantern lantern-left"></div><div class="cinema-lantern lantern-right"></div><div class="cinema-beam"></div><div class="cinema-screen">${cinemaVideos.length ? '<video id="sharkMovie" controls playsinline preload="metadata" aria-label="Shark cinema video"></video>' : `<span class="cinema-film-icon">${crewSymbol('film')}</span><h2>Coming soon</h2><p>Shark adventures for you and Milo.</p>`}</div><div class="cinema-audience seashell-audience"><button class="cinema-seashells" id="cinemaMilo" aria-label="Watch Milo swim into his seashell seat, facing the screen"><svg class="cinema-seating-scene" viewBox="0 0 1536 1024" aria-hidden="true"><g class="cinema-seated-milo arriving">${cinemaRearMilo()}</g><image href="assets/cinema-seats-rear.webp" width="1536" height="1024"/></svg><span class="shell-seat-label">Haytham’s seat</span></button></div></div>${cinemaVideos.length ? `<div class="cinema-choices">${cinemaVideos.map((v, i) => `<button data-movie="${i}">${v.title}</button>`).join('')}</div>` : '<p class="cinema-note">Your shark films will appear here when they’re ready.</p>'}<a class="back-link" href="#home">← Back to reef</a></section>`;
  $('#cinemaMilo').onclick = () => {
    const actor = $('.cinema-seated-milo');
    actor.classList.remove('arriving');
    void actor.getBoundingClientRect();
    actor.classList.add('arriving');
    speak('I’m coming, Haytham! Let me settle into my shell. This seat beside me is just for you.');
  };
  if (cinemaVideos.length) {
    const player = $('#sharkMovie');
    const select = index => {
      const v = cinemaVideos[index];
      player.pause();
      player.src = v.src;
      player.poster = v.poster || '';
      player.replaceChildren();
      if (v.captions) {
        const track = document.createElement('track');
        track.kind = 'captions';
        track.src = v.captions;
        track.srclang = 'en';
        track.label = 'English';
        player.append(track);
      }
      player.load();
    };
    document
      .querySelectorAll('[data-movie]')
      .forEach(b => (b.onclick = () => select(+b.dataset.movie)));
    player.onplay = () => {
      stopStory();
      document.body.classList.add('cinema-playing');
      fadeMusic(musicCurrent, 0, 200);
    };
    const restore = () => {
      document.body.classList.remove('cinema-playing');
      fadeMusic(musicCurrent, musicTarget(), 400);
    };
    player.onpause = restore;
    player.onended = restore;
    select(0);
  }
  updateMilo(
    'I’ve saved you a seat, Haytham. We’ll watch shark adventures together when the films are ready.'
  );
}

function crewGameBadge(type) {
  const key = type === 'reading' ? 'willa' : type === 'fossil' ? 'gizmo' : 'tiggy';
  return `<span class="crew-game-badge"><img src="assets/crew-${key}.webp" alt="">${reefCrew[key].name}</span>`;
}
function cinemaPortal() {
  return `<article class="picture-destination portal-cinema"><a href="#cinema" aria-label="Shark Cinema"><div class="picture-cinema-art">${crewSymbol('film')}<img class="portal-shell-seats" src="assets/cinema-seats-rear.webp" alt=""></div><div class="picture-title"><h2>Shark Cinema</h2><span class="picture-go" aria-hidden="true">▶</span></div></a><button class="picture-listen" data-portal-name="Shark Cinema" aria-label="Hear Shark Cinema">♫</button></article>`;
}

function cinemaRearMilo() {
  const id = 'cinema-rear-' + ++miloActorCount;
  return `<svg x="-160" y="50" width="1000" height="667" viewBox="0 0 1536 1024"><defs><clipPath id="${id}-body"><path d="M0 0H1536V1024H0Z M0 575H480L650 700L700 1024H0Z" clip-rule="evenodd"/></clipPath><clipPath id="${id}-tail"><path d="M0 575H480L650 700L700 1024H0Z"/></clipPath></defs><image href="assets/cinema-milo-rear.webp" width="1536" height="1024" clip-path="url(#${id}-body)"/><g class="cinema-rear-tail"><image href="assets/cinema-milo-rear.webp" width="1536" height="1024" clip-path="url(#${id}-tail)"/></g></svg>`;
}

function showCrewTip(text) {
  const host = $('#subjectHelper');
  if (!host) return;
  const tip = $('#crewTip');
  if (tip) tip.textContent = text;
  host.classList.add('show-tip');
  clearTimeout(crewTipTimer);
  crewTipTimer = setTimeout(() => host.classList.remove('show-tip'), 9000);
}

const adventureInvites = {
  museum: { key: 'gizmo', text: 'I’m Gizmo! Let’s explore sharks, Haytham. Let’s do it!' },
  expeditions: { key: 'tiggy', text: 'I’m Tiggy! Let’s count some fish, Haytham. Let’s do it!' },
  writing: { key: 'dash', text: 'I’m Dash! Let’s write together, Haytham. Let’s do it!' },
  stories: { key: 'willa', text: 'I’m Willa! Let’s read a story, Haytham. Let’s do it!' }
};
let adventureHoverTimer = null,
  pendingAdventureInvite = null,
  lastAdventureInvite = '',
  lastAdventureTime = 0;
function previewAdventure(route) {
  const invitation = adventureInvites[route];
  if (!invitation) return;
  document.body.dataset.previewHelper = invitation.key;
  const label = $('#crewGreeting');
  if (label) label.textContent = invitation.text;
  if (lastAdventureInvite !== route || Date.now() - lastAdventureTime > 4500) {
    lastAdventureInvite = route;
    lastAdventureTime = Date.now();
    speak(invitation.text, { speaker: invitation.key });
  }
}
function clearAdventurePreview() {
  clearTimeout(adventureHoverTimer);
  delete document.body.dataset.previewHelper;
}
function bindAdventureInvites() {
  document.querySelectorAll('.picture-ocean-paths .picture-destination').forEach(tile => {
    const link = tile.querySelector('a'),
      route = link.hash.slice(1),
      invitation = adventureInvites[route];
    if (!invitation) return;
    tile.dataset.adventureHelper = invitation.key;
    tile.style.setProperty('--helper-accent', reefCrew[invitation.key].colour);
    tile.addEventListener('pointerenter', e => {
      if (e.pointerType === 'touch') return;
      clearTimeout(adventureHoverTimer);
      document.body.dataset.previewHelper = invitation.key;
      adventureHoverTimer = setTimeout(() => previewAdventure(route), 220);
    });
    tile.addEventListener('pointerleave', clearAdventurePreview);
    link.addEventListener('focus', () => previewAdventure(route));
    link.addEventListener('blur', clearAdventurePreview);
    link.addEventListener('pointerdown', e => {
      if (e.pointerType === 'touch') {
        document.body.dataset.previewHelper = invitation.key;
        pendingAdventureInvite = route;
      }
    });
    link.addEventListener('click', () => {
      clearTimeout(adventureHoverTimer);
      if (lastAdventureInvite !== route || Date.now() - lastAdventureTime > 4500)
        pendingAdventureInvite = route;
    });
    const listen = tile.querySelector('.picture-listen');
    if (listen) listen.onclick = () => previewAdventure(route);
  });
}
function playPendingAdventureInvite(route) {
  clearAdventurePreview();
  if (pendingAdventureInvite !== route) {
    pendingAdventureInvite = null;
    return;
  }
  pendingAdventureInvite = null;
  const invitation = adventureInvites[route];
  lastAdventureInvite = route;
  lastAdventureTime = Date.now();
  setTimeout(() => {
    if ((location.hash.slice(1) || 'home').split('/')[0] !== route) return;
    showCrewTip(invitation.text);
    reactCrew('happy', invitation.key);
    speak(invitation.text, { speaker: invitation.key });
  }, 100);
}

function expandTappedShark(key) {
  const button =
    key === 'milo'
      ? $('#greetMilo')
      : document.querySelector('.band-crew [data-crew-hello="' + key + '"]');
  if (!button) return;
  button.classList.add('is-expanded');
  setTimeout(() => button.classList.remove('is-expanded'), 1800);
}
