const cacheName = 'v1';

cachesAssets = [
  'https://raw.githubusercontent.com/shaqian/tfjs-yolo-demo/master/dist/model/v1tiny/model.json'
]

// Call Install Event
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Sevice Worker: Caching Files');
        cache.addAll(cachesAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  if(!(e.request.url.indexOf('http') === 0)){
    //skip request
  } 
  else {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          // Make copy/clone of response
          const resClone = res.clone();
          // Open cahce
          caches.open(cacheName).then(cache => {
            // Add response to cache
            cache.put(e.request, resClone);
          });
          return res;
        })
        .catch(err => caches.match(e.request).then(res => res))
    );
  }
});