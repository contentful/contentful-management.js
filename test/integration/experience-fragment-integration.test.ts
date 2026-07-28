import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { testName, testViewport, sweepStaleExoEntities, makeResourceLink } from './utils/exo.utils'

describe('ExperienceFragment Integration', { sequential: true }, () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  const createdExperienceFragmentIds: string[] = []
  const createdComponentTypeIds: string[] = []
  let experienceFragmentId: string
  let componentTypeId: string

  beforeAll(async () => {
    await sweepStaleExoEntities(client)

    const ct = await client.componentType.create(
      {},
      {
        name: testName('CT for ExperienceFragment'),
        description: 'Backing component type for experience fragment integration test',
        viewports: [testViewport],
        contentProperties: [],
        designProperties: [],
      },
    )
    componentTypeId = ct.sys.id
    createdComponentTypeIds.push(componentTypeId)

    await client.componentType.publish({
      componentTypeId: componentTypeId,
      version: ct.sys.version,
    })

    const ef = await client.experienceFragment.create(
      {},
      {
        name: testName('ExperienceFragment'),
        description: 'Created by integration test',
        component: makeResourceLink('Contentful:Component', componentTypeId),
        viewports: [testViewport],
        designProperties: {},
      },
    )
    experienceFragmentId = ef.sys.id
    createdExperienceFragmentIds.push(experienceFragmentId)
  })

  afterAll(async () => {
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

  it('has correct sys fields after creation', async () => {
    const ef = await client.experienceFragment.get({ experienceFragmentId: experienceFragmentId })

    expect(ef.sys.id).toBeDefined()
    expect(ef.sys.type).toBe('ExperienceFragment')
    expect(ef.sys.version).toBeGreaterThanOrEqual(1)
    expect(ef.sys.createdAt).toBeDefined()
    expect(ef.sys.updatedAt).toBeDefined()
    expect(ef.sys.createdBy).toBeDefined()
    expect(ef.sys.component).toBeDefined()
    expect(ef.sys.component.sys.type).toBe('ResourceLink')
    expect(ef.sys.component.sys.linkType).toBe('Contentful:Component')
    expect(ef.sys.component.sys.urn).toContain(componentTypeId)
    expect(ef.name).toBe(testName('ExperienceFragment'))
  })

  it('gets an experience fragment by ID', async () => {
    const fetched = await client.experienceFragment.get({
      experienceFragmentId: experienceFragmentId,
    })

    expect(fetched.sys.id).toBe(experienceFragmentId)
    expect(fetched.sys.type).toBe('ExperienceFragment')
  })

  it('upserts an experience fragment', async () => {
    const current = await client.experienceFragment.get({
      experienceFragmentId: experienceFragmentId,
    })

    // Upsert types require minimal sys — full entity sys is not assignable
    const updated = await client.experienceFragment.upsert(
      { experienceFragmentId: experienceFragmentId },
      {
        ...current,
        sys: {
          id: current.sys.id,
          type: 'ExperienceFragment' as const,
          version: current.sys.version,
        },
        name: testName('ExperienceFragment Updated'),
      },
    )

    expect(updated.name).toBe(testName('ExperienceFragment Updated'))
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
  })

  it('lists experience fragments with cursor pagination', async () => {
    const collection = await client.experienceFragment.getMany({ query: { limit: 10 } })

    expect(collection.items.length).toBeGreaterThanOrEqual(1)
    expect(collection.pages).toBeDefined()

    const found = collection.items.find((item) => item.sys.id === experienceFragmentId)
    expect(found).toBeDefined()
  })

  it('publishes an experience fragment', async () => {
    const current = await client.experienceFragment.get({
      experienceFragmentId: experienceFragmentId,
    })

    const published = await client.experienceFragment.publish({
      experienceFragmentId: experienceFragmentId,
      version: current.sys.version,
    })

    expect(published.sys.publishedVersion).toBeDefined()
    expect(published.sys.publishedAt).toBeDefined()
  })

  it('unpublishes an experience fragment', async () => {
    const current = await client.experienceFragment.get({
      experienceFragmentId: experienceFragmentId,
    })

    const unpublished = await client.experienceFragment.unpublish({
      experienceFragmentId: experienceFragmentId,
      version: current.sys.version,
    })

    expect(unpublished.sys.publishedVersion).toBeUndefined()
  })

  it('rejects delete on a published entity', async () => {
    const current = await client.experienceFragment.get({
      experienceFragmentId: experienceFragmentId,
    })
    if (!current.sys.publishedVersion) {
      await client.experienceFragment.publish({
        experienceFragmentId: experienceFragmentId,
        version: current.sys.version,
      })
    }

    await expect(
      client.experienceFragment.delete({ experienceFragmentId: experienceFragmentId }),
    ).rejects.toThrow()

    const latest = await client.experienceFragment.get({
      experienceFragmentId: experienceFragmentId,
    })
    await client.experienceFragment.unpublish({
      experienceFragmentId: experienceFragmentId,
      version: latest.sys.version,
    })
  })

  it('deletes an experience fragment', async () => {
    const current = await client.experienceFragment.get({
      experienceFragmentId: experienceFragmentId,
    })
    expect(current.sys.publishedVersion).toBeUndefined()

    await client.experienceFragment.delete({ experienceFragmentId: experienceFragmentId })

    await expect(
      client.experienceFragment.get({ experienceFragmentId: experienceFragmentId }),
    ).rejects.toThrow()

    const idx = createdExperienceFragmentIds.indexOf(experienceFragmentId)
    if (idx !== -1) createdExperienceFragmentIds.splice(idx, 1)
  })
})
