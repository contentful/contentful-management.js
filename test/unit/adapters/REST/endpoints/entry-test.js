import { describe, test } from 'mocha'
import { cloneMock } from '../../../mocks/entities'
import { wrapEntry } from '../../../../../lib/entities/entry'
import { expect } from 'chai'
import setupRestAdapter from '../helpers/setupRestAdapter'

function setup(promise, params = {}) {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('entry'),
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

  test('API call createEntryWithId', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.put.returns(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Entry',
        action: 'createWithId',
        params: {
          environmentId: 'id',
          spaceId: 'id',
          contentTypeId: 'contentTypeId',
          entryId: 'entryId',
        },
        payload: entityMock,
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.put.args[0][0]).to.eql(
          '/spaces/id/environments/id/entries/entryId',
          'entry id is sent'
        )
        expect(httpMock.put.args[0][1]).to.eql(entityMock, 'data is sent')
        expect(httpMock.put.args[0][2].headers['X-Contentful-Content-Type']).to.eql(
          'contentTypeId',
          'content type is specified'
        )
      })
  })
})
