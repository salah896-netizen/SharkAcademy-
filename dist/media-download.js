/* Gentle offline download (25 Oct). The first open used to download about 80 MB before
 * anything else; now only the app itself comes first (a few MB), and voices and shark photos
 * are saved as they're used. Once the app is open and the iPad is idle, this fetches the rest in
 * small batches (a few files at a time, with pauses), so after a while everything works
 * offline. It stops when offline, on data-saver, or while a lesson is speaking, and picks up
 * again next time. The service worker keeps these files across app updates. */
(function () {
  if (!('caches' in window) || !('serviceWorker' in navigator)) return;
  const MEDIA = 'haytham-media-v1',
    BATCH = 6,
    PAUSE = 1500;
  function mediaUrls() {
    const urls = new Set();
    if (typeof voiceManifest !== 'undefined') {
      Object.values(voiceManifest.lines).forEach(f => urls.add(new URL(f, location.href).href));
      Object.values(voiceManifest.sounds).forEach(f => urls.add(new URL(f, location.href).href));
    }
    if (typeof quizPhotoData !== 'undefined')
      Object.values(quizPhotoData).forEach(p => urls.add(new URL('assets/' + p.file, location.href).href));
    if (typeof sharkPhotoData !== 'undefined')
      Object.values(sharkPhotoData)
        .flat()
        .forEach(p => urls.add(new URL('assets/' + p.file, location.href).href));
    return [...urls];
  }
  async function missing() {
    const cache = await caches.open(MEDIA),
      have = new Set((await cache.keys()).map(r => r.url));
    return mediaUrls().filter(u => !have.has(u));
  }
  const busy = () =>
    !navigator.onLine ||
    navigator.connection?.saveData ||
    document.hidden ||
    document.body.classList.contains('milo-speaking') ||
    document.body.classList.contains('helper-speaking');
  async function run() {
    await navigator.serviceWorker.ready;
    let queue = await missing();
    window.mediaDownload = { total: mediaUrls().length, left: queue.length };
    while (queue.length) {
      if (busy()) {
        await new Promise(r => setTimeout(r, 5000));
        continue;
      }
      const batch = queue.splice(0, BATCH);
      // Fetched through the service worker, which saves each one in the media cache.
      await Promise.all(batch.map(u => fetch(u).catch(() => queue.push(u))));
      window.mediaDownload.left = queue.length;
      await new Promise(r => setTimeout(r, PAUSE));
    }
  }
  const start = () => setTimeout(() => run().catch(() => {}), 8000);
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);
})();
