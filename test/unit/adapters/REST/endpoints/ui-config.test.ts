import { describe, test, expect } from 'vitest'
import { wrapUIConfig } from '../../../../../lib/entities/ui-config'
import { cloneMock } from '../../../mocks/entities'
import setupRestAdapter from '../helpers/setupRestAdapter'

function setup(promise, params = {}) {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('uiConfig'),
  }
}

describe('Rest UIConfig', () => {
  test('UIConfig update works', async () => {
    const { httpMock, adapterMock } = setup(Promise.resolve({ data: {} }))
    const entityMock = cloneMock('uiConfig')
    entityMock.sys.version = 2
    const entity = wrapUIConfig((...args) => adapterMock.makeRequest(...args), entityMock)
    entity.entryListViews = [{ id: 'view', title: 'View', views: [] }]

    return entity.update().then((response) => {
      expect(response.toPlainObject, 'response is wrapped').to.be.ok
      expect(httpMock.put.mock.calls[0][1].entryListViews[0].id).equals('view', 'metadata is sent')
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
})
