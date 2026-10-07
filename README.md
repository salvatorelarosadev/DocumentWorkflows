# DocumentWorkflows

DocumentWorkflows is a public, GPL-3.0 repository for apps, code, configuration, reusable patterns, and documentation that improve document-authoring workflows across Google Workspace, Microsoft Office, Markdown, TeX/LaTeX, Scrivener, and related tools.

A central goal is to make document workflows work well with both humans and AI systems, including LLMs, coding assistants, and autonomous or semi-autonomous agents.

## Design principles

- **Structured content before formatting** — keep semantic structure separate from presentation whenever practical.
- **Portable source formats** — prefer open, inspectable representations for canonical or interchange content.
- **Renderer independence** — avoid coupling reusable authoring logic to one document suite when a portable layer is possible.
- **Traceable engineering** — requirements, proposals, decisions, implementation state, and releases are documented separately.
- **Human + AI collaboration** — repository context must be understandable to both human contributors and software agents.
- **Public-safe by default** — no secrets, credentials, private identifiers, personal paths, or private property URLs may be committed.
- **Evidence before commitment** — research and experiments are kept distinct from accepted architectural decisions.

## Current maturity

**Early development / pre-alpha.**

The first active subproject is the **Markdown Document Engine**, initially focused on using Markdown as a portable authoring structure and rendering well-structured documents into Google Docs.

See [STATUS.md](STATUS.md) for the current repository state.

## Repository map

### Orientation and state
- [STATUS.md](STATUS.md) — current operational snapshot.
- [ROADMAP.md](ROADMAP.md) — intended evolution.
- [CHANGELOG.md](CHANGELOG.md) — released and user-visible changes.
- [Repository organization and engineering manual](docs/REPOSITORY_STANDARD.md) — canonical explanation of the repository model, rationale for files/folders, documentation lifecycle, governance rules, and evolution of the standard itself.

### Collaboration and governance
- [CONTRIBUTING.md](CONTRIBUTING.md)
- [SECURITY.md](SECURITY.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [AGENTS.md](AGENTS.md)
- [.github/](.github/)

### Engineering knowledge
- [REQ](docs/REQ/) — requirements.
- [ARCH](docs/ARCH/) — current architecture/design.
- [ADR](docs/ADR/) — accepted decisions.
- [RES](docs/RES/) — research and evidence.
- [RFC](docs/RFC/) — significant proposals.
- [EP](docs/EP/) — large multi-phase enhancement proposals.
- [RUN](docs/RUN/) — operational runbooks.
- [NOTE](docs/NOTE/) — working notes.

Reusable skeletons live under [templates/documentation/](templates/documentation/).

### Subprojects
- [Markdown Document Engine](projects/markdown-document-engine/) — Markdown-based structured authoring with Google Docs as the first renderer.

## Documentation lifecycle

```text
Need / problem
    ↓
REQ (what must be true)
    ↓
RES (evidence, alternatives, experiments)
    ↓
RFC (significant proposed design)
    ↓
ADR (accepted decision)
    ↓
ARCH (current design)
    ↓
Implementation + tests
    ↓
CHANGELOG / release

For large multi-phase changes: EP
```

RFC and EP are alternative proposal scales, not mandatory sequential stages. Not every change requires every document type.

## Repository structure

```text
DocumentWorkflows/
├── README.md
├── STATUS.md
├── ROADMAP.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── AGENTS.md
├── docs/
│   ├── REQ/ ARCH/ ADR/ RES/ RFC/ EP/ RUN/ NOTE/
├── projects/
│   └── markdown-document-engine/
├── templates/
│   └── documentation/
└── .github/
```

The purpose and boundaries of each file and directory are documented in the [repository organization and engineering manual](docs/REPOSITORY_STANDARD.md).

## License

Unless otherwise stated, repository content is distributed under the GNU General Public License v3.0. See [LICENSE](LICENSE).
