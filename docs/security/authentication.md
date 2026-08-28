# Authentication security

SparkKit uses Better Auth with server-side PostgreSQL sessions. This document
records the security assumptions for the current reference application.

## Required production environment

- `BETTER_AUTH_URL` must be the canonical HTTPS origin with no path, query, or
  fragment. Plain HTTP is accepted only for loopback local builds.
- `BETTER_AUTH_SECRET` must contain at least 32 characters and must come from a
  secret manager. Never commit the production value.
- `BETTER_AUTH_TRUSTED_ORIGINS` may contain comma-separated additional HTTPS
  origins. Keep this list exact and minimal; the current parser intentionally
  rejects wildcard and path-based entries.
- `DATABASE_URL` is server-only and must use a dedicated, least-privileged
  production database identity.

Startup fails in production when a non-loopback canonical URL is not HTTPS, the
signing secret is missing or short, or a trusted origin is invalid or insecure.

## Cookies and sessions

Authentication cookies are host-only because cross-subdomain cookies are
disabled. They use `HttpOnly`, `SameSite=Lax`, and `/` as the path. The `Secure`
attribute is enabled in production. Better Auth stores sessions in PostgreSQL,
and signing out invalidates the active session record.

## CSRF and origin validation

Better Auth's CSRF and redirect-origin checks remain enabled. Browser requests
with cookies are checked against the canonical URL and explicit trusted origins.
SparkKit-owned state-changing endpoints use the same exact-origin allowlist and
reject an invalid or missing browser origin before session lookup.

Do not enable `disableCSRFCheck` or `disableOriginCheck`. If a native or
server-to-server client is introduced, give it a separate authenticated API
design instead of weakening browser protections.

## Rate limiting and proxies

Better Auth rate limiting is explicitly enabled in development, CI, and
production. The default policy allows 100 requests per 60 seconds, while email
registration and password sign-in allow five attempts per 60 seconds.

The current memory store is appropriate for the single-process reference
application. Before horizontally scaling, replace it with a shared database or
secondary store so limits apply across instances.

At a reverse proxy, configure Better Auth to trust only the exact client-IP
header overwritten by that proxy, or list the proxy addresses/CIDR ranges.
Never trust arbitrary forwarded headers from an origin that clients can reach
directly. See the official [Better Auth rate-limit guidance](https://better-auth.com/docs/concepts/rate-limit).

## Verification

Automated tests verify strong production environment requirements, exact trusted
origin matching, untrusted-origin rejection, cookie attributes, rate limiting,
registration, session restoration, and sign-out invalidation. Run the complete
gate with `pnpm check`.
