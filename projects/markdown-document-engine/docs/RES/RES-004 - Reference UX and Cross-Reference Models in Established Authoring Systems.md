# RES-004 — Reference UX and Cross-Reference Models in Established Authoring Systems

**Status:** Complete initial knowledge baseline  
**Date:** 2026-10-07  
**Project:** Markdown Document Engine

## Research question

How should MDE combine a Markdown-style cross-reference model with a visual Google Docs authoring interface without inventing avoidable new semantics?

The research focuses on Microsoft Word, Quarto/Pandoc conventions, Sphinx, and LaTeX cleveref.

## Executive conclusion

A strong hybrid model already exists across mature tools:

- **Microsoft Word** provides the best precedent for the visual workflow:
  - select an object;
  - insert/manage a caption;
  - choose a reference type;
  - choose what information to insert;
  - choose the target object;
  - insert a navigable cross-reference.
- **Quarto** provides the strongest baseline for MDE source identity:
  - typed stable IDs such as `#fig-x`, `#tbl-x`, and `#sec-x`;
  - inline references such as `@fig-x`;
  - configurable caption titles and reference prefixes.
- **Sphinx** demonstrates references that can render number and/or caption/title.
- **LaTeX cleveref** demonstrates intelligent formatting of multiple references, automatic type naming, grouping, sorting, pluralization, and range compression.

MDE should therefore combine Word-like object discovery/insertion UX with Quarto-compatible IDs and references.

## 1. Microsoft Word

Word's cross-reference dialog separates:

1. **Reference type** — what category of object is being referenced;
2. **Insert reference to** — what representation should be inserted;
3. **For which** — the specific target object;
4. **Insert as hyperlink** — whether the result should navigate to the target.

Word tracks cross-referenced targets using hidden bookmarks.

This interaction pattern strongly supports an MDE Object Browser that filters by type and lets the user choose one or more targets.

### Captions

Word captions are composed from:

- a customizable label such as Figure/Table/Equation;
- an automatically generated ordered number;
- optional descriptive caption text.

Word also allows users to create new labels.

The caption-number field is derived rather than manually maintained.

### MDE lesson

Reuse the visual interaction pattern, but do not copy Word's internal field implementation.

Also avoid conflating label wording with logical object identity.

## 2. Quarto

Quarto requires typed identifiers for standard cross-referenceable objects.

Examples:

```markdown
![Platform ecosystem](ecosystem.png){#fig-platform}

: Market comparison {#tbl-market-comparison}

## Methodology {#sec-methodology}
```

References use the same logical identifier with `@`:

```markdown
See @fig-platform.
See @tbl-market-comparison.
See @sec-methodology.
```

Quarto supports:

- default reference output such as `Figure 1`;
- custom prefix syntax;
- no-prefix references;
- configurable caption titles such as `Figure` vs `Fig`;
- configurable inline reference prefixes;
- independent numbering options by object class.

### MDE lesson

Adopt the Quarto identity model and typed prefixes.

Keep caption label and inline reference prefix as separate presentation concerns.

Do not create a proprietary identity syntax when Quarto already provides one.

## 3. Sphinx

Sphinx supports arbitrary labels and cross-references using roles such as `:ref:` and `:numref:`.

For numbered objects, `:numref:` can generate text based on:

- object number;
- custom explicit link text;
- placeholders for number;
- object name/caption.

Sphinx therefore demonstrates that a single logical target can legitimately have multiple rendering modes, including number and title/caption combinations.

### MDE lesson

A reference occurrence should own a rendering mode, while the target owns identity and descriptive metadata.

## 4. LaTeX cleveref

Cleveref extends standard LaTeX references so the renderer understands reference type.

It can:

- automatically insert the type name;
- format several references at once;
- sort references;
- group references by type;
- pluralize labels;
- compress consecutive numeric references into ranges.

### MDE lesson

Do not flatten multi-selection into plain text.

Represent a group of selected target IDs structurally so richer rendering can be added later.

