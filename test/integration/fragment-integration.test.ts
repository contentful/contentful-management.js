import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { testName, testViewport, sweepStaleExoEntities } from './utils/exo.utils'

describe('Fragment Integration', () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  const createdFragmentIds: string[] = []
  const createdComponentTypeIds: string[] = []
  let fragmentId: string
  let componentTypeId: string

  beforeAll(async () => {
    await sweepStaleExoEntities(client)

    const ct = await client.componentType.create(
      {},
      {
        name: testName('CT for Fragment'),
        description: 'Backing component type for fragment integration test',
        viewports: [testViewport],
        contentProperties: [],
        designProperties: [],
        dimensionKeyMap: { designProperties: {} },
      },
    )
    componentTypeId = ct.sys.id
    createdComponentTypeIds.push(componentTypeId)

    await client.componentType.publish({
      componentTypeId: componentTypeId,
      version: ct.sys.version,
    })

    const frag = await client.fragment.create(
      {},
      {
        name: testName('Fragment'),
        description: 'Created by integration test',
        componentTypeId: componentTypeId,
        viewports: [testViewport],
        designProperties: {},
        dimensionKeyMap: { designProperties: {} },
      },
    )
    fragmentId = frag.sys.id
    createdFragmentIds.push(fragmentId)
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

  it('creates a fragment with correct sys fields', async () => {
    const frag = await client.fragment.get({ fragmentId: fragmentId })

    expect(frag.sys.id).toBeDefined()
    expect(frag.sys.type).toBe('Fragment')
    expect(frag.sys.version).toBeGreaterThanOrEqual(1)
    expect(frag.sys.createdAt).toBeDefined()
    expect(frag.sys.updatedAt).toBeDefined()
    expect(frag.sys.createdBy).toBeDefined()
    expect(frag.sys.componentType).toBeDefined()
    expect(frag.sys.componentType.sys.id).toBe(componentTypeId)
    expect(frag.name).toBe(testName('Fragment'))
  })

  it('gets a fragment by ID', async () => {
    const fetched = await client.fragment.get({ fragmentId: fragmentId })

    expect(fetched.sys.id).toBe(fragmentId)
    expect(fetched.sys.type).toBe('Fragment')
  })

  it('updates a fragment', async () => {
    const current = await client.fragment.get({ fragmentId: fragmentId })

    const updated = await client.fragment.update(
      { fragmentId: fragmentId },
      {
        ...current,
        sys: { id: current.sys.id, type: 'Fragment' as const, version: current.sys.version },
        componentTypeId: componentTypeId,
        name: testName('Fragment Updated'),
      },
    )

    expect(updated.name).toBe(testName('Fragment Updated'))
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
  })

  it('lists fragments with cursor pagination', async () => {
    const collection = await client.fragment.getMany({ query: { limit: 10 } })

    expect(collection.sys).toBeDefined()
    expect(collection.pages).toBeDefined()
    expect(collection.items).toBeDefined()
    expect(Array.isArray(collection.items)).toBe(true)

    const found = collection.items.find((item) => item.sys.id === fragmentId)
    expect(found).toBeDefined()
  })

  it('publishes a fragment', async () => {
    const current = await client.fragment.get({ fragmentId: fragmentId })

    const published = await client.fragment.publish({
      fragmentId: fragmentId,
      version: current.sys.version,
    })

    expect(published.sys.publishedVersion).toBeDefined()
    expect(published.sys.publishedAt).toBeDefined()
  })

  it('unpublishes a fragment', async () => {
    const current = await client.fragment.get({ fragmentId: fragmentId })

    const unpublished = await client.fragment.unpublish({
      fragmentId: fragmentId,
      version: current.sys.version,
    })

    expect(unpublished.sys.publishedVersion).toBeUndefined()
  })

  it('deletes a fragment', async () => {
    const current = await client.fragment.get({ fragmentId: fragmentId })
    expect(current.sys.publishedVersion).toBeUndefined()

    await client.fragment.delete({ fragmentId: fragmentId })

    await expect(client.fragment.get({ fragmentId: fragmentId })).rejects.toThrow()

    createdFragmentIds.splice(createdFragmentIds.indexOf(fragmentId), 1)
  })
})
