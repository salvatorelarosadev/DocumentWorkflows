# REQ-003 — Heading Numbering Workflow

**Status:** Draft  
**Baseline:** v0.1-draft  
**Project:** Markdown Document Engine

## Purpose

Define the first user-facing MDE use case for hierarchical heading numbering in Google Docs.

The workflow must preserve native Google Docs heading semantics and support both one-shot numbering and an optional automatic reconciliation mode.

All user-facing commands and status messages for this workflow must be in English.

## REQ-MDE-NUM-001 — Add numbering command

**Formal requirement**

The Google Docs integration must provide an **Add numbering** command that applies or reconciles hierarchical numbering across native Heading 1–6 paragraphs.

When automatic numbering is off, this command must behave as an explicit one-shot operation and must not enable automatic reconciliation.

## REQ-MDE-NUM-002 — Persistent automatic-numbering state

**Formal requirement**

The integration must provide a document-level automatic-numbering state with explicit **ON** and **OFF** values.

## REQ-MDE-NUM-003 — Turn automatic numbering on

**Formal requirement**

The integration must provide a **Turn automatic numbering on** command.

When enabled, MDE must reconcile heading numbering without requiring an explicit numbering command whenever it detects a relevant change in the heading structure during active editing.

## REQ-MDE-NUM-004 — Structural change detection

**Formal requirement**

Automatic numbering must treat changes affecting heading hierarchy or order as reconciliation triggers, including at minimum:

- insertion of a heading;
- deletion of a heading;
- reordering or moving heading paragraphs;
- cut/paste operations that add, remove, or reorder heading paragraphs;
- changes to heading level;
- other changes that alter the ordered heading structure.

Ordinary body-text edits that do not affect heading structure should not require renumbering.

## REQ-MDE-NUM-005 — Turn automatic numbering off

**Formal requirement**

The integration must provide a **Turn automatic numbering off** command.

Disabling automatic numbering must stop automatic reconciliation while preserving the currently visible numbering.

## REQ-MDE-NUM-006 — Remove numbering

**Formal requirement**

The integration must provide a **Remove numbering** command that removes MDE-generated heading-number prefixes while preserving native heading semantics.

If automatic numbering is currently on, **Remove numbering** must also turn automatic numbering off before removing the prefixes.

## REQ-MDE-NUM-007 — Short-latency automatic reconciliation

**Formal requirement**

During active automatic-numbering monitoring, structural changes should be reconciled within a short user-perceivable interval without requiring the user to close/reopen the document or invoke a menu command.

**Notes**

The exact event/polling mechanism is an implementation decision. The first lab implementation may use a sidebar-based monitor.

## REQ-MDE-NUM-008 — English user interface

**Formal requirement**

All user-facing menu labels, commands, dialog messages, sidebar text, status messages, and errors introduced by the MDE Google Docs integration must be written in English.

## Relationship to other requirements

This document refines:

- `REQ-MDE-STR-002` — Generated section numbering;
- `REQ-MDE-GDOC-003` — Hierarchical numbering output;
- `REQ-MDE-NFR-001` — Repeatability;
- `REQ-MDE-SCP-005` — Native-first Google Docs augmentation.

This use case does not determine the final Apps Script / external compiler architecture.
