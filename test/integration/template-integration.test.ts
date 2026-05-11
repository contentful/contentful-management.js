import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import type { TemplateProps } from '../../lib/entities/template'

describe('Template Integration', () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  let template: TemplateProps

  beforeAll(async () => {
    template = await client.template.create(
      {},
      {
        name: 'Integration Test Template',
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
            id: 'heading',
            name: 'Heading',
            type: 'String',
            required: false,
          },
        ],
        designProperties: [
          {
            id: 'bgColor',
            name: 'Background Color',
            type: 'Symbol',
            required: false,
          },
        ],
        dimensionKeyMap: { designProperties: {} },
      },
    )
  })

  afterAll(async () => {
    try {
      const latest = await client.template.get({
        templateId: template.sys.id,
      })
      if (latest.sys.publishedVersion) {
        await client.template.unpublish({
          templateId: latest.sys.id,
          version: latest.sys.version,
        })
        const unpublished = await client.template.get({
          templateId: latest.sys.id,
        })
        await client.template.delete({
          templateId: unpublished.sys.id,
        })
      } else {
        await client.template.delete({
          templateId: latest.sys.id,
        })
      }
    } catch {
      // already cleaned up
    }

    await timeoutToCalmRateLimiting()
  })

  it('creates a template with correct sys fields', () => {
    expect(template.sys.id).toBeDefined()
    expect(template.sys.type).toBe('Template')
    expect(template.sys.version).toBeGreaterThanOrEqual(1)
    expect(template.sys.createdAt).toBeDefined()
    expect(template.sys.updatedAt).toBeDefined()
    expect(template.sys.createdBy).toBeDefined()
    expect(template.name).toBe('Integration Test Template')
    expect(template.description).toBe('Created by integration test')
  })

  it('gets a template by ID', async () => {
    const fetched = await client.template.get({
      templateId: template.sys.id,
    })

    expect(fetched.sys.id).toBe(template.sys.id)
    expect(fetched.sys.type).toBe('Template')
    expect(fetched.name).toBe('Integration Test Template')
    expect(fetched.contentProperties).toHaveLength(1)
    expect(fetched.designProperties).toHaveLength(1)
  })

  it('updates a template', async () => {
    const current = await client.template.get({
      templateId: template.sys.id,
    })

    const updated = await client.template.update(
      { templateId: current.sys.id },
      {
        ...current,
        sys: { id: current.sys.id, type: 'Template', version: current.sys.version },
        name: 'Updated Integration Test Template',
      },
    )

    expect(updated.name).toBe('Updated Integration Test Template')
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
    template = updated
  })

  it('lists templates with cursor pagination', async () => {
    const collection = await client.template.getMany({
      query: { limit: 10 },
    })

    expect(collection.sys).toBeDefined()
    expect(collection.pages).toBeDefined()
    expect(collection.items).toBeDefined()
    expect(Array.isArray(collection.items)).toBe(true)
    expect(collection.items.length).toBeGreaterThanOrEqual(1)

    const found = collection.items.find((item) => item.sys.id === template.sys.id)
    expect(found).toBeDefined()
  })

  it('publishes a template', async () => {
    const current = await client.template.get({
      templateId: template.sys.id,
    })

    const published = await client.template.publish({
      templateId: current.sys.id,
      version: current.sys.version,
    })

    expect(published.sys.publishedVersion).toBeDefined()
    expect(published.sys.publishedAt).toBeDefined()
    template = published
  })

  it('unpublishes a template', async () => {
    const current = await client.template.get({
      templateId: template.sys.id,
    })

    const unpublished = await client.template.unpublish({
      templateId: current.sys.id,
      version: current.sys.version,
    })

    expect(unpublished.sys.publishedVersion).toBeUndefined()
    template = unpublished
  })
})
