# Repository Status

**Last updated:** 2026-10-07  
**Maturity:** Early development / pre-alpha

This file is the operational snapshot of the repository. Stable purpose and navigation belong in README; atomic work belongs in GitHub Issues as the project grows.

## Current focus
Validate this repository as the reference documentation and engineering standard, using the Markdown Document Engine as the first real subproject.

## Completed
- Public GPL-3.0 repository established.
- Reusable documentation hierarchy adopted and extended from the model proven in the personal-KM project.
- REQ, ARCH, ADR, RES, RFC, EP, RUN, and NOTE document classes defined.
- Repository-level status, roadmap, contribution, security, agent, and changelog documents introduced.
- Repository standard evolved to v0.4.0-draft with Roadmap Directions (Committed / Candidate / Exploratory) and a standard `RES/sources/<source>/` convention for preserving external research evidence and provenance.
- Public-safe policy established.
- First subproject scaffolded: Markdown Document Engine.

## In progress
- Refine the Markdown Document Engine v0.1 requirements.
- Validate the documentation model through implementation work.
- Determine the first implementation path for Markdown parsing and Google Docs rendering.

## Next actions
1. Review and refine Markdown Document Engine requirements.
2. Research Google Docs/Apps Script constraints.
3. Prototype headings and hierarchical numbering.
4. Define deterministic fixtures/tests.
5. Promote accepted technical choices into ADRs.
6. Refine this repository standard based on observed friction.

## Open decisions
- Apps Script only vs external compiler + renderer vs hybrid.
- Whether a renderer-independent intermediate representation is justified for v0.1.
- Native Google Docs TOC vs engine-generated TOC.
- Normative Markdown subset and extension syntax.

## Blockers
None.

## Maintenance rule
Update this file when project phase, active focus, milestones, next actions, blockers, or material open decisions change. Do not use it as a substitute for requirements, RFCs, ADRs, or Issues.
