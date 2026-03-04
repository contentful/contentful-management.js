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
          query: {
            _experienceCtId: 'experience-ct-id',
          },
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql('/spaces/space123/environments/master/views')
        expect(httpMock.get.mock.calls[0][1].params).to.eql({
          _experienceCtId: 'experience-ct-id',
        })
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
            _experienceCtId: 'experience-ct-id',
            limit: 20,
            pageNext: 'next-page-token',
          },
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql('/spaces/space123/environments/master/views')
        expect(httpMock.get.mock.calls[0][1].params).to.eql({
          _experienceCtId: 'experience-ct-id',
          limit: 20,
          pageNext: 'next-page-token',
        })
      })
  })

  test('get calls correct URL', async () => {
    const mockResponse = {
      sys: { id: 'view123', type: 'View' },
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
          '/spaces/space123/environments/master/views/view123',
        )
      })
  })

  test('publish calls correct URL with PUT method', async () => {
    const mockResponse = {
      sys: {
        id: 'view123',
        type: 'View',
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
          '/spaces/space123/environments/master/views/view123/published',
        )
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(1)
      })
  })

  test('create calls correct URL with POST', async () => {
    const mockResponse = {
      sys: { id: 'new-view-123', type: 'View', version: 1 },
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
          _experienceCtId: 'experience-ct-id',
          _slug: 'new-view',
          viewports: [],
          contentProperties: {},
          designProperties: {},
          dimensionKeyMap: { designProperties: {} },
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.post.mock.calls[0][0]).to.eql('/spaces/space123/environments/master/views')
        expect(httpMock.post.mock.calls[0][1]).to.eql({
          name: 'New View',
          description: 'A new view',
          componentTypeId: 'ct-123',
          _experienceCtId: 'experience-ct-id',
          _slug: 'new-view',
          viewports: [],
          contentProperties: {},
          designProperties: {},
          dimensionKeyMap: { designProperties: {} },
        })
      })
  })
})
