import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import type { ComponentTypeProps } from '../../lib/entities/component-type'
import type { FragmentProps } from '../../lib/entities/fragment'

describe('Fragment Integration', () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  const createdFragmentIds: string[] = []
  const createdComponentTypeIds: string[] = []
  let componentType: ComponentTypeProps
  let fragment: FragmentProps

  beforeAll(async () => {
    componentType = await client.componentType.create(
      {},
      {
        name: 'CT for Fragment Test',
        description: 'Backing component type for fragment integration test',
        viewports: [
          {
            id: 'desktop',
            query: '(min-width: 1024px)',
            displayName: 'Desktop',
            previewSize: '100%',
          },
        ],
        contentProperties: [],
        designProperties: [],
        dimensionKeyMap: { designProperties: {} },
      },
    )
    createdComponentTypeIds.push(componentType.sys.id)

    componentType = await client.componentType.publish({
      componentTypeId: componentType.sys.id,
      version: componentType.sys.version,
    })

    fragment = await client.fragment.create(
      {},
      {
        name: 'Integration Test Fragment',
        description: 'Created by integration test',
        componentTypeId: componentType.sys.id,
        viewports: [
          {
            id: 'desktop',
            query: '(min-width: 1024px)',
            displayName: 'Desktop',
            previewSize: '100%',
          },
        ],
        designProperties: {},
        dimensionKeyMap: { designProperties: {} },
      },
    )
    createdFragmentIds.push(fragment.sys.id)
  })

  afterAll(async () => {
    // Delete fragments first (they depend on component types)
    for (const id of createdFragmentIds) {
      try {
        const latest = await client.fragment.get({ fragmentId: id })
        if (latest.sys.publishedVersion) {
          await client.fragment.unpublish({
            fragmentId: id,
            version: latest.sys.version,
          })
          await client.fragment.delete({ fragmentId: id })
        } else {
          await client.fragment.delete({ fragmentId: id })
        }
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

  it('creates a fragment with correct sys fields', () => {
    expect(fragment.sys.id).toBeDefined()
    expect(fragment.sys.type).toBe('Fragment')
    expect(fragment.sys.version).toBeGreaterThanOrEqual(1)
    expect(fragment.sys.createdAt).toBeDefined()
    expect(fragment.sys.updatedAt).toBeDefined()
    expect(fragment.sys.createdBy).toBeDefined()
    expect(fragment.sys.componentType).toBeDefined()
    expect(fragment.sys.componentType.sys.id).toBe(componentType.sys.id)
    expect(fragment.name).toBe('Integration Test Fragment')
  })

  it('gets a fragment by ID', async () => {
    const fetched = await client.fragment.get({
      fragmentId: fragment.sys.id,
    })

    expect(fetched.sys.id).toBe(fragment.sys.id)
    expect(fetched.sys.type).toBe('Fragment')
    expect(fetched.name).toBe('Integration Test Fragment')
  })

  it('updates a fragment', async () => {
    const current = await client.fragment.get({
      fragmentId: fragment.sys.id,
    })

    const updated = await client.fragment.update(
      { fragmentId: current.sys.id },
      {
        ...current,
        sys: { id: current.sys.id, type: 'Fragment', version: current.sys.version },
        componentTypeId: componentType.sys.id,
        name: 'Updated Integration Test Fragment',
      },
    )

    expect(updated.name).toBe('Updated Integration Test Fragment')
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
    fragment = updated
  })

  it('lists fragments with cursor pagination', async () => {
    const collection = await client.fragment.getMany({
      query: { limit: 10 },
    })

    expect(collection.sys).toBeDefined()
    expect(collection.pages).toBeDefined()
    expect(collection.items).toBeDefined()
    expect(Array.isArray(collection.items)).toBe(true)
    expect(collection.items.length).toBeGreaterThanOrEqual(1)

    const found = collection.items.find((item) => item.sys.id === fragment.sys.id)
    expect(found).toBeDefined()
  })

  it('publishes a fragment', async () => {
    const current = await client.fragment.get({
      fragmentId: fragment.sys.id,
    })

    const published = await client.fragment.publish({
      fragmentId: current.sys.id,
      version: current.sys.version,
    })

    expect(published.sys.publishedVersion).toBeDefined()
    expect(published.sys.publishedAt).toBeDefined()
    fragment = published
  })

  it('unpublishes a fragment', async () => {
    const current = await client.fragment.get({
      fragmentId: fragment.sys.id,
    })

    const unpublished = await client.fragment.unpublish({
      fragmentId: current.sys.id,
      version: current.sys.version,
    })

    expect(unpublished.sys.publishedVersion).toBeUndefined()
    fragment = unpublished
  })
})
