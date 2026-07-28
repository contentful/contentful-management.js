import { describe, test, expect } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'

describe('Rest ExperienceFragment', { concurrent: true }, () => {
  test('getMany calls correct URL', async () => {
    const mockResponse = {
      sys: { type: 'Array' },
      limit: 100,
      items: [],
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ExperienceFragment',
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
          '/spaces/space123/environments/master/experience_fragments',
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
        entityType: 'ExperienceFragment',
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
          '/spaces/space123/environments/master/experience_fragments',
        )
        expect(httpMock.get.mock.calls[0][1].params).to.eql({
          limit: 20,
          pageNext: 'next-page-token',
        })
      })
  })

  test('get calls correct URL', async () => {
    const mockResponse = {
      sys: { id: 'ef123', type: 'ExperienceFragment' },
      name: 'Test Experience Fragment',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ExperienceFragment',
        action: 'get',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          experienceFragmentId: 'ef123',
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experience_fragments/ef123',
        )
      })
  })

  test('create calls correct URL with POST and passes component link', async () => {
    const mockResponse = {
      sys: { id: 'ef123', type: 'ExperienceFragment' },
      name: 'New Experience Fragment',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    const componentLink = {
      sys: {
        type: 'ResourceLink',
        linkType: 'Contentful:Component',
        urn: 'crn:contentful:::experience:spaces/space123/environments/master/components/ct-abc',
      },
    }

    return adapterMock
      .makeRequest({
        entityType: 'ExperienceFragment',
        action: 'create',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
        },
        payload: {
          name: 'New Experience Fragment',
          description: 'A new experience fragment',
          component: componentLink,
          viewports: [],
          designProperties: {},
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.post.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experience_fragments',
        )
        const body = httpMock.post.mock.calls[0][1]
        expect(body.component).to.eql(componentLink)
      })
  })

  test('upsert calls correct URL with PUT and X-Contentful-Version header', async () => {
    const mockResponse = {
      sys: { id: 'ef123', type: 'ExperienceFragment', version: 2 },
      name: 'Updated Experience Fragment',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ExperienceFragment',
        action: 'upsert',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          experienceFragmentId: 'ef123',
        },
        payload: {
          sys: { id: 'ef123', type: 'ExperienceFragment', version: 1 },
          name: 'Updated Experience Fragment',
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experience_fragments/ef123',
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
        entityType: 'ExperienceFragment',
        action: 'delete',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          experienceFragmentId: 'ef123',
        },
      })
      .then(() => {
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experience_fragments/ef123',
        )
      })
  })

  test('publish calls correct URL with PUT and X-Contentful-Version header', async () => {
    const mockResponse = {
      sys: { id: 'ef123', type: 'ExperienceFragment', version: 2, publishedVersion: 1 },
      name: 'Test Experience Fragment',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ExperienceFragment',
        action: 'publish',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          experienceFragmentId: 'ef123',
          version: 1,
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experience_fragments/ef123/published',
        )
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(1)
      })
  })

  test('unpublish calls correct URL with DELETE and X-Contentful-Version header', async () => {
    const mockResponse = {
      sys: { id: 'ef123', type: 'ExperienceFragment', version: 3 },
      name: 'Test Experience Fragment',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ExperienceFragment',
        action: 'unpublish',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          experienceFragmentId: 'ef123',
          version: 2,
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experience_fragments/ef123/published',
        )
        expect(httpMock.delete.mock.calls[0][1].headers['X-Contentful-Version']).to.eql(2)
      })
  })
})
