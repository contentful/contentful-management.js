# Resource/Entity Folder Pattern

## Status

Accepted

## Context

The CMA exposes ~80 entity types (Entry, Asset, ContentType, Tag, AppDefinition, AppInstallation, Release, Workflow, ComponentType, …). Each entity has a defined set of operations (get, getMany, create, update, patch, delete, publish/unpublish, archive/unarchive, etc.) plus type definitions and wrappers.

Without a strict organizational pattern, contributors invent their own structure per entity, leading to:

- Inconsistent file naming (`entry-helpers.ts` vs `entryUtils.ts` vs inline)
- Operations duplicated across plain and waterfall surfaces with subtle drift
- Difficulty generating documentation or running cross-entity refactors
- Friction onboarding new contributors (every entity looks different)

## Decision

All entity code follows a parallel two-tree layout:

```
lib/
  entities/                 # type definitions + wrapped (waterfall) entities
    entry.ts                # EntryProps, Entry, wrapEntry, wrapEntryCollection, EntryMetadata
    asset.ts
    content-type.ts
    ...
  plain/
    entities/               # plain client method implementations per entity
      entry.ts              # EntryPlainClientAPI: get, getMany, getPublished, ...
      asset.ts
      content-type.ts
      ...
    plain-client.ts         # composes all plain entity APIs into PlainClientAPI
    plain-client-types.ts   # shared types (PlainClientDefaultParams, etc.)
    wrappers/               # internal helpers for plain-client method bodies
```

Conventions:

- **One file per entity** in each tree. No grouping ("entities/auth/*"), no sharding.
- **File name = kebab-case of entity** (`content-type.ts`, not `ContentType.ts` or `contentType.ts`).
- **`lib/entities/<entity>.ts` exports types** (`<Entity>Props`, `<Entity>`) and the legacy/waterfall wrap functions.
- **`lib/plain/entities/<entity>.ts` exports the plain method implementations** as an object; these are composed into `PlainClientAPI` in `plain-client.ts`.
- **Adapter dispatch** (`lib/adapters/REST/endpoints/<entity>.ts`) mirrors the same structure on the transport side.

Adding a new entity = one file in each of three places, plus exports. PR #370 (`chore: spread plain endpoints into distinct files`) established the spread pattern; later entity additions consistently follow it.

## Consequences

- **Enables:** predictable contributor experience; easy to grep ("where do I add a method on Entry?"); doc generation; cross-entity refactors via codemod
- **Prevents:** organizational drift; duplicated entity logic across surfaces
- **Trade-off:** lots of small files (83 files in `lib/entities/`, 59 in `lib/plain/entities/`); rename refactors touch many places
- **Invariant:** an entity's plain methods, wrap functions, types, and REST endpoints are findable by name in known locations — never inline or in shared "utils"

Source: `lib/entities/`, `lib/plain/entities/`, `lib/adapters/REST/endpoints/`, PR #370 (plain endpoints split).
