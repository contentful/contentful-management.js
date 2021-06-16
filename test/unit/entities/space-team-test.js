import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapSpaceTeamCollection } from '../../../lib/entities/space-team'
import { entityCollectionWrappedTest } from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('spaceTeam'),
  }
}

describe('Entity SpaceTeam', () => {
  test('SpaceTeam collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapSpaceTeamCollection,
    })
  })
})
