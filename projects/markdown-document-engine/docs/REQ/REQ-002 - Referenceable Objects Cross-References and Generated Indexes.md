# REQ-002 — Referenceable Objects, Cross-References and Generated Indexes

**Status:** Draft  
**Baseline:** v0.1-draft  
**Project:** Markdown Document Engine

## Purpose

Define the requirements for assigning stable identities to document objects, referencing them elsewhere in the same document, rendering those references correctly after structural changes, and generating analytical indexes from the set of referenceable objects.

Source syntax for capabilities already covered by the accepted Pandoc/Quarto baseline must follow REQ-MDE-SCP-003 and REQ-MDE-SCP-004. Detailed implementation choices — including internal representation, Google Docs bookmark strategy, numbering mechanism, and syntax for capabilities not adequately covered by Pandoc/Quarto — remain architectural decisions.

---

## REQ-MDE-REF-001 — Referenceable object model

**Formal requirement**

The system must support a document object model in which selected document elements can be declared as referenceable targets.

**Rationale / design intent**

Cross-references should resolve to semantic document objects rather than to manually typed text, page positions, or fragile visible numbering.

**Source / origin**

Project requirements discussion.

**Acceptance criteria**

- [ ] A document object can be declared as a reference target.
- [ ] References resolve through the object's logical identity rather than through its current visible number or text position.

---

## REQ-MDE-REF-002 — Minimum referenceable object classes

**Formal requirement**

The initial system must support, at minimum, the following referenceable object classes:

- sections/headings;
- paragraphs;
- figures;
- tables.

The reference model should permit additional object classes to be introduced later without changing the fundamental reference semantics.

**Rationale / design intent**

Figures and tables are conventional cross-reference targets, but the authoring model also requires direct reference to document sections and to individual paragraphs. The model should not be artificially limited to only objects that traditionally receive captions.

**Source / origin**

Project requirements discussion.

**Acceptance criteria**

- [ ] A heading/section can be assigned a reference identity.
- [ ] A paragraph can be assigned a reference identity.
- [ ] A figure can be assigned a reference identity.
- [ ] A table can be assigned a reference identity.
- [ ] Reference resolution uses the same conceptual mechanism across these object classes.

---

## REQ-MDE-REF-003 — Stable logical identifiers

**Formal requirement**

A referenceable object must have a stable logical identifier that is independent from its rendered numbering, position, page, heading number, figure number, table number, or other presentation-dependent attributes.

**Rationale / design intent**

An object may move during editing. For example, an object identified as `fig-ecosystem` may render as "Figure 3" and later as "Figure 5". Existing references must continue to point to the same logical object.

**Source / origin**

Project requirements discussion.

**Acceptance criteria**

- [ ] Moving a referenced object does not require changing its logical identifier.
- [ ] Renumbering the document does not break references.
- [ ] Changing a caption or heading title does not implicitly change the object's identifier.

---

## REQ-MDE-REF-004 — Source-level cross-references

**Formal requirement**

The Markdown source must provide a renderer-independent way to create a reference to a referenceable object's logical identifier.

**Rationale / design intent**

Authors and language models should reference semantic targets without embedding Google Docs-specific bookmarks, rendered numbers, or suite-specific link formats in the canonical source.

**Source / origin**

Project requirements discussion.

**Notes**

For recognized object classes and cross-references, source syntax must follow the accepted Pandoc/Quarto-compatible profile defined by REQ-MDE-SCP-003 and ADR-0001. Any project-specific syntax is governed by REQ-MDE-SCP-004.

**Acceptance criteria**

- [ ] Source content can identify the target object without using the object's rendered number.
- [ ] The source reference remains valid if the target object is reordered.

---

## REQ-MDE-REF-005 — Derived reference labels and numbering

**Formal requirement**

When a rendered reference includes a visible label, number, title, or other derived presentation attribute, that displayed value must be generated from the current target object state and rendering profile rather than manually duplicated in the source reference.

**Rationale / design intent**

A reference such as "see Figure 3" must not become stale when the figure is renumbered to "Figure 5".

**Source / origin**

Project requirements discussion.

**Acceptance criteria**

- [ ] Reordering figures updates rendered figure references consistently.
- [ ] Reordering tables updates rendered table references consistently.
- [ ] Reordering numbered sections updates rendered section references consistently.
- [ ] Source references do not require manual replacement of derived numbers.

