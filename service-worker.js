const staticAssets = [
    "/",
    "/index.html",
    "/css/fonts.min.css",
    "/css/styles.min.css",
    "/manifest.json",
    "/service-worker.js",
    "/assets/particles.json",
    "/js/bootstrap.bundle.min.js",
    "/js/jquery.easing.min.js",
    "/js/particles.min.js",
    "/js/scrollspy.min.js",
    "/js/dark-light-theme.min.js",
    "/js/typed.init.js",
    "/js/typed.min.js",
    "/js/vanilla-tilt.min.js",
    "/js/jquery-3.5.1.min.js",
    "/js/app.min.js",
    "/images/monkey.webp",
    "/images/Profile-pic.webp",
    "/favicon.ico",
    "/images/quote-img.webp",
    "/images/about-bg.svg",
    "/images/about-bg-sm.svg",
    "/images/aiicb.webp",
    "/images/aimg.webp",
    "/images/asm.webp",
    "/images/bgimg.webp",
    "/images/data-science.webp",
    "/images/ecs.webp",
    "/images/footer-cloud.svg",
    "/images/gist.webp",
    "/images/HackerRank.webp",
    "/images/hacktoberfest2020.webp",
    "/images/sda.webp",
    "/images/us.webp",
    "/404.html",
    "/css/404.min.css",
    "/js/404.min.js",
    "/images/404.webp",
];
let cacheName = "cache-0";
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(staticAssets);
        })
    );
});
self.addEventListener("fetch", function (event) {
    if (event && event.request && caches) {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                if (response !== undefined) {
                    return response;
                } else {
                    let requestClone = event.request.clone();
                    return fetch(requestClone)
                        .then(function (response) {
                            if (response.ok) {
                                let responseClone = response.clone();
                                caches.open(cacheName).then(function (cache) {
                                    if (event.request &&requestClone && requestClone.status && requestClone.status!==206) {
                                        try {
                                            cache.put(event.request, responseClone);
                                        }catch (e){
                                            console.log(e);
                                        }
                                    }
                                });
                                return response;
                            }
                        })
                        .catch(function () {
                            return caches.match("/");
                        });
                }
            })
        );
    }
});
self.addEventListener("message", function (event) {
    if (event.data.action === "skipWaiting") {
        self.skipWaiting();
    }
});
