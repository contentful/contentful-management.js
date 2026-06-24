# Waterfall Client Deprecation Path

## Status

Accepted

## Context

ADR `2026-03-26-plain-client-as-default.md` documents the decision to make the plain client the default in v12. This ADR documents the **deprecation path** for the legacy waterfall (nested) client, which is a separate concern: how long it stays, how users learn it's deprecated, and when it gets removed.

Removing the waterfall client outright in v12 was rejected — too many production consumers depend on it, including internal Contentful tooling, contentful-cli, contentful-import, contentful-export, and contentful-migration. Some of those consumers also need a maintenance window before they can migrate.

## Decision

Stage the deprecation across three releases:

1. **v11 (DX-674, commit `4cb5c0238`, Jan 14 2026)** — Add runtime + type-level deprecation warnings to `createClient` when it is called without `{ type: 'plain' }`. No behavior change. Warnings printed once per process to avoid log spam.
2. **v12 (DX-690, commit `55568ed42`, Jan 21 2026)** — `createClient` defaults to plain client. Waterfall is opt-in via `createClient(config, { type: 'legacy' })` and continues to print a deprecation warning. User-Agent string for plain client changes to `contentful-management-plain.js` so backend can track migration.
3. **v13 (planned)** — Remove the legacy/waterfall client entirely. No date committed; gated on internal tooling migration completing.

The v11.x maintenance branch (see ADR `2026-04-09-v11-maintenance-branch.md`) continues to ship security patches for consumers who cannot migrate within v12's window.

## Consequences

- **Enables:** consumers get one full major (v12) with both clients available before removal; backend can measure plain-vs-legacy adoption via User-Agent
- **Prevents:** a hard cutover that would strand large consumers
- **Trade-off:** v12 ships with two parallel client implementations to maintain; bug fixes that affect both surfaces require duplicate work
- **Invariant:** no new endpoints are added to the waterfall client after v11 — all new work lands in plain client only (commit `5c4101807` and later show this pattern)

Source: PR #2865 (DX-674), PR #2867 (DX-690), `MIGRATION.md` v11→v12 section, `lib/create-contentful-api.ts`, `lib/index.ts`.
