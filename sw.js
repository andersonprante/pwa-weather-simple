var HOST = 'https://andersonprante.github.io/pwa-weather-simple'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register(`${HOST}/sw.js`)
    .then(function () { console.log('Service Worker Registered'); });
}

var cacheName = 'pwa-weather-simple-v0'
var filesToCache = [
  `${HOST}/estilo.css`,
  `${HOST}/js/getImgName.js`,
  `${HOST}/js/weather.js`,
  `${HOST}/js/app.js`
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.match(event.request)
//     .then(function (response) {
//       // Cache hit - return response
//       if (response) {
//         return response;
//       }

//       // IMPORTANT: Clone the request. A request is a stream and
//       // can only be consumed once. Since we are consuming this
//       // once by cache and once by the browser for fetch, we need
//       // to clone the response.
//       var fetchRequest = event.request.clone();

//       return fetch(fetchRequest).then(
//         function (response) {
//           // Check if we received a valid response
//           if (!response || response.status !== 200 || response.type !== 'basic') {
//             return response;
//           }

//           // IMPORTANT: Clone the response. A response is a stream
//           // and because we want the browser to consume the response
//           // as well as the cache consuming the response, we need
//           // to clone it so we have two streams.
//           var responseToCache = response.clone();

//           caches.open(CACHE_NAME)
//             .then(function (cache) {
//               cache.put(event.request, responseToCache);
//             });

//           return response;
//         }
//       );
//     })
//   );
// });

// self.addEventListener('activate', function (event) {

//   var cacheWhitelist = [CACHE_NAME];

//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames.map(function (cacheName) {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });
