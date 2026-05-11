import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import type { ComponentTypeProps } from '../../lib/entities/component-type'
import type { ExperienceProps } from '../../lib/entities/experience'

describe('Experience Integration', () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  let componentType: ComponentTypeProps
  let experience: ExperienceProps

  beforeAll(async () => {
    // Experiences require a published ComponentType
    componentType = await client.componentType.create(
      {},
      {
        name: 'CT for Experience Test',
        description: 'Backing component type for experience integration test',
        viewports: [
          {
            id: 'desktop',
            query: '(min-width: 1024px)',
            displayName: 'Desktop',
            previewSize: '100%',
          },
        ],
        contentProperties: [],
        designProperties: [],
        dimensionKeyMap: { designProperties: {} },
      },
    )

    componentType = await client.componentType.publish({
      componentTypeId: componentType.sys.id,
      version: componentType.sys.version,
    })

    experience = await client.experience.create(
      {},
      {
        name: 'Integration Test Experience',
        description: 'Created by integration test',
        componentTypeId: componentType.sys.id,
        viewports: [
          {
            id: 'desktop',
            query: '(min-width: 1024px)',
            displayName: 'Desktop',
            previewSize: '100%',
          },
        ],
        contentProperties: {},
        designProperties: {},
        dimensionKeyMap: { designProperties: {} },
      },
    )
  })

  afterAll(async () => {
    try {
      const latestExp = await client.experience.get({
        experienceId: experience.sys.id,
      })
      if (latestExp.sys.publishedVersion) {
        await client.experience.unpublish({
          experienceId: latestExp.sys.id,
          version: latestExp.sys.version,
        })
        const unpublishedExp = await client.experience.get({
          experienceId: latestExp.sys.id,
        })
        await client.experience.delete({
          experienceId: unpublishedExp.sys.id,
        })
      } else {
        await client.experience.delete({
          experienceId: latestExp.sys.id,
        })
      }
    } catch {
      // already cleaned up
    }

    try {
      const latestCt = await client.componentType.get({
        componentTypeId: componentType.sys.id,
      })
      if (latestCt.sys.publishedVersion) {
        await client.componentType.unpublish({
          componentTypeId: latestCt.sys.id,
          version: latestCt.sys.version,
        })
        const unpublishedCt = await client.componentType.get({
          componentTypeId: latestCt.sys.id,
        })
        await client.componentType.delete({
          componentTypeId: unpublishedCt.sys.id,
        })
      } else {
        await client.componentType.delete({
          componentTypeId: latestCt.sys.id,
        })
      }
    } catch {
      // already cleaned up
    }

    await timeoutToCalmRateLimiting()
  })

  it('creates an experience with correct sys fields', () => {
    expect(experience.sys.id).toBeDefined()
    expect(experience.sys.type).toBe('Experience')
    expect(experience.sys.version).toBeGreaterThanOrEqual(1)
    expect(experience.sys.createdAt).toBeDefined()
    expect(experience.sys.updatedAt).toBeDefined()
    expect(experience.sys.createdBy).toBeDefined()
    expect(experience.sys.componentType).toBeDefined()
    expect(experience.sys.componentType!.sys.id).toBe(componentType.sys.id)
    expect(experience.name).toBe('Integration Test Experience')
  })

  it('gets an experience by ID', async () => {
    const fetched = await client.experience.get({
      experienceId: experience.sys.id,
    })

    expect(fetched.sys.id).toBe(experience.sys.id)
    expect(fetched.sys.type).toBe('Experience')
    expect(fetched.name).toBe('Integration Test Experience')
  })

  it('updates an experience', async () => {
    const current = await client.experience.get({
      experienceId: experience.sys.id,
    })

    const updated = await client.experience.update(
      { experienceId: current.sys.id },
      {
        ...current,
        name: 'Updated Integration Test Experience',
      },
    )

    expect(updated.name).toBe('Updated Integration Test Experience')
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
    experience = updated
  })

  it('lists experiences with cursor pagination', async () => {
    const collection = await client.experience.getMany({
      query: { limit: 10 },
    })

    expect(collection.sys).toBeDefined()
    expect(collection.pages).toBeDefined()
    expect(collection.items).toBeDefined()
    expect(Array.isArray(collection.items)).toBe(true)
    expect(collection.items.length).toBeGreaterThanOrEqual(1)

    const found = collection.items.find((item) => item.sys.id === experience.sys.id)
    expect(found).toBeDefined()
  })

  it('publishes an experience (full publish)', async () => {
    const current = await client.experience.get({
      experienceId: experience.sys.id,
    })

    const published = await client.experience.publish({
      experienceId: current.sys.id,
      version: current.sys.version,
    })

    expect(published.sys.publishedVersion).toBeDefined()
    expect(published.sys.publishedAt).toBeDefined()
    experience = published
  })

  it('publishes an experience with locale-aware add', async () => {
    const current = await client.experience.get({
      experienceId: experience.sys.id,
    })

    const published = await client.experience.publish(
      {
        experienceId: current.sys.id,
        version: current.sys.version,
      },
      { add: ['en-US'] },
    )

    expect(published.sys.publishedVersion).toBeDefined()
    experience = published
  })

  it('unpublishes an experience', async () => {
    const current = await client.experience.get({
      experienceId: experience.sys.id,
    })

    const unpublished = await client.experience.unpublish({
      experienceId: current.sys.id,
      version: current.sys.version,
    })

    expect(unpublished.sys.publishedVersion).toBeUndefined()
    experience = unpublished
  })
})
