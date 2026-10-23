/* sw.js - service worker do NativeLayoutPad: funciona offline.
   Tem de ficar na raiz (junto do index.html) para controlar a pagina toda.
   Ao mudar ficheiros do pad, sobe a versao em CACHE para forcar a actualizacao. */
var CACHE = 'nlpad-v1';
var CORE = [
  './', 'index.html', 'manifest.webmanifest',
  'pad/nlweb.js', 'pad/editor.js', 'pad/ui.js', 'pad/icons.js', 'pad/auto.js', 'pad/vars.js', 'pad/pwa.js',
  'pad/base.css', 'pad/ide.css',
  'pad/app-icons/icon-192.png', 'pad/app-icons/icon-512.png', 'pad/app-icons/maskable-512.png', 'pad/app-icons/apple-touch-icon.png'
];
var EX = 'pad/exemplos/';

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(CORE.map(function (u) {      // um ficheiro em falta nao deve impedir a instalacao
      return c.add(u).catch(function () {});
    })).then(function () { return cacheExamples(c); });
  }).then(function () { return self.skipWaiting(); }));
});

// exemplos: melhor esforco (se o catalogo nao existir, o pad usa os exemplos embutidos)
function cacheExamples(c) {
  return fetch(EX + 'index.json', { cache: 'no-cache' }).then(function (r) {
    if (!r.ok) return;
    var copy = r.clone();
    return c.put(EX + 'index.json', copy).then(function () { return r.json(); }).then(function (list) {
      var jobs = [];
      (Array.isArray(list) ? list : []).forEach(function (it) {
        if (!it || !it.folder) return;
        var base = EX + String(it.folder).replace(/\/+$/, '') + '/';
        var names = Array.isArray(it.files) && it.files.length ? it.files : ['screen.nl', 'theme.css', 'data.json'];
        names.forEach(function (n) {
          jobs.push(fetch(base + n).then(function (x) { if (x.ok) return c.put(base + n, x); }).catch(function () {}));
        });
      });
      return Promise.all(jobs);
    });
  }).catch(function () {});
}

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

// cache primeiro, e actualiza em segundo plano (a nova versao aparece na proxima abertura)
self.addEventListener('fetch', function (e) {
  var req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(function (c) {
    return c.match(req, { ignoreSearch: true }).then(function (hit) {
      var net = fetch(req).then(function (res) {
        if (res && res.ok) c.put(req, res.clone());
        return res;
      }).catch(function () { return null; });
      if (hit) { e.waitUntil(net); return hit; }
      return net.then(function (res) {
        if (res) return res;
        if (req.mode === 'navigate') return c.match('index.html');
        return new Response('', { status: 504, statusText: 'offline' });
      });
    });
  }));
});
