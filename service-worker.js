const staticAssets=['/','/index.html','/fonts/BlackOpsOne-Regular.ttf','/css/fonts.min.css','/css/fontawesome.min.css','/css/regular.min.css','/css/solid.min.css','/js/fontawesome.min.js','/js/regular.min.js','/js/solid.min.js','/webfonts/fa-regular-400.eot','/webfonts/fa-regular-400.svg','/webfonts/fa-regular-400.ttf','/webfonts/fa-regular-400.woff','/webfonts/fa-regular-400.woff2','/webfonts/fa-solid-900.eot','/webfonts/fa-solid-900.svg','/webfonts/fa-solid-900.ttf','/webfonts/fa-solid-900.woff','/webfonts/fa-solid-900.woff2','/css/styles.min.css','/assets/particles.json','/js/bootstrap.bundle.min.js','/js/jquery.easing.min.js','/js/particles.min.js','/js/scrollspy.min.js','/js/dark-light-theme.min.js','/js/typed.init.js','/js/typed.min.js','/js/vanilla-tilt.min.js','/js/jquery-3.5.1.min.js','/js/app.min.js','/images/monkey.webp','/images/Profile-pic.webp','/images/quote-img.webp','/images/aiicb.webp','/images/aimg.webp','/images/asm.webp','/images/bgimg.webp','/images/data-science.webp','/images/ecs.webp','/images/footer-cloud.svg','/images/gist.webp','/images/HackerRank.webp','/images/hacktoberfest2020.webp','/images/sda.webp','/images/us.webp','/404.html','/css/404.min.css','/js/404.min.js','/images/404.webp','/manifest.json','/service-worker.js','/favicon.ico','/images/about-bg.svg','/images/about-bg-sm.svg',];
var cacheName = 'cache-0';
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(staticAssets);
        })
    );
});
self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        if (response !==undefined) {
            return response;
        } else {
            var requestClone = event.request.clone()
            return fetch(requestClone).then(function (response) {
                let responseClone = response.clone();
                caches.open(cacheName).then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            }).catch(function () {
                return caches.match('/');
            });
        }
    }));
});
self.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});