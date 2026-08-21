/* Phonetics Lab service worker — offline-first app shell + runtime asset cache */
const CACHE = "phonelab-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

/* Walk the built index.html + its CSS and cache every referenced asset
   (hashed JS/CSS and all font subsets), so the very first visit ends fully offline-ready. */
async function cacheAsset(cache, url) {
  try {
    const res = await fetch(url);
    if (!res || !res.ok) return null;
    await cache.put(url, res.clone());
    return res;
  } catch {
    return null;
  }
}

async function warmCache() {
  const cache = await caches.open(CACHE);
  const home = await cacheAsset(cache, new URL("./", self.location.origin).href);
  if (!home) return;
  const html = await home.text();
  const refs = [...new Set([...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]))];
  for (const ref of refs) {
    const abs = new URL(ref, self.location.origin).href;
    if (new URL(abs).origin !== self.location.origin) continue;
    const res = await cacheAsset(cache, abs);
    if (!res) continue;
    if (abs.endsWith(".css")) {
      const css = await res.text();
      const urls = [...css.matchAll(/url\(([^)]+?)\)/g)].map((m) => m[1].replace(/['"]/g, "").trim());
      for (const u of urls) {
        const fontUrl = new URL(u, abs).href;
        if (new URL(fontUrl).origin === self.location.origin) await cacheAsset(cache, fontUrl);
      }
    }
  }
}

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))),
      warmCache(),
    ]).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // everything is self-hosted anyway

  // Navigations: network-first, fall back to the cached shell when offline.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put("./index.html", copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match("./index.html").then((hit) => hit || caches.match("./")))
    );
    return;
  }

  // Hashed assets, fonts, icons: serve from cache instantly, refresh in the background.
  event.respondWith(
    caches.match(req).then((hit) => {
      const refresh = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => hit);
      return hit || refresh;
    })
  );
});
