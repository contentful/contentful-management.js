# v11 Maintenance Branch and 6-Month Support Policy

## Status

Accepted

## Context

ADR `2026-03-26-semantic-release-multi-branch.md` documents the *general* multi-branch release strategy. This ADR documents the **specific maintenance policy** applied when v12 became the new latest major:

- How long v11 keeps receiving fixes
- What kinds of fixes are eligible
- How the branch is configured in semantic-release
- Where the policy lives so consumers can plan upgrades

A previous one-off attempt at maintenance branching exposed a `semantic-release` config gotcha: prerelease branches and maintenance branches use different config shapes, and conflating them silently breaks releases. This needs to be captured so future major bumps don't repeat the mistake.

## Decision

When a new major version goes GA:

1. **Cut a maintenance branch** named `<previous-major>.x` (e.g., `11.x`) from the last tag of the previous major, before the breaking changes land on `master`.
2. **Configure semantic-release** to recognize the maintenance branch as a release branch with the maintenance shape (`"+([0-9])?(.{+([0-9]),x}).x"` in `package.json` `release.branches`). This is distinct from prerelease branches like `beta`/`canary`/`dev`.
3. **6-month support window** — the previous major receives critical bug fixes and security patches only for 6 months from the new major's release date. No features, no minor bug fixes, no perf work. After 6 months the branch is end-of-life.
4. **Cherry-pick workflow** — fixes land on `master` first, then are cherry-picked to `<major>.x`. The cherry-pick PR uses the same Jira key but with a `(maintenance)` suffix in the title for traceability.
5. **Policy lives in `SUPPORT.md`** at the repo root so consumers and tooling can discover it.

For v11 specifically: the `11.x` branch was cut at the v11.last tag in April 2026 (PR #2982). End-of-support is 6 months after the v12 GA date.

## Consequences

- **Enables:** consumers who cannot immediately migrate to v12 still receive security patches; predictable EOL date for planning
- **Prevents:** indefinite maintenance burden on multiple major versions; ad-hoc patches with no release vehicle
- **Trade-off:** every critical fix during the window is duplicate work (master + maintenance branch); fixes that depend on v12-only code cannot be backported
- **Invariant:** only one maintenance branch is active at a time — when v13 ships, v11.x ends of life immediately and v12.x becomes the maintenance branch

Source: PR #2982 (v11.x branch cut), `SUPPORT.md`, `package.json` `release.branches` config, Slack #javascript-sdks thread (Apr 2026, Mitch Goudy guidance based on CDA v9 pattern).
