import { describe, expect, test } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'

const releaseParams = {
  spaceId: 'space123',
  environmentId: 'master',
  releaseId: 'release123',
}

const experienceResponse = {
  sys: {
    id: 'experience123',
    type: 'Experience',
    version: 1,
    release: { sys: { type: 'Link', linkType: 'Release', id: 'release123' } },
  },
  name: 'Release Experience',
  description: 'An experience in a release',
  viewports: [],
  designProperties: {},
}

describe('Rest ReleaseExperience', () => {
  test('getMany calls the release-scoped URL and passes query parameters', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: { sys: { type: 'Array' }, limit: 100, items: [] } }),
    )

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseExperience',
        action: 'getMany',
        userAgent: 'mocked',
        params: {
          ...releaseParams,
          query: { limit: 20, pageNext: 'next-page-token' },
        },
      })
      .then(() => {
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/release123/experiences',
        )
        expect(httpMock.get.mock.calls[0][1].params).to.eql({
          limit: 20,
          pageNext: 'next-page-token',
        })
        expect(httpMock.get.mock.calls[0][1].headers['x-contentful-enable-alpha-feature']).to.eql(
          'new-exo-entity-types',
        )
      })
  })

  test('get calls the release-scoped URL', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: experienceResponse }),
    )

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseExperience',
        action: 'get',
        userAgent: 'mocked',
        params: { ...releaseParams, experienceId: 'experience123' },
      })
      .then((result) => {
        expect(result).to.eql(experienceResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/release123/experiences/experience123',
        )
      })
  })

  test('create calls the release-scoped URL with POST', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: experienceResponse }),
    )
    const payload = {
      name: 'Release Experience',
      description: 'An experience in a release',
      viewports: [],
      designProperties: {},
      experienceTemplate: {
        sys: {
          type: 'ResourceLink',
          linkType: 'Contentful:ExperienceTemplate',
          urn: 'crn:contentful:::experience-template/template123',
        },
      },
    }

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseExperience',
        action: 'create',
        userAgent: 'mocked',
        params: releaseParams,
        payload,
      })
      .then((result) => {
        expect(result).to.eql(experienceResponse)
        expect(httpMock.post.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/release123/experiences',
        )
        expect(httpMock.post.mock.calls[0][1]).to.eql(payload)
      })
  })

  test('upsert calls the release-scoped URL and sends the version header', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: experienceResponse }),
    )
    const payload = {
      sys: { id: 'experience123', type: 'Experience', version: 2 },
      name: 'Updated Release Experience',
      description: 'An updated experience in a release',
      viewports: [],
      designProperties: {},
    }

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseExperience',
        action: 'upsert',
        userAgent: 'mocked',
        params: { ...releaseParams, experienceId: 'experience123' },
        payload,
      })
      .then(() => {
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/release123/experiences/experience123',
        )
        expect(httpMock.put.mock.calls[0][1].sys).to.be.undefined
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(2)
      })
  })

  test('delete calls the release-scoped URL', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: {} }))

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseExperience',
        action: 'delete',
        userAgent: 'mocked',
        params: { ...releaseParams, experienceId: 'experience123' },
      })
      .then(() => {
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/release123/experiences/experience123',
        )
      })
  })
})
