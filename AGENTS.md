# AGENTS.md

Operating notes for coding agents working in `contentful-management.js`, the
JavaScript/TypeScript SDK for Contentful's Content Management API (CMA).

Read [ARCHITECTURE.md](ARCHITECTURE.md) before changing anything under `lib/`.
Human-facing contribution rules live in [CONTRIBUTING.md](CONTRIBUTING.md); the
public API is documented in [README.md](README.md) and breaking changes in
[MIGRATION.md](MIGRATION.md).

## Ground rules

- This is a published npm package (`contentful-management`) with a large
  installed base. Anything that changes an exported type or a method signature
  is a breaking change for consumers, and breaking changes belong in a major
  release documented in `MIGRATION.md`.
- The version in `package.json` is literally
  `0.0.0-determined-by-semantic-release`. Never hand-edit it, and never edit
  `CHANGELOG.md` — both are owned by semantic-release.
- Do not touch `dist/`. It is build output and is not committed.
- The legacy chained client is deprecated (see
  `docs/ADRs/2026-08-25-default-to-plain-client.md`). Add new endpoints to the
  plain client only, unless a ticket explicitly asks for legacy parity.

## Environment

- Node `>=20` per `package.json` `engines`; `.nvmrc` pins `v22` and CI runs
  Node 22.
- `npm ci` to install. `.npmrc` sets `ignore-scripts=true`, so dependency
  lifecycle scripts do not run on install.
- `husky` installs a `pre-commit` hook that runs `lint-staged`, which applies
  `prettier --write` and `eslint --fix` to staged `lib/**` and `test/**`
  `.js`/`.ts` files, and `prettier --write` to staged `*.md` files.

## Commands

All of these are npm scripts defined in `package.json`. Do not invent commands.

| Task                   | Command                                                |
| ---------------------- | ------------------------------------------------------ |
| Build all bundles      | `npm run build`                                        |
| Type declarations only | `npm run build:types`                                  |
| Lint                   | `npm run lint` (`npm run lint:fix` to autofix)         |
| Format check           | `npm run format:check` (`npm run format:fix` to write) |
| Unit tests             | `npm run test:unit`                                    |
| Unit tests + coverage  | `npm run test:unit:cover`                              |
| Type-level tests       | `npm run test:types`                                   |
| Bundle size budget     | `npm run test:size`                                    |
| Everything             | `npm test`                                             |

`npm run test:unit` is the loop to use while developing. It is fast, hermetic,
and needs no credentials — `vitest.setup.unit.ts` mocks `createHttpClient` from
`contentful-sdk-core`, so no HTTP leaves the machine.

### Tests that need credentials

`npm run test:integration` and `npm run test:demo-projects` run against a real
Contentful organization. Per `.github/workflows/`, both need
`CONTENTFUL_INTEGRATION_TEST_CMA_TOKEN` and `CONTENTFUL_ORGANIZATION_ID`, and
the integration suite additionally needs `TASKS_APP_DEFINITION_ID`. If you do
not have those, do not attempt these suites — CI runs them on the PR.
`npm run test:browser` additionally downloads Playwright browsers.

Vitest projects are declared in `vitest.workspace.js`: `unit`, `types`,
`integration`, `output`, `browser-unit`, `browser-integration`. Select one with
`npx vitest --project <name> --run`.

## Where things live

- `lib/index.ts` — the only public entry point. `createClient` lives here.
- `lib/plain/` — the plain (default) client. `plain-client.ts` builds the
  method tree, `plain-client-types.ts` is its public type, `wrappers/wrap.ts`
  turns an `(entityType, action)` pair into a callable.
- `lib/adapters/REST/endpoints/` — one module per entity, holding the actual URL
  and HTTP verb. This is where the CMA is really called. `raw.ts` holds the
  verb helpers, `index.ts` is the registry.
- `lib/common-types.ts` — the `MRActions` map that types every
  `(entityType, action)` pair, plus the `MakeRequest` overload list. Large
  (~3.6k lines) and central; every new endpoint touches it.
