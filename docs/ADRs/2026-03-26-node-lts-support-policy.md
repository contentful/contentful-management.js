# Node.js LTS-Only Support Policy

## Status

Accepted

## Context

The SDK has bumped its minimum supported Node.js version several times (PRs #1633, #1998/#1999, v12 release). Each bump generated questions: "why now? why this version? what's the policy?"

Without a written policy:

- Bumps feel arbitrary to consumers and require ad-hoc justification
- Contributors don't know whether to use a new Node API in a PR
- Security/CVE work that depends on a Node feature gets blocked by uncertainty about whether it's safe to require it
- Major-version planning can't predict the Node minimum

## Decision

The SDK supports **only currently-active Node.js LTS lines** at any given time.

Rules:

- **Minimum:** the oldest still-active LTS at the time of a major release. (v12 ships with `engines.node = ">=20"` because Node 20 is the oldest active LTS at v12 release time.)
- **Drop policy:** when an LTS line goes End-of-Life (per the [Node.js release schedule](https://github.com/nodejs/release#release-schedule)), it may be dropped in the **next minor release** of the SDK. Drops are not breaking changes — they ship as `feat:` (minor bump), with the EOL'd Node version called out in the release notes and `SUPPORT.md`.
- **No "current" support** — odd-numbered Node majors (21, 23, …) are not officially supported. They generally work but are not part of CI.
- **Browser policy is independent** — the browser UMD bundle's targets are governed by `package.json` `browserslist`, not by Node policy.

Why minor for Node drops, not major:

- Node EOL dates are public and predictable; consumers running EOL'd Node have already accepted upgrade pressure from elsewhere
- Holding the SDK back until the next major would force the SDK into either (a) a faster major cadence than features warrant, or (b) carrying CVE-prone Node deps longer than necessary
- Aligns with `contentful-sdk-core` and the CDA SDK (`contentful`)

## Consequences

- **Enables:** fast adoption of Node-level CVE fixes (axios + transitive deps); use of new Node APIs without polyfill layers; predictable upgrade calendar for consumers
- **Prevents:** indefinite support for EOL'd Node lines; drift between SDK runtime expectations and underlying deps
- **Trade-off:** consumers on EOL'd Node must either upgrade Node or pin the SDK; some downstream tooling (older CI images) may need to update first
- **Cadence forecast:** roughly one Node bump per year, since each Node LTS line is active for ~30 months and overlaps with two other lines

Source: PR #1998 (`feat: bump supported node version to current LTS`), PR #1999, v12 `engines.node = ">=20"`, `SUPPORT.md`, [Node.js release schedule](https://github.com/nodejs/release).
