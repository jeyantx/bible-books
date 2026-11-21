# -*- coding: utf-8 -*-
"""Find low-resolution images. Usage: python3 tools/check_images.py
wol serves a 60×60 thumbnail and a large version of each picture under neighbouring /wol/mp/ numbers
(e.g. lfb/2017/938 = large, 939 = thumbnail). Always check the DOWNLOADED size before resizing, and only
ever shrink (sips -Z also enlarges!). This script flags files under 500px wide."""
import glob, os, struct

def jpeg_size(path):
    with open(path, 'rb') as f:
        data = f.read()
    i = 2
    while i < len(data):
        if data[i] != 0xFF: i += 1; continue
        m = data[i + 1]
        if m in (0xC0, 0xC1, 0xC2):
            h, w = struct.unpack('>HH', data[i + 5:i + 9]); return w, h
        i += 2 + struct.unpack('>H', data[i + 2:i + 4])[0]
    return None

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
bad = 0
for p in sorted(glob.glob(os.path.join(ROOT, 'assets/img/**/*.jpg'), recursive=True)):
    sz = jpeg_size(p)
    print(('LOW ' if sz and sz[0] < 500 else 'ok  '), sz, os.path.relpath(p, ROOT))
    bad += bool(sz and sz[0] < 500)
print('low-resolution:', bad)
