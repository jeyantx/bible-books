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

**Layout (app style, not one long page):** top bar (book › chapter, chapter buttons, `Aa`). Left pane = full chapter in Tamil NWT, grouped by the chapter's parts. Right pane = tabs, one view at a time. Tapping a verse opens its note; opening a note highlights its verses. On phones the left pane becomes a “வசனங்கள்” tab.

Every chapter page has these sections (tabs):

| Tab | Contents |
|---|---|
| சுருக்கம் | structure bar · 5-min gist · key points |
| கதை | the chapter itself, in order, as questions: “பவுல் சொல்வது” (simple paraphrase) + “ஏன்” (reasoning). Background (Acts, Hebrew Scriptures) only where it explains a verse. Ends with the argument as a chain. |
| வசன ஆய்வு | verse-by-verse notes |
| இன்னும் பெரிய விஷயங்கள் | Question-headed sections — use only the ones the chapter answers, add other important ones: யெகோவாவைப் பற்றி நான் என்ன கற்றுக்கொண்டேன்? · யெகோவாவின் பெயர் பரிசுத்தப்படுவதோடு எப்படிச் சம்பந்தப்பட்டிருக்கிறது? · பைபிளின் முக்கியச் செய்தியோடு எப்படிப் பொருந்துகிறது? (B1) · இயேசுவைப் பற்றி என்ன சொல்கிறது? · என்ன குணங்களை நான் காட்ட வேண்டும்? · என் வாழ்க்கைக்கும் நோக்கத்துக்கும் எப்படிப் பொருந்துகிறது? |
| பின்னணி | facts · authenticity · links to other books · sources |
| வரைபடம் · காலம் | maps, pictures, timeline, people, Greek words |
| பாடங்கள் · கேள்விகள் | lessons · review Q&A |

Older per-section table (kept for reference):

| # | Section | Contents |
|---|---|---|
| 1 | சுருக்கம் | 5-min gist + clickable structure bar of the chapter's parts + one-line takeaway |
| 2 | பின்னணி | Facts grid (author, when, where, to whom, why, what it proves) · where the chapter sits in the book · photo (e.g. manuscript) |
| 3 | மையக் கருத்து | How the chapter links to the Bible's core theme (Kingdom / promised Seed / ransom / Jehovah's name) as a step chain, sourced |
| 4 | முக்கியக் குறிப்புகள் | 6–10 numbered cards |
| 5 | வசனவாரியாக | Collapsible verse groups: meaning, background, Greek box, cross-refs, lesson callout, sources |
| 6 | வரைபடம் | Simple Tamil SVG map of the chapter's places (numbered route + legend) + nwtsty maps/images |
| 7 | காலவரிசை | Timeline (chapter events highlighted) · people & places table · Greek word table |
| 8 | பாடங்கள் | Personal lessons |
| 9 | மறுபார்வை | Q&A (tap to reveal) |
| 10 | ஆதாரங்கள் | Full source list |

### 1.4 Writing style
- Simple, clear Tamil (எழுத்துத் தமிழ், but easy). Short sentences.
- Bible verse names in Tamil short form (`கலா 1:6`, `அப் 9:26`).
- Use the current Tamil NWT terms — see `research/translation-guide.md` (e.g. திருச்சட்டம், மரக் கம்பம், ஜெபக்கூடம், ஞானஸ்நானம், அளவற்ற கருணை). Add new terms there as you find them.
- Story/reflection content must still be sourced; mark cross-references we suggest (not from a publication) as “ஒப்பிட்டுப் பார்க்க”.
- Quote NWT only briefly in the page body; full verse text appears only in the reference popup (from `data/verses-ta.json`).
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
- **Colors** via CSS variables only. Themes: auto / light / sepia / dark.
- **Reader settings** (`Aa` button): font size (4 steps), Sans/Serif, line spacing, theme — saved per browser. Reading progress bar under the top bar.
- **Icons**: inline SVG line icons (Lucide set, in `assets/app.js`), written as `<i data-i="name"></i>`. No emoji. Tone: clean, educational, not playful.
- **Bible references** are written as plain text (`அப் 9:26`, `1:4`). `app.js` links them automatically; a bare `1:4` means the page's book (`<body data-book="48">`). Tapping one shows the Tamil NWT verse in a popup with an “open in wol” button. wol.jw.org blocks being embedded in frames, so the popup shows saved text, not the wol page.
- **Source chips**: `<a class="src" data-src="KEY" href="URL">w07 6/15</a>`; KEY must exist in `data/sources.json` (pub, title, summary, url). Tapping shows the summary popup.
- **Images**: saved locally in `assets/img/<book>/` (from jw.org / wol.jw.org media, e.g. lfb lessons, nwtsty media gallery), with caption and source chip.
- **Character & place icons**: see `research/icon-prompts.md`. People = circle, places = square; border = role (green good, red opposer, yellow neutral). `<img class="avatar sm[ place]" data-person="KEY" data-role="...">`; KEY must exist in `data/people.json` (tap → ID card).
- **Images** open in a popup viewer, never a new tab.
- **Images (old rule)**: from wol.jw.org media (`/wol/mp/...`), with caption and credit. Maps we draw ourselves are labelled “simplified, not to scale”.
- After adding a chapter, run `python3 tools/build_verses.py` to save the verse text for every new reference.
- Accessibility: semantic headings, `<details>` for collapsibles, sufficient contrast.

---

## 3. Folder layout

```
index.html                 ← home: list of books
assets/style.css, app.js   ← shared UI (themes, reader, icons, popups)
data/verses-ta.json        ← Tamil NWT verse text for popups (generated)
data/sources.json          ← source summaries for popups
tools/build_verses.py      ← scans pages, fetches verses from wol
tools/<book><ch>_map.py    ← generator for a chapter's SVG map
books/<book>/index.html    ← book intro (author, date, outline)
books/<book>/<ch>.html     ← chapter page
research/<book>/<ch>-sources.md ← raw notes + links
STANDARDS.md               ← this file
```

Book slugs: English lowercase (`galatians`). Chapter files: `1.html`, `2.html`, …
