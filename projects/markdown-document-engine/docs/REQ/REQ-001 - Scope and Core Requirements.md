# REQ-001 — Scope and Core Requirements

**Status:** Draft  
**Baseline:** v0.1-draft  
**Project:** Markdown Document Engine

## REQ-MDE-SCP-001 — Markdown source

**Formal requirement**

The system must accept Markdown as the canonical source or interchange syntax for the initial document-authoring workflow.

**Rationale / design intent**

Markdown is portable, inspectable, version-control friendly, and easy for humans and language models to generate without embedding suite-specific presentation state.

**Source / origin**

Initial project discussion.

## REQ-MDE-SCP-002 — Separation of semantics and rendering

**Formal requirement**

The system must keep document semantics and hierarchy conceptually separate from renderer-specific formatting.

**Rationale / design intent**

The source should describe what content is, while renderers decide how that structure is presented.

## REQ-MDE-SCP-003 — Established Markdown ecosystem compatibility

**Formal requirement**

The system must use established Pandoc Markdown conventions as the baseline for extended Markdown syntax and must use established Quarto conventions for typed document objects and cross-references when those conventions adequately represent the required semantics.

**Rationale / design intent**

The project is intentionally non-autarchic. It should build on mature, widely used document-authoring ecosystems rather than create a proprietary Markdown dialect for capabilities that Pandoc or Quarto already express well. This reduces learning cost, improves interoperability, makes source documents more recognizable to developers and authors, and preserves compatibility with existing tooling and future renderers.

**Source / origin**

Project requirement refinement following evaluation of Pandoc, Quarto, and MyST; see RES-001 and ADR-0001.

**Acceptance criteria**

- [ ] Stable IDs and generic attributes use Pandoc-compatible syntax where applicable.
- [ ] Standard typed objects such as sections, figures, tables, equations, and listings use Quarto-compatible identifier and cross-reference conventions where applicable.
- [ ] A source document using only supported baseline features does not require proprietary syntax when an equivalent Pandoc/Quarto notation exists.
- [ ] Project documentation clearly identifies the supported Pandoc/Quarto profile and any deliberate deviations.

## REQ-MDE-SCP-004 — Custom syntax as an exception

**Formal requirement**

The project must introduce custom Markdown syntax only when the required semantic capability cannot be represented adequately by an established Pandoc or Quarto convention, or when a documented compatibility, usability, or implementation constraint justifies a deviation.

**Rationale / design intent**

Custom syntax creates long-term parser, migration, interoperability, documentation, and contributor costs. Extensions should therefore fill genuine gaps rather than duplicate established ecosystem behavior.

**Source / origin**

Project requirement refinement; see ADR-0001.

**Acceptance criteria**

- [ ] Every custom syntax extension documents the gap it addresses.
- [ ] Relevant Pandoc/Quarto alternatives are considered before a custom notation is accepted.
- [ ] Significant custom syntax additions are reviewed through RFC/ADR as appropriate.
- [ ] Custom extensions avoid unnecessary ambiguity or collision with established Pandoc/Quarto syntax.
- [ ] If an upstream ecosystem later standardizes an equivalent capability, migration or convergence is considered.

## REQ-MDE-SCP-005 — Native-first Google Docs augmentation

**Formal requirement**

For the Google Docs renderer, the system must reuse adequate native Google Docs semantic structures, navigation primitives, and document behaviors instead of reproducing them with custom generated content.

Custom renderer logic must be introduced only when a native Google Docs capability is absent, cannot satisfy the required behavior, or cannot be controlled reliably through supported interfaces.

**Rationale / design intent**

The project exists to augment Google Docs, not to replace it. Native editor behavior should remain available wherever it already solves the problem adequately, reducing code, maintenance burden, rendering divergence, and user surprise.

**Source / origin**

Project requirement refinement following Google Docs capability review; see RES-003.

**Acceptance criteria**

- [ ] Markdown headings render as native Google Docs heading semantics.
- [ ] A native Google Docs TOC is preferred when it can satisfy the required workflow.
- [ ] Native heading links, bookmarks, named ranges, or equivalent supported primitives are reused where suitable for internal navigation and object targeting.
- [ ] Custom behavior is limited to documented capability gaps or reliability constraints.
- [ ] The renderer does not create parallel proprietary structures merely to reproduce an adequate native Google Docs feature.

## REQ-MDE-SCP-006 — Focused v0.1 augmentation scope

**Formal requirement**

The initial Google Docs augmentation scope must focus on the document-structure capabilities required for:

