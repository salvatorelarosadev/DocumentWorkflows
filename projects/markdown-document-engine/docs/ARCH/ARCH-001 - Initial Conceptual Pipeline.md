# ARCH-001 — Initial Conceptual Pipeline

**Status:** Draft conceptual architecture  
**Version:** v0.1

## Purpose
Define the minimum conceptual separation needed to reason about the engine without prematurely selecting a complete stack.

## Logical pipeline

```text
Markdown input
    ↓
Parse / structural interpretation
    ↓
Normalized semantic representation
    ↓
Validation / diagnostics
    ↓
Rendering profile + renderer
    ↓
Google Docs document
```

## Responsibilities

### Source layer
Markdown content and semantic authoring constructs. No renderer-specific numeric heading prefixes.

### Parse / structural interpretation
Recognizes supported constructs, preserving order and hierarchy.

### Normalized semantic representation
Represents document structure in a renderer-neutral logical form.

This is currently a conceptual responsibility, not an accepted JSON schema or mandatory implementation component. RFC-001 examines whether a formal IR is justified.

### Validation / diagnostics
Detects structural problems such as invalid heading jumps or unsupported constructs without silently inventing meaning.

### Rendering profile
Defines presentation rules such as hierarchical numbering, typography, spacing, and renderer-specific styles.

### Google Docs renderer
Creates or updates native Google Docs document structure using supported Docs/Apps Script capabilities.

## Open architecture questions
- runtime/language;
- Apps Script-only vs hybrid execution;
- Markdown parser;
- formal IR vs direct structured pipeline;
- create vs update/synchronization model;
- generated vs native TOC;
- bookmark/link strategy;
- renderer configuration format;
- custom directive syntax.

No open item is accepted unless supported by an ADR.
