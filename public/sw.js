const VERSION = "v1";
const STATIC_CACHE = `sikaai-static-${VERSION}`;
const PAGE_CACHE = `sikaai-pages-${VERSION}`;
// Small, unversioned cache that remembers the language the person last used
const META_CACHE = "sikaai-meta";
const LANG_URL = "/__sikaai-lang";
const NAV_TIMEOUT_MS = 4000;
const MAX_PAGES = 110; // 60 precached pages (2 languages x 30) + room for visited ones

// URL prefixes, NOT locale codes: Nepali is the locale "ne" but its URLs start with /np
const LOCALES = ["en", "np"];
const PREFIXES = LOCALES.map((l) => `/${l}`);
const DAYS = Array.from({ length: 28 }, (_, i) => i + 1);

const PRECACHE_PAGES = LOCALES.flatMap((l) => [
  `/${l}/course`,
  `/${l}/involve`,
  ...DAYS.map((d) => `/${l}/course/${d}`),
]);

const MOODS = ["explaining", "happy", "thinking", "winking", "surprised"];
const PRECACHE_ASSETS = [
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  ...["boy", "girl"].flatMap((who) => MOODS.map((m) => `/graphics/${who}/${m}.png`)),
  ...["book", "pencil", "flower", "flower2", "hill"].map((n) => `/graphics/elements/${n}.png`),
];

const IS_LEARN = self.location.hostname.startsWith("learn.");

const isHashed = (p) => p.startsWith("/_next/static/");
const isStatic = (p) =>
  isHashed(p) ||
  p.startsWith("/_next/image") ||
  p.startsWith("/graphics/") ||
  p.startsWith("/icons/") ||
  /\.(?:png|jpg|jpeg|webp|svg|gif|ico|woff2?|css|js)$/.test(p);

/* ---------- precaching (runs when the service worker installs) ---------- */