1. reliable heading hierarchy as the basis of document structure;
2. a usable table-of-contents workflow;
3. robust hierarchical heading numbering comparable in behavior to structured Word/LaTeX-style numbering;
4. stable internal targets and navigation required by references and generated indexes;
5. generated object-based analytical indexes as defined in REQ-002.

Google Docs capability gaps outside this scope must not be implemented in v0.1 unless they are a direct prerequisite for one of these target capabilities.

**Rationale / design intent**

The first release should solve the project's concrete structural-document problems rather than evolve into a general-purpose replacement for Google Docs or Microsoft Word.

**Source / origin**

Project scope refinement following Google Docs native-capability review.

**Acceptance criteria**

- [ ] v0.1 planning explicitly maps work to one of the five target capabilities above or to a documented prerequisite.
- [ ] Native Google Docs features outside the target scope are not reimplemented merely because limitations exist.
- [ ] Deferred capability gaps remain visible as research or roadmap items only when strategically relevant.

## REQ-MDE-STR-001 — Hierarchical headings

**Formal requirement**

The initial system must support Markdown heading levels H1 through H6 and preserve their hierarchy in the rendered document.

**Rationale / design intent**

The immediate use case requires reliable chapters, sections, and nested subsections.

## REQ-MDE-STR-002 — Generated section numbering

**Formal requirement**

Canonical Markdown source must not require manually authored numeric section prefixes. When enabled by the rendering profile, hierarchical numbering must be generated from heading structure.

**Rationale / design intent**

Manual numbering becomes inconsistent when sections are inserted, deleted, or reordered.

## REQ-MDE-GDOC-001 — Google Docs first renderer

**Formal requirement**

The first implemented renderer must target Google Docs.

**Rationale / design intent**

Google Docs is the immediate collaborative authoring environment in which reliable hierarchy and numbering are required.

## REQ-MDE-GDOC-002 — Native heading semantics

**Formal requirement**

The Google Docs renderer must map source heading hierarchy to native Google Docs heading styles or an equivalent native semantic structure usable by document navigation and TOC features.

**Rationale / design intent**

A visually styled paragraph alone is not sufficient; output must retain editor-recognizable structure.

## REQ-MDE-GDOC-003 — Hierarchical numbering output

**Formal requirement**

When hierarchical numbering is enabled, the Google Docs renderer must produce consistent numbering derived from heading ancestry, for example `1`, `1.1`, `1.1.1`, without requiring numbers in source Markdown.

**Rationale / design intent**

This provides Word/LaTeX-like numbering while keeping source independent from presentation numbering.

## REQ-MDE-GDOC-004 — Table of contents workflow

**Formal requirement**

The rendered Google document must support a usable table-of-contents workflow based on native Google Docs heading hierarchy.

The renderer must prefer the native Google Docs table of contents when it can satisfy the required navigation, refresh, and operational workflow. A custom-generated TOC may be used only when the native mechanism cannot satisfy a documented requirement or cannot be controlled reliably through supported interfaces.

**Rationale / design intent**

Google Docs already provides heading-based TOC generation and navigation. MDE should augment this workflow only where automation or reliability gaps require it rather than maintaining a competing TOC model.

**Source / origin**

Project requirement refinement following Google Docs capability review; see RES-003.

**Acceptance criteria**

- [ ] TOC entries derive from native heading semantics.
- [ ] Native Google Docs TOC behavior is the default target.
- [ ] Any custom TOC implementation documents the specific native limitation that makes it necessary.
- [ ] Recompilation does not create competing or duplicate TOCs.

## REQ-MDE-NFR-001 — Repeatability

**Formal requirement**

Repeated execution of the same compilation or synchronization operation against unchanged source/configuration should not accumulate duplicate numbering, duplicate structural markers, or progressively corrupt formatting.

**Rationale / design intent**

The engine must be safe to re-run during iterative editing.

## REQ-MDE-NFR-002 — Public-safe configuration

**Formal requirement**

The project must not require secrets, private account identifiers, private document URLs, or credential material to be committed to the repository.

**Rationale / design intent**

The repository is public and intended to support external contributors.

## REQ-MDE-EXT-001 — Extensibility

**Formal requirement**

The architecture should permit future renderer targets and semantic extensions without requiring canonical Markdown content to be rewritten around Google Docs implementation details.

**Rationale / design intent**

Google Docs is the first renderer, not necessarily the final boundary.

## Open requirement areas

Still to refine:
- lists;
- links/bookmarks;
- emphasis/inline code;
- tables;
- quotations/callouts;
- figures/captions;
- page/section breaks;
- footnotes/endnotes;
- custom semantic directives;
- style-profile configuration;
- diagnostics/structural validation;
- round-trip editing expectations.
