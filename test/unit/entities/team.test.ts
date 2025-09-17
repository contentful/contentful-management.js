import { describe, test } from 'vitest'
import { cloneMock } from '../mocks/entities.js'
import setupMakeRequest from '../mocks/makeRequest.js'
import { wrapTeam, wrapTeamCollection } from '../../../lib/entities/team.js'
import {
  entityWrappedTest,
  entityCollectionWrappedTest,
  failingActionTest,
  entityUpdateTest,
  entityDeleteTest,
} from '../test-creators/instance-entity-methods.js'

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
