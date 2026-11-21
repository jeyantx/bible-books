# -*- coding: utf-8 -*-
"""Add ?v=<hash> to assets/style.css and assets/app.js links so browsers and phones fetch new versions.

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
print(ver)
