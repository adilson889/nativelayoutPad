(function () {
  var EXAMPLES = {"Tasks": {"screen.nl": "<nativelayout>\n\n<link rel=\"stylesheet\" href=\"theme.css\">\n\n<body>\n    <div class=\"head\">\n        <h1>Tasks<\/h1>\n        <p class=\"sub\">{pending} pending, {done} done<\/p>\n    <\/div>\n\n    <div class=\"track\">\n        <div class=\"fill\" style=\"width: {percent}%\"><\/div>\n    <\/div>\n\n    <div class=\"row\">\n        <input id=\"title\" placeholder=\"What needs doing?\">\n        <button id=\"add\">Add<\/button>\n    <\/div>\n\n    <div class=\"filters\">\n        if filter == \"all\":\n            <button id=\"show-all\" class=\"chip-on\">All {total}<\/button>\n        else:\n            <button id=\"show-all\" class=\"chip\">All {total}<\/button>\n        end\n        if filter == \"pending\":\n            <button id=\"show-pending\" class=\"chip-on\">Pending {pending}<\/button>\n        else:\n            <button id=\"show-pending\" class=\"chip\">Pending {pending}<\/button>\n        end\n        if filter == \"done\":\n            <button id=\"show-done\" class=\"chip-on\">Done {done}<\/button>\n        else:\n            <button id=\"show-done\" class=\"chip\">Done {done}<\/button>\n        end\n    <\/div>\n\n    if shown.size == 0:\n        <div class=\"center\">\n            <p class=\"muted\">{empty}<\/p>\n        <\/div>\n    else:\n        for task in shown:\n            <div class=\"card\">\n                if task.done:\n                    <div class=\"box-on\"><\/div>\n                    <p class=\"t-done\">{task.title}<\/p>\n                else:\n                    <div class=\"box\"><\/div>\n                    <p class=\"t\">{task.title}<\/p>\n                end\n                <button class=\"remove\">Remove<\/button>\n            <\/div>\n        end\n    end\n\n    if done > 0:\n        <button id=\"clear\" class=\"ghost\">Clear completed<\/button>\n    end\n<\/body>\n\n<\/nativelayout>", "theme.css": ":root {\n        --bg: #F4F5F7;\n        --card: #FFFFFF;\n        --line: #E5E7EB;\n        --text: #111827;\n        --muted: #6B7280;\n        --accent: #4F46E5;\n        --accent-soft: #E0E7FF;\n        --danger: #DC2626;\n    }\n\n    @media (prefers-color-scheme: dark) {\n        :root {\n            --bg: #0F172A;\n            --card: #1E293B;\n            --line: #334155;\n            --text: #F1F5F9;\n            --muted: #94A3B8;\n            --accent-soft: #312E81;\n        }\n    }\n\n    body    { background: var(--bg); color: var(--text); padding: 1.25rem; gap: 1rem; }\n    p       { margin: 0; }\n    h1      { margin: 0; font-size: 1.75rem; font-weight: bold; }\n    .head   { gap: 0.25rem; }\n    .sub    { color: var(--muted); }\n    .muted  { color: var(--muted); }\n\n    .track  { background: var(--line); border-radius: 0.5rem; height: 0.5rem; }\n    .fill   { background: linear-gradient(90deg, #818CF8, #4F46E5); border-radius: 0.5rem; height: 0.5rem; }\n\n    .row    { flex-direction: row; align-items: center; gap: 0.5rem; }\n    #title  { flex: 1; color: var(--text); background: var(--card); border: 1px solid var(--line); border-radius: 0.75rem; padding: 0.875rem; }\n    #add    { background: var(--accent); color: #FFFFFF; font-weight: bold; border-radius: 0.75rem; padding: 0.875rem; }\n    #add:pressed { background: #4338CA; }\n\n    .filters { flex-direction: row; gap: 0.5rem; }\n    .chip    { background: var(--card); color: var(--muted); border: 1px solid var(--line); border-radius: 1rem; padding: 0.625rem; }\n    .chip:pressed { background: var(--accent-soft); }\n    .chip-on { background: var(--accent); color: #FFFFFF; font-weight: bold; border: 1px solid var(--accent); border-radius: 1rem; padding: 0.625rem; }\n\n    .card   { flex-direction: row; align-items: center; gap: 0.75rem; background: var(--card); border: 1px solid var(--line); border-radius: 1rem; padding: 0.875rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12); }\n    .card:pressed { background: var(--accent-soft); }\n    .box    { width: 1.5rem; height: 1.5rem; border: 2px solid var(--accent); border-radius: 0.5rem; }\n    .box-on { width: 1.5rem; height: 1.5rem; background: var(--accent); border: 2px solid var(--accent); border-radius: 0.5rem; }\n    .t      { flex: 1; font-size: 1rem; }\n    .t-done { flex: 1; font-size: 1rem; color: var(--muted); text-decoration: line-through; }\n    .remove { background: transparent; color: var(--danger); font-size: 0.875rem; padding: 0.5rem; }\n    .remove:pressed { background: #FEE2E2; }\n\n    .center { align-items: center; padding: 2rem; }\n    .ghost  { background: var(--accent-soft); color: var(--accent); font-weight: bold; border-radius: 0.75rem; padding: 0.875rem; }\n    .ghost:pressed { background: #C7D2FE; }\n", "data.json": "{\n  \"pending\": 2,\n  \"done\": 1,\n  \"total\": 3,\n  \"percent\": 33,\n  \"filter\": \"all\",\n  \"empty\": \"Nothing to do.\",\n  \"shown\": [\n    {\n      \"title\": \"Test nativelayout\",\n      \"done\": true\n    },\n    {\n      \"title\": \"Write the documentation\",\n      \"done\": false\n    },\n    {\n      \"title\": \"Call Ana\",\n      \"done\": false\n    }\n  ]\n}"}, "Hello": {"screen.nl": "<nativelayout>\n<link rel=\"stylesheet\" href=\"theme.css\">\n\n<body>\n    <h1>Hello, {name}<\/h1>\n\n    if items.size == 0:\n        <p class=\"muted\">Nothing yet.<\/p>\n    else:\n        for item in items:\n            <div class=\"card\">\n                <p>{item}<\/p>\n            <\/div>\n        end\n    end\n\n    <button id=\"go\">Say hi<\/button>\n<\/body>\n<\/nativelayout>\n", "theme.css": ":root { --bg: #F2F2F2; --card: #FFFFFF; --accent: #2F81F7; }\n\n@media (prefers-color-scheme: dark) {\n    :root { --bg: #0D1117; --card: #161B22; }\n}\n\nbody  { background: var(--bg); padding: 1.25rem; gap: 0.75rem; }\nh1    { margin: 0; font-size: 1.75rem; font-weight: bold; }\n.muted { color: #6B7280; }\n.card { background: var(--card); border-radius: 0.75rem; padding: 0.875rem; box-shadow: 0 2px 4px #0003; }\n#go   { background: var(--accent); color: #FFFFFF; font-weight: bold; border-radius: 0.75rem; padding: 0.875rem; }\n#go:pressed { background: #1F6FE0; }\n", "data.json": "{\n  \"name\": \"world\",\n  \"items\": [\n    \"First\",\n    \"Second\",\n    \"Third\"\n  ]\n}"}, "Absolute": {"screen.nl": "<nativelayout>\n<link rel=\"stylesheet\" href=\"theme.css\">\n\n<body>\n    <h1>Inbox<\/h1>\n\n    <div class=\"tile\">\n        <p>Messages<\/p>\n        <p class=\"badge\">{count}<\/p>\n    <\/div>\n<\/body>\n<\/nativelayout>\n", "theme.css": "body  { background: #0D1117; color: #C9D1D9; padding: 1.25rem; gap: 1rem; }\nh1    { margin: 0; font-size: 1.75rem; font-weight: bold; }\n.tile { background: #161B22; border: 1px solid #30363D; border-radius: 0.75rem; padding: 1.5rem; }\n.badge {\n    position: absolute; top: 0.5rem; right: 0.5rem; z-index: 2;\n    background: #F85149; color: #FFFFFF; font-weight: bold;\n    border-radius: 1rem; padding: 0.25rem;\n}\n", "data.json": "{\n  \"count\": 3\n}"}};
  var MAIN = 'screen.nl', FIXED = ['screen.nl', 'theme.css', 'data.json'];
  var KEY = 'nlpad.v2';
  var $ = function (id) { return document.getElementById(id); };
  var ta = $('ta'), hlc = $('hlc'), hlBox = $('hl'), gut = $('gut'), tabs = $('tabs'), probs = $('probs'), fr = $('fr'), sv = $('sv');
  var st = { files: {}, cur: MAIN, dark: false, view: 'code', pos: {}, problems: [] };
  var timer = null, saveTimer = null, storageOk = true, ready = false;

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  // ---------- syntax highlighting ----------
  //HL-BEGIN
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function sp(c, s) { return '<span class="' + c + '">' + esc(s) + '</span>'; }
  // rules: [RegExp without capture groups, class | function(match) -> html | '' for plain]
  function lex(text, rules) {
    var re = new RegExp(rules.map(function (r) { return '(?:(' + r[0].source + '))'; }).join('|'), 'g');
    var out = '', last = 0, m, k, r;
    while ((m = re.exec(text)) !== null) {
      if (m[0] === '') { re.lastIndex++; continue; }
      out += esc(text.slice(last, m.index));
      for (k = 0; k < rules.length; k++) {
        if (m[k + 1] !== undefined) {
          r = rules[k][1];
          out += typeof r === 'function' ? r(m[0]) : (r ? sp(r, m[0]) : esc(m[0]));
          break;
        }
      }
      last = re.lastIndex;
    }
    return out + esc(text.slice(last));
  }

  var R_COMMENT = [/\/\*[\s\S]*?(?:\*\/|$)/, 'c'];

  var R_JSON = [
    [/"(?:\\.|[^"\\\n])*"(?=\s*:)/, 'k'],
    [/"(?:\\.|[^"\\\n])*"/, 's'],
    [/-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/, 'n'],
    [/\b(?:true|false|null)\b/, 'b'],
    [/[{}\[\],:]/, 'p']
  ];
  function hlJson(s) { return lex(s, R_JSON); }

  var R_SEL = [
    R_COMMENT,
    [/"[^"\n]*"|'[^'\n]*'/, 's'],
    [/@[\w-]+/, 'a'],
    [/\.[A-Za-z_][\w-]*/, 'cl'],
    [/#[A-Za-z_][\w-]*/, 'id'],
    [/::?[A-Za-z-]+/, 'ps'],
    [/[A-Za-z][\w-]*/, 'tg']
  ];
  var R_AT = [
    R_COMMENT,
    [/"[^"\n]*"|'[^'\n]*'/, 's'],
    [/@[\w-]+/, 'a'],
    [/[A-Za-z-]+(?=\s*:)/, 'p'],
    [/\b(?:and|or|not|only)\b/, 'kw']
  ];
  var R_VAL = [
    R_COMMENT,
    [/"[^"\n]*"|'[^'\n]*'/, 's'],
    [/!important/, 'a'],
    [/#[0-9A-Fa-f]{3,8}\b/, 'n'],
    [/-{0,2}[A-Za-z_][\w-]*(?=\()/, 'f'],
    [/-{0,2}[A-Za-z_][\w-]*/, ''],
    [/-?(?:\d+\.?\d*|\.\d+)(?:[A-Za-z%]+)?/, 'n']
  ];
  function hlPrelude(f) {
    return /^(?:\s|\/\*[\s\S]*?\*\/)*@/.test(f) ? lex(f, R_AT) : lex(f, R_SEL);
  }
  function hlDecl(f) {
    var m = /^((?:\s|\/\*[\s\S]*?\*\/)*)(-{0,2}[A-Za-z_][\w-]*)(\s*:)([\s\S]*)$/.exec(f);
    if (!m) return lex(f, [R_COMMENT]);
    return lex(m[1], [R_COMMENT]) + sp(m[2].indexOf('--') === 0 ? 'pv' : 'p', m[2]) + esc(m[3]) + lex(m[4], R_VAL);
  }
  function hlCss(s) {
    var out = '', i = 0, n = s.length, stack = [], j, c, e, term, frag, inRule;
    while (i < n) {
      inRule = stack.length > 0 && stack[stack.length - 1] === 'r';
      j = i;
      while (j < n) {
        c = s.charAt(j);
        if (c === '/' && s.charAt(j + 1) === '*') { e = s.indexOf('*/', j + 2); j = e < 0 ? n : e + 2; continue; }
        if (c === '"' || c === "'") { e = s.indexOf(c, j + 1); j = e < 0 ? n : e + 1; continue; }
        if (c === '{' || c === '}' || (inRule && c === ';')) break;
        j++;
      }
      frag = s.slice(i, j);
      term = j < n ? s.charAt(j) : '';
      if (term === '{') {
        out += hlPrelude(frag) + '{';
        stack.push(/^(?:\s|\/\*[\s\S]*?\*\/)*@/.test(frag) ? 'a' : 'r');
        i = j + 1;
      } else if (term === '}') {
        out += (inRule ? hlDecl(frag) : hlPrelude(frag)) + '}';
        stack.pop();
        i = j + 1;
      } else if (term === ';') {
        out += hlDecl(frag) + ';';
        i = j + 1;
      } else {
        out += inRule ? hlDecl(frag) : hlPrelude(frag);
        i = n;
      }
    }
    return out;
  }

  var R_ATTR = [
    [/"[^"]*"|'[^']*'/, hlAttrStr],
    [/[A-Za-z_:][-\w:.]*/, 'an'],
    [/=/, 'p']
  ];
  function hlAttrStr(v) { return '<span class="s">' + lex(v, [[/\{[^{}]*\}/, 'v']]) + '</span>'; }
  function hlTag(t) {
    var m = /^(<\/?)([A-Za-z][\w-]*)([\s\S]*?)(\/?>)$/.exec(t);
    if (!m) return esc(t);
    return sp('p', m[1]) + sp('tn', m[2]) + lex(m[3], R_ATTR) + sp('p', m[4]);
  }
  var R_LINE = [
    [/<!--[\s\S]*?-->/, 'c'],
    [/<\/?[A-Za-z][^<>]*>/, hlTag],
    [/\\[{}]/, 'e'],
    [/\{[^{}]*\}/, 'v']
  ];
  var R_COND = [
    [/"[^"]*"/, 's'],
    [/-?\d+(?:\.\d+)?/, 'n'],
    [/\b(?:and|or|not|true|false)\b/, 'kw'],
    [/==|!=|<=|>=|<|>/, 'op']
  ];
  function hlLine(l) {
    var m = /^(\s*)(if|elif)(\s+)(.*?)(:)(\s*)$/.exec(l);
    if (m) return esc(m[1]) + sp('kw', m[2]) + esc(m[3]) + lex(m[4], R_COND) + esc(m[5] + m[6]);
    m = /^(\s*)for(\s+)([A-Za-z_]\w*)(\s+)in(\s+)([A-Za-z_][\w.]*)(:)(\s*)$/.exec(l);
    if (m) return esc(m[1]) + sp('kw', 'for') + esc(m[2]) + sp('v', m[3]) + esc(m[4]) + sp('kw', 'in') + esc(m[5]) + sp('v', m[6]) + esc(m[7] + m[8]);
    m = /^(\s*)(else)(:)(\s*)$/.exec(l);
    if (m) return esc(m[1]) + sp('kw', m[2]) + esc(m[3] + m[4]);
    m = /^(\s*)(end)(\s*)$/.exec(l);
    if (m) return esc(m[1]) + sp('kw', m[2]) + esc(m[3]);
    return lex(l, R_LINE);
  }
  function hlNl(src) {
    var L = src.split('\n'), out = [], i = 0, j, t, end;
    while (i < L.length) {
      t = L[i].trim();
      if (t === '<style>') {
        out.push(hlLine(L[i]));
        j = i + 1;
        while (j < L.length && L[j].trim() !== '</style>') j++;
        if (j > i + 1) out.push(hlCss(L.slice(i + 1, j).join('\n')));
        if (j < L.length) out.push(hlLine(L[j]));
        i = j + 1;
        continue;
      }
      if (t.indexOf('<!--') === 0 && t.indexOf('-->') < 0) {
        j = i;
        while (j < L.length && L[j].indexOf('-->') < 0) j++;
        end = Math.min(j, L.length - 1);
        out.push(sp('c', L.slice(i, end + 1).join('\n')));
        i = end + 1;
        continue;
      }
      out.push(hlLine(L[i]));
      i++;
    }
    return out.join('\n');
  }
  function highlight(file, text) {
    if (text.length > 200000) return esc(text);
    if (/\.nl$/i.test(file)) return hlNl(text);
    if (/\.css$/i.test(file)) return hlCss(text);
    if (/\.json$/i.test(file)) return hlJson(text);
    return esc(text);
  }
  //HL-END

  // ---------- dialogs (replace alert, confirm and prompt) ----------
  var ov = $('dlg'), dt = $('dt'), dm = $('dm'), di = $('di'), de = $('de'), dok = $('dok'), dcn = $('dcn');
  function dialog(o) {
    return new Promise(function (resolve) {
      var prev = document.activeElement;
      dt.textContent = o.title || '';
      dm.textContent = o.message || '';
      dm.hidden = !o.message;
      di.hidden = !o.input;
      di.value = o.value || '';
      di.placeholder = o.placeholder || '';
      di.readOnly = !!o.readonly;
      de.textContent = '';
      de.hidden = !o.input;
      dok.textContent = o.ok || 'OK';
      dok.className = 'btn ' + (o.danger ? 'danger' : 'go');
      dcn.textContent = o.cancel || 'Cancel';
      dcn.hidden = o.cancel === false;
      ov.hidden = false;
      function cancelValue() { return o.input ? null : false; }
      function close(v) {
        ov.hidden = true;
        dok.onclick = dcn.onclick = ov.onmousedown = null;
        document.removeEventListener('keydown', key, true);
        if (prev && prev.focus) { try { prev.focus(); } catch (e) {} }
        resolve(v);
      }
      function accept() {
        if (o.input) {
          var v = di.value.trim();
          if (o.validate) {
            var msg = o.validate(v);
            if (msg) { de.textContent = msg; di.focus(); return; }
          }
          close(v);
        } else close(true);
      }
      function key(e) {
        if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); if (o.cancel !== false) close(cancelValue()); else accept(); }
        else if (e.key === 'Enter' && e.target !== dcn) { e.preventDefault(); accept(); }
        else if (e.key === 'Tab') {
          var f = [di, dcn, dok].filter(function (x) { return !x.hidden; }), k = f.indexOf(document.activeElement);
          e.preventDefault();
          f[(k + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus();
        }
      }
      dok.onclick = accept;
      dcn.onclick = function () { close(cancelValue()); };
      ov.onmousedown = function (e) { if (e.target === ov && o.cancel !== false) close(cancelValue()); };
      document.addEventListener('keydown', key, true);
      setTimeout(function () { if (o.input) { di.focus(); di.select(); } else dok.focus(); }, 0);
    });
  }
  var toastTimer = null;
  function toast(t) {
    var el = $('toast');
    el.textContent = t; el.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('on'); }, 2200);
  }

  // ---------- storage ----------
  function sget(k) { try { return localStorage.getItem(k); } catch (e) { storageOk = false; return null; } }
  function sset(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { storageOk = false; return false; } }
  function setSaved(ok) {
    sv.textContent = ok === null ? 'Saving...' : (ok ? 'Saved' : 'Not saved');
    sv.className = 'sv' + (ok === false ? ' bad' : '');
    sv.title = ok === false ? 'Browser storage is blocked: your files are lost when the page closes. Use Share to keep a link.' : '';
  }
  function savePos() {
    if (st.files[st.cur] === undefined) return;
    st.pos[st.cur] = { s: ta.selectionStart, e: ta.selectionEnd, t: ta.scrollTop, l: ta.scrollLeft };
  }
  function flush() {
    clearTimeout(saveTimer);
    if (!ready || st.files[MAIN] === undefined) return;
    savePos();
    var ok = sset(KEY, JSON.stringify({ files: st.files, cur: st.cur, dark: st.dark, view: st.view, pos: st.pos }));
    setSaved(ok);
  }
  function save() { if (!ready) return; setSaved(null); clearTimeout(saveTimer); saveTimer = setTimeout(flush, 100); }
  window.addEventListener('pagehide', flush);
  window.addEventListener('beforeunload', flush);
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') flush(); });

  function ensureFixed() {
    FIXED.forEach(function (n) { if (typeof st.files[n] !== 'string') st.files[n] = ''; });
  }
  function applyData(d) {
    st.files = d.files;
    ensureFixed();
    st.cur = (d.cur && st.files[d.cur] !== undefined) ? d.cur : MAIN;
    st.dark = !!d.dark;
    st.view = d.view === 'view' ? 'view' : 'code';
    st.pos = (d.pos && typeof d.pos === 'object') ? d.pos : {};
  }
  function loadStored() {
    var raw = sget(KEY), d = null, f;
    if (raw) { try { d = JSON.parse(raw); } catch (e) { d = null; } }
    if (!d) {
      var old = sget('nlpad.files');
      if (old) { try { f = JSON.parse(old); if (f && f[MAIN] !== undefined) d = { files: f, dark: sget('nlpad.dark') === '1' }; } catch (e) {} }
    }
    var good = d && d.files && typeof d.files === 'object' && d.files[MAIN] !== undefined;
    if (raw && !good) sset(KEY + '.bak', raw);
    return good ? d : null;
  }

  // ---------- share links ----------
  function enc(s) {
    var b = new TextEncoder().encode(s), r = '', i;
    for (i = 0; i < b.length; i++) r += String.fromCharCode(b[i]);
    return btoa(r).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function dec(t) {
    t = t.replace(/-/g, '+').replace(/_/g, '/');
    while (t.length % 4) t += '=';
    var r = atob(t), b = new Uint8Array(r.length), i;
    for (i = 0; i < r.length; i++) b[i] = r.charCodeAt(i);
    return new TextDecoder().decode(b);
  }
  function readHash() {
    var h = location.hash.slice(1);
    if (h.indexOf('s=') !== 0) return null;
    try { var f = JSON.parse(dec(h.slice(2))); return (f && f[MAIN] !== undefined) ? f : null; } catch (e) { return null; }
  }
  function clearHash() { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {} }

  // ---------- editor ----------
  function renderCode() { hlc.innerHTML = highlight(st.cur, ta.value) + '\n'; syncScroll(); }
  function syncScroll() {
    hlBox.scrollTop = ta.scrollTop; hlBox.scrollLeft = ta.scrollLeft;
    gut.scrollTop = ta.scrollTop;
  }
  function switchTo(n) {
    if (n === st.cur) return;
    savePos(); st.cur = n; drawTabs(); show(); save();
  }
  function validName(n) {
    if (!n) return 'Type a file name.';
    if (!/^[\w.\-\/]+\.(nl|css)$/i.test(n)) return 'Use a name that ends in .nl or .css';
    if (n.indexOf('..') >= 0 || n.charAt(0) === '/') return 'This name is not allowed.';
    if (st.files[n] !== undefined) return 'A file with this name already exists.';
    return '';
  }
  function drawTabs() {
    tabs.innerHTML = '';
    Object.keys(st.files).forEach(function (n) {
      var t = document.createElement('div');
      t.className = 'tab' + (n === st.cur ? ' on' : '');
      t.textContent = n;
      t.onclick = function () { switchTo(n); };
      if (FIXED.indexOf(n) < 0) {
        var x = document.createElement('i'); x.textContent = 'x'; x.title = 'Delete file';
        x.onclick = function (e) {
          e.stopPropagation();
          dialog({ title: 'Delete file', message: 'Delete ' + n + '? This cannot be undone.', ok: 'Delete', danger: true }).then(function (yes) {
            if (!yes) return;
            delete st.files[n]; delete st.pos[n];
            if (st.cur === n) st.cur = MAIN;
            drawTabs(); show(); save(); run();
          });
        };
        t.appendChild(x);
      }
      tabs.appendChild(t);
    });
    var a = document.createElement('div');
    a.className = 'tab add'; a.textContent = '+ file';
    a.onclick = function () {
      dialog({ title: 'New file', message: 'File name, for example card.nl or extra.css', input: true, placeholder: 'card.nl', ok: 'Create', validate: validName }).then(function (n) {
        if (!n) return;
        savePos();
        st.files[n] = /\.nl$/i.test(n) ? '<nativelayout>\n<body>\n    <p>New component</p>\n</body>\n</nativelayout>\n' : '';
        st.cur = n; drawTabs(); show(); save();
      });
    };
    tabs.appendChild(a);
  }
  function show() {
    ta.value = st.files[st.cur] || '';
    var p = st.pos[st.cur];
    renderCode(); gutter();
    if (p) {
      ta.scrollTop = p.t || 0; ta.scrollLeft = p.l || 0;
      try { ta.setSelectionRange(Math.min(p.s || 0, ta.value.length), Math.min(p.e || 0, ta.value.length)); } catch (e) {}
    } else { ta.scrollTop = 0; ta.scrollLeft = 0; }
    syncScroll();
  }
  function gutter() {
    var n = ta.value.split('\n').length, m = {}, s = '', i, c;
    st.problems.forEach(function (p) {
      if (p.file !== st.cur) return;
      var sev = p.w ? 1 : 0;
      if (m[p.line] === undefined || sev < m[p.line]) m[p.line] = sev;
    });
    for (i = 1; i <= n; i++) {
      c = m[i] === 0 ? ' class="err"' : (m[i] === 1 ? ' class="warn"' : '');
      s += '<div' + c + '>' + i + '</div>';
    }
    gut.innerHTML = s;
    gut.scrollTop = ta.scrollTop;
  }
  function ins(text) {
    ta.focus();
    var ok = false;
    try { ok = document.execCommand('insertText', false, text); } catch (e) {}
    if (!ok) { ta.setRangeText(text, ta.selectionStart, ta.selectionEnd, 'end'); ta.dispatchEvent(new Event('input')); }
  }
  function indentKey(shift) {
    var v = ta.value, s = ta.selectionStart, e = ta.selectionEnd;
    if (s === e && !shift) { ins('    '); return; }
    var ls = s === 0 ? 0 : v.lastIndexOf('\n', s - 1) + 1;
    var le = (e > s && v.charAt(e - 1) === '\n') ? e - 1 : v.indexOf('\n', e);
    if (le < 0) le = v.length;
    var block = v.slice(ls, le);
    var nb = shift ? block.replace(/^( {1,4}|\t)/gm, '') : block.replace(/^(?=.)/gm, '    ');
    ta.setSelectionRange(ls, le);
    ins(nb);
    ta.setSelectionRange(ls, ls + nb.length);
  }
  ta.addEventListener('input', function () {
    st.files[st.cur] = ta.value; renderCode(); gutter(); save();
    clearTimeout(timer); timer = setTimeout(run, 350);
  });
  ta.addEventListener('scroll', syncScroll);
  ta.addEventListener('blur', function () { savePos(); save(); });
  ta.addEventListener('keydown', function (e) {
    var mod = e.ctrlKey || e.metaKey;
    if (mod && e.key === 'Enter') { e.preventDefault(); run(); return; }
    if (mod && (e.key === 's' || e.key === 'S')) { e.preventDefault(); flush(); toast(storageOk ? 'Saved' : 'Storage is blocked'); return; }
    if (e.key === 'Tab') { e.preventDefault(); indentKey(e.shiftKey); return; }
    if (e.key === 'Enter' && !mod && !e.shiftKey && !e.altKey) {
      var v = ta.value, s = ta.selectionStart;
      var ls = s === 0 ? 0 : v.lastIndexOf('\n', s - 1) + 1;
      var line = v.slice(ls, s), ind = /^[ \t]*/.exec(line)[0];
      if (/:\s*$/.test(line) || /\{\s*$/.test(line)) ind += '    ';
      if (ind) { e.preventDefault(); ins('\n' + ind); }
    }
  });
  function goLine(n) {
    var lines = ta.value.split('\n'), pos = 0, i;
    for (i = 0; i < n - 1 && i < lines.length; i++) pos += lines[i].length + 1;
    ta.focus(); ta.setSelectionRange(pos, pos + (lines[n - 1] || '').length);
    ta.scrollTop = Math.max(0, (n - 4) * 20);
    syncScroll();
  }

  // ---------- run ----------
  var BASE = 'html,body{margin:0}*{box-sizing:border-box}' +
    'body{font-family:system-ui,sans-serif;font-size:16px;color:#111}' +
    'div,header,footer,fieldset,dialog,ul,li,legend{display:flex;flex-direction:column;position:relative}' +
    'body>div:first-child{min-height:100vh}' +
    'p,h1,h2,h3,span{margin:0}h1{font-size:2em;font-weight:700}h2{font-size:1.5em;font-weight:700}h3{font-size:1.17em;font-weight:700}' +
    'button{border:0;background:#E5E7EB;font:inherit;padding:.6rem;border-radius:.4rem}' +
    'input,textarea{font:inherit;border:1px solid #ccc;padding:.6rem;border-radius:.4rem;min-width:0}' +
    'input[type=checkbox]{width:1.3rem;height:1.3rem}' +
    'header{position:sticky;top:0;z-index:5;flex-direction:row;align-items:center}footer{position:sticky;bottom:0;z-index:5}' +
    'dialog{position:fixed;inset:0;margin:0;border:0;padding:0;z-index:9;background:rgba(0,0,0,.5);justify-content:center}' +
    'img{max-width:100%;background:#ddd;min-width:1.5rem;min-height:1.5rem}' +
    'fieldset{border:1px solid #BDBDBD;border-radius:.4rem;padding:.5rem}';
  function frame(html, dark) {
    var bg = dark ? '#0D1117' : '#fff';
    return '<!doctype html><html><head><meta charset="utf-8"><meta name="color-scheme" content="' + (dark ? 'dark' : 'light') + '">' +
      '<style>' + BASE + 'html{background:' + bg + '}</style></head><body>' + html + '</body></html>';
  }
  function setProblems(list) {
    st.problems = list; gutter();
    if (!list.length) { probs.innerHTML = '<div class="ok">No problems.</div>'; return; }
    probs.innerHTML = '<div class="h">Problems (' + list.length + ')</div>';
    list.forEach(function (p) {
      var d = document.createElement('div'); d.className = 'pr' + (p.w ? ' w' : '');
      var b = document.createElement('b'); b.textContent = 'L' + p.line;
      var t = document.createElement('div'); t.textContent = p.message;
      if (p.extra) { var s = document.createElement('small'); s.textContent = p.extra; t.appendChild(s); }
      d.appendChild(b); d.appendChild(t);
      d.onclick = function () {
        if (document.body.getAttribute('data-v') === 'view') setView('code');
        if (st.files[p.file] !== undefined) switchTo(p.file);
        goLine(p.line);
      };
      probs.appendChild(d);
    });
  }
  function run() {
    if (typeof window.nlRender !== 'function') {
      $('eng').textContent = 'engine not loaded (nlweb.js)';
      setProblems([{ line: 1, message: 'The engine (nlweb.js) is not loaded. Check that nlweb.js is in the same folder as this page.', file: MAIN }]);
      return;
    }
    $('eng').textContent = '';
    var files = {};
    Object.keys(st.files).forEach(function (n) { if (n !== 'data.json') files[n] = st.files[n]; });
    var r;
    try { r = JSON.parse(window.nlRender(st.files[MAIN], JSON.stringify(files), st.files['data.json'] || '', st.dark)); }
    catch (e) { r = { ok: false, line: 1, message: String(e && e.message || e), context: '' }; }
    if (r.ok) {
      fr.srcdoc = frame(r.html, st.dark);
      setProblems(r.warnings.map(function (w) { return { line: w.line, message: w.message, w: true, file: MAIN }; }));
    } else {
      var isData = /^Data tab/.test(r.message);
      setProblems([{ line: r.line, message: r.message, extra: [r.context, r.suggestion ? 'Suggestion: ' + r.suggestion : ''].filter(Boolean).join('\n'), file: isData ? 'data.json' : MAIN }]);
    }
  }

  // ---------- header buttons ----------
  var ex = $('ex');
  var EXDIR = 'exemplos/';
  var DEFAULT_FILES = ['screen.nl', 'theme.css', 'data.json'];
  var catalog = [];
  function okName(n) { return typeof n === 'string' && /^[\w.\-\/]+\.(nl|css|json)$/i.test(n) && n.indexOf('..') < 0 && n.charAt(0) !== '/'; }
  function fallbackCatalog() { return Object.keys(EXAMPLES).map(function (k) { return { name: k, builtin: true }; }); }
  function fillSelect() {
    ex.innerHTML = '<option value="">Examples</option>' + catalog.map(function (e, i) { return '<option value="' + i + '">' + esc(e.name) + '</option>'; }).join('');
  }
  // reads exemplos/index.json; if it cannot be read, the examples built into this page are used
  function loadCatalog() {
    return fetch(EXDIR + 'index.json')
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .then(function (list) {
        if (!Array.isArray(list)) throw new Error('index');
        var good = list.filter(function (e) { return e && typeof e.name === 'string' && typeof e.folder === 'string' && e.folder.indexOf('..') < 0 && !/^\/|:/.test(e.folder); });
        if (!good.length) throw new Error('empty');
        catalog = good;
      })
      .catch(function () { catalog = fallbackCatalog(); })
      .then(fillSelect);
  }
  function fetchExample(e) {
    if (e.builtin) return Promise.resolve(clone(EXAMPLES[e.name]));
    var names = (Array.isArray(e.files) && e.files.length ? e.files : DEFAULT_FILES).filter(okName);
    var base = EXDIR + e.folder.replace(/\/+$/, '') + '/';
    return Promise.all(names.map(function (n) {
      return fetch(base + n).then(function (r) { return r.ok ? r.text() : null; }).catch(function () { return null; });
    })).then(function (texts) {
      var got = {}, files = {};
      names.forEach(function (n, i) { if (texts[i] !== null) got[n] = texts[i]; });
      if (got[MAIN] === undefined) throw new Error('screen.nl not found');
      files[MAIN] = got[MAIN];
      Object.keys(got).forEach(function (n) { if (n !== MAIN) files[n] = got[n]; });
      return files;
    });
  }
  ex.onchange = function () {
    var i = ex.value, e = catalog[Number(i)];
    ex.value = '';
    if (i === '' || !e) return;
    dialog({ title: 'Load example', message: 'Replace the current files with the "' + e.name + '" example?', ok: 'Replace', danger: true }).then(function (yes) {
      if (!yes) return;
      return fetchExample(e).then(function (files) {
        st.files = files; ensureFixed(); st.cur = MAIN; st.pos = {};
        drawTabs(); show(); save(); run();
      }, function () {
        return dialog({ title: 'Could not load example', message: 'The files of "' + e.name + '" could not be loaded. Check exemplos/index.json and the name of the folder.', cancel: false });
      });
    });
  };
  $('dark').onclick = function () { st.dark = !st.dark; this.classList.toggle('on', st.dark); save(); run(); };
  $('run').onclick = run;
  $('share').onclick = function () {
    var url = location.href.split('#')[0] + '#s=' + enc(JSON.stringify(st.files));
    function fallback() { dialog({ title: 'Share link', message: 'Copy this link:', input: true, value: url, readonly: true, ok: 'Close', cancel: false }); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(function () { toast('Link copied'); }, fallback);
    else fallback();
  };
  function setView(v) {
    st.view = v;
    document.body.setAttribute('data-v', v);
    [].forEach.call($('mt').children, function (c) { c.classList.toggle('on', c.getAttribute('data-v') === v); });
    save();
  }
  [].forEach.call($('mt').children, function (c) { c.onclick = function () { setView(c.getAttribute('data-v')); }; });

  // ---------- start ----------
  function init() {
    sset('nlpad.test', '1');
    var catalogP = loadCatalog();
    var stored = loadStored(), shared = readHash(), p = Promise.resolve();
    if (shared) {
      p = (stored && JSON.stringify(stored.files) !== JSON.stringify(shared)
        ? dialog({ title: 'Open shared link?', message: 'This link carries its own files. Opening it replaces the files in your editor.', ok: 'Open link', cancel: 'Keep mine' })
        : Promise.resolve(true)).then(function (useShared) {
          clearHash();
          if (useShared) { applyData({ files: shared, cur: MAIN, dark: stored ? stored.dark : false, view: 'code', pos: {} }); }
          else applyData(stored);
        });
    } else if (stored) applyData(stored);
    else p = catalogP.then(function () { return fetchExample(catalog[0]); })
      .catch(function () { return clone(EXAMPLES.Tasks); })
      .then(function (f) { applyData({ files: f, cur: MAIN, dark: false, view: 'code', pos: {} }); });
    return p;
  }
  init().then(function () {
    $('dark').classList.toggle('on', st.dark);
    drawTabs(); show(); setView(st.view);
    ready = true;
    if (!storageOk) { setSaved(false); toast('Browser storage is blocked: files will not be kept'); }
    else {
      flush();
      // ask the browser not to clear the saved files when it needs space
      try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}
    }
    if (window.nlRender) run(); else window.addEventListener('load', run);
  });
})();
