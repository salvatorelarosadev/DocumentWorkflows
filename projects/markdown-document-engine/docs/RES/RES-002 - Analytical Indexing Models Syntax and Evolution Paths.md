# RES-002 — Analytical Indexing Models, Syntax, and Evolution Paths

**Status:** Complete knowledge baseline  
**Date:** 2026-10-07  
**Project:** Markdown Document Engine

## Question

How should the project evolve from a simple index of referenceable document objects toward a true concept/subject analytical index, while reusing mature syntax and design patterns wherever possible?

This research is intended to preserve the knowledge available today so that a future RFC or EP can start from evidence rather than reconstructing the problem from memory.

## Executive finding

There are two different problems that are often both called an "index":

1. **Object index** — generated from document objects that already have stable identities.
2. **Subject/concept index** — generated from explicit semantic terms associated with one or more locations or objects.

The v0.1 baseline can implement the first directly from the existing object registry.

The second requires additional semantics because object identity and subject classification have different cardinality and lifecycle properties.

## 1. Object identity versus subject-index semantics

### Object identity

A referenceable object has one stable logical identifier:

```markdown
## EUDI Wallet {#sec-eudi-wallet}

{#par-wallet-rationale}
This paragraph explains the rationale.

![Wallet architecture](wallet.png){#fig-wallet-architecture}
```

The IDs identify concrete document objects:

```text
sec-eudi-wallet
par-wallet-rationale
fig-wallet-architecture
```

Their rendered numbers may change, but their logical identities remain stable.

### Object-based analytical index

Because the engine already knows these objects, it can generate an index without extra author markup:

```text
Sections
  3.2 EUDI Wallet

Figures
  Figure 7 — Wallet architecture

Paragraph targets
  par-wallet-rationale
```

This is the v0.1 baseline defined in REQ-MDE-IDX-009.

### Subject/concept index

A subject index answers a different question: under which concepts should the reader be able to find this content?

The same paragraph might need to appear under:

```text
EUDI Wallet
Digital identity
Payments
  Wallet
European Union
```

At the same time, the concept `Wallet` may refer to many different paragraphs, figures, tables, and sections.

The relationship is therefore many-to-many:

```text
document object / occurrence  ←→  subject concept
```

This cannot be represented fully by the object's unique `#id` alone.

## 2. Capabilities a mature subject index may require

A future concept-level index may need:

- repeated terms across many occurrences;
- multiple terms attached to one occurrence;
- hierarchical terms;
- display labels different from sort keys;
- synonyms or aliases;
- `see` relationships;
- `see also` relationships;
- principal mentions;
- ranges covering an extended discussion;
- separate named indexes;
- navigation to exact occurrences;
- format-independent source syntax;
- optional assisted suggestion of index terms.

These capabilities should not be introduced into v0.1 unless they are required by the object-index baseline.

---

## 3. AsciiDoc / Asciidoctor model

AsciiDoc has explicit syntax for analytical index terms.

### Visible flow index term

```text
((Wallet))
```

or:

```text
indexterm2:[Wallet]
```

The indexed term remains visible in the body text.

### Concealed index term

```text
(((Payments, Wallet, EUDI)))
```

or:

```text
indexterm:[Payments, Wallet, EUDI]
```

The concealed form can express primary, secondary, and tertiary levels without adding visible text.

Example conceptual output:

```text
Payments
  Wallet
    EUDI
```

AsciiDoc explicitly requires each occurrence that should appear in the index to be marked.

### Design lesson

AsciiDoc demonstrates that compact inline subject-index markup can remain readable while supporting hierarchy.

Its parenthesized syntax is attractive but should not be copied automatically into a Pandoc/Quarto profile without first checking parser collisions, tooling behavior, and ecosystem compatibility.

### Source

Asciidoctor documentation:

https://docs.asciidoctor.org/asciidoc/latest/

---

## 4. Sphinx model

Sphinx provides a mature analytical-index model through its `index` directive and inline role.

Example:

```text
.. index::
   single: execution; context
   pair: module; __main__
   triple: module; search; path
   see: wallet; EUDI Wallet
   seealso: EUDI Wallet; digital identity
```

Important semantics include:

- `single`;
- `pair`;
- `triple`;
- nested entries separated by semicolons;
- `see`;
- `seealso`;
- principal/main entries;
- generated targets at the index-entry location.

Sphinx also creates index entries automatically from certain documented object types, showing that **object-generated indexing and explicit subject indexing can coexist**.

### Design lesson

This is very close to the conceptual endpoint of the roadmap direction: object indexes can be automatic, while subject terms require explicit semantic declarations.

### Source

Sphinx documentation:

https://www.sphinx-doc.org/en/master/usage/restructuredtext/directives.html

---

## 5. MyST model

MyST brings Sphinx-like analytical indexing into a Markdown-oriented technical publishing environment.

Example:

```markdown
:::{index} wallet
:::
```

Nested entry:

```markdown
:::{index} Payments; Wallet
:::
```

MyST also supports glossary and term semantics and integrates index locations with generated navigation.

However, the MyST documentation currently warns that its existing `index` directive and role syntax were taken from Sphinx and that an improved MyST-specific syntax may replace them in the future.

### Design lesson

MyST confirms the usefulness of explicit index semantics in a Markdown AST, but its current syntax should be treated as evidence rather than a stable notation to copy blindly.

### Source

MyST documentation:

https://mystmd.org/guide/glossaries-and-terms

---

## 6. Pandoc and Quarto core

### Pandoc

Pandoc provides the foundational mechanisms the project already uses:

- stable identifiers;
- spans;
- Divs;
- generic attributes;
- AST filters;
- multiple output formats.

