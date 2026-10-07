# Markdown Document Engine — Status

**Last updated:** 2026-10-07  
**Version:** 0.0.0-dev  
**Maturity:** Requirements / architecture discovery

## Completed
- Subproject created.
- Markdown selected as the intended source/interchange syntax for the first authoring workflow.
- Google Docs selected as the first renderer and immediate problem context.
- Manual section numbering excluded from canonical source.
- Initial core requirements baseline drafted.
- Referenceable-object and cross-reference requirements added for sections/headings, figures, and tables; direct paragraph/text-fragment references are deferred from v0.1.
- Generated index requirements added; the v0.1 baseline is now explicitly object-centric and derived from the referenceable-object registry.
- Stable logical identity separated from rendered numbering/position.
- Established Markdown extension ecosystems reviewed (Pandoc, Quarto, MyST).
- Pandoc/Quarto ecosystem compatibility is now a formal requirement, not only an architectural convention.
- Native-first Google Docs augmentation is now a formal requirement: reuse native headings, TOC, links, bookmarks, and related primitives where adequate; implement only documented gaps.
- Pandoc/Quarto-compatible authoring syntax adopted in ADR-0001:
  - Pandoc attributes for IDs/classes/metadata;
  - Quarto typed prefixes and `@...` cross-references for standard object classes;
  - Pandoc/Quarto fenced Divs for richer semantic blocks;
  - Pandoc-style paragraph anchors plus internal links for paragraph references.
- Analytical-indexing knowledge baseline documented in RES-002, including current AsciiDoc, Sphinx/MyST, Quarto core, and Quarto-extension approaches.
- Focused Google Docs capability matrix documented in RES-003 for native headings/TOC, hierarchical numbering, internal navigation, and object-based analytical indexes.
- Concept-level analytical indexing is tracked as roadmap direction RD-001 rather than prematurely committed as a v0.1 requirement.
- Initial conceptual pipeline documented.
- Renderer-independent IR identified as an open design question, not an accepted decision.
- Google Docs Structural Spike 001 manually validated with all planned checks passing: native heading semantics, hierarchical numbering, idempotence, native TOC compatibility/navigation, hierarchy validation, and NamedRange/Bookmark target persistence.
- REQ-003 — Heading Numbering Workflow drafted for one-shot numbering, automatic ON/OFF reconciliation, removal behavior, and English UI.
- REQ-004 — Reference Object Interaction and Cross-Reference Insertion drafted for the context-aware Object Inspector, formal objects, captions, managed labels, reference rendering modes, Object Browser, and multi-reference insertion.
- Global document-wide figure and table numbering adopted for v0.1: one progressive series for figures and one for tables, without chapter/section resets.
- Direct paragraph/arbitrary text-fragment references moved to exploratory roadmap direction RD-002.
- RES-004 documents the reference UX baseline from Microsoft Word, Quarto, Sphinx, and LaTeX cleveref.

## In progress
- Refine the exact Pandoc/Quarto subset supported in v0.1.
- Refine Markdown authoring and compilation workflow requirements.
- Define only the renderer/style requirements directly needed by the focused v0.1 structural scope.
- Refine acceptance criteria for headings, hierarchical numbering, TOC, formal reference objects, Object Inspector/Browser interactions, and object-based indexes.
- Investigate Google Docs / Apps Script capabilities and constraints for headings, bookmarks/anchors, TOC, references, and generated indexes.
- Validate Live Numbering Spike 001b: one-shot numbering plus automatic reconciliation ON/OFF with an English Google Docs UI.

## Next actions
1. Run `lab/google-docs-live-numbering-spike-001b/MANUAL_TEST.md`.
2. Record the live-numbering evidence and refine REQ-003 if needed.
3. Prototype the context-aware Object Inspector for section, table, and inline-image selections.
4. Prototype formalization of table/figure objects with mandatory unique IDs and caption metadata.
5. Prototype the Object Browser with type filters, search, multi-selection, and insertion at a preserved cursor location.
6. Build the minimal Pandoc/Quarto-compatible Markdown → native Google Docs structural compilation path using the same object model.
7. Prototype the first object-based analytical index from the semantic object registry.
8. Review RFC-001 only as required by experimental evidence and add fixture-based tests before promoting code into `src/`.

## Open decisions
- Pure Apps Script vs external compiler + Apps Script renderer vs hybrid.
- Exact native Google Docs TOC automation workflow; custom TOC is now fallback-only under REQ-MDE-GDOC-004.
- Exact supported Pandoc/Quarto feature subset for v0.1.
- Subject/concept-index syntax and semantics beyond the v0.1 object-index baseline; RES-002 identifies quarto-index as a high-priority candidate for future evaluation.
- Whether v0.1 requires a formal intermediate representation.
- How referenceable objects map to Google Docs bookmarks/anchors.
- Future paragraph/text-fragment reference semantics and syntax are deferred to ROADMAP RD-002.
- Whether generated indexes are rebuilt or incrementally synchronized.
- Cross-document references (not currently in v0.1 baseline).

## Blockers
None.
