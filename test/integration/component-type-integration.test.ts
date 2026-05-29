import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { testName, testViewport, sweepStaleExoEntities } from './utils/exo.utils'

describe('ComponentType Integration', { sequential: true }, () => {
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
        designProperties: [{ id: 'color', name: 'Color', type: 'String' }],
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

  it('has correct sys fields after creation', async () => {
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

  it('upserts a component type', async () => {
    const current = await client.componentType.get({ componentTypeId: componentTypeId })

    const { sys, ...body } = current
    const updated = await client.componentType.upsert(
      { componentTypeId: componentTypeId },
      {
        sys: { id: sys.id, type: 'ComponentType', version: sys.version },
        ...body,
        name: testName('Component Updated'),
      },
    )

    expect(updated.name).toBe(testName('Component Updated'))
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
  })

  it('lists component types with cursor pagination', async () => {
    const collection = await client.componentType.getMany({ query: { limit: 10 } })

    expect(collection.items.length).toBeGreaterThanOrEqual(1)
    expect(collection.pages).toBeDefined()

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

  it('rejects creation with missing required fields', async () => {
    await expect(
      client.componentType.create({}, {
        description: 'Should fail — missing name and viewports',
        contentProperties: [],
        designProperties: [],
        dimensionKeyMap: { designProperties: {} },
      } as any),
    ).rejects.toThrow()
  })

  it('rejects delete on a published entity', async () => {
    const current = await client.componentType.get({ componentTypeId: componentTypeId })
    if (!current.sys.publishedVersion) {
      await client.componentType.publish({
        componentTypeId: componentTypeId,
        version: current.sys.version,
      })
    }

    await expect(
      client.componentType.delete({ componentTypeId: componentTypeId }),
    ).rejects.toThrow()

    const latest = await client.componentType.get({ componentTypeId: componentTypeId })
    await client.componentType.unpublish({
      componentTypeId: componentTypeId,
      version: latest.sys.version,
    })
  })

  it('deletes a component type', async () => {
    const current = await client.componentType.get({ componentTypeId: componentTypeId })
    expect(current.sys.publishedVersion).toBeUndefined()

    await client.componentType.delete({ componentTypeId: componentTypeId })

    await expect(client.componentType.get({ componentTypeId: componentTypeId })).rejects.toThrow()

    const idx = createdIds.indexOf(componentTypeId)
    if (idx !== -1) createdIds.splice(idx, 1)
  })
})
