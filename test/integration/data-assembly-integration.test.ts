import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { testRunId, sweepStaleExoEntities } from './utils/exo.utils'

describe('DataAssembly Integration', () => {
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
        const latest = await client.dataAssembly.get({ dataAssemblyId: id })
        if (latest.sys.publishedVersion) {
          await client.dataAssembly.unpublish({
            dataAssemblyId: id,
            version: latest.sys.version,
          })
        }
        await client.dataAssembly.delete({ dataAssemblyId: id })
      } catch {
        // entity already deleted or not found
      }
    }

    await timeoutToCalmRateLimiting()
  })

  it('full lifecycle: create → get → update → getMany → publish → getPublished → getManyPublished → unpublish → delete', async () => {
    // --- Create ---
    // DataAssembly requires sys.type and sys.dataType in the create payload
    // because the API uses these to define the assembly's return schema
    const created = await client.dataAssembly.create(
      {},
      {
        sys: {
          type: 'DataAssembly',
          dataType: [
            { id: 'title', name: 'Title', type: 'String', required: false },
          ],
        },
        metadata: { tags: [] },
        name: `Integration Test DataAssembly ${testRunId}`,
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
    createdIds.push(created.sys.id)

    expect(created.sys.id).toBeDefined()
    expect(created.sys.type).toBe('DataAssembly')
    expect(created.sys.version).toBeGreaterThanOrEqual(1)
    expect(created.sys.createdAt).toBeDefined()
    expect(created.sys.createdBy).toBeDefined()
    expect(created.sys.dataType).toBeDefined()
    expect(created.name).toBe(`Integration Test DataAssembly ${testRunId}`)

    // --- Get ---
    const fetched = await client.dataAssembly.get({ dataAssemblyId: created.sys.id })

    expect(fetched.sys.id).toBe(created.sys.id)
    expect(fetched.sys.type).toBe('DataAssembly')
    expect(fetched.resolvers).toBeDefined()
    expect(fetched.return).toBeDefined()

    // --- Update ---
    const updated = await client.dataAssembly.update(
      { dataAssemblyId: fetched.sys.id },
      {
        ...fetched,
        sys: {
          id: fetched.sys.id,
          type: 'DataAssembly' as const,
          version: fetched.sys.version,
          dataType: fetched.sys.dataType,
        },
        name: `Integration Test DataAssembly Updated ${testRunId}`,
      },
    )

    expect(updated.name).toBe(`Integration Test DataAssembly Updated ${testRunId}`)
    expect(updated.sys.version).toBeGreaterThan(fetched.sys.version)

    // --- GetMany (cursor pagination) ---
    const collection = await client.dataAssembly.getMany({ query: { limit: 10 } })

    expect(collection.sys).toBeDefined()
    expect(collection.pages).toBeDefined()
    expect(collection.items).toBeDefined()
    expect(Array.isArray(collection.items)).toBe(true)
    const found = collection.items.find((item) => item.sys.id === created.sys.id)
    expect(found).toBeDefined()

    // --- Publish ---
    const published = await client.dataAssembly.publish({
      dataAssemblyId: updated.sys.id,
      version: updated.sys.version,
    })

    expect(published.sys.publishedVersion).toBeDefined()
    expect(published.sys.publishedAt).toBeDefined()

    // --- GetPublished ---
    const fetchedPublished = await client.dataAssembly.getPublished({
      dataAssemblyId: created.sys.id,
    })

    expect(fetchedPublished.sys.id).toBe(created.sys.id)
    expect(fetchedPublished.sys.type).toBe('DataAssembly')
    expect(fetchedPublished.name).toBe(`Integration Test DataAssembly Updated ${testRunId}`)

    // --- GetManyPublished ---
    const publishedCollection = await client.dataAssembly.getManyPublished({
      query: { limit: 10 },
    })

    expect(publishedCollection.sys).toBeDefined()
    expect(publishedCollection.pages).toBeDefined()
    expect(publishedCollection.items).toBeDefined()
    const foundPublished = publishedCollection.items.find(
      (item) => item.sys.id === created.sys.id,
    )
    expect(foundPublished).toBeDefined()

    // --- Unpublish ---
    const unpublished = await client.dataAssembly.unpublish({
      dataAssemblyId: published.sys.id,
      version: published.sys.version,
    })

    expect(unpublished.sys.publishedVersion).toBeUndefined()

    // --- Delete ---
    await client.dataAssembly.delete({ dataAssemblyId: unpublished.sys.id })

    await expect(
      client.dataAssembly.get({ dataAssemblyId: unpublished.sys.id }),
    ).rejects.toThrow()

    createdIds.splice(createdIds.indexOf(created.sys.id), 1)
  })
})
