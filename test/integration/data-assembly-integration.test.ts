import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { testName, sweepStaleExoEntities } from './utils/exo.utils'

describe('DataAssembly Integration', () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  const createdIds: string[] = []
  let dataAssemblyId: string

  beforeAll(async () => {
    await sweepStaleExoEntities(client)

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
        name: testName('DataAssembly'),
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
    dataAssemblyId = created.sys.id
    createdIds.push(dataAssemblyId)
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

  it('creates a data assembly with correct sys fields', async () => {
    const da = await client.dataAssembly.get({ dataAssemblyId: dataAssemblyId })

    expect(da.sys.id).toBeDefined()
    expect(da.sys.type).toBe('DataAssembly')
    expect(da.sys.version).toBeGreaterThanOrEqual(1)
    expect(da.sys.createdAt).toBeDefined()
    expect(da.sys.createdBy).toBeDefined()
    expect(da.sys.dataType).toBeDefined()
    expect(da.name).toBe(testName('DataAssembly'))
    expect(da.description).toBe('Created by integration test')
  })

  it('gets a data assembly by ID', async () => {
    const fetched = await client.dataAssembly.get({ dataAssemblyId: dataAssemblyId })

    expect(fetched.sys.id).toBe(dataAssemblyId)
    expect(fetched.sys.type).toBe('DataAssembly')
    expect(fetched.resolvers).toBeDefined()
    expect(fetched.return).toBeDefined()
  })

  it('updates a data assembly', async () => {
    const current = await client.dataAssembly.get({ dataAssemblyId: dataAssemblyId })

    const updated = await client.dataAssembly.update(
      { dataAssemblyId: dataAssemblyId },
      {
        ...current,
        sys: {
          id: current.sys.id,
          type: 'DataAssembly' as const,
          version: current.sys.version,
          dataType: current.sys.dataType,
        },
        name: testName('DataAssembly Updated'),
      },
    )

    expect(updated.name).toBe(testName('DataAssembly Updated'))
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
  })

  it('lists data assemblies with cursor pagination', async () => {
    const collection = await client.dataAssembly.getMany({ query: { limit: 10 } })

    expect(collection.sys).toBeDefined()
    expect(collection.pages).toBeDefined()
    expect(collection.items).toBeDefined()
    expect(Array.isArray(collection.items)).toBe(true)

    const found = collection.items.find((item) => item.sys.id === dataAssemblyId)
    expect(found).toBeDefined()
  })

  it('publishes a data assembly', async () => {
    const current = await client.dataAssembly.get({ dataAssemblyId: dataAssemblyId })

    const published = await client.dataAssembly.publish({
      dataAssemblyId: dataAssemblyId,
      version: current.sys.version,
    })

    expect(published.sys.publishedVersion).toBeDefined()
    expect(published.sys.publishedAt).toBeDefined()
  })

  it('gets a published data assembly by ID', async () => {
    const fetched = await client.dataAssembly.getPublished({ dataAssemblyId: dataAssemblyId })

    expect(fetched.sys.id).toBe(dataAssemblyId)
    expect(fetched.sys.type).toBe('DataAssembly')
  })

  it('lists published data assemblies', async () => {
    const collection = await client.dataAssembly.getManyPublished({ query: { limit: 10 } })

    expect(collection.sys).toBeDefined()
    expect(collection.pages).toBeDefined()
    expect(collection.items).toBeDefined()

    const found = collection.items.find((item) => item.sys.id === dataAssemblyId)
    expect(found).toBeDefined()
  })

  it('unpublishes a data assembly', async () => {
    const current = await client.dataAssembly.get({ dataAssemblyId: dataAssemblyId })

    const unpublished = await client.dataAssembly.unpublish({
      dataAssemblyId: dataAssemblyId,
      version: current.sys.version,
    })

    expect(unpublished.sys.publishedVersion).toBeUndefined()
  })

  it('deletes a data assembly', async () => {
    const current = await client.dataAssembly.get({ dataAssemblyId: dataAssemblyId })
    expect(current.sys.publishedVersion).toBeUndefined()

    await client.dataAssembly.delete({ dataAssemblyId: dataAssemblyId })

    await expect(
      client.dataAssembly.get({ dataAssemblyId: dataAssemblyId }),
    ).rejects.toThrow()

    createdIds.splice(createdIds.indexOf(dataAssemblyId), 1)
  })
})
