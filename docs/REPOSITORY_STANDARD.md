# Repository Organization and Engineering Standard

**Status:** Draft standard under active validation  
**Standard version:** 0.4.0-draft  
**Last updated:** 2026-10-07  
**Scope:** DocumentWorkflows and future repositories that adopt this model

> This document is the canonical manual for how a repository using this standard is organized, documented, operated, and evolved.
>
> The version above refers to the **repository standard itself**, not to any application or subproject contained in the repository.

---

## 1. Purpose

This standard defines a reusable repository model for software projects developed through collaboration between humans, AI assistants, coding agents, and automation.

Its goal is not to maximize the number of documents. Its goal is to make it immediately clear:

- what the repository is;
- what is currently happening;
- what the system is required to do;
- what has been researched;
- what is merely proposed;
- what has actually been decided;
- what the current architecture is;
- what code is maintained versus experimental;
- what work remains;
- how releases and changes are tracked;
- how a new human or AI contributor should orient itself.

The standard deliberately separates concepts that often become mixed together in growing repositories:

- stable project identity vs volatile project state;
- requirements vs implementation choices;
- evidence vs decisions;
- proposals vs accepted architecture;
- strategic direction vs atomic task tracking;
- code vs experiments;
- repository-wide concerns vs subproject-specific concerns;
- release history vs engineering history;
- product/version history vs evolution of this repository standard.

The desired outcome is a repository that can be understood without reconstructing its state from chat history, personal memory, or hundreds of commits.

---

## 2. Core design principles

### 2.1 README is the front door, not the warehouse

`README.md` is the canonical entry point.

It should provide enough information to understand the repository at a glance and enough navigation to find everything else.

It should not become the dumping ground for every requirement, decision, open task, architectural detail, or release note.

### 2.2 Every information type has one primary home

The repository should minimize duplication.

For example:

- current operational state belongs in `STATUS.md`;
- detailed requirements belong in `docs/REQ/`;
- accepted architecture decisions belong in `docs/ADR/`;
- significant proposals belong in `docs/RFC/` or `docs/EP/`;
- release-relevant history belongs in `CHANGELOG.md`;
- atomic work belongs in GitHub Issues.

Other documents may summarize or link to that information, but they should not become competing sources of truth.

### 2.3 Proposals are not decisions

An RFC, EP, research note, experiment, or discussion can be persuasive without being binding.

Accepted decisions must be explicitly recorded.

### 2.4 Research is not architecture

Research may identify attractive technologies or approaches.

Architecture documents must distinguish clearly between:

- accepted design;
- candidate solutions;
- unresolved alternatives.

### 2.5 Requirements are not implementation plans

Requirements describe what the system must, should, or may do.

They should not prescribe a technology unless that technology is itself an approved constraint.

### 2.6 Stable IDs preserve engineering memory

Requirement and decision identifiers should remain stable over time.

Documents may be edited, split, superseded, or deprecated without silently recycling IDs.

### 2.7 The repository is readable by both humans and agents

A well-organized repository should give a new AI agent the same orientation advantages it gives a new human contributor.

The repository therefore includes explicit context-loading and documentation semantics for agents.

### 2.8 Public repositories are assumed publishable at every commit

Secrets, private URLs, credentials, personal identifiers, private filesystem paths, and sensitive data must never be treated as acceptable temporary repository content.

---

## 3. Repository anatomy

A repository using this standard is organized into five conceptual layers:

1. **Orientation and lifecycle**
2. **Collaboration and governance**
3. **Engineering knowledge**
4. **Implementation and operational assets**
5. **Subprojects and recursive structure**

A typical root layout is:

```text
repository/
├── README.md
├── STATUS.md
├── ROADMAP.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── AGENTS.md
├── LICENSE
├── .gitignore
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── CODEOWNERS
│   └── workflows/
│
├── docs/
│   ├── README.md
│   ├── REQ/
│   ├── ARCH/
│   ├── ADR/
│   ├── RES/
│   ├── RFC/
│   ├── EP/
│   ├── RUN/
│   └── NOTE/
│
├── projects/
│   └── <subproject>/
│
└── templates/
    └── documentation/
```

Not every repository needs every directory immediately, but the structure may be scaffolded in advance when consistency across repositories is a design goal.

---

# Part I — Orientation and lifecycle files

## 4. README.md

### Purpose

`README.md` is the durable entry point to the repository.

A reader should be able to answer the following without opening another file:

