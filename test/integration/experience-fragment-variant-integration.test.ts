import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { makeResourceLink, sweepStaleExoEntities, testName, testViewport } from './utils/exo.utils'

describe('ExperienceFragmentVariant Integration', { sequential: true }, () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  const createdVariantIds: string[] = []
  const createdExperienceFragmentIds: string[] = []
  const createdComponentIds: string[] = []
  let experienceFragmentId: string
  let componentId: string
  let variantId: string

  beforeAll(async () => {
    await sweepStaleExoEntities(client)

    const component = await client.component.create(
      {},
      {
        name: testName('Component for ExperienceFragmentVariant'),
        description:
          'Backing component for experience fragment optimization variant integration test',
        viewports: [testViewport],
        contentProperties: [],
        designProperties: [],
      },
    )
    componentId = component.sys.id
    createdComponentIds.push(componentId)

    await client.component.publish({
      componentId,
      version: component.sys.version,
    })

    const experienceFragment = await client.experienceFragment.create(
      {},
      {
        name: testName('ExperienceFragment for OptimizationVariant'),
        description: 'Backing experience fragment for optimization variant integration test',
        component: makeResourceLink('Contentful:Component', componentId),
        viewports: [testViewport],
        designProperties: {},
      },
    )
    experienceFragmentId = experienceFragment.sys.id
    createdExperienceFragmentIds.push(experienceFragmentId)

    const variant = await client.experienceFragmentVariant.create(
      { experienceFragmentId },
      {
        name: testName('ExperienceFragmentVariant'),
        description: 'Created by integration test',
        component: makeResourceLink('Contentful:Component', componentId),
        viewports: [testViewport],
        designProperties: {},
      },
    )
    if (!variant.sys.variant) {
      throw new Error('Expected created optimization variant to have sys.variant set')
    }
    variantId = variant.sys.variant
    createdVariantIds.push(variantId)
  })

  afterAll(async () => {
    for (const id of createdVariantIds) {
      try {
        let latest = await client.experienceFragmentVariant.get({
          experienceFragmentId,
          variantId: id,
        })
        if (latest.sys.archivedVersion) {
          latest = await client.experienceFragmentVariant.unarchive({
            experienceFragmentId,
            variantId: id,
            version: latest.sys.version,
          })
        }
        if (latest.sys.publishedVersion) {
          latest = await client.experienceFragmentVariant.unpublish({
            experienceFragmentId,
            variantId: id,
            version: latest.sys.version,
          })
        }
        await client.experienceFragmentVariant.delete({ experienceFragmentId, variantId: id })
      } catch {
        // entity already deleted or not found
      }
    }

    for (const id of createdExperienceFragmentIds) {
      try {
        const latest = await client.experienceFragment.get({ experienceFragmentId: id })
        if (latest.sys.publishedVersion) {
          await client.experienceFragment.unpublish({
            experienceFragmentId: id,
            version: latest.sys.version,
          })
        }
        await client.experienceFragment.delete({ experienceFragmentId: id })
      } catch {
        // entity already deleted or not found
      }
    }

    for (const id of createdComponentIds) {
      try {
        const latest = await client.component.get({ componentId: id })
        if (latest.sys.publishedVersion) {
          await client.component.unpublish({
            componentId: id,
            version: latest.sys.version,
          })
        }
        await client.component.delete({ componentId: id })
      } catch {
        // entity already deleted or not found
      }
    }

    await timeoutToCalmRateLimiting()
  })

  it('gets an optimization variant by ID with the expected sys fields', async () => {
    const variant = await client.experienceFragmentVariant.get({
      experienceFragmentId,
      variantId,
    })

    expect(variant.sys.id).toBe(experienceFragmentId)
    expect(variant.sys.type).toBe('ExperienceFragment')
    expect(variant.sys.version).toBeGreaterThanOrEqual(1)
    expect(variant.sys.variant).toBe(variantId)
    expect(variant.sys.variantType).toBeDefined()
    expect(variant.sys.variantDimension).toBeDefined()
    expect(variant.name).toBe(testName('ExperienceFragmentVariant'))
  })

  it('lists optimization variants', async () => {
    const collection = await client.experienceFragmentVariant.getMany({
      experienceFragmentId,
      query: {},
    })

    expect(collection.items.length).toBeGreaterThanOrEqual(1)
    expect(collection.items.find((item) => item.sys.variant === variantId)).toBeDefined()
  })

  it('upserts an optimization variant', async () => {
    const current = await client.experienceFragmentVariant.get({
      experienceFragmentId,
      variantId,
    })
    const { sys, ...body } = current

    const updated = await client.experienceFragmentVariant.upsert(
      { experienceFragmentId, variantId },
      {
        sys: { id: sys.id, type: 'ExperienceFragment', version: sys.version },
        ...body,
        name: testName('ExperienceFragmentVariant Updated'),
      },
    )

    expect(updated.name).toBe(testName('ExperienceFragmentVariant Updated'))
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
  })

  it('publishes and unpublishes an optimization variant', async () => {
    let current = await client.experienceFragmentVariant.get({ experienceFragmentId, variantId })

    const published = await client.experienceFragmentVariant.publish({
      experienceFragmentId,
      variantId,
      version: current.sys.version,
    })
    expect(published.sys.publishedVersion).toBeDefined()

    current = await client.experienceFragmentVariant.get({ experienceFragmentId, variantId })
    const unpublished = await client.experienceFragmentVariant.unpublish({
      experienceFragmentId,
      variantId,
      version: current.sys.version,
    })
    expect(unpublished.sys.publishedVersion).toBeUndefined()
  })

  it('archives and unarchives an optimization variant', async () => {
    let current = await client.experienceFragmentVariant.get({ experienceFragmentId, variantId })

    const archived = await client.experienceFragmentVariant.archive({
      experienceFragmentId,
      variantId,
      version: current.sys.version,
    })
    expect(archived.sys.archivedVersion).toBeDefined()

    current = await client.experienceFragmentVariant.get({ experienceFragmentId, variantId })
    const unarchived = await client.experienceFragmentVariant.unarchive({
      experienceFragmentId,
      variantId,
      version: current.sys.version,
    })
    expect(unarchived.sys.archivedVersion).toBeUndefined()
  })

  it('deletes an optimization variant', async () => {
    await client.experienceFragmentVariant.delete({ experienceFragmentId, variantId })
    await expect(
      client.experienceFragmentVariant.get({ experienceFragmentId, variantId }),
    ).rejects.toThrow()

    const index = createdVariantIds.indexOf(variantId)
    if (index !== -1) createdVariantIds.splice(index, 1)
  })
})
