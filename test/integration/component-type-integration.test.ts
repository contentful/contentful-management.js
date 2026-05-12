import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { testRunId, testViewport, sweepStaleExoEntities } from './utils/exo.utils'

describe('ComponentType Integration', () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  const createdIds: string[] = []

  beforeAll(async () => {
    await sweepStaleExoEntities(client)
  })

  afterAll(async () => {
    for (const id of createdIds) {
      try {
        const latest = await client.componentType.get({ componentTypeId: id })
        if (latest.sys.publishedVersion) {
          await client.componentType.unpublish({
            componentTypeId: id,
            version: latest.sys.version,
          })
        }
        await client.componentType.delete({ componentTypeId: id })
      } catch {
        // entity already deleted or not found
      }
    }

    await timeoutToCalmRateLimiting()
  })

  it('full lifecycle: create → get → update → getMany → publish → unpublish → delete', async () => {
    // --- Create ---
    const created = await client.componentType.create(
      {},
      {
        name: `Integration Test Component ${testRunId}`,
        description: 'Created by integration test',
        viewports: [testViewport],
        contentProperties: [
          { id: 'title', name: 'Title', type: 'String', required: false },
        ],
        designProperties: [
          { id: 'color', name: 'Color', type: 'Symbol', required: false },
        ],
        dimensionKeyMap: { designProperties: {} },
      },
    )
    createdIds.push(created.sys.id)

    expect(created.sys.id).toBeDefined()
    expect(created.sys.type).toBe('ComponentType')
    expect(created.sys.version).toBeGreaterThanOrEqual(1)
    expect(created.sys.createdAt).toBeDefined()
    expect(created.sys.updatedAt).toBeDefined()
    expect(created.sys.createdBy).toBeDefined()
    expect(created.name).toBe(`Integration Test Component ${testRunId}`)

    // --- Get ---
    const fetched = await client.componentType.get({
      componentTypeId: created.sys.id,
    })

    expect(fetched.sys.id).toBe(created.sys.id)
    expect(fetched.sys.type).toBe('ComponentType')
    expect(fetched.contentProperties).toHaveLength(1)
    expect(fetched.designProperties).toHaveLength(1)

    // --- Update ---
    const updated = await client.componentType.update(
      { componentTypeId: fetched.sys.id },
      { ...fetched, name: `Integration Test Component Updated ${testRunId}` },
    )

    expect(updated.name).toBe(`Integration Test Component Updated ${testRunId}`)
    expect(updated.sys.version).toBeGreaterThan(fetched.sys.version)

    // --- GetMany (cursor pagination) ---
    const collection = await client.componentType.getMany({ query: { limit: 10 } })

    expect(collection.sys).toBeDefined()
    expect(collection.pages).toBeDefined()
    expect(collection.items).toBeDefined()
    expect(Array.isArray(collection.items)).toBe(true)
    const found = collection.items.find((item) => item.sys.id === created.sys.id)
    expect(found).toBeDefined()

    // --- Publish ---
    const published = await client.componentType.publish({
      componentTypeId: updated.sys.id,
      version: updated.sys.version,
    })

    expect(published.sys.publishedVersion).toBeDefined()
    expect(published.sys.publishedAt).toBeDefined()

    // --- Unpublish ---
    const unpublished = await client.componentType.unpublish({
      componentTypeId: published.sys.id,
      version: published.sys.version,
    })

    expect(unpublished.sys.publishedVersion).toBeUndefined()

    // --- Delete ---
    await client.componentType.delete({ componentTypeId: unpublished.sys.id })

    await expect(
      client.componentType.get({ componentTypeId: unpublished.sys.id }),
    ).rejects.toThrow()

    // Remove from cleanup since we already deleted
    createdIds.splice(createdIds.indexOf(created.sys.id), 1)
  })
})