- What is this repository?
- Why does it exist?
- What are its main design principles?
- What is its high-level maturity?
- What are its major components or subprojects?
- Where do I go for current status, requirements, architecture, contribution rules, and other documentation?

### Recommended contents

A root README should normally contain:

1. repository purpose;
2. concise scope;
3. core design principles;
4. high-level maturity;
5. repository/documentation index;
6. major subprojects;
7. high-level repository structure;
8. license reference.

### What README should not contain

README should not become:

- the detailed backlog;
- the complete requirement specification;
- the complete architecture manual;
- a list of every commit;
- the operational status log;
- an RFC or design debate;
- the release changelog.

### Change frequency

Low.

Frequent README changes are often a signal that volatile state is being stored in the wrong place.

---

## 5. STATUS.md

### Purpose

`STATUS.md` is the operational snapshot of the repository or project **now**.

Its purpose is to eliminate the need to reconstruct current state from Git history, issues, chat conversations, or memory.

### Recommended sections

- Last updated
- Current version, if relevant
- Maturity / phase
- Current focus
- Completed
- In progress
- Next actions
- Open decisions
- Blockers
- Maintenance rule

### What STATUS is not

STATUS is not:

- the task database;
- the full roadmap;
- the requirements baseline;
- the changelog;
- the issue tracker.

Atomic work should migrate to GitHub Issues as the project matures.

STATUS summarizes the work state.

### Change frequency

High.

It should change whenever the operational picture materially changes.

---

## 6. ROADMAP.md

### Purpose

`ROADMAP.md` describes intended future direction.

It answers:

> Where are we trying to go?

rather than:

> What exactly is being worked on today?

### Suitable content

- major phases;
- strategic capability evolution;
- intended future integrations;
- broad maturity progression;
- directional priorities.

### Unsuitable content

- detailed task lists;
- issue-level assignments;
- daily status;
- guaranteed delivery dates unless the project explicitly manages commitments that way.

### Roadmap directions

Important prospective ideas should be tracked as explicit **Roadmap Directions** rather than being left only in notes, open architecture questions, or chat history.

A roadmap direction should normally contain:

- a stable direction identifier when useful, for example `RD-001`;
- objective / target end state;
- why the direction matters;
- current maturity;
- links to the current requirement baseline;
- links to relevant RES knowledge baselines;
- the next decision trigger;
- the expected promotion path into RFC or EP when design work becomes timely.

Recommended maturity states:

- **Committed** — the capability is part of the intended delivery path, even if implementation details remain open;
- **Candidate** — the direction is intentionally being preserved and is likely to be pursued, but requires validation before commitment;
- **Exploratory** — strategically interesting and worth retaining, but not yet sufficiently validated.

Roadmap directions are not requirements and are not accepted architecture.

They answer:

> Where might or should the project evolve next, and what would cause us to make that direction concrete?

When a direction becomes ready for design:

- use an **RFC** if the main need is to choose a significant design or syntax;
- use an **EP** if the direction has become a large, multi-phase program with several dependent decisions.

### Change frequency

Medium to low.

---

## 7. CHANGELOG.md

### Purpose

`CHANGELOG.md` records notable user-visible, externally meaningful, or release-relevant changes.

### It should contain

- added capabilities;
- changed behavior;
- deprecated behavior;
- removed behavior;
- fixed externally meaningful defects;
- release notes.

### It should not contain

- every commit;
- internal refactors with no meaningful external impact;
- repository methodology evolution;
- a copy of STATUS history.

### Change frequency

Per meaningful change or release.

### Standard evolution is separate

Changes to the **repository standard itself** are recorded inside this manual under **Standard evolution**, not mixed with product release history.

---

# Part II — Collaboration and governance

## 8. CONTRIBUTING.md

### Purpose

Defines how humans contribute to the repository.

It should explain:

- how to orient before contributing;
- branch and pull-request expectations;
- documentation responsibilities;
- requirement discipline;
- when RFC/EP/ADR documents are expected;
- test expectations;
- security/privacy expectations.

### Boundary

`CONTRIBUTING.md` describes **how to contribute**.

It should not become the architecture specification or product requirements.

---

## 9. SECURITY.md

### Purpose

Defines security reporting and public-safe repository rules.

For public repositories, it should explicitly state that secrets and private identifiers must never be committed.

### Typical contents

- vulnerability reporting;
- secret-handling rules;
- credential examples;
- accidental exposure procedure;
- private reporting guidance.

