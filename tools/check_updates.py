# -*- coding: utf-8 -*-
"""List jw.org publications that cite a chapter but are not yet used on our page.

For every verse, wol's scripture index (Tamil) lists the publications that cite it — newest first.
Anything whose wol document id is not already in data/sources.json (or linked on the page) is reported,
so publications we have not used yet get noticed. Limit: this index follows the Research Guide, so very recent
articles (e.g. w26 June on Gal 4:24) may appear only later — also skim the latest Watchtower study editions.

Usage: python3 tools/check_updates.py 48 1 6      (book, first chapter, last chapter)
Writes research/updates-YYYY-MM-DD.md and prints a summary.
"""
import datetime, html, json, os, re, sys, time, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UA = {'User-Agent': 'Mozilla/5.0'}


def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40).read().decode('utf-8', 'replace')


def doc_ids(text):
    return set(re.findall(r'/wol/d/r\d+/lp-\w+/(\d+)', text))


def main():
    book, first, last = (int(x) for x in sys.argv[1:4])
    known = doc_ids(open(os.path.join(ROOT, 'data/sources.json'), encoding='utf-8').read())
    slug = {48: 'galatians'}.get(book, str(book))
    report, total = [], 0
    for ch in range(first, last + 1):
        page = os.path.join(ROOT, f'books/{slug}/{ch}.html')
        if os.path.exists(page): known |= doc_ids(open(page, encoding='utf-8').read())
        bible = get(f'https://wol.jw.org/ta/wol/b/r122/lp-tl/nwtsty/{book}/{ch}')
        idx = dict(re.findall(r'href="(/ta/wol/dx/r122/lp-tl/\d+/\d+)"[^>]*>\s*(\d+)', bible))  # url -> verse
        new = []
        for url, verse in sorted(idx.items(), key=lambda kv: int(kv[1])):
            dx = get('https://wol.jw.org' + url); time.sleep(0.3)
            for href, label in re.findall(r'<a [^>]*href="(/ta/wol/(?:pc|d)/[^"]+)"[^>]*>(.*?)</a>', dx, re.S):
                label = html.unescape(re.sub(r'<[^>]+>', '', label)).strip()
                if not label or 'ஆராய்ச்சிக் கையேடு' in label: continue
                final = urllib.request.urlopen(urllib.request.Request('https://wol.jw.org' + href, headers=UA), timeout=40).geturl() if '/pc/' in href else 'https://wol.jw.org' + href
                ids = doc_ids(final)
                if ids and not ids & known:
                    new.append((verse, label, final.split('#')[0])); known |= ids
        total += len(new)
        report.append(f'\n## {slug} {ch}\n' + ('\n'.join(f'- {book}:{ch}:{v} — {l} — {u}' for v, l, u in new) or '- (nothing new)'))
        print(f'chapter {ch}: {len(new)} new')
    out = os.path.join(ROOT, f'research/updates-{datetime.date.today()}.md')
    open(out, 'w', encoding='utf-8').write(f'# New publications not yet used ({datetime.date.today()})\n\nCheck each: does it add or **change** an explanation on our pages?\n' + ''.join(report) + '\n')
    print('total new:', total, '→', os.path.relpath(out, ROOT))


if __name__ == '__main__':
    main()
