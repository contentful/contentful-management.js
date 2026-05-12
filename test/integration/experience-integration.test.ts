import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { testRunId, testViewport, sweepStaleExoEntities } from './utils/exo.utils'

describe('Experience Integration', () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  const createdExperienceIds: string[] = []
  const createdComponentTypeIds: string[] = []

  beforeAll(async () => {
    await sweepStaleExoEntities(client)
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

  it('full lifecycle: create → get → update → getMany → publish → locale publish → unpublish → delete', async () => {
    // --- Setup: create and publish a backing ComponentType ---
    let ct = await client.componentType.create(
      {},
      {
        name: `Integration Test CT for Experience [${testRunId}]`,
        description: 'Backing component type for experience integration test',
        viewports: [testViewport],
        contentProperties: [],
        designProperties: [],
        dimensionKeyMap: { designProperties: {} },
      },
    )
    createdComponentTypeIds.push(ct.sys.id)

    ct = await client.componentType.publish({
      componentTypeId: ct.sys.id,
      version: ct.sys.version,
    })

    // --- Create ---
    const created = await client.experience.create(
      {},
      {
        name: `Integration Test Experience [${testRunId}]`,
        description: 'Created by integration test',
        componentTypeId: ct.sys.id,
        viewports: [testViewport],
        contentProperties: {},
        designProperties: {},
        dimensionKeyMap: { designProperties: {} },
      },
    )
    createdExperienceIds.push(created.sys.id)

    expect(created.sys.id).toBeDefined()
    expect(created.sys.type).toBe('Experience')
    expect(created.sys.version).toBeGreaterThanOrEqual(1)
    expect(created.sys.createdAt).toBeDefined()
    expect(created.sys.createdBy).toBeDefined()
    expect(created.sys.componentType).toBeDefined()
    expect(created.sys.componentType!.sys.id).toBe(ct.sys.id)
    expect(created.name).toBe(`Integration Test Experience [${testRunId}]`)

    // --- Get ---
    const fetched = await client.experience.get({ experienceId: created.sys.id })

    expect(fetched.sys.id).toBe(created.sys.id)
    expect(fetched.sys.type).toBe('Experience')

    // --- Update ---
    const updated = await client.experience.update(
      { experienceId: fetched.sys.id },
      { ...fetched, name: `Integration Test Experience Updated [${testRunId}]` },
    )

    expect(updated.name).toBe(`Integration Test Experience Updated [${testRunId}]`)
    expect(updated.sys.version).toBeGreaterThan(fetched.sys.version)

    // --- GetMany (cursor pagination) ---
    const collection = await client.experience.getMany({ query: { limit: 10 } })

    expect(collection.sys).toBeDefined()
    expect(collection.pages).toBeDefined()
    expect(collection.items).toBeDefined()
    expect(Array.isArray(collection.items)).toBe(true)
    const found = collection.items.find((item) => item.sys.id === created.sys.id)
    expect(found).toBeDefined()

    // --- Publish (full — all locales) ---
    const published = await client.experience.publish({
      experienceId: updated.sys.id,
      version: updated.sys.version,
    })

    expect(published.sys.publishedVersion).toBeDefined()
    expect(published.sys.publishedAt).toBeDefined()

    // --- Publish (locale-aware add) ---
    const localePublished = await client.experience.publish(
      { experienceId: published.sys.id, version: published.sys.version },
      { add: ['en-US'] },
    )

    expect(localePublished.sys.publishedVersion).toBeDefined()

    // --- Unpublish ---
    const unpublished = await client.experience.unpublish({
      experienceId: localePublished.sys.id,
      version: localePublished.sys.version,
    })

    expect(unpublished.sys.publishedVersion).toBeUndefined()

    // --- Delete ---
    await client.experience.delete({ experienceId: unpublished.sys.id })

    await expect(
      client.experience.get({ experienceId: unpublished.sys.id }),
    ).rejects.toThrow()

    createdExperienceIds.splice(createdExperienceIds.indexOf(created.sys.id), 1)
  })
})
