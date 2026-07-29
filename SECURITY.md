# Security Policy

## Supported versions

SparkKit has not published a stable release. Security fixes currently target the default branch only.

## Reporting a vulnerability

Do not open a public issue for a suspected vulnerability.

Use GitHub private vulnerability reporting for this repository when available. If it is unavailable, contact the repository owner privately through the verified contact method on the owner's GitHub profile and include `SparkKit security report` in the subject.

Include:

- affected commit or component;
- reproduction steps or a minimal proof of concept;
- expected impact;
- suggested mitigation, if known;
- whether the issue has been disclosed elsewhere.

Do not include real credentials, personal information, or customer data.

## Response process

Maintainers will acknowledge a valid channel report, reproduce and assess it, prepare a fix, and coordinate disclosure. Response-time or remediation-time guarantees will not be claimed until the project has a staffed security process.

## Security boundaries

The current website is a prototype. Authentication, tenant isolation, AI-provider handling, Docker, AWS, Kubernetes, and Sparkbase Cloud security controls are planned work unless their implementations and tests exist in the repository.