### Important rule

`.gitignore` is only a safety net.

Security must not rely solely on ignored filenames.

---

## 10. CODE_OF_CONDUCT.md

### Purpose

Defines expected collaboration behavior.

It is primarily a community-governance artifact rather than an engineering artifact.

### Change frequency

Very low.

---

## 11. AGENTS.md

### Purpose

`AGENTS.md` provides vendor-neutral instructions for AI assistants, coding agents, IDE agents, and automated contributors.

This file exists because an AI tool entering a repository needs an explicit contract for:

- what to read first;
- which documents are authoritative;
- what each document class means;
- what may and may not be changed;
- how project state should be updated;
- how secrets and private data must be handled.

### Recommended context-loading order

1. root `README.md`;
2. root `STATUS.md`;
3. relevant subproject `README.md`;
4. relevant subproject `STATUS.md`;
5. applicable REQ documents;
6. accepted ADRs;
7. current ARCH documents;
8. relevant RFCs and EPs;
9. tests and current code.

### Vendor-specific instructions

Files such as:

- `CLAUDE.md`;
- `.github/copilot-instructions.md`;
- IDE-specific rules;

may exist when useful.

They should reference or extend `AGENTS.md`, not silently fork the repository's core rules.

---

## 12. .github/

### Purpose

Contains GitHub-specific repository mechanics.

Typical contents:

```text
.github/
├── ISSUE_TEMPLATE/
├── PULL_REQUEST_TEMPLATE.md
├── CODEOWNERS
└── workflows/
```

### ISSUE_TEMPLATE/

Provides structured entry points for bugs, features, documentation issues, proposals, or other work types.

### PULL_REQUEST_TEMPLATE.md

Ensures pull requests consistently describe:

- intent;
- change type;
- validation;
- documentation impact;
- security/privacy review.

### CODEOWNERS

Maps repository paths to responsible reviewers when a contributor community becomes large enough to justify it.

An empty or commented scaffold is acceptable before such ownership exists.

### workflows/

Contains GitHub Actions and automation.

It should not contain product logic that belongs in `src/`.

---

## 13. .gitignore

### Purpose

Prevents local, generated, or sensitive artifacts from being accidentally committed.

Common categories include:

- OS files;
- editor state;
- dependency directories;
- build outputs;
- local environments;
- logs;
- secret-bearing config;
- credentials;
- local tool identities.

### Boundary

`.gitignore` is not documentation and is not a complete security policy.

---

# Part III — Engineering knowledge

## 14. docs/

### Purpose

`docs/` contains durable engineering knowledge.

At repository root, it contains concerns that apply to the repository as a whole.

Project-specific engineering knowledge belongs under the corresponding subproject.

The standard document classes are:

| Code | Meaning |
|---|---|
| REQ | Requirements |
| ARCH | Current architecture/design |
| ADR | Accepted decisions |
| RES | Research and evidence |
| RFC | Significant proposals |
| EP | Large multi-phase enhancement proposals |
| RUN | Operational runbooks |
| NOTE | Working notes |

The distinction between these classes is deliberate.

---

## 15. REQ — Requirements

### Question answered

> What must, should, or may the system do?

### Core rule

Requirements are normative.

Each individual requirement should contain:

- stable ID;
- title;
- **Formal requirement**;
- **Rationale / design intent**;
- source/origin where known;
- optional acceptance criteria;
- optional notes/examples;
- lifecycle status where relevant.

### Formal requirement

The formal requirement is authoritative.

It should prefer testable language such as:

- must;
- should;
- may.

### Rationale / design intent

The rationale is non-normative.

It explains:

- why the requirement exists;
- which principle it protects;
- what failure mode it prevents;
- how future implementers should understand its intent.

If formal text and rationale appear to conflict, the formal requirement governs.

### Stable IDs

Requirement IDs are not renumbered because sections are reordered.

If a requirement is retired:

- mark it Deprecated; or
- mark it Superseded and link the replacement.

Do not silently reuse its ID.

### What REQ should not contain

- candidate libraries presented as facts;
- unresolved technology preferences;
- architecture that has not been accepted;
- implementation tasks.

---

## 16. RES — Research and evidence

### Question answered

> What have we learned?

RES contains:

- technology comparisons;
- API capability investigations;
- experiments;
- benchmarks;
- external evidence;
- source reviews;
- performance measurements;
- uncertainty analysis.

