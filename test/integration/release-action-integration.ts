/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai'
import { before, describe, test, after } from 'mocha'
import { Environment } from '../../lib/entities/environment'
import { Release } from '../../lib/entities/release'
import { Space } from '../../lib/entities/space'
import { TestDefaults } from '../defaults'
import { getDefaultSpace } from '../helpers'
import { makeLink } from '../utils'

describe('ReleaseAction Api', async function () {
  let testSpace: Space
  let testEnvironment: Environment
  let testRelease: Release

  before(async () => {
    testSpace = await getDefaultSpace()
    testEnvironment = await testSpace.getEnvironment('master')
    testRelease = await testEnvironment.createRelease({
      title: 'Release (test)',
      entities: {
        sys: { type: 'Array' },
        items: [makeLink('Entry', TestDefaults.entry.testEntryReleasesId)],
      },
    })
  })

  after(async () => {
    await testEnvironment.deleteRelease(testRelease.sys.id)
  })

  describe('Read', () => {
    test('Get ReleaseAction', async () => {
      const action = await testEnvironment.validateRelease({
        releaseId: testRelease.sys.id,
      })

      const releaseAction = await testEnvironment.getReleaseAction({
        actionId: action.sys.id,
        releaseId: testRelease.sys.id,
      })

      expect(releaseAction.sys.id).to.eql(action.sys.id)
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

    test('Get ReleaseActions', async () => {
      await testRelease.validate()

      const queryLimit = 1
      const queryResult = await testEnvironment.getReleaseActions({
        query: { limit: queryLimit },
        releaseId: testRelease.sys.id,
      })

      // Returns the filtered results based on the limit
      expect(queryResult.items.length).to.eql(queryLimit)
    })
  })
})
