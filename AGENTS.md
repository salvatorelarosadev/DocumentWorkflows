# Instructions for AI Agents and Coding Assistants

These vendor-neutral rules apply to coding agents, LLM assistants, IDE agents, and automated contributors.

## Context-loading order
Before a material change:
1. read root README.md;
2. read root STATUS.md;
3. read the relevant subproject README.md and STATUS.md;
4. read applicable REQ documents;
5. read accepted ADRs and current ARCH documents;
6. inspect relevant RFCs/EPs, remembering proposals are not decisions;
7. inspect relevant tests/code before changing behavior.

## Documentation semantics
- REQ = required behavior.
- RES = evidence/investigation.
- RFC = significant proposal under discussion.
- EP = large multi-phase proposal.
- ADR = accepted decision.
- ARCH = current architecture/design.
- RUN = operational procedure.
- NOTE = working material.

## Requirement rules
- Preserve stable requirement IDs.
- Do not renumber IDs merely because text changes.
- Keep formal requirements normative/testable.
- Keep rationale non-normative.
- Do not smuggle technology choices into requirements unless the technology is itself an approved constraint.

## State rules
- Update STATUS when operational state materially changes.
- Use Issues for atomic work as tracking matures.
- Update CHANGELOG for release/user-visible changes, not every edit.
- Do not claim implementation is complete without code/tests/evidence.

## Public-safety rules
Never commit or reproduce secrets, keys, tokens, passwords, cookies, credential files, private account/property identifiers, private URLs, sensitive personal information, or unredacted real-world logs/fixtures.

## Engineering rules
- Prefer deterministic, testable transformations.
- Keep semantic behavior separated from renderer-specific behavior when architecture supports it.
- Add/update tests with behavior changes.
- Prefer focused changes over speculative rewrites.
- Record significant accepted choices as ADRs.
- Keep unresolved major decisions explicitly open rather than guessing.
