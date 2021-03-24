import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapTeam, wrapTeamCollection } from '../../../lib/entities/team'
import {
  entityWrappedTest,
  entityCollectionWrappedTest,
  failingActionTest,
  entityUpdateTest,
  entityDeleteTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('team'),
  }
}

describe('Entity TeamSpaceMembership', () => {
  test('Team is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapTeam,
    })
  })

  test('Team collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapTeamCollection,
    })
  })

  test('Team update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapTeam,
    })
  })

  test('Team update fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapTeam,
      actionMethod: 'update',
    })
  })

  test('Team delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapTeam,
    })
  })

  test('Team delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapTeam,
      actionMethod: 'delete',
    })
  })
})