### Normative status

RES is non-normative.

A strong research conclusion can justify a decision, but does not become the decision automatically.

### Typical relationship

```text
REQ
 ↓
RES
 ↓
RFC / EP / ADR
```

### RES/sources/ — external evidence repository

A RES area may contain a `sources/` subdirectory for external artefacts that materially support project research.

Its role is to preserve the **evidence base** separately from the project's own analysis.

Typical material includes:

- official documentation snapshots;
- standards and specifications;
- public papers and reports;
- relevant community discussions;
- vendor or project documentation;
- reference implementations;
- benchmark inputs;
- external examples.

The conceptual separation is:

```text
docs/RES/
├── RES-001 - <project research and conclusions>.md
├── RES-002 - <project research and conclusions>.md
└── sources/
    ├── Reddit/
    ├── IDEO/
    ├── IBM/
    ├── Pandoc/
    └── <other source identity>/
```

A file stored under `RES/sources/` is evidence, not automatically a project conclusion, requirement, proposal, architectural choice, or accepted decision.

Research documents should interpret the evidence and retain enough provenance to trace important findings back to their external sources.

#### Organization by source identity

The preferred convention is:

```text
RES/sources/<source-or-organization>/
```

Examples include `Reddit/`, `Facebook/`, `IDEO/`, `IBM/`, `Pandoc/`, or `Quarto/`.

Do not normally insert generic intermediate layers such as `community/`, `vendor/`, or `official/`. Whether an artefact is official documentation, a community discussion, a standard, or another evidence type should be captured by provenance metadata rather than by an extra directory level.

Create a source subdirectory only when real material exists for that source.

#### Provenance

Where practical, external sources should preserve:

- title;
- author / organization;
- original URL or publication location;
- publication or retrieval date;
- version/release where relevant;
- redistribution/license status where known;
- why the source matters to the project.

When the original artefact cannot carry this metadata, use a companion Markdown file.

#### Public-repository rule

Only redistribute external material when doing so is permitted.

If copyright, license, access terms, confidentiality, or redistribution rights are unclear, do not copy the source artefact into a public repository. Store a bibliographic/reference note, public URL, provenance metadata, and project analysis instead.

---

## 17. RFC — Request for Comment

### Question answered

> What significant change or design are we proposing?

An RFC is appropriate when a proposal deserves durable reasoning before acceptance.

### Typical contents

- problem;
- motivation;
- goals;
- non-goals;
- proposal;
- alternatives;
- compatibility;
- security/privacy;
- trade-offs;
- open questions;
- decision path.

### Normative status

An RFC is a proposal.

Even an RFC marked Accepted does not automatically replace the value of an ADR for an architectural choice; the repository should preserve a concise decision record when the choice becomes binding.

---

## 18. EP — Enhancement Proposal

### Question answered

> How should we manage a large, multi-phase evolution?

EP is inspired by KEP-style lifecycle governance.

Use EP when an RFC is too small a container for the change because the proposal includes:

- multiple phases;
- several dependent design decisions;
- rollout;
- compatibility strategy;
- migration;
- testing gates;
- operational impacts;
- graduation criteria;
- staged maturity.

### RFC vs EP

They are primarily alternative proposal scales.

They are **not** a mandatory sequence.

```text
small/medium significant design → RFC
large multi-phase evolution      → EP
```

An EP may reference one or more RFCs for contained design questions.

---

## 19. ADR — Architecture Decision Record

### Question answered

> What did we decide, and why?

ADR captures accepted architectural or significant engineering choices.

### Typical contents

- status;
- date;
- context;
- decision;
- alternatives considered;
- rationale;
- consequences;
- related REQ/RES/RFC/EP/ARCH material;
- supersession links.

### Historical rule

ADRs preserve engineering memory.

A superseded ADR should remain in the repository.

Do not rewrite history so that it appears the old decision never existed.

---

## 20. ARCH — Architecture

### Question answered

> What is the current accepted design?

ARCH documents describe:

- components;
- interfaces;
- boundaries;
- flows;
- data structures;
- control paths;
- deployment structure;
- interaction models;
- architectural constraints.

### Relationship to ADR

ADR explains **why a decision was made**.

ARCH explains **what the resulting system currently looks like**.

### Candidate technologies

Candidate solutions may appear in ARCH documents only when clearly labeled as candidates.

An unresolved option must not be written as though it were an accepted system property.

---

