# TypeDoc Annotation Guide

This document explains how JSDoc annotations work in this repo and what conventions to follow when adding or editing documentation comments.

---

## How documentation is generated

We use [TypeDoc 0.28](https://typedoc.org/) to generate the API reference from JSDoc comments in the TypeScript source. The configuration lives in `typedoc.config.mjs` at the repo root. To build locally:

```bash
npm run build:docs   # output goes to ./out
npx serve out        # preview at http://localhost:3000
```

---

## The `@internal` tag

```ts
/** @internal */
export type GetEntryParams = GetSpaceEnvironmentParams & { entryId: string }
```

`@internal` marks a symbol as **excluded from the generated docs**. Because we set `excludeInternal: true` in `typedoc.config.mjs`, TypeDoc will not render any symbol tagged `@internal`, even if it is exported from a module.

**Use `@internal` when:**
- The symbol is exported only because TypeScript requires it (e.g. a params type used across multiple files)
- The symbol is a factory function or wrapper utility not meant for SDK consumers (`createAssetApi`, `wrapEntry`, etc.)
- The symbol is a helper type internal to the plain client machinery (`OptionalDefaults` is an exception — it's public API)

**Do not use `@internal` when:**
- The type appears in a public method signature that users will encounter (e.g. `EntryProps`, `AssetProps`)
- The symbol is something a user would want to import directly

**`@internal` vs `@private`:** Use `@internal` for exported-but-internal symbols. Use `@private` (or just make it `private`) for class members that are not exported at all. The distinction matters because TypeDoc handles them differently: `@internal` + `excludeInternal: true` fully removes the symbol; `@private` + `excludePrivate: true` only hides class-level members.

---

## Module-level annotations

Every entry-point file should have a module-level comment block at the very top (before any imports):

```ts
/**
 * Brief description of what this module contains.
 * @module module-name        ← sets the display name in the sidebar
 * @category Plain Client     ← controls which sidebar section it appears under
 */
```

**`@module`** sets the human-readable name TypeDoc uses for the module page title and sidebar entry. Without it, TypeDoc derives the name from the file path (e.g. `plain/entities/entry`), which is ugly.

**`@category`** controls the top-level sidebar grouping. The valid categories, in sidebar order, are:

| Category | Used for |
|---|---|
| `Core` | `lib/index.ts` and top-level docs |
| `Plain Client` | `lib/plain/` files and `lib/plain/entities/` |
| `Legacy Client` | `lib/create-*-api.ts` and `lib/entities/` wrapper files |
| `Shared Types` | `lib/entities/` files that are purely data shapes with no legacy wrapper |

---

## Documenting plain entity methods

Plain entity API types live in `lib/plain/entities/*.ts`. Each file exports one `*API` type (e.g. `EntryAPI`) containing the method signatures for that resource.

Every method should have:

```ts
export type EntryAPI = {
  /**
   * One-line summary — used as the method description in the sidebar listing.
   *
   * Longer explanation if needed. This paragraph is not shown in summaries.
   *
   * @param params - The space, environment, and entry IDs. `spaceId` and
   *   `environmentId` can be omitted if set as `defaults` on the client.
   * @returns The requested entry.
   * @throws if the request fails, or the entry is not found.
   * @example
   * ```typescript
   * const entry = await client.entry.get({ entryId: '<entry_id>' })
   * ```
   */
  get(params: OptionalDefaults<GetEntryParams>): Promise<EntryProps>
}
```

**Rules:**

- **First line is the summary.** TypeDoc (`useFirstParagraphOfCommentAsSummary: true`) uses the first paragraph as the short description shown in index listings. Keep it to one sentence.
- **`@example` code fence on its own line.** TypeDoc 0.28 treats the first line after `@example` as an example title. The code fence must be on the next line, not inline:
  ```ts
  // ✅ correct
  * @example
  * ```typescript

  // ❌ wrong — "```typescript" becomes the title
  * @example ```typescript
  ```
- **`@param` name must match the TypeScript parameter name exactly** (including capitalisation). A mismatch produces a TypeDoc warning.
- **No `@description`, `@func`, or `@memberof` tags.** These are JSDoc 3 tags that TypeDoc does not recognise. Just write the description as plain text before the block tags.
- **`@returns` without a type.** TypeDoc infers the return type from the TypeScript signature; adding `@returns {Promise<EntryProps>}` is redundant and can produce warnings.

---

## Documenting legacy entity methods

Legacy (chainable) entity methods live in `lib/entities/*.ts`. The same rules above apply, with one addition: methods that are exposed on chainable entity instances (e.g. `entry.publish()`) should also include a `@deprecated` tag pointing to the equivalent plain client method:

```ts
/**
 * Publishes the entry.
 * @deprecated Use {@link EntryAPI.publish} via the plain client instead.
 * @example
 * ```javascript
 * await entry.publish()
 * ```
 */
publish(): Promise<Entry>
```

---

## Deprecation

To soft-deprecate an entire module (e.g. a legacy `create-*-api.ts` file):

```ts
/**
 * @module create-space-api
 * @category Legacy Client
 * @deprecated Use the plain client ({@link PlainClientAPI}) instead.
 */
```

TypeDoc renders a deprecation banner at the top of the module page.

---

## What PR #2827 established

[contentful/contentful-management.js#2827](https://github.com/contentful/contentful-management.js/pull/2827) (merged March 2026) laid the groundwork for clean docs generation. Key conventions it introduced that are now in effect:

- ~80 internal `*Params` types in `common-types.ts` are tagged `@internal` so they don't pollute the generated docs
- `DefaultParams` was renamed to `PlainClientDefaultParams` to avoid confusion
- `OptionalDefaults` had its incorrect `@private` tag removed — it is public API
- The `create-*-api.ts` files were standardised with `@internal` on factory functions
- `@private` is now only used for non-exported class members; `@internal` is used for exported-but-internal symbols

These conventions are already reflected in the codebase. Follow them when adding new code.
