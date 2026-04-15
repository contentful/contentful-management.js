---
category: Core
---

# Getting Started

`contentful-management` is the official JavaScript SDK for the [Contentful Content Management API (CMA)](https://www.contentful.com/developers/docs/references/content-management-api/). It runs in Node.js and modern browsers, and ships full TypeScript types.

## Installation

```bash
npm install contentful-management
```

## Two Client Styles

The SDK exposes two distinct client styles. **Choose the plain client for all new code.**

| | Plain Client | Legacy Client |
|---|---|---|
| **Style** | Flat, Promise-based | Nested, chainable |
| **Recommended** | ✅ Yes | ❌ No — deprecated since v10 |
| **Entry point** | `createClient({ ...options })` with `plainClient: true` | `createClient({ ...options })` |
| **API surface** | `PlainClientAPI` | `ContentfulClientAPI` → `ContentfulSpaceAPI` → `ContentfulEnvironmentAPI` |
| **Params** | All entity IDs passed as flat objects | Retrieved by calling `.getSpace()` → `.getEnvironment()` → … |

---

## Plain Client (Recommended)

The plain client is a flat, stateless API. Every method accepts all required entity IDs directly — no nested `.getSpace()` calls needed.

### Setup

```typescript
import { createClient } from 'contentful-management'

const client = createClient(
  { accessToken: '<YOUR_CMA_TOKEN>' },
  { type: 'plain', defaults: { spaceId: '<YOUR_SPACE_ID>', environmentId: 'master' } },
)
```

Setting `defaults` lets you omit `spaceId` and `environmentId` from every call. You can still override them per-call.

### Fetch an entry

```typescript
const entry = await client.entry.get({ entryId: '<ENTRY_ID>' })
console.log(entry.fields.title)
```

### Create and publish an entry

```typescript
const contentType = await client.contentType.get({ contentTypeId: 'blogPost' })

const draft = await client.entry.create(
  { contentTypeId: contentType.sys.id },
  {
    fields: {
      title: { 'en-US': 'Hello from the plain client' },
      slug:  { 'en-US': 'hello-plain-client' },
    },
  },
)

const published = await client.entry.publish(
  { entryId: draft.sys.id, version: draft.sys.version },
  draft,
)
console.log('Published:', published.sys.id)
```

### Paginated queries

Most list methods return a `CollectionProp` with `items`, `total`, `skip`, and `limit`. For cursor-based pagination use `getMany` and `getManyWithCursor` on entries:

```typescript
// Page-based (skip/limit)
const page = await client.entry.getMany({
  query: { content_type: 'blogPost', limit: 100, skip: 0 },
})

// Cursor-based (recommended for large result sets)
const firstPage = await client.entry.getManyWithCursor({
  query: { content_type: 'blogPost', limit: 100 },
})

let cursor = firstPage.pages?.next
while (cursor) {
  const nextPage = await client.entry.getManyWithCursor({
    query: { pageNext: cursor, limit: 100 },
  })
  // process nextPage.items …
  cursor = nextPage.pages?.next
}
```

### Upload and process an asset

```typescript
// 1. Create the asset record
const asset = await client.asset.create(
  {},
  {
    fields: {
      title:       { 'en-US': 'My image' },
      description: { 'en-US': 'An example image upload' },
      file: {
        'en-US': {
          contentType: 'image/png',
          fileName: 'example.png',
          upload: 'https://example.com/example.png',
        },
      },
    },
  },
)

// 2. Trigger processing for all locales
const processed = await client.asset.processForAllLocales({ assetId: asset.sys.id })

// 3. Publish
await client.asset.publish(
  { assetId: processed.sys.id, version: processed.sys.version },
  processed,
)
```

---

## Legacy Client (Deprecated)

> **This client style is deprecated.** Existing code using it will continue to work, but no new features are being added. Migrate to the plain client when possible.

The legacy client uses a nested, chainable API. You retrieve a space, then an environment, then individual entities by calling methods on the parent object.

### Setup

```typescript
import { createClient } from 'contentful-management'

const client = createClient({ accessToken: '<YOUR_CMA_TOKEN>' })
```

### Fetch an entry

```typescript
const space       = await client.getSpace('<SPACE_ID>')
const environment = await space.getEnvironment('master')
const entry       = await environment.getEntry('<ENTRY_ID>')
console.log(entry.fields.title)
```

### Create and publish an entry

```typescript
const space       = await client.getSpace('<SPACE_ID>')
const environment = await space.getEnvironment('master')

const entry = await environment.createEntry('blogPost', {
  fields: {
    title: { 'en-US': 'Hello from the legacy client' },
  },
})

await entry.publish()
```

### Full API Reference

| Object | Reference |
|---|---|
| Top-level client | `ContentfulClientAPI` — see the **Legacy Client** sidebar section |
| Space | `ContentfulSpaceAPI` |
| Environment | `ContentfulEnvironmentAPI` |
| Entry (entity) | `EntryApi` |
| Asset (entity) | `AssetApi` |

---

## Error Handling

The SDK throws standard `Error` objects with additional properties set by the HTTP adapter. Check `error.status` (HTTP status code) and `error.message` for details:

```typescript
import { createClient } from 'contentful-management'

const client = createClient(
  { accessToken: '<YOUR_CMA_TOKEN>' },
  { type: 'plain', defaults: { spaceId: '<SPACE_ID>', environmentId: 'master' } },
)

try {
  const entry = await client.entry.get({ entryId: 'does-not-exist' })
} catch (err) {
  if (err.status === 404) {
    console.error('Entry not found')
  } else {
    throw err
  }
}
```

---

## TypeScript

The SDK is written in TypeScript and exports all entity types. Import them directly from `contentful-management`:

```typescript
import { createClient } from 'contentful-management'
import type { EntryProps, AssetProps, PlainClientAPI } from 'contentful-management'
```

See the **Shared Types** section of the sidebar for the full type catalog.

---

## Next Steps

- **PlainClientAPI** — full method listing for the plain client (see sidebar under **Plain Client**)
- **Checks** — `isPublished`, `isDraft`, `isArchived`, and friends (see sidebar under **Plain Client**)
- [Contentful CMA Reference](https://www.contentful.com/developers/docs/references/content-management-api/) — underlying HTTP API docs
- [GitHub repository](https://github.com/contentful/contentful-management.js) — source, issues, changelog
