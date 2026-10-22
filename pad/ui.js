/* ui.js - so interface (breadcrumb, estado, divisoria, activity bar). Nao mexe na logica do editor. */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var tabs = $('tabs'), ta = $('ta'), crumb = $('crumb'), probs = $('probs');

  function curName() {
    var on = tabs.querySelector('.tab.on');
    if (!on) return '';
    return (on.firstChild && on.firstChild.nodeType === 3 ? on.firstChild.nodeValue : on.textContent).replace(/x$/, '').trim();
  }
  function setCrumb() {
    var n = curName();
    crumb.innerHTML = '<span>src</span><span>\u203A</span><b></b>';
    crumb.lastChild.textContent = n;
    var l = $('lang'); if (l) l.textContent = /\.css$/i.test(n) ? 'CSS' : /\.json$/i.test(n) ? 'JSON' : 'NL';
  }
  function setPos() {
    var v = ta.value, p = ta.selectionStart, ln = v.slice(0, p).split('\n');
    $('pos').textContent = 'Ln ' + ln.length + ', Col ' + (ln[ln.length - 1].length + 1);
  }
  function setProbs() {
    var n = probs.querySelectorAll('.pr').length, el = $('pb');
    el.textContent = n + (n === 1 ? ' problem' : ' problems');
    el.className = 'si' + (n ? ' bad' : '');
  }
  new MutationObserver(setCrumb).observe(tabs, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  new MutationObserver(setProbs).observe(probs, { childList: true, subtree: true });
  ['keyup', 'click', 'input', 'focus'].forEach(function (e) { ta.addEventListener(e, setPos); });
  document.addEventListener('selectionchange', function () { if (document.activeElement === ta) setPos(); });

  /* activity bar: Files mostra o codigo, Preview mostra a previa (telemovel); no ecra largo so destaca */
  var mt = $('mt');
  function view(v) {
    var b = mt.querySelector('[data-v="' + v + '"]');
    if (b) b.click();
    $('abFiles').classList.toggle('on', v === 'code');
    $('abView').classList.toggle('on', v === 'view');
  }
  $('abFiles').onclick = function () { view('code'); ta.focus(); };
  $('abView').onclick = function () { view('view'); };

  /* divisoria arrastavel entre o codigo e a previa */
  var sp = $('split'), ed = document.querySelector('.ed'), pv = document.querySelector('.pv'), main = document.querySelector('.main');
  sp.addEventListener('pointerdown', function (e) {
    sp.setPointerCapture(e.pointerId); sp.classList.add('drag'); e.preventDefault();
  });
  sp.addEventListener('pointermove', function (e) {
    if (!sp.classList.contains('drag')) return;
    var r = main.getBoundingClientRect(), x = Math.min(Math.max(e.clientX - r.left, 220), r.width - 220);
    ed.style.flex = '0 0 ' + x + 'px'; pv.style.flex = '1';
  });
  function end() { sp.classList.remove('drag'); }
  sp.addEventListener('pointerup', end); sp.addEventListener('pointercancel', end);

  setCrumb(); setPos(); setProbs();
})();
