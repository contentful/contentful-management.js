import { describe, test, expect } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'

describe('Rest View', { concurrent: true }, () => {
  test('getMany calls correct URL', async () => {
    const mockResponse = {
      sys: { type: 'Array' },
      limit: 100,
      items: [],
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'View',
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
          '/spaces/space123/environments/master/experiences',
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
        entityType: 'View',
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
          '/spaces/space123/environments/master/experiences',
        )
        expect(httpMock.get.mock.calls[0][1].params).to.eql({
          limit: 20,
          pageNext: 'next-page-token',
        })
      })
  })

  test('get calls correct URL', async () => {
    const mockResponse = {
      sys: { id: 'view123', type: 'Experience' },
      title: 'Test View',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'View',
        action: 'get',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          viewId: 'view123',
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experiences/view123',
        )
      })
  })

  test('publish calls correct URL with PUT method', async () => {
    const mockResponse = {
      sys: {
        id: 'view123',
        type: 'Experience',
        version: 2,
        space: { sys: { type: 'Link', linkType: 'Space', id: 'space123' } },
        environment: { sys: { type: 'Link', linkType: 'Environment', id: 'master' } },
      },
      name: 'Test View',
      description: 'A test view',
      viewports: [],
      contentProperties: {},
      designProperties: {},
      dimensionKeyMap: { designProperties: {} },
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'View',
        action: 'publish',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          viewId: 'view123',
          version: 1,
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experiences/view123/published',
        )
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(1)
      })
  })

  test('create calls correct URL with POST', async () => {
    const mockResponse = {
      sys: { id: 'new-view-123', type: 'Experience', version: 1 },
      name: 'New View',
      description: 'A new view',
      viewports: [],
      contentProperties: {},
      designProperties: {},
      dimensionKeyMap: { designProperties: {} },
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'View',
        action: 'create',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
        },
        payload: {
          name: 'New View',
          description: 'A new view',
          componentTypeId: 'ct-123',
          viewports: [],
          contentProperties: {},
          designProperties: {},
          dimensionKeyMap: { designProperties: {} },
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.post.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experiences',
        )
        expect(httpMock.post.mock.calls[0][1]).to.eql({
          name: 'New View',
          description: 'A new view',
          componentTypeId: 'ct-123',
          viewports: [],
          contentProperties: {},
          designProperties: {},
          dimensionKeyMap: { designProperties: {} },
        })
      })
  })

  test('update calls correct URL with version header', async () => {
    const mockResponse = {
      sys: { id: 'view123', type: 'Experience', version: 2 },
      name: 'Updated View',
      description: 'An updated view',
      viewports: [],
      contentProperties: {},
      designProperties: {},
      dimensionKeyMap: { designProperties: {} },
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'View',
        action: 'update',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          viewId: 'view123',
        },
        payload: {
          sys: {
            version: 1,
            componentType: {
              sys: { type: 'Link', linkType: 'ComponentType', id: 'ct-123' },
            },
          },
          name: 'Updated View',
          description: 'An updated view',
          viewports: [],
          contentProperties: {},
          designProperties: {},
          dimensionKeyMap: { designProperties: {} },
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experiences/view123',
        )
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(1)
        const body = httpMock.put.mock.calls[0][1]
        expect(body.componentTypeId).to.eql('ct-123')
        expect(body.sys).to.be.undefined
      })
  })

  test('delete calls correct URL', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: {} }))

    return adapterMock
      .makeRequest({
        entityType: 'View',
        action: 'delete',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          viewId: 'view456',
        },
      })
      .then(() => {
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experiences/view456',
        )
      })
  })

  test('unpublish calls correct URL with DELETE method', async () => {
    const mockResponse = {
      sys: {
        id: 'view123',
        type: 'Experience',
        version: 3,
        space: { sys: { type: 'Link', linkType: 'Space', id: 'space123' } },
        environment: { sys: { type: 'Link', linkType: 'Environment', id: 'master' } },
      },
      name: 'Test View',
      description: 'A test view',
      viewports: [],
      contentProperties: {},
      designProperties: {},
      dimensionKeyMap: { designProperties: {} },
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'View',
        action: 'unpublish',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          viewId: 'view123',
          version: 2,
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experiences/view123/published',
        )
        expect(httpMock.delete.mock.calls[0][1].headers['X-Contentful-Version']).to.eql(2)
      })
  })
})
