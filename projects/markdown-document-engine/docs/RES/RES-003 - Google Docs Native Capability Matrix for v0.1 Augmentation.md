# RES-003 — Google Docs Native Capability Matrix for v0.1 Augmentation

**Status:** Complete initial capability review  
**Date:** 2026-10-07  
**Project:** Markdown Document Engine  
**Scope:** Only capabilities directly relevant to heading structure, TOC, hierarchical numbering, internal targets/navigation, and the v0.1 object-based analytical index.

## Research question

Which parts of the Markdown Document Engine's immediate goals are already provided adequately by Google Docs, and where must MDE add behavior rather than duplicate native functionality?

The project principle is:

> Reuse native Google Docs semantics and behavior first; augment only the gap.

This review is deliberately not a general inventory of Google Docs limitations.

## Executive conclusion

For the v0.1 target:

- **native Google Docs headings should be reused directly**;
- **native Google Docs TOC should be the preferred TOC model**;
- **native internal-link primitives should be reused for navigation and object targeting where suitable**;
- **hierarchical heading numbering remains an MDE augmentation target**;
- **the object-based analytical index remains an MDE augmentation target**;
- MDE should not implement unrelated Google Docs gaps.

## Capability matrix

| Capability | Native in Google Docs editor | Supported/exposed programmatically | v0.1 MDE posture |
|---|---|---|---|
| Heading hierarchy (Heading 1–6) | Yes | Yes; paragraph heading/style semantics are exposed through Docs APIs / Apps Script | **Reuse** native headings |
| Document outline/navigation from headings | Yes | Derived from native document structure | **Reuse**; no parallel outline model |
| Table of contents from headings | Yes; insert, configure, refresh, navigate | TOC is exposed as a document structural element; direct creation/control through the reviewed APIs is more limited than ordinary text/paragraph operations and requires prototype validation | **Reuse first**; augment only automation/control gaps |
| Word-style hierarchical heading numbering (`1`, `1.1`, `1.1.1`) tied reliably to heading hierarchy | Not documented as a native heading-style capability in reviewed official help; numbered lists and headings are separate mechanisms | Paragraph/list APIs exist, but no reviewed first-class heading-numbering semantic equivalent to Word multilevel heading numbering | **Implement/augment** in MDE |
| Links to headings | Yes | Yes; Docs API exposes heading links including tab-aware heading IDs | **Reuse** |
| Bookmarks/internal links | Yes | Yes; Docs API exposes bookmark links including tab-aware bookmark IDs | **Reuse where suitable** |
| Named ranges for programmatic object tracking | Not a primary end-user navigation construct | Yes; named ranges use developer-defined names and automatically update indexes as text is edited | **Evaluate/reuse** as internal substrate where appropriate |
| Stable MDE semantic object IDs (`fig-`, `tbl-`, `sec-`, `par-`) | No equivalent project-level semantic registry | Native headings/bookmarks/named ranges can provide target primitives, but not the complete MDE semantic model | **MDE semantic layer mapped onto native primitives** |
| Dynamic semantic cross-reference text such as “Figure 4” tied to object renumbering | No reviewed first-class general-purpose capability | Internal links exist, but MDE must own semantic resolution and derived label/number text | **Implement/augment** in MDE |
| Object-based analytical index generated from referenceable objects | No reviewed first-class general object-index facility | Native links/anchors can support navigation to entries | **Implement** in MDE |
| General subject/concept analytical index | No reviewed core Google Docs facility | Not part of v0.1 scope | **Roadmap only** (RD-001) |

## 1. Native headings

Google Docs natively supports Title, Subtitle, and Heading 1–6 paragraph styles.

The Help Center explicitly documents these heading styles and their use as document structure.

Therefore MDE should not simulate headings through manually styled normal paragraphs.

### MDE implication

```markdown
## Methodology
```

must render as a genuine Google Docs heading with the corresponding native heading semantics.

## 2. Native table of contents

Google Docs natively provides a heading-based table of contents.

The editor can:

- insert a TOC;
- choose its appearance;
- select which heading levels are shown;
- refresh the TOC after heading changes;
- navigate from TOC entries to headings.

This is already the user-facing behavior the project wants.

### API nuance

The Docs API document model exposes `TableOfContents` as a structural element.

However, in the reviewed REST `batchUpdate` request types, no dedicated `InsertTableOfContentsRequest` was found. Apps Script exposes a `TableOfContents` element for accessing existing TOCs, but the reviewed API documentation did not expose an obvious first-class insertion method comparable with inserting a table or image.

This is not yet a conclusion that programmatic creation is impossible. It is an **automation capability question requiring a prototype**.

### MDE implication

The requirement is not “build a TOC engine.”

The requirement is:

> make the native Google Docs TOC workflow reliable within the MDE compilation process.

Only if the native TOC cannot meet a documented automation/reliability requirement should a custom TOC be considered.

## 3. Hierarchical heading numbering

The official Google Docs Help material reviewed documents headings and numbered lists as separate facilities and does not document a Word-style mechanism in which Heading 1 / Heading 2 / Heading 3 automatically participate in a style-linked multilevel numbering scheme.

