// Service Worker: MP4 files werden NICHT abgefangen
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', event => {
  // MP4 komplett ignorieren - direkt ans Netzwerk
  if (event.request.url.includes('.mp4')) return;
});
