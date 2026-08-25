# Architecture

`contentful-management.js` is the JavaScript/TypeScript SDK for Contentful's
Content Management API (CMA). It is published to npm as
`contentful-management` and ships ESM, CommonJS, browser IIFE, and `.d.ts`
outputs from a single TypeScript source tree in `lib/`.

This document describes how the source is organised and how a call travels from
user code to the CMA. For contribution mechanics see
[CONTRIBUTING.md](CONTRIBUTING.md); for agent-oriented working notes see
[AGENTS.md](AGENTS.md).

## Request path

Every CMA call, on either client surface, funnels through the same four stages:

```
user code
  │
  ├─ createClient()                      lib/index.ts
  │    builds the user-agent, creates the adapter, picks a client surface
  │
  ├─ plain client  (default)             lib/plain/plain-client.ts
  │    or legacy chained client          lib/create-contentful-api.ts
  │        both call a single `makeRequest(opts)` closure
  │
  ├─ Adapter.makeRequest                 lib/adapters/REST/rest-adapter.ts
  │    axios instance from contentful-sdk-core (rate limiting, retries)
  │
  └─ endpoint lookup                     lib/adapters/REST/make-request.ts
       endpoints[entityType][action] → lib/adapters/REST/endpoints/<entity>.ts
       → raw.get / post / put / patch / del → HTTPS to api.contentful.com
```

The narrow waist is `makeRequest`. Clients never see axios, URLs, or HTTP
verbs; they only produce a `MakeRequestOptions` object
(`{ entityType, action, params, payload, headers, userAgent }`, defined in
`lib/common-types.ts`). `make-request.ts` resolves that pair against the
`endpoints` registry and throws `Error('Unknown endpoint')` when the entity or
action is not registered. Because `delete` is a reserved word, endpoint modules
export `del` and `make-request.ts` rewrites the `delete` action to `del`.

## Two client surfaces

`createClient` in `lib/index.ts` returns one of two shapes, selected by the
second argument:

- **Plain client** (`{ type: 'plain' }` or no options) — the default. A flat
  tree of `client.<entity>.<action>(params, payload)` methods returning plain
  JSON objects. Built in `lib/plain/plain-client.ts`; its public type is
  `PlainClientAPI` in `lib/plain/plain-client-types.ts`.
- **Legacy chained client** (`{ type: 'legacy' }`) — deprecated. Returns
  entity objects that carry their own methods (`space.getEnvironment()` →
  `environment.getEntries()` → `entry.update()`). It logs a deprecation warning
  on construction. See
  [docs/ADRs/2026-08-25-default-to-plain-client.md](docs/ADRs/2026-08-25-default-to-plain-client.md).

The two surfaces are also distinguishable server-side: the `X-Contentful-User-Agent`
header reports `contentful-management-plain.js` for the plain client and
`contentful-management.js` for the legacy one.

### Plain client

`lib/plain/wrappers/wrap.ts` holds the whole mechanism. Calling
`wrap(wrapParams, entityType, action)` returns a function that merges the
client-level `defaults` into the caller's `params` and hands the result to
`makeRequest`. So `plain-client.ts` is almost entirely declarative:

```ts
designToken: {
  getMany: wrap(wrapParams, 'DesignToken', 'getMany'),
  get: wrap(wrapParams, 'DesignToken', 'get'),
  // …
}
```

Types do the real work. `MRActions` in `lib/common-types.ts` maps every
`entityType → action → { params, payload, headers, return }`, and `WrapFn`
derives each method's arity and signature from that entry. `OptionalDefaults<T>`
makes the fields that can come from client `defaults` (`spaceId`,
`environmentId`, `organizationId`, `releaseId`, `releaseSchemaVersion`)
optional at the call site. Type-level tests for this live in
`lib/plain/wrappers/wrap.test-d.ts` and run under `npm run test:types`.

`lib/plain/` also carries the pagination and state helpers exported from
`index.ts`: `as-iterator.ts` (`asIterator`), `pagination-helper.ts`
(`fetchAll`), and `checks.ts` (`isDraft`, `isPublished`, `isUpdated`).

### Legacy chained client

`lib/create-contentful-api.ts` builds the root object, and the scoped surfaces
live in the sibling `lib/create-*-api.ts` files — `create-space-api.ts`,
`create-environment-api.ts`, `create-entry-api.ts`,
`create-organization-api.ts`, `create-app-definition-api.ts`,
`create-environment-template-api.ts`, `create-ui-config-api.ts`,
`create-user-ui-config-api.ts`.

Entity objects are built by `wrap*` functions in `lib/entities/*.ts`, which
attach methods to the raw API payload via
`lib/enhance-with-methods.ts`. That helper defines methods as
non-enumerable/non-writable properties, so `JSON.stringify` and cloning of an
entity yield just the data. `lib/common-utils.ts` provides the collection
equivalents (`wrapCollection`, `wrapCursorPaginatedCollection`).

## Directory map

