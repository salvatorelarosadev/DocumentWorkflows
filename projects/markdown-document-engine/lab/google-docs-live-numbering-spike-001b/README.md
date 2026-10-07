# Google Docs Live Numbering Spike 001b

**Status:** Lab prototype  
**Scope:** automatic reconciliation of native Google Docs heading numbering  
**Runtime:** Google Apps Script + HTML sidebar  
**User interface language:** English

## Purpose

Extend the validated Structural Spike 001 into the first user-facing MDE numbering use case.

The experiment provides four distinct commands:

- **Add numbering** — one-shot numbering/reconciliation.
- **Turn automatic numbering on** — enables live structural monitoring and reconciliation.
- **Turn automatic numbering off** — stops automatic reconciliation but keeps visible numbers.
- **Remove numbering** — disables automatic numbering and removes generated prefixes.

## Automatic mode

Google Docs does not expose an Apps Script document-content `onEdit` trigger.

This spike therefore uses a lightweight sidebar monitor. While the sidebar is open, it checks the ordered heading structure every 2.5 seconds.

A structural signature includes native heading level, order, and current heading text. Changes such as insertion, deletion, move, cut/paste, or heading-level changes therefore trigger reconciliation.

Ordinary body-text changes do not change the heading signature and do not trigger numbering work.

## Important lab limitation

If the user manually closes the sidebar, live polling stops for that editing session even though the document-level automatic-numbering state remains ON.

When the document is opened again, `onOpen` makes a best-effort attempt to reopen the monitor automatically when the saved state is ON.

A production implementation may choose a different event or monitoring architecture.
