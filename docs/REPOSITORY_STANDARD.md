# Repository Documentation and Engineering Standard

**Status:** Draft standard under active validation  
**Scope:** DocumentWorkflows and future repositories that adopt this model

## 1. Purpose
Separate stable project identity from volatile state; required behavior from choices; proposals from decisions; evidence from normative design; atomic work from durable engineering knowledge; and repository-wide governance from subproject-specific design.

## 2. Orientation layer
Every substantial repository should provide:
- `README.md` — durable entry point, purpose, principles, maturity, structure, documentation index;
- `STATUS.md` — current operational snapshot;
- `ROADMAP.md` — intended direction;
- `CHANGELOG.md` — released/user-visible changes.

README links to volatile documents rather than duplicating them.

## 3. Collaboration layer
Use as appropriate:
- `CONTRIBUTING.md`;
- `SECURITY.md`;
- `CODE_OF_CONDUCT.md`;
- `AGENTS.md`;
- `.github/` templates/automation.

AGENTS.md is vendor-neutral. Tool-specific instruction files should reference rather than fork the common rules where possible.

## 4. Engineering knowledge classes
### REQ
What must/should/may be true. Stable ID + Formal requirement + Rationale/design intent + Source/origin + optional acceptance criteria/status.

### ARCH
Current accepted design model, boundaries, interfaces, flows. Candidate tooling remains explicitly candidate until accepted.

### ADR
Accepted decision, context, alternatives, rationale, consequences, status. Superseded decisions remain traceable.

### RES
Evidence, research, comparison, experiment, benchmark. Non-normative by itself.

### RFC
Significant proposed change needing durable review before acceptance.

### EP
Large, multi-phase change needing milestones, compatibility, rollout, testing, operational impact, or graduation criteria. RFC and EP are alternative proposal scales, not mandatory sequential stages.

### RUN
Repeatable setup, deployment, migration, release, maintenance, recovery procedure.

### NOTE
Working material not yet promoted; non-normative.

## 5. Requirement discipline
IDs are stable. Do not silently renumber/reuse. Formal text governs; rationale explains intent.

## 6. Recursive hierarchy
```text
root docs/          repository-wide concerns
projects/A/docs/    project A concerns
projects/B/docs/    project B concerns
```

A substantial subproject may repeat the same REQ/ARCH/ADR/RES/RFC/EP/RUN/NOTE taxonomy.

## 7. Work tracking
- STATUS = snapshot, not task database.
- Issues = atomic work/bugs/features.
- Pull requests = proposed repository changes.
- Commits = implementation history.
- ROADMAP = direction, not detailed task state.

## 8. Versioning
Each independently releasable subproject should define its own CHANGELOG and versioning policy, optionally a machine-readable VERSION file. Git tags/releases are authoritative release markers.

## 9. Public-safety baseline
Assume every commit is publishable. Never commit secrets, credentials, private identifiers, private property URLs, sensitive personal information, or secret-bearing configuration.

## 10. Validation strategy
This standard is tested through real project work. Refine it when real friction, ambiguity, duplication, traceability gaps, or agent/contributor failures are observed.
