# Contributing

Contributions are welcome. This repository keeps implementation, requirements, proposals, accepted decisions, evidence, and operational state distinct.

## Before contributing
1. Read README.md and STATUS.md.
2. Read AGENTS.md if using an AI assistant/agent.
3. Read the relevant subproject README and STATUS.
4. Read applicable REQ, ARCH, ADR, RFC, and EP documents.
5. Follow SECURITY.md before adding configuration, examples, logs, or integration code.

## Change types
- Small implementation/documentation fix: issue or focused pull request is normally sufficient.
- New/changed requirement: update REQ while preserving stable IDs.
- Significant design proposal: RFC.
- Large multi-phase evolution: EP.
- Accepted architectural choice: ADR.
- Evidence/comparison/experiment: RES.
- Operational procedure: RUN.

An RFC, EP, experiment, or RES document is not an accepted decision.

## Pull-request workflow
For non-trivial changes:
1. create a focused branch;
2. make coherent commits;
3. add/update tests for behavioral changes;
4. update affected documentation;
5. update STATUS when operational state changes;
6. open a pull request describing intent, validation, and documentation impact.

## Requirement discipline
Each requirement uses a stable ID plus:
- **Formal requirement** — normative/testable must/should/may wording.
- **Rationale / design intent** — non-normative explanation.

Do not silently renumber/reuse retired IDs.

## Security
Never commit credentials, tokens, passwords, private URLs, private account identifiers, sensitive personal data, or secret-bearing configuration.

## License
Contributions are distributed under the repository license.
