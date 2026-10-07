# Markdown Document Engine — Status

**Last updated:** 2026-10-07  
**Version:** 0.0.0-dev  
**Maturity:** Requirements / architecture discovery

## Completed
- Subproject created.
- Markdown selected as the intended source/interchange syntax for the first authoring workflow.
- Google Docs selected as the first renderer and immediate problem context.
- Manual section numbering excluded from canonical source.
- Initial requirements baseline drafted.
- Initial conceptual pipeline documented.
- Renderer-independent IR identified as an open design question, not an accepted decision.

## In progress
- Refine Markdown feature scope.
- Define acceptance criteria for headings, numbering, TOC, lists, links, tables, and formatting.
- Investigate Google Docs / Apps Script capabilities and constraints.
- Decide the minimal implementation architecture for the first prototype.

## Next actions
1. Validate REQ-001 against concrete authoring examples.
2. Create RES notes for Google Docs API/Apps Script behavior relevant to headings, lists, TOC, bookmarks, and styles.
3. Review RFC-001 on a renderer-independent intermediate representation.
4. Build a minimal lab prototype for headings and hierarchical numbering.
5. Add fixture-based tests before promoting code into `src/`.

## Open decisions
- Pure Apps Script vs external compiler + Apps Script renderer vs hybrid.
- Native Google Docs TOC vs engine-generated TOC.
- Exact Markdown subset for v0.1.
- Whether v0.1 requires a formal intermediate representation.
- How custom semantic directives should work if standard Markdown is insufficient.

## Blockers
None.
