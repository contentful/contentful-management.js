---
title: Getting Started
category: Core
---

# Getting Started

## Plain Client (Recommended)

The plain client provides flat, Promise-based access to all CMA endpoints:

```typescript
import { createClient } from 'contentful-management'

const client = createClient({ accessToken: 'YOUR_ACCESS_TOKEN' })

const entries = await client.entry.getMany({
  spaceId: '<space_id>',
  environmentId: '<environment_id>',
})
```

See {@link plain/plain-client-types!PlainClientAPI | PlainClientAPI} for the full API reference.

## Legacy Client (Deprecated)

The legacy client uses a nested, chained interface:

```typescript
const client = createClient({ accessToken: 'YOUR_ACCESS_TOKEN' }, { type: 'plain' })
// This returns a ClientAPI instance — see createClientApi
```

See [createClientApi](../create-contentful-api/default.html) for the full legacy API reference.
