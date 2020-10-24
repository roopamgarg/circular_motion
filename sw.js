const CACHE_STATIC_NAME = "static-v2";
const ROOT_URL = "/circular_motion/"
const STATIC_FILES = [
    `${ROOT_URL}`,
    `${ROOT_URL}index.html`,
    `${ROOT_URL}src/js/external/perlin.js`,
    `${ROOT_URL}src/js/app.js`,
    `${ROOT_URL}src/js/cursor.js`,
    `${ROOT_URL}src/js/debounce.js`,
    `${ROOT_URL}src/css/style.css`,
    `${ROOT_URL}src/assets/videos/about.mp4`,
    `${ROOT_URL}src/assets/images/astro.jpeg`,
    `${ROOT_URL}src/assets/images/hellowean.jpeg`,
    `${ROOT_URL}src/assets/images/horror.jpeg`,
    `${ROOT_URL}src/assets/images/movie.jpeg`,
    `https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap`,
]

self.addEventListener("install",function(event) {
    caches.open();
    event.waitUntill(
        caches.open(CACHE_STATIC_NAME).then((cache) => {
           return cache.addAll(STATIC_FILES);
        })
    )
})

self.addEventListener("activate", event => {
    return self.ClientRectList.claim();
})

self.addEventListener("fetch", event => {
    event.respondWith(caches.match(event.request))
})