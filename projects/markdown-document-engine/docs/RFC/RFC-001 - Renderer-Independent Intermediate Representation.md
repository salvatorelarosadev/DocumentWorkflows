# RFC-001 — Renderer-Independent Intermediate Representation

**Status:** Draft  
**Decision:** Not accepted

## Summary
Consider introducing a small renderer-independent intermediate representation (IR) between Markdown parsing and target-specific rendering.

## Motivation
Direct Markdown-to-Google-Docs calls may make the first prototype fast but can entangle source semantics, validation, numbering, style rules, and renderer operations.

## Proposed concept

```text
Markdown
   ↓
Parser
   ↓
Document IR
   ├── heading(level, text, metadata)
   ├── paragraph(...)
   ├── list(...)
   ├── table(...)
   └── semantic directive(...)
   ↓
Renderer
```

The RFC does not prescribe JSON, YAML, classes, or another representation.

## Potential benefits
- deterministic parser tests independent of Google APIs;
- renderer-independent structural validation;
- reusable numbering logic;
- cleaner future renderers;
- easier diagnostics and fixtures.

## Potential costs
- abstraction before proven need;
- schema/versioning burden;
- risk of over-general design;
- more code than a direct prototype.

## Alternatives
1. Direct Markdown parser → Google Docs renderer.
2. Minimal transient internal objects without formal/versioned IR.
3. Formal versioned renderer-neutral IR.

## Decision questions
- Which v0.1 features actually need renderer-neutral semantics?
- Can a transient model provide most benefits?
- What tests materially improve with an IR?
- Would future renderers reuse enough semantics to justify it now?

## Acceptance path
Use the first prototype and research as evidence. If accepted, record the choice in an ADR.
