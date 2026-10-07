# Requirements — Markdown Document Engine

This directory contains the normative requirement set.

Requirements use:
- **Formal requirement** — authoritative, normative, testable.
- **Rationale / design intent** — explanatory, non-normative.
- stable IDs prefixed `REQ-MDE-`.

Current baseline:

The requirement baseline explicitly adopts **Pandoc/Quarto compatibility as a product requirement**: established syntax must be reused where it adequately represents the required semantics, and project-specific syntax is an exception that requires justification.

- [REQ-001 - Scope and Core Requirements.md](REQ-001%20-%20Scope%20and%20Core%20Requirements.md) — scope, Markdown source, heading hierarchy, numbering, Google Docs target, TOC, repeatability, public-safe configuration, extensibility.
- [REQ-002 - Referenceable Objects Cross-References and Generated Indexes.md](REQ-002%20-%20Referenceable%20Objects%20Cross-References%20and%20Generated%20Indexes.md) — stable object identity, paragraph/section/figure/table references, cross-reference integrity, and the v0.1 object-based analytical-index baseline; richer concept-level subject indexing is tracked prospectively in ROADMAP RD-001 and RES-002.

Do not introduce architecture decisions into requirements unless a specific implementation constraint is itself approved as a requirement.

## Current requirement domains

| Prefix | Domain |
|---|---|
| `REQ-MDE-SCP-*` | Project scope and source model |
| `REQ-MDE-STR-*` | Document structure |
| `REQ-MDE-GDOC-*` | Google Docs rendering requirements |
| `REQ-MDE-NFR-*` | Non-functional requirements |
| `REQ-MDE-EXT-*` | Extensibility |
| `REQ-MDE-REF-*` | Referenceable objects, anchors, and cross-references |
| `REQ-MDE-IDX-*` | Generated and analytical indexes |

Further requirement documents are expected for authoring/compilation workflow, editorial formatting, validation/diagnostics, and additional non-functional behavior as the baseline is refined.