## 21. RUN — Runbooks

### Question answered

> How do we execute this operational procedure safely and repeatably?

RUN documents cover:

- setup;
- deployment;
- migration;
- maintenance;
- release;
- recovery;
- troubleshooting;
- rollback.

### Typical contents

- purpose;
- prerequisites;
- procedure;
- validation;
- failure handling;
- rollback/recovery;
- security notes.

---

## 22. NOTE — Working notes

### Question answered

> Where do useful but not-yet-classified thoughts go?

NOTE is intentionally weakly normative.

Use it for:

- working sessions;
- open questions;
- early sketches;
- temporary analysis;
- partially structured material.

### Promotion

A note can later become:

- REQ;
- RES;
- RFC;
- EP;
- ADR;
- ARCH;
- RUN.

A NOTE must not silently become authoritative merely because it has existed for a long time.

---

# Part IV — Documentation lifecycle

## 23. Default engineering flow

A common flow is:

```text
Need / problem
      ↓
REQ
      ↓
RES
      ↓
RFC
      ↓
ADR
      ↓
ARCH
      ↓
Implementation + tests
      ↓
CHANGELOG / release
```

This is a model, not bureaucracy.

Not every change requires every stage.

For example, a small bug may be:

```text
Issue → fix → test → PR
```

A large cross-cutting initiative may be:

```text
REQ
 ↓
RES
 ↓
EP
 ├── RFC-A
 ├── RFC-B
 └── RFC-C
 ↓
ADR(s)
 ↓
ARCH
 ↓
phased implementation
```

The purpose of the classification is to improve clarity, not to force ceremonial documents.

---

## 24. When to create which document

Use this decision guide:

| Situation | Primary artifact |
|---|---|
| The system needs a new behavior | REQ |
| We need evidence before choosing | RES |
| We want to propose a significant design | RFC |
| We are coordinating a large multi-phase evolution | EP |
| We made an important binding choice | ADR |
| We need to describe the current system design | ARCH |
| We need an operational procedure | RUN |
| We are thinking/exploring but not ready to classify | NOTE |
| We need to track a concrete actionable task | GitHub Issue |
| We are proposing repository changes | Pull Request |
| We released externally meaningful changes | CHANGELOG |

---

# Part V — Work tracking and Git workflow

## 25. GitHub Issues

Issues are the preferred place for atomic work once the project reaches sufficient maturity.

Examples:

- bugs;
- concrete feature tasks;
- documentation tasks;
- implementation work;
- test gaps;
- refactoring tasks;
- tracked follow-ups.

### What Issues should not replace

Issues should not become the only permanent record of:

- architectural decisions;
- requirements;
- major proposals;
- research findings.

Durable knowledge belongs in versioned repository documents.

---

## 26. Pull Requests

A pull request is the review boundary for a proposed repository change.

Non-trivial PRs should explain:

- what is changing;
- why;
- how it was validated;
- which requirement/decision it relates to;
- whether STATUS changes;
- whether CHANGELOG changes;
- whether security/privacy was considered.

Whenever practical, use the repository's own standard on itself.

Repository-governance changes should therefore also flow through a branch and PR.

---

## 27. Commits

Commits are implementation history.

They are valuable provenance, but they should not be the only place where project intent is documented.

Commit messages should explain coherent changes rather than serve as a substitute for ADR, RFC, or STATUS.

---

## 28. Branches

Use focused branches for non-trivial changes.

A branch should normally correspond to one coherent purpose.

Examples:

```text
feature/markdown-heading-parser
docs/repository-standard-rationale
fix/google-docs-numbering
research/apps-script-toc
```

Avoid long-lived branches that become alternative undocumented project realities.

---

# Part VI — Source, tests, experiments, and operational folders

## 29. src/

### Purpose

Contains canonical maintained implementation code.

Code belongs in `src/` when it is intended to become part of the maintained product/system.

### Boundary

Do not use `src/` for:

- disposable experiments;
- one-off maintenance scripts;
- generated artifacts.

---

## 30. tests/

### Purpose

Contains automated tests, fixtures, golden files, evaluation cases, and related test assets.

Tests should map back to requirements or expected behavior whenever practical.

For transformation systems, deterministic fixture-based testing is strongly encouraged.

---

## 31. lab/

### Purpose

Contains prototypes, spikes, and disposable exploratory code.

This gives experiments a legitimate home without prematurely treating them as product code.

### Promotion rule

