# ExO: Long-Lived Feature Branch with Canary Releases

## Status

Accepted

## Context

ExO (Experience Optimization) introduces a large new product surface to the CMA: Component Types, Templates, Experiences, Data Assemblies, Views, Fragments. The work involves dozens of new endpoints, parallel type definitions, and ongoing upstream API churn.

Shipping ExO endpoints incrementally to `master` was rejected because:

- ExO upstream contracts were unstable during early development — types changed weekly
- Customers on stable v11/v12 should not see ExO methods in their typed API surface until ExO is GA-ready
- Bridge API integration (DX-499) needed to be tested end-to-end before exposure
- Other concurrent SDK work (semantic-release maintenance, v12 dual package, cursor pagination) needed a clean `master`

## Decision

Maintain a long-lived **`feat/exo` branch** as the integration point for ExO work. All ExO-related PRs target `feat/exo` rather than `master`.

Release strategy:

- **Canary channel** — `feat/exo` is wired into the multi-branch semantic-release config (see ADR `2026-03-26-semantic-release-multi-branch.md`) as a prerelease branch. Every merge to `feat/exo` publishes to the `canary` dist-tag on npm (e.g., `contentful-management@12.x.y-canary.N`).
- **Periodic master sync** — `master` is merged into `feat/exo` on a regular cadence to keep the branch from drifting (see merge commits `516c12099`, `6ad5cb23d`, `990db4efe`, `d3db17ac4`).
- **GA cutover** — when ExO is ready, `feat/exo` merges into `master` as a single squashed feat commit, triggering the appropriate semver bump.

ExO endpoints follow additional scoping rules:

- Plain Client only — no waterfall client equivalents (consistent with the ADR `2026-01-14-waterfall-client-deprecation.md` direction)
- ExO-specific types live in dedicated modules and do not extend shared types in incompatible ways (see ADR `2026-04-15-type-isolation-product-domains.md`)

## Consequences

- **Enables:** safe iteration on unstable upstream contracts; canary builds for ExO partner teams; clean `master` for stable releases
- **Prevents:** half-finished ExO surfaces leaking into typed API for stable consumers
- **Trade-off:** branch maintenance overhead (regular `master` syncs); merge conflicts grow with branch age; canary versions are not covered by stable-release SLAs
- **Pattern for future product extensions:** new product surfaces with unstable contracts should reuse this canary-branch pattern rather than feature-flagging at runtime

Source: PR #3020 (DX-1016), PR #3017 (DX-910), commits `516c12099`, `6ad5cb23d`, `990db4efe` (master→feat/exo merges), `package.json` `release.branches` config (`canary` channel), Jira DX-499 (parent epic).
