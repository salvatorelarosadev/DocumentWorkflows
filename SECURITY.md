# Security Policy

## Public repository rule
This repository must be safe to publish at every commit.

Never commit:
- API keys, tokens, passwords, cookies, or session material;
- OAuth client secrets or credential bundles;
- private keys or signing secrets;
- private account/property identifiers or private document/storage/repository URLs;
- sensitive personal data;
- local configuration containing secrets/private identifiers;
- unreviewed real-system logs or fixtures.

Use obvious placeholders such as `EXAMPLE_PROJECT_ID`, `YOUR_DOCUMENT_ID`, and `REDACTED`.

## Local configuration
Secret-bearing or environment-specific configuration stays outside version control. Commit only sanitized `.example` files.

## Reporting a vulnerability
Do not disclose exploitable vulnerabilities or exposed secrets in a public issue. Use GitHub private security reporting when available; otherwise contact maintainers through GitHub without publishing exploit details.

## Accidental exposure
If a secret is committed:
1. treat it as compromised;
2. revoke/rotate it immediately;
3. remove it from current content;
4. assess history rewriting;
5. document only non-sensitive remediation.

Deleting a secret in a later commit does not make the original secret safe.
