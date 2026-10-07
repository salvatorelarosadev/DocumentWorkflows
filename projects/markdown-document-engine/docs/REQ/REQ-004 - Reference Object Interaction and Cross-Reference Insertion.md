# REQ-004 — Reference Object Interaction and Cross-Reference Insertion

**Status:** Draft  
**Baseline:** v0.1-draft  
**Project:** Markdown Document Engine

## Purpose

Define the user-facing interaction model for creating, inspecting, managing, browsing, and inserting references to formal document objects.

The interaction model must combine:

- a Markdown / Pandoc / Quarto-compatible identity model based on stable IDs and `#id` / `@id` notation; and
- a visual Google Docs workflow inspired by mature word processors, allowing users to create and insert references without typing Markdown syntax.

The visual interface and the textual syntax must operate on the same semantic object model.

## Terminology

For this requirement set:

- **object type** — semantic class such as section, paragraph, figure, or table;
- **logical ID** — stable document-global identifier such as `fig-platform-ecosystem`;
- **declaration notation** — source notation such as `#fig-platform-ecosystem`;
- **reference notation** — source notation such as `@fig-platform-ecosystem`;
- **display label** — optional human-facing prefix such as `Figure`, `Fig.`, `Table`, `Section`, or `Par.`;
- **number** — renderer-derived current number such as `3`, `2.4`, or `5.2.1`;
- **title** — human-facing object title or caption text;
- **rendering mode** — rule determining which combination of label, number, and title is shown at a reference occurrence.

The leading `#` and `@` characters are notation operators and are not part of the stored logical ID.

---

## REQ-MDE-OBJ-001 — Minimum formal object types

**Formal requirement**

The initial visual reference workflow must support at minimum:

- sections/headings;
- body paragraphs;
- figures represented by supported image objects;
- tables.

Each formal object must participate in the same logical identity and cross-reference model.

---

## REQ-MDE-OBJ-002 — Mandatory logical ID

**Formal requirement**

Every formal referenceable object must have exactly one non-empty logical ID.

The logical ID must be unique within the document.

An object cannot be committed as a formal reference target while its ID is missing or duplicates another object's ID.

**Acceptance criteria**

- [ ] The UI prevents creation of duplicate IDs.
- [ ] The UI clearly indicates whether the proposed ID is available.
- [ ] Duplicate IDs are also caught by document validation.
- [ ] IDs remain stable when the object is moved, renumbered, or retitled.

---

## REQ-MDE-OBJ-003 — Automatic ID suggestion with user editing

**Formal requirement**

When a user formalizes an object through the visual interface, MDE must propose a logical ID automatically.

The suggested ID should be derived from the object type and available title/caption context and should follow the accepted Quarto-compatible typed-prefix convention where applicable, for example:

- `sec-methodology`;
- `par-key-finding`;
- `fig-platform-ecosystem`;
- `tbl-market-comparison`.

The user must be able to edit the suggested ID before committing it.

**Acceptance criteria**

- [ ] Suggested IDs use a deterministic slug-like form.
- [ ] Availability is checked while the user edits the ID.
- [ ] The UI can propose an alternative when the desired ID is already in use.
- [ ] A title/caption edit does not automatically rename an already committed ID.

---

## REQ-MDE-OBJ-004 — Safe logical-ID rename

**Formal requirement**

If a committed logical ID is renamed, MDE must not leave silent stale references.

The system must either:

1. update all references to the old ID atomically; or
2. block the rename until the user completes an explicit migration workflow.

The chosen production behavior remains an architectural decision, but silent breakage is not permitted.

---

## REQ-MDE-OBJ-005 — Context-aware Object Inspector

**Formal requirement**

The MDE sidebar must include a context-aware **Selected object** area that inspects the current Google Docs selection/cursor context and exposes actions appropriate to the selected object type.

At minimum the inspector must recognize:

- a native heading/section;
- a supported body paragraph;
- a table or selection inside a table;
- a supported inline image/figure.

**Examples**

For a section/heading, relevant actions may include:

- numbering actions;
- create/edit logical ID;
- choose reference rendering metadata;
- copy `@id`.

