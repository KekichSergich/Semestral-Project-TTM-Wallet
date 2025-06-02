const CACHE_NAME = "crypto-wallet-v1";

const urlsToCache = [
  "index.html",
  "css/styles.css",
  "css/modal.css",
  "images/backgrounds/IMG_20240319_154735.png",
  "images/icons/free-icon-astronaut-4269088.png",
  "sounds/delete.mp3",

  // JS Modules
  "js/utils/generateUnicId.js",
  "js/utils/getCryptoPairsList.js",
  "js/utils/formAutocompleteHandler.js",
  "js/utils/overflowObserver.js",
  "js/utils/renderAllCryptoPairs.js",
  "js/utils/generateColor.js",
  "js/utils/playDeleteSound.js",

  "js/storage/storage.js",
  "js/storage/checkCryptoListInStorage.js",

  "js/components/modalWindows.js",
  "js/components/CryptoPair.js",
  "js/components/CryptoNote.js",

  "js/actions/addCrypto.js",
  "js/table/table.js",

  "js/charts/drawChart.js",
  "js/charts/drawPieChart.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      for (const path of urlsToCache) {
        try {
          const response = await fetch(path, { mode: "same-origin" });
          if (response.ok) {
            await cache.put(path, response.clone());
            console.log("✅ Cached:", path);
          } else {
            console.warn("⚠️ Response not OK for:", path, response.status);
          }
        } catch (err) {
          console.warn("❌ Failed to fetch/cache:", path, err);
        }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const req = event.request;

  // HTML fallback (index.html for navigation)
  if (req.mode === "navigate") {
    event.respondWith(
      caches.match("index.html").then(response =>
        response || fetch("index.html").catch(() =>
          new Response(
            "<h1>Offline</h1><p>Не удалось загрузить страницу.</p>",
            {
              headers: { "Content-Type": "text/html; charset=utf-8" },
              status: 503
            }
          )
        )
      )
    );
    return;
  }

  // All other requests → try cache → fallback to network
  event.respondWith(
    caches.match(req).then(response => response || fetch(req))
  );
});
