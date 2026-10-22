/* auto.js - data.json opcional. So afecta a previa (o core nao muda).
   Se o ecra usa nomes que o data.json nao tem, a previa inventa valores de exemplo e avisa. */
(function () {
  var BOOL = /^(done|checked|on|off|active|selected|enabled|disabled|visible|open|ok|ready|completed)$/i;
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function rx(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function guess(name, src) {
    var n = rx(name), m = new RegExp('\\bfor\\s+(\\w+)\\s+in\\s+' + n + '\\b').exec(src);
    if (m) {                                   // lista
      var v = m[1], fields = [], seen = {}, f, re = new RegExp('\\b' + rx(v) + '\\.(\\w+)', 'g');
      while ((f = re.exec(src))) if (!seen[f[1]]) { seen[f[1]] = 1; fields.push(f[1]); }
      var out = [];
      for (var i = 1; i <= 3; i++) {
        if (!fields.length) { out.push(cap(v) + ' ' + i); continue; }
        var o = {};
        fields.forEach(function (k) { o[k] = BOOL.test(k) ? i % 2 === 0 : (k === 'size' ? 0 : cap(k) + ' ' + i); });
        out.push(o);
      }
      return out;
    }
    if (new RegExp('\\b' + n + '\\.size\\b').test(src)) return ['Item 1', 'Item 2', 'Item 3'];
    if (/percent|progress|pct/i.test(name)) return 60;
    if (new RegExp('\\b' + n + '\\s*(>=|<=|>|<)|(>=|<=|>|<)\\s*' + n + '\\b').test(src)) return 3;
    if (new RegExp('\\b(if|elif)\\s+(not\\s+)?' + n + '\\s*:').test(src)) return true;
    return cap(name);
  }

  function note(txt) { var el = document.getElementById('auto'); if (el) el.textContent = txt; }

  window.nlAutoRender = function (screen, files, data, dark) {
    var user;
    try { user = data && data.trim() ? JSON.parse(data) : {}; } catch (e) { window.nlAutoInfo = { names: [], guesses: {} }; note(''); return window.nlRender(screen, files, data, dark); }
    if (!user || typeof user !== 'object' || Array.isArray(user)) { window.nlAutoInfo = { names: [], guesses: {} }; note(''); return window.nlRender(screen, files, data, dark); }
    var d = {}, k, added = [], guessed = {}, res;
    for (k in user) d[k] = user[k];
    for (var i = 0; i < 60; i++) {
      res = window.nlRender(screen, files, JSON.stringify(d), dark);
      var j; try { j = JSON.parse(res); } catch (e) { break; }
      var m = !j.ok && /the name '([\w.]+)' was not given by the program/.exec(j.message || '');
      var nm = m && m[1].split('.')[0];
      if (!m || nm in d) break;
      d[nm] = guess(nm, screen); guessed[nm] = d[nm]; added.push(nm);
    }
    window.nlAutoInfo = { names: added, guesses: guessed };
    note(added.length ? 'sample data: ' + added.join(', ') : '');
    return res;
  };
})();
