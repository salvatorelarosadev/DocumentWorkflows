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

The rendered Google document must support a usable table-of-contents workflow based on heading hierarchy.

**Rationale / design intent**

A reliable TOC is part of the immediate structured-document requirement. Native vs generated TOC remains an architectural decision.

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
