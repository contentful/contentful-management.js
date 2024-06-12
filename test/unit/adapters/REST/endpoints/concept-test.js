import { describe, test } from 'mocha'
import { cloneMock } from '../../../mocks/entities'
import { expect } from 'chai'
import setupRestAdapter from '../helpers/setupRestAdapter'

function setup(promise, params = {}) {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('concept'),
  }
}

describe.only('Rest Concept', () => {
  test('API call createConcept', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.post.returns(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Concept',
        action: 'create',
        params: {
          organization: 'organization-id',
        },
        payload: entityMock,
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.post.args[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concepts',
          'concept id is sent'
        )
        // expect(httpMock.put.args[0][1]).to.eql(entityMock, 'data is sent')
        // expect(httpMock.put.args[0][2].headers['X-Contentful-Content-Type']).to.eql(
        //   'contentTypeId',
        //   'content type is specified'
        // )
      })
  })
})
