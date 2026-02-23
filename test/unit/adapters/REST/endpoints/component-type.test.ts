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
          query: {
            _experienceCtId: 'experience-ct-id',
          },
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/component_types',
        )
        expect(httpMock.get.mock.calls[0][1].params).to.eql({
          _experienceCtId: 'experience-ct-id',
        })
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
            _experienceCtId: 'experience-ct-id',
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
          _experienceCtId: 'experience-ct-id',
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
})
