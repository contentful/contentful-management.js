import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { testName, testViewport, sweepStaleExoEntities } from './utils/exo.utils'

describe('ExperienceTemplate Integration', { sequential: true }, () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  const createdIds: string[] = []
  let experienceTemplateId: string

  beforeAll(async () => {
    await sweepStaleExoEntities(client)

    const created = await client.experienceTemplate.create(
      {},
      {
        name: testName('ExperienceTemplate'),
        description: 'Created by integration test',
        viewports: [testViewport],
        contentProperties: [{ id: 'heading', name: 'Heading', type: 'String', required: false }],
        designProperties: [{ id: 'bgColor', name: 'Background Color', type: 'String' }],
      },
    )
    experienceTemplateId = created.sys.id
    createdIds.push(experienceTemplateId)
  })

  afterAll(async () => {
    for (const id of createdIds) {
      try {
        const latest = await client.experienceTemplate.get({ experienceTemplateId: id })
        if (latest.sys.publishedVersion) {
          await client.experienceTemplate.unpublish({
            experienceTemplateId: id,
            version: latest.sys.version,
          })
        }
        await client.experienceTemplate.delete({ experienceTemplateId: id })
      } catch {
        // entity already deleted or not found
      }
    }

    await timeoutToCalmRateLimiting()
  })

  it('has correct sys fields after creation', async () => {
    const experienceTemplate = await client.experienceTemplate.get({ experienceTemplateId })

    expect(experienceTemplate.sys.id).toBeDefined()
    expect(experienceTemplate.sys.type).toBe('ExperienceTemplate')
    expect(experienceTemplate.sys.version).toBeGreaterThanOrEqual(1)
    expect(experienceTemplate.sys.createdAt).toBeDefined()
    expect(experienceTemplate.sys.updatedAt).toBeDefined()
    expect(experienceTemplate.sys.createdBy).toBeDefined()
    expect(experienceTemplate.name).toBe(testName('ExperienceTemplate'))
    expect(experienceTemplate.description).toBe('Created by integration test')
  })

  it('gets an experience template by ID', async () => {
    const fetched = await client.experienceTemplate.get({ experienceTemplateId })

    expect(fetched.sys.id).toBe(experienceTemplateId)
    expect(fetched.sys.type).toBe('ExperienceTemplate')
    expect(fetched.contentProperties).toHaveLength(1)
    expect(fetched.designProperties).toHaveLength(1)
  })

  it('upserts an experience template', async () => {
    const current = await client.experienceTemplate.get({ experienceTemplateId })

    const { sys, ...body } = current
    const updated = await client.experienceTemplate.upsert(
      { experienceTemplateId },
      {
        sys: { id: sys.id, type: 'ExperienceTemplate', version: sys.version },
        ...body,
        name: testName('ExperienceTemplate Updated'),
      },
    )

    expect(updated.name).toBe(testName('ExperienceTemplate Updated'))
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
  })

  it('lists experience templates with cursor pagination', async () => {
    const collection = await client.experienceTemplate.getMany({ query: { limit: 10 } })

    expect(collection.items.length).toBeGreaterThanOrEqual(1)
    expect(collection.pages).toBeDefined()

    const found = collection.items.find((item) => item.sys.id === experienceTemplateId)
    expect(found).toBeDefined()
  })

  it('publishes an experience template', async () => {
    const current = await client.experienceTemplate.get({ experienceTemplateId })

    const published = await client.experienceTemplate.publish({
      experienceTemplateId,
      version: current.sys.version,
    })

    expect(published.sys.publishedVersion).toBeDefined()
    expect(published.sys.publishedAt).toBeDefined()
  })

  it('unpublishes an experience template', async () => {
    const current = await client.experienceTemplate.get({ experienceTemplateId })

    const unpublished = await client.experienceTemplate.unpublish({
      experienceTemplateId,
      version: current.sys.version,
    })

    expect(unpublished.sys.publishedVersion).toBeUndefined()
  })

  it('rejects delete on a published entity', async () => {
    const current = await client.experienceTemplate.get({ experienceTemplateId })
    if (!current.sys.publishedVersion) {
      await client.experienceTemplate.publish({
        experienceTemplateId,
        version: current.sys.version,
      })
    }

    await expect(client.experienceTemplate.delete({ experienceTemplateId })).rejects.toThrow()

    const latest = await client.experienceTemplate.get({ experienceTemplateId })
    await client.experienceTemplate.unpublish({
      experienceTemplateId,
      version: latest.sys.version,
    })
  })

  it('deletes an experience template', async () => {
    const current = await client.experienceTemplate.get({ experienceTemplateId })
    expect(current.sys.publishedVersion).toBeUndefined()

    await client.experienceTemplate.delete({ experienceTemplateId })

    await expect(client.experienceTemplate.get({ experienceTemplateId })).rejects.toThrow()

    const idx = createdIds.indexOf(experienceTemplateId)
    if (idx !== -1) createdIds.splice(idx, 1)
  })
})
