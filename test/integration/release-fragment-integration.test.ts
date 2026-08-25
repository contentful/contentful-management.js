import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { makeResourceLink, sweepStaleExoEntities, testName, testViewport } from './utils/exo.utils'

describe('ReleaseFragment Integration', { sequential: true }, () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  const createdReleaseFragmentIds: string[] = []
  let releaseId: string
  let componentTypeId: string
  let releaseFragmentId: string

  beforeAll(async () => {
    await sweepStaleExoEntities(client)

    const componentType = await client.componentType.create(
      {},
      {
        name: testName('ComponentType for ReleaseFragment'),
        description: 'Backing component type for release fragment integration test',
        viewports: [testViewport],
        contentProperties: [],
        designProperties: [],
      },
    )
    componentTypeId = componentType.sys.id

    await client.componentType.publish({
      componentTypeId,
      version: componentType.sys.version,
    })

    const release = await client.release.create(
      {},
      {
        title: testName('Release for Fragment'),
        entities: { sys: { type: 'Array' }, items: [] },
      },
    )
    releaseId = release.sys.id

    const created = await client.releaseFragment.create(
      { releaseId },
      {
        name: testName('ReleaseFragment'),
        description: 'Created by integration test',
        componentType: makeResourceLink('Contentful:ComponentType', componentTypeId),
        viewports: [testViewport],
        designProperties: {},
      },
    )
    releaseFragmentId = created.sys.id
    createdReleaseFragmentIds.push(releaseFragmentId)
  })

  afterAll(async () => {
    for (const id of createdReleaseFragmentIds) {
      try {
        await client.releaseFragment.delete({ releaseId, fragmentId: id })
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

    if (componentTypeId) {
      try {
        const latest = await client.componentType.get({ componentTypeId })
        if (latest.sys.publishedVersion) {
          await client.componentType.unpublish({
            componentTypeId,
            version: latest.sys.version,
          })
        }
        await client.componentType.delete({ componentTypeId })
      } catch {
        // entity already deleted or not found
      }
    }

    await timeoutToCalmRateLimiting()
  })

  it('gets a release fragment by ID with the expected sys fields', async () => {
    const fragment = await client.releaseFragment.get({ releaseId, fragmentId: releaseFragmentId })

    expect(fragment.sys.id).toBe(releaseFragmentId)
    expect(fragment.sys.type).toBe('Fragment')
    expect(fragment.sys.version).toBeGreaterThanOrEqual(1)
    expect(fragment.sys.release.sys.type).toBe('Link')
    expect(fragment.sys.release.sys.linkType).toBe('Release')
    expect(fragment.sys.release.sys.id).toBe(releaseId)
    expect(fragment.sys.componentType.sys.linkType).toBe('Contentful:ComponentType')
    expect(fragment.sys.componentType.sys.urn).toContain(componentTypeId)
    expect(fragment.name).toBe(testName('ReleaseFragment'))
  })

  it('lists release fragments with cursor pagination', async () => {
    const collection = await client.releaseFragment.getMany({
      releaseId,
      query: { limit: 10 },
    })

    expect(collection.items.length).toBeGreaterThanOrEqual(1)
    expect(collection.pages).toBeDefined()
    expect(collection.items.find((item) => item.sys.id === releaseFragmentId)).toBeDefined()
  })

  it('upserts a release fragment', async () => {
    const current = await client.releaseFragment.get({ releaseId, fragmentId: releaseFragmentId })
    const { sys, ...body } = current

    const updated = await client.releaseFragment.upsert(
      { releaseId, fragmentId: releaseFragmentId },
      {
        sys: { id: sys.id, type: 'Fragment', version: sys.version },
        ...body,
        name: testName('ReleaseFragment Updated'),
      },
    )

    expect(updated.name).toBe(testName('ReleaseFragment Updated'))
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
  })

  it('deletes a release fragment', async () => {
    await client.releaseFragment.delete({ releaseId, fragmentId: releaseFragmentId })
    await expect(
      client.releaseFragment.get({ releaseId, fragmentId: releaseFragmentId }),
    ).rejects.toThrow()

    const index = createdReleaseFragmentIds.indexOf(releaseFragmentId)
    if (index !== -1) createdReleaseFragmentIds.splice(index, 1)
  })
})
