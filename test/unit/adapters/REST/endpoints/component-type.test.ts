import { describe, test, expect } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'

describe('Rest ComponentType', { concurrent: true }, () => {
  test('getMany calls correct URL', async () => {
    const mockResponse = {
      sys: { type: 'Array' },
      total: 1,
      skip: 0,
      limit: 100,
      items: [],
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ComponentType',
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
          '/spaces/space123/environments/master/component_types',
        )
        expect(httpMock.get.mock.calls[0][1].params).to.eql({})
      })
  })

  test('getMany passes pagination query parameters', async () => {
    const mockResponse = {
      sys: { type: 'Array' },
      total: 50,
      skip: 10,
      limit: 20,
      items: [],
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ComponentType',
        action: 'getMany',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          query: {
            skip: 10,
            limit: 20,
          },
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/component_types',
        )
        expect(httpMock.get.mock.calls[0][1].params).to.eql({
          skip: 10,
          limit: 20,
        })
      })
  })

  test('get calls correct URL', async () => {
    const mockResponse = {
      sys: { id: 'component123', type: 'ComponentType' },
      name: 'Test Component',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ComponentType',
        action: 'get',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          componentTypeId: 'component123',
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/component_types/component123',
        )
      })
  })

  test('publish calls correct URL with PUT method', async () => {
    const mockResponse = {
      sys: {
        id: 'ct123',
        type: 'ComponentType',
        version: 2,
        space: { sys: { type: 'Link', linkType: 'Space', id: 'space123' } },
        environment: { sys: { type: 'Link', linkType: 'Environment', id: 'master' } },
      },
      name: 'Test Component',
      description: 'A test component type',
      viewports: [],
      contentProperties: [],
      designProperties: [],
      dimensionKeyMap: { designProperties: {} },
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ComponentType',
        action: 'publish',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          componentTypeId: 'ct123',
          version: 1,
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/component_types/ct123/published',
        )
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(1)
      })
  })

  test('unpublish calls correct URL with DELETE method', async () => {
    const mockResponse = {
      sys: {
        id: 'ct123',
        type: 'ComponentType',
        version: 2,
        space: { sys: { type: 'Link', linkType: 'Space', id: 'space123' } },
        environment: { sys: { type: 'Link', linkType: 'Environment', id: 'master' } },
      },
      name: 'Test Component',
      description: 'A test component type',
      viewports: [],
      contentProperties: [],
      designProperties: [],
      dimensionKeyMap: { designProperties: {} },
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ComponentType',
        action: 'unpublish',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          componentTypeId: 'ct123',
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/component_types/ct123/published',
        )
      })
  })

  test('delete calls correct URL', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: '' }))

    return adapterMock
      .makeRequest({
        entityType: 'ComponentType',
        action: 'delete',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          componentTypeId: 'component123',
        },
      })
      .then(() => {
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/component_types/component123',
        )
      })
  })

  test('update calls correct URL with version header', async () => {
    const mockResponse = {
      sys: { id: 'comp123', type: 'ComponentType', version: 2 },
      name: 'Updated Component',
      description: 'An updated component type',
      viewports: [],
      contentProperties: [],
      designProperties: [],
      dimensionKeyMap: { designProperties: {} },
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ComponentType',
        action: 'update',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          componentTypeId: 'comp123',
        },
        payload: {
          sys: { version: 1 },
          name: 'Updated Component',
          description: 'An updated component type',
          viewports: [],
          contentProperties: [],
          designProperties: [],
          dimensionKeyMap: { designProperties: {} },
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/component_types/comp123',
        )
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(1)
      })
  })

  test('update (upsert) omits version header when sys.version is undefined', async () => {
    const mockResponse = {
      sys: { id: 'newcomp123', type: 'ComponentType', version: 1 },
      name: 'New Component via Upsert',
      description: 'A component type created via upsert',
      viewports: [],
      contentProperties: [],
      designProperties: [],
      dimensionKeyMap: { designProperties: {} },
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ComponentType',
        action: 'update',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          componentTypeId: 'newcomp123',
        },
        payload: {
          sys: {},
          name: 'New Component via Upsert',
          description: 'A component type created via upsert',
          viewports: [],
          contentProperties: [],
          designProperties: [],
          dimensionKeyMap: { designProperties: {} },
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/component_types/newcomp123',
        )
        expect(httpMock.put.mock.calls[0][2].headers).to.not.have.property('X-Contentful-Version')
      })
  })

  test('create calls correct URL with POST', async () => {
    const mockResponse = {
      sys: { id: 'new123', type: 'ComponentType', version: 1 },
      name: 'New Component',
      description: 'A new component type',
      viewports: [],
      contentProperties: [],
      designProperties: [],
      dimensionKeyMap: { designProperties: {} },
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ComponentType',
        action: 'create',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
        },
        payload: {
          name: 'New Component',
          description: 'A new component type',
          viewports: [],
          contentProperties: [],
          designProperties: [],
          dimensionKeyMap: { designProperties: {} },
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.post.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/component_types',
        )
        expect(httpMock.post.mock.calls[0][1]).to.eql({
          name: 'New Component',
          description: 'A new component type',
          viewports: [],
          contentProperties: [],
          designProperties: [],
          dimensionKeyMap: { designProperties: {} },
        })
      })
  })
})
