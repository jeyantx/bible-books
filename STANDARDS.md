# Bible Books Research — Standards

This repo holds chapter-by-chapter research on Bible books, mainly in Tamil, based **only** on jw.org / wol.jw.org.
Hosted as a static site on GitHub Pages (no build step).

---

## 1. Research standard

### 1.1 Sources (allowed)
Only publications of Jehovah's Witnesses, found on **wol.jw.org** or **jw.org**:

| Priority | Source | Where |
|---|---|---|
| 1 | NWT Study Edition text + **study notes** (`nwtsty`) | `wol.jw.org/ta/wol/b/r122/lp-tl/nwtsty/<book>/<ch>` and the English `.../en/wol/b/r1/lp-e/nwtsty/...` (study notes are often fuller in English) |
| 2 | Research Guide (ஆராய்ச்சிக் கையேடு) references listed under each verse | links on the same page |
| 3 | “All Scripture Is Inspired” (`si`) — Bible Book Number intro | si |
| 4 | Insight (`it`), Watchtower, Awake!, “Bear Thorough Witness” (`bt`) | wol |
| 5 | Marginal references (இணைவசனங்கள்) | wol |

Not allowed: commentaries, Wikipedia, other religions' sites, own speculation presented as fact.
If a publication says “may / possibly / apparently” — keep that wording (`ஒருவேளை`, `இருக்கலாம்`). Never make it sound certain.

### 1.2 Workflow per chapter
1. Read the chapter in Tamil **and** English NWT Study Edition (verse text, outline, study notes, marginal refs).
2. Open every Research Guide reference listed for each verse (Tamil first; English if no Tamil).
3. Note publication symbol + page + link for every point (`w07 6/15 பக். 15-17`).
4. Save raw notes to `research/<book>/<chapter>-sources.md` **immediately** (sessions can crash).
5. Write the chapter page in three layers (see 1.3).
6. Check: every claim has a source tag; no un-sourced speculation; all links open.

### 1.3 Three layers on every chapter page
| Layer | Tamil label | Goal | Size |
|---|---|---|---|
| Gist | **5 நிமிட சுருக்கம்** | Read in 5 minutes; the story + the one message | ~6–8 short paragraphs |
| Key points | **முக்கியக் குறிப்புகள்** | 6–10 points you must remember | one card each |
| Deep study | **விரிவான ஆய்வு** | Verse-by-verse: meaning, background, Greek word, cross-refs, lesson | collapsible per verse group |

Plus where useful: timeline, people & places, word studies, “for me today” lessons, self-review questions, full source list.

### 1.4 Writing style
- Simple, clear Tamil (எழுத்துத் தமிழ், but easy). Short sentences.
- Bible verse names in Tamil short form (`கலா 1:6`, `அப் 9:26`).
- Quote NWT only briefly; link to wol for full verse text.
- Greek words: transliteration + simple meaning (e.g. *அனாதிமா* = “ஒதுக்கி வைக்கப்பட்டது”).
- Each point ends with its source tag(s).

---

## 2. UI standard

- **Static HTML + one shared CSS + one small JS** (`assets/`). No frameworks, no build. Works on GitHub Pages.
- **Mobile first**: readable at 360px, 16px side gutter, no horizontal scroll.
- **Fonts**: `Noto Sans Tamil` (body), `Noto Serif Tamil` (headings) from Google Fonts.
- **Theme**: light & dark (auto + toggle, remembered per browser).
- **Chapter page layout**:
  1. Header: book › chapter, verse range, one-line theme
  2. Sticky tabs: 5 நிமிடம் · முக்கியம் · விரிவாக · மேலும்
  3. Verse references are links to wol.jw.org (Tamil)
  4. Source chips (`w07 6/15`) link to the exact article
  5. Previous / next chapter navigation
- **Colors** via CSS variables only. Accent per book is allowed (`--accent`).
- Accessibility: semantic headings, `<details>` for collapsibles, sufficient contrast.

---

## 3. Folder layout

```
index.html                 ← home: list of books
assets/style.css, app.js   ← shared UI
books/<book>/index.html    ← book intro (author, date, outline)
books/<book>/<ch>.html     ← chapter page
research/<book>/<ch>-sources.md ← raw notes + links
STANDARDS.md               ← this file
```

Book slugs: English lowercase (`galatians`). Chapter files: `1.html`, `2.html`, …
