import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { testName, testViewport, sweepStaleExoEntities } from './utils/exo.utils'

describe('Experience Integration', () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  const createdExperienceIds: string[] = []
  const createdTemplateIds: string[] = []
  let experienceId: string
  let templateId: string

  beforeAll(async () => {
    await sweepStaleExoEntities(client)

    // Experiences require a published Template
    const tmpl = await client.template.create(
      {},
      {
        name: testName('Template for Experience'),
        description: 'Backing template for experience integration test',
        viewports: [testViewport],
        contentProperties: [],
        designProperties: [],
        dimensionKeyMap: { designProperties: {} },
      },
    )
    templateId = tmpl.sys.id
    createdTemplateIds.push(templateId)

    await client.template.publish({
      templateId: templateId,
      version: tmpl.sys.version,
    })

    const exp = await client.experience.create(
      {},
      {
        name: testName('Experience'),
        description: 'Created by integration test',
        templateId: templateId,
        viewports: [testViewport],
        contentProperties: {},
        designProperties: {},
        dimensionKeyMap: { designProperties: {} },
      },
    )
    experienceId = exp.sys.id
    createdExperienceIds.push(experienceId)
  })

  afterAll(async () => {
    for (const id of createdExperienceIds) {
      try {
        const latest = await client.experience.get({ experienceId: id })
        if (latest.sys.publishedVersion) {
          await client.experience.unpublish({
            experienceId: id,
            version: latest.sys.version,
          })
        }
        await client.experience.delete({ experienceId: id })
      } catch {
        // entity already deleted or not found
      }
    }

    for (const id of createdTemplateIds) {
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

  it('creates an experience with correct sys fields', async () => {
    const exp = await client.experience.get({ experienceId: experienceId })

    expect(exp.sys.id).toBeDefined()
    expect(exp.sys.type).toBe('Experience')
    expect(exp.sys.version).toBeGreaterThanOrEqual(1)
    expect(exp.sys.createdAt).toBeDefined()
    expect(exp.sys.updatedAt).toBeDefined()
    expect(exp.sys.createdBy).toBeDefined()
    expect(exp.sys.template).toBeDefined()
    expect(exp.sys.template!.sys.id).toBe(templateId)
    expect(exp.name).toBe(testName('Experience'))
  })

  it('gets an experience by ID', async () => {
    const fetched = await client.experience.get({ experienceId: experienceId })

    expect(fetched.sys.id).toBe(experienceId)
    expect(fetched.sys.type).toBe('Experience')
  })

  it('updates an experience', async () => {
    const current = await client.experience.get({ experienceId: experienceId })

    const updated = await client.experience.update(
      { experienceId: experienceId },
      { ...current, name: testName('Experience Updated') },
    )

    expect(updated.name).toBe(testName('Experience Updated'))
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
  })

  it('lists experiences with cursor pagination', async () => {
    const collection = await client.experience.getMany({ query: { limit: 10 } })

    expect(collection.sys).toBeDefined()
    expect(collection.pages).toBeDefined()
    expect(collection.items).toBeDefined()
    expect(Array.isArray(collection.items)).toBe(true)

    const found = collection.items.find((item) => item.sys.id === experienceId)
    expect(found).toBeDefined()
  })

  it('publishes an experience (full publish)', async () => {
    const current = await client.experience.get({ experienceId: experienceId })

    const published = await client.experience.publish({
      experienceId: experienceId,
      version: current.sys.version,
    })

    expect(published.sys.publishedVersion).toBeDefined()
    expect(published.sys.publishedAt).toBeDefined()
  })

  it('publishes an experience with locale-aware add', async () => {
    const current = await client.experience.get({ experienceId: experienceId })

    const published = await client.experience.publish(
      { experienceId: experienceId, version: current.sys.version },
      { add: ['en-US'] },
    )

    expect(published.sys.publishedVersion).toBeDefined()
  })

  it('unpublishes an experience', async () => {
    const current = await client.experience.get({ experienceId: experienceId })

    const unpublished = await client.experience.unpublish({
      experienceId: experienceId,
      version: current.sys.version,
    })

    expect(unpublished.sys.publishedVersion).toBeUndefined()
  })

  it('deletes an experience', async () => {
    const current = await client.experience.get({ experienceId: experienceId })
    expect(current.sys.publishedVersion).toBeUndefined()

    await client.experience.delete({ experienceId: experienceId })

    await expect(client.experience.get({ experienceId: experienceId })).rejects.toThrow()

    createdExperienceIds.splice(createdExperienceIds.indexOf(experienceId), 1)
  })
})
