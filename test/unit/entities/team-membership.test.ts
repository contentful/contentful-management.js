import { describe, test } from 'vitest'
import { cloneMock } from '../mocks/entities.js'
import setupMakeRequest from '../mocks/makeRequest.js'
import {
  wrapTeamMembership,
  wrapTeamMembershipCollection,
} from '../../../lib/entities/team-membership.js'
import {
  entityWrappedTest,
  entityUpdateTest,
  entityDeleteTest,
  failingActionTest,
  entityCollectionWrappedTest,
} from '../test-creators/instance-entity-methods.js'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('teamMembership'),
  }
}

describe('Entity TeamMembership', () => {
  test('TeamMembership is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapTeamMembership,
    })
  })

  test('TeamMembership collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapTeamMembershipCollection,
    })
  })

  test('TeamMembership update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapTeamMembership,
    })
  })

  test('TeamMembership update fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapTeamMembership,
      actionMethod: 'update',
    })
  })

  test('TeamMembership delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapTeamMembership,
    })
  })

  test('TeamMembership delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapTeamMembership,
      actionMethod: 'delete',
    })
  })
})