Code should move from `lab/` to `src/` only when:

- its intended behavior is understood;
- it belongs to the maintained system;
- relevant requirements/design are sufficiently clear;
- tests are added or planned appropriately.

---

## 32. scripts/

### Purpose

Contains operational utilities such as:

- setup;
- migration;
- repository maintenance;
- build helpers;
- release helpers;
- one-off automation.

### Boundary

Reusable product logic belongs in `src/`, not `scripts/`.

---

## 33. config/

### Purpose

Contains public-safe configuration, schemas, and default configuration.

### Security rule

Never store real credentials or private environment identifiers.

Where configuration examples are useful:

```text
config.example.yaml
.env.example
settings.example.json
```

should contain sanitized placeholder values.

---

## 34. examples/

### Purpose

Contains sanitized examples demonstrating intended use.

Examples are especially useful for:

- public contributors;
- documentation;
- test fixtures;
- agent understanding.

Examples must never contain real private IDs, account information, secret URLs, or credentials.

---

## 35. templates/

### Purpose

Contains reusable project templates.

At repository root, `templates/documentation/` contains the canonical skeletons for this repository standard.

Subprojects may have their own templates for:

- configuration;
- documents;
- renderer profiles;
- prompts;
- code generation;
- project-specific assets.

---

## 36. assets/

Optional.

Use for reusable static non-code resources that do not fit more specific locations.

Avoid turning `assets/` into an unclassified dumping directory.

---

## 37. logs/

Optional and usually local-only.

Committed logs should be rare and carefully sanitized.

Runtime logs containing identifiers, filesystem paths, tokens, or private data should not be committed.

---

## 38. reports/

Optional.

Use for generated or curated reports that are meaningful project artifacts but are not normative requirements, design decisions, or source code.

Generated reports should clearly distinguish whether they are source-controlled outputs or reproducible build artifacts.

---

## 39. tools/

Optional.

Use for project-specific developer tooling that is distinct from product/runtime code.

Examples:

- repository validators;
- documentation linters;
- fixture generators;
- developer convenience tools.

---

# Part VII — Multi-project repositories

## 40. projects/

`projects/` contains independently scoped applications, engines, integrations, or workflow components.

A subproject may repeat the repository standard recursively.

Example:

```text
projects/
└── markdown-document-engine/
    ├── README.md
    ├── STATUS.md
    ├── ROADMAP.md
    ├── CHANGELOG.md
    ├── VERSION
    ├── docs/
    │   ├── REQ/
    │   ├── ARCH/
    │   ├── ADR/
    │   ├── RES/
    │   ├── RFC/
    │   ├── EP/
    │   ├── RUN/
    │   └── NOTE/
    ├── src/
    ├── tests/
    ├── lab/
    ├── scripts/
    ├── config/
    ├── examples/
    └── templates/
```

---

## 41. Repository-wide vs project-specific scope

Use this rule:

```text
root docs/          → concerns shared across the repository
projects/A/docs/    → concerns specific to project A
projects/B/docs/    → concerns specific to project B
```

Examples:

A repository-wide ADR might decide:

> All document engines use semantic Markdown as their canonical interchange layer.

A project-specific ADR might decide:

> The Google Docs renderer uses Google Apps Script for deployment.

The first belongs at root.

The second belongs inside the relevant subproject.

---

## 42. Inheritance

Subprojects inherit repository-wide rules unless explicitly overridden.

Typical inherited rules include:

- security;
- contribution discipline;
- document semantics;
- agent behavior;
- licensing;
- public-safe constraints.

Project-specific documentation should avoid copying those rules unless local clarification is needed.

Link upward instead of duplicating whenever possible.

---

# Part VIII — Versioning

## 43. Product/subproject versioning

An independently releasable subproject should define its own versioning policy.

It may use:

- Git tags/releases;
- `VERSION`;
- package metadata;
- release manifests.

Git tags/releases are the authoritative historical release markers.

---

## 44. Documentation versions

Documents may use explicit baseline versions when useful, especially:

- requirements baselines;
- architecture baselines;
- external review artifacts.

Git history remains the source of detailed change provenance.

Do not add document version numbers mechanically if they do not improve clarity.

---

## 45. Repository-standard versioning

This manual has its own version because the repository structure itself is being intentionally designed and tested.

Standard versioning follows semantic intent:

