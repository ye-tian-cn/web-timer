const CACHE_NAME = 'timer-app-v2';

// Added radar.mp3 to the core assets tracking table
const ASSETS = [
  'index.html',
  'manifest.json',
  'radar.mp3'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
