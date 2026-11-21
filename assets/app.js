// Shared UI: icon sprite, reader settings, progress bar, tabs, Bible-reference & source popups.
(function () {
  var root = document.documentElement;
  var BASE = (document.currentScript && document.currentScript.src.replace(/assets\/app\.js.*$/, '')) || '../../';

  // ---------- reader settings (per browser) ----------
  var PREFS = { theme: '', size: '2', font: 'sans', spacing: 'normal' };
  function load() { try { var p = JSON.parse(localStorage.getItem('reader') || '{}'); for (var k in p) PREFS[k] = p[k]; } catch (e) {} }
  function save() { try { localStorage.setItem('reader', JSON.stringify(PREFS)); } catch (e) {} }
  function apply() {
    if (PREFS.theme) root.dataset.theme = PREFS.theme; else delete root.dataset.theme;
    root.dataset.size = PREFS.size; root.dataset.font = PREFS.font; root.dataset.spacing = PREFS.spacing;
  }
  load(); apply();

  // ---------- icons (Lucide, ISC licence) ----------
  var P = {
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    scroll: '<path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/>',
    map: '<path d="M14.1 6.3 9.9 4.2a2 2 0 0 0-1.8 0L3.6 6.4A1 1 0 0 0 3 7.3v12.1a1 1 0 0 0 1.4.9l3.7-1.8a2 2 0 0 1 1.8 0l4.2 2.1a2 2 0 0 0 1.8 0l4.5-2.2a1 1 0 0 0 .6-.9V5.4a1 1 0 0 0-1.4-.9l-3.7 1.8a2 2 0 0 1-1.8 0z"/><path d="M15 6v15M9 3v15"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
    bulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    ext: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    type: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
    milestone: '<path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5z"/><path d="M12 13v8M12 3v3"/>',
    anchor: '<circle cx="12" cy="5" r="3"/><path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3"/>',
    quote: '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>',
    alert: '<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3"/><path d="M12 9v4M12 17h.01"/>',
    heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
    crown: '<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7z"/><path d="M5 20h14"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    hourglass: '<path d="M5 22h14M5 2h14M17 22v-4.2a2 2 0 0 0-.6-1.4L12 12l-4.4 4.4a2 2 0 0 0-.6 1.4V22M7 2v4.2a2 2 0 0 0 .6 1.4L12 12l4.4-4.4a2 2 0 0 0 .6-1.4V2"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
    footprints: '<path d="M4 16v-2.4C4 11.5 3 10.5 3 8c0-2.7 1.5-6 4.5-6C9.4 2 10 3.8 10 5.5c0 3.1-2 5.7-2 8.7V16a2 2 0 1 1-4 0zM20 20v-2.4c0-2.1 1-3.1 1-5.6 0-2.7-1.5-6-4.5-6C14.6 6 14 7.8 14 9.5c0 3.1 2 5.7 2 8.7V20a2 2 0 1 0 4 0zM16 17h4M4 13h4"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    chevl: '<path d="m15 18-6-6 6-6"/>', chevr: '<path d="m9 18 6-6-6-6"/>'
  };
  function icon(name, cls) {
    return '<svg class="i ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (P[name] || '') + '</svg>';
  }
  window.bbIcon = icon;

  // ---------- Bible references (keep in sync with tools/build_verses.py) ----------
  var BOOKS = { 'ஆதி': 1, 'யாத்': 2, 'லேவி': 3, 'எண்': 4, 'உபா': 5, 'சங்': 19, 'நீதி': 20, 'ஏசா': 23, 'எரே': 24,
    'மத்': 40, 'மாற்': 41, 'லூக்': 42, 'யோவா': 43, 'அப்': 44, 'ரோ': 45, '1கொ': 46, '2கொ': 47,
    'கலா': 48, 'எபே': 49, 'பிலி': 50, 'கொலோ': 51, '1தெ': 52, '2தெ': 53, '1தீ': 54, '2தீ': 55,
    'தீத்து': 56, 'எபி': 58, 'யாக்': 59, '1பே': 60, '2பே': 61, '1யோ': 62, '2யோ': 63, 'வெளி': 66 };
  var NAMES = { 1: 'ஆதியாகமம்', 2: 'யாத்திராகமம்', 5: 'உபாகமம்', 19: 'சங்கீதம்', 23: 'ஏசாயா', 40: 'மத்தேயு', 41: 'மாற்கு', 42: 'லூக்கா', 43: 'யோவான்',
    44: 'அப்போஸ்தலர்', 45: 'ரோமர்', 46: '1 கொரிந்தியர்', 47: '2 கொரிந்தியர்', 48: 'கலாத்தியர்', 49: 'எபேசியர்', 50: 'பிலிப்பியர்', 51: 'கொலோசெயர்',
    52: '1 தெசலோனிக்கேயர்', 54: '1 தீமோத்தேயு', 55: '2 தீமோத்தேயு', 58: 'எபிரெயர்', 60: '1 பேதுரு', 62: '1 யோவான்', 63: '2 யோவான்', 66: 'வெளிப்படுத்துதல்' };
  var bookRe = Object.keys(BOOKS).sort(function (a, b) { return b.length - a.length; }).join('|');
  var SEG = new RegExp('(?:(' + bookRe + ')\\s?)?(\\d{1,3}):(\\d{1,3}(?:[-–]\\d{1,3})?(?:,\\s?\\d{1,3}(?:[-–]\\d{1,3})?)*)', 'g');

  function versesOf(spec) {
    var out = [];
    spec.split(/,\s?/).forEach(function (p) {
      var ab = p.replace('–', '-').split('-'), a = +ab[0], b = ab[1] ? +ab[1] : a;
      for (var v = a; v <= Math.min(b, a + 40); v++) out.push(v);
    });
    return out;
  }

  function linkRefs(scope, defaultBook) {
    var walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        return n.parentElement.closest('a,summary,script,style,.src,.no-refs,button,svg,th') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var text = node.nodeValue; SEG.lastIndex = 0;
      if (!SEG.test(text)) return;
      SEG.lastIndex = 0;
      var frag = document.createDocumentFragment(), last = 0, lastEnd = -10, book = null, m;
      while ((m = SEG.exec(text))) {
        if (m[1]) book = BOOKS[m[1]]; else if (m.index - lastEnd > 3) book = defaultBook;
        lastEnd = m.index + m[0].length;
        frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        var a = document.createElement('a');
        a.className = 'ref'; a.href = wolUrl(book, +m[2], versesOf(m[3])[0]); a.target = '_blank'; a.rel = 'noopener';
        a.dataset.b = book; a.dataset.c = m[2]; a.dataset.v = m[3];
        a.textContent = m[0];
        frag.appendChild(a); last = lastEnd;
      }
      frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
  }
  function wolUrl(b, c, v) {
    return 'https://wol.jw.org/ta/wol/b/r122/lp-tl/' + (b >= 40 ? 'nwtsty' : 'nwt') + '/' + b + '/' + c + (v ? '#v=' + b + ':' + c + ':' + v : '');
  }

  // ---------- popup ----------
  var data = { verses: null, sources: null };
  function getJSON(name) {
    return fetch(BASE + 'data/' + name).then(function (r) { return r.json(); }).catch(function () { return {}; });
  }
  var pop, popBody, popTitle, popLink;
  function buildPopup() {
    pop = document.createElement('div');
    pop.className = 'pop'; pop.hidden = true;
    pop.innerHTML = '<div class="pop-backdrop" data-close></div><div class="pop-card" role="dialog" aria-modal="true" aria-labelledby="pop-title">' +
      '<div class="pop-head"><div id="pop-title" class="pop-title"></div><button class="icon-btn ghost" data-close aria-label="மூடு">' + icon('x') + '</button></div>' +
      '<div class="pop-body"></div><div class="pop-foot"><a class="btn" target="_blank" rel="noopener">' + icon('ext') + '<span>wol.jw.org-ல் திற</span></a></div></div>';
    document.body.appendChild(pop);
    popBody = pop.querySelector('.pop-body'); popTitle = pop.querySelector('.pop-title'); popLink = pop.querySelector('.pop-foot a');
    pop.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }
  function open(title, bodyHtml, url) {
    popTitle.innerHTML = title; popBody.innerHTML = bodyHtml; popLink.href = url;
    pop.hidden = false; document.body.classList.add('noscroll');
    pop.querySelector('.pop-head button').focus({ preventScroll: true });
  }
  function close() { if (pop && !pop.hidden) { pop.hidden = true; document.body.classList.remove('noscroll'); } }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function showRef(a) {
    var b = +a.dataset.b, c = +a.dataset.c, vs = versesOf(a.dataset.v);
    var title = icon('book') + '<span>' + esc((NAMES[b] || '') + ' ' + c + ':' + a.dataset.v) + '</span>';
    var render = function () {
      var html = vs.map(function (v) {
        var t = data.verses[b + ':' + c + ':' + v];
        return '<p class="pv"><sup>' + v + '</sup>' + (t ? esc(t) : '<span class="muted">இந்த வசனம் இன்னும் சேமிக்கப்படவில்லை — wol-ல் திறக்கவும்.</span>') + '</p>';
      }).join('');
      open(title, html + '<p class="pop-note">புதிய உலக மொழிபெயர்ப்பு</p>', wolUrl(b, c, vs[0]));
    };
    if (data.verses) render(); else getJSON('verses-ta.json').then(function (d) { data.verses = d; render(); });
  }
  function showSrc(a) {
    var key = a.dataset.src;
    var render = function () {
      var s = data.sources[key];
      if (!s) { window.open(a.href, '_blank'); return; }
      open(icon('scroll') + '<span>' + esc(s.pub) + '</span>',
        '<h3 class="pop-h">' + esc(s.title) + '</h3><p>' + esc(s.summary) + '</p>' +
        (s.url_ta ? '<p><a href="' + s.url_ta + '" target="_blank" rel="noopener">தமிழ்ப் பதிப்பு ' + icon('ext') + '</a></p>' : '') +
        '<p class="pop-note">இது ஒரு சுருக்கம். முழுக் கட்டுரையை wol-ல் வாசிக்கவும்.</p>', s.url);
    };
    if (data.sources) render(); else getJSON('sources.json').then(function (d) { data.sources = d; render(); });
  }

  // ---------- reader panel ----------
  function buildReader(btn) {
    var panel = document.createElement('div');
    panel.className = 'reader-panel'; panel.hidden = true;
    function group(label, key, opts) {
      return '<div class="rp-row"><span class="rp-label">' + label + '</span><div class="seg" data-key="' + key + '">' +
        opts.map(function (o) { return '<button data-val="' + o[0] + '"' + (o[2] ? ' class="' + o[2] + '"' : '') + '>' + o[1] + '</button>'; }).join('') + '</div></div>';
    }
    panel.innerHTML =
      group('எழுத்து அளவு', 'size', [['1', 'அ', 'fs1'], ['2', 'அ', 'fs2'], ['3', 'அ', 'fs3'], ['4', 'அ', 'fs4']]) +
      group('எழுத்துரு', 'font', [['sans', 'Sans'], ['serif', 'Serif', 'serif']]) +
      group('வரி இடைவெளி', 'spacing', [['normal', 'சாதாரண'], ['relaxed', 'அகலமாக']]) +
      group('தோற்றம்', 'theme', [['', 'தானியங்கி'], ['light', 'வெளிர்'], ['sepia', 'செபியா'], ['dark', 'இருள்']]);
    btn.parentNode.appendChild(panel);
    function sync() {
      panel.querySelectorAll('.seg').forEach(function (s) {
        s.querySelectorAll('button').forEach(function (b) { b.classList.toggle('on', PREFS[s.dataset.key] === b.dataset.val); });
      });
    }
    panel.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      PREFS[b.parentNode.dataset.key] = b.dataset.val; apply(); save(); sync();
    });
    btn.addEventListener('click', function (e) { e.stopPropagation(); panel.hidden = !panel.hidden; sync(); });
    document.addEventListener('click', function (e) { if (!panel.hidden && !panel.contains(e.target) && e.target !== btn) panel.hidden = true; });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // icons declared as <i data-i="name"></i>
    document.querySelectorAll('i[data-i]').forEach(function (el) { el.outerHTML = icon(el.dataset.i, el.className); });

    var rb = document.getElementById('reader-btn');
    if (rb) buildReader(rb);


    // Bible references → popup
    var main = document.querySelector('main');
    var book = +(document.body.dataset.book || 0);
    if (main && book) linkRefs(main, book);
    buildPopup();
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a.ref, a.src[data-src]');
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      if (a.classList.contains('ref')) showRef(a); else showSrc(a);
    });

    // expand all
    var ex = document.getElementById('expand-all');
    if (ex) ex.addEventListener('click', function () {
      var openAll = ex.dataset.open !== '1';
      document.querySelectorAll('details.vs').forEach(function (d) { d.open = openAll; });
      ex.dataset.open = openAll ? '1' : '0';
      ex.querySelector('span').textContent = openAll ? 'அனைத்தையும் மூடு' : 'அனைத்தையும் திற';
    });

    if (document.body.classList.contains('app')) initApp();
  });

  // ---------- two-pane chapter app ----------
  function rangeOf(text) {
    var m = /(\d+):(\d+)(?:[–-](\d+))?/.exec(text || '');
    return m ? [+m[2], +(m[3] || m[2])] : null;
  }
  function initApp() {
    var body = document.body, book = +body.dataset.book, ch = +body.dataset.chapter;
    var content = document.querySelector('.content'), list = document.getElementById('vlist');
    var views = document.querySelectorAll('.view'), tabs = document.querySelectorAll('.tabs button');

    function show(v, keepScroll) {
      body.classList.toggle('show-verses', v === 'verses');
      tabs.forEach(function (b) { b.classList.toggle('on', b.dataset.v === v); });
      if (v !== 'verses') {
        views.forEach(function (s) { s.classList.toggle('on', s.dataset.view === v); });
        if (!keepScroll) content.scrollTop = 0;
        try { history.replaceState(null, '', '#' + v); } catch (e) {}
      }
    }
    tabs.forEach(function (b) { b.addEventListener('click', function () { show(b.dataset.v); }); });
    document.addEventListener('click', function (e) {
      var go = e.target.closest('[data-go]'); if (!go) return;
      e.preventDefault(); show(go.dataset.go);
      if (go.dataset.verse) focusVerse(+go.dataset.verse);
    });
    var start = location.hash.slice(1);
    show(document.querySelector('.view[data-view="' + start + '"]') ? start : views[0].dataset.view);

    // tag each study block with its verse range
    var blocks = [].slice.call(document.querySelectorAll('details.vs'));
    blocks.forEach(function (d) { var r = rangeOf(d.querySelector('.vref').textContent); if (r) d.dataset.r = r.join('-'); });

    function highlight(a, b, scrollPane) {
      var first = null;
      list.querySelectorAll('.verse').forEach(function (x) {
        var n = +x.dataset.v, on = n >= a && n <= b; x.classList.toggle('hl', on); if (on && !first) first = x;
      });
      if (first && scrollPane) list.parentNode.scrollTo({ top: first.offsetTop - 60, behavior: 'smooth' });
    }
    function focusVerse(v) {
      var d = blocks.filter(function (b) { if (!b.dataset.r) return false; var r = b.dataset.r.split('-'); return v >= +r[0] && v <= +r[1]; })[0];
      if (window.matchMedia('(max-width:860px)').matches || !document.querySelector('.view.on[data-view="study"]')) show('study', true);
      blocks.forEach(function (b) { b.classList.remove('hl'); });
      if (d) {
        var r = d.dataset.r.split('-'); d.open = true; d.classList.add('hl'); highlight(+r[0], +r[1], false);
        setTimeout(function () { d.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 30);
      } else highlight(v, v, false);
    }
    blocks.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (!d.open || !d.dataset.r) return;
        var r = d.dataset.r.split('-'); highlight(+r[0], +r[1], true);
      });
    });

    // verse pane
    var parts = JSON.parse(document.getElementById('verses').dataset.parts || '[]');
    getJSON('verses-ta.json').then(function (d) {
      data.verses = d;
      var html = parts.map(function (p) {
        var rows = '';
        for (var v = p[0]; v <= p[1]; v++) {
          rows += '<div class="verse" data-v="' + v + '"><span class="n">' + v + '</span><p>' + esc(d[book + ':' + ch + ':' + v] || '') + '</p></div>';
        }
        return '<div class="vgroup"><div class="vgroup-title">' + p[0] + '–' + p[1] + ' · ' + esc(p[2]) + '</div>' + rows + '</div>';
      }).join('');
      list.innerHTML = html;
      list.addEventListener('click', function (e) { var x = e.target.closest('.verse'); if (x) focusVerse(+x.dataset.v); });
    });
  }
})();
