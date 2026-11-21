// Theme toggle (remembered per browser) + active tab highlighting
(function () {
  var root = document.documentElement;
  try { var saved = localStorage.getItem('theme'); if (saved) root.dataset.theme = saved; } catch (e) {}

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-btn');
    if (btn) btn.addEventListener('click', function () {
      var dark = root.dataset.theme ? root.dataset.theme === 'dark'
        : matchMedia('(prefers-color-scheme: dark)').matches;
      root.dataset.theme = dark ? 'light' : 'dark';
      try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    });

    var tabs = document.querySelectorAll('.tabs a');
    if (!tabs.length || !('IntersectionObserver' in window)) return;
    var map = {};
    tabs.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          tabs.forEach(function (a) { a.classList.remove('active'); });
          map[en.target.id].classList.add('active');
          map[en.target.id].scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
      });
    }, { rootMargin: '-120px 0px -60% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });

    // "Expand all" for verse study
    var ex = document.getElementById('expand-all');
    if (ex) ex.addEventListener('click', function () {
      var all = document.querySelectorAll('details.vs');
      var open = ex.dataset.open !== '1';
      all.forEach(function (d) { d.open = open; });
      ex.dataset.open = open ? '1' : '0';
      ex.textContent = open ? 'அனைத்தையும் மூடு' : 'அனைத்தையும் திற';
    });
  });
})();
