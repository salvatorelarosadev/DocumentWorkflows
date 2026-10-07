# Manual Test — Google Docs Structural Spike 001

**Purpose:** validate the basic Google Docs mechanics required before building the Markdown-to-Docs compiler.

Record each test as **PASS**, **FAIL**, or **PARTIAL**, with notes.

---

## 0. Prerequisites

You need:

- one disposable Google Docs document;
- the Apps Script code from `Code.gs` installed as a script bound to that document;
- the document reloaded so the **MDE Lab** menu is visible.

Do not run this test on a real working document.

---

## 1. Create the fixture

From the Google Doc menu choose:

`MDE Lab → Create / reset test fixture`

Confirm the destructive reset.

### Expected structure before numbering

The document must contain native headings with this logical hierarchy:

```text
Introduction                  H1
  Context                     H2
    Italian scenario          H3
  Objectives                  H2
Methodology                   H1
  Validation                  H2
```

There must also be normal body paragraphs between the headings, including:

```text
Key finding paragraph for the target-stability experiment.
```

### Check

Use the Google Docs outline panel.

**PASS if:** the headings appear in the outline with the expected hierarchy before any numbering is applied.

Result: ______

Notes:

---

## 2. Insert a native Google Docs TOC manually

Place the cursor after the introductory description near the top of the document.

Use the normal Google Docs command to insert a **native table of contents**.

Choose whichever native TOC appearance you prefer; record which one you used.

TOC style used: ______________________________

### Check

Before running MDE numbering, confirm that the TOC reflects the native heading structure and that clicking an entry navigates to the corresponding heading.

Result: ______

Notes:

---

## 3. Apply hierarchical numbering

Choose:

`MDE Lab → Apply hierarchical heading numbers`

### Expected heading text

```text
1. Introduction
1.1 Context
1.1.1 Italian scenario
1.2 Objectives
2. Methodology
2.1 Validation
```

### Checks

1. The visible numbering is exactly as expected.
2. The Google Docs outline still recognizes all entries as headings.
3. H1/H2/H3 hierarchy is unchanged.
4. Normal body paragraphs remain normal paragraphs.
5. No body paragraph receives a heading number.

Result: ______

Notes:

---

## 4. Refresh the native TOC

Use the normal Google Docs refresh/update action for the existing TOC.

### Expected result

The TOC should show the generated numbering as part of the heading text, for example:

```text
1. Introduction
1.1 Context
1.1.1 Italian scenario
...
```

Click several TOC entries.

### Checks

- displayed numbering is correct;
- TOC links still navigate to the correct headings;
- no duplicate TOC is created;
- heading hierarchy is still represented correctly.

Result: ______

Notes:

---

## 5. Idempotence test

Run:

`MDE Lab → Apply hierarchical heading numbers`

three more times.

### Expected result

The document must still contain:

```text
1. Introduction
1.1 Context
...
```

and **not**:

```text
1. 1. Introduction
1.1 1.1 Context
```

Refresh the native TOC again.

Result: ______

Notes:

---

## 6. Structural insertion test

Insert a new native **Heading 2** manually between `Context` and `Italian scenario`.

Use the heading text:

```text
New inserted section
```

Move `Italian scenario` under the new H2 if necessary so the hierarchy becomes:

```text
Introduction                  H1
  Context                     H2
  New inserted section        H2
    Italian scenario          H3
  Objectives                  H2
```

Run heading numbering again.

### Expected result

```text
1. Introduction
1.1 Context
1.2 New inserted section
1.2.1 Italian scenario
1.3 Objectives
2. Methodology
2.1 Validation
```

Refresh the native TOC.

Result: ______

Notes:

---

## 7. Reordering test

Move the native H2 `Objectives` above `Context`.

Run heading numbering again.

### Expected behavior

Numbering must be recalculated from current document order rather than remembered from the old order.

The TOC, after native refresh, must follow the new order.

Result: ______

Notes:

---

## 8. Invalid hierarchy test

Temporarily create a deliberate hierarchy jump, for example:

```text
Heading 1
  Heading 3
```

with no Heading 2 between them.

Run:

`MDE Lab → Apply hierarchical heading numbers`

### Expected result

The script must stop with an explicit hierarchy error **before applying a new numbering pass**.

Restore a valid hierarchy before continuing.

Result: ______

Notes:

---

## 9. Remove numbering

Choose:

`MDE Lab → Remove generated heading numbers`

### Expected result

All recognized generated prefixes disappear while:

- native heading levels remain intact;
- body paragraphs remain unchanged;
- Google Docs outline still works.

Refresh the native TOC.

Result: ______

Notes:

---

## 10. Restore numbering for target tests

Run:

`MDE Lab → Apply hierarchical heading numbers`

again.

Then run:

`MDE Lab → Create experimental targets`

The script creates native-backed target pairs for:

```text
sec-methodology
par-key-finding
```

Each target receives:

- one Google Docs NamedRange;
- one Google Docs Bookmark.

The script logs their generated IDs.

Result: ______

Notes:

---

## 11. Target persistence — harmless edit

Add text to a body paragraph *before* the `Methodology` section.

Do not delete the target paragraphs.

Run:

`MDE Lab → Inspect experimental targets`

### Expected result

Both targets should report:

```text
NamedRange=1
Bookmark=OK
```

Result: ______

Notes:

---

## 12. Target persistence — move the section

Move the whole `Methodology` section lower or higher in the document without deleting its heading.

Run:

`MDE Lab → Inspect experimental targets`

### Expected result

The NamedRange and Bookmark associated with `sec-methodology` should still resolve.

Result: ______

Notes:

---

## 13. Target persistence — edit target text

Change:

```text
Key finding paragraph for the target-stability experiment.
```

to:

```text
Key finding paragraph for the target-stability experiment — edited manually.
```

Do **not** recreate the targets yet.

Run:

`MDE Lab → Inspect experimental targets`

### Expected result

This test is intentionally empirical.

Record separately whether:

- the NamedRange still exists;
- the Bookmark still resolves.

NamedRange: ______

Bookmark: ______

Notes:

---

## 14. Inspect native heading semantics

Run:

`MDE Lab → Inspect heading structure (log)`

Open the Apps Script execution log.

### Expected result

Each structural heading must still be reported as a native Heading 1–6 object after all numbering operations.

Result: ______

Notes:

---

# Final test summary

| Area | Result | Notes |
|---|---|---|
| Native heading semantics preserved |  |  |
| Hierarchical numbering correct |  |  |
| Numbering idempotent |  |  |
| Renumbering after insertion correct |  |  |
| Renumbering after reorder correct |  |  |
| Native TOC displays numbers correctly |  |  |
| Native TOC navigation works |  |  |
| Invalid hierarchy detected |  |  |
| NamedRange survives edits/moves |  |  |
| Bookmark survives edits/moves |  |  |

## Decision questions after the test

Answer these before changing architecture:

1. Is visible-prefix numbering compatible enough with native heading semantics and TOC behavior?
2. Does the native TOC satisfy the v0.1 user experience once headings are numbered?
3. What TOC automation gap, if any, remains?
4. Are NamedRanges useful as an internal identity/tracking layer?
5. Are Bookmarks reliable enough as user-facing navigation targets?
6. Do sections and ordinary paragraph targets need different native substrates?
7. What minimum experiment should come next: Markdown parsing, TOC automation, or object-index generation?
