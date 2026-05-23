self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("dfna-cache-v1").then((cache) => {
      return cache.addAll([
        "/",
        "/scan-vin.html",
        "/details.html",
        "/styles.css",
        "/scan-vin.js",
        "/details.js",
        "/manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request);
    })
  );
});
