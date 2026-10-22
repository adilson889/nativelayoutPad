/* vars.js - quando o .nl usa nomes que o data.json nao tem, oferece preenche-los num dialogo
   e grava no data.json (cria-o se nao existir). So interface. */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var fill = $('fill'), auto = $('auto');
  if (!fill || !auto) return;

  function refresh() {
    var info = window.nlAutoInfo, names = info && info.names || [];
    fill.hidden = !names.length;
    fill.textContent = names.length ? 'New data: ' + names.join(', ') + '  \u00B7 Fill' : '';
  }
  new MutationObserver(refresh).observe(auto, { childList: true, characterData: true, subtree: true });

  function el(tag, cls, txt) { var n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; }
  function isBool(v) { return typeof v === 'boolean'; }
  function parseBool(s) { return /^(true|sim|yes|1)$/i.test(s.trim()); }
  function csv(s) { return s.split(',').map(function (x) { return x.trim(); }).filter(function (x) { return x !== ''; }); }

  // cada campo: { label, hint, read(): valor }
  function buildFields(names, guesses) {
    var out = [];
    names.forEach(function (nm) {
      var g = guesses[nm];
      if (Array.isArray(g) && g.length && typeof g[0] === 'object' && g[0] !== null) {
        var keys = Object.keys(g[0]), inputs = {}, wrap = el('div', 'vgroup');
        wrap.appendChild(el('div', 'vh', nm + ' (list, items separated by commas)'));
        keys.forEach(function (k) {
          var i = el('input'); i.type = 'text'; i.value = g.map(function (o) { return o[k]; }).join(', ');
          inputs[k] = i;
          var row = el('label', 'vrow'); row.appendChild(el('span', null, nm + '.' + k)); row.appendChild(i); wrap.appendChild(row);
        });
        out.push({ node: wrap, name: nm, read: function () {
          var cols = {}, n = 0;
          keys.forEach(function (k) { cols[k] = csv(inputs[k].value); n = Math.max(n, cols[k].length); });
          var list = [];
          for (var r = 0; r < n; r++) { var o = {}; keys.forEach(function (k) { var v = cols[k][r]; o[k] = isBool(g[0][k]) ? (v !== undefined && parseBool(v)) : (v === undefined ? '' : v); }); list.push(o); }
          return list;
        } });
      } else if (Array.isArray(g)) {
        var i1 = el('input'); i1.type = 'text'; i1.value = g.join(', ');
        var r1 = el('label', 'vrow'); r1.appendChild(el('span', null, nm + ' (list)')); r1.appendChild(i1);
        out.push({ node: r1, name: nm, read: function () { return csv(i1.value); } });
      } else if (isBool(g)) {
        var s = el('select'); ['true', 'false'].forEach(function (o) { var op = el('option', null, o); s.appendChild(op); }); s.value = String(g);
        var r2 = el('label', 'vrow'); r2.appendChild(el('span', null, nm)); r2.appendChild(s);
        out.push({ node: r2, name: nm, read: function () { return s.value === 'true'; } });
      } else {
        var i3 = el('input'); i3.type = 'text'; i3.value = String(g);
        var r3 = el('label', 'vrow'); r3.appendChild(el('span', null, nm)); r3.appendChild(i3);
        out.push({ node: r3, name: nm, read: function () { var v = i3.value; return typeof g === 'number' && v.trim() !== '' && !isNaN(Number(v)) ? Number(v) : v; } });
      }
    });
    return out;
  }

  function open() {
    var info = window.nlAutoInfo; if (!info || !info.names.length) return;
    var current = {}, raw = window.nlPad && window.nlPad.getData();
    if (raw && raw.trim()) {
      try { current = JSON.parse(raw); } catch (e) { current = null; }
      if (!current || typeof current !== 'object' || Array.isArray(current)) { alert('data.json is not valid. Fix it first.'); return; }
    }
    var ov = el('div', 'ov'), dlg = el('div', 'dlg vdlg');
    dlg.setAttribute('role', 'dialog'); dlg.setAttribute('aria-modal', 'true');
    dlg.appendChild(el('h2', null, 'Fill in the data'));
    dlg.appendChild(el('p', null, 'These names are used in the layout but are not in data.json. They will be saved there.'));
    var fields = buildFields(info.names, info.guesses), body = el('div', 'vbody');
    fields.forEach(function (f) { body.appendChild(f.node); });
    dlg.appendChild(body);
    var act = el('div', 'dact'), cn = el('button', 'btn', 'Cancel'), ok = el('button', 'btn go', 'Save');
    cn.type = ok.type = 'button'; act.appendChild(cn); act.appendChild(ok); dlg.appendChild(act);
    ov.appendChild(dlg); document.body.appendChild(ov);
    var first = dlg.querySelector('input,select'); if (first) first.focus();
    function close() { document.removeEventListener('keydown', key, true); ov.remove(); }
    function key(e) { if (e.key === 'Escape') { e.stopPropagation(); close(); } }
    document.addEventListener('keydown', key, true);
    cn.onclick = close;
    ov.addEventListener('mousedown', function (e) { if (e.target === ov) close(); });
    ok.onclick = function () {
      fields.forEach(function (f) { current[f.name] = f.read(); });
      close();
      window.nlPad.writeData(current);
    };
  }
  fill.onclick = open;
  refresh();
})();
