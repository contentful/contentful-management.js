import { expect } from 'chai'
import { before, describe, test } from 'mocha'
import { Environment } from '../../lib/entities/environment'
import { Release, ReleasePayload } from '../../lib/entities/release'
import { ReleaseAction } from '../../lib/entities/release-action'
import { Space } from '../../lib/entities/space'
import { TestDefaults } from '../defaults'
import { createTestSpace, initClient, initPlainClient } from '../helpers'
import { makeLink } from '../utils'

describe('ReleaseAction Api', async () => {
  let testSpace: Space
  let testEnvironment: Environment
  let testRelease: Release
  let testRelease2: Release

  let testReleaseAction: ReleaseAction
  let testReleaseAction2: ReleaseAction

  before(async () => {
    testSpace = (await createTestSpace(initClient(), 'Release Actions')) as unknown as Space
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
      }
    )

    const releasePayload: ReleasePayload = {
      title: 'Release (test)',
      entities: {
        sys: { type: 'Array' },
        items: [makeLink('Entry', TestDefaults.entry.testEntryReleasesId)],
      },
    }

    ;[testRelease, testRelease2] = await Promise.all([
      await testEnvironment.createRelease(releasePayload),
      await testEnvironment.createRelease(releasePayload),
    ])

    /**
     * @summary Runs 2 Release Actions (validations) since we can only
     * run 2 per minute per environment (backend limitation).
     * **/
    testReleaseAction = await testRelease.validate()
    testReleaseAction2 = await testRelease2.validate()
  })

  describe('Read', () => {
    test('Get ReleaseAction', async () => {
      const releaseAction = await testEnvironment.getReleaseAction({
        actionId: testReleaseAction.sys.id,
        releaseId: testRelease.sys.id,
      })

      expect(releaseAction.sys.id).to.eql(testReleaseAction.sys.id)
    })

    test('Get ReleaseAction with another release ID', async () => {
      const releaseAction = await testEnvironment.getReleaseAction({
        actionId: testReleaseAction2.sys.id,
        releaseId: testRelease2.sys.id,
      })

      expect(releaseAction.sys.id).to.eql(testReleaseAction2.sys.id)
    })

    test('Get ReleaseAction with an incorrect ID', async () => {
      try {
        await testEnvironment.getReleaseAction({
          releaseId: testRelease.sys.id,
          actionId: 'fakeId',
        })
      } catch (error) {
        const parsed = JSON.parse(error.message)
        expect(parsed.status).to.eql(404)
        expect(parsed.message).to.eql('The resource could not be found.')
        expect(parsed.details).to.eql({
          type: 'ReleaseAction',
          environment: testEnvironment.sys.id,
          space: testEnvironment.sys.space.sys.id,
          release: testRelease.sys.id,
          id: 'fakeId',
        })
      }
    })

    test('Get ReleaseActions (deprecated param `releaseId`)', async () => {
      const queryLimit = 1
      const queryResult = await testEnvironment.getReleaseActions({
        query: { limit: queryLimit },
        releaseId: testRelease.sys.id,
      })

      // Returns the filtered results based on the limit
      expect(queryResult.items.length).to.eql(queryLimit)
      expect(queryResult.items[0].sys.release.sys.id).to.eql(testRelease.sys.id)
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

      // Returns the filtered results based on the limit
      expect(queryResult.items.length).to.eql(queryLimit)
      expect(queryResult.items[0].sys.release.sys.id).to.eql(testRelease2.sys.id)
    })
  })

  describe('PlainClient API', () => {
    test('releaseAction.getMany', async () => {
      const defaultParams = {
        environmentId: testEnvironment.sys.id,
        spaceId: testSpace.sys.id,
      }

      const plainClient = initPlainClient(defaultParams)

      const queryResult = await plainClient.releaseAction.getMany({
        query: { 'sys.release.sys.id[in]': testRelease.sys.id, limit: 1, action: 'validate' },
      })

      // Returns the filtered results based on the limit
      expect(queryResult.items.length).to.eql(1)
      expect(queryResult.items[0].sys.release.sys.id).to.eql(testRelease.sys.id)
    })

    test('releaseAction.get', async () => {
      const defaultParams = {
        environmentId: testEnvironment.sys.id,
        spaceId: testSpace.sys.id,
      }

      const plainClient = initPlainClient(defaultParams)

      const queryResult = await plainClient.releaseAction.get({
        releaseId: testRelease.sys.id,
        actionId: testReleaseAction.sys.id,
      })

      // Returns the filtered results based on the limit
      expect(queryResult.action).to.eql('validate')
      expect(queryResult.sys.id).to.eql(testReleaseAction.sys.id)
      expect(queryResult.sys.release.sys.id).to.eql(testRelease.sys.id)
    })
  })
})
