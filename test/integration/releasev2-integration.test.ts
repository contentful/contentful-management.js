import { describe, it, beforeAll, afterAll, expect, beforeEach } from 'vitest'
import type { EntryProps, PlainClientAPI, ReleaseProps } from '../../lib/export-types'
import { TestDefaults } from '../defaults'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { makeLink } from '../utils'

describe('Release Api v2', () => {
  let entry: EntryProps
  let release: ReleaseProps
  let createReleaseClient: PlainClientAPI

  beforeAll(async () => {
    // create a v2 release to reuse in tests
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
      releaseSchemaVersion: 'Release.v2' as const,
    }
    createReleaseClient = initPlainClient(defaultParams)

    entry = await createReleaseClient.entry.create(
      { ...defaultParams, contentTypeId: TestDefaults.contentType.withCrossSpaceReferenceId },
      {
        fields: {
          title: {
            'en-US': 'Test Entry for Release',
          },
        },
      }
    )

    release = await createReleaseClient.release.create(defaultParams, {
      title: 'Test Release',
      entities: {
        sys: { type: 'Array' },
        items: [
          {
            entity: makeLink('Entry', entry.sys.id),
            action: 'publish',
          },
        ],
      },
    })
  })

  afterAll(async () => {
    // cleanup test release
    await createReleaseClient.release.delete({
      releaseId: release.sys.id,
    })
    await createReleaseClient.entry.delete({
      entryId: entry.sys.id,
    })
    await timeoutToCalmRateLimiting()
  })

  describe('releaseSchemaVersion is provided as a default in client', () => {
    let clientWithSchemaDefault: PlainClientAPI
    beforeEach(() => {
      const defaultParams = {
        environmentId: TestDefaults.environmentId,
        spaceId: TestDefaults.spaceId,
        releaseSchemaVersion: 'Release.v2',
      }
      clientWithSchemaDefault = initPlainClient(defaultParams)
    })

    it('release.create works', async () => {
      const newRelease = await clientWithSchemaDefault.release.create(
        {
          environmentId: TestDefaults.environmentId,
          spaceId: TestDefaults.spaceId,
        },
        {
          title: 'New Test Release',
          entities: {
            sys: {
              type: 'Array',
            },
            items: [],
          },
        }
      )
      expect(newRelease.sys.schemaVersion).toEqual('Release.v2')
      // cleanup
      await clientWithSchemaDefault.release.delete({
        releaseId: newRelease.sys.id,
      })
    })

    it('release.query works', async () => {
      const releases = await clientWithSchemaDefault.release.query({})
      const fetchedRelease = releases.items.find((item) => item.sys.id === release.sys.id)
      expect(fetchedRelease).toEqual(release)
      expect(releases.pages).toStrictEqual({})
    })

    it('release.update works', async () => {
      const updatedRelease = await clientWithSchemaDefault.release.update({
        environmentId: TestDefaults.environmentId,
        spaceId: TestDefaults.spaceId,
        releaseId: release.sys.id,
        version: release.sys.version,
      },
      {
        title: 'Updated Test Release',
        entities: {
          sys: {
            type: 'Array',
          },
          items: [
            {
              entity: {
                sys: {
                  type: 'Link',
                  linkType: 'Entry',
                  id: entry.sys.id,
                },
              },
              action: 'publish',
            },
          ],
        },
        startDate: "2025-08-28T10:00:000Z"
      }
    )
    expect(updatedRelease.sys.schemaVersion).toEqual('Release.v2')
    //cleanup
    await clientWithSchemaDefault.release.delete({
      releaseId: updatedRelease.sys.id,
    })
  })

    it('release.entry.get works', async () => {
      const entryInSpace = await clientWithSchemaDefault.release.entry.get({
        releaseId: release.sys.id,
        entryId: entry.sys.id, // Using the same ID for simplicity
        environmentId: TestDefaults.environmentId,
        spaceId: TestDefaults.spaceId,
      })
      expect(entryInSpace.sys.id).toEqual(entry.sys.id)
      expect(entryInSpace.sys.release.sys.id).toEqual(release.sys.id)
    })
  })

  describe('and releaseSchemaVersion is not provided as a default', () => {
    let clientWithoutSchemaDefault: PlainClientAPI
    beforeEach(() => {
      const defaultParams = {
        environmentId: TestDefaults.environmentId,
        spaceId: TestDefaults.spaceId,
      }
      clientWithoutSchemaDefault = initPlainClient(defaultParams)
    })

    it('release.create works', async () => {
      const newRelease = await clientWithoutSchemaDefault.release.create(
        {},
        {
          title: 'New Test Release',
          sys: {
            schemaVersion: 'Release.v2',
            type: 'Release',
          },
          entities: {
            sys: {
              type: 'Array',
            },
            items: [],
          },
        }
      )
      expect(newRelease.sys.schemaVersion).toEqual('Release.v2')
      // cleanup
      await clientWithoutSchemaDefault.release.delete({
        releaseId: newRelease.sys.id,
      })
    })

    it('release.update works', async () => {
      const updatedRelease = await clientWithoutSchemaDefault.release.update({
        version: release.sys.version,
        releaseId: release.sys.id,
      },
      {
        title: 'Updated Test Release',
        sys: {
          schemaVersion: 'Release.v2',
          type: 'Release',
        },
        entities: {
          sys: {
            type: 'Array',
          },
          items: [
            {
              entity: {
                sys: {
                  type: 'Link',
                  linkType: 'Entry',
                  id: entry.sys.id,
                },
              },
              action: 'publish',
            },
          ],
        },
        startDate: "2025-08-28T10:00:000Z"
      }
    )
    expect(updatedRelease.sys.schemaVersion).toEqual('Release.v2')
    //cleanup
    await clientWithoutSchemaDefault.release.delete({
      releaseId: updatedRelease.sys.id,
    })
    })
    it('release.query works', async () => {
      const releases = await clientWithoutSchemaDefault.release.query({
        query: {
          'sys.schemaVersion': 'Release.v2',
        },
      })
      const fetchedRelease = releases.items.find((item) => item.sys.id === release.sys.id)
      expect(fetchedRelease?.sys.schemaVersion).toEqual('Release.v2')
    })
  })
})
