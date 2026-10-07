# Engineering Documentation

Repository-wide engineering knowledge lives here. Project-specific material belongs under `projects/<project>/docs/`.

| Code | Purpose |
|---|---|
| REQ | Requirements: what the system must do |
| ARCH | Current architecture/design |
| ADR | Accepted decisions and rationale |
| RES | Research, evaluation, experiments, evidence |
| RFC | Significant proposals under discussion |
| EP | Large multi-phase enhancement proposals |
| RUN | Operational procedures/runbooks |
| NOTE | Working notes not yet promoted |

Preferred filename: `<TYPE>-<NNN> - <Descriptive title> - <optional version>.md`.

Research is not architecture. Proposals are not decisions. Architecture reflects accepted design.

Common flow: `REQ → RES → RFC → ADR → ARCH → implementation`. An EP may replace RFC for large lifecycle-heavy changes and may reference RFCs for contained questions.
