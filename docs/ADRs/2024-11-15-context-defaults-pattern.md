# Context-Defaults Pattern for Cross-Cutting Parameters

## Status

Accepted

## Context

Contentful's Releases feature introduced a new cross-cutting parameter — `releaseId` — that affects almost every entry/asset endpoint. When a `releaseId` is present, reads return release-scoped state and writes target the release rather than the live environment.

Plumbing `releaseId` through every method call in user code would be painful:

```ts
client.entry.get({ spaceId, environmentId, entryId, releaseId })
client.entry.update({ spaceId, environmentId, entryId, releaseId }, body)
client.asset.get({ spaceId, environmentId, assetId, releaseId })
// ...30+ methods
```

A second cross-cutting parameter, `releaseSchemaVersion`, has the same problem (DX-187, DX-188).

Adding a stateful "release context" object was rejected — that's the kind of hidden state the plain client decision (ADR `2026-03-26-plain-client-as-default.md`) explicitly avoids.

## Decision

Introduce a **defaults pattern** at client construction time, with per-call overrides:

```ts
const client = createClient(
  { accessToken, defaults: { spaceId, environmentId, releaseId, releaseSchemaVersion } },
)

client.entry.get({ entryId })                  // uses default releaseId
client.entry.get({ entryId, releaseId: null }) // explicit opt-out for one call
```

Mechanics:

- `PlainClientDefaultParams` is the type for the defaults object (formerly `DefaultParams`, renamed in v12)
- Per-call params merge over defaults — `null`/`undefined` in a per-call param means "fall back to default"; explicit `null` means "opt out"
- The defaults are stored on the client and applied in the wrappers under `lib/plain/wrappers/`

Releases-specific work that established the pattern:

- DX-184: `releaseSchemaVersion` defaults
- DX-202, DX-207, DX-208, DX-209, DX-210: per-method `releaseId` support across `entry.get`, `entry.create`, `entry.createWithId`, `entry.patch`, `entry.update`
- DX-374: full Releases endpoint surface

## Consequences

- **Enables:** ergonomic client construction for release-scoped workflows; reusable pattern for future cross-cutting params (e.g., per-tenant scoping, locale defaults)
- **Prevents:** stateful "context" objects that conflict with the plain client philosophy
- **Trade-off:** two ways to pass the same parameter (default + per-call) — documentation must explain merge semantics
- **Pattern for future cross-cutting params:** if a new field appears on >5 endpoints with the same value, add it to `PlainClientDefaultParams` rather than threading it through user code

Source: PRs #2664 (DX-184), #2665 (DX-187), #2668 (DX-188), #2679 (DX-202), #2724 (DX-61), #2725 (DX-209), #2727 (DX-208), #2728 (DX-210), #2732 (DX-207), #2757 (DX-374). Type lives in `lib/plain/plain-client-types.ts` as `PlainClientDefaultParams`.
