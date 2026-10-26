
const CACHE = 'haytham-sharks-v99';
const FILES = [
  './assets/fossil-gateway-carved.webp',
  './assets/writing-sand.svg',
  './calm-scenes.js',
  './school-pack.js',
  './school-pack.css',
  './race.js',
  './race.css',
  './path.js',
  './path.css',
  './science.js',
  './science.css',
  './opening.js',
  './opening.css',
  './shark-taps.js',
  './media-download.js',
  './shark-taps.css',
  './encyclopedia-more.js',
  './encyclopedia-more.css',
  './draw-shark.js',
  './draw-shark.css',
  './kid-buttons.js',
  './kid-buttons.css',
  './home-play.js',
  './home-play.css',
  './feedback-round3.js',
  './feedback-round3.css',
  './learning-checks.js',
  './learning-checks.css',
  './quiz-photos.js',
  './quiz-pictures.js',
  './quiz-pictures.css',
  './lessons-more.js',
  './lessons-more.css',
  './manifest.webmanifest',
  './assets/icons/apple-touch-icon.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './calm-scenes.css',
  './hands-on-sharing.js',
  './hands-on-sharing.css',
  './lesson-pack.js',
  './ocean-experience.js',
  './ocean-experience.css',
  './reading-adventure.js',
  './reading-adventure.css',
  './recorded-voices.js',
  './audio/milo-welcome.mp3',
  './audio/willa-welcome.mp3',
  './audio/gizmo-welcome.mp3',
  './audio/tiggy-welcome.mp3',
  './audio/dash-welcome.mp3',
  './shark-school.js',
  './shark-school.css',
  './assets/goblin-shark.jpg',
  './assets/mako-shark.jpg',
  './assets/basking-shark.jpg',
  './assets/epaulette-shark.jpg',
  './secrets.js',
  './band.css',
  './ocean-titles.css',
  './assets/title-reef.svg',
  './assets/haytham-surfboard-bite.webp',
  './crew.js',
  './crew.css',
  './assets/crew-willa.webp',
  './assets/crew-tiggy.webp',
  './assets/crew-gizmo.webp',
  './assets/crew-dash.webp',
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.webmanifest',
  './assets/icon.svg',
  './assets/whale-shark.jpg',
  './assets/reef-background.jpg',
  './assets/milo-3d.webp',
  './assets/white-shark.jpg',
  './assets/hammerhead.jpg',
  './assets/tiger-shark.jpg',
  './premium.css',
  './encyclopedia.js',
  './writing.js',
  './companion.js',
  './learning.js',
  './stories.js',
  './milo.css',
  './reef-play.js',
  './visual-play.css',
  './atmosphere.js',
  './ocean-worlds.css',
  './audio/home.m4a',
  './audio/race.m4a',
  './audio/learning.m4a',
  './audio/sharks.m4a',
  './audio/writing.m4a',
  './audio/stories.m4a',
  './audio/collection.m4a',
  './assets/world-home.jpg',
  './assets/world-learning.jpg',
  './assets/world-sharks.jpg',
  './assets/world-stories.jpg',
  './assets/visual-sharks.jpg',
  './assets/visual-adventure.jpg',
  './assets/visual-writing.jpg',
  './assets/visual-stories.jpg',
  './assets/visual-fossil.jpg',
  './assets/visual-megalodon.jpg',
  './assets/visual-kraken.jpg'
];
// Two caches (25 Oct): the app itself (versioned, small, replaced on every update) and the
// media library (voice clips and shark photos, about 80 MB, kept across updates). Media files
// are named by their content, so a kept file is never stale. New media is saved the first time
// it's used, and the page quietly downloads the rest in small batches for offline play
// (media-download.js).
const MEDIA = 'haytham-media-v1';
const isMedia = url => /\/audio\/voice\/|\/assets\/sharks\//.test(new URL(url).pathname);
self.addEventListener('install', e => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then(c =>
        c.addAll(
          [...FILES, './voice-manifest.js', './voice-clips.js', './shark-photos.js']
            .filter((url, i, all) => all.indexOf(url) === i)
            .map(url => new Request(url, { cache: 'reload' }))
        )
      )
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(k => k.startsWith('haytham-sharks-') && k !== CACHE)
            .map(k => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});
async function mediaResponse(request) {
  const cache = await caches.open(MEDIA),
    url = request.url.split('#')[0];
  const hit = await cache.match(url);
  if (hit) return hit;
  const response = await fetch(url);
  if (response.ok && response.status === 200) await cache.put(url, response.clone());
  return response;
}
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  const range = e.request.headers.get('range');
  if (isMedia(e.request.url)) {
    e.respondWith(
      mediaResponse(e.request).then(r =>
        range && r.ok ? cachedAudioRange(r.clone(), range) : r
      )
    );
    return;
  }
  e.respondWith(
    caches
      .match(e.request)
      .then(hit =>
        hit && range && new URL(e.request.url).pathname.includes('/audio/')
          ? cachedAudioRange(hit, range)
          : hit || fetch(e.request)
      )
  );
});

// Safari may request byte ranges even for a short MP3. Serve them from the offline pack.
async function cachedAudioRange(response, range) {
  const data = await response.arrayBuffer(),
    size = data.byteLength,
    match = /^bytes=(\d*)-(\d*)$/.exec(range || '');
  if (!match || (!match[1] && !match[2]))
    return new Response(null, { status: 416, headers: { 'Content-Range': 'bytes */' + size } });
  let start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2])),
    end = match[1] ? (match[2] ? Math.min(size - 1, Number(match[2])) : size - 1) : size - 1;
  if (
    !Number.isSafeInteger(start) ||
    !Number.isSafeInteger(end) ||
    start < 0 ||
    start >= size ||
    end < start
  )
    return new Response(null, { status: 416, headers: { 'Content-Range': 'bytes */' + size } });
  const headers = new Headers(response.headers);
  headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
  headers.set('Content-Length', String(end - start + 1));
  headers.set('Accept-Ranges', 'bytes');
  return new Response(data.slice(start, end + 1), { status: 206, headers });
}
