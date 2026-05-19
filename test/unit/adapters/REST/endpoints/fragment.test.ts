import { describe, test, expect } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'

describe('Rest Fragment', { concurrent: true }, () => {
  test('getMany calls correct URL', async () => {
    const mockResponse = {
      sys: { type: 'Array' },
      limit: 100,
      items: [],
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'Fragment',
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
          '/spaces/space123/environments/master/fragments',
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
        entityType: 'Fragment',
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
          '/spaces/space123/environments/master/fragments',
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
        entityType: 'Fragment',
        action: 'getMany',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          query: {
            order: 'sys.createdAt',
          },
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/fragments',
        )
        expect(httpMock.get.mock.calls[0][1].params).to.eql({
          order: 'sys.createdAt',
        })
      })
  })

  test('get calls correct URL', async () => {
    const mockResponse = {
      sys: { id: 'fragment123', type: 'Fragment' },
      name: 'Test Fragment',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'Fragment',
        action: 'get',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          fragmentId: 'fragment123',
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/fragments/fragment123',
        )
      })
  })

  test('create calls correct URL with POST', async () => {
    const mockResponse = {
      sys: { id: 'fragment123', type: 'Fragment' },
      name: 'New Fragment',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'Fragment',
        action: 'create',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
        },
        payload: { name: 'New Fragment' },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.post.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/fragments',
        )
      })
  })

  test('update calls correct URL with PUT and X-Contentful-Version header', async () => {
    const mockResponse = {
      sys: { id: 'fragment123', type: 'Fragment', version: 2 },
      name: 'Updated Fragment',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'Fragment',
        action: 'update',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          fragmentId: 'fragment123',
        },
        payload: {
          sys: { id: 'fragment123', type: 'Fragment', version: 1 },
          name: 'Updated Fragment',
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/fragments/fragment123',
        )
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(1)
        const body = httpMock.put.mock.calls[0][1]
        expect(body.sys).to.be.undefined
      })
  })

  test('delete calls correct URL', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: '' }))

    return adapterMock
      .makeRequest({
        entityType: 'Fragment',
        action: 'delete',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          fragmentId: 'fragment123',
        },
      })
      .then(() => {
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/fragments/fragment123',
        )
      })
  })

  test('publish calls correct URL with PUT and X-Contentful-Version header', async () => {
    const mockResponse = {
      sys: { id: 'fragment123', type: 'Fragment', version: 2, publishedVersion: 1 },
      name: 'Test Fragment',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'Fragment',
        action: 'publish',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          fragmentId: 'fragment123',
          version: 1,
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/fragments/fragment123/published',
        )
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(1)
      })
  })

  test('unpublish calls correct URL with DELETE and X-Contentful-Version header', async () => {
    const mockResponse = {
      sys: { id: 'fragment123', type: 'Fragment', version: 3 },
      name: 'Test Fragment',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'Fragment',
        action: 'unpublish',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          fragmentId: 'fragment123',
          version: 2,
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/fragments/fragment123/published',
        )
        expect(httpMock.delete.mock.calls[0][1].headers['X-Contentful-Version']).to.eql(2)
      })
  })
})
