import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import type { DataAssemblyProps } from '../../lib/entities/data-assembly'

describe('DataAssembly Integration', () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  const createdDataAssemblyIds: string[] = []
  let dataAssembly: DataAssemblyProps

  beforeAll(async () => {
    dataAssembly = await client.dataAssembly.create(
      {},
      {
        sys: {
          type: 'DataAssembly',
          dataType: [
            {
              id: 'title',
              name: 'Title',
              type: 'String',
              required: false,
            },
          ],
        },
        metadata: { tags: [] },
        name: 'Integration Test DataAssembly',
        description: 'Created by integration test',
        parameters: {},
        resolvers: {
          entries: {
            source: 'Contentful:GraphQL',
            query: '{ entryCollection { items { sys { id } } } }',
          },
        },
        return: {
          title: '$resolvers.entries.data.entryCollection.items[0].sys.id',
        },
      },
    )
    createdDataAssemblyIds.push(dataAssembly.sys.id)
  })

  afterAll(async () => {
    for (const id of createdDataAssemblyIds) {
      try {
        const latest = await client.dataAssembly.get({ dataAssemblyId: id })
        if (latest.sys.publishedVersion) {
          await client.dataAssembly.unpublish({
            dataAssemblyId: id,
            version: latest.sys.version,
          })
          await client.dataAssembly.delete({ dataAssemblyId: id })
        } else {
          await client.dataAssembly.delete({ dataAssemblyId: id })
        }
      } catch {
        // entity already deleted or not found
      }
    }

    await timeoutToCalmRateLimiting()
  })

  it('creates a data assembly with correct sys fields', () => {
    expect(dataAssembly.sys.id).toBeDefined()
    expect(dataAssembly.sys.type).toBe('DataAssembly')
    expect(dataAssembly.sys.version).toBeGreaterThanOrEqual(1)
    expect(dataAssembly.sys.createdAt).toBeDefined()
    expect(dataAssembly.sys.createdBy).toBeDefined()
    expect(dataAssembly.sys.dataType).toBeDefined()
    expect(dataAssembly.name).toBe('Integration Test DataAssembly')
    expect(dataAssembly.description).toBe('Created by integration test')
  })

  it('gets a data assembly by ID', async () => {
    const fetched = await client.dataAssembly.get({
      dataAssemblyId: dataAssembly.sys.id,
    })

    expect(fetched.sys.id).toBe(dataAssembly.sys.id)
    expect(fetched.sys.type).toBe('DataAssembly')
    expect(fetched.name).toBe('Integration Test DataAssembly')
    expect(fetched.resolvers).toBeDefined()
    expect(fetched.return).toBeDefined()
  })

  it('updates a data assembly', async () => {
    const current = await client.dataAssembly.get({
      dataAssemblyId: dataAssembly.sys.id,
    })

    const updated = await client.dataAssembly.update(
      { dataAssemblyId: current.sys.id },
      {
        ...current,
        sys: {
          id: current.sys.id,
          type: 'DataAssembly',
          version: current.sys.version,
          dataType: current.sys.dataType,
        },
        name: 'Updated Integration Test DataAssembly',
      },
    )

    expect(updated.name).toBe('Updated Integration Test DataAssembly')
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
    dataAssembly = updated
  })

  it('lists data assemblies with cursor pagination', async () => {
    const collection = await client.dataAssembly.getMany({
      query: { limit: 10 },
    })

    expect(collection.sys).toBeDefined()
    expect(collection.pages).toBeDefined()
    expect(collection.items).toBeDefined()
    expect(Array.isArray(collection.items)).toBe(true)
    expect(collection.items.length).toBeGreaterThanOrEqual(1)

    const found = collection.items.find((item) => item.sys.id === dataAssembly.sys.id)
    expect(found).toBeDefined()
  })

  it('publishes a data assembly', async () => {
    const current = await client.dataAssembly.get({
      dataAssemblyId: dataAssembly.sys.id,
    })

    const published = await client.dataAssembly.publish({
      dataAssemblyId: current.sys.id,
      version: current.sys.version,
    })

    expect(published.sys.publishedVersion).toBeDefined()
    expect(published.sys.publishedAt).toBeDefined()
    dataAssembly = published
  })

  it('gets a published data assembly by ID', async () => {
    const fetched = await client.dataAssembly.getPublished({
      dataAssemblyId: dataAssembly.sys.id,
    })

    expect(fetched.sys.id).toBe(dataAssembly.sys.id)
    expect(fetched.sys.type).toBe('DataAssembly')
    expect(fetched.name).toBe('Updated Integration Test DataAssembly')
  })

  it('lists published data assemblies', async () => {
    const collection = await client.dataAssembly.getManyPublished({
      query: { limit: 10 },
    })

    expect(collection.sys).toBeDefined()
    expect(collection.pages).toBeDefined()
    expect(collection.items).toBeDefined()
    expect(Array.isArray(collection.items)).toBe(true)

    const found = collection.items.find((item) => item.sys.id === dataAssembly.sys.id)
    expect(found).toBeDefined()
  })

  it('unpublishes a data assembly', async () => {
    const current = await client.dataAssembly.get({
      dataAssemblyId: dataAssembly.sys.id,
    })

    const unpublished = await client.dataAssembly.unpublish({
      dataAssemblyId: current.sys.id,
      version: current.sys.version,
    })

    expect(unpublished.sys.publishedVersion).toBeUndefined()
    dataAssembly = unpublished
  })
})