// Find every asset a page needs by scanning its HTML
function extractAssets(html) {
  const found = new Set();
  const clean = (s) => s.replace(/&amp;/g, "&").replace(/\\u0026/g, "&");

  for (const m of html.matchAll(/\/_next\/static\/[^"'\\\s)]+/g)) found.add(clean(m[0]));
  // Next's inline flight data references chunks without the /_next/ prefix
  for (const m of html.matchAll(/(?<![\w/])static\/(?:chunks|css|media)\/[^"'\\\s)]+/g))
    found.add("/_next/" + clean(m[0]));
  for (const m of html.matchAll(/\/_next\/image\?[^"'\s,\\]+/g)) found.add(clean(m[0]));
  for (const m of html.matchAll(/\/(?:graphics|icons)\/[^"'\\\s)]+/g)) found.add(clean(m[0]));

  return [...found];
}

async function putIfOk(cache, url) {
  if (await cache.match(url)) return null;
  const res = await fetch(url);
  if (!res.ok) return null;
  await cache.put(url, res.clone());
  return res;
}

async function precacheEverything() {
  const pages = await caches.open(PAGE_CACHE);
  const statics = await caches.open(STATIC_CACHE);
  const assets = new Set(PRECACHE_ASSETS);

  // 1. Cache each page and collect the assets it uses
  await Promise.allSettled(
    PRECACHE_PAGES.map(async (path) => {
      const res = await fetch(path, { headers: { Accept: "text/html" } });
      if (!res.ok || res.redirected) return; // never cache redirects
      const html = await res.clone().text();
      await pages.put(path, res);
      extractAssets(html).forEach((a) => assets.add(a));
    })
  );

  // 2. Cache all collected assets
  const cssUrls = [];
  await Promise.allSettled(
    [...assets].map(async (u) => {
      const res = await putIfOk(statics, u);
      if (res && /\.css(\?|$)/.test(u)) cssUrls.push(u);
    })
  );

  // 3. Fonts/images referenced inside CSS files
  await Promise.allSettled(
    cssUrls.map(async (cssUrl) => {
      const css = await (await statics.match(cssUrl)).text();
      for (const m of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
        if (m[1].startsWith("data:")) continue;
        const abs = new URL(m[1], new URL(cssUrl, self.location.origin));
        if (abs.origin === self.location.origin) await putIfOk(statics, abs.pathname + abs.search);
      }
    })
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (IS_LEARN ? precacheEverything() : Promise.resolve())
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
          keys.filter((k) => ![STATIC_CACHE, PAGE_CACHE, META_CACHE].includes(k)).map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

/* ---------- the page can send us extra assets it loaded ---------- */

self.addEventListener("message", (event) => {
  // The page tells us when the language changes (the toggle is a client-side navigation we never see)
  if (event.data?.type === "SET_LOCALE") {
    if (PREFIXES.includes(event.data.prefix)) event.waitUntil(setLang(event.data.prefix).catch(() => {}));
    return;
  }
  if (event.data?.type !== "CACHE_ASSETS") return;

  const assets = (event.data.urls || [])
    .map((u) => new URL(u, self.location.origin))
    .filter((u) => u.origin === self.location.origin && isStatic(u.pathname));

  event.waitUntil(
    (async () => {
      const statics = await caches.open(STATIC_CACHE);
      await Promise.allSettled(assets.map((u) => putIfOk(statics, u.pathname + u.search)));

      if (event.data.page) {
        const pages = await caches.open(PAGE_CACHE);
        if (!(await pages.match(event.data.page))) {
          const res = await fetch(event.data.page);
          if (res.ok && !res.redirected) await pages.put(event.data.page, res);
        }
      }
    })().catch(() => {})
  );
});

/* ---------- fetch handling ---------- */

async function trimPages() {
  const cache = await caches.open(PAGE_CACHE);
  const keys = await cache.keys();
  const protectedPaths = new Set(PRECACHE_PAGES);
  const removable = keys.filter((k) => !protectedPaths.has(new URL(k.url).pathname));
  const excess = keys.length - MAX_PAGES;
  for (let i = 0; i < excess && i < removable.length; i++) await cache.delete(removable[i]);
}

const prefixOf = (pathname) => PREFIXES.find((p) => pathname === p || pathname.startsWith(p + "/"));

async function setLang(prefix) {
  const cache = await caches.open(META_CACHE);
  await cache.put(LANG_URL, new Response(prefix));
}

async function getLang() {
  try {
    const hit = await (await caches.open(META_CACHE)).match(LANG_URL);
    const value = hit ? await hit.text() : "";
    return PREFIXES.includes(value) ? value : PREFIXES[0];
  } catch {
    return PREFIXES[0];
  }
}

async function handleNavigation(event) {
  const req = event.request;
  const url = new URL(req.url);
  const seen = prefixOf(url.pathname);
  // Remember the language of every full page load
  if (seen) event.waitUntil(setLang(seen).catch(() => {}));

  const network = fetch(req).then((res) => {
    if (res.ok && !res.redirected) {
      const copy = res.clone();
      event.waitUntil(caches.open(PAGE_CACHE).then((c) => c.put(req, copy)).then(trimPages));
    }
    return res;
  });
  network.catch(() => {});

  try {
    const cached = await caches.match(req, { ignoreSearch: true });
    if (!cached) return await network;
    // Have a cached copy: only wait briefly for the network
    return await Promise.race([
      network,
      new Promise((_, reject) => setTimeout(reject, NAV_TIMEOUT_MS)),
    ]);
  } catch {
    const cached = await caches.match(req, { ignoreSearch: true });
    if (cached) return cached;
    if (!IS_LEARN) return Response.error();

    // No language prefix (the installed app opens "/course"). Online, the server picks the
    // language from a cookie; offline that cannot happen, so use the last language chosen.
    if (!seen) {
      const lang = await getLang();
      const path = url.pathname === "/" ? "/involve" : url.pathname;
      return Response.redirect(`${self.location.origin}${lang}${path}${url.search}`, 302);
    }

    // Unknown page: fall back to the course home in the SAME language
    return (await caches.match(`${seen}/course`)) || Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  if (req.mode === "navigate") {
    event.respondWith(handleNavigation(event));
    return;
  }

  if (!isStatic(url.pathname)) return;

  // Hashed build files never change: cache first
  if (isHashed(url.pathname)) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              event.waitUntil(caches.open(STATIC_CACHE).then((c) => c.put(req, copy)));
            }
            return res;
          })
      )
    );
    return;
  }

  // Images, icons, graphics: serve cached, refresh in background
  event.respondWith(
    caches.open(STATIC_CACHE).then(async (cache) => {
      const hit = await cache.match(req);
      const refresh = fetch(req)
        .then((res) => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => hit || Response.error());
      return hit || refresh;
    })
  );
});