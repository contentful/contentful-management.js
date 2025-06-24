import { describe, it, beforeAll, afterAll, expect, beforeEach } from 'vitest'
import type { PlainClientAPI, ReleaseProps } from '../../lib/export-types'
import { TestDefaults } from '../defaults'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'

describe('Release Api v2', () => {
  let release: ReleaseProps
  let createReleaseClient: PlainClientAPI

  beforeAll(async () => {
    // create a v2 release to reuse in tests
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
      releaseSchemaVersion: 'Release.v2',
    }
    createReleaseClient = initPlainClient(defaultParams)
    release = await createReleaseClient.release.create(defaultParams, {
      title: 'Test Release',
      entities: {
        sys: {
          type: 'Array',
        },
        items: [],
      },
    })
  })

  afterAll(async () => {
    // cleanup test release
    await createReleaseClient.release.delete({
      releaseId: release.sys.id,
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