These mechanisms are sufficient to represent a future subject-index annotation structurally, but the baseline Pandoc Markdown syntax does not itself establish a first-class, format-neutral subject-index language comparable to its heading/attribute syntax.

### Quarto core

Quarto's core documentation currently describes conventional book indexing for PDF through LaTeX `makeidx` / `imakeidx` and `\index{...}`.

Example:

```tex
Markdown\index{Markdown}
```

The Quarto documentation states that these `\index` commands are ignored for non-PDF output.

This means the documented core approach is not a renderer-neutral Markdown subject-index model.

### Sources

Pandoc manual:

https://pandoc.org/MANUAL.html

Quarto book structure:

https://quarto.org/docs/books/book-structure.html

---

## 7. Quarto extension ecosystem: quarto-index

A significant development exists outside Quarto core.

The official Quarto extensions catalog currently lists an `index` filter by Jeffrey Girard for building a book-quality subject index from format-neutral marks.

Project:

https://github.com/jmgirard/quarto-index

Documentation:

https://jmgirard.github.io/quarto-index/

The extension currently supports multiple output backends, including HTML, PDF, EPUB, and Typst.

### Syntax

It deliberately uses Pandoc-style span attributes.

Basic visible term:

```markdown
[Wallet]{.index}
```

Index under a different entry:

```markdown
[wallet technology]{.index entry="Wallet"}
```

Hierarchical entry:

```markdown
[EUDI]{.index entry="Payments!Wallet!EUDI"}
```

Concealed entry:

```markdown
[]{.index entry="Wallet"}
```

Cross-entry relation:

```markdown
[Digital wallet]{.index see="EUDI Wallet"}
```

Related-entry relation:

```markdown
[EUDI Wallet]{.index see-also="Digital identity"}
```

Principal mention:

```markdown
[EUDI Wallet]{.index mention="principal"}
```

Discussion ranges:

```markdown
[Wallet architecture]{.index range="open"}
...
[End]{.index range="close"}
```

Named index:

```markdown
[Jane Doe]{.index index="authors"}
```

### Why this is especially relevant

This syntax is strongly aligned with the project's existing decision to prefer Pandoc/Quarto notation:

```markdown
[text]{.class key="value"}
```

It therefore represents a much stronger reuse candidate than inventing a new DSL.

### Important qualification

The extension is listed in Quarto's official extensions catalog, but it is not the same thing as a built-in Quarto core feature.

Its adoption level, stability, maintenance model, syntax compatibility, and suitability for Google Docs rendering still require evaluation before it becomes a project dependency or syntax requirement.

### Sources

Quarto extensions listing:

https://quarto.org/docs/extensions/listing-filters.html

Extension documentation:

https://jmgirard.github.io/quarto-index/syntax.html

---

## 8. Current comparison

| Model | Object-generated index | Explicit subject terms | Hierarchy | see/seealso | Format-neutral source | Alignment with project syntax |
|---|---|---|---|---|---|---|
| Existing MDE object registry | Yes | No | By object class/metadata | No | Yes | Native |
| AsciiDoc | Limited / ecosystem-dependent | Yes | Yes | Limited compared with Sphinx | Source-level | Medium |
| Sphinx | Yes for documented object types | Yes | Yes | Yes | Sphinx/reST-specific | Low-medium |
| MyST | Yes through its semantic model | Yes | Yes | Sphinx-derived | Markdown-oriented | Medium |
| Quarto core documented book index | Not as a general subject-index feature | Yes via LaTeX for PDF | Via LaTeX tooling | Via LaTeX tooling | No for current documented core approach | Medium |
| quarto-index extension | Subject marks + generated index | Yes | Yes | Yes | Yes | High |

---

## 9. Recommended evolution

### Stage A — v0.1: object-based analytical index

Use the existing registry of referenceable objects.

No duplicate subject-index annotations are required.

The engine can generate indexes such as:

- sections;
- figures;
- tables;
- paragraphs;
- mixed referenceable objects;
- object subsets based on object metadata.

### Stage B — future subject/concept indexing

Do not choose syntax yet.

Before opening an RFC:

1. test the v0.1 object-index model;
2. evaluate the `quarto-index` extension in detail;
3. compare its AST representation with MyST/Sphinx and AsciiDoc semantics;
4. identify Google Docs rendering constraints;
5. determine whether exact adoption, compatible reimplementation, or a minimal extension is preferable.

### Stage C — RFC or EP

If the remaining problem is mainly syntax/semantic design, create an RFC.

If the capability expands into several dependent phases — concept identity, hierarchy, aliases, assisted tagging, cross-document indexing, multiple renderers — create an EP with contained RFCs as needed.

---

## 10. Questions for future evaluation

- Can the `quarto-index` span syntax be adopted without modification?
- Does its use of `!` for sub-entry hierarchy fit our desired authoring ergonomics?
- Should subject index marks point to arbitrary text occurrences, stable document objects, or both?
- Should concept identity be separate from display labels?
- Do we need persistent concept IDs?
- How should aliases and multilingual terms work?
- Can Google Docs bookmarks represent exact inline occurrences reliably?
- How should indexes behave after human edits to rendered Google Docs?
- Should AI-assisted index-term suggestions remain advisory until explicitly accepted by a human?
- Does cross-document indexing belong to this engine or to a later corpus-level system?

---

## Decision status

This document records evidence and design space.

It does **not** select a subject-index syntax or implementation.

The only current requirement commitment is the v0.1 referenceable-object index defined in REQ-002.

The prospective concept-level capability is tracked in ROADMAP RD-001.