| Path                                       | Contents                                                                                                   |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `lib/index.ts`                             | Public entry point: `createClient`, re-exports, enum exports                                               |
| `lib/common-types.ts`                      | `MRActions`, `MakeRequest` overloads, `Adapter`, shared param/collection types (~3.6k lines)               |
| `lib/common-utils.ts`                      | Collection wrappers, cursor-pagination normalisation                                                       |
| `lib/create-adapter.ts`                    | Returns a caller-supplied `apiAdapter`, else a new `RestAdapter`                                           |
| `lib/adapters/REST/rest-adapter.ts`        | `RestAdapter`: axios instance, default hosts, CMA content type                                             |
| `lib/adapters/REST/make-request.ts`        | Entity/action → endpoint dispatch                                                                          |
| `lib/adapters/REST/endpoints/`             | 93 modules: one per entity, plus `raw.ts` (HTTP verbs), `http.ts`, `utils.ts`, and the `index.ts` registry |
| `lib/entities/`                            | 91 entity type definitions; older ones also hold `wrap*` and `create*Api` for the legacy client            |
| `lib/plain/`                               | Plain client, its types, `wrap`, iterators and pagination helpers                                          |
| `lib/plain/entities/`                      | 67 per-entity plain API type modules with TSDoc examples, plus `space.test-d.ts`                           |
| `lib/create-*-api.ts`                      | Legacy chained client surfaces                                                                             |
| `lib/methods/`                             | Cross-entity helpers: `action.ts`, `release-action.ts`, `content-type.ts`, `utils.ts`                      |
| `lib/constants/editor-interface-defaults/` | Default control/editor/sidebar widget definitions, exported as `editorInterfaceDefaults`                   |
| `lib/upload-http-client.ts`                | Clones the axios instance against `upload.contentful.com` with a longer timeout                            |
| `lib/export-types.ts`                      | Public type barrel re-exported by `index.ts`                                                               |

## Pluggable adapter

`lib/create-adapter.ts` accepts either `RestAdapterParams` (an `accessToken`,
optional `host`/`hostUpload`) or `AdapterParams` (`{ apiAdapter }`), typed as a
mutually exclusive `XOR` in `ClientOptions`. Anything implementing
`Adapter { makeRequest }` can replace the REST transport.

This is what lets Contentful apps use the SDK without a management token: the
App SDK passes `sdk.cmaAdapter` as `apiAdapter`, and requests are proxied
through the host web app with the app's own permissions (see the App Framework
section of `README.md`). It is also how unit tests avoid the network.

`RestAdapter` itself delegates to `createHttpClient` from `contentful-sdk-core`,
which supplies rate-limit handling and retries; the SDK does not implement
those itself.

## Build

`rollup.config.mjs` emits five outputs from the single input `lib/index.ts`:

| Output                      | Format  | Notes                                               |
| --------------------------- | ------- | --------------------------------------------------- |
| `dist/esm/index.mjs`        | ESM     | `preserveModules`, dependencies external            |
| `dist/cjs/index.cjs`        | CJS     | Single bundle, `interop: 'auto'`                    |
| `dist/types/`               | `.d.ts` | Declarations only                                   |
| `dist/browser/index.js`     | IIFE    | Global `contentfulManagement`, dependencies bundled |
| `dist/browser/index.min.js` | IIFE    | The above, terser-minified                          |

The browser builds deliberately set `external: []` and alias `axios` to its
browser build and `process` to `process/browser`, polyfilling only `util`. The
ESM and CJS builds do not bundle dependencies. `package.json` `exports` gates
the public surface to `.` and `./types`; deep imports into `dist/` are not
supported. Target is ES2021 (`tsconfig.json`), with the supported browser floor
in the `browserslist` field.

## Testing

Vitest, with projects declared in `vitest.workspace.js`:

- `unit` — 122 test files under `test/unit/`, mirroring `lib/`. Hermetic:
  `vitest.setup.unit.ts` mocks `createHttpClient`, and `test/unit/mocks/`
  supplies entity fixtures, an HTTP double, and a `makeRequest` double.
  `test/unit/test-creators/` holds shared assertions for the repeated
  instance/static entity method shapes.
- `types` — `*.test-d.ts` files inside `lib/`, run with `typecheck.enabled`.
- `integration` — 68 test files under `test/integration/` against a real
  Contentful organization; serialised (`maxWorkers: 1`) with long timeouts.
- `output` — `test/output-integration/{node,browser}`, standalone projects that
  consume the build artifacts to prove they actually load. The node project
  installs the package as a `file:` dependency; the browser project copies
  `dist/browser/index.min.js` into a served page and drives it with puppeteer.
- `browser-unit` / `browser-integration` — the same suites under Playwright
  Chromium.

## Release

semantic-release owns versioning. `package.json` keeps the literal version
`0.0.0-determined-by-semantic-release`; the real number is derived from
Conventional Commit messages at publish time, and `CHANGELOG.md` is generated
by `@semantic-release/changelog`.

`.github/workflows/main.yaml` runs `build` → `check` → `test-demo-projects` →
`test-integration` → `release`. `release.yaml` retrieves a GitHub token from
HashiCorp Vault, runs `npm run semantic-release`, and on `master` also runs
`npm run docs:publish` to regenerate the typedoc reference site. Releasable
branches are `master`, `beta` (channel `beta`), `canary`, `dev` (channel
`dev`), and maintenance branches matching `+([0-9])?(.{+([0-9]),x}).x`.

`npm run test:size` enforces a 177 kB budget on `dist/cjs/index.cjs` via
`size-limit`, so bundle growth is a release-blocking signal.
