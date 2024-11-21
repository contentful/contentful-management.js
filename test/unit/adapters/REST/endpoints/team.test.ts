import { expect, describe, test } from 'vitest'
import { cloneMock } from '../../../mocks/entities'
import { wrapTeam } from '../../../../../lib/entities/team'
import setupRestAdapter from '../helpers/setupRestAdapter'

function setup(promise, params = {}) {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('team'),
  }
}

describe('Rest Team', () => {
  test('Team update', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({ data: {} }))
    entityMock.sys.version = 2
    const entity = wrapTeam((...args) => adapterMock.makeRequest(...args), entityMock)
    entity.description = 'new description'
    return entity.update().then((response) => {
      expect(response.toPlainObject, 'response is wrapped').to.be.ok
      expect(httpMock.put.mock.calls[0][0]).equals(
        `/organizations/mock-organization-id/teams/${entityMock.sys.id}`,
        'url is correct'
      )
      expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).equals(
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

  test('Team delete', async () => {
    const { httpMock, entityMock, adapterMock } = setup(Promise.resolve({ data: {} }))
    entityMock.sys.version = 2
    const entity = wrapTeam((...args) => adapterMock.makeRequest(...args), entityMock)
    return entity.delete().then((response) => {
      expect(httpMock.delete.mock.calls[0][0]).equals(
        `/organizations/mock-organization-id/teams/${entityMock.sys.id}`,
        'url is correct'
      )
      return {
        httpMock,
        entityMock,
        response,
      }
    })
  })
})
