import { describe, test, expect } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'

describe('Rest Template', { concurrent: true }, () => {
  test('getMany calls correct URL', async () => {
    const mockResponse = {
      sys: { type: 'Array' },
      limit: 100,
      items: [],
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'Template',
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
          '/spaces/space123/environments/master/templates',
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
        entityType: 'Template',
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
          '/spaces/space123/environments/master/templates',
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
        entityType: 'Template',
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
          '/spaces/space123/environments/master/templates',
        )
        expect(httpMock.get.mock.calls[0][1].params).to.eql({
          order: 'sys.createdAt',
        })
      })
  })

  test('get calls correct URL', async () => {
    const mockResponse = {
      sys: { id: 'template123', type: 'Template' },
      name: 'Test Template',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'Template',
        action: 'get',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          templateId: 'template123',
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/templates/template123',
        )
      })
  })

  test('create calls correct URL with POST', async () => {
    const mockResponse = {
      sys: { id: 'template123', type: 'Template' },
      name: 'New Template',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'Template',
        action: 'create',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
        },
        payload: { name: 'New Template' },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.post.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/templates',
        )
      })
  })

  test('update calls correct URL with PUT and X-Contentful-Version header', async () => {
    const mockResponse = {
      sys: { id: 'template123', type: 'Template', version: 2 },
      name: 'Updated Template',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'Template',
        action: 'update',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          templateId: 'template123',
        },
        payload: {
          sys: { id: 'template123', type: 'Template', version: 1 },
          name: 'Updated Template',
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/templates/template123',
        )
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(1)
      })
  })

  test('delete calls correct URL', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: '' }))

    return adapterMock
      .makeRequest({
        entityType: 'Template',
        action: 'delete',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          templateId: 'template123',
        },
      })
      .then(() => {
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/templates/template123',
        )
      })
  })
})
