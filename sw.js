const CACHE_STATIC_NAME = "static-v2";

const STATIC_FILES = [
    "/",
    "/index.html",
    "./src/js/external/perlin.js",
    "./src/js/app.js",
    "./src/js/cursor.js",
    "./src/js/debounce.js",
    "./src/css/style.css",
    "./src/assets/videos/about.mp4",
    "./src/assets/images/astro.jpg",
    "./src/assets/images/hellowean.jpg",
    "./src/assets/images/horror.jpg",
    "./src/assets/images/movie.jpg",
    "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap",
]

self.addEventListener("install",(event) => {
    caches.open();
    event.waitUntill(
        caches.open(CACHE_STATIC_NAME).then((cache) => {
            cache.addAll(STATIC_FILES);
        })
    )
})

self.addEventListener("activate", event => {
    return self.ClientRectList.claim();
})

self.addEventListener("fetch", event => {
    event.respondWith(caches.match(event.request))
})