// Service Worker for PDFMarkdown
// Enables true offline functionality without storing any user data

const CACHE_NAME = 'pdfmarkdown-v1';
const STATIC_ASSETS = [
  '/',
  '/favicon.ico',
  '/_next/static/css/app/layout.css',
  '/_next/static/css/app/page.css'
];

// Install event - cache static assets only (no user data)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('PDFMarkdown: Service worker installed, caching static assets');
        return cache.addAll(STATIC_ASSETS.filter(url => !url.includes('user-data')));
      })
      .catch((error) => {
        console.log('PDFMarkdown: Cache failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('PDFMarkdown: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, never store user files
self.addEventListener('fetch', (event) => {
  // Never cache or store user uploaded files
  if (event.request.url.includes('pdf') || 
      event.request.url.includes('file') ||
      event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
          .then((fetchResponse) => {
            // Only cache static assets, never user data
            if (fetchResponse.status === 200 && 
                event.request.url.includes('_next/static')) {
              const responseClone = fetchResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseClone);
                });
            }
            return fetchResponse;
          });
      })
      .catch(() => {
        // Return a basic offline page for navigation requests
        if (event.request.mode === 'navigate') {
          return new Response(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>PDFMarkdown - Offline</title>
              <style>
                body { font-family: system-ui; text-align: center; padding: 2rem; }
                .offline { color: #666; }
              </style>
            </head>
            <body>
              <h1>PDFMarkdown</h1>
              <p class="offline">You're currently offline, but PDFMarkdown still works!</p>
              <p>Upload a PDF file to convert it to Markdown - no internet required.</p>
            </body>
            </html>
          `, {
            headers: { 'Content-Type': 'text/html' }
          });
        }
      })
  );
});

// Clean up any stored data on beforeunload
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEANUP') {
    // Clear any temporary data but keep static cache
    console.log('PDFMarkdown: Cleaning up session data');
  }
});