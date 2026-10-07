# RES-001 — Established Markdown Extensions for Structured Authoring and Cross-References

**Status:** Complete  
**Date:** 2026-10-07

## Question

Which mature Markdown ecosystems already provide syntax suitable for the Markdown Document Engine's needs, especially:

- stable identifiers;
- sections/headings;
- figures and tables;
- cross-references;
- captions;
- arbitrary block attributes;
- reusable semantic containers;
- internal navigation;
- generated indexes.

The goal is to minimize custom syntax and reuse notation already understood by established tools and communities.

## Scope

Primary candidates reviewed:

- Pandoc Markdown;
- Quarto;
- MyST Markdown / Jupyter ecosystem.

The research focuses on syntax and document semantics, not on selecting the final implementation runtime or parser library.

## Evidence

### Pandoc Markdown

Pandoc provides a mature extended Markdown dialect with:

- heading attributes: `## Heading {#identifier}`;
- generic attributes: `{#id .class key=value}`;
- fenced Divs: `::: {#id .class key=value}`;
- bracketed spans with attributes;
- link/image attributes;
- internal links;
- automatic heading identifiers;
- footnotes;
- tables;
- cross-format rendering support.

Pandoc's generic attribute syntax is especially important because it offers a reusable mechanism for stable object identity and metadata without inventing a new notation.

Official source:

https://pandoc.org/MANUAL.html

### Quarto

Quarto is built on Pandoc Markdown and adds a strong, opinionated cross-reference model.

Important conventions include:

- figures: `![Caption](image.png){#fig-example}`;
- tables: table caption followed by `{#tbl-example}`;
- sections: `## Heading {#sec-example}`;
- equations: identifiers using the `eq-` prefix;
- code listings: `lst-` prefix;
- cross-references: `@fig-example`, `@tbl-example`, `@sec-example`, etc.;
- grouped references: `[@fig-one; @fig-two]`;
- lower-case typed labels with reserved prefixes;
- configurable cross-reference labels;
- custom float reference types;
- fenced Div syntax for more complex semantic blocks;
- Quarto callouts built on Pandoc fenced Divs.

Quarto therefore provides a syntax very close to the engine's current requirements.

Official sources:

https://quarto.org/docs/authoring/cross-references/  
https://quarto.org/docs/authoring/cross-references-custom.html  
https://quarto.org/docs/authoring/markdown-basics.html  
https://quarto.org/docs/authoring/callouts.html

### MyST Markdown

MyST, stewarded in the Jupyter ecosystem, provides a particularly general reference model:

- labeled targets;
- shorthand `@target` references;
- Markdown-link references such as `[](#target)`;
- roles such as `{ref}` and `{numref}`;
- directives for figures, tables, equations, glossaries, and index entries;
- labels associated with AST nodes;
- generated glossaries and index pages.

This confirms that explicit target identity plus generated references/indexes is a mature pattern in technical-authoring systems.

However, MyST's current index directive/role syntax is documented as inherited from Sphinx and potentially subject to future change. It should therefore not be adopted as the canonical analytical-index syntax without further review.

Official sources:

https://mystmd.org/guide/cross-references  
https://mystmd.org/guide/glossaries-and-terms  
https://mystmd.org/guide/directives

## Findings

### 1. There is strong convergence around explicit stable identifiers

Pandoc, Quarto, and MyST all treat reference targets as objects with stable identifiers rather than as manually numbered text.

This directly supports the project's requirement that logical identity remain independent from rendered numbering.

### 2. Pandoc attribute syntax is the strongest general-purpose base

The pattern:

```markdown
{#id .class key=value}
```

is generic, readable, compact, and already part of the Pandoc ecosystem.

It can be used for headings, images, spans, Divs, and — with Pandoc's attributes support — arbitrary block-level content.

### 3. Quarto provides the best ready-made cross-reference sugar

The convention:

```markdown
@fig-id
@tbl-id
@sec-id
@eq-id
```

is concise, human-readable, and automatically separates semantic identity from rendered numbering.

Its typed prefixes are also useful for validation and object classification.

### 4. Fenced Divs are a mature semantic extension mechanism

The syntax:

```markdown
::: {#id .class key=value}

content

:::
```

is supported by Pandoc and Quarto and provides a reusable container for richer semantic objects.

This is preferable to inventing a wholly new block syntax when standard Markdown is insufficient.

### 5. Paragraph references need a small compatibility rule

Quarto provides typed cross-references for recognized object types, but not a built-in paragraph reference class.

Pandoc can still assign an ID to an arbitrary block. A paragraph can therefore use a stable target such as:

```markdown
{#par-business-model}
This paragraph contains the relevant argument.
```

and be linked using standard internal-link syntax:

```markdown
[the relevant argument](#par-business-model)
```

This remains more portable than inventing a new paragraph-specific `@par-` syntax at this stage.

### 6. Analytical indexes do not yet have one sufficiently stable cross-ecosystem syntax

Quarto supports lists of figures/tables/listings in some outputs and conventional PDF indexes through LaTeX mechanisms.

MyST provides richer index semantics, but its current index syntax is explicitly described as potentially changing.

Therefore:

- the semantic requirement for analytical indexes should remain;
- their source syntax should remain open until a dedicated design decision is made;
- object metadata should preferably reuse Pandoc-style attributes where practical.

## Recommendation

Adopt a **Pandoc/Quarto-compatible authoring profile** as the baseline syntax for the Markdown Document Engine.

Use:

- Pandoc Markdown as the underlying extended syntax model;
- Pandoc attributes for IDs, classes, and metadata;
- Quarto typed prefixes and cross-reference notation for standard referenceable object classes;
- Pandoc/Quarto fenced Divs for richer semantic blocks;
- ordinary Markdown/Pandoc internal links for arbitrary paragraph references;
- custom syntax only when no sufficiently mature established notation exists.

Treat MyST as a secondary reference model for advanced semantic concepts, especially generic targets, directives, glossaries, and indexes, but do not copy unstable syntax merely for feature parity.

## Limitations

- Syntax compatibility does not guarantee identical rendering behavior across Pandoc, Quarto, Google Docs, or future engine implementations.
- Quarto cross-reference semantics are richer than raw Pandoc syntax.
- Paragraph references require project-specific interpretation if automatic labels/numbers are later desired.
- Analytical-index syntax remains unresolved.

## Implications

This research supports an architectural decision to define the engine's canonical syntax as a constrained Pandoc/Quarto-compatible profile rather than a new Markdown dialect invented from scratch.
