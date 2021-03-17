import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  wrapTeamMembership,
  wrapTeamMembershipCollection,
} from '../../../lib/entities/team-membership'
import {
  entityWrappedTest,
  entityUpdateTest,
  entityDeleteTest,
  failingActionTest,
  entityCollectionWrappedTest,
} from '../test-creators/instance-entity-methods'
import { expect } from 'chai'

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

  /**
   * Move to adapters/REST
   */
  test.skip('TeamMembership update', async () => {
    const { httpMock, entityMock } = setup()
    entityMock.sys.version = 2
    entityMock.sys.team = { sys: { id: 'team1' } }
    const entity = wrapTeamMembership(httpMock, entityMock)
    entity.admin = true
    return entity.update().then((response) => {
      expect(response.toPlainObject, 'response is wrapped').to.be.ok
      expect(httpMock.put.args[0][0]).equals(
        `/organizations/org-id/teams/team1/team_memberships/${entityMock.sys.id}`,
        'url is correct'
      )
      expect(httpMock.put.args[0][2].headers['X-Contentful-Version']).equals(
        2,
        'version header is sent'
      )
      return {
        httpMock,
        entityMock,
        response,
      }
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

  /**
   * Move to adapters/REST
   */
  test.skip('TeamMembership delete', async () => {
    const { httpMock, entityMock } = setup()
    entityMock.sys.version = 2
    entityMock.sys.team = { sys: { id: 'team1' } }
    const entity = wrapTeamMembership(httpMock, entityMock)
    return entity.delete().then((response) => {
      expect(httpMock.delete.args[0][0]).equals(
        `/organizations/org-id/teams/team1/team_memberships/${entityMock.sys.id}`,
        'url is correct'
      )
      return {
        httpMock,
        entityMock,
        response,
      }
    })
  })

  test('TeamMembership delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapTeamMembership,
      actionMethod: 'delete',
    })
  })
})
