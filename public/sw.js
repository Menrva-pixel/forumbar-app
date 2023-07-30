const CACHE_NAME = 'ForumBar-Cache';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.js',
        '/static/css/main.chunk.css',
        '/static/js/bundle.js',
        '/static/js/main.chunk.js',
        '/static/media/logo.svg',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
