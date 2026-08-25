import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { makeResourceLink, sweepStaleExoEntities, testName, testViewport } from './utils/exo.utils'

describe('ExperienceOptimizationVariant Integration', { sequential: true }, () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  const createdVariantIds: string[] = []
  const createdExperienceIds: string[] = []
  const createdTemplateIds: string[] = []
  let experienceId: string
  let experienceTemplateId: string
  let variantId: string

  beforeAll(async () => {
    await sweepStaleExoEntities(client)

    const experienceTemplate = await client.experienceTemplate.create(
      {},
      {
        name: testName('Template for ExperienceOptimizationVariant'),
        description: 'Backing template for experience optimization variant integration test',
        viewports: [testViewport],
        contentProperties: [],
        designProperties: [],
      },
    )
    experienceTemplateId = experienceTemplate.sys.id
    createdTemplateIds.push(experienceTemplateId)

    await client.experienceTemplate.publish({
      experienceTemplateId,
      version: experienceTemplate.sys.version,
    })

    const experience = await client.experience.create(
      {},
      {
        name: testName('Experience for OptimizationVariant'),
        description: 'Backing experience for optimization variant integration test',
        experienceTemplate: makeResourceLink('Contentful:ExperienceTemplate', experienceTemplateId),
        viewports: [testViewport],
        designProperties: {},
      },
    )
    experienceId = experience.sys.id
    createdExperienceIds.push(experienceId)

    const variant = await client.experienceOptimizationVariant.create(
      { experienceId },
      {
        name: testName('ExperienceOptimizationVariant'),
        description: 'Created by integration test',
        experienceTemplate: makeResourceLink('Contentful:ExperienceTemplate', experienceTemplateId),
        viewports: [testViewport],
        designProperties: {},
      },
    )
    variantId = variant.sys.id
    createdVariantIds.push(variantId)
  })

  afterAll(async () => {
    for (const id of createdVariantIds) {
      try {
        let latest = await client.experienceOptimizationVariant.get({
          experienceId,
          variantId: id,
        })
        if (latest.sys.archivedVersion) {
          latest = await client.experienceOptimizationVariant.unarchive({
            experienceId,
            variantId: id,
            version: latest.sys.version,
          })
        }
        if (latest.sys.publishedVersion) {
          latest = await client.experienceOptimizationVariant.unpublish({
            experienceId,
            variantId: id,
            version: latest.sys.version,
          })
        }
        await client.experienceOptimizationVariant.delete({ experienceId, variantId: id })
      } catch {
        // entity already deleted or not found
      }
    }

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

  it('gets an optimization variant by ID with the expected sys fields', async () => {
    const variant = await client.experienceOptimizationVariant.get({ experienceId, variantId })

    expect(variant.sys.id).toBe(variantId)
    expect(variant.sys.type).toBe('Experience')
    expect(variant.sys.version).toBeGreaterThanOrEqual(1)
    expect(variant.sys.variant).toBeDefined()
    expect(variant.sys.variantType).toBeDefined()
    expect(variant.sys.variantDimension).toBeDefined()
    expect(variant.name).toBe(testName('ExperienceOptimizationVariant'))
  })

  it('lists optimization variants', async () => {
    const collection = await client.experienceOptimizationVariant.getMany({
      experienceId,
      query: {},
    })

    expect(collection.items.length).toBeGreaterThanOrEqual(1)
    expect(collection.items.find((item) => item.sys.id === variantId)).toBeDefined()
  })

  it('upserts an optimization variant', async () => {
    const current = await client.experienceOptimizationVariant.get({ experienceId, variantId })
    const { sys, ...body } = current

    const updated = await client.experienceOptimizationVariant.upsert(
      { experienceId, variantId },
      {
        sys: { id: sys.id, type: 'Experience', version: sys.version },
        ...body,
        name: testName('ExperienceOptimizationVariant Updated'),
      },
    )

    expect(updated.name).toBe(testName('ExperienceOptimizationVariant Updated'))
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
  })

  it('publishes and unpublishes an optimization variant', async () => {
    let current = await client.experienceOptimizationVariant.get({ experienceId, variantId })

    const published = await client.experienceOptimizationVariant.publish({
      experienceId,
      variantId,
      version: current.sys.version,
    })
    expect(published.sys.publishedVersion).toBeDefined()

    current = await client.experienceOptimizationVariant.get({ experienceId, variantId })
    const unpublished = await client.experienceOptimizationVariant.unpublish({
      experienceId,
      variantId,
      version: current.sys.version,
    })
    expect(unpublished.sys.publishedVersion).toBeUndefined()
  })

  it('archives and unarchives an optimization variant', async () => {
    let current = await client.experienceOptimizationVariant.get({ experienceId, variantId })

    const archived = await client.experienceOptimizationVariant.archive({
      experienceId,
      variantId,
      version: current.sys.version,
    })
    expect(archived.sys.archivedVersion).toBeDefined()

    current = await client.experienceOptimizationVariant.get({ experienceId, variantId })
    const unarchived = await client.experienceOptimizationVariant.unarchive({
      experienceId,
      variantId,
      version: current.sys.version,
    })
    expect(unarchived.sys.archivedVersion).toBeUndefined()
  })

  it('deletes an optimization variant', async () => {
    await client.experienceOptimizationVariant.delete({ experienceId, variantId })
    await expect(
      client.experienceOptimizationVariant.get({ experienceId, variantId }),
    ).rejects.toThrow()

    const index = createdVariantIds.indexOf(variantId)
    if (index !== -1) createdVariantIds.splice(index, 1)
  })
})
