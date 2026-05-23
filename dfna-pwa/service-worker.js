self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("dfna-cache-v1").then((cache) => {
      return cache.addAll([
        "/",
        "/scan-vin.html",
        "/details.html",
        "/service-logger/dfna-pwa/scan-driver.html",
        "/service-logger/dfna-pwa/lib/qr-scanner.min.js",
        "/service-logger/dfna-pwa/lib/qr-scanner-worker.min.js",
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
