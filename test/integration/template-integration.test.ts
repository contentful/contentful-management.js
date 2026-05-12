import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { testRunId, testViewport, sweepStaleExoEntities } from './utils/exo.utils'

describe('Template Integration', () => {
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
        const latest = await client.template.get({ templateId: id })
        if (latest.sys.publishedVersion) {
          await client.template.unpublish({
            templateId: id,
            version: latest.sys.version,
          })
        }
        await client.template.delete({ templateId: id })
      } catch {
        // entity already deleted or not found
      }
    }

    await timeoutToCalmRateLimiting()
  })

  it('full lifecycle: create → get → update → getMany → publish → unpublish → delete', async () => {
    // --- Create ---
    const created = await client.template.create(
      {},
      {
        name: `${testRunId} Template`,
        description: 'Created by integration test',
        viewports: [testViewport],
        contentProperties: [
          { id: 'heading', name: 'Heading', type: 'String', required: false },
        ],
        designProperties: [
          { id: 'bgColor', name: 'Background Color', type: 'Symbol', required: false },
        ],
        dimensionKeyMap: { designProperties: {} },
      },
    )
    createdIds.push(created.sys.id)

    expect(created.sys.id).toBeDefined()
    expect(created.sys.type).toBe('Template')
    expect(created.sys.version).toBeGreaterThanOrEqual(1)
    expect(created.sys.createdAt).toBeDefined()
    expect(created.sys.createdBy).toBeDefined()
    expect(created.name).toBe(`${testRunId} Template`)

    // --- Get ---
    const fetched = await client.template.get({ templateId: created.sys.id })

    expect(fetched.sys.id).toBe(created.sys.id)
    expect(fetched.sys.type).toBe('Template')
    expect(fetched.contentProperties).toHaveLength(1)
    expect(fetched.designProperties).toHaveLength(1)

    // --- Update ---
    const updated = await client.template.update(
      { templateId: fetched.sys.id },
      {
        ...fetched,
        sys: { id: fetched.sys.id, type: 'Template' as const, version: fetched.sys.version },
        name: `${testRunId} Template Updated`,
      },
    )

    expect(updated.name).toBe(`${testRunId} Template Updated`)
    expect(updated.sys.version).toBeGreaterThan(fetched.sys.version)

    // --- GetMany (cursor pagination) ---
    const collection = await client.template.getMany({ query: { limit: 10 } })

    expect(collection.sys).toBeDefined()
    expect(collection.pages).toBeDefined()
    expect(collection.items).toBeDefined()
    expect(Array.isArray(collection.items)).toBe(true)
    const found = collection.items.find((item) => item.sys.id === created.sys.id)
    expect(found).toBeDefined()

    // --- Publish ---
    const published = await client.template.publish({
      templateId: updated.sys.id,
      version: updated.sys.version,
    })

    expect(published.sys.publishedVersion).toBeDefined()
    expect(published.sys.publishedAt).toBeDefined()

    // --- Unpublish ---
    const unpublished = await client.template.unpublish({
      templateId: published.sys.id,
      version: published.sys.version,
    })

    expect(unpublished.sys.publishedVersion).toBeUndefined()

    // --- Delete ---
    await client.template.delete({ templateId: unpublished.sys.id })

    await expect(
      client.template.get({ templateId: unpublished.sys.id }),
    ).rejects.toThrow()

    createdIds.splice(createdIds.indexOf(created.sys.id), 1)
  })
})
