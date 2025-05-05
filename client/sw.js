/* Log fetch requests and then serve them
 * from the cache */
function interceptFetch(evt) {
    if (evt.request.method !== 'GET') return;
    evt.respondWith(handleFetch(evt.request));
    evt.waitUntil(updateCache(evt.request));
  }

  async function handleFetch(request) {
    try {
      const networkResponse = await fetch(request);
      const cache = await caches.open(CACHE);
      cache.put(request, networkResponse.clone()); // Update cache
      return networkResponse;
    } catch (err) {
      const cache = await caches.open(CACHE);
      const cachedResponse = await cache.match(request);
      return cachedResponse || Response.error(); // Or a fallback response
    }
  }
  
  /* Invoke the default fetch capability to
   * pull a resource over the network and use
   * that to update the cache. */
  async function updateCache(request) {
    const c = await caches.open(CACHE);
    const response = await fetch(request);
    console.log('Updating cache ', request.url);
    return c.put(request, response);
  }
  
  /* The name fo the cache to be used. */
  const CACHE = 'hsww';
  
  /* List of files to cache */
  const CACHEABLE = [
    './',
    './scripts/customclock.mjs',
    './utils.mjs',
    './main.mjs',
    './style.css',
    './scripts/recordrunner.mjs',
    './screens/recordRunner.html',
    './screens/home.html',
    './scripts/home.mjs',
    './scripts/customplayerdisplay.js',
    './screens/startrace.html',
    './startrace.mjs',
    './database.mjs',
    './scripts/results.mjs'
  ];

  
  /* Prepare and populate the cache. */
  async function prepareCache() {
    const c = await caches.open(CACHE);
    await c.addAll(CACHEABLE);
    console.log('Cache prepared.');
  }
  
  self.addEventListener('install', prepareCache);
  self.addEventListener('fetch', interceptFetch);
  