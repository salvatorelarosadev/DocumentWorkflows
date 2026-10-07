# Google Docs Structural Spike 001

**Status:** Lab prototype  
**Scope:** active Google Docs tab only  
**Runtime:** Google Apps Script, V8  
**Source of truth:** this repository

## Purpose

This spike tests the minimum Google Docs mechanics required by the Markdown Document Engine v0.1 before any Markdown parser or production architecture is built.

It answers four practical questions:

1. Can MDE add hierarchical numbers such as `1`, `1.1`, and `1.1.1` while preserving true native Google Docs Heading 1–6 semantics?
2. Is the numbering operation safe to run repeatedly without accumulating duplicate prefixes?
3. Does the native Google Docs table of contents continue to work correctly when heading text is numbered by the spike?
4. Can native Google Docs `NamedRange` and `Bookmark` primitives provide a useful substrate for stable MDE object targets?

## Non-goals

This spike does **not** implement:

- Markdown or Pandoc parsing;
- Quarto cross-reference parsing;
- a custom TOC;
- the final object registry;
- analytical-index generation;
- round-trip synchronization;
- production error handling;
- a final Apps Script architecture.

Apps Script is the experimental runtime, not an accepted product architecture.

## Files

- `Code.gs` — bound Google Docs Apps Script prototype.
- `MANUAL_TEST.md` — exact manual test procedure and expected results.

## Installation

1. Create a disposable Google Docs file, for example `MDE Lab — Structural Prototype 001`.
2. Open **Extensions → Apps Script**.
3. Replace the default `Code.gs` content with this repository's `Code.gs`.
4. Save the Apps Script project.
5. Reload the Google Doc.
6. A menu named **MDE Lab** should appear.

The first command execution will require Google authorization.

No Advanced Google service is required by this first spike.

## Menu commands

### Create / reset test fixture

Clears the active tab after confirmation and creates a deterministic document structure containing H1/H2/H3 headings and body paragraphs.

### Apply hierarchical heading numbers

Adds generated prefixes while preserving native Google Docs heading semantics.

Expected example:

```text
1. Introduction
1.1 Context
1.1.1 Italian scenario
1.2 Objectives
2. Methodology
2.1 Validation
```

### Remove generated heading numbers

Removes prefixes matching the spike's expected numbering shape for each heading level.

### Inspect heading structure (log)

Writes native heading levels and current text to the Apps Script execution log.

### Create experimental targets

Creates both a `NamedRange` and a `Bookmark` for:

- `sec-methodology`;
- `par-key-finding`.

The Bookmark IDs are stored in bound-script document properties so the spike can check whether they still resolve after manual edits.

### Inspect experimental targets

Reports whether the NamedRanges and stored Bookmarks still resolve.

## Important limitations

### Number-prefix detection is heuristic

For idempotence, this spike recognizes a leading numeric pattern that matches the current heading level.

Example:

- H1: `1. Title`
- H2: `1.2 Title`
- H3: `1.2.3 Title`

A manually authored heading beginning with the same shape could therefore be mistaken for an MDE-generated number.

That is acceptable for the lab spike, but **not** for production. A production design must use explicit structural metadata rather than guessing from visible text.

### Active tab only

Modern Google Docs can contain multiple tabs. This spike intentionally operates only on the currently active document tab.

### Native TOC is manual in this spike

The test deliberately does not generate a custom TOC. Insert a native Google Docs TOC manually and use the manual test to determine how well it cooperates with generated heading numbers.

## Exit criteria

Spike 001 is successful if:

- heading numbers are generated correctly from native heading hierarchy;
- re-running numbering does not duplicate prefixes;
- heading semantics remain Heading 1–6;
- native TOC entries reflect the numbered headings and remain navigable;
- NamedRanges and Bookmarks survive the manual edit scenarios defined in `MANUAL_TEST.md`;
- the results are strong enough to decide the next architecture experiment.


## Related project material

- [REQ-001 — Scope and Core Requirements](../../docs/REQ/REQ-001%20-%20Scope%20and%20Core%20Requirements.md), especially native-first Google Docs augmentation and focused v0.1 scope.
- [REQ-002 — Referenceable Objects, Cross-References and Generated Indexes](../../docs/REQ/REQ-002%20-%20Referenceable%20Objects%20Cross-References%20and%20Generated%20Indexes.md).
- [RES-003 — Google Docs Native Capability Matrix for v0.1 Augmentation](../../docs/RES/RES-003%20-%20Google%20Docs%20Native%20Capability%20Matrix%20for%20v0.1%20Augmentation.md).
