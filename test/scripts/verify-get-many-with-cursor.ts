import { version } from '../../package.json'
;(globalThis as any).__VERSION__ = version

import { createClient } from '../../lib/index'

const accessToken = process.env.CONTENTFUL_INTEGRATION_TEST_CMA_TOKEN
if (!accessToken) {
  throw new Error('CONTENTFUL_INTEGRATION_TEST_CMA_TOKEN is required')
}

const spaceId = process.env.SPACE_ID
const environmentId = process.env.ENVIRONMENT_ID ?? 'master'

if (!spaceId) {
  throw new Error('SPACE_ID environment variable is required')
}

const client = createClient(
  { accessToken },
  { type: 'plain', defaults: { spaceId, environmentId } },
)

;(async () => {
  console.log(`Verifying getManyWithCursor for space ${spaceId} (env: ${environmentId})\n`)

  // --- Entry ---
  try {
    console.log('--- entry.getManyWithCursor ---')
    const page1 = await client.entry.getManyWithCursor({ query: { limit: 3 } })
    console.log(`Page 1: ${page1.items.length} items, pages.next=${page1.pages?.next ?? 'none'}`)

    if (page1.pages?.next) {
      const page2 = await client.entry.getManyWithCursor({
        query: { pageNext: page1.pages.next, limit: 3 },
      })
      console.log(`Page 2: ${page2.items.length} items, pages.next=${page2.pages?.next ?? 'none'}`)
    }
    console.log('entry.getManyWithCursor ✓\n')
  } catch (error) {
    console.error('entry.getManyWithCursor FAILED:', error)
    process.exit(1)
  }

  // --- Asset ---
  try {
    console.log('--- asset.getManyWithCursor ---')
    const page1 = await client.asset.getManyWithCursor({ query: { limit: 3 } })
    console.log(`Page 1: ${page1.items.length} items, pages.next=${page1.pages?.next ?? 'none'}`)

    if (page1.pages?.next) {
      const page2 = await client.asset.getManyWithCursor({
        query: { pageNext: page1.pages.next, limit: 3 },
      })
      console.log(`Page 2: ${page2.items.length} items, pages.next=${page2.pages?.next ?? 'none'}`)
    }
    console.log('asset.getManyWithCursor ✓\n')
  } catch (error) {
    console.error('asset.getManyWithCursor FAILED:', error)
    process.exit(1)
  }

  // --- ContentType ---
  try {
    console.log('--- contentType.getManyWithCursor ---')
    const page1 = await client.contentType.getManyWithCursor({ query: { limit: 3 } })
    console.log(`Page 1: ${page1.items.length} items, pages.next=${page1.pages?.next ?? 'none'}`)

    if (page1.pages?.next) {
      const page2 = await client.contentType.getManyWithCursor({
        query: { pageNext: page1.pages.next, limit: 3 },
      })
      console.log(`Page 2: ${page2.items.length} items, pages.next=${page2.pages?.next ?? 'none'}`)
    }
    console.log('contentType.getManyWithCursor ✓\n')
  } catch (error) {
    console.error('contentType.getManyWithCursor FAILED:', error)
    process.exit(1)
  }

  console.log('All getManyWithCursor endpoints verified ✓')
})()
