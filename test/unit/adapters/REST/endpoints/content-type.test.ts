import { describe, expect, test } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'

function setup(promise?, params = {}) {
  return {
    ...setupRestAdapter(promise, params),
  }
}

describe('Rest ContentType', { concurrent: true }, async () => {
  test('getManyWithCursor', async () => {
    const { httpMock, adapterMock } = setup(Promise.resolve({}))
    const cursorResponse = {
      sys: { type: 'Array' },
      items: [],
      pages: { next: '/spaces/space123/environments/master/content_types?pageNext=abc123' },
    }

    httpMock.get.mockReturnValue(Promise.resolve({ data: cursorResponse }))

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
      .then((r: any) => {
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/content_types',
        )
        expect(httpMock.get.mock.calls[0][1].params).to.eql({ cursor: true, limit: 10 })
        expect(r.pages.next).to.eql('abc123')
      })
  })

  test('getManyWithCursor with pageNext token', async () => {
    const { httpMock, adapterMock } = setup(Promise.resolve({}))
    const cursorResponse = { sys: { type: 'Array' }, items: [], pages: {} }

    httpMock.get.mockReturnValue(Promise.resolve({ data: cursorResponse }))

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
      .then((r: any) => {
        expect(httpMock.get.mock.calls[0][1].params).to.eql({
          cursor: true,
          pageNext: 'next-cursor-token',
        })
        expect(r.pages).to.eql({})
      })
  })
})
