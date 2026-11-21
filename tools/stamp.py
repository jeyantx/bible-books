# -*- coding: utf-8 -*-
"""Add ?v=<hash> to assets/style.css and assets/app.js links so browsers and phones fetch new versions,
and write a site-wide build id (version.json + <meta name="build">) for the "new version available" bar.

Usage: python3 tools/stamp.py   (run before every push that changes CSS/JS)
"""
import glob, hashlib, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ver = {}
for f in ('style.css', 'app.js'):
    ver[f] = hashlib.md5(open(os.path.join(ROOT, 'assets', f), 'rb').read()).hexdigest()[:8]
for p in glob.glob(os.path.join(ROOT, '**', '*.html'), recursive=True):
    s = open(p, encoding='utf-8').read()
    n = re.sub(r'(assets/(style\.css|app\.js))(\?v=\w+)?', lambda m: m.group(1) + '?v=' + ver[m.group(2)], s)
    if n != s: open(p, 'w', encoding='utf-8').write(n)
# site-wide build id: everything a reader sees (pages without the build meta itself, css, js, data)
h = hashlib.md5()
files = sorted(glob.glob(os.path.join(ROOT, '**', '*.html'), recursive=True)) + [os.path.join(ROOT, 'assets', f) for f in ver] + sorted(glob.glob(os.path.join(ROOT, 'data', '*.json')))
for f in files:
    t = open(f, 'rb').read()
    if f.endswith('.html'): t = re.sub(rb'<meta name="build" content="\w+">\n?', b'', t)
    h.update(t)
build = h.hexdigest()[:10]
for p in glob.glob(os.path.join(ROOT, '**', '*.html'), recursive=True):
    s = open(p, encoding='utf-8').read()
    n = re.sub(r'<meta name="build" content="\w+">\n?', '', s)
    n = n.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<meta name="build" content="' + build + '">', 1)
    if n != s: open(p, 'w', encoding='utf-8').write(n)
open(os.path.join(ROOT, 'version.json'), 'w').write('{"build": "%s"}\n' % build)
print(ver, 'build', build)
