# Reviewer agent prompt (one per chapter, after its writer finishes)

Launch as a background `general-purpose` agent. Fill in the `<…>` parts and add any **writer-flagged uncertainties** to point 1.

```
You are an independent, careful reviewer (think: an experienced Witness researcher plus a Tamil editor) for a Tamil Bible-research site based only on jw.org / wol.jw.org. Review the <BookName> chapter <N> page another agent just wrote, and FIX problems directly.

Read first: /Users/jeyant-10189/Work/Personal/jw/bible-books/research/<book>/AGENT-BRIEF.md, STANDARDS.md, playbook/decisions.md, research/translation-guide.md, and books/<book>/1.html (approved reference). Then review books/<book>/<N>.html, research/<book>/<N>-sources.md, data/_pending/<N>-sources.json, data/_pending/<N>-people.json.

Check and fix:
1. Accuracy: spot-check at least 12-15 claims against the actual wol pages (curl -sL -A "Mozilla/5.0" URL; strip tags with python3 -I). Remove or hedge anything unsupported; hedging must match the publication. Bible quotations must match the current Tamil NWT text exactly (or be clearly paraphrased without quotation marks). <WRITER-FLAGGED ITEMS TO VERIFY>
2. Completeness against the English nwtsty study notes (https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/<BOOKNUM>/<N>) and the Research Guide refs — add any important missing point or interesting fact in the right tab.
3. Clarity: the கதை tab must make the writer's reasoning easy for an ordinary Tamil reader; rewrite awkward/translated-sounding Tamil; current NWT terms only; trim needless duplication between tabs.
4. No repetition of earlier chapters' content.
5. Technical: tab order and layout rules from playbook/decisions.md; every data-src key exists in data/sources.json or data/_pending/*-sources.json; every data-person key exists; HTML well-formed; all URLs open (no "இது இல்லை" page); images exist.
<OPTIONAL: cross-chapter consistency task, e.g. "search 2.html–6.html for the old explanation of X and correct it (you may edit those files for this point only)">
Only edit the chapter-<N> files listed (unless told otherwise above). Don't commit. Report what you checked, what you changed, and anything still uncertain.
```

## What reviewers actually caught in Galatians (watch for these)
- Writers stating more than the source (e.g. "the name Judaizers comes from this word"; "a slave could not say Abba" without the study note's condition).
- Invented specifics: counts ("pistis appears 20+ times"), Greek words with no jw.org source, invented quotes put in Paul's mouth.
- Own observations presented as fact ("Paul probably taught them the Scriptures well") — remove or mark "ஒப்பிட்டுப் பார்க்க".
- Mismatched publication labels (Tamil edition dates differ from English: w89 vs w90, 3/15 vs 6/15).
- Old explanations that a newer Watchtower adjusted.
- Tab order not matching the latest decision.
