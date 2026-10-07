# ADR-0001 — Adopt a Pandoc/Quarto-Compatible Authoring Syntax Baseline

**Status:** Accepted  
**Date:** 2026-10-07

## Context

The Markdown Document Engine requires syntax for:

- stable semantic identifiers;
- sections/headings;
- figures and tables;
- cross-references;
- captions;
- arbitrary semantic block metadata;
- future renderer independence.

The project should avoid creating custom Markdown syntax when mature, well-known ecosystems already provide equivalent notation.

Research documented in RES-001 compared Pandoc Markdown, Quarto, and MyST Markdown.

## Decision

The Markdown Document Engine will use a **Pandoc/Quarto-compatible authoring syntax profile** as its baseline.

### Base syntax

Pandoc Markdown conventions are the preferred general extension mechanism.

In particular, the engine adopts Pandoc-style attributes:

```markdown
{#identifier .class key=value}
```

and fenced Divs:

```markdown
::: {#identifier .class key=value}

content

:::
```

for semantic identity, classes, metadata, and richer block structures.

### Typed reference identifiers

For object classes already established by Quarto, the engine adopts Quarto's lower-case typed identifier prefixes, including at minimum:

- `sec-` — section/heading;
- `fig-` — figure;
- `tbl-` — table;
- `eq-` — equation;
- `lst-` — code listing.

Additional established Quarto prefixes may be adopted when those object classes enter project scope.

### Standard cross-reference notation

For recognized typed objects, use Quarto-style references:

```markdown
@fig-ecosystem
@tbl-market-data
@sec-methodology
@eq-model
```

Grouped references may use Quarto-style grouped notation:

```markdown
[@fig-one; @fig-two]
```

The renderer derives visible labels and numbering from the target object and rendering profile.

### Section example

```markdown
## Methodology {#sec-methodology}

See @sec-methodology.
```

### Figure example

```markdown
![Platform ecosystem](ecosystem.png){#fig-platform-ecosystem}

See @fig-platform-ecosystem.
```

### Table example

```markdown
| Segment | Value |
|---|---:|
| A | 10 |
| B | 20 |

: Market data {#tbl-market-data}

See @tbl-market-data.
```

### Paragraph targets

Paragraphs remain referenceable even when they have no visible numbering.

For the baseline, assign a Pandoc-style block identifier:

```markdown
{#par-platform-rationale}
This paragraph explains the platform rationale.
```

and use ordinary internal-link syntax when explicit paragraph text is desired:

```markdown
[see the platform rationale](#par-platform-rationale)
```

The prefix `par-` is reserved by this project for paragraph targets.

Automatic shorthand such as `@par-platform-rationale` is **not yet part of the accepted baseline**, because it is not a native Quarto cross-reference type and could conflict with other Pandoc/Quarto parsing behavior.

### Semantic containers and callouts

When richer block semantics are needed, prefer Pandoc/Quarto fenced Divs rather than inventing a separate container language.

For example:

```markdown
::: {.callout-note}
Important explanatory material.
:::
```

### YAML metadata

Where document-level metadata or renderer configuration is required, Pandoc/Quarto-style YAML front matter is the preferred representation unless a later requirement or ADR establishes another mechanism.

### Analytical indexes

No canonical source syntax for analytical indexes is accepted yet.

The requirements in REQ-002 remain binding, but index declaration/query syntax will be designed separately.

MyST's current index syntax is not adopted because its own documentation describes that syntax as potentially subject to change.

## Compatibility principle

When a required capability already has a mature Pandoc or Quarto notation, the engine should reuse that notation exactly or as closely as practical.

Custom syntax may be introduced only when:

1. the required semantic capability is not adequately represented by an established notation;
2. the extension does not create avoidable ambiguity with Pandoc/Quarto parsing;
3. the design is documented through RFC/ADR as appropriate;
4. a migration path is considered if an upstream ecosystem later standardizes an equivalent notation.

## Alternatives considered

### Invent a new Markdown extension language

Rejected for the baseline.

This would increase learning cost, parser complexity, interoperability risk, and maintenance burden without sufficient benefit.

### Adopt MyST as the primary dialect

Not selected as the baseline.

MyST has strong semantic features, but Pandoc/Quarto aligns more directly with the project's multi-renderer document goals and provides particularly useful cross-reference notation.

MyST remains a valuable secondary source of design patterns.

### Use strict CommonMark/GFM only

Rejected.

The project requires stable IDs, typed cross-references, semantic metadata, and richer structured-authoring constructs that strict CommonMark/GFM does not provide conveniently.

## Rationale

Pandoc is a mature document-conversion ecosystem with broad format support.

Quarto builds on Pandoc Markdown and adds an established, readable cross-reference system that closely matches this project's requirements.

Reusing these conventions:

- reduces custom syntax;
- improves interoperability;
- makes documents easier for external contributors to understand;
- improves compatibility with existing parsers and tooling;
- preserves future output options such as DOCX, HTML, LaTeX, and PDF;
- gives AI systems a more recognizable syntax.

## Consequences

### Positive

- The project gains a recognizable extended Markdown baseline.
- Figures, tables, sections, equations, and listings use established syntax.
- Stable identifiers and attributes use a generic mature mechanism.
- Future Pandoc/Quarto interoperability becomes easier.
- Custom parser behavior can focus on genuine gaps rather than recreating existing syntax.

### Negative / trade-offs

- The project is no longer strictly CommonMark/GFM.
- Some Quarto-specific semantics will need to be implemented by this engine or delegated to compatible tooling.
- Paragraph cross-reference sugar remains less compact than figure/table/section references.
- Analytical-index syntax still requires a later design decision.

## Related material

- REQ: REQ-001, REQ-002
- RES: RES-001 — Established Markdown Extensions for Structured Authoring and Cross-References
- RFC: RFC-001 — Renderer-Independent Intermediate Representation
- ARCH: ARCH-001 — Initial Conceptual Pipeline

## Supersedes / superseded by

None.