Google Docs community discussions, including examples through 2024, repeatedly describe this as a practical limitation: list numbering and heading semantics do not behave as Word-style heading numbering.

Community answers are secondary evidence and are not treated as authoritative product specifications, but they align with the gap observed in the official documentation.

### MDE implication

This is one of the clearest v0.1 augmentation targets.

MDE must derive numbering from the Markdown heading tree, for example:

```text
1     Heading 1
1.1   Heading 2
1.1.1 Heading 3
1.2   Heading 2
2     Heading 1
```

while retaining native Google Docs heading semantics.

The implementation mechanism remains an architecture/prototype question.

## 4. Internal navigation primitives

The current Docs API explicitly supports internal links to:

- headings;
- bookmarks;
- document tabs.

Heading and bookmark links are tab-aware in modern multi-tab documents.

### MDE implication

MDE should not invent a proprietary navigation mechanism.

Semantic source references such as:

```markdown
@sec-methodology
@fig-platform
```

should resolve to MDE semantic objects whose rendered navigation uses appropriate native Google Docs primitives.

## 5. Named ranges

Google Docs named ranges provide developer-defined labels associated with document ranges.

Google documents that their range indexes automatically update as text is added or removed.

This is potentially useful for stable programmatic tracking during incremental edits or recompilation.

### Important limitation

Named ranges are a programmatic location/identity primitive, not automatically the same thing as an end-user semantic cross-reference model.

### MDE implication

Named ranges are a **candidate implementation substrate**, not a requirement-level semantic model.

Whether headings, bookmarks, named ranges, or a combination are used for each MDE object class remains an architecture decision.

## 6. Cross-reference semantics

Google Docs provides links and targets, but the project requires semantic reference behavior such as:

```text
see Figure 4
see Table 2
see section 3.1
```

where the visible number is derived from the target object's current state.

The reviewed native features provide the navigation substrate but not the complete MDE semantic object registry and derived numbering behavior.

### MDE implication

MDE owns:

- semantic object identity;
- resolution of `@...` source references;
- derived display labels/numbers;
- consistency after reordering.

Google Docs owns the native link/target behavior wherever adequate.

## 7. Object-based analytical index

The v0.1 analytical index is not a subject/concept index.

It is generated from MDE's existing registry of referenceable objects.

For example:

```text
Sections
  1. Introduction
  2. Methodology

Figures
  Figure 1 — Platform architecture

Tables
  Table 1 — Market data

Paragraph targets
  par-wallet-rationale
```

The reviewed Google Docs documentation does not expose a first-class general-purpose index of arbitrary semantic objects.

### MDE implication

MDE must generate the index, but its entries should use native Google Docs navigation targets where possible.

Richer subject/concept indexing remains outside v0.1 and is tracked in ROADMAP RD-001 and RES-002.

## 8. Explicit v0.1 scope boundary

This research does **not** justify work on unrelated Google Docs limitations.

The current augmentation scope is:

```text
native heading hierarchy
        ↓
reliable hierarchical numbering
        ↓
native-first TOC workflow
        ↓
stable native-backed internal targets / navigation
        ↓
MDE object-based analytical index
```

Other features should enter v0.1 only when they are direct prerequisites for this chain.

## 9. Prototype questions

The first prototype/research spike should answer:

1. Can MDE render hierarchical numbers into heading text while preserving true native Heading 1–6 semantics?
2. Does the native TOC then include the rendered hierarchical numbers exactly as required?
3. Can an existing native TOC be refreshed or otherwise maintained reliably through supported automation?
4. If direct TOC insertion is not available through the chosen API surface, what is the smallest acceptable native-first workflow?
5. Which target primitive is best for each object type:
   - native heading ID;
   - bookmark;
   - named range;
   - combination?
6. How stable are these primitives after recompilation and user edits?
7. Can generated analytical-index entries link reliably to all required object classes, including paragraph targets?

## Sources reviewed

### Google official documentation

- Google Docs Editors Help — Add a title, heading, or table of contents in a document  
  https://support.google.com/docs/answer/116338

- Google Docs API — Document resource / TableOfContents / links / named ranges  
  https://developers.google.com/workspace/docs/api/reference/rest/v1/documents

- Google Docs API — Requests / batchUpdate request types  
  https://developers.google.com/workspace/docs/api/reference/rest/v1/documents/request

- Google Docs API — Work with named ranges  
  https://developers.google.com/workspace/docs/api/how-tos/named-ranges

- Google Docs API — Work with tabs / internal links  
  https://developers.google.com/workspace/docs/api/how-tos/tabs

- Apps Script Document service / TableOfContents  
  https://developers.google.com/apps-script/reference/document  
  https://developers.google.com/apps-script/reference/document/table-of-contents

### Secondary evidence

Google Docs Editors Community discussions about heading numbering were reviewed only as corroborating practical evidence, not as authoritative product documentation.

## Research status

This RES establishes the **native-first scope and capability boundary**.

It does not select:

- Apps Script vs Docs API vs hybrid;
- the exact heading-number rendering mechanism;
- the exact TOC automation mechanism;
- the object-to-bookmark/named-range mapping.

Those remain prototype and architecture decisions.