- `lib/entities/*.ts` — entity prop/`sys` types. Older entities also export
  `wrap*` helpers and a `create*Api` used by the legacy client; newer ones are
  types-only.
- `lib/create-*-api.ts` — the legacy chained client's scoped surfaces
  (space, environment, entry, organization, app definition, …).
- `lib/export-types.ts` — the public type barrel re-exported from `index.ts`.
- `test/unit/` — unit tests mirroring `lib/`. `test/integration/` — live CMA
  tests. `test/output-integration/` — consumes the built package from
  `dist/` as a real dependency.

## Adding a CMA endpoint

The file set below is what real feature commits touch. For a complete worked
example, see the design tokens commit: `git show --stat 3b36240`.

1. `lib/entities/<entity>.ts` — props, `sys`, create/update payload, query
   types.
2. `lib/common-types.ts` — add the entity/action entries to `MRActions` and the
   matching `MakeRequest` overloads. Without this the call is not typed and
   `wrap` will not accept it.
3. `lib/adapters/REST/endpoints/<entity>.ts` — implement each action against
   `raw.get/post/put/patch/del`. Export `del`, not `delete`; `make-request.ts`
   maps the `delete` action to `del`.
4. `lib/adapters/REST/endpoints/index.ts` — register the module. `makeRequest`
   resolves `endpoints[entityType][action]` and throws
   `Error('Unknown endpoint')` if it is missing.
5. `lib/plain/entities/<entity>.ts` — the typed public surface, with TSDoc and
   an `@example`. Wrap params in `OptionalDefaults<>` so client `defaults` stay
   optional.
6. `lib/plain/plain-client-types.ts` and `lib/plain/plain-client.ts` — add the
   key and its `wrap(wrapParams, '<Entity>', '<action>')` entries.
7. `lib/export-types.ts` — export the new public types.
8. `test/unit/adapters/REST/endpoints/<entity>.test.ts` — assert URL, verb, and
   headers. Add an integration test only if the endpoint can be exercised
   against a real space.

## Commits, PRs, releases

- Conventional Commits, enforced by semantic-release's commit-analyzer.
  `feat:` → minor, `fix:` → patch, `build(deps):` → patch (configured in the
  `release.releaseRules` block of `package.json`), `feat!:`/`BREAKING CHANGE:`
  → major. `chore:` and `docs:` release nothing.
- Include the Jira key in the subject, matching existing history:
  `feat: add ExO entity support [DX-796] (#3034)`.
- Releasable branches are `master`, `beta`, `canary`, `dev`, and maintenance
  branches matching `+([0-9])?(.{+([0-9]),x}).x`. A merge to `master` publishes
  to npm and republishes the typedoc site — treat `master` as live.
- The default branch is `master`, not `main`. Open PRs against `master`.
- CI (`.github/workflows/main.yaml`) chains `build` → `check` →
  `test-demo-projects` → `test-integration` → `release`. The `check` job runs
  lint, format check, unit tests with coverage, and the size limit.

## Gotchas

- `npm run test:size` enforces a `177 kB` limit on `dist/cjs/index.cjs`
  (`size-limit` block in `package.json`). Adding a dependency can fail CI here.
- `__VERSION__` is injected by rollup at build time. Unit tests get it from
  `vitest.setup.ts`; referencing it elsewhere needs the same treatment.
- `lib/**` forbids implicit type imports —
  `@typescript-eslint/consistent-type-imports` is an `error`. Use
  `import type`.
- Enums must be re-exported with a value `export {}` in `lib/index.ts`;
  `export type *` strips their runtime value. See the comment above the
  `WorkflowStepPermission*` exports.
- `CONTRIBUTING.md` and `SETUP.md` still describe the pre-v12 toolchain (Babel,
  Karma, webpack, `standard`, `index.js`/`browser.js` entry points). The real
  toolchain is rollup + vitest + eslint + prettier. Trust `package.json`.