## 5. Important semantic separation for MDE

The research suggests four separate layers:

```text
logical identity
    fig-platform
        ↓
display metadata
    caption label / title
        ↓
derived state
    current number
        ↓
reference rendering
    Figure 3
    Fig. 3
    3
    Figure 3 — Platform ecosystem
```

This separation prevents several common problems:

- renaming a title does not break references;
- abbreviating a label does not create a new object;
- moving an object changes its number but not its identity;
- different occurrences may render the same target differently.

## 6. Word-like UX + Quarto-like semantics

Recommended MDE model:

```text
Google Docs selection
        ↓
MDE Object Inspector
        ↓
formalize / edit object metadata
        ↓
stable logical ID
        ↓
Object Browser
        ↓
insert reference occurrence
        ↓
renderer expands according to active profile
```

A user who prefers Markdown can author `#id` / `@id` directly.

A user who prefers visual interaction can use the Object Inspector and Object Browser.

Both paths must modify the same semantic registry.

## 7. Logical gaps to address explicitly

The following issues are easy to overlook and should be requirements rather than afterthoughts:

1. **ID rename** — references must migrate or rename must be blocked.
2. **Copy/paste duplication** — duplicate logical IDs must be detected.
3. **Object deletion** — existing references must become explicit diagnostics.
4. **Insertion point preservation** — a modal/browser must not lose the target cursor location.
5. **Multiple references** — preserve structure rather than flattening to text.
6. **Label vs prefix vs numbering series** — do not conflate these concepts.
7. **Paragraph/text-fragment references** — this capability is intentionally deferred from v0.1 and tracked in ROADMAP RD-002; the immediate workaround is to use a one-cell table for a standalone formally referenceable text block.
8. **Object Browser vs generated index** — one is an authoring UI, the other is rendered document content.
9. **Title edits** — must not silently rename IDs.
10. **UI language vs document language** — English MDE UI must not prevent Italian or other document labels.

## 8. Sources reviewed

### Microsoft Word

- Microsoft Support — Create a cross-reference  
  https://support.microsoft.com/en-us/word/create-a-cross-reference
- Microsoft Support — Add, format, or delete captions in Word  
  https://support.microsoft.com/en-us/word/add-format-or-delete-captions-in-word
- Microsoft Support — Add chapter numbers to captions in Word  
  https://support.microsoft.com/en-us/word/add-chapter-numbers-to-captions-in-word

### Quarto

- Quarto — Cross References  
  https://quarto.org/docs/authoring/cross-references/
- Quarto — Cross Reference Options  
  https://quarto.org/docs/authoring/cross-reference-options.html
- Quarto — Cross-Reference Div Syntax  
  https://quarto.org/docs/authoring/cross-references-divs.html

### Sphinx

- Sphinx — Cross-references  
  https://www.sphinx-doc.org/en/master/usage/referencing.html

### LaTeX cleveref

- CTAN — cleveref  
  https://ctan.org/pkg/cleveref

## Research status

This research supports REQ-004.

It does not yet choose:

- the final internal object-registry representation;
- the exact Google Docs bookmark/named-range architecture;
- exact source syntax for reference rendering modes beyond established Quarto conventions;
- advanced multi-reference compression rules.


## 9. Scope refinement after initial research

Following the first requirement pass, the v0.1 object model was intentionally narrowed to:

- sections/headings;
- figures;
- tables.

Figures and tables use separate document-global progressive numbering series, following the default Word-like model:

```text
Figure 1
Figure 2
Figure 3

Table 1
Table 2
Table 3
```

Numbering does not restart by chapter or section in v0.1.

Direct references to ordinary body paragraphs or arbitrary sequential text fragments are deferred to ROADMAP RD-002. This is not yet an RFC because the project does not have enough evidence to compare concrete semantic and syntax alternatives.

For the immediate use case, a one-cell table can serve as a formally referenceable standalone text block while remaining inside the supported table-reference model.