For a table or figure, relevant actions may include:

- formalize object;
- create/edit caption metadata;
- create/edit logical ID;
- choose display label;
- copy `@id`.

For a body paragraph, relevant actions may include:

- formalize paragraph;
- define optional short reference title;
- choose display label;
- create/edit logical ID;
- copy `@id`.

---

## REQ-MDE-OBJ-006 — Visual and Markdown entry paths share one model

**Formal requirement**

Creating or editing an object through the sidebar must produce the same semantic state as declaring the corresponding object through supported Markdown/Pandoc/Quarto syntax.

Conversely, objects imported from canonical Markdown must be visible and editable through the visual Object Inspector.

**Rationale / design intent**

The project must not maintain separate “visual references” and “Markdown references”.

---

# Captions and display metadata

## REQ-MDE-CAP-001 — Formal figure and table captions

**Formal requirement**

A formal figure or table must support a caption composed from:

1. an optional display label;
2. a renderer-derived progressive number;
3. a human-facing title.

For example:

`Figure 3 — Platform ecosystem`

or, with the label suppressed:

`3 — Platform ecosystem`

The number must be derived from the current document state rather than manually stored as authoritative text.

---

## REQ-MDE-CAP-002 — Separate identity from presentation

**Formal requirement**

Logical ID, display label, derived number, and title must remain separate semantic properties.

Changing one must not silently redefine the others.

Examples:

- changing `Figure` to `Fig.` must not change `fig-platform-ecosystem`;
- moving the figure from number 3 to number 5 must not change its logical ID;
- editing the caption title must not change its logical ID unless the user explicitly requests an ID rename.

---

## REQ-MDE-CAP-003 — Managed label definitions

**Formal requirement**

MDE must provide a visual interface for creating, editing, selecting, and retiring reusable display-label definitions.

Default label definitions should be provided for common object types, while users may add document-specific labels.

A label definition must be reusable by more than one object.

**Notes**

The UI language of MDE is English, but document labels may use any user-defined language or terminology.

---

## REQ-MDE-CAP-004 — Caption label and inline reference prefix may differ

**Formal requirement**

The semantic model must permit the label used in an object's displayed caption to differ from the prefix used in inline references.

For example:

- caption: `Figure 3 — Platform ecosystem`;
- inline reference: `Fig. 3`.

**Rationale / design intent**

Mature authoring systems distinguish caption titles from inline reference prefixes. MDE should not force users to create separate numbering series merely to switch between a long and abbreviated display form.

---

## REQ-MDE-CAP-005 — Numbering series independent from display wording

**Formal requirement**

Changing a display label or inline reference prefix must not, by itself, create a new numbering series.

The default v0.1 numbering logic must remain tied to semantic object type or another explicit numbering-series configuration, not merely to visible label text.

**Notes**

Support for custom independent numbering series may be added later, but is not implied by creating a synonym or abbreviation such as `Figure` → `Fig.`.

---

# Reference rendering

## REQ-MDE-CITE-001 — Reference occurrence model

**Formal requirement**

Each inserted cross-reference must resolve through the target object's logical ID and must derive current visible content from the target object and the active reference-rendering profile.

A rendered reference must remain navigable to the target where Google Docs supports native linking.

---

## REQ-MDE-CITE-002 — Baseline rendering modes

**Formal requirement**

The initial rendering model must support at minimum these display modes:

1. **number only** — e.g. `3`;
2. **label + number** — e.g. `Figure 3`;
3. **label + number + title** — e.g. `Figure 3 — Platform ecosystem`.

The model should also permit **title only** as a useful compatibility mode unless prototype evidence shows a material constraint.

**Rationale / design intent**

These modes cover the user's core needs and align closely with mature word-processor cross-reference options.

---

## REQ-MDE-CITE-003 — Default rendering profile by object type

**Formal requirement**

MDE must allow a default reference-rendering mode to be configured by object type, with a document-level fallback.

For example:

- figures → label + number;
- tables → label + number;
- sections → label + number + title;
- paragraphs → number only.

The exact defaults remain configurable.

---

## REQ-MDE-CITE-004 — Per-occurrence override

