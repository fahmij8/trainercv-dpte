/* eslint-disable no-undef */
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import { setCacheNameDetails } from "workbox-core";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration/ExpirationPlugin";

self.skipWaiting();

setCacheNameDetails({
    prefix: "tcv",
    suffix: "",
    precache: "precache",
    runtime: "runtime",
});

precacheAndRoute(self.__WB_MANIFEST, {
    ignoreURLParametersMatching: [/.*/],
});
self.__WB_DISABLE_DEV_LOGS = true;

registerRoute(
    ({ url }) => url.origin,
    new StaleWhileRevalidate({
        cacheName: "tcv-external",
        plugins: [
            new ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
                purgeOnQuotaError: true,
            }),
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
        matchOptions: {
            ignoreVary: true,
        },
    })
);

registerRoute(
    ({ url }) => url.origin === "https://trainercv-dpte-default-rtdb.firebaseio.com",
    new StaleWhileRevalidate({
        cacheName: "tcv-firebasedb",
        plugins: [
            new ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
                purgeOnQuotaError: true,
            }),
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
        matchOptions: {
            ignoreVary: true,
        },
    })
);

addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});