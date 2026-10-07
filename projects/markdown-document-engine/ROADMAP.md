# Markdown Document Engine — Roadmap

## P0 — Requirements and constraints
- Define source semantics.
- Define supported Markdown subset.
- Define Google Docs rendering requirements.
- Define non-functional requirements and security constraints.

## P1 — Structural prototype
- Parse headings.
- Map heading levels to native Google Docs heading styles.
- Generate hierarchical numbering.
- Ensure repeated execution is deterministic/idempotent.
- Validate a practical TOC workflow.

## P2 — Editorial formatting
- Configurable typography and spacing.
- Lists, links, emphasis, tables, quotations.
- Page/section behaviors where supported.
- Captions and semantic directives where required.

## P3 — Compiler architecture
Subject to RFC/ADR decisions:
- normalized intermediate document model;
- renderer interface;
- style profiles;
- validation and diagnostics;
- CLI/service boundary if useful.

## P4 — Additional renderers
Potential targets include Microsoft Word, LaTeX, HTML/PDF, and other collaborative document systems.
