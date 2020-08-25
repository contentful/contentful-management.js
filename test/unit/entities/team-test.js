import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { wrapTeam, wrapTeamCollection } from '../../../lib/entities/team'
import {
  entityWrappedTest,
  entityCollectionWrappedTest,
  failingActionTest,
} from '../test-creators/instance-entity-methods'
import { expect } from 'chai'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
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
    const { httpMock, entityMock } = setup()
    entityMock.sys.version = 2
    const entity = wrapTeam(httpMock, entityMock)
    entity.description = 'new description'
    return entity.update().then((response) => {
      expect(response.toPlainObject, 'response is wrapped').to.be.ok
      expect(httpMock.put.args[0][0]).equals(`teams/${entityMock.sys.id}`, 'url is correct')
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

  test('Team update fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapTeam,
      actionMethod: 'update',
    })
  })

  test('Team delete', async () => {
    const { httpMock, entityMock } = setup()
    entityMock.sys.version = 2
    const entity = wrapTeam(httpMock, entityMock)
    return entity.delete().then((response) => {
      expect(httpMock.delete.args[0][0]).equals(`teams/${entityMock.sys.id}`, 'url is correct')
      return {
        httpMock,
        entityMock,
        response,
      }
    })
  })

  test('Team delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapTeam,
      actionMethod: 'delete',
    })
  })
})
