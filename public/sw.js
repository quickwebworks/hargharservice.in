/* Har Ghar Service — Service Worker
   Network-first for pages & APIs; cache-first only for static images/fonts.
   Auth, booking, payment and admin requests are NEVER cached. */

const CACHE_VERSION = 'hgs-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;

const OFFLINE_URL = '/offline';

// Static assets that are safe to cache (immutable-ish)
const STATIC_ASSETS = [
  OFFLINE_URL,
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// Never cache these (transactional / private)
const NETWORK_ONLY = [
  /\/api\/auth\//,
  /\/api\/bookings/,
  /\/api\/payments/,
  /\/api\/admin\//,
  /\/api\/contact/,
  /\/api\/packages/, // live data
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => !k.startsWith(CACHE_VERSION)).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

const isNetworkOnly = (url) => NETWORK_ONLY.some((re) => re.test(url.pathname));
const isStaticAsset = (url) =>
  /\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico|woff|woff2|ttf|otf)$/i.test(url.pathname);

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Transactional/private → always network
  if (isNetworkOnly(url)) {
    event.respondWith(fetch(request));
    return;
  }

  // Navigation requests → network-first, offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(request);
        return cached || cache.match(OFFLINE_URL);
      })
    );
    return;
  }

  // Static images/fonts → cache-first
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const clone = res.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return res;
        }).catch(() => cached);
      })
    );
    return;
  }

  // Everything else (incl. Next static JS/CSS chunks) → network-first, no long-term cache
  // This prevents stale/broken CSS or JS from being served after deploys.
  event.respondWith(fetch(request));
});
