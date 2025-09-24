import { describe, expect, test } from 'vitest'
import { cloneMock } from '../../../mocks/entities'
import setupRestAdapter from '../helpers/setupRestAdapter'

function setup(promise, params = {}) {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('releaseAsset'),
  }
}

describe('Rest ReleaseAsset', () => {
  test('get', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.get.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseAsset',
        action: 'get',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          releaseId: 'mock-release-id',
          assetId: 'abc123',
        },
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/mock-release-id/assets/abc123',
        )
      })
  })

  test('getMany', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.get.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseAsset',
        action: 'getMany',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          releaseId: 'mock-release-id',
        },
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/mock-release-id/assets',
        )
      })
  })

  test('update', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.put.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseAsset',
        action: 'update',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          releaseId: 'mock-release-id',
          assetId: 'abc123',
        },
        payload: entityMock,
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/mock-release-id/assets/abc123',
        )
      })
  })

  test('create', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.post.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseAsset',
        action: 'create',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          releaseId: 'mock-release-id',
        },
        payload: entityMock,
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.post.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/mock-release-id/assets',
        )
        expect(httpMock.post.mock.calls[0][1]).to.eql(entityMock)
      })
  })

  test('createWithId', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.put.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseAsset',
        action: 'createWithId',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          releaseId: 'mock-release-id',
          assetId: 'abc123',
        },
        payload: entityMock,
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/mock-release-id/assets/abc123',
        )
      })
  })

  test('Asset processing for multiple locales succeeds', async () => {
    const responseMock = cloneMock('releaseAsset')
    responseMock.fields = {
      file: {
        'en-US': {
          fileName: 'filename.jpg',
          url: 'http://server/filename.jpg',
        },
        'de-DE': {
          fileName: 'filename.jpg',
          url: 'http://server/filename.jpg',
        },
      },
    }
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({ data: responseMock }))
    entityMock.fields = {
      file: {
        'en-US': {
          fileName: 'filename.jpg',
          upload: 'http://server/filename.jpg',
        },
        'de-DE': {
          fileName: 'filename.jpg',
          upload: 'http://server/filename.jpg',
        },
      },
    }
    entityMock.sys.version = 2

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseAsset',
        action: 'processForAllLocales',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          asset: entityMock,
        },
      })
      .then(() => {
        expect(httpMock.put.mock.calls[0][0]).equals(
          '/spaces/space123/environments/master/releases/mock-release-id/assets/id/files/en-US/process',
          'en-US locale is sent',
        )
        expect(httpMock.put.mock.calls[1][0]).equals(
          '/spaces/space123/environments/master/releases/mock-release-id/assets/id/files/de-DE/process',
          'de-DE locale is sent',
        )
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).equals(
          2,
          'version header is sent for first locale',
        )
        expect(httpMock.put.mock.calls[1][2].headers['X-Contentful-Version']).equals(
          2,
          'version header is sent for second locale',
        )
        expect(httpMock.get.mock.calls[0][0]).equals(
          '/spaces/space123/environments/master/releases/mock-release-id/assets/id',
          'asset was checked after processing for first locale',
        )
        expect(httpMock.get.mock.calls[1][0]).equals(
          '/spaces/space123/environments/master/releases/mock-release-id/assets/id',
          'asset was checked after processing for second locale',
        )
      })
  })

  test('Asset processing for one locale succeeds', async () => {
    const responseMock = cloneMock('releaseAsset')
    responseMock.fields = {
      file: {
        'en-US': {
          fileName: 'filename.jpg',
          url: 'http://server/filename.jpg',
        },
      },
    }
    const { httpMock, entityMock, adapterMock } = setup(Promise.resolve({ data: responseMock }))
    entityMock.sys.version = 2

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseAsset',
        action: 'processForLocale',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          locale: 'en-US',
          asset: entityMock,
        },
      })
      .then(() => {
        expect(httpMock.put.mock.calls[0][0]).equals(
          '/spaces/space123/environments/master/releases/mock-release-id/assets/id/files/en-US/process',
          'correct locale is sent',
        )
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).equals(
          2,
          'version header is sent',
        )
        expect(httpMock.get.mock.calls[0][0]).equals(
          '/spaces/space123/environments/master/releases/mock-release-id/assets/id',
          'asset was checked after processing',
        )
      })
  })
})
