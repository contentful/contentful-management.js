import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { makeResourceLink, sweepStaleExoEntities, testName, testViewport } from './utils/exo.utils'

describe('FragmentOptimizationVariant Integration', { sequential: true }, () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  const createdVariantIds: string[] = []
  const createdFragmentIds: string[] = []
  const createdComponentTypeIds: string[] = []
  let fragmentId: string
  let componentTypeId: string
  let variantId: string

  beforeAll(async () => {
    await sweepStaleExoEntities(client)

    const componentType = await client.componentType.create(
      {},
      {
        name: testName('ComponentType for FragmentOptimizationVariant'),
        description: 'Backing component type for fragment optimization variant integration test',
        viewports: [testViewport],
        contentProperties: [],
        designProperties: [],
      },
    )
    componentTypeId = componentType.sys.id
    createdComponentTypeIds.push(componentTypeId)

    await client.componentType.publish({
      componentTypeId,
      version: componentType.sys.version,
    })

    const fragment = await client.fragment.create(
      {},
      {
        name: testName('Fragment for OptimizationVariant'),
        description: 'Backing fragment for optimization variant integration test',
        componentType: makeResourceLink('Contentful:ComponentType', componentTypeId),
        viewports: [testViewport],
        designProperties: {},
      },
    )
    fragmentId = fragment.sys.id
    createdFragmentIds.push(fragmentId)

    const variant = await client.fragmentOptimizationVariant.create(
      { fragmentId },
      {
        name: testName('FragmentOptimizationVariant'),
        description: 'Created by integration test',
        componentType: makeResourceLink('Contentful:ComponentType', componentTypeId),
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
        let latest = await client.fragmentOptimizationVariant.get({
          fragmentId,
          variantId: id,
        })
        if (latest.sys.archivedVersion) {
          latest = await client.fragmentOptimizationVariant.unarchive({
            fragmentId,
            variantId: id,
            version: latest.sys.version,
          })
        }
        if (latest.sys.publishedVersion) {
          latest = await client.fragmentOptimizationVariant.unpublish({
            fragmentId,
            variantId: id,
            version: latest.sys.version,
          })
        }
        await client.fragmentOptimizationVariant.delete({ fragmentId, variantId: id })
      } catch {
        // entity already deleted or not found
      }
    }

    for (const id of createdFragmentIds) {
      try {
        const latest = await client.fragment.get({ fragmentId: id })
        if (latest.sys.publishedVersion) {
          await client.fragment.unpublish({
            fragmentId: id,
            version: latest.sys.version,
          })
        }
        await client.fragment.delete({ fragmentId: id })
      } catch {
        // entity already deleted or not found
      }
    }

    for (const id of createdComponentTypeIds) {
      try {
        const latest = await client.componentType.get({ componentTypeId: id })
        if (latest.sys.publishedVersion) {
          await client.componentType.unpublish({
            componentTypeId: id,
            version: latest.sys.version,
          })
        }
        await client.componentType.delete({ componentTypeId: id })
      } catch {
        // entity already deleted or not found
      }
    }

    await timeoutToCalmRateLimiting()
  })

  it('gets an optimization variant by ID with the expected sys fields', async () => {
    const variant = await client.fragmentOptimizationVariant.get({ fragmentId, variantId })

    expect(variant.sys.id).toBe(variantId)
    expect(variant.sys.type).toBe('Fragment')
    expect(variant.sys.version).toBeGreaterThanOrEqual(1)
    expect(variant.sys.variant).toBeDefined()
    expect(variant.sys.variantType).toBeDefined()
    expect(variant.sys.variantDimension).toBeDefined()
    expect(variant.name).toBe(testName('FragmentOptimizationVariant'))
  })

  it('lists optimization variants', async () => {
    const collection = await client.fragmentOptimizationVariant.getMany({
      fragmentId,
      query: {},
    })

    expect(collection.items.length).toBeGreaterThanOrEqual(1)
    expect(collection.items.find((item) => item.sys.id === variantId)).toBeDefined()
  })

  it('upserts an optimization variant', async () => {
    const current = await client.fragmentOptimizationVariant.get({ fragmentId, variantId })
    const { sys, ...body } = current

    const updated = await client.fragmentOptimizationVariant.upsert(
      { fragmentId, variantId },
      {
        sys: { id: sys.id, type: 'Fragment', version: sys.version },
        ...body,
        name: testName('FragmentOptimizationVariant Updated'),
      },
    )

    expect(updated.name).toBe(testName('FragmentOptimizationVariant Updated'))
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
  })

  it('publishes and unpublishes an optimization variant', async () => {
    let current = await client.fragmentOptimizationVariant.get({ fragmentId, variantId })

    const published = await client.fragmentOptimizationVariant.publish({
      fragmentId,
      variantId,
      version: current.sys.version,
    })
    expect(published.sys.publishedVersion).toBeDefined()

    current = await client.fragmentOptimizationVariant.get({ fragmentId, variantId })
    const unpublished = await client.fragmentOptimizationVariant.unpublish({
      fragmentId,
      variantId,
      version: current.sys.version,
    })
    expect(unpublished.sys.publishedVersion).toBeUndefined()
  })

  it('archives and unarchives an optimization variant', async () => {
    let current = await client.fragmentOptimizationVariant.get({ fragmentId, variantId })

    const archived = await client.fragmentOptimizationVariant.archive({
      fragmentId,
      variantId,
      version: current.sys.version,
    })
    expect(archived.sys.archivedVersion).toBeDefined()

    current = await client.fragmentOptimizationVariant.get({ fragmentId, variantId })
    const unarchived = await client.fragmentOptimizationVariant.unarchive({
      fragmentId,
      variantId,
      version: current.sys.version,
    })
    expect(unarchived.sys.archivedVersion).toBeUndefined()
  })

  it('deletes an optimization variant', async () => {
    await client.fragmentOptimizationVariant.delete({ fragmentId, variantId })
    await expect(
      client.fragmentOptimizationVariant.get({ fragmentId, variantId }),
    ).rejects.toThrow()

    const index = createdVariantIds.indexOf(variantId)
    if (index !== -1) createdVariantIds.splice(index, 1)
  })
})