- **major** — incompatible or foundational change to repository organization/governance;
- **minor** — new document class, structural capability, or important rule;
- **patch** — clarification, correction, example, wording, or non-structural refinement;
- **draft** — still being validated in real project work.

The standard should not be propagated mechanically to other repositories until changes have been validated here.

---

# Part IX — Empty folders and scaffolding

## 46. Why apparently empty areas may exist

Git itself does not store empty directories.

When this standard pre-creates a future directory, it normally contains a small `README.md` explaining:

- what belongs there;
- when it should be used;
- its current state.

This is preferable to meaningless `.gitkeep` files when the directory has conceptual meaning.

### Example

Instead of:

```text
docs/ADR/.gitkeep
```

prefer:

```text
docs/ADR/README.md
```

stating that no ADR exists yet and explaining when one should be created.

This makes the scaffold self-documenting for both humans and agents.

---

# Part X — Naming conventions

## 47. Documentation filenames

Preferred pattern:

```text
<TYPE>-<NNN> - <Descriptive title> - <optional version>.md
```

Examples:

```text
REQ-001 - Project Scope and Design Principles.md
ARCH-002 - Renderer Architecture v0.1.md
ADR-0003 - Adopt Renderer-Neutral IR.md
RES-004 - Google Docs API Capability Review.md
RFC-002 - Structured Directive Syntax.md
EP-001 - Multi-Renderer Compiler Platform.md
RUN-003 - Release Procedure.md
NOTE-005 - Open TOC Questions.md
```

### Number widths

There is no need for one universal width across all classes.

A recommended convention is:

- REQ/ARCH/RES/RFC/EP/RUN/NOTE: three digits;
- ADR: four digits.

Consistency within a repository is more important than the exact width.

---

## 48. Requirement IDs

Requirement document numbering and requirement IDs are different things.

Example:

```text
REQ-003 - Rendering Requirements.md

REQ-MDE-GDOC-001
REQ-MDE-GDOC-002
REQ-MDE-NFR-001
```

The file can move or be split while requirement IDs remain stable.

---

# Part XI — Public safety and privacy

## 49. Never commit

Public repositories must never contain:

- API keys;
- access tokens;
- refresh tokens;
- passwords;
- session cookies;
- OAuth secrets;
- private keys;
- private certificates;
- secret-bearing configuration;
- private account identifiers unless deliberately public and required;
- private Drive/document/storage URLs;
- private repository URLs;
- private infrastructure endpoints;
- sensitive personal information;
- unredacted production logs;
- local paths that reveal private information.

---

## 50. Sanitized examples

Examples should use placeholders such as:

```text
YOUR_DOCUMENT_ID
EXAMPLE_PROJECT_ID
EXAMPLE_REPOSITORY
REDACTED
user@example.com
```

Avoid realistic-looking secrets that might later be mistaken for real credentials.

---

# Part XII — AI-assisted development

## 51. Repository as an agent-readable knowledge system

A key objective of this standard is to make the repository itself sufficient context for a new AI agent.

The agent should not need access to previous chats to understand:

- project mission;
- current state;
- requirements;
- accepted decisions;
- open proposals;
- architecture;
- code organization;
- next work.

---

## 52. Preferred reading order

For a new task:

```text
README
  ↓
STATUS
  ↓
relevant subproject README / STATUS
  ↓
REQ
  ↓
ADR
  ↓
ARCH
  ↓
RFC / EP / RES as relevant
  ↓
tests + code
```

This ordering deliberately puts accepted requirements and decisions before speculative proposals.

---

## 53. Agent write discipline

Agents should:

- preserve stable IDs;
- distinguish facts from proposals;
- update STATUS when operational state changes;
- update CHANGELOG only for meaningful release/user-visible changes;
- add tests for behavioral changes;
- avoid silently changing repository direction;
- never introduce secrets or private context from conversations;
- use RFC/EP/ADR when the decision significance warrants it.

---

# Part XIII — Repository-standard governance

## 54. This repository is the reference implementation

`DocumentWorkflows` currently serves two purposes:

1. it is a real software repository for document workflow projects;
2. it is the testbed for this repository organization standard.

The standard should therefore be improved based on observed use, not abstract preference alone.

---

## 55. How the standard changes

A small clarification to this manual can be handled as a normal documentation PR.

A structural change to the standard — for example introducing a new document class or materially changing the lifecycle — should normally include:

1. the problem observed;
2. rationale for the change;
3. compatibility/migration implications;
4. update to this manual;
5. update to templates;
6. update to AGENTS/CONTRIBUTING when relevant;
7. entry in the **Standard evolution** section below.

