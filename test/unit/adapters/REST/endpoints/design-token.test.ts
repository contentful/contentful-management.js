import { describe, test, expect } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'

describe('Rest DesignToken', { concurrent: true }, () => {
  test('getMany calls correct URL', async () => {
    const mockResponse = {
      sys: { type: 'Array' },
      limit: 100,
      items: [],
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'DesignToken',
        action: 'getMany',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          query: {},
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/design_tokens',
        )
        expect(httpMock.get.mock.calls[0][1].params).to.eql({})
      })
  })

  test('getMany passes pagination query parameters', async () => {
    const mockResponse = {
      sys: { type: 'Array' },
      limit: 20,
      items: [],
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'DesignToken',
        action: 'getMany',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          query: {
            limit: 20,
            pageNext: 'next-page-token',
          },
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/design_tokens',
        )
        expect(httpMock.get.mock.calls[0][1].params).to.eql({
          limit: 20,
          pageNext: 'next-page-token',
        })
      })
  })

  test('getMany passes filter query parameters', async () => {
    const mockResponse = {
      sys: { type: 'Array' },
      limit: 100,
      items: [],
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'DesignToken',
        action: 'getMany',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          query: {
            'sys.id[in]': 'id1,id2,id3',
            'type[in]': 'DTCG.Color,DTCG.Dimension',
            'metadata.tags.sys.id[in]': 'tag1,tag2',
          },
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/design_tokens',
        )
        expect(httpMock.get.mock.calls[0][1].params).to.eql({
          'sys.id[in]': 'id1,id2,id3',
          'type[in]': 'DTCG.Color,DTCG.Dimension',
          'metadata.tags.sys.id[in]': 'tag1,tag2',
        })
      })
  })

  test('get calls correct URL', async () => {
    const mockResponse = {
      sys: { id: 'token123', type: 'DesignToken' },
      name: 'Test Token',
      type: 'DTCG.Color',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'DesignToken',
        action: 'get',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          designTokenId: 'token123',
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/design_tokens/token123',
        )
      })
  })

  test('upsert calls correct URL with version header from sys', async () => {
    const mockResponse = {
      sys: { id: 'token123', type: 'DesignToken', version: 2 },
      name: 'Updated Token',
      type: 'DTCG.Color',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'DesignToken',
        action: 'upsert',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          designTokenId: 'token123',
        },
        payload: {
          sys: { id: 'token123', type: 'DesignToken', version: 1 },
          name: 'Updated Token',
          type: 'DTCG.Color',
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/design_tokens/token123',
        )
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(1)
        const body = httpMock.put.mock.calls[0][1]
        expect(body.sys).to.be.undefined
      })
  })

  test('upsert omits version header when version is not provided', async () => {
    const mockResponse = {
      sys: { id: 'newtoken123', type: 'DesignToken', version: 1 },
      name: 'New Token via Upsert',
      type: 'DTCG.Color',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'DesignToken',
        action: 'upsert',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          designTokenId: 'newtoken123',
        },
        payload: {
          sys: { id: 'newtoken123', type: 'DesignToken' },
          name: 'New Token via Upsert',
          type: 'DTCG.Color',
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/design_tokens/newtoken123',
        )
        expect(httpMock.put.mock.calls[0][2].headers).to.not.have.property('X-Contentful-Version')
        const body = httpMock.put.mock.calls[0][1]
        expect(body.sys).to.be.undefined
      })
  })

  test('delete calls correct URL', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: '' }))

    return adapterMock
      .makeRequest({
        entityType: 'DesignToken',
        action: 'delete',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          designTokenId: 'token123',
        },
      })
      .then(() => {
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/design_tokens/token123',
        )
      })
  })
})
