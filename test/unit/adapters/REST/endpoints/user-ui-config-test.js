import { expect } from 'chai'
import { describe, test } from 'mocha'
import { wrapUIConfig } from '../../../../../lib/entities/ui-config'
import { cloneMock } from '../../../mocks/entities'
import setupRestAdapter from '../helpers/setupRestAdapter'

function setup(promise, params = {}) {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('userUIConfig'),
  }
}

describe('Rest UserUIConfig', () => {
  test('UIConfig update works', async () => {
    const { httpMock, adapterMock } = setup()
    const entityMock = cloneMock('userUIConfig')
    entityMock.sys.version = 2
    const entity = wrapUIConfig((...args) => adapterMock.makeRequest(...args), entityMock)
    entity.entryListViews[0] = 'view'

    return entity.update().then((response) => {
      expect(response.toPlainObject, 'response is wrapped').to.be.ok
      expect(httpMock.put.args[0][1].entryListViews[0]).equals('view', 'metadata is sent')
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
})
