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
- Generated index requirements added, including object-class indexes and metadata-based analytical indexes.
- Stable logical identity separated from rendered numbering/position.
- Established Markdown extension ecosystems reviewed (Pandoc, Quarto, MyST).
- Pandoc/Quarto ecosystem compatibility is now a formal requirement, not only an architectural convention.
- Pandoc/Quarto-compatible authoring syntax adopted in ADR-0001:
  - Pandoc attributes for IDs/classes/metadata;
  - Quarto typed prefixes and `@...` cross-references for standard object classes;
  - Pandoc/Quarto fenced Divs for richer semantic blocks;
  - Pandoc-style paragraph anchors plus internal links for paragraph references.
- Initial conceptual pipeline documented.
- Renderer-independent IR identified as an open design question, not an accepted decision.

## In progress
- Refine the exact Pandoc/Quarto subset supported in v0.1.
- Refine Markdown authoring and compilation workflow requirements.
- Define editorial style-profile requirements.
- Define acceptance criteria for headings, numbering, TOC, lists, links, tables, figures, captions, references, indexes, and formatting.
- Investigate Google Docs / Apps Script capabilities and constraints for headings, bookmarks/anchors, TOC, references, and generated indexes.
- Decide the minimal implementation architecture for the first prototype.

## Next actions
1. Define REQ-003 for Markdown authoring and compilation workflow.
2. Define REQ-004 for Google Docs rendering and editorial formatting.
3. Define validation/diagnostics requirements, including structural and cross-reference validation.
4. Create RES notes for Google Docs API/Apps Script behavior relevant to headings, lists, TOC, bookmarks, anchors, and styles.
5. Review RFC-001 on a renderer-independent intermediate representation.
6. Build a minimal lab prototype for headings, hierarchical numbering, and stable internal references.
7. Add fixture-based tests before promoting code into `src/`.

## Open decisions
- Pure Apps Script vs external compiler + Apps Script renderer vs hybrid.
- Native Google Docs TOC vs engine-generated TOC.
- Exact supported Pandoc/Quarto feature subset for v0.1.
- Syntax and semantics for analytical-index declarations and metadata queries.
- Whether v0.1 requires a formal intermediate representation.
- How referenceable objects map to Google Docs bookmarks/anchors.
- How paragraph references should render when paragraphs have no visible numbering and no explicit link text.
- Whether generated indexes are rebuilt or incrementally synchronized.
- Cross-document references (not currently in v0.1 baseline).

## Blockers
None.
