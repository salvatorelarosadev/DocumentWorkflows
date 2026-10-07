# Manual Test — Google Docs Live Numbering Spike 001b

Record each step as **PASS**, **FAIL**, or **PARTIAL**.

## 1. Install and create fixture
Install `Code.gs` and `Sidebar.html`, reload the document, and choose:
`MDE → Create / reset test fixture`
Confirm that the menu and all messages are in English.

## 2. One-shot numbering with automatic mode OFF
Choose `MDE → Add numbering`.
Insert a new H2 and wait at least 5 seconds.
Expected: numbering does not update automatically.
Run `Add numbering` again and verify one-shot reconciliation.

## 3. Turn automatic numbering ON
Choose `MDE → Turn automatic numbering on`.
Expected: numbering reconciles immediately, sidebar opens, state is ON.

## 4. Insert and delete headings
Insert and delete an H2.
Expected: automatic reconciliation within a few seconds.

## 5. Move / cut-paste heading paragraphs
Move an H2 using cut/paste or drag/move.
Expected: numbering follows the new document order.

## 6. Change heading level
Change H2↔H3 while keeping a valid hierarchy.
Expected: automatic recalculation.

## 7. Body-text edit
Edit an ordinary paragraph.
Expected: no numbering change is needed.

## 8. Native TOC compatibility
Refresh a native Google Docs TOC after an automatic reconciliation.
Expected: current numbers and navigation remain correct.

## 9. Turn automatic numbering OFF
Expected: current numbers stay, later structure changes do not auto-reconcile.
Manual `Add numbering` still works.

## 10. Persistence across reopen
Leave automatic numbering ON, close and reopen the document.
Expected: state remains ON and the monitor is reopened on a best-effort basis.

## 11. Remove numbering
With automatic mode ON, choose `MDE → Remove numbering`.
Expected: numbers disappear, heading semantics remain, automatic mode becomes OFF.
