"""Collect every Bible reference used in books/**/*.html and save the Tamil NWT
verse text to data/verses-ta.json, for the reference popups.

Usage: python3 tools/build_verses.py
Keep BOOKS and the regex in sync with assets/app.js.
"""
import glob, html, json, os, re, time, urllib.request

BOOKS = {'ஆதி': 1, 'யாத்': 2, 'லேவி': 3, 'எண்': 4, 'உபா': 5, 'சங்': 19, 'நீதி': 20, 'ஏசா': 23, 'எரே': 24,
         'மத்': 40, 'மாற்': 41, 'லூக்': 42, 'யோவா': 43, 'அப்': 44, 'ரோ': 45, '1கொ': 46, '2கொ': 47,
         'கலா': 48, 'எபே': 49, 'பிலி': 50, 'கொலோ': 51, '1தெ': 52, '2தெ': 53, '1தீ': 54, '2தீ': 55,
         'தீத்து': 56, 'எபி': 58, 'யாக்': 59, '1பே': 60, '2பே': 61, '1யோ': 62, '2யோ': 63, 'வெளி': 66}
BOOK_RE = '|'.join(sorted(map(re.escape, BOOKS), key=len, reverse=True))
SEG = re.compile(r'(?:(' + BOOK_RE + r')\s?)?(\d{1,3}):(\d{1,3}(?:[-–]\d{1,3})?(?:,\s?\d{1,3}(?:[-–]\d{1,3})?)*)')
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'data', 'verses-ta.json')


def verses_of(spec):
    out = []
    for part in re.split(r',\s?', spec):
        a, _, b = part.replace('–', '-').partition('-')
        a = int(a); b = int(b) if b else a
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
        url = f'https://wol.jw.org/ta/wol/b/r122/lp-tl/{ed}/{b}/{c}'
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            s = urllib.request.urlopen(req, timeout=30).read().decode('utf-8')
        except Exception:
            continue
        if f'id="v{b}-{c}-1-1"' in s or f'id="v{b}-{c}-2-1"' in s:
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
            elif v > 1 and f'{b}:{c}:{v - 1}' not in data: break
        print(b, c, len(missing))
    json.dump(data, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, indent=0, sort_keys=True)
    print('verses:', len(data))


if __name__ == '__main__':
    main()
