import { describe, test } from 'mocha'
import { cloneMock } from '../../../mocks/entities'
import { wrapEntry } from '../../../../../lib/entities/entry'
import { expect } from 'chai'
import setupRestAdapter from '../helpers/setupRestAdapter'

function setup(promise, params = {}) {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('asset'),
  }
}

describe('Rest Entry', () => {
  test('Entry update with tags works', async () => {
    const { httpMock, adapterMock } = setup()
    const entityMock = cloneMock('entryWithTags')
    entityMock.sys.version = 2
    const entity = wrapEntry((...args) => adapterMock.makeRequest(...args), entityMock)
    entity.metadata.tags[0] = {
      name: 'newname',
      sys: entityMock.metadata.tags[0].sys,
    }
    return entity.update().then((response) => {
      expect(response.toPlainObject, 'response is wrapped').to.be.ok
      expect(httpMock.put.args[0][1].metadata.tags[0].name).equals('newname', 'metadata is sent')
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
