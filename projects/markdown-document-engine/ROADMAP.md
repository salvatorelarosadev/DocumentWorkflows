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

## P2 — Editorial formatting and structured navigation
- Configurable typography and spacing.
- Lists, links, emphasis, tables, quotations.
- Page/section behaviors where supported.
- Captions and semantic directives where required.
- Baseline referenceable-object analytical index generated directly from the object registry, without duplicate subject-index annotations.

## P3 — Compiler architecture
Subject to RFC/ADR decisions:
- normalized intermediate document model;
- renderer interface;
- style profiles;
- validation and diagnostics;
- CLI/service boundary if useful.

## P4 — Additional renderers
Potential targets include Microsoft Word, LaTeX, HTML/PDF, and other collaborative document systems.


## Prospective roadmap directions

Roadmap directions preserve intentional future evolution without prematurely turning it into a committed requirement or design.

### RD-001 — Concept-level analytical indexing

**Maturity:** Candidate  
**Current baseline:** Object-based indexing in REQ-002  
**Knowledge baseline:** RES-002

#### Objective

Evolve the initial object-based analytical index into a true subject/concept index in which concepts are modeled independently from document-object identity.

The target end state may support:

- multiple subject terms associated with one object or occurrence;
- the same subject term associated with many objects or occurrences;
- hierarchical entries such as `Payments > Wallet > EUDI`;
- preferred display labels distinct from sort keys;
- aliases and synonyms;
- `see` and `see also` relationships;
- principal mentions;
- discussion ranges;
- multiple named indexes;
- renderer-independent navigation to indexed occurrences;
- optional human/AI-assisted term suggestion, subject to explicit governance.

#### Conceptual distinction

The current baseline indexes objects:

```text
#fig-platform
#tbl-market-data
#sec-wallet
```

A future subject index must support a many-to-many model:

```text
document object / occurrence  ←→  subject concept
```

For example, one paragraph may be indexed under:

```text
EUDI Wallet
Digital identity
Payments > Wallet
European Union
```

while the subject `Wallet` may point to many different paragraphs, figures, tables, and sections.

#### Why this matters

Object identity and subject classification solve different problems. The first gives stable navigation and generated object indexes. The second enables editorial discovery by concept.

#### Current evidence

RES-002 documents current approaches in AsciiDoc, Sphinx/MyST, Quarto core, and the evolving Quarto extension ecosystem.

#### Next decision trigger

Open an RFC when:

1. the v0.1 object-reference and object-index model is stable enough to provide a reliable target model;
2. Google Docs anchor/navigation constraints are understood;
3. the Quarto indexing extension and competing syntax models have been evaluated for reuse;
4. there is enough evidence to compare syntax and semantic models rather than speculate.

If the future subject-index capability becomes a multi-phase subsystem with several dependent decisions, promote the direction into an EP instead of a single RFC.


### RD-002 — Direct paragraph and text-fragment references

**Maturity:** Exploratory  
**Current baseline:** Sections/headings, figures, and tables in REQ-002 / REQ-004

#### Objective

Explore whether MDE should eventually support formal cross-references to ordinary body paragraphs or arbitrary sequential text fragments without requiring authors to wrap that content in another structural object.

Possible future capabilities may include:

- assigning stable logical IDs to paragraphs or selected text ranges;
- references rendered with optional label, number, and/or short title;
- robust identity across edits, paragraph splits/merges, moves, and copy/paste;
- visual formalization from the context-aware Object Inspector;
- compatible Markdown/Pandoc syntax where an established convention is adequate;
- participation in the Object Browser and generated object indexes.

#### Why this is deferred

The immediate v0.1 need can be covered by the supported object model:

- sections/headings for structured prose;
- figures for images;
- tables for tabular or deliberately boxed/formal text blocks.

When an author needs a formally referenceable standalone text block in the short term, a one-cell table provides a practical Word-like workaround while remaining inside the existing table-reference model.

Direct paragraph/text-fragment references introduce unresolved questions about:

- target granularity;
- numbering semantics;
- optional titles;
- identity stability after split/merge edits;
- whether a selection is a paragraph object or an arbitrary text range;
- source syntax;
- Google Docs anchor/range persistence.

#### Next decision trigger

Do not open an RFC yet.

Open an RFC only when:

1. the v0.1 section/figure/table object model and Object Browser are stable;
2. real use cases demonstrate material limitations of the one-cell-table workaround;
3. research has compared established paragraph/span/range-reference approaches;
4. there is enough evidence to compare concrete semantic and syntax alternatives.

Until then, preserve this as an Exploratory Roadmap Direction rather than a proposed design.
