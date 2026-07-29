# ADR 0003: Open-source License and Governance

- Status: Accepted
- Date: 2026-07-27

## Decision

SparkKit core source code is licensed under the MIT License. Contributions are accepted through public pull requests and must include tests and documentation proportional to the change.

SparkKit must remain usable without Sparkbase Cloud. Generated application code belongs to the developer. Commercial Sparkbase services may provide managed deployment and operations, but the open-source project will not intentionally degrade non-Sparkbase deployment targets.

## Initial governance

- Maintainers publish roadmap and architecture changes in the repository.
- Security reports use the private process in `SECURITY.md`.
- Breaking architecture changes require an ADR.
- Completed roadmap items require implementation evidence.
- Project adoption metrics are reported only from verifiable sources.
