import { describe, test, expect } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'

describe('Rest Experience', { concurrent: true }, () => {
  test('getMany calls correct URL', async () => {
    const mockResponse = {
      sys: { type: 'Array' },
      limit: 100,
      items: [],
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'Experience',
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
        entityType: 'Experience',
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
      sys: { id: 'experience123', type: 'Experience' },
      title: 'Test Experience',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'Experience',
        action: 'get',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          experienceId: 'experience123',
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experiences/experience123',
        )
      })
  })

  test('publish calls correct URL with PUT method', async () => {
    const mockResponse = {
      sys: {
        id: 'experience123',
        type: 'Experience',
        version: 2,
        space: { sys: { type: 'Link', linkType: 'Space', id: 'space123' } },
        environment: { sys: { type: 'Link', linkType: 'Environment', id: 'master' } },
      },
      name: 'Test Experience',
      description: 'A test experience',
      viewports: [],
      contentProperties: {},
      designProperties: {},
      dimensionKeyMap: { designProperties: {} },
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'Experience',
        action: 'publish',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          experienceId: 'experience123',
          version: 1,
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experiences/experience123/published',
        )
        expect(httpMock.put.mock.calls[0][1]).to.eql(null)
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(1)
      })
  })

  test('publish with locale add payload sends correct body', async () => {
    const mockResponse = {
      sys: {
        id: 'experience123',
        type: 'Experience',
        version: 2,
      },
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'Experience',
        action: 'publish',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          experienceId: 'experience123',
          version: 1,
        },
        payload: { add: ['en-US', 'de-DE'] },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experiences/experience123/published',
        )
        expect(httpMock.put.mock.calls[0][1]).to.eql({ add: ['en-US', 'de-DE'] })
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(1)
      })
  })

  test('publish with locale remove payload sends correct body', async () => {
    const mockResponse = {
      sys: {
        id: 'experience123',
        type: 'Experience',
        version: 2,
      },
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'Experience',
        action: 'publish',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          experienceId: 'experience123',
          version: 1,
        },
        payload: { remove: ['de-DE'] },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experiences/experience123/published',
        )
        expect(httpMock.put.mock.calls[0][1]).to.eql({ remove: ['de-DE'] })
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(1)
      })
  })

  test('create calls correct URL with POST', async () => {
    const mockResponse = {
      sys: { id: 'new-experience-123', type: 'Experience', version: 1 },
      name: 'New Experience',
      description: 'A new experience',
      viewports: [],
      contentProperties: {},
      designProperties: {},
      dimensionKeyMap: { designProperties: {} },
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'Experience',
        action: 'create',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
        },
        payload: {
          name: 'New Experience',
          description: 'A new experience',
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
          name: 'New Experience',
          description: 'A new experience',
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
      sys: { id: 'experience123', type: 'Experience', version: 2 },
      name: 'Updated Experience',
      description: 'An updated experience',
      viewports: [],
      contentProperties: {},
      designProperties: {},
      dimensionKeyMap: { designProperties: {} },
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'Experience',
        action: 'update',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          experienceId: 'experience123',
        },
        payload: {
          sys: {
            version: 1,
            componentType: {
              sys: { type: 'Link', linkType: 'ComponentType', id: 'ct-123' },
            },
          },
          name: 'Updated Experience',
          description: 'An updated experience',
          viewports: [],
          contentProperties: {},
          designProperties: {},
          dimensionKeyMap: { designProperties: {} },
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experiences/experience123',
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
        entityType: 'Experience',
        action: 'delete',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          experienceId: 'experience456',
        },
      })
      .then(() => {
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experiences/experience456',
        )
      })
  })

  test('unpublish calls correct URL with DELETE method', async () => {
    const mockResponse = {
      sys: {
        id: 'experience123',
        type: 'Experience',
        version: 3,
        space: { sys: { type: 'Link', linkType: 'Space', id: 'space123' } },
        environment: { sys: { type: 'Link', linkType: 'Environment', id: 'master' } },
      },
      name: 'Test Experience',
      description: 'A test experience',
      viewports: [],
      contentProperties: {},
      designProperties: {},
      dimensionKeyMap: { designProperties: {} },
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'Experience',
        action: 'unpublish',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          experienceId: 'experience123',
          version: 2,
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experiences/experience123/published',
        )
        expect(httpMock.delete.mock.calls[0][1].headers['X-Contentful-Version']).to.eql(2)
      })
  })
})
