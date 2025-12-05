import { beforeAll, afterAll, describe, test, expect } from 'vitest'
import type { Environment, PlainClientAPI } from '../../lib/export-types'
import type { Release, ReleasePayload } from '../../lib/entities/release'
import type { ReleaseAction } from '../../lib/entities/release-action'
import type { Space } from '../../lib/export-types'
import { TestDefaults } from '../defaults'
import {
  createTestSpace,
  defaultClient,
  initPlainClient,
  timeoutToCalmRateLimiting,
} from '../helpers'
import { makeLink } from '../utils'

describe('ReleaseAction Api', () => {
  let testSpace: Space
  let testEnvironment: Environment
  let testRelease: Release
  let testRelease2: Release

  let testReleaseAction: ReleaseAction
  let testReleaseAction2: ReleaseAction

  beforeAll(async () => {
    testSpace = (await createTestSpace(defaultClient, 'Release Actions')) as Space
    testEnvironment = await testSpace.getEnvironment('master')

    const contentType = await testEnvironment.createContentTypeWithId('testContentType', {
      name: 'testContentType',
      fields: [
        {
          id: 'title',
          name: 'Title',
          localized: false,
          required: false,
          type: 'Symbol',
        },
      ],
    })
    await contentType.publish()
    await testEnvironment.createEntryWithId(
      'testContentType',
      TestDefaults.entry.testEntryReleasesId,
      {
        fields: {
          title: { 'en-US': 'Non-localized value' },
        },
      },
    )

    const releasePayload: ReleasePayload = {
      title: 'Release (test)',
      entities: {
        sys: { type: 'Array' },
        items: [makeLink('Entry', TestDefaults.entry.testEntryReleasesId)],
      },
    }

    testRelease = await testEnvironment.createRelease(releasePayload)
    testRelease2 = await testEnvironment.createRelease(releasePayload)

    testReleaseAction = await testRelease.validate()
    testReleaseAction2 = await testRelease2.validate()
  })

  afterAll(async () => {
    if (testSpace) {
      return testSpace.delete()
    }
    await timeoutToCalmRateLimiting()
  })

  describe('Read', () => {
    test('Get ReleaseAction', async () => {
      const releaseAction = await testEnvironment.getReleaseAction({
        actionId: testReleaseAction.sys.id,
        releaseId: testRelease.sys.id,
      })

      expect(releaseAction.sys.id).toBe(testReleaseAction.sys.id)
    })

    test('Get ReleaseAction with another release ID', async () => {
      const releaseAction = await testEnvironment.getReleaseAction({
        actionId: testReleaseAction2.sys.id,
        releaseId: testRelease2.sys.id,
      })

      expect(releaseAction.sys.id).toBe(testReleaseAction2.sys.id)
    })

    test('Get ReleaseAction with an incorrect ID', async () => {
      try {
        await testEnvironment.getReleaseAction({
          releaseId: testRelease.sys.id,
          actionId: 'fakeId',
        })
      } catch (error) {
        const parsed = JSON.parse((error as Error).message)
        expect(parsed.status).toBe(404)
        expect(parsed.message).toBe('The resource could not be found.')
        expect(parsed.details).toEqual({
          type: 'ReleaseAction',
          environment: testEnvironment.sys.id,
          space: testEnvironment.sys.space.sys.id,
          release: testRelease.sys.id,
          id: 'fakeId',
        })
      }
    })

    test('Get ReleaseActions with query options', async () => {
      const queryLimit = 1
      const queryResult = await testEnvironment.getReleaseActions({
        query: {
          'sys.release.sys.id[in]': testRelease2.sys.id,
          limit: queryLimit,
          order: 'sys.updatedAt',
          action: 'validate',
        },
      })

      expect(queryResult.items.length).toBe(queryLimit)
      expect(queryResult.items[0].sys.release.sys.id).toBe(testRelease2.sys.id)
    })
  })

  describe('PlainClient API', () => {
    let plainClient: PlainClientAPI

    beforeAll(() => {
      const defaultParams = {
        environmentId: testEnvironment.sys.id,
        spaceId: testSpace.sys.id,
      }

      plainClient = initPlainClient(defaultParams)
    })

    test('releaseAction.getMany', async () => {
      const queryResult = await plainClient.releaseAction.getMany({
        query: { 'sys.release.sys.id[in]': testRelease.sys.id, limit: 1, action: 'validate' },
      })

      expect(queryResult.items.length).toBe(1)
      expect(queryResult.items[0].sys.release.sys.id).toBe(testRelease.sys.id)
    })

    test('releaseAction.get', async () => {
      const queryResult = await plainClient.releaseAction.get({
        releaseId: testRelease.sys.id,
        actionId: testReleaseAction.sys.id,
      })

      expect(queryResult.action).toBe('validate')
      expect(queryResult.sys.id).toBe(testReleaseAction.sys.id)
      expect(queryResult.sys.release.sys.id).toBe(testRelease.sys.id)
    })
  })
})
