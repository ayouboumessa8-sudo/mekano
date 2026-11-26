const CACHE_PREFIX = "mekano-pwa-";
const CACHE_NAME = "mekano-pwa-v21";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./pneus.html",
  "./accessoires.html",
  "./manifest.webmanifest",
  "./mekano-config.js",
  "./mekano-pro.js",
  "./mekano-pro.css",
  "./robots.txt",
  "./sitemap.xml",
  "./404.html",
  "./assets/apple-touch-icon.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/webp/acc-antimarten.webp",
  "./assets/webp/acc-booster.webp",
  "./assets/webp/acc-cables.webp",
  "./assets/webp/acc-carcover.webp",
  "./assets/webp/acc-chain.webp",
  "./assets/webp/acc-charger.webp",
  "./assets/webp/acc-compressor.webp",
  "./assets/webp/acc-dashcam.webp",
  "./assets/webp/acc-firstaid.webp",
  "./assets/webp/acc-hubcap.webp",
  "./assets/webp/acc-jack.webp",
  "./assets/webp/acc-knob.webp",
  "./assets/webp/acc-mat3d.webp",
  "./assets/webp/acc-mudflap.webp",
  "./assets/webp/acc-organizer.webp",
  "./assets/webp/acc-pad.webp",
  "./assets/webp/acc-phone.webp",
  "./assets/webp/acc-radar.webp",
  "./assets/webp/acc-radio.webp",
  "./assets/webp/acc-roofbars.webp",
  "./assets/webp/acc-roofbox.webp",
  "./assets/webp/acc-scent.webp",
  "./assets/webp/acc-seatcover.webp",
  "./assets/webp/acc-speaker.webp",
  "./assets/webp/acc-sunshade.webp",
  "./assets/webp/acc-trunkmat.webp",
  "./assets/webp/acc-vacuum.webp",
  "./assets/webp/acc-wheelcover.webp",
  "./assets/webp/detail-part-alternator-d1.webp",
  "./assets/webp/detail-part-alternator-d2.webp",
  "./assets/webp/detail-part-battery-d1.webp",
  "./assets/webp/detail-part-battery-d2.webp",
  "./assets/webp/detail-part-bearing-d1.webp",
  "./assets/webp/detail-part-bearing-d2.webp",
  "./assets/webp/detail-part-brakes-d1.webp",
  "./assets/webp/detail-part-brakes-d2.webp",
  "./assets/webp/detail-part-clutch-d1.webp",
  "./assets/webp/detail-part-clutch-d2.webp",
  "./assets/webp/detail-part-controlarm-d1.webp",
  "./assets/webp/detail-part-controlarm-d2.webp",
  "./assets/webp/detail-part-exhaust-d1.webp",
  "./assets/webp/detail-part-exhaust-d2.webp",
  "./assets/webp/detail-part-filters-d1.webp",
  "./assets/webp/detail-part-filters-d2.webp",
  "./assets/webp/detail-part-headlight-d1.webp",
  "./assets/webp/detail-part-headlight-d2.webp",
  "./assets/webp/detail-part-injector-d1.webp",
  "./assets/webp/detail-part-injector-d2.webp",
  "./assets/webp/detail-part-oil-d1.webp",
  "./assets/webp/detail-part-oil-d2.webp",
  "./assets/webp/detail-part-radiator-d1.webp",
  "./assets/webp/detail-part-radiator-d2.webp",
  "./assets/webp/detail-part-sensor-d1.webp",
  "./assets/webp/detail-part-sensor-d2.webp",
  "./assets/webp/detail-part-sparkplug-d1.webp",
  "./assets/webp/detail-part-sparkplug-d2.webp",
  "./assets/webp/detail-part-suspension-d1.webp",
  "./assets/webp/detail-part-suspension-d2.webp",
  "./assets/webp/detail-part-thermostat-d1.webp",
  "./assets/webp/detail-part-thermostat-d2.webp",
  "./assets/webp/detail-part-timing-d1.webp",
  "./assets/webp/detail-part-timing-d2.webp",
  "./assets/webp/detail-part-tools-d1.webp",
  "./assets/webp/detail-part-tools-d2.webp",
  "./assets/webp/detail-part-turbo-d1.webp",
  "./assets/webp/detail-part-turbo-d2.webp",
  "./assets/webp/detail-part-tyres-d1.webp",
  "./assets/webp/detail-part-tyres-d2.webp",
  "./assets/webp/detail-part-waterpump-d1.webp",
  "./assets/webp/detail-part-waterpump-d2.webp",
  "./assets/webp/detail-part-wipers-d1.webp",
  "./assets/webp/detail-part-wipers-d2.webp",
  "./assets/webp/hero-car.webp",
  "./assets/webp/mekano-brand.webp",
  "./assets/webp/part-alternator.webp",
  "./assets/webp/part-battery.webp",
  "./assets/webp/part-bearing.webp",
  "./assets/webp/part-brakes.webp",
  "./assets/webp/part-clutch.webp",
  "./assets/webp/part-controlarm.webp",
  "./assets/webp/part-exhaust.webp",
  "./assets/webp/part-filters.webp",
  "./assets/webp/part-headlight.webp",
  "./assets/webp/part-injector.webp",
  "./assets/webp/part-oil.webp",
  "./assets/webp/part-radiator.webp",
  "./assets/webp/part-sensor.webp",
  "./assets/webp/part-sparkplug.webp",
  "./assets/webp/part-suspension.webp",
  "./assets/webp/part-thermostat.webp",
  "./assets/webp/part-timing.webp",
  "./assets/webp/part-tools.webp",
  "./assets/webp/part-turbo.webp",
  "./assets/webp/part-tyres.webp",
  "./assets/webp/part-waterpump.webp",
  "./assets/webp/part-wipers.webp",
  "./assets/webp/promo-kit.webp",
  "./assets/webp/tyre-allseason.webp",
  "./assets/webp/tyre-hero-diagram.webp",
  "./assets/webp/tyre-summer.webp",
  "./assets/webp/tyre-suv.webp",
  "./assets/webp/tyre-winter.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // A missing optional image must not block the PWA shell from installing.
    await Promise.allSettled(CORE_ASSETS.map((url) => cache.add(url)));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

async function cacheResponse(request, response) {
  if (!response || !response.ok || response.type === "opaque") return;
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response.clone());
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Network-first navigation keeps store pages current and falls back to the last cached version offline.
  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response && response.ok) event.waitUntil(cacheResponse(request, response));
        return response;
      } catch (_) {
        const cached = await caches.match(request);
        if (cached) return cached;
        const fallback = new URL("./index.html", self.registration.scope).href;
        return (await caches.match(fallback)) || Response.error();
      }
    })());
    return;
  }

  // Cache-first local static assets; refresh cache in the background when absent.
  if (url.pathname.includes("/assets/") || /\.(?:css|js|webmanifest)$/.test(url.pathname)) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      await cacheResponse(request, response);
      return response;
    })());
  }
});
