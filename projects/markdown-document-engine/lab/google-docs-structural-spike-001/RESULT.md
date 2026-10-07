# RESULT — Google Docs Structural Spike 001

**Date:** 2026-10-07  
**Status:** Passed  
**Evidence type:** Manual execution in a disposable Google Docs document  
**Result source:** reported by the project maintainer after completing the manual test plan

## Overall result

The complete manual test defined in `MANUAL_TEST.md` was executed successfully.

The spike passed **all planned checks**.

## Confirmed observations

The manual test confirms that, for the scenarios exercised by Structural Spike 001:

| Capability | Result |
|---|---|
| Native Google Docs heading semantics preserved | PASS |
| Hierarchical numbering generated correctly | PASS |
| Numbering remains idempotent across repeated executions | PASS |
| Renumbering after structural insertion works correctly | PASS |
| Renumbering after reordering works correctly | PASS |
| Native Google Docs TOC reflects generated heading numbers | PASS |
| Native TOC navigation remains functional | PASS |
| Invalid heading hierarchy is detected before mutation | PASS |
| Generated numbering can be removed without losing native heading semantics | PASS |
| NamedRange targets survive the tested edits/moves | PASS |
| Bookmark targets survive the tested edits/moves | PASS |
| Native Heading 1–6 semantics remain inspectable after numbering | PASS |

## What this establishes

The experiment provides positive evidence for the project's native-first Google Docs strategy.

In particular:

1. **Visible generated numbering is compatible with native heading semantics** for the tested scenarios.
2. **The native Google Docs TOC remains usable** after MDE-style hierarchical numbering is applied to heading text.
3. **Repeated execution is viable** without accumulating duplicate numbering under the spike's current logic.
4. **Document restructuring can be followed by deterministic renumbering**.
5. **NamedRanges and Bookmarks are both viable native primitives for further experiments with semantic object targets**.
6. The project does not need to replace Google Docs headings, outline, TOC, or internal navigation in order to solve the initial structural-document problem.

## Important qualification

This result validates the mechanics exercised by the lab spike.

It does **not** yet establish:

- the final production algorithm for detecting/removing generated numbering;
- the final choice between NamedRange, Bookmark, heading ID, or a combination for each object class;
- automatic insertion or refresh of a native TOC;
- Markdown/Pandoc parsing;
- the final synchronization model;
- the final Apps Script vs external compiler architecture;
- object-index generation.

The spike's prefix-detection logic remains intentionally heuristic and must not be promoted unchanged into production.

## Architecture implications

The result supports continuing with the current design direction:

```text
Pandoc / Quarto source semantics
        ↓
MDE transformation logic
        ↓
native Google Docs headings / TOC / navigation primitives
        +
MDE augmentation for numbering, semantic references, and indexes
```

No evidence from Spike 001 requires a custom heading model or custom TOC.

## Recommended next experiment

The next spike should connect the now-validated Google Docs mechanics to a minimal Markdown source.

Suggested scope:

```markdown
# Introduction {#sec-introduction}
## Context {#sec-context}
### Italian scenario {#sec-italy}
## Objectives {#sec-objectives}
# Methodology {#sec-methodology}
```

and compile it into:

- true native Google Docs Heading 1–3 paragraphs;
- generated hierarchical numbering;
- stable semantic target mappings;
- a document compatible with the native TOC.

The native TOC can remain manually inserted/refreshed during this next spike unless automation becomes necessary to test the compilation workflow.

After that, the next focused experiment can generate the first object-based analytical index from the semantic registry.

## Related material

- `README.md` — spike purpose and setup.
- `MANUAL_TEST.md` — manual test procedure.
- `Code.gs` — experiment implementation.
- `../../docs/RES/RES-003 - Google Docs Native Capability Matrix for v0.1 Augmentation.md`.
- `../../docs/REQ/REQ-001 - Scope and Core Requirements.md`.
- `../../docs/REQ/REQ-002 - Referenceable Objects Cross-References and Generated Indexes.md`.
