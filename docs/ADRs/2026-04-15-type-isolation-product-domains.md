# Type Isolation for New Product Domains

## Status

Accepted

## Context

The CMA SDK historically reused shared collection and pagination types (`CursorPaginatedCollectionProp<T>`, `CollectionProp<T>`, `MetadataProps`) across all entities. As ExO matured, its endpoints diverged from the shared shape:

- ExO collection responses include product-specific fields (e.g., total semantics differ; cursor format is upstream-specific)
- ExO `metadata` shape (concepts, tags, taxonomy) extends but is not identical to the core CMS metadata
- Forcing ExO into the shared types either bloats the shared types with optional fields no other endpoint uses, or weakens the type guarantees for non-ExO consumers

A first attempt (DX-1000, commit `ff61106fd`) added `total?` as optional to the shared `CursorPaginatedCollectionProp` to accommodate ExO. This worked but pushed ExO concerns into the shared layer.

## Decision

When a new product domain diverges meaningfully from shared types, **introduce a dedicated subtype rather than relaxing the shared type**.

Established precedents:

- `ExoCursorPaginatedCollectionProp<T>` (DX-1016, PR #3020) — split off the shared `CursorPaginatedCollectionProp` for the ~18 ExO endpoints. The shared type stays tight; ExO has its own surface.
- `ExoMetadataProps` (DX-908, PR #2991) and the further split into `ExperienceMetadataProps` (DX-987, PR #3008) — base + specialized metadata types for ExO entities.

Conventions:

- Naming: `<Domain><SharedTypeName>` (e.g., `Exo*`)
- Location: in `lib/entities/<entity>.ts` or a domain-specific module under `lib/entities/`
- The subtype may extend the shared type, but should not require shared consumers to know about it

When to apply: any time a new endpoint or product surface needs more than one or two genuinely-shared optional fields added to a shared type, prefer a subtype.

## Consequences

- **Enables:** strong typing per domain; shared types stay narrow; consumers of non-ExO endpoints don't see ExO-only fields
- **Prevents:** "shared types as junk drawer" anti-pattern where every product's optional fields accumulate
- **Trade-off:** more types to maintain; helpers that operate on collections must be generic over both shapes (e.g., `pagination-helper.ts`)
- **Pattern for future products:** Studio, Personalization, future product surfaces should follow this convention from day one rather than retrofitting

Source: PR #3020 (DX-1016 — `ExoCursorPaginatedCollectionProp`), PR #2991 (DX-908 — `ExoMetadataProps`), PR #3008 (DX-987 — `ExperienceMetadataProps`), commit `ff61106fd` (DX-1000 — earlier shared-type relaxation that motivated the split).
