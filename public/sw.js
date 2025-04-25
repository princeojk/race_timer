/* Log fetch requests and then serve them
 * from the cache */
function interceptFetch(evt) {
    if (evt.request.method !== 'GET') return;
    evt.respondWith(handleFetch(evt.request));
    evt.waitUntil(updateCache(evt.request));
  }
  
  /* Retrieve a requested resource from the cache
   * or return a resolved promise if its not there. */
  async function handleFetch(request) {
    const c = await caches.open(CACHE);
    const cachedCopy = await c.match(request);
    return cachedCopy || Promise.reject(new Error('no-match'));
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
    './customclock.mjs',
    './sw.js',
    './utils.mjs',
    './main.mjs',
    './style.css',
    './recordrunner.mjs',
    './recordRunner.html',
    './home.html',
    './home.mjs',
    './customplayerdisplay.js',
    './startrace.html',
    './startrace.mjs',
    './database.mjs'
  ];
		
// 	results.html
// 		results.mjs		

  /* Prepare and populate the cache. */
  async function prepareCache() {
    const c = await caches.open(CACHE);
    await c.addAll(CACHEABLE);
    console.log('Cache prepared.');
  }
  
  self.addEventListener('install', prepareCache);
  self.addEventListener('fetch', interceptFetch);
  