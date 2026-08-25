import { describe, expect, test } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'

const releaseParams = {
  spaceId: 'space123',
  environmentId: 'master',
  releaseId: 'release123',
}

const fragmentResponse = {
  sys: {
    id: 'fragment123',
    type: 'Fragment',
    version: 1,
    release: { sys: { type: 'Link', linkType: 'Release', id: 'release123' } },
  },
  name: 'Release Fragment',
  description: 'A fragment in a release',
  viewports: [],
  designProperties: {},
}

describe('Rest ReleaseFragment', () => {
  test('getMany calls the release-scoped URL and passes query parameters', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: { sys: { type: 'Array' }, limit: 100, items: [] } }),
    )

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseFragment',
        action: 'getMany',
        userAgent: 'mocked',
        params: {
          ...releaseParams,
          query: { limit: 20, pageNext: 'next-page-token' },
        },
      })
      .then(() => {
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/release123/fragments',
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
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: fragmentResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseFragment',
        action: 'get',
        userAgent: 'mocked',
        params: { ...releaseParams, fragmentId: 'fragment123' },
      })
      .then((result) => {
        expect(result).to.eql(fragmentResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/release123/fragments/fragment123',
        )
      })
  })

  test('create calls the release-scoped URL with POST', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: fragmentResponse }))
    const payload = {
      name: 'Release Fragment',
      description: 'A fragment in a release',
      viewports: [],
      designProperties: {},
      componentType: {
        sys: {
          type: 'ResourceLink',
          linkType: 'Contentful:ComponentType',
          urn: 'crn:contentful:::component-type/component123',
        },
      },
    }

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseFragment',
        action: 'create',
        userAgent: 'mocked',
        params: releaseParams,
        payload,
      })
      .then((result) => {
        expect(result).to.eql(fragmentResponse)
        expect(httpMock.post.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/release123/fragments',
        )
        expect(httpMock.post.mock.calls[0][1]).to.eql(payload)
      })
  })

  test('upsert calls the release-scoped URL and sends the version header', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: fragmentResponse }))
    const payload = {
      sys: { id: 'fragment123', type: 'Fragment', version: 2 },
      name: 'Updated Release Fragment',
      description: 'An updated fragment in a release',
      viewports: [],
      designProperties: {},
    }

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseFragment',
        action: 'upsert',
        userAgent: 'mocked',
        params: { ...releaseParams, fragmentId: 'fragment123' },
        payload,
      })
      .then(() => {
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/release123/fragments/fragment123',
        )
        expect(httpMock.put.mock.calls[0][1].sys).to.be.undefined
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(2)
      })
  })

  test('delete calls the release-scoped URL', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: {} }))

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseFragment',
        action: 'delete',
        userAgent: 'mocked',
        params: { ...releaseParams, fragmentId: 'fragment123' },
      })
      .then(() => {
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/release123/fragments/fragment123',
        )
      })
  })
})
