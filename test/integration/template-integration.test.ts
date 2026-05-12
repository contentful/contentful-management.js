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
  let templateId: string

  beforeAll(async () => {
    await sweepStaleExoEntities(client)

    const created = await client.template.create(
      {},
      {
        name: `Integration Test Template ${testRunId}`,
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
    templateId = created.sys.id
    createdIds.push(templateId)
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

  it('creates a template with correct sys fields', async () => {
    const template = await client.template.get({ templateId: templateId })

    expect(template.sys.id).toBeDefined()
    expect(template.sys.type).toBe('Template')
    expect(template.sys.version).toBeGreaterThanOrEqual(1)
    expect(template.sys.createdAt).toBeDefined()
    expect(template.sys.updatedAt).toBeDefined()
    expect(template.sys.createdBy).toBeDefined()
    expect(template.name).toBe(`Integration Test Template ${testRunId}`)
    expect(template.description).toBe('Created by integration test')
  })

  it('gets a template by ID', async () => {
    const fetched = await client.template.get({ templateId: templateId })

    expect(fetched.sys.id).toBe(templateId)
    expect(fetched.sys.type).toBe('Template')
    expect(fetched.contentProperties).toHaveLength(1)
    expect(fetched.designProperties).toHaveLength(1)
  })

  it('updates a template', async () => {
    const current = await client.template.get({ templateId: templateId })

    const updated = await client.template.update(
      { templateId: templateId },
      {
        ...current,
        sys: { id: current.sys.id, type: 'Template' as const, version: current.sys.version },
        name: `Integration Test Template Updated ${testRunId}`,
      },
    )

    expect(updated.name).toBe(`Integration Test Template Updated ${testRunId}`)
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
  })

  it('lists templates with cursor pagination', async () => {
    const collection = await client.template.getMany({ query: { limit: 10 } })

    expect(collection.sys).toBeDefined()
    expect(collection.pages).toBeDefined()
    expect(collection.items).toBeDefined()
    expect(Array.isArray(collection.items)).toBe(true)

    const found = collection.items.find((item) => item.sys.id === templateId)
    expect(found).toBeDefined()
  })

  it('publishes a template', async () => {
    const current = await client.template.get({ templateId: templateId })

    const published = await client.template.publish({
      templateId: templateId,
      version: current.sys.version,
    })

    expect(published.sys.publishedVersion).toBeDefined()
    expect(published.sys.publishedAt).toBeDefined()
  })

  it('unpublishes a template', async () => {
    const current = await client.template.get({ templateId: templateId })

    const unpublished = await client.template.unpublish({
      templateId: templateId,
      version: current.sys.version,
    })

    expect(unpublished.sys.publishedVersion).toBeUndefined()
  })

  it('deletes a template', async () => {
    const current = await client.template.get({ templateId: templateId })
    expect(current.sys.publishedVersion).toBeUndefined()

    await client.template.delete({ templateId: templateId })

    await expect(
      client.template.get({ templateId: templateId }),
    ).rejects.toThrow()

    createdIds.splice(createdIds.indexOf(templateId), 1)
  })
})
