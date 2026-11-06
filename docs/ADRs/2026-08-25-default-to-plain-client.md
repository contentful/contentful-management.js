# Default `createClient` to the plain client and deprecate the chained client

- **Date:** 2026-08-25
- **Status:** Accepted — shipped in v12
- **Evidence:**
  - commit `84a3431` — "feat!: v12 major release [DX-455]" (PR #2936), which
    contains the sub-commits "chore: deprecate waterfall client [DX-674]"
    (PR #2865) and "feat!: Default to plain client instead of waterfall client
    [DX-690]" (PR #2867)
  - current state of `lib/index.ts`
  - `MIGRATION.md`, section "Default client changed from nested to plain"
  - `README.md`, section "Legacy Client Interface"

> This record was written on 2026-08-25 from the commit history and the
> shipped code. It documents an existing decision rather than a new one. The
> rationale below is drawn from the migration guide, the README, and the code
> itself; it is a reconstruction, not a contemporaneous account.

## Context

The SDK has carried two client surfaces since before v12:

- The **chained** client (called "nested", "legacy", or "waterfall" in
  different places in the repo) reads and writes as a sequence of nested
  requests — `client.getSpace(id)` → `space.getEnvironment(id)` →
  `environment.getEntries()`. Each returned object is an entity carrying its
  own methods, attached via `lib/enhance-with-methods.ts`.
- The **plain** client exposes one flat namespace,
  `client.<entity>.<action>(params)`, returning plain JSON objects. It is built
  declaratively in `lib/plain/plain-client.ts` on top of
  `lib/plain/wrappers/wrap.ts`, and typed from the `MRActions` map in
  `lib/common-types.ts`.

Both surfaces sit on the same `makeRequest` waist and the same
`lib/adapters/REST/endpoints/` modules, so the difference is ergonomics and
types, not transport.

Keeping both as first-class options had costs the repo can still show:

- Reaching a nested resource required awaiting intermediate requests the caller
  did not want. The README states the plain client's benefit as "the ability to
  reach any possible CMA endpoint without the necessity to call any async
  functions beforehand", and calls that out as especially important for
  non-linear code such as front-end applications.
- Chained-client results are entity objects with non-enumerable methods, so
  serialising them cleanly needs `toPlainObject`. Plain-client results are
  already plain data.
- Only the plain client can be scoped at construction time via `defaults`
  (`spaceId`, `environmentId`, `organizationId`, …), applied by `wrap`.
- Every new entity had to be wired into two surfaces. The chained client needs
  a `wrap*`/`create*Api` pair in `lib/entities/` plus placement in the right
  `lib/create-*-api.ts` scope; the plain client needs one line per action.
- `@contentful/app-sdk@4` integration assumes the plain shape: apps pass
  `sdk.cmaAdapter` as `apiAdapter` together with `defaults`.

v12 was already a breaking release (ESM/CJS rebuild, Node 20 floor, ES2021
target), which made it the point at which the default could be changed without
an extra major.

## Decision

1. `createClient(options)` and `createClient(options, { type: 'plain' })`
   return `PlainClientAPI`. The plain client is the default.
2. The chained client is available only by explicitly passing
   `{ type: 'legacy' }`. That overload is marked `@deprecated` in `lib/index.ts`
   and logs a `console.warn` on construction stating it will be removed in the
   next major version.
3. The two surfaces are distinguishable in telemetry: the
   `X-Contentful-User-Agent` header reports `contentful-management-plain.js`
   for the plain client and `contentful-management.js` for the legacy one.
4. New CMA endpoints are added to the plain client. The chained client is not
   extended as a matter of course — see Consequences for the exceptions that
   have landed since.

## Consequences

- Existing code calling `createClient({ accessToken })` and expecting nested
  entity objects breaks on upgrade to v12 and must pass `{ type: 'legacy' }`.
  This is documented in `MIGRATION.md` under "Default client changed from
  nested to plain", alongside the related renames (`DefaultParams` →
  `PlainClientDefaultParams`, removal of `ClientParams`).
- Consumers pinned to the chained client have a bounded runway: it is scheduled
  for removal in the next major, and every legacy client construction emits a
  console warning until then.
- The two surfaces have already diverged, though not uniformly. The
  Experiences (ExO) entity family added after v12 — component types,
  experiences, experience fragments, experience templates, fragments, data
  assemblies, design tokens (commits `f3eaed9`, `3b36240`, `cc86f6f`) — is
  plain-only: e.g. `lib/entities/design-token.ts` is types-only, with no
  `wrap*` or `create*Api` helper, and `designToken` appears in
  `lib/plain/plain-client.ts` but in none of the `lib/create-*-api.ts` files.
  Other post-v12 additions were still wired into both surfaces, such as space
  add-ons (`2f94b76`, which touches `lib/create-organization-api.ts`). So
  "use the legacy client" is not a general escape hatch — coverage there
  depends on the entity, and newer ExO endpoints are not reachable from it at
  all.
- Adding an endpoint is now a single-surface change, which is why the checklist
  in `AGENTS.md` describes only the plain path.
- The chained-client machinery (`lib/create-*-api.ts`, `enhance-with-methods.ts`,
  and the `wrap*`/`create*Api` halves of `lib/entities/`) still ships in the
  bundle and still counts against the 177 kB `size-limit` budget on
  `dist/cjs/index.cjs`. Removing it in the next major will shrink the shipped
  bundle.
