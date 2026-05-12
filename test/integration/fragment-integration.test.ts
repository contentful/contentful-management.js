import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { testRunId, testViewport, sweepStaleExoEntities } from './utils/exo.utils'

describe('Fragment Integration', () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  const createdFragmentIds: string[] = []
  const createdComponentTypeIds: string[] = []

  beforeAll(async () => {
    await sweepStaleExoEntities(client)
  })

  afterAll(async () => {
    for (const id of createdFragmentIds) {
      try {
        const latest = await client.fragment.get({ fragmentId: id })
        if (latest.sys.publishedVersion) {
          await client.fragment.unpublish({
            fragmentId: id,
            version: latest.sys.version,
          })
        }
        await client.fragment.delete({ fragmentId: id })
      } catch {
        // entity already deleted or not found
      }
    }

    for (const id of createdComponentTypeIds) {
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
    // --- Setup: create and publish a backing ComponentType ---
    let ct = await client.componentType.create(
      {},
      {
        name: `${testRunId} CT for Fragment`,
        description: 'Backing component type for fragment integration test',
        viewports: [testViewport],
        contentProperties: [],
        designProperties: [],
        dimensionKeyMap: { designProperties: {} },
      },
    )
    createdComponentTypeIds.push(ct.sys.id)

    ct = await client.componentType.publish({
      componentTypeId: ct.sys.id,
      version: ct.sys.version,
    })

    // --- Create ---
    const created = await client.fragment.create(
      {},
      {
        name: `${testRunId} Fragment`,
        description: 'Created by integration test',
        componentTypeId: ct.sys.id,
        viewports: [testViewport],
        designProperties: {},
        dimensionKeyMap: { designProperties: {} },
      },
    )
    createdFragmentIds.push(created.sys.id)

    expect(created.sys.id).toBeDefined()
    expect(created.sys.type).toBe('Fragment')
    expect(created.sys.version).toBeGreaterThanOrEqual(1)
    expect(created.sys.createdAt).toBeDefined()
    expect(created.sys.createdBy).toBeDefined()
    expect(created.sys.componentType).toBeDefined()
    expect(created.sys.componentType.sys.id).toBe(ct.sys.id)
    expect(created.name).toBe(`${testRunId} Fragment`)

    // --- Get ---
    const fetched = await client.fragment.get({ fragmentId: created.sys.id })

    expect(fetched.sys.id).toBe(created.sys.id)
    expect(fetched.sys.type).toBe('Fragment')

    // --- Update ---
    const updated = await client.fragment.update(
      { fragmentId: fetched.sys.id },
      {
        ...fetched,
        sys: { id: fetched.sys.id, type: 'Fragment' as const, version: fetched.sys.version },
        componentTypeId: ct.sys.id,
        name: `${testRunId} Fragment Updated`,
      },
    )

    expect(updated.name).toBe(`${testRunId} Fragment Updated`)
    expect(updated.sys.version).toBeGreaterThan(fetched.sys.version)

    // --- GetMany (cursor pagination) ---
    const collection = await client.fragment.getMany({ query: { limit: 10 } })

    expect(collection.sys).toBeDefined()
    expect(collection.pages).toBeDefined()
    expect(collection.items).toBeDefined()
    expect(Array.isArray(collection.items)).toBe(true)
    const found = collection.items.find((item) => item.sys.id === created.sys.id)
    expect(found).toBeDefined()

    // --- Publish ---
    const published = await client.fragment.publish({
      fragmentId: updated.sys.id,
      version: updated.sys.version,
    })

    expect(published.sys.publishedVersion).toBeDefined()
    expect(published.sys.publishedAt).toBeDefined()

    // --- Unpublish ---
    const unpublished = await client.fragment.unpublish({
      fragmentId: published.sys.id,
      version: published.sys.version,
    })

    expect(unpublished.sys.publishedVersion).toBeUndefined()

    // --- Delete ---
    await client.fragment.delete({ fragmentId: unpublished.sys.id })

    await expect(
      client.fragment.get({ fragmentId: unpublished.sys.id }),
    ).rejects.toThrow()

    createdFragmentIds.splice(createdFragmentIds.indexOf(created.sys.id), 1)
  })
})