**Formal requirement**

A specific inserted reference should be allowed to override the default rendering mode without changing the target object's identity or the document-wide default.

The exact Markdown serialization for modes not already represented by established Quarto/Pandoc syntax remains subject to REQ-MDE-SCP-004 and future design review.

---

## REQ-MDE-CITE-005 — Reference reconciliation after object changes

**Formal requirement**

When a target object's derived number, display label, or title changes, existing rendered references to that object must be reconcilable without editing each occurrence manually.

A production workflow must provide an explicit refresh/reconcile action at minimum.

Automatic reconciliation may extend the live-monitoring model validated for heading numbering.

---

# Object Browser and insertion

## REQ-MDE-BRW-001 — Reference Object Browser

**Formal requirement**

The MDE sidebar must provide an **Insert reference** action that opens a visual browser of formal referenceable objects in the current document.

The browser is an authoring interface and is distinct from generated document indexes.

---

## REQ-MDE-BRW-002 — Object Browser information

**Formal requirement**

Each browser row must expose enough information to identify the target unambiguously, including at minimum:

- object type;
- current number when available;
- title/caption or reference title;
- logical ID.

A display label may also be shown where useful.

---

## REQ-MDE-BRW-003 — Search, filtering, and ordering

**Formal requirement**

The Object Browser must support:

- filtering by object type, including at minimum sections, paragraphs, figures, and tables;
- text search across logical ID and title/caption;
- deterministic ordering, with document order as the default.

Additional ordering modes may be added later.

---

## REQ-MDE-BRW-004 — Single and multiple object selection

**Formal requirement**

The Object Browser must permit selection of one or more objects for insertion as cross-references.

After confirmation:

1. the browser closes;
2. the selected reference occurrence or occurrences are inserted at the user's intended insertion point in the document;
3. each inserted reference remains logically tied to its target ID.

---

## REQ-MDE-BRW-005 — Preserve intended insertion point

**Formal requirement**

Opening and interacting with the Object Browser must not cause MDE to lose the user's intended insertion location.

If the insertion point can no longer be resolved safely, MDE must report the condition rather than insert references at an arbitrary location.

---

## REQ-MDE-BRW-006 — Multi-reference semantics

**Formal requirement**

When multiple targets are selected, MDE must retain the individual logical IDs as a structured multi-reference rather than flattening them into immutable display text.

The rendering layer must be able to format the group consistently.

**Notes**

Advanced grouping, sorting, pluralization, and compression of consecutive references are desirable future capabilities. Established systems such as LaTeX `cleveref` provide a useful model.

---

# Lifecycle and integrity

## REQ-MDE-OBJ-007 — Duplicate-object handling

**Formal requirement**

Copying or duplicating a formal object must not silently create a second live object with the same document-global logical ID.

MDE must detect the collision and assign/propose a new ID or require user resolution.

---

## REQ-MDE-OBJ-008 — Removing a formal target

**Formal requirement**

If a user attempts to remove formal-reference status from an object that is currently cited, MDE must warn that dependent references exist.

The system must not silently leave apparently valid references pointing to a removed target.

---

## REQ-MDE-OBJ-009 — Deleting a cited object

**Formal requirement**

If a cited object is deleted from the document, MDE must detect the resulting unresolved references during reconciliation/validation and surface an explicit diagnostic.

This requirement complements REQ-MDE-REF-008.

---

## REQ-MDE-OBJ-010 — Title requirements by object type

**Formal requirement**

- sections derive their title from the native heading text;
- formal figures and tables must have a human-facing title/caption text;
- formal body paragraphs may define an optional short reference title.

If a rendering mode requires a title and the target has none, MDE must request one or use a documented fallback rather than silently generating misleading text.

---

## Scope boundary

This requirement set does not yet define:

- cross-document references;
- the final persistent registry representation;
- the final Google Docs bookmark/named-range mapping;
- exact Markdown syntax for non-standard rendering-mode overrides;
- advanced range compression such as `Figures 2–5`;
- custom user-defined semantic object types beyond the v0.1 set.

Those topics require separate research or design decisions.
