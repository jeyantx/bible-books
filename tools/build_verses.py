# -*- coding: utf-8 -*-
"""Collect every Bible reference used in books/**/*.html and save the Tamil NWT
verse text to data/verses-ta.json, for the reference popups.

Usage: python3 tools/build_verses.py [en]   (en = English NWT into data/verses-en.json, for the comparison option)
Keep BOOKS and the regex in sync with assets/app.js.
"""
import glob, html, json, os, re, time, urllib.request

BOOKS = {'ஆதி': 1, 'யாத்': 2, 'லேவி': 3, 'எண்': 4, 'உபா': 5, 'சங்': 19, 'நீதி': 20, 'ஏசா': 23, 'எரே': 24,
         'மத்': 40, 'மாற்': 41, 'லூக்': 42, 'யோவா': 43, 'அப்': 44, 'ரோ': 45, '1கொ': 46, '2கொ': 47,
         'கலா': 48, 'எபே': 49, 'பிலி': 50, 'கொலோ': 51, '1தெ': 52, '2தெ': 53, '1தீ': 54, '2தீ': 55,
         'தீத்து': 56, 'எபி': 58, 'யாக்': 59, '1பே': 60, '2பே': 61, '1யோ': 62, '2யோ': 63, 'வெளி': 66,
         'யோசு': 6, 'நியா': 7, '1சா': 9, '2சா': 10, '1இரா': 11, '2இரா': 12, 'யோபு': 18, 'எசே': 26, 'தானி': 27, 'நெ': 16, '1 சாமுவேல்': 9, '2 சாமுவேல்': 10, '1 ராஜாக்கள்': 11, '2 ராஜாக்கள்': 12, '1 நாளாகமம்': 13, '2 நாளாகமம்': 14, 'லூ': 42, '1ரா': 11, '2ரா': 12, '1நா': 13, '2நா': 14, 'ஆமோஸ்': 30, 'எஸ்றா': 15, 'எஸ்தர்': 17, 'பிர': 21, 'புல': 25, 'மீகா': 33, 'சக': 38, 'பிலே': 57, '3யோ': 64, 'யூதா': 65, 'நெகேமியா': 16, 'தானியேல்': 27, 'ஓசி': 28, 'யோவே': 29, 'ஆமோ': 30, 'ஆப': 35, 'மல்': 39, 'ஆதியாகமம்': 1, 'யாத்திராகமம்': 2, 'லேவியராகமம்': 3, 'எண்ணாகமம்': 4, 'உபாகமம்': 5, 'யோசுவா': 6, 'சங்கீதம்': 19, 'நீதிமொழிகள்': 20, 'ஏசாயா': 23, 'எரேமியா': 24, 'எசேக்கியேல்': 26, 'தானியேல்': 27, 'ஓசியா': 28, 'யோவேல்': 29, 'ஆபகூக்': 35, 'மத்தேயு': 40, 'மாற்கு': 41, 'லூக்கா': 42, 'யோவான்': 43, 'அப்போஸ்தலர்': 44, 'ரோமர்': 45, '1 கொரிந்தியர்': 46, '2 கொரிந்தியர்': 47, 'கலாத்தியர்': 48, 'எபேசியர்': 49, 'பிலிப்பியர்': 50, 'கொலோசெயர்': 51, '1 தெசலோனிக்கேயர்': 52, '1 தீமோத்தேயு': 54, '2 தீமோத்தேயு': 55, 'எபிரெயர்': 58, '1 பேதுரு': 60, '2 பேதுரு': 61, '1 யோவான்': 62, 'வெளிப்படுத்துதல்': 66}
BOOK_RE = '|'.join(sorted(map(re.escape, BOOKS), key=len, reverse=True))
SEG = re.compile(r'(?:(' + BOOK_RE + r')\s?)?(\d{1,3}):(\d{1,3}(?:[-–]\d{1,3}(?::\d{1,3})?)?(?:,\s?\d{1,3}(?:[-–]\d{1,3})?(?![஀-௿\d:]))*)')
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
import sys
LANG = 'en' if 'en' in sys.argv[1:] else 'ta'
OUT = os.path.join(ROOT, 'data', f'verses-{LANG}.json')


def verses_of(spec):
    out = []
    for part in re.split(r',\s?', spec):
        a, _, b = part.replace('–', '-').partition('-')
        a = int(a); b = int(b) if b and ':' not in b else a
        if b < a: b = a  # cross-chapter range like 15:40–16:1
        out += list(range(a, min(b, a + 40) + 1))
    return out


def collect(default_book):
    need = {}
    for f in glob.glob(os.path.join(ROOT, 'books', '**', '*.html'), recursive=True):
        s = open(f, encoding='utf-8').read()
        page = re.search(r'<body[^>]*data-book="(\d+)"[^>]*data-chapter="(\d+)"', s)
        if page:  # chapter pages show the whole chapter in the verse pane
            need.setdefault((int(page.group(1)), int(page.group(2))), set()).update(range(1, 81))
        s = re.sub(r'<span class="src[^>]*>.*?</span>|<a class="src[^>]*>.*?</a>|<summary.*?</summary>|<script.*?</script>', ' ', s, flags=re.S)
        text = html.unescape(re.sub(r'<[^>]+>', ' ', s))
        last_end, book = -10, None
        for m in SEG.finditer(text):
            if m.group(1): book = BOOKS[m.group(1)]
            elif m.start() - last_end > 3: book = default_book
            last_end = m.end()
            need.setdefault((book, int(m.group(2))), set()).update(verses_of(m.group(3)))
    return need


def fetch_chapter(b, c):
    for ed in ('nwtsty', 'nwt'):
        url = (f'https://wol.jw.org/en/wol/b/r1/lp-e/{ed}/{b}/{c}' if LANG == 'en' else f'https://wol.jw.org/ta/wol/b/r122/lp-tl/{ed}/{b}/{c}')
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            s = urllib.request.urlopen(req, timeout=30).read().decode('utf-8')
        except Exception:
            continue
        if f'id="v{b}-{c}-' in s:
            return s
    return ''


def verse_text(page, b, c, v):
    parts = re.findall(rf'<span id="v{b}-{c}-{v}-\d+"[^>]*>(.*?)</span>\s*(?=<span id="v|</p>|<p|$)', page, flags=re.S)
    t = ' '.join(parts)
    t = re.sub(r'<a[^>]*class="(?:b|fn|cl[^"]*|vl[^"]*)"[^>]*>.*?</a>|<sup.*?</sup>|<strong>\d+\s*</strong>', ' ', t, flags=re.S)
    t = html.unescape(re.sub(r'<[^>]+>', '', t))
    t = re.sub(r'^\s*\d+\s', '', t.replace('+', '').replace('*', ''))
    return re.sub(r'\s+', ' ', t).strip()


def main():
    data = json.load(open(OUT, encoding='utf-8')) if os.path.exists(OUT) else {}
    for (b, c), vs in sorted(collect(48).items()):
        missing = [v for v in sorted(vs) if f'{b}:{c}:{v}' not in data]
        if not missing: continue
        page = fetch_chapter(b, c); time.sleep(0.5)
        for v in missing:
            t = verse_text(page, b, c, v)
            if t: data[f'{b}:{c}:{v}'] = t
        print(b, c, len(missing))
    json.dump(data, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, indent=0, sort_keys=True)
    print('verses:', len(data))


if __name__ == '__main__':
    main()
