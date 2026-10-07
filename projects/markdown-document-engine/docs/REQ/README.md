# Requirements — Markdown Document Engine

This directory contains the normative requirement set.

Requirements use:
- **Formal requirement** — authoritative, normative, testable.
- **Rationale / design intent** — explanatory, non-normative.
- stable IDs prefixed `REQ-MDE-`.

Current baseline:

The requirement baseline explicitly adopts **Pandoc/Quarto compatibility as a product requirement** on the source side and **native-first Google Docs augmentation** on the renderer side: established syntax and native document capabilities must be reused where they adequately represent the required semantics, and custom behavior is reserved for documented gaps.

- [REQ-001 - Scope and Core Requirements.md](REQ-001%20-%20Scope%20and%20Core%20Requirements.md) — scope, Pandoc/Quarto source compatibility, native-first Google Docs augmentation, focused v0.1 scope, heading hierarchy, numbering, TOC, repeatability, public-safe configuration, extensibility.
- [REQ-002 - Referenceable Objects Cross-References and Generated Indexes.md](REQ-002%20-%20Referenceable%20Objects%20Cross-References%20and%20Generated%20Indexes.md) — stable object identity, paragraph/section/figure/table references, cross-reference integrity, and the v0.1 object-based analytical-index baseline; richer concept-level subject indexing is tracked prospectively in ROADMAP RD-001 and RES-002.
- [REQ-003 - Heading Numbering Workflow.md](REQ-003%20-%20Heading%20Numbering%20Workflow.md) — one-shot numbering, automatic reconciliation ON/OFF, removal behavior, structural-change detection, and English user interface.
- [REQ-004 - Reference Object Interaction and Cross-Reference Insertion.md](REQ-004%20-%20Reference%20Object%20Interaction%20and%20Cross-Reference%20Insertion.md) — context-aware Object Inspector, mandatory unique IDs, captions/labels, reference rendering modes, Object Browser, multi-reference insertion, and lifecycle integrity.

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
| `REQ-MDE-NUM-*` | Interactive and automatic heading-numbering workflow |
| `REQ-MDE-OBJ-*` | Formal referenceable-object lifecycle and identity |
| `REQ-MDE-CAP-*` | Caption and display-label semantics |
| `REQ-MDE-CITE-*` | Cross-reference occurrence and rendering behavior |
| `REQ-MDE-BRW-*` | Object Browser and reference insertion workflow |

Further requirement documents are expected for authoring/compilation workflow, editorial formatting, validation/diagnostics, and additional non-functional behavior as the baseline is refined.
