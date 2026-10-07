# Research — Markdown Document Engine

Use this directory for capability research, comparisons, API investigations, experiments, and evidence.

External source artefacts and reference material that underpin this research belong under [sources/](sources/). The `sources/` area stores evidence and provenance, not project conclusions or accepted decisions.

Current research:

- [RES-001 - Established Markdown Extensions for Structured Authoring and Cross-References.md](RES-001%20-%20Established%20Markdown%20Extensions%20for%20Structured%20Authoring%20and%20Cross-References.md) — compares Pandoc, Quarto, and MyST syntax and supports ADR-0001.
- [RES-002 - Analytical Indexing Models Syntax and Evolution Paths.md](RES-002%20-%20Analytical%20Indexing%20Models%20Syntax%20and%20Evolution%20Paths.md) — preserves the current knowledge baseline for evolving from object-based indexes to concept/subject indexing, including AsciiDoc, Sphinx/MyST, Quarto core, and the quarto-index extension.
- [RES-003 - Google Docs Native Capability Matrix for v0.1 Augmentation.md](RES-003%20-%20Google%20Docs%20Native%20Capability%20Matrix%20for%20v0.1%20Augmentation.md) — maps the focused v0.1 goals against native Google Docs/editor/API capabilities and identifies where MDE should reuse, augment, or implement.
- [RES-004 - Reference UX and Cross-Reference Models in Established Authoring Systems.md](RES-004%20-%20Reference%20UX%20and%20Cross-Reference%20Models%20in%20Established%20Authoring%20Systems.md) — compares Microsoft Word, Quarto, Sphinx, and LaTeX cleveref to derive MDE's hybrid visual + Markdown reference workflow.

Expected additional topics include:
- Google Docs API / Apps Script heading behavior;
- hierarchical numbering strategies;
- native TOC behavior/limitations;
- bookmarks/internal links;
- Markdown parser/runtime choices;
- Apps Script vs external compiler trade-offs;
- generated analytical-index implementation.

Research is not accepted architecture until reflected in an ADR or equivalent decision.
