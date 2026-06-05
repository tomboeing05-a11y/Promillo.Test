// Simple offline-first service worker for Party Games app.
// Strategy:
// - Navigations: network-first, fall back to cached "/" shell.
// - Same-origin GET assets: stale-while-revalidate.
// - Cross-origin (fonts.googleapis, gstatic): cache-first.
const VERSION = "v1";
const RUNTIME = `runtime-${VERSION}`;
const SHELL = `shell-${VERSION}`;
const SHELL_URLS = ["/"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL);
      try { await cache.addAll(SHELL_URLS); } catch (_) {}
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k !== RUNTIME && k !== SHELL)
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Navigations: network-first, fallback to cached shell
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(SHELL);
          cache.put("/", fresh.clone()).catch(() => {});
          return fresh;
        } catch (_) {
          const cache = await caches.open(SHELL);
          const cached = (await cache.match(req)) || (await cache.match("/"));
          if (cached) return cached;
          return new Response("Offline", { status: 503, statusText: "Offline" });
        }
      })()
    );
    return;
  }

  // Google Fonts: cache-first
  if (
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com"
  ) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(RUNTIME);
        const cached = await cache.match(req);
        if (cached) return cached;
        try {
          const fresh = await fetch(req);
          if (fresh.ok || fresh.type === "opaque") cache.put(req, fresh.clone()).catch(() => {});
          return fresh;
        } catch (e) {
          if (cached) return cached;
          throw e;
        }
      })()
    );
    return;
  }

  // Same-origin: stale-while-revalidate
  if (url.origin === self.location.origin) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(RUNTIME);
        const cached = await cache.match(req);
        const network = fetch(req)
          .then((res) => {
            if (res && (res.ok || res.type === "opaque")) {
              cache.put(req, res.clone()).catch(() => {});
            }
            return res;
          })
          .catch(() => null);
        return cached || (await network) || new Response("Offline", { status: 503 });
      })()
    );
  }
});
