import { describe, expect, test } from 'vitest'
import { cloneMock } from '../../../mocks/entities'
import setupRestAdapter from '../helpers/setupRestAdapter'

function setup(promise?, params = {}) {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('contentType'),
  }
}

describe('Rest ContentType', { concurrent: true }, () => {
  test('getManyWithCursor', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.get.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'ContentType',
        action: 'getManyWithCursor',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          query: { limit: 10 },
        },
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/content_types',
        )
        expect(httpMock.get.mock.calls[0][1].params).to.eql({ cursor: true, limit: 10 })
      })
  })

  test('getManyWithCursor with pageNext token', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.get.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'ContentType',
        action: 'getManyWithCursor',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          query: { pageNext: 'next-cursor-token' },
        },
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.get.mock.calls[0][1].params).to.eql({
          cursor: true,
          pageNext: 'next-cursor-token',
        })
      })
  })
})
