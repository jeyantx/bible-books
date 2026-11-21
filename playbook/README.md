# Playbook — how to build a Bible book at Galatians quality

This folder holds everything needed to repeat the Galatians work for another book: the process, the exact agent prompts, the tools, the design decisions (from the owner's feedback) and the ideas list.

| File | What it is |
|---|---|
| `README.md` | This file — the step-by-step process |
| `writer-brief.md` | The brief every chapter-writer agent reads (generalised from the Galatians brief) |
| `writer-prompt.md` | The per-chapter prompt template for writer agents, with how to build the must-cover checklist |
| `reviewer-prompt.md` | The independent reviewer prompt template |
| `decisions.md` | Every UI / content / research decision and the reason (owner feedback) — read before changing anything |
| `ideas.md` | Feature ideas: done, approved-later, declined (and why) |

Also read: `../STANDARDS.md` (rules), `../research/translation-guide.md` (Tamil NWT terms), `../research/icon-prompts.md` (icon styles and colours).

---

## The process (what worked for Galatians)

### 0. Before starting a book
1. Read `decisions.md` and `STANDARDS.md` fully.
2. Pick the slug (`romans`, `ephesians`…) and the book number (NWT order: Ge 1 … Re 66).
3. Fetch the book's nwtsty outline (Tamil + English) and the si "Bible Book Number N" article. These give the chapter parts, author, date, place.

### 1. Chapter 1 by hand, with the owner (pilot)
- Build chapter 1 yourself (copy `books/galatians/1.html` as the template), show it, and take feedback **before** writing the other chapters. Every book has its own feel (narrative vs letter vs prophecy) — agree the angle first.
- Save raw notes to `research/<book>/1-sources.md` as you go.

### 2. Write the other chapters in parallel (one agent per chapter)
- Create `research/<book>/AGENT-BRIEF.md` from `writer-brief.md` (replace BOOK placeholders).
- Make `data/_pending/`.
- For each chapter, launch a background agent with `writer-prompt.md`, filling in the **must-cover checklist** for that chapter (see how in that file). Agents only write their own chapter files + pending JSON; they never touch shared files.

### 3. Independent review (one reviewer per chapter, as each writer finishes)
- Launch `reviewer-prompt.md` for each finished chapter. Reviewers verify claims on the actual wol pages, fix Tamil, remove unsourced statements, check completeness against the English study notes and fix technical problems.
- If a writer reports a **changed explanation** (like the June 2026 Watchtower on Gal 4:24), tell that reviewer to verify it and to check the other chapters for the old explanation.

### 4. Merge (lead only)
1. Merge `data/_pending/*-sources.json` → `data/sources.json`, `*-people.json` → `data/people.json` (keep the first definition of a duplicate key; keep only kind/role/name/img/facts/note/refs). Check: no missing keys, every icon exists.
2. Generate icons for new people/places: `python3 tools/gen_icon.py assets/icons/people/<key>.png person "<icon_desc>" "<accent>"` (places: `places/… place …`), then convert to JPG (people 256px, places 512px) with `sips`.
3. Navigation: chapter selector `.chsel` (all chapters linked, `on` for current), crumbs (`c-home`, `sep`, `c-long` spans), tab order, manifest/icon links, book page chapter buttons.
4. Append each `<N>-sources.md` "Translation terms" section to `research/translation-guide.md`.
5. `python3 tools/build_verses.py` (Tamil) · `python3 tools/build_verses.py en` (English comparison) · `python3 tools/build_search.py` · `python3 tools/stamp.py`.
6. Delete `data/_pending/`.

### 5. Test (always, before every push)
- Load every chapter in the preview browser (desktop 1280×800 and mobile 375×812, light and dark):
  - every verse has text, every `a.ref` has verse text in `data/verses-*.json`, every verse opens a note, no broken images, no horizontal scroll, tabs in the right order;
  - tap a verse (desktop: right pane note; phone: bottom sheet), open a person ID card, open an image (full-screen viewer), search for a word and open a result, Aa panel opens.
- If a reference has no verse text, look at the text around it: usually an abbreviation the linker doesn't know (add it to `BOOKS` in **both** `assets/app.js` and `tools/build_verses.py`) or a chapter that doesn't start at verse 1.

### 6. Push
- `python3 tools/stamp.py` → commit → push. The owner usually says "push"; when unsure, ask.

### 7. Keep it current
- Every few months: `python3 tools/check_updates.py <book> 1 <last>` and skim the latest Watchtower study editions (the scripture index lags behind new articles).

---

## Tools

| Command | Does |
|---|---|
| `python3 tools/build_verses.py [en]` | Collects every Bible reference in `books/**/*.html` and saves verse text (Tamil, or English with `en`) |
| `python3 tools/build_search.py` | Rebuilds `data/search.json` (verses, notes, story, sections, people) |
| `python3 tools/stamp.py` | Adds `?v=<hash>` to CSS/JS links so phones load new versions |
| `python3 tools/check_updates.py B C1 C2` | Lists jw.org publications citing the chapters that we don't use yet |
| `python3 tools/gen_icon.py out.png person\|place "desc" "#hex"` | Generates an icon in the agreed style (OpenAI `gpt-image-2`; key read from `~/Downloads/openai-key.txt`, never committed) |
| `tools/<book><N>_map.py` | Example SVG map generators (lon/lat → simple Tamil map with numbered, arrowed routes) |

Data files: `data/verses-ta.json`, `data/verses-en.json`, `data/sources.json` (source chips), `data/people.json` (ID cards), `data/search.json`, `data/audio.json` (jw.org Tamil audio Bible URLs; get them from `https://b.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?output=json&pub=nwt&fileformat=MP3&alllangs=0&langwritten=TL&txtCMSLang=TL&booknum=<N>`).

## Useful wol URL patterns
- Tamil study Bible: `https://wol.jw.org/ta/wol/b/r122/lp-tl/nwtsty/<book>/<ch>` · English: `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/<book>/<ch>` (fuller study notes)
- Verse ids in the page: `id="v<book>-<ch>-<verse>-<part>"`
- Scripture index per verse (Tamil): links `/ta/wol/dx/r122/lp-tl/<docid>/<n>` on the chapter page
- Media gallery: `/en/wol/gallery/r1/lp-e/nwtsty/<book>/<ch>`; images at `/en/wol/mp/...`
- Search: `https://wol.jw.org/en/wol/s/r1/lp-e?q=Galatians+1%3A4&p=par`
- lfb lessons (pictures): `https://wol.jw.org/ta/wol/d/r122/lp-tl/11020160<NN>`
- wol pages cannot be embedded in iframes (`X-Frame-Options: SAMEORIGIN`) — that is why popups show our own saved text/summaries.
