const CACHE = "norte-garin-v2";

const PRECACHE = [
  "/",
  "/salidas",
  "/vida-ministerio",
  "/conferencias",
  "/lectores",
  "/limpieza",
  "/multimedia",
  "/grupos",
  "/proximos-eventos",
  "/manifest.json",
  "/favicon.svg",
  "/icon-192.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.hostname.includes("firebaseio.com") ||
      url.hostname.includes("googleapis.com") ||
      url.hostname.includes("gstatic.com") ||
      url.hostname.includes("tailwindcss.com")) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
