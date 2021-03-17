import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  wrapTeamSpaceMembership,
  wrapTeamSpaceMembershipCollection,
} from '../../../lib/entities/team-space-membership'
import {
  entityWrappedTest,
  entityCollectionWrappedTest,
  entityDeleteTest,
  failingActionTest,
  failingVersionActionTest,
  entityUpdateTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('teamSpaceMembership'),
  }
}

describe('Entity TeamSpaceMembership', () => {
  test('TeamSpaceMembership is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapTeamSpaceMembership,
    })
  })

  test('TeamSpaceMembership collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapTeamSpaceMembershipCollection,
    })
  })

  test('TeamSpaceMembership update', async () => {
    entityUpdateTest(setup, {
      wrapperMethod: wrapTeamSpaceMembership,
    })
  })

  test('TeamSpaceMembership update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapTeamSpaceMembership,
      actionMethod: 'update',
    })
  })

  test('TeamSpaceMembership delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapTeamSpaceMembership,
    })
  })

  test('TeamSpaceMembership delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapTeamSpaceMembership,
      actionMethod: 'delete',
    })
  })
})
