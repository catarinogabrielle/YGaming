const CACHE_NAME = 'ygaming-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
  // Você pode adicionar os nomes das suas imagens aqui, como '/logo.png'
];

// Instala o service worker e faz o cache dos arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições para carregar mais rápido
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Retorna do cache se existir
        }
        return fetch(event.request); // Puxa da internet se não tiver no cache
      })
  );
});