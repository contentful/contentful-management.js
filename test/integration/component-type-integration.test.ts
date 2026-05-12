import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { testName, testViewport, sweepStaleExoEntities } from './utils/exo.utils'

describe('ComponentType Integration', () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  const createdIds: string[] = []
  let componentTypeId: string

  beforeAll(async () => {
    await sweepStaleExoEntities(client)

    const created = await client.componentType.create(
      {},
      {
        name: testName('Component'),
        description: 'Created by integration test',
        viewports: [testViewport],
        contentProperties: [{ id: 'title', name: 'Title', type: 'String', required: false }],
        designProperties: [{ id: 'color', name: 'Color', type: 'Symbol', required: false }],
        dimensionKeyMap: { designProperties: {} },
      },
    )
    componentTypeId = created.sys.id
    createdIds.push(componentTypeId)
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

  it('creates a component type with correct sys fields', async () => {
    const ct = await client.componentType.get({ componentTypeId: componentTypeId })

    expect(ct.sys.id).toBeDefined()
    expect(ct.sys.type).toBe('ComponentType')
    expect(ct.sys.version).toBeGreaterThanOrEqual(1)
    expect(ct.sys.createdAt).toBeDefined()
    expect(ct.sys.updatedAt).toBeDefined()
    expect(ct.sys.createdBy).toBeDefined()
    expect(ct.name).toBe(testName('Component'))
    expect(ct.description).toBe('Created by integration test')
  })

  it('gets a component type by ID', async () => {
    const fetched = await client.componentType.get({ componentTypeId: componentTypeId })

    expect(fetched.sys.id).toBe(componentTypeId)
    expect(fetched.sys.type).toBe('ComponentType')
    expect(fetched.contentProperties).toHaveLength(1)
    expect(fetched.designProperties).toHaveLength(1)
  })

  it('updates a component type', async () => {
    const current = await client.componentType.get({ componentTypeId: componentTypeId })

    const updated = await client.componentType.update(
      { componentTypeId: componentTypeId },
      { ...current, name: testName('Component Updated') },
    )

    expect(updated.name).toBe(testName('Component Updated'))
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
  })

  it('lists component types with cursor pagination', async () => {
    const collection = await client.componentType.getMany({ query: { limit: 10 } })

    expect(collection.sys).toBeDefined()
    expect(collection.pages).toBeDefined()
    expect(collection.items).toBeDefined()
    expect(Array.isArray(collection.items)).toBe(true)

    const found = collection.items.find((item) => item.sys.id === componentTypeId)
    expect(found).toBeDefined()
  })

  it('publishes a component type', async () => {
    const current = await client.componentType.get({ componentTypeId: componentTypeId })

    const published = await client.componentType.publish({
      componentTypeId: componentTypeId,
      version: current.sys.version,
    })

    expect(published.sys.publishedVersion).toBeDefined()
    expect(published.sys.publishedAt).toBeDefined()
  })

  it('unpublishes a component type', async () => {
    const current = await client.componentType.get({ componentTypeId: componentTypeId })

    const unpublished = await client.componentType.unpublish({
      componentTypeId: componentTypeId,
      version: current.sys.version,
    })

    expect(unpublished.sys.publishedVersion).toBeUndefined()
  })

  it('deletes a component type', async () => {
    const current = await client.componentType.get({ componentTypeId: componentTypeId })
    expect(current.sys.publishedVersion).toBeUndefined()

    await client.componentType.delete({ componentTypeId: componentTypeId })

    await expect(client.componentType.get({ componentTypeId: componentTypeId })).rejects.toThrow()

    createdIds.splice(createdIds.indexOf(componentTypeId), 1)
  })
})
