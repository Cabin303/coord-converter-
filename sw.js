const CACHE_NAME = 'coord-app-v3';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// установка — жёстко кэшируем всё
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// активация
self.addEventListener('activate', (event) => {
  self.clients.claim();
});

// всегда сначала кэш
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
