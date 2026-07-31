import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { testName, testViewport, sweepStaleExoEntities } from './utils/exo.utils'

describe('Component Integration', { sequential: true }, () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  const createdIds: string[] = []
  let componentId: string

  beforeAll(async () => {
    await sweepStaleExoEntities(client)

    const created = await client.component.create(
      {},
      {
        name: testName('Component'),
        description: 'Created by integration test',
        viewports: [testViewport],
        contentProperties: [{ id: 'title', name: 'Title', type: 'String', required: false }],
        designProperties: [{ id: 'color', name: 'Color', type: 'String' }],
      },
    )
    componentId = created.sys.id
    createdIds.push(componentId)
  })

  afterAll(async () => {
    for (const id of createdIds) {
      try {
        const latest = await client.component.get({ componentId: id })
        if (latest.sys.publishedVersion) {
          await client.component.unpublish({
            componentId: id,
            version: latest.sys.version,
          })
        }
        await client.component.delete({ componentId: id })
      } catch {
        // entity already deleted or not found
      }
    }

    await timeoutToCalmRateLimiting()
  })

  it('has correct sys fields after creation', async () => {
    const component = await client.component.get({ componentId })

    expect(component.sys.id).toBeDefined()
    expect(component.sys.type).toBe('Component')
    expect(component.sys.version).toBeGreaterThanOrEqual(1)
    expect(component.sys.createdAt).toBeDefined()
    expect(component.sys.updatedAt).toBeDefined()
    expect(component.sys.createdBy).toBeDefined()
    expect(component.name).toBe(testName('Component'))
    expect(component.description).toBe('Created by integration test')
  })

  it('gets a component by ID', async () => {
    const fetched = await client.component.get({ componentId })

    expect(fetched.sys.id).toBe(componentId)
    expect(fetched.sys.type).toBe('Component')
    expect(fetched.contentProperties).toHaveLength(1)
    expect(fetched.designProperties).toHaveLength(1)
  })

  it('upserts a component', async () => {
    const current = await client.component.get({ componentId })

    const { sys, ...body } = current
    const updated = await client.component.upsert(
      { componentId },
      {
        sys: { id: sys.id, type: 'Component', version: sys.version },
        ...body,
        name: testName('Component Updated'),
      },
    )

    expect(updated.name).toBe(testName('Component Updated'))
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
  })

  it('lists components with cursor pagination', async () => {
    const collection = await client.component.getMany({ query: { limit: 10 } })

    expect(collection.items.length).toBeGreaterThanOrEqual(1)
    expect(collection.pages).toBeDefined()

    const found = collection.items.find((item) => item.sys.id === componentId)
    expect(found).toBeDefined()
  })

  it('publishes a component', async () => {
    const current = await client.component.get({ componentId })

    const published = await client.component.publish({
      componentId,
      version: current.sys.version,
    })

    expect(published.sys.publishedVersion).toBeDefined()
    expect(published.sys.publishedAt).toBeDefined()
  })

  it('unpublishes a component', async () => {
    const current = await client.component.get({ componentId })

    const unpublished = await client.component.unpublish({
      componentId,
      version: current.sys.version,
    })

    expect(unpublished.sys.publishedVersion).toBeUndefined()
  })

  it('rejects creation with missing required fields', async () => {
    await expect(
      client.component.create({}, {
        description: 'Should fail — missing name and viewports',
        contentProperties: [],
        designProperties: [],
      } as any),
    ).rejects.toThrow()
  })

  it('rejects delete on a published entity', async () => {
    const current = await client.component.get({ componentId })
    if (!current.sys.publishedVersion) {
      await client.component.publish({
        componentId,
        version: current.sys.version,
      })
    }

    await expect(client.component.delete({ componentId })).rejects.toThrow()

    const latest = await client.component.get({ componentId })
    await client.component.unpublish({
      componentId,
      version: latest.sys.version,
    })
  })

  it('deletes a component', async () => {
    const current = await client.component.get({ componentId })
    expect(current.sys.publishedVersion).toBeUndefined()

    await client.component.delete({ componentId })

    await expect(client.component.get({ componentId })).rejects.toThrow()

    const idx = createdIds.indexOf(componentId)
    if (idx !== -1) createdIds.splice(idx, 1)
  })
})
