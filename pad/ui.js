/* ui.js - so interface (breadcrumb, estado, divisoria, barra de actividades, explorador, tema). Nao mexe na logica do editor. */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var tabs = $('tabs'), ta = $('ta'), crumb = $('crumb'), probs = $('probs'), tlist = $('tlist');
  var SPEC = 'https://github.com/getnativelayout/nativelayout/blob/main/SPEC.md';
  var SITE = 'https://getnativelayout.github.io/nativelayout/';
  var root = document.documentElement;

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function tabName(t) {
    return (t.firstChild && t.firstChild.nodeType === 3 ? t.firstChild.nodeValue : t.textContent).replace(/x$/, '').trim();
  }
  function curName() {
    var on = tabs.querySelector('.tab.on');
    return on ? tabName(on) : '';
  }
  function extOf(n) { var m = /\.([A-Za-z]+)$/.exec(n); return m ? m[1].toLowerCase() : ''; }

  function setCrumb() {
    var n = curName();
    crumb.innerHTML = '<span>src</span><span>›</span><b></b>';
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

  /* explorador: espelha os separadores; cada accao reencaminha para o separador (o estado fica no editor.js) */
  function buildTree() {
    tlist.innerHTML = '';
    [].forEach.call(tabs.querySelectorAll('.tab:not(.add)'), function (t) {
      var name = tabName(t), ext = extOf(name);
      t.setAttribute('data-ext', ext);
      var row = document.createElement('div');
      row.className = 'tr' + (t.classList.contains('on') ? ' on' : '');
      var ic = document.createElement('span'); ic.className = 'ex'; ic.setAttribute('data-ext', ext); ic.textContent = ext;
      var nm = document.createElement('span'); nm.className = 'nm'; nm.textContent = name;
      row.appendChild(ic); row.appendChild(nm);
      var x = t.querySelector('i');
      if (x) {
        var rm = document.createElement('button'); rm.className = 'rm'; rm.type = 'button'; rm.title = 'Delete file'; rm.textContent = '×';
        rm.onclick = function (e) { e.stopPropagation(); x.click(); };
        row.appendChild(rm);
      }
      row.onclick = function () {
        t.click();
        if (narrow()) setTree(false);
      };
      tlist.appendChild(row);
    });
  }
  function tabsChanged() { setCrumb(); buildTree(); }
  new MutationObserver(tabsChanged).observe(tabs, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  new MutationObserver(setProbs).observe(probs, { childList: true, subtree: true });
  ['keyup', 'click', 'input', 'focus'].forEach(function (e) { ta.addEventListener(e, setPos); });
  document.addEventListener('selectionchange', function () { if (document.activeElement === ta) setPos(); });

  /* activity bar */
  var mt = $('mt');
  function narrow() { return window.matchMedia('(max-width:820px)').matches; }
  function view(v) {
    var b = mt.querySelector('[data-v="' + v + '"]');
    if (b) b.click();
    $('abView').classList.toggle('on', v === 'view');
    if (v === 'view') setTree(false);
  }
  function setTree(on) {
    document.body.setAttribute('data-tree', on ? '1' : '0');
    $('abFiles').classList.toggle('on', on);
    lsSet('nlpad.tree', on ? '1' : '0');
  }
  $('abFiles').onclick = function () {
    var on = document.body.getAttribute('data-tree') !== '0';
    if (narrow()) {
      if (document.body.getAttribute('data-v') === 'view') { view('code'); setTree(true); }
      else setTree(!on);
    } else { setTree(!on); if (!on) view('code'); }
  };
  $('abView').onclick = function () { view('view'); };
  $('abNew').onclick = $('tNew').onclick = function () { var a = tabs.querySelector('.tab.add'); if (a) a.click(); };
  $('abEx').onclick = function () { var s = $('ex'); s.focus(); try { s.showPicker(); } catch (e) { s.click(); } };
  $('abSave').onclick = function () { ta.dispatchEvent(new KeyboardEvent('keydown', { key: 's', ctrlKey: true, bubbles: true, cancelable: true })); };
  $('abDocs').onclick = function () { window.open(SPEC, '_blank', 'noopener'); };
  $('abHelp').onclick = function () { window.open(SITE, '_blank', 'noopener'); };
  $('tsh').onclick = function () { this.classList.toggle('shut'); tlist.classList.toggle('shut'); };

  /* tema claro / escuro da interface (a previa tem o seu proprio botao) */
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    lsSet('nlpad.theme', t);
    var tc = $('tc'); if (tc) tc.setAttribute('content', t === 'light' ? '#f2f2f2' : '#333333');
    $('abTheme').title = t === 'light' ? 'Switch to the dark theme' : 'Switch to the light theme';
  }
  $('abTheme').onclick = function () { setTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light'); };
  setTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

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

  setTree(lsGet('nlpad.tree') === null ? !narrow() : (lsGet('nlpad.tree') === '1' && !narrow()));
  tabsChanged(); setPos(); setProbs();
})();
