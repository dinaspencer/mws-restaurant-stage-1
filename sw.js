console.log('Hello, service worker registered!');


/* With help from Matthew Crawford´s tutorial I implemented the service worker.*/

self.addEventListener('install', function(e) {

});


const filesForCache = [
	'/',
	'index.html',
	'restaurant.html',
	'/css/styles.css',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/data/restaurants.json',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg',
	'https://api.tiles.mapbox.com/v4/mapbox.streets/16/…ZzI2Z3M0ZHBmOHV0MXFna2cifQ.LMfpANpAuREwJwEa6vw44g',
];

self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open('v1').then(function(cache) {
			return cache.addAll(filesForCache);
		})
		);
});

self.addEventListener('fetch', function(e){
	e.respondWith(
		caches.match(e.request).then(function(response){
			if(response){
				console.log('Found', e.request, ' in cache');
				return response;
			}
			else {
				console.log('Couldnt find ', e.request, ' in cache, fetching...');
				return fetch(e.request)
				.then(function(response) {
					const clonedResponse = response.clone();
					caches.open('v1').then(function(cache) {
						cache.put(e.request, clonedResponse);
					})
					return response;
				})
					
			}
		})
		);
});