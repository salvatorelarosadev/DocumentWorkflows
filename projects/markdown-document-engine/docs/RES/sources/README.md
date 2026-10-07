# External Research Sources

This directory contains external source material that is directly relevant to the research, evaluation, and design work of the Markdown Document Engine.

Its purpose is to preserve the **evidence base** behind RES documents without mixing external source artefacts with the project's own research conclusions.

## What belongs here

Examples include:

- official product or API documentation snapshots;
- standards and specifications;
- public technical papers and reports;
- community discussions that materially inform project reasoning;
- external examples, reference implementations, or sample files;
- vendor documentation;
- benchmark inputs or published comparison material;
- other external artefacts that are useful for reproducible research.

Subdirectories may be introduced when the volume justifies them, for example:

```text
sources/
├── official/
├── standards/
├── papers/
├── community/
├── vendors/
└── examples/
```

Do not create empty taxonomies prematurely. Add a category when real source material requires it.

## Relationship to RES documents

Files in `sources/` are **evidence**, not project conclusions.

A source file does not become an accepted requirement, architecture, proposal, or decision merely because it is stored here.

Research conclusions belong in numbered `RES-*.md` documents, which should cite or otherwise identify the relevant source material.

Typical flow:

```text
external source
      ↓
RES/sources/
      ↓
RES analysis / comparison
      ↓
RFC / EP / ADR / requirement refinement
```

## Provenance

Where practical, each stored source should preserve enough provenance to understand:

- original title;
- author / organization;
- original URL or publication location;
- publication or retrieval date;
- version or release where relevant;
- license / redistribution status where known;
- why the source matters to the project.

This information may be encoded in a companion Markdown file when the source format itself cannot carry it.

## Public-repository rule

This repository is public.

Only commit external material when redistribution is permitted.

Do **not** commit copyrighted or access-restricted documents merely because they can be downloaded or viewed.

When redistribution is not clearly permitted:

- store a bibliographic/reference note instead;
- preserve the public URL and metadata;
- summarize findings in a RES document;
- keep any legally obtained private copy outside the public repository.

## Security and privacy

Never store:

- credentials;
- private URLs;
- private account identifiers;
- paywalled material obtained through private access when redistribution is not permitted;
- confidential documents;
- personal data that is not intentionally public;
- screenshots or exports containing sensitive information.

## Current state

No external source artefacts are committed yet.
