// Shared UI: icon sprite, reader settings, progress bar, tabs, Bible-reference & source popups.
(function () {
  var root = document.documentElement;
  var BASE = (document.currentScript && document.currentScript.src.replace(/assets\/app\.js.*$/, '')) || '../../';

  // ---------- reader settings (per browser) ----------
  var PREFS = { theme: '', size: '2', font: 'sans', spacing: 'normal', en: 'off', brief: 'off' };
  function load() { try { var p = JSON.parse(localStorage.getItem('reader') || '{}'); for (var k in p) PREFS[k] = p[k]; } catch (e) {} }
  function save() { try { localStorage.setItem('reader', JSON.stringify(PREFS)); } catch (e) {} }
  function apply() {
    if (PREFS.theme) root.dataset.theme = PREFS.theme; else delete root.dataset.theme;
    root.dataset.size = PREFS.size; root.dataset.font = PREFS.font; root.dataset.spacing = PREFS.spacing; root.dataset.en = PREFS.en;
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
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    play: '<path d="M6 4v16l14-8z"/>',
    headphones: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
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
    'தீத்து': 56, 'எபி': 58, 'யாக்': 59, '1பே': 60, '2பே': 61, '1யோ': 62, '2யோ': 63, 'வெளி': 66,
    'யோசு': 6, 'நியா': 7, '1சா': 9, '2சா': 10, '1இரா': 11, '2இரா': 12, 'யோபு': 18, 'எசே': 26, 'தானி': 27, 'நெ': 16, '1 சாமுவேல்': 9, '2 சாமுவேல்': 10, '1 ராஜாக்கள்': 11, '2 ராஜாக்கள்': 12, '1 நாளாகமம்': 13, '2 நாளாகமம்': 14, 'லூ': 42, '1ரா': 11, '2ரா': 12, '1நா': 13, '2நா': 14, 'ஆமோஸ்': 30, 'எஸ்றா': 15, 'எஸ்தர்': 17, 'பிர': 21, 'புல': 25, 'மீகா': 33, 'சக': 38, 'பிலே': 57, '3யோ': 64, 'யூதா': 65, 'நெகேமியா': 16, 'தானியேல்': 27, 'ஓசி': 28, 'யோவே': 29, 'ஆமோ': 30, 'ஆப': 35, 'மல்': 39, 'ஆதியாகமம்': 1, 'யாத்திராகமம்': 2, 'லேவியராகமம்': 3, 'எண்ணாகமம்': 4, 'உபாகமம்': 5, 'யோசுவா': 6, 'சங்கீதம்': 19, 'நீதிமொழிகள்': 20, 'ஏசாயா': 23, 'எரேமியா': 24, 'எசேக்கியேல்': 26, 'தானியேல்': 27, 'ஓசியா': 28, 'யோவேல்': 29, 'ஆபகூக்': 35, 'மத்தேயு': 40, 'மாற்கு': 41, 'லூக்கா': 42, 'யோவான்': 43, 'அப்போஸ்தலர்': 44, 'ரோமர்': 45, '1 கொரிந்தியர்': 46, '2 கொரிந்தியர்': 47, 'கலாத்தியர்': 48, 'எபேசியர்': 49, 'பிலிப்பியர்': 50, 'கொலோசெயர்': 51, '1 தெசலோனிக்கேயர்': 52, '1 தீமோத்தேயு': 54, '2 தீமோத்தேயு': 55, 'எபிரெயர்': 58, '1 பேதுரு': 60, '2 பேதுரு': 61, '1 யோவான்': 62, 'வெளிப்படுத்துதல்': 66 };
  var NAMES = { 1: 'ஆதியாகமம்', 2: 'யாத்திராகமம்', 5: 'உபாகமம்', 19: 'சங்கீதம்', 23: 'ஏசாயா', 40: 'மத்தேயு', 41: 'மாற்கு', 42: 'லூக்கா', 43: 'யோவான்',
    44: 'அப்போஸ்தலர்', 45: 'ரோமர்', 46: '1 கொரிந்தியர்', 47: '2 கொரிந்தியர்', 48: 'கலாத்தியர்', 49: 'எபேசியர்', 50: 'பிலிப்பியர்', 51: 'கொலோசெயர்',
    52: '1 தெசலோனிக்கேயர்', 54: '1 தீமோத்தேயு', 55: '2 தீமோத்தேயு', 58: 'எபிரெயர்', 60: '1 பேதுரு', 62: '1 யோவான்', 63: '2 யோவான்', 66: 'வெளிப்படுத்துதல்', 13: '1 நாளாகமம்', 14: '2 நாளாகமம்', 15: 'எஸ்றா', 17: 'எஸ்தர்', 21: 'பிரசங்கி', 25: 'புலம்பல்', 33: 'மீகா', 38: 'சகரியா', 57: 'பிலேமோன்', 64: '3 யோவான்', 65: 'யூதா', 16: 'நெகேமியா', 3: 'லேவியராகமம்', 4: 'எண்ணாகமம்', 6: 'யோசுவா', 7: 'நியாயாதிபதிகள்', 9: '1 சாமுவேல்', 10: '2 சாமுவேல்', 11: '1 ராஜாக்கள்', 12: '2 ராஜாக்கள்', 18: 'யோபு', 20: 'நீதிமொழிகள்', 24: 'எரேமியா', 26: 'எசேக்கியேல்', 27: 'தானியேல்', 28: 'ஓசியா', 29: 'யோவேல்', 30: 'ஆமோஸ்', 35: 'ஆபகூக்', 39: 'மல்கியா', 53: '2 தெசலோனிக்கேயர்', 56: 'தீத்து', 59: 'யாக்கோபு', 61: '2 பேதுரு' };
  var bookRe = Object.keys(BOOKS).sort(function (a, b) { return b.length - a.length; }).join('|');
  var SEG = new RegExp('(?:(' + bookRe + ')\\s?)?(\\d{1,3}):(\\d{1,3}(?:[-–]\\d{1,3}(?::\\d{1,3})?)?(?:,\\s?\\d{1,3}(?:[-–]\\d{1,3})?(?![\\u0B80-\\u0BFF\\d:]))*)', 'g');

  function versesOf(spec) {
    var out = [];
    spec.split(/,\s?/).forEach(function (p) {
      var ab = p.replace('–', '-').split('-'), a = +ab[0], b = ab[1] && ab[1].indexOf(':') < 0 ? +ab[1] : a;
      if (b < a) b = a; // cross-chapter range like 15:40–16:1
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
  var data = { verses: null, sources: null, people: null };
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
  function open(title, bodyHtml, url, mode) {
    pop.className = 'pop' + (mode ? ' ' + mode : '');
    popTitle.innerHTML = title; popBody.innerHTML = bodyHtml;
    popLink.parentNode.hidden = !url; if (url) popLink.href = url;
    pop.hidden = false; document.body.classList.add('noscroll');
    pop.querySelector('.pop-head button').focus({ preventScroll: true });
  }
  function close() { if (pop && !pop.hidden) { pop.hidden = true; document.body.classList.remove('noscroll'); } }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // ---------- optional English verse comparison ----------
  function withEnglish(cb) {
    if (PREFS.en !== 'on') { cb(null); return; }
    if (data.en) { cb(data.en); return; }
    getJSON('verses-en.json').then(function (d) { data.en = d; cb(d); });
  }
  function enLine(en, key) { return en && en[key] ? '<span class="en">' + esc(en[key]) + '</span>' : ''; }

  function showRef(a) {
    var b = +a.dataset.b, c = +a.dataset.c, vs = versesOf(a.dataset.v);
    var title = icon('book') + '<span>' + esc((NAMES[b] || '') + ' ' + c + ':' + a.dataset.v) + '</span>';
    var render = function () { withEnglish(function (en) {
      var html = vs.map(function (v) {
        var t = data.verses[b + ':' + c + ':' + v];
        return '<p class="pv"><sup>' + v + '</sup>' + (t ? esc(t) : '<span class="muted">இந்த வசனம் இன்னும் சேமிக்கப்படவில்லை — wol-ல் திறக்கவும்.</span>') + enLine(en, b + ':' + c + ':' + v) + '</p>';
      }).join('');
      open(title, html + '<p class="pop-note">புதிய உலக மொழிபெயர்ப்பு' + (en ? ' · New World Translation' : '') + '</p>', wolUrl(b, c, vs[0]));
    }); };
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

  // full-screen image viewer: double-tap / pinch to zoom, drag to pan, swipe down or × to close
  function showImage(img) {
    var fig = img.closest('figure'), cap = fig && fig.querySelector('figcaption');
    var v = document.createElement('div');
    v.className = 'iv';
    v.innerHTML = '<button class="iv-close" aria-label="மூடு">' + icon('x') + '</button>' +
      '<div class="iv-stage"><img src="' + img.currentSrc + '" alt="' + esc(img.alt) + '"></div>' +
      (cap ? '<div class="iv-cap">' + cap.innerHTML + '</div>' : '');
    document.body.appendChild(v); document.body.classList.add('noscroll');
    var stage = v.querySelector('.iv-stage'), pic = stage.querySelector('img'), capEl = v.querySelector('.iv-cap');
    var zoomed = false, lastTap = 0, startY = null;
    function done() { v.remove(); document.body.classList.remove('noscroll'); document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape') done(); }
    function zoom(on, cx, cy) {
      zoomed = on; v.classList.toggle('zoomed', on);
      if (on) {
        var r = pic.getBoundingClientRect(), fx = (cx - r.left) / r.width, fy = (cy - r.top) / r.height;
        requestAnimationFrame(function () { stage.scrollLeft = fx * stage.scrollWidth - stage.clientWidth / 2; stage.scrollTop = fy * stage.scrollHeight - stage.clientHeight / 2; });
      }
    }
    document.addEventListener('keydown', onKey);
    v.querySelector('.iv-close').addEventListener('click', done);
    if (capEl) capEl.addEventListener('click', function (e) { if (!e.target.closest('a')) capEl.classList.toggle('open'); });
    pic.addEventListener('dblclick', function (e) { zoom(!zoomed, e.clientX, e.clientY); });
    pic.addEventListener('touchend', function (e) {
      var now = Date.now();
      if (now - lastTap < 300 && e.changedTouches[0]) { e.preventDefault(); zoom(!zoomed, e.changedTouches[0].clientX, e.changedTouches[0].clientY); lastTap = 0; }
      else lastTap = now;
    });
    stage.addEventListener('click', function (e) { if (e.target === stage && !zoomed) done(); });
    stage.addEventListener('touchstart', function (e) { startY = !zoomed && e.touches.length === 1 ? e.touches[0].clientY : null; }, { passive: true });
    stage.addEventListener('touchmove', function (e) {
      if (startY === null) return; var dy = e.touches[0].clientY - startY;
      if (dy > 0) { pic.style.transform = 'translateY(' + dy + 'px)'; v.style.background = 'rgba(0,0,0,' + Math.max(0.4, 0.94 - dy / 600) + ')'; }
    }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (startY === null) return; var dy = (e.changedTouches[0] || {}).clientY - startY; startY = null;
      if (dy > 110) done(); else { pic.style.transform = ''; v.style.background = ''; }
    });
  }
  function showPerson(key) {
    var render = function () {
      var p = data.people[key]; if (!p) return;
      var facts = p.facts.map(function (f) { return '<dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd>'; }).join('');
      var body = '<div class="idcard' + (p.kind === 'place' ? ' place' : '') + '" data-role="' + p.role + '">' +
        '<img src="' + BASE + 'assets/icons/' + p.img + '" alt="' + esc(p.name) + '">' +
        '<div><h3>' + esc(p.name) + '</h3><dl>' + facts + '</dl>' +
        '<p>' + esc(p.note) + '</p><p class="pop-note refs-line">' + esc(p.refs) + '</p></div></div>';
      open(icon(p.kind === 'place' ? 'pin' : 'user') + '<span>' + (p.kind === 'place' ? 'இடம்' : 'நபர்') + '</span>', body, '');
      linkRefs(popBody.querySelector('.refs-line'), +(document.body.dataset.book || 0));
    };
    if (data.people) render(); else getJSON('people.json').then(function (d) { data.people = d; render(); });
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
      group('தோற்றம்', 'theme', [['', 'தானியங்கி'], ['light', 'வெளிர்'], ['sepia', 'செபியா'], ['dark', 'இருள்']]) +
      group('ஆங்கில வசனம் (ஒப்பிட)', 'en', [['off', 'வேண்டாம்'], ['on', 'காட்டு']]);
    document.body.appendChild(panel);  // outside the bar: the bar clips overflow on phones (auto-hide)
    function place() { var r = btn.getBoundingClientRect(); panel.style.top = (r.bottom + 6) + 'px'; panel.style.right = Math.max(12, innerWidth - r.right) + 'px'; }
    function sync() {
      panel.querySelectorAll('.seg').forEach(function (s) {
        s.querySelectorAll('button').forEach(function (b) { b.classList.toggle('on', PREFS[s.dataset.key] === b.dataset.val); });
      });
    }
    panel.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      PREFS[b.parentNode.dataset.key] = b.dataset.val; apply(); save(); sync();
      if (b.parentNode.dataset.key === 'en') document.dispatchEvent(new Event('en-change'));
    });
    btn.addEventListener('click', function (e) { e.stopPropagation(); place(); panel.hidden = !panel.hidden; sync(); });
    addEventListener('resize', function () { if (!panel.hidden) place(); });
    document.addEventListener('click', function (e) { if (!panel.hidden && !panel.contains(e.target) && !btn.contains(e.target)) panel.hidden = true; });
  }

  if ('serviceWorker' in navigator) { try { navigator.serviceWorker.register(BASE + 'sw.js'); } catch (e) {} }

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
      var av = e.target.closest('.avatar[data-person], .pcard[data-person]');
      if (av) { e.preventDefault(); showPerson(av.dataset.person); return; }
      var im = e.target.closest('figure img, .st img');
      if (im && !im.closest('.pop')) { e.preventDefault(); showImage(im); return; }
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

    var sb = document.getElementById('search-btn');
    if (sb) sb.addEventListener('click', openSearch);
    document.addEventListener('keydown', function (e) { if (e.key === '/' && !/input|textarea/i.test(e.target.tagName)) { e.preventDefault(); openSearch(); } });
    renderContinue();
    renderAudioList();
    var ph = /person~([\w-]+)/.exec(location.hash); if (ph) showPerson(ph[1]);

    if (document.body.classList.contains('app')) initApp();
  });

  // ---------- search ----------
  function openSearch() {
    open(icon('search') + '<span>தேடு</span>', '<input class="search-input" type="search" placeholder="எ.கா. சந்ததி, ஆபிரகாம், 5:22, மரக் கம்பம்" autocomplete="off"><div class="search-res"><p class="muted small">குறைந்தது 2 எழுத்துக்கள்… (வசனங்கள், விளக்கங்கள், கதை, நபர்கள்)</p></div>', '', 'searchpop');
    var input = popBody.querySelector('.search-input'), res = popBody.querySelector('.search-res');
    setTimeout(function () { input.focus(); }, 30);
    var run = function () {
      var q = input.value.trim().toLowerCase(); if (q.length < 2) return;
      var words = q.split(/\s+/);
      var hits = data.search.filter(function (r) { var t = (r.t + ' ' + r.x).toLowerCase(); return words.every(function (w) { return t.indexOf(w) >= 0; }); });
      if (!hits.length) { res.innerHTML = '<p class="muted">எதுவும் கிடைக்கவில்லை.</p>'; return; }
      var KIND = { verse: 'வசனம்', note: 'ஆய்வு', story: 'கதை', section: 'பகுதி', person: 'நபர்/இடம்' };
      res.innerHTML = '<p class="muted small">' + hits.length + ' முடிவுகள்</p>' + hits.slice(0, 80).map(function (r) {
        var t = r.x, i = t.toLowerCase().indexOf(words[0]), sn = esc(t.slice(Math.max(0, i - 50), i + 110));
        words.forEach(function (w) { sn = sn.replace(new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>'); });
        return '<a class="sr" href="' + BASE + r.u + '"><span class="sr-k">' + (r.c ? 'அதி. ' + r.c + ' · ' : '') + KIND[r.k] + '</span><b>' + esc(r.t) + '</b><span class="sr-x">' + (i > 50 ? '… ' : '') + sn + ' …</span></a>';
      }).join('');
    };
    var timer; input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(run, 150); });
    if (!data.search) getJSON('search.json').then(function (d) { data.search = Array.isArray(d) ? d : []; run(); });
  }

  // ---------- continue reading (stored in this browser only) ----------
  function store(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function stored(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } }
  function renderContinue() {
    var box = document.getElementById('continue'), last = stored('last');
    if (!box || !last) return;
    if (box.classList.contains('inline')) {   // inside a book: one quiet line, only for this book's chapters
      var dir = location.pathname.replace(/^.*\/books\//, 'books/').replace(/[^/]*$/, '');
      if (last.u.indexOf(dir) !== 0) return;
      box.innerHTML = '<a class="continue-line" href="' + BASE + last.u + '">' + icon('book') + '<span>தொடர்ந்து படிக்க: <b>' + esc(last.t.replace(/^\S+\s/, 'அதிகாரம் ')) + '</b> · ' + esc(last.l) + '</span>' + icon('chevr') + '</a>';
    } else
    box.innerHTML = '<a class="continue-card" href="' + BASE + last.u + '"><span class="eyebrow">தொடர்ந்து படிக்க</span><b>' + esc(last.t) + '</b><span>' + esc(last.l) + '</span></a>';
    box.hidden = false;
  }

  // ---------- audio (jw.org Tamil audio Bible) ----------
  function renderAudioList() {
    var box = document.getElementById('audio-list'); if (!box) return;
    var book = document.body.dataset.book;
    getJSON('audio.json').then(function (a) {
      var html = '';
      for (var c = 1; a[book + ':' + c]; c++) html += '<div class="audio-row"><span>அதிகாரம் ' + c + '</span><audio controls preload="none" src="' + a[book + ':' + c] + '"></audio></div>';
      box.innerHTML = html;
    });
  }

  // ---------- two-pane chapter app ----------
  function rangeOf(text) {
    var m = /(\d+):(\d+)(?:[–-](\d+))?/.exec(text || '');
    return m ? [+m[2], +(m[3] || m[2])] : null;
  }
  function initApp() {
    var body = document.body, book = +body.dataset.book, ch = +body.dataset.chapter;
    var content = document.querySelector('.content'), list = document.getElementById('vlist');
    var views = document.querySelectorAll('.view'), tabs = document.querySelectorAll('.tabs button');

    function pinnedTop() {
      var head = document.querySelector('.chead');
      if (getComputedStyle(head).display === 'contents') { var t = document.querySelector('.tabs'); return t ? t.offsetHeight : 0; }
      return getComputedStyle(head).position === 'sticky' ? head.offsetHeight : 0;
    }
    function show(v, keepScroll) {
      body.classList.toggle('show-verses', v === 'verses');
      tabs.forEach(function (b) { b.classList.toggle('on', b.dataset.v === v); });
      if (v !== 'verses') {
        views.forEach(function (s) { s.classList.toggle('on', s.dataset.view === v); });
        if (!keepScroll) content.scrollTop = 0;
        try { history.replaceState(null, '', '#' + v); } catch (e) {}
        remember(v);
      }
    }
    var path = location.pathname.replace(/^.*\/books\//, 'books/');
    var title = (document.querySelector('.crumbs b') || {}).textContent || '';
    var bookName = ((document.querySelectorAll('.crumbs a')[1]) || {}).textContent || '';
    function remember(v, extra) {
      var tab = document.querySelector('.tabs button[data-v="' + v + '"]');
      store('last', { u: path + '#' + v + (extra ? '~' + extra : ''), t: bookName + ' ' + title.replace('அதிகாரம் ', ''), l: (tab ? tab.textContent.trim() : '') + (extra && extra[0] === 'r' ? ' · ' + ch + ':' + extra.slice(1).replace(/^(\d+)-\1$/, '$1') : '') });
      var seen = stored('seen') || {}; seen[path] = seen[path] || [];
      if (seen[path].indexOf(v) < 0) seen[path].push(v); store('seen', seen); markSeen();
    }
    function markSeen() {
      var seen = (stored('seen') || {})[path] || [];
      tabs.forEach(function (b) { b.classList.toggle('seen', seen.indexOf(b.dataset.v) >= 0); });
    }
    markSeen();
    tabs.forEach(function (b) { b.addEventListener('click', function () { show(b.dataset.v); }); });
    document.addEventListener('click', function (e) {
      var go = e.target.closest('[data-go]'); if (!go) return;
      e.preventDefault(); show(go.dataset.go);
      if (go.dataset.verse) focusVerse(+go.dataset.verse);
    });
    var pendingHash = location.hash;
    function route() {
      var h = decodeURIComponent((pendingHash || location.hash).slice(1)).split('~'), v = h[0], tgt = h[1];
      pendingHash = '';
      if (!document.querySelector('.view[data-view="' + v + '"]')) v = views[0].dataset.view;
      show(v);
      if (!tgt) return;
      setTimeout(function () {
        if (tgt[0] === 'v') { focusVerse(+tgt.slice(1)); return; }
        if (tgt[0] === 'r') { focusVerse(+tgt.slice(1).split('-')[0]); return; }
        var el = document.getElementById(v + '-' + tgt);
        if (el) {
          if (el.tagName === 'DETAILS') el.open = true;
          content.scrollTo({ top: el.getBoundingClientRect().top - content.getBoundingClientRect().top + content.scrollTop - pinnedTop() - 12 });
          el.classList.add('flash'); setTimeout(function () { el.classList.remove('flash'); }, 1600);
        }
      }, 60);
    }
    // stable ids for search links: story articles and section headings
    views.forEach(function (sec) {
      sec.querySelectorAll('article.st').forEach(function (a, i) { a.id = sec.dataset.view + '-st' + i; });
      sec.querySelectorAll('h2').forEach(function (h, i) { h.id = sec.dataset.view + '-h' + i; });
    });
    window.addEventListener('hashchange', function () { close(); route(); });
    (function () { var v0 = decodeURIComponent(location.hash.slice(1)).split('~')[0]; show(document.querySelector('.view[data-view="' + v0 + '"]') ? v0 : views[0].dataset.view); })();

    // tag each study block with its verse range
    var blocks = [].slice.call(document.querySelectorAll('details.vs'));
    blocks.forEach(function (d) { var r = rangeOf(d.querySelector('.vref').textContent); if (r) d.dataset.r = r.join('-'); });

    // short / detailed switch for the ஆய்வு tab
    blocks.forEach(function (d) {
      var vb = d.querySelector('.vbody'); if (!vb) return;
      var lead = [].slice.call(vb.children).filter(function (c) { return /^(P|UL|DIV)$/.test(c.tagName) && !c.classList.contains('greek'); })[0];
      if (lead) lead.classList.add('lead-item');
      var more = document.createElement('button'); more.className = 'more-btn'; more.textContent = 'மேலும் படிக்க';
      more.addEventListener('click', function () { d.classList.add('full'); }); vb.appendChild(more);
    });
    var studyIntro = document.querySelector('.view[data-view="study"] .intro');
    if (studyIntro) {
      var bt = document.createElement('div'); bt.className = 'seg brief-seg';
      bt.innerHTML = '<button data-b="off">விரிவாக</button><button data-b="on">சுருக்கமாக</button>';
      studyIntro.appendChild(bt);
      var syncBrief = function () { body.classList.toggle('brief', PREFS.brief === 'on'); bt.querySelectorAll('button').forEach(function (b) { b.classList.toggle('on', b.dataset.b === PREFS.brief); }); };
      bt.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; PREFS.brief = b.dataset.b; save(); blocks.forEach(function (d) { d.classList.remove('full'); }); syncBrief(); });
      syncBrief();
    }

    function highlight(a, b, scrollPane) {
      var first = null;
      list.querySelectorAll('.verse').forEach(function (x) {
        var n = +x.dataset.v, on = n >= a && n <= b; x.classList.toggle('hl', on); if (on && !first) first = x;
      });
      if (first && scrollPane) {
        var pane = list.parentNode, head = pane.querySelector('.pane-head');
        pane.scrollTo({ top: first.getBoundingClientRect().top - pane.getBoundingClientRect().top + pane.scrollTop - (head ? head.offsetHeight : 0) - 12, behavior: 'smooth' });
      }
    }
    function focusVerse(v) {
      var d = blocks.filter(function (b) { if (!b.dataset.r) return false; var r = b.dataset.r.split('-'); return v >= +r[0] && v <= +r[1]; })[0];
      if (window.matchMedia('(max-width:860px)').matches && body.classList.contains('show-verses')) {
        // phone: show the note as a bottom sheet over the verses
        var rr = d ? d.dataset.r.split('-') : [v, v];
        highlight(+rr[0], +rr[1], false);
        if (!d) return;
        var vt = '', en = PREFS.en === 'on' ? data.en : null;
        for (var n = +rr[0]; n <= +rr[1]; n++) vt += '<p class="pv"><sup>' + n + '</sup>' + esc((data.verses || {})[book + ':' + ch + ':' + n] || '') + enLine(en, book + ':' + ch + ':' + n) + '</p>';
        open(icon('book') + '<span>' + esc(d.querySelector('.vref').textContent + ' · ' + d.querySelector('.vtitle').textContent) + '</span>',
          '<div class="sheet-verses">' + vt + '</div><div class="vbody sheet-note">' + d.querySelector('.vbody').innerHTML + '</div>', '', 'sheet');
        linkRefs(popBody.querySelector('.sheet-note'), book);
        return;
      }
      if (window.matchMedia('(max-width:860px)').matches || !document.querySelector('.view.on[data-view="study"]')) show('study', true);
      blocks.forEach(function (b) { b.classList.remove('hl'); });
      if (d) {
        var r = d.dataset.r.split('-'); d.open = true; d.classList.add('hl'); highlight(+r[0], +r[1], false);
        setTimeout(function () {
          content.scrollTo({ top: d.getBoundingClientRect().top - content.getBoundingClientRect().top + content.scrollTop - pinnedTop() - 12, behavior: 'smooth' });
        }, 30);
      } else highlight(v, v, false);
    }
    blocks.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (!d.open || !d.dataset.r) return;
        var r = d.dataset.r.split('-'); highlight(+r[0], +r[1], true);
        remember('study', 'r' + d.dataset.r);
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
      fillEnglish();
      route();
    });
    function fillEnglish() {
      withEnglish(function (en) {
        list.querySelectorAll('.verse').forEach(function (x) {
          var p = x.querySelector('p'), old = p.querySelector('.en'); if (old) old.remove();
          if (en) p.insertAdjacentHTML('beforeend', enLine(en, book + ':' + ch + ':' + x.dataset.v));
        });
      });
    }
    document.addEventListener('en-change', fillEnglish);

    // phone: hide the top bar and chapter title while scrolling down; keep the tab row; show again on scroll up
    (function () {
      var mq = window.matchMedia('(max-width:860px)'), head = document.querySelector('.chead');
      function watch(el) {
        var lastY = 0, acc = 0;
        el.addEventListener('scroll', function () {
          if (!mq.matches) { body.classList.remove('chrome-hidden'); return; }
          var y = el.scrollTop, dy = y - lastY; lastY = y;
          if (Date.now() < lock) { acc = 0; return; }             // ignore the jump caused by our own toggle
          acc = (acc > 0) === (dy > 0) ? acc + dy : dy;           // distance in the current direction
          var hide = body.classList.contains('chrome-hidden');
          if (!hide && y > 120 && acc > 40) set(true);
          else if (hide && (acc < -30 || y < 40)) set(false);
        }, { passive: true });
      }
      var lock = 0;
      function set(on) {
        lock = Date.now() + 350;
        body.classList.toggle('chrome-hidden', on);   // only the top bar collapses (animated); the text does not move
      }
      watch(content); watch(document.querySelector('.verses'));
    })();

    // chapter audio in the verse pane header
    getJSON('audio.json').then(function (a) {
      var url = a[book + ':' + ch], head = document.querySelector('.pane-head'); if (!url || !head) return;
      var btn = document.createElement('button'); btn.className = 'icon-btn ghost audio-btn'; btn.innerHTML = icon('headphones') + '<span>கேள்</span>';
      head.insertBefore(btn, head.querySelector('a'));
      btn.addEventListener('click', function () {
        var bar = document.querySelector('.audio-bar');
        if (bar) { bar.remove(); return; }
        head.insertAdjacentHTML('afterend', '<div class="audio-bar"><audio controls autoplay preload="none" src="' + url + '"></audio><span class="small muted">jw.org · தமிழ் ஆடியோ பைபிள்</span></div>');
      });
    });
  }
})();
