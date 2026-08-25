import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { makeResourceLink, sweepStaleExoEntities, testName, testViewport } from './utils/exo.utils'

describe('ReleaseExperience Integration', { sequential: true }, () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  const createdReleaseExperienceIds: string[] = []
  let releaseId: string
  let experienceTemplateId: string
  let releaseExperienceId: string

  beforeAll(async () => {
    await sweepStaleExoEntities(client)

    const experienceTemplate = await client.experienceTemplate.create(
      {},
      {
        name: testName('Template for ReleaseExperience'),
        description: 'Backing template for release experience integration test',
        viewports: [testViewport],
        contentProperties: [],
        designProperties: [],
      },
    )
    experienceTemplateId = experienceTemplate.sys.id

    await client.experienceTemplate.publish({
      experienceTemplateId,
      version: experienceTemplate.sys.version,
    })

    const release = await client.release.create(
      {},
      {
        title: testName('Release for Experience'),
        entities: { sys: { type: 'Array' }, items: [] },
      },
    )
    releaseId = release.sys.id

    const created = await client.releaseExperience.create(
      { releaseId },
      {
        name: testName('ReleaseExperience'),
        description: 'Created by integration test',
        experienceTemplate: makeResourceLink('Contentful:ExperienceTemplate', experienceTemplateId),
        viewports: [testViewport],
        designProperties: {},
      },
    )
    releaseExperienceId = created.sys.id
    createdReleaseExperienceIds.push(releaseExperienceId)
  })

  afterAll(async () => {
    for (const id of createdReleaseExperienceIds) {
      try {
        await client.releaseExperience.delete({ releaseId, experienceId: id })
      } catch {
        // entity already deleted or not found
      }
    }

    if (releaseId) {
      try {
        await client.release.delete({ releaseId })
      } catch {
        // release already deleted or not found
      }
    }

    if (experienceTemplateId) {
      try {
        const latest = await client.experienceTemplate.get({ experienceTemplateId })
        if (latest.sys.publishedVersion) {
          await client.experienceTemplate.unpublish({
            experienceTemplateId,
            version: latest.sys.version,
          })
        }
        await client.experienceTemplate.delete({ experienceTemplateId })
      } catch {
        // entity already deleted or not found
      }
    }

    await timeoutToCalmRateLimiting()
  })

  it('gets a release experience by ID with the expected sys fields', async () => {
    const experience = await client.releaseExperience.get({
      releaseId,
      experienceId: releaseExperienceId,
    })

    expect(experience.sys.id).toBe(releaseExperienceId)
    expect(experience.sys.type).toBe('Experience')
    expect(experience.sys.version).toBeGreaterThanOrEqual(1)
    expect(experience.sys.release.sys.type).toBe('Link')
    expect(experience.sys.release.sys.linkType).toBe('Release')
    expect(experience.sys.release.sys.id).toBe(releaseId)
    expect(experience.sys.experienceTemplate.sys.linkType).toBe('Contentful:ExperienceTemplate')
    expect(experience.sys.experienceTemplate.sys.urn).toContain(experienceTemplateId)
    expect(experience.name).toBe(testName('ReleaseExperience'))
  })

  it('lists release experiences with cursor pagination', async () => {
    const collection = await client.releaseExperience.getMany({
      releaseId,
      query: { limit: 10 },
    })

    expect(collection.items.length).toBeGreaterThanOrEqual(1)
    expect(collection.pages).toBeDefined()
    expect(collection.items.find((item) => item.sys.id === releaseExperienceId)).toBeDefined()
  })

  it('upserts a release experience', async () => {
    const current = await client.releaseExperience.get({
      releaseId,
      experienceId: releaseExperienceId,
    })
    const { sys, ...body } = current

    const updated = await client.releaseExperience.upsert(
      { releaseId, experienceId: releaseExperienceId },
      {
        sys: { id: sys.id, type: 'Experience', version: sys.version },
        ...body,
        name: testName('ReleaseExperience Updated'),
      },
    )

    expect(updated.name).toBe(testName('ReleaseExperience Updated'))
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
  })

  it('deletes a release experience', async () => {
    await client.releaseExperience.delete({ releaseId, experienceId: releaseExperienceId })
    await expect(
      client.releaseExperience.get({ releaseId, experienceId: releaseExperienceId }),
    ).rejects.toThrow()

    const index = createdReleaseExperienceIds.indexOf(releaseExperienceId)
    if (index !== -1) createdReleaseExperienceIds.splice(index, 1)
  })
})
