# Decisions (with reasons) — keep these for every book

Collected from the owner's feedback while building Galatians. If something here seems wrong for a new book, ask the owner before changing it.

## Purpose & audience
- Personal research, Tamil, based **only** on jw.org / wol.jw.org. Free, non-commercial public site (GitHub Pages). Public jw.org content and generated icons are allowed (owner confirmed with privacy/legal).
- Goal: understand the Bible (NWT) more deeply and interestingly — how each part matches the Bible's main message (B1 "The Bible's Message"; Awake! 2007 "What Is the Bible About?"), how it sanctifies Jehovah's name, what it shows about Jehovah's *unique* qualities (not generic), links to other books, life and purpose, personal qualities.
- Simple, clear Tamil, story-like where it helps. Education standard — clean, not playful.

## Research
- Every claim sourced (chip with summary). Keep publication hedging (இருக்கலாம், தெரிகிறது). Own suggested cross-refs labelled "ஒப்பிட்டுப் பார்க்க".
- English sources are fine; write with current Tamil NWT terms (`research/translation-guide.md`); verify against the Tamil verse text.
- Always check for **adjusted explanations** in recent Watchtowers (e.g. w26 June: Gal 4:24 two covenants = Law covenant & Abrahamic covenant). Use the newest; say what changed and what stays the same.
- Independent review of every chapter by a second agent (spot-check 12–17 claims on the real wol pages).
- Don't repeat earlier chapters; link back briefly.

## Chapter page structure (tabs, in this order)
வசனங்கள் (phone only) · ஆய்வு · சுருக்கம் · கதை · பெரிய விஷயங்கள் · பின்னணி · வரைபடம் · காலம் · நபர்கள் · பாடங்கள்
- **ஆய்வு next to வசனங்கள்** — they are used together.
- **சுருக்கம்**: "ஒரே வரியில்" callout **first**, then the structure bar, then the 5-minute summary, then key points.
- **கதை**: about the chapter itself, not a biography (owner: "no need Paul's story… focus on Galatians"). Each part: "பவுல் சொல்வது" (simple paraphrase) + "ஏன்" (his reasoning — Paul is hard to follow, explain why he argues this way). Background from Acts / Hebrew Scriptures only where it explains a verse. End with the argument as a chain. **No intro paragraph** at the top of the tab.
- **பெரிய விஷயங்கள்** (was "யெகோவா", then "இன்னும் பெரிய விஷயங்கள்"): question headings, only the ones the chapter really answers — "இந்தப் பதிவிலிருந்து யெகோவாவைப் பற்றி நான் என்ன கற்றுக்கொண்டேன்?", "…யெகோவாவின் பெயர் பரிசுத்தப்படுவதோடு எப்படிச் சம்பந்தப்பட்டிருக்கிறது?", "…பைபிளின் முக்கியச் செய்தியோடு எப்படிப் பொருந்துகிறது?", "இயேசுவைப் பற்றி…?", "என்ன குணங்களை நான் காட்ட வேண்டும்?", "இது என் வாழ்க்கைக்கும் நோக்கத்துக்கும் எப்படிப் பொருந்துகிறது?" + any other important one.
- **நபர்கள்**: its own tab (not inside the map tab). **People first, then places.**
- **பாடங்கள்**: lessons + review Q&A; **every answer has "ஆதாரம்:" references**.
- Map: compact, fits one screen beside its legend; **arrows** for direction; each step with year, with whom, why.

## Layout & UI
- **App-like two-pane**, not one long page: left = full chapter verses (Tamil NWT, grouped by the chapter parts); right = one tab at a time. Tap a verse → its note opens; opening a note highlights its verses. Scroll offsets must leave the note/verse just below the sticky header (don't hide it).
- Text size ~15.5px, Sans (Noto Sans Tamil) everywhere incl. popups — serif Tamil looked heavy. Menu (☰, top right): "பக்கத்தைப் புதுப்பி" (reload — installed apps have no pull-to-refresh) and முகப்பு, then reading settings: size, font, spacing, theme (auto/light/sepia/dark in a 2×2 grid), English verses on/off.
- **No repeated names** (e.g. "கலாத்தியர்" twice in bar and pane). Breadcrumb shortens with width (phone: "கலாத்தியர் › 2").
- Icons: line icons (Lucide), **no emoji**.
- Popups: verse popup = Tamil text (+ English if on) + "open in wol". Source chip popup = our Tamil summary + link. Images = full-screen viewer (zoom, pan, swipe down, ×), never a new tab.
- Phone:
  - Verse tap opens a **bottom sheet** with the verses + note (not a tab switch). Every bottom sheet has a handle and **closes by dragging down**, not only ×.
  - On phones the verse list is a normal view inside the same scroller as the other tabs, so the title scrolls away identically everywhere (owner liked how ஆய்வு behaved).
  - Tabs must always stay reachable; tab row scrolls **sideways only** (no vertical drag).
  - The **top bar always stays** (owner did not want it hidden). The chapter **title shrinks and fades continuously with the scroll** (slow, scroll-linked — a sudden hide looked like a jerk); it scrolls away naturally with the text in every tab, including the verse list. Only the tab row stays pinned.
  - Anything absolutely positioned must not live inside the bar (the bar clips when hiding) — e.g. the Aa panel is attached to `<body>`.
- Chapter pages: previous/next chapter — ‹ › in the bar on phones, and a pager at the end of every tab and of the verse list; navigation keeps the current tab.
- Book page: **chapter number buttons right under the title**; "continue reading" as one quiet line (home page keeps the card); every other section **collapsed by default** as cards (people come back for verses, not descriptions).
- Home card: just number + name (no "அதிகாரங்கள் 1–6 தயார்").
- Installable app (manifest + service worker, network-first so it auto-updates). Always `tools/stamp.py` before pushing — it versions CSS/JS links (phones showed stale CSS otherwise) and writes the build id used by the "புதிய பதிப்பு உள்ளது — புதுப்பி" bar.

## Icons & pictures
- People: engraved/woodcut two-tone (ink + one muted accent per person), **circle**. Places: soft watercolour, **square**. Prompts in `research/icon-prompts.md`.
- Border = role: light green good, red opposer, yellow neutral. No role label text on the ID card (border is enough).
- ID card: picture, name, facts, short note, verse refs — simple with good spacing.
- Grid labels short (full name in the ID card); text must wrap inside cards.
- Pictures from jw.org (lfb lessons, nwtsty media gallery, appendix maps) saved locally in `assets/img/<book>/` with caption + source chip.
- Site icon: owner-provided book image, background cleaned to real transparency.

## Data that must not live only in the browser
- Owner declined personal notes/highlights and study plans because browser storage can be cleared. "Continue reading" and read-progress dots are fine (convenience only).
