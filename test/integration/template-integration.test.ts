import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { testName, testViewport, sweepStaleExoEntities } from './utils/exo.utils'

describe('Template Integration', { sequential: true }, () => {
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
        name: testName('Template'),
        description: 'Created by integration test',
        viewports: [testViewport],
        contentProperties: [{ id: 'heading', name: 'Heading', type: 'String', required: false }],
        designProperties: [{ id: 'bgColor', name: 'Background Color', type: 'Symbol' }],
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

  it('has correct sys fields after creation', async () => {
    const template = await client.template.get({ templateId: templateId })

    expect(template.sys.id).toBeDefined()
    expect(template.sys.type).toBe('Template')
    expect(template.sys.version).toBeGreaterThanOrEqual(1)
    expect(template.sys.createdAt).toBeDefined()
    expect(template.sys.updatedAt).toBeDefined()
    expect(template.sys.createdBy).toBeDefined()
    expect(template.name).toBe(testName('Template'))
    expect(template.description).toBe('Created by integration test')
  })

  it('gets a template by ID', async () => {
    const fetched = await client.template.get({ templateId: templateId })

    expect(fetched.sys.id).toBe(templateId)
    expect(fetched.sys.type).toBe('Template')
    expect(fetched.contentProperties).toHaveLength(1)
    expect(fetched.designProperties).toHaveLength(1)
  })

  it('upserts a template', async () => {
    const current = await client.template.get({ templateId: templateId })

    const { sys, ...body } = current
    const updated = await client.template.upsert(
      { templateId: templateId },
      {
        sys: { id: sys.id, type: 'Template', version: sys.version },
        ...body,
        name: testName('Template Updated'),
      },
    )

    expect(updated.name).toBe(testName('Template Updated'))
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
  })

  it('lists templates with cursor pagination', async () => {
    const collection = await client.template.getMany({ query: { limit: 10 } })

    expect(collection.items.length).toBeGreaterThanOrEqual(1)
    expect(collection.pages).toBeDefined()

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

  it('rejects delete on a published entity', async () => {
    const current = await client.template.get({ templateId: templateId })
    if (!current.sys.publishedVersion) {
      await client.template.publish({
        templateId: templateId,
        version: current.sys.version,
      })
    }

    await expect(client.template.delete({ templateId: templateId })).rejects.toThrow()

    const latest = await client.template.get({ templateId: templateId })
    await client.template.unpublish({
      templateId: templateId,
      version: latest.sys.version,
    })
  })

  it('deletes a template', async () => {
    const current = await client.template.get({ templateId: templateId })
    expect(current.sys.publishedVersion).toBeUndefined()

    await client.template.delete({ templateId: templateId })

    await expect(client.template.get({ templateId: templateId })).rejects.toThrow()

    const idx = createdIds.indexOf(templateId)
    if (idx !== -1) createdIds.splice(idx, 1)
  })
})