---

## REQ-MDE-REF-006 — Paragraph references without mandatory visible numbering

**Formal requirement**

The system must allow a paragraph to be referenced even when that paragraph has no visible paragraph number in the rendered document.

**Rationale / design intent**

Logical identity and visible numbering are separate concerns. A paragraph may need a stable anchor for references while remaining visually indistinguishable from ordinary body text.

**Source / origin**

Project requirements discussion.

**Acceptance criteria**

- [ ] A paragraph can be a valid reference target without forcing a visible number.
- [ ] The rendering profile may determine how a reference to such a paragraph is displayed.

---

## REQ-MDE-REF-007 — Reference navigation in capable renderers

**Formal requirement**

When the target renderer supports internal navigation, rendered cross-references should provide a navigable link or equivalent mechanism to the referenced object.

**Rationale / design intent**

References should support both semantic correctness and practical document navigation.

**Source / origin**

Project requirements discussion.

**Acceptance criteria**

- [ ] In Google Docs, a rendered reference can navigate to its target when the platform supports a suitable anchor/bookmark mechanism.
- [ ] The absence of navigation support in another renderer must not invalidate the logical reference itself.

---

## REQ-MDE-REF-008 — Reference integrity validation

**Formal requirement**

The system must detect and report invalid cross-reference states, including at minimum:

- duplicate logical identifiers;
- references to non-existent targets;
- invalid or unsupported reference targets;
- malformed reference declarations.

**Rationale / design intent**

Broken references should be diagnosed explicitly rather than silently rendered as apparently valid text.

**Source / origin**

Project requirements refinement.

**Acceptance criteria**

- [ ] Duplicate target identifiers produce a diagnostic.
- [ ] An unresolved reference produces a diagnostic.
- [ ] Compilation does not silently substitute an arbitrary target.

---

## REQ-MDE-REF-009 — Deterministic reference updates

**Formal requirement**

Recompilation of unchanged source and configuration must produce stable cross-reference resolution and must not create duplicate anchors, duplicate bookmarks, or progressively altered reference text.

**Rationale / design intent**

Cross-references must obey the same repeatability/idempotence principle as structural numbering and formatting.

**Source / origin**

Extension of REQ-MDE-NFR-001.

---

# Generated indexes

## REQ-MDE-IDX-001 — Generated indexes from referenceable objects

**Formal requirement**

The system must support generating one or more indexes from the registry of referenceable document objects.

**Rationale / design intent**

Once objects have explicit identities and metadata, indexes should be derived from that semantic structure rather than manually maintained.

**Source / origin**

Project requirements discussion.

**Acceptance criteria**

- [ ] An index can be generated without manually duplicating target entries.
- [ ] Index entries are derived from the current set of eligible referenceable objects.

---

## REQ-MDE-IDX-002 — Object-class indexes

**Formal requirement**

The system must support indexes restricted to one or more referenceable object classes.

**Rationale / design intent**

Traditional outputs such as a List of Figures and List of Tables are special cases of a more general object-indexing capability. The same model should also permit indexes of sections, paragraphs, or future referenceable object classes when useful.

**Source / origin**

Project requirements discussion.

**Acceptance criteria**

- [ ] A figure-only index can be generated.
- [ ] A table-only index can be generated.
- [ ] A paragraph-only index can be generated when configured.
- [ ] A mixed-object index can be generated when configured.

---

## REQ-MDE-IDX-003 — Metadata-based object indexes

**Formal requirement**

The system should allow generated object indexes to select, group, sort, or label referenceable objects using semantic metadata attached to those objects in addition to object class.

**Rationale / design intent**

The initial indexing baseline remains object-centric: index entries are generated from the registry of explicitly referenceable document objects. Metadata may make those indexes more useful without yet introducing an independent subject/concept indexing model.

**Source / origin**

Project requirements discussion and roadmap refinement.

**Notes**

This requirement does not yet require free-standing subject terms, many-to-many concept-to-occurrence mappings, hierarchical subject vocabularies, or `see` / `see also` semantics. Those capabilities are tracked as a prospective roadmap direction and research topic.

---

## REQ-MDE-IDX-004 — Index entry navigation

**Formal requirement**

When the renderer supports internal navigation, each generated index entry should link to the corresponding target object.

