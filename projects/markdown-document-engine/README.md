# Markdown Document Engine

## Purpose

Use Markdown as a portable, model-friendly authoring structure and compile it into well-formed documents with consistent semantic hierarchy and editorial formatting.

Google Docs is the first rendering target because the immediate problem is reliable section structure, hierarchical numbering, and table-of-contents behavior in collaborative Google documents.

The long-term design should avoid unnecessary coupling to Google Docs so that other renderers can be added if justified.

## Concept

```text
Markdown source
      ↓
parsing / structural interpretation
      ↓
normalized document semantics
      ↓
renderer + style configuration
      ↓
Google Docs (first target)
```

The exact internal representation and implementation architecture are not yet accepted decisions.

## Core authoring principle

Source content expresses semantic hierarchy, not manual presentation numbering.

```markdown
# Introduction
## Context
### Italian scenario
```

A renderer may produce:

```text
1. Introduction
1.1 Context
1.1.1 Italian scenario
```

Numeric prefixes belong to the rendering layer, not the Markdown source.

## Current status

Pre-alpha requirements and architecture definition. See [STATUS.md](STATUS.md).

## Documentation index

- [Requirements](docs/REQ/)
- [Architecture](docs/ARCH/)
- [Architecture decisions](docs/ADR/)
- [Research](docs/RES/)
- [RFCs](docs/RFC/)
- [Enhancement proposals](docs/EP/)
- [Runbooks](docs/RUN/)
- [Working notes](docs/NOTE/)
- [Roadmap](ROADMAP.md)
- [Changelog](CHANGELOG.md)

## Source layout

```text
markdown-document-engine/
├── README.md
├── STATUS.md
├── ROADMAP.md
├── CHANGELOG.md
├── VERSION
├── docs/
├── src/
├── tests/
├── config/
├── examples/
├── templates/
├── scripts/
└── lab/
```

Implementation code has not yet been promoted into `src/`; early experiments belong in `lab/`.
