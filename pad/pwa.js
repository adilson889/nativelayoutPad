/* pwa.js - regista o service worker (offline) e mostra o estado na barra. */
(function () {
  if (!('serviceWorker' in navigator)) return;
  var local = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (!local) return;
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').then(function (reg) {
      reg.addEventListener('updatefound', function () {
        var w = reg.installing; if (!w) return;
        w.addEventListener('statechange', function () {
          if (w.state === 'installed' && navigator.serviceWorker.controller) {
            var t = document.getElementById('toast');
            if (t) { t.textContent = 'Update ready. Reopen to use it.'; t.classList.add('on'); setTimeout(function () { t.classList.remove('on'); }, 3500); }
          }
        });
      });
    }).catch(function () {});
  });
})();
