const VERSION = "v1";
const STATIC_CACHE = `sikaai-static-${VERSION}`;
const PAGE_CACHE = `sikaai-pages-${VERSION}`;
const FALLBACK = "/en/course";

const IS_LEARN = self.location.hostname.startsWith("learn.");

self.addEventListener("install", (event) => {
  event.waitUntil(
    (IS_LEARN ? caches.open(PAGE_CACHE).then((c) => c.add(FALLBACK)) : Promise.resolve())
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => ![STATIC_CACHE, PAGE_CACHE].includes(k))
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return; // never cache API calls

  // Page navigations: network first, fall back to cache when offline
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(PAGE_CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(async () => (await caches.match(req)) || (IS_LEARN && (await caches.match(FALLBACK))) || Response.error())
    );
    return;
  }

  // Static assets (JS, CSS, images, fonts): cache first
  const isStatic =
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/graphics/") ||
    url.pathname.startsWith("/icons/") ||
    /\.(?:png|jpg|jpeg|webp|svg|gif|ico|woff2?|css|js)$/.test(url.pathname);

  if (isStatic) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(STATIC_CACHE).then((c) => c.put(req, copy));
            }
            return res;
          })
      )
    );
  }
});