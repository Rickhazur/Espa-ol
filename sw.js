/* ════════════════════════════════════════════════
   BOGOTÁ AVENTURA — Service Worker v1.0
   Estrategia: Cache-First para assets estáticos
════════════════════════════════════════════════ */

const CACHE_NAME = 'bogota-aventura-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/app.js',
  '/style.css',
  '/manifest.json',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/images/icon-apple.png',
  '/images/monserrate.png',
  '/images/ajiaco.png',
  '/images/bogota_hero.png',
  '/images/catedral_de_sal.png',
  '/images/chorro_de_quevedo.png',
  '/images/andres_carne.png'
];

// INSTALL: pre-cachear todos los assets estaticos
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return Promise.allSettled(
        ASSETS.map(function(url) {
          return cache.add(url).catch(function(err) {
            console.warn('Cache miss (no critico):', url, err);
          });
        })
      );
    }).then(function() { return self.skipWaiting(); })
  );
});

// ACTIVATE: limpiar caches antiguas
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
          .map(function(k) { return caches.delete(k); })
      );
    }).then(function() { return self.clients.claim(); })
  );
});

// FETCH: Cache-first, luego red
self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);

  // Supabase siempre a la red (datos en tiempo real)
  if (url.hostname.indexOf('supabase') !== -1 || url.hostname.indexOf('cdn.jsdelivr') !== -1) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request);
      })
    );
    return;
  }

  // Solo manejar GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;
      return fetch(event.request).then(function(response) {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function(c) { c.put(event.request, clone); });
        return response;
      }).catch(function() {
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});

// Mensaje para forzar actualización
self.addEventListener('message', function(event) {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
