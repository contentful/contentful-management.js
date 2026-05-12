import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import type { ComponentTypeProps } from '../../lib/entities/component-type'

describe('ComponentType Integration', () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  const createdComponentTypeIds: string[] = []
  let componentType: ComponentTypeProps

  beforeAll(async () => {
    componentType = await client.componentType.create(
      {},
      {
        name: 'Integration Test Component',
        description: 'Created by integration test',
        viewports: [
          {
            id: 'desktop',
            query: '(min-width: 1024px)',
            displayName: 'Desktop',
            previewSize: '100%',
          },
        ],
        contentProperties: [
          {
            id: 'title',
            name: 'Title',
            type: 'String',
            required: false,
          },
        ],
        designProperties: [
          {
            id: 'color',
            name: 'Color',
            type: 'Symbol',
            required: false,
          },
        ],
        dimensionKeyMap: { designProperties: {} },
      },
    )
    createdComponentTypeIds.push(componentType.sys.id)
  })

  afterAll(async () => {
    for (const id of createdComponentTypeIds) {
      try {
        const latest = await client.componentType.get({ componentTypeId: id })
        if (latest.sys.publishedVersion) {
          const unpublished = await client.componentType.unpublish({
            componentTypeId: id,
            version: latest.sys.version,
          })
          await client.componentType.delete({ componentTypeId: id })
        } else {
          await client.componentType.delete({ componentTypeId: id })
        }
      } catch {
        // entity already deleted or not found
      }
    }

    await timeoutToCalmRateLimiting()
  })

  it('creates a component type with correct sys fields', () => {
    expect(componentType.sys.id).toBeDefined()
    expect(componentType.sys.type).toBe('ComponentType')
    expect(componentType.sys.version).toBeGreaterThanOrEqual(1)
    expect(componentType.sys.createdAt).toBeDefined()
    expect(componentType.sys.updatedAt).toBeDefined()
    expect(componentType.sys.createdBy).toBeDefined()
    expect(componentType.name).toBe('Integration Test Component')
    expect(componentType.description).toBe('Created by integration test')
  })

  it('gets a component type by ID', async () => {
    const fetched = await client.componentType.get({
      componentTypeId: componentType.sys.id,
    })

    expect(fetched.sys.id).toBe(componentType.sys.id)
    expect(fetched.sys.type).toBe('ComponentType')
    expect(fetched.name).toBe('Integration Test Component')
    expect(fetched.contentProperties).toHaveLength(1)
    expect(fetched.designProperties).toHaveLength(1)
  })

  it('updates a component type', async () => {
    const current = await client.componentType.get({
      componentTypeId: componentType.sys.id,
    })

    const updated = await client.componentType.update(
      { componentTypeId: current.sys.id },
      {
        ...current,
        name: 'Updated Integration Test Component',
      },
    )

    expect(updated.name).toBe('Updated Integration Test Component')
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
    componentType = updated
  })

  it('lists component types with cursor pagination', async () => {
    const collection = await client.componentType.getMany({
      query: { limit: 10 },
    })

    expect(collection.sys).toBeDefined()
    expect(collection.pages).toBeDefined()
    expect(collection.items).toBeDefined()
    expect(Array.isArray(collection.items)).toBe(true)
    expect(collection.items.length).toBeGreaterThanOrEqual(1)

    const found = collection.items.find((item) => item.sys.id === componentType.sys.id)
    expect(found).toBeDefined()
  })

  it('publishes a component type', async () => {
    const current = await client.componentType.get({
      componentTypeId: componentType.sys.id,
    })

    const published = await client.componentType.publish({
      componentTypeId: current.sys.id,
      version: current.sys.version,
    })

    expect(published.sys.publishedVersion).toBeDefined()
    expect(published.sys.publishedAt).toBeDefined()
    componentType = published
  })

  it('unpublishes a component type', async () => {
    const current = await client.componentType.get({
      componentTypeId: componentType.sys.id,
    })

    const unpublished = await client.componentType.unpublish({
      componentTypeId: current.sys.id,
      version: current.sys.version,
    })

    expect(unpublished.sys.publishedVersion).toBeUndefined()
    componentType = unpublished
  })
})
