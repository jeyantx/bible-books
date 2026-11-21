# -*- coding: utf-8 -*-
"""Build data/search.json from the chapter pages, verse text and people.

Usage: python3 tools/build_search.py
Targets match assets/app.js routing: <view>~v<verse>, study~r<a-b>, story~st<i>, <view>~h<i>.
"""
import glob, html, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DROP = re.compile(r'<script.*?</script>|<style.*?</style>|<svg.*?</svg>', re.S)


def text(x):
    x = DROP.sub(' ', x)
    x = re.sub(r'<[^>]+>', ' ', x)
    return re.sub(r'\s+', ' ', html.unescape(x)).strip()


def views(page):
    for m in re.finditer(r'<section class="view" data-view="(\w+)">(.*?)</section>', page, re.S):
        yield m.group(1), m.group(2)


def main():
    out = []
    verses = json.load(open(os.path.join(ROOT, 'data/verses-ta.json'), encoding='utf-8'))
    for path in sorted(glob.glob(os.path.join(ROOT, 'books/*/[0-9]*.html'))):
        page = open(path, encoding='utf-8').read()
        rel = os.path.relpath(path, ROOT)
        book = int(re.search(r'data-book="(\d+)"', page).group(1))
        ch = int(re.search(r'data-chapter="(\d+)"', page).group(1))
        for v in range(1, 200):
            t = verses.get(f'{book}:{ch}:{v}')
            if not t: continue
            out.append({'k': 'verse', 'c': ch, 't': f'{ch}:{v}', 'x': t, 'u': f'{rel}#study~v{v}'})
        for name, body in views(page):
            if name == 'study':
                for d in re.finditer(r'<details class="vs">(.*?)</details>', body, re.S):
                    blk = d.group(1)
                    ref = text(re.search(r'<span class="vref">(.*?)</span>', blk, re.S).group(1))
                    ttl = text(re.search(r'<span class="vtitle">(.*?)</span>', blk, re.S).group(1))
                    m = re.search(r'(\d+):(\d+)(?:[–-](\d+))?', ref)
                    tgt = f'r{m.group(2)}-{m.group(3) or m.group(2)}' if m else ''
                    out.append({'k': 'note', 'c': ch, 't': f'{ref} {ttl}', 'x': text(blk)[:1500], 'u': f'{rel}#study' + (f'~{tgt}' if tgt else '')})
                continue
            if name == 'story':
                for i, a in enumerate(re.findall(r'<article class="st">(.*?)</article>', body, re.S)):
                    h = re.search(r'<h3>(.*?)</h3>', a, re.S)
                    out.append({'k': 'story', 'c': ch, 't': text(h.group(1)) if h else 'கதை', 'x': text(a)[:1500], 'u': f'{rel}#story~st{i}'})
                continue
            parts = re.split(r'(<h2[^>]*>.*?</h2>)', body, flags=re.S)
            label = {'overview': 'சுருக்கம்', 'jehovah': 'பெரிய விஷயங்கள்', 'context': 'பின்னணி', 'map': 'வரைபடம் · காலம்', 'people': 'நபர்கள்', 'apply': 'பாடங்கள்'}.get(name, name)
            if text(parts[0]):
                out.append({'k': 'section', 'c': ch, 't': label, 'x': text(parts[0])[:1500], 'u': f'{rel}#{name}'})
            for i in range(1, len(parts), 2):
                out.append({'k': 'section', 'c': ch, 't': f'{label} · {text(parts[i])}', 'x': text(parts[i + 1])[:1500], 'u': f'{rel}#{name}~h{(i - 1) // 2}'})
    people = json.load(open(os.path.join(ROOT, 'data/people.json'), encoding='utf-8'))
    for k, p in people.items():
        x = ' '.join(f'{a}: {b}' for a, b in p.get('facts', [])) + ' ' + p.get('note', '') + ' ' + p.get('refs', '')
        out.append({'k': 'person', 'c': 0, 't': p['name'], 'x': x, 'u': f'books/galatians/index.html#person~{k}'})
    json.dump(out, open(os.path.join(ROOT, 'data/search.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    print('entries:', len(out), 'size KB:', os.path.getsize(os.path.join(ROOT, 'data/search.json')) // 1024)


if __name__ == '__main__':
    main()