**Rationale / design intent**

An index is both an analytical overview and a navigation mechanism.

**Source / origin**

Project requirements discussion.

---

## REQ-MDE-IDX-005 — Derived index labels

**Formal requirement**

Index entries that display numbering, titles, captions, labels, or other presentation attributes must derive those values from the current target objects and rendering configuration.

**Rationale / design intent**

Generated indexes must remain consistent after objects are reordered, renamed, inserted, or removed.

**Source / origin**

Project requirements discussion.

---

## REQ-MDE-IDX-006 — Index ordering

**Formal requirement**

The system must support deterministic ordering of generated index entries and should allow the ordering rule to be selected by the index configuration where more than one meaningful order exists.

**Rationale / design intent**

Some indexes naturally follow document order, while analytical indexes may require ordering by label, category, or other metadata.

**Source / origin**

Project requirements refinement.

---

## REQ-MDE-IDX-007 — Index refresh and idempotence

**Formal requirement**

Recompilation must update generated indexes to reflect the current referenceable-object set without accumulating duplicate entries or preserving stale entries for removed objects.

**Rationale / design intent**

Indexes must behave as generated views of document semantics rather than manually maintained content.

**Source / origin**

Extension of REQ-MDE-NFR-001.

**Acceptance criteria**

- [ ] Adding an indexed object adds the appropriate generated entry.
- [ ] Removing an indexed object removes the stale generated entry.
- [ ] Reordering indexed objects updates document-order indexes.
- [ ] Recompiling unchanged source does not duplicate index entries.

---

## REQ-MDE-IDX-009 — Baseline referenceable-object analytical index

**Formal requirement**

The v0.1 baseline must support a generated analytical index whose entries are derived exclusively from the registry of referenceable document objects and their existing identity, class, label/title/caption, position, and object metadata.

The baseline index must not require authors to add a second subject-index annotation merely to make an already referenceable object appear in the object index.

**Rationale / design intent**

The first useful analytical-index capability can be obtained directly from information the document already contains. Sections, paragraphs, figures, tables, and future referenceable object classes already have stable identities and renderer-derived labels. Reusing that registry avoids duplicate authoring and establishes a simple, deterministic foundation before introducing a richer concept-level subject index.

This baseline deliberately separates **object indexing** from the later **concept indexing** problem. A logical object has one stable identity, while a subject index may eventually associate many concepts with many occurrences.

**Source / origin**

Project roadmap refinement following analysis of object identity versus subject-index semantics.

**Acceptance criteria**

- [ ] The engine can generate a navigable index from referenceable objects without requiring duplicate index annotations.
- [ ] Entries can be grouped by object class.
- [ ] Entries can display current renderer-derived labels, numbers, titles, or captions where available.
- [ ] Paragraph targets can appear even when they have no visible paragraph number.
- [ ] Reordering or renumbering objects updates the generated index without changing logical identities.
- [ ] Removed objects do not leave stale entries after recompilation.
- [ ] The baseline does not require support for free-standing subject terms or concept hierarchies.

---

## REQ-MDE-IDX-008 — Multiple indexes in one document

**Formal requirement**

The system must permit more than one generated index in the same document, with independently configurable inclusion rules and presentation.

**Rationale / design intent**

A document may simultaneously require a table of contents, list of figures, list of tables, paragraph/reference index, and one or more analytical indexes.

**Source / origin**

Project requirements refinement.

---

# Relationship to other requirement areas

These requirements define **what must be possible**, not how references and indexes are implemented.

The accepted Pandoc/Quarto-compatible baseline governs identifiers, attributes, and standard cross-references. The following remain architectural or syntax decisions only where the established baseline does not fully determine them:

- syntax for project-specific object classes or capabilities not adequately covered by Pandoc/Quarto;
- metadata conventions for object-index filtering/grouping beyond the accepted Pandoc/Quarto baseline;
- future subject/concept-index syntax and semantics beyond the v0.1 object-index baseline;
- internal reference registry representation;
- Google Docs bookmark/anchor implementation;
- figure/table numbering mechanism;
- rendering syntax for paragraph references;
- generated index placement and styling;
- whether indexes are regenerated from scratch or incrementally synchronized;
- cross-document references.

Cross-document references are **not yet part of this v0.1 requirement baseline** and require separate discussion.
