import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
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
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('teamSpaceMembership'),
  }
}

import { expect } from 'chai'

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
    const { httpMock, entityMock } = setup()
    entityMock.sys.version = 2
    const entity = wrapTeamSpaceMembership(httpMock, entityMock)
    entity.roles[0].sys.id = 'updatedId'
    return entity.update().then((response) => {
      expect(response.toPlainObject, 'response is wrapped').to.be.ok
      expect(httpMock.put.args[0][1].roles[0].sys.id).equals('updatedId', 'data is sent')
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