If a change is large or controversial, use an RFC or EP even though the subject is the repository standard itself.

---

## 56. Propagating the standard to other repositories

Do not copy the structure blindly.

Before propagation:

- validate the current standard here;
- identify which parts are universal;
- identify which parts are appropriate only for public repositories;
- identify which parts depend on multi-project structure;
- create migration guidance where existing repositories already have conventions.

The long-term goal is a reusable baseline, not forced uniformity.

---

# Part XIV — Standard evolution

This section records the evolution of the repository standard itself.

It is intentionally separate from the product `CHANGELOG.md`.

## 0.4.0-draft — 2026-10-07

### Added

- Added `RES/sources/` as the standard location for external evidence and source artefacts supporting RES analysis.
- Formalized the distinction between external evidence and project-authored research conclusions.
- Standardized direct organization by source identity, for example `sources/Reddit/`, `sources/IDEO/`, or `sources/IBM/`, avoiding generic intermediate layers such as `community/`.
- Added provenance guidance for stored external sources.
- Added redistribution and copyright safeguards for public repositories.

## 0.3.0-draft — 2026-10-07

### Added

- Added Roadmap Directions as the standard mechanism for preserving prospective evolution without prematurely converting it into requirements or architecture.
- Added `Committed`, `Candidate`, and `Exploratory` maturity states for roadmap directions.
- Added guidance linking roadmap directions to RES knowledge baselines and future RFC/EP promotion.
- Added the concept of a **next decision trigger** so future ideas state when design work should begin rather than remaining indefinitely open.

## 0.2.0-draft — 2026-10-07

### Added

- Defined this document as the canonical repository organization and engineering manual.
- Added detailed rationale for root files and folders.
- Added responsibilities, boundaries, and anti-patterns for README, STATUS, ROADMAP, CHANGELOG, governance files, and GitHub-specific configuration.
- Formalized REQ, RES, RFC, EP, ADR, ARCH, RUN, and NOTE semantics.
- Added repository-vs-subproject scope and inheritance rules.
- Added implementation folder semantics for `src/`, `tests/`, `lab/`, `scripts/`, `config/`, `examples/`, `templates/`, and optional folders.
- Added explicit GitHub Issues / PR / commit / branch roles.
- Added standard versioning rules.
- Added self-documenting empty-folder guidance using README files instead of meaningless placeholders.
- Added public-safety and AI-agent repository rules.
- Added standard-governance and propagation guidance.

## 0.1.0-draft — 2026-10-07

### Added

- Initial repository documentation hierarchy.
- Orientation layer: README, STATUS, ROADMAP, CHANGELOG.
- Collaboration layer: CONTRIBUTING, SECURITY, CODE_OF_CONDUCT, AGENTS.
- Engineering knowledge classes: REQ, ARCH, ADR, RES, RFC, EP, RUN, NOTE.
- Recursive subproject structure.
- Reusable documentation templates.
- Basic work-tracking, versioning, and public-safety principles.

---

# Part XV — Quick reference

## 57. Where should this information go?

| Information | Put it here |
|---|---|
| What the repository is | README |
| What is happening now | STATUS |
| Where the project intends to go | ROADMAP |
| What changed in a release | CHANGELOG |
| How humans contribute | CONTRIBUTING |
| How AI agents should operate | AGENTS |
| Security/privacy rules | SECURITY |
| Required system behavior | REQ |
| Research/evidence | RES |
| Significant design proposal | RFC |
| Large multi-phase proposal | EP |
| Accepted engineering decision | ADR |
| Current architecture | ARCH |
| Repeatable operational procedure | RUN |
| Unclassified working material | NOTE |
| Concrete task or bug | GitHub Issue |
| Proposed repository change | Pull Request |
| Maintained product code | src |
| Automated validation | tests |
| Prototype/experiment | lab |
| Operational utility | scripts |
| Public-safe configuration | config |
| Demonstration material | examples |
| Reusable skeletons | templates |

---

## 58. The governing rule

When unsure where something belongs, ask:

> Is this describing identity, current state, required behavior, evidence, a proposal, a decision, current design, operational procedure, executable code, or an actionable task?

Put it in the location whose responsibility matches that answer.

If two places appear equally authoritative, the structure probably needs clarification.

The standard should continuously evolve toward **one clear home for each kind of project knowledge**.
