import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapSpaceTeam, wrapSpaceTeamCollection } from '../../../lib/entities/space-team'
import {
  entityCollectionWrappedTest,
  entityWrappedTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('spaceTeam'),
  }
}

describe('Entity SpaceTeam', () => {
  test('SpaceTeam is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapSpaceTeam,
    })
  })

  test('SpaceTeam collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapSpaceTeamCollection,
    })
  })
})
