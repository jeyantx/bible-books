# Brief for writing a Galatians chapter page

Repo: /Users/jeyant-10189/Work/Personal/jw/bible-books — read `STANDARDS.md`, `research/translation-guide.md`, `research/icon-prompts.md`, and **`books/galatians/1.html` (the template — copy its structure, classes, tabs and tone exactly)**. Look at `assets/app.js` only to understand features (refs auto-link, `data-src` chips, `data-person` avatars, `data-go`, verse pane from `data-parts`).

Audience: Tamil-speaking Jehovah's Witnesses doing personal research. Simple, clear Tamil (current NWT wording), story-like where useful, deep but easy. Not playful. Every claim traceable to jw.org / wol.jw.org.

## Files you write (only these — other agents work in parallel)
- `books/galatians/<N>.html` — the chapter page (copy 1.html's head, bar, shell, tabs; change chapter-specific content). In the bar's `.chsel`, make chapters 1–6 all links (`<a href="K.html">K</a>`), with `class="on"` on <N>.
- `research/galatians/<N>-sources.md` — raw notes + every URL you used (save early, update as you go).
- `data/_pending/<N>-sources.json` — NEW source keys you cite with `data-src` (same shape as `data/sources.json`: pub, title, summary (Tamil, 2-3 sentences, your own words), url). Reuse existing keys from `data/sources.json` when the same article is cited.
- `data/_pending/<N>-people.json` — NEW people/places for the நபர்கள் tab (same shape as `data/people.json`; `img` = `people/<key>.jpg` or `places/<key>.jpg`; also add `"icon_desc"` (English description for the icon generator) and `"accent"` (muted hex, not used yet by others). Reuse existing keys (paul, peter, james, barnabas, ananias, galatia, arabia, damascus, jerusalem, tarsus, antioch) — don't redefine them.
- Optional: `tools/galatians<N>_map.py` + inline SVG, if the chapter has real movement (copy `tools/galatians1_map.py`'s approach and CSS classes). Otherwise the வரைபடம் tab can use the B13 map / nwtsty media images.
- Optional images: save to `assets/img/galatians/` (jw.org / wol media only, resized with `sips -Z 1400`), credited with a source chip.

Do NOT edit 1.html, app.js, style.css, data/sources.json, data/people.json, data/verses-ta.json (the lead merges). Do NOT commit or push.

## Research method
- Tamil study Bible: `https://wol.jw.org/ta/wol/b/r122/lp-tl/nwtsty/48/<N>`; English (full study notes): `https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/48/<N>`.
- Fetch with `curl -sL -A "Mozilla/5.0" URL -o file`, strip tags with a small Python script (`python3 -I`). Keep downloads in your own temp folder.
- Per verse, open the Research Guide links listed on the study page (Tamil first, English if no Tamil). Also the media gallery (`/en/wol/gallery/r1/lp-e/nwtsty/48/<N>`) — download images from `/en/wol/mp/...` URLs.
- Look for more: wol search `https://wol.jw.org/en/wol/s/r1/lp-e?q=Galatians+<N>%3A<v>&p=par` (skip schedules/indexes), recent Watchtower study articles, Insight (it), si “Bible Book 48”, w08 “Highlights from Galatians” (2008607), lfb lessons, bt chapters.
- Use English sources freely but write Tamil with the terms in `research/translation-guide.md`; check unknown terms against the Tamil NWT text of the verse. Append any new term pairs you verified to the end of your `<N>-sources.md` under "## Translation terms" (lead merges them).
- Hebrew Scripture quotations Paul uses: show the original verse and explain why he uses it.
- Keep publication hedging ("இருக்கலாம்", "தெரிகிறது"). Your own suggested cross-references must be labelled "ஒப்பிட்டுப் பார்க்க". No speculation presented as fact.

## Page content (same tabs as chapter 1)
சுருக்கம் (structure bar by the nwtsty Tamil outline, 5-min gist, 6-10 key points, one-line callout) · கதை (chapter in order as questions: “பவுல் சொல்வது” + “ஏன்” reasoning; background from Acts/Hebrew Scriptures only where it explains a verse; end with the argument chain; this is the heart — make Paul's reasoning easy) · ஆய்வு (verse-group `<details class="vs">` with `.vref` like `2:11–14`, Greek boxes, cross-refs, lessons, chips) · பெரிய விஷயங்கள் (only the question headings the chapter really answers + any other important one) · பின்னணி (only what is new vs chapter 1 — don't repeat the book intro; link to other Bible books) · வரைபடம் · காலம் (map/timeline relevant to this chapter) · நபர்கள் (table with avatars) · பாடங்கள் (lessons + review Q&A, each answer with “ஆதாரம்:” refs).
`data-parts` on the verse pane = the nwtsty Tamil outline ranges for this chapter.

## Don't repeat / don't miss
Don't repeat chapter 1's material (Paul's conversion, Arabia, 15 days with Peter) — link back with a short sentence at most. Each chapter must cover its own key items, interesting facts and the Hebrew Scripture background. Minimum checklist per chapter is given in your task.

## Quality bar (self-check before finishing)
Every `data-src` key exists in data/sources.json or your pending file · every `data-person` key exists in data/people.json or your pending file · all URLs open (no "இது இல்லை" page) · HTML is well-formed (same nesting as 1.html) · Tamil uses current NWT terms · no English left in Tamil text except Greek/transliteration and English source titles.
Report at the end: files written, new source keys, new people/places, anything uncertain.

## Lead note (after agents started)
Tab order: வசனங்கள் (mob) · ஆய்வு · சுருக்கம் · கதை · பெரிய விஷயங்கள் · பின்னணி · வரைபடம் · காலம் · நபர்கள் · பாடங்கள். The lead fixes this in merged pages.
