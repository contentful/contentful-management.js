# HTTP Adapter Pattern (`apiAdapter`)

## Status

Accepted

## Context

The library needs to issue HTTP requests to the CMA from many different runtime contexts:

- Plain Node.js / browser (axios over network)
- Inside the Contentful App SDK (proxied through the parent frame)
- Inside the UI Extensions SDK
- Custom transports (testing, recording, intercepting, edge runtimes that lack `XMLHttpRequest`)

Originally, transport was hardcoded to a single axios instance. Adding new contexts required forking the SDK or monkey-patching internals, and the App SDK / Extensions SDK teams maintained brittle wrappers.

## Decision

All HTTP traffic flows through an **`Adapter` interface** (`lib/common-types.ts`). `createClient()` accepts either:

- `RestAdapterParams` — the default path that constructs an internal `RestAdapter` (`lib/adapters/REST/rest-adapter.ts`) backed by axios, or
- `AdapterParams` — a caller-supplied `apiAdapter` that implements `Adapter['makeRequest']`

The dispatch lives in `lib/create-adapter.ts`:

```ts
export function createAdapter(params: RestAdapterParams | AdapterParams): Adapter {
  if ('apiAdapter' in params) {
    return params.apiAdapter
  } else {
    return new RestAdapter(params)
  }
}
```

The adapter receives a typed `entityType` + `action` pair plus params, and returns the entity payload. Entity wrappers are layered on top in `lib/plain/plain-client.ts` and the legacy nested client.

Custom adapters may also return `ReadableStream` for streaming endpoints (commit `9065921dc`, EXT-6173).

## Consequences

- **Enables:** App SDK / Extensions SDK / Live Preview / test harnesses to plug in without forking the SDK; streaming endpoints; recording/replay tooling
- **Prevents:** transport concerns from leaking into entity logic
- **Trade-off:** the `Adapter` type is part of the public API surface — changes to the request/response contract are breaking for adapter implementers
- **Invariant:** entity methods must never call axios directly; all network I/O goes through the adapter

Source: `lib/create-adapter.ts`, `lib/adapters/REST/rest-adapter.ts`, PR #1984 (`feat: use a single axios instance`), PR #2350 (`feat: support axios 'fetch' adapter`), commit `9065921dc` (streaming support).
