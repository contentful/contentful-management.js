# Cursor-Based Pagination for Collection Endpoints

## Status

Accepted

## Context

The CMA originally exposed only offset-based pagination (`skip` + `limit`) on collection endpoints. As spaces grew into the millions of entries and as new product surfaces (ExO, automations) shipped, offset pagination became a problem:

- `skip` past ~10k items hits database performance cliffs
- Results shift under concurrent writes — items can be skipped or duplicated between pages
- `total` counts are expensive to compute on large collections
- Several upstream endpoints (ExO Component Types, Templates, published entities) ship with cursor pagination only

A first attempt to add typed cursor support was reverted (`0e448945c`, CAPI-2270) because the type changes broke existing offset consumers.

## Decision

Add **dedicated cursor-paginated methods** that live alongside the offset versions rather than replacing them. The `pagination-helper.ts` module (`lib/plain/pagination-helper.ts`) and `as-iterator.ts` provide shared traversal primitives.

Naming convention:

- Offset (existing): `entry.getMany`, `asset.getMany`, etc.
- Cursor (new): `entry.getManyWithCursor`, `asset.getManyWithCursor`, `entry.getPublishedWithCursor`, etc.

Type hierarchy:

- `CursorPaginatedCollectionProp<T>` — generic cursor collection shape, with a later-added optional `total?` field to align with upstream ExO behavior (DX-1000)
- `ExoCursorPaginatedCollectionProp<T>` — ExO-specific subtype that diverges from the shared shape (see ADR `2026-04-15-type-isolation-product-domains.md`)

Endpoints that ship with cursor pagination only (Component Types, Templates, Experiences, published entities) use `*WithCursor` as the sole method.

## Consequences

- **Enables:** stable iteration across very large collections, alignment with upstream ExO contracts, no breaking change for offset consumers
- **Prevents:** silent data corruption from offset drift on growing collections
- **Trade-off:** two parallel surfaces (offset + cursor) — contributors must add both for general-purpose endpoints
- **Migration guidance:** new endpoints default to cursor-only unless the upstream API still ships offset

Source: PR #2824 (CAPI-2357 — initial cursor methods), PR #2850 (CAPI-2387 — published entities), PR #2956 (DX-805 — Component Types switch), `lib/plain/pagination-helper.ts`, `lib/plain/as-iterator.ts`.
