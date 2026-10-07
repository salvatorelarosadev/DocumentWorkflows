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
- Referenceable-object and cross-reference requirements added for sections/headings, paragraphs, figures, and tables.
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

## In progress
- Refine the exact Pandoc/Quarto subset supported in v0.1.
- Refine Markdown authoring and compilation workflow requirements.
- Define only the renderer/style requirements directly needed by the focused v0.1 structural scope.
- Define acceptance criteria for headings, hierarchical numbering, TOC, internal targets/references, and object-based indexes.
- Investigate Google Docs / Apps Script capabilities and constraints for headings, bookmarks/anchors, TOC, references, and generated indexes.
- Execute Google Docs Structural Spike 001 and record empirical results for heading numbering, native TOC behavior, and native-backed targets.

## Next actions
1. Define REQ-003 for Markdown authoring and compilation workflow.
2. Define REQ-004 for Google Docs rendering and editorial formatting.
3. Define validation/diagnostics requirements, including structural and cross-reference validation.
4. Run `lab/google-docs-structural-spike-001/MANUAL_TEST.md` against a disposable Google Doc.
5. Record the observed results and use them to decide the next spike: TOC automation, Markdown parsing, or object-index generation.
6. Review RFC-001 on a renderer-independent intermediate representation only as needed by the evidence.
7. Add fixture-based tests before promoting code into `src/`.

## Open decisions
- Pure Apps Script vs external compiler + Apps Script renderer vs hybrid.
- Exact native Google Docs TOC automation workflow; custom TOC is now fallback-only under REQ-MDE-GDOC-004.
- Exact supported Pandoc/Quarto feature subset for v0.1.
- Subject/concept-index syntax and semantics beyond the v0.1 object-index baseline; RES-002 identifies quarto-index as a high-priority candidate for future evaluation.
- Whether v0.1 requires a formal intermediate representation.
- How referenceable objects map to Google Docs bookmarks/anchors.
- How paragraph references should render when paragraphs have no visible numbering and no explicit link text.
- Whether generated indexes are rebuilt or incrementally synchronized.
- Cross-document references (not currently in v0.1 baseline).

## Blockers
None.
