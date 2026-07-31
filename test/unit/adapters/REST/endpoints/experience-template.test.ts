import { describe, test, expect } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'

describe('Rest ExperienceTemplate', { concurrent: true }, () => {
  test('getMany calls correct URL', async () => {
    const mockResponse = {
      sys: { type: 'Array' },
      limit: 100,
      items: [],
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ExperienceTemplate',
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
          '/spaces/space123/environments/master/experience_templates',
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
        entityType: 'ExperienceTemplate',
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
          '/spaces/space123/environments/master/experience_templates',
        )
        expect(httpMock.get.mock.calls[0][1].params).to.eql({
          limit: 20,
          pageNext: 'next-page-token',
        })
      })
  })

  test('get calls correct URL', async () => {
    const mockResponse = {
      sys: { id: 'et123', type: 'ExperienceTemplate' },
      name: 'Test Experience Template',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ExperienceTemplate',
        action: 'get',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          experienceTemplateId: 'et123',
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experience_templates/et123',
        )
      })
  })

  test('create calls correct URL with POST', async () => {
    const mockResponse = {
      sys: { id: 'et123', type: 'ExperienceTemplate' },
      name: 'New Experience Template',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ExperienceTemplate',
        action: 'create',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
        },
        payload: {
          name: 'New Experience Template',
          description: 'A new experience template',
          viewports: [],
          contentProperties: [],
          designProperties: [],
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.post.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experience_templates',
        )
        const body = httpMock.post.mock.calls[0][1]
        expect(body.name).to.eql('New Experience Template')
      })
  })

  test('upsert calls correct URL with PUT and X-Contentful-Version header', async () => {
    const mockResponse = {
      sys: { id: 'et123', type: 'ExperienceTemplate', version: 2 },
      name: 'Updated Experience Template',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ExperienceTemplate',
        action: 'upsert',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          experienceTemplateId: 'et123',
        },
        payload: {
          sys: { id: 'et123', type: 'ExperienceTemplate', version: 1 },
          name: 'Updated Experience Template',
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experience_templates/et123',
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
        entityType: 'ExperienceTemplate',
        action: 'delete',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          experienceTemplateId: 'et123',
        },
      })
      .then(() => {
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experience_templates/et123',
        )
      })
  })

  test('publish calls correct URL with PUT and X-Contentful-Version header', async () => {
    const mockResponse = {
      sys: { id: 'et123', type: 'ExperienceTemplate', version: 2, publishedVersion: 1 },
      name: 'Test Experience Template',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ExperienceTemplate',
        action: 'publish',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          experienceTemplateId: 'et123',
          version: 1,
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experience_templates/et123/published',
        )
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(1)
      })
  })

  test('unpublish calls correct URL with DELETE and X-Contentful-Version header', async () => {
    const mockResponse = {
      sys: { id: 'et123', type: 'ExperienceTemplate', version: 3 },
      name: 'Test Experience Template',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ExperienceTemplate',
        action: 'unpublish',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          experienceTemplateId: 'et123',
          version: 2,
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experience_templates/et123/published',
        )
        expect(httpMock.delete.mock.calls[0][1].headers['X-Contentful-Version']).to.eql(2)
      })
  })
})
