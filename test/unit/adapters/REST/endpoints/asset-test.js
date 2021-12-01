import { describe, test } from 'mocha'
import { cloneMock, assetWithFilesMock } from '../../../mocks/entities'
import { wrapAsset } from '../../../../../lib/entities/asset'
import { expect } from 'chai'
import setupRestAdapter from '../helpers/setupRestAdapter'

function setup(promise, params = {}) {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('asset'),
  }
}

describe('Rest Asset', async () => {
  test('Asset processing for multiple locales succeeds', async () => {
    const responseMock = cloneMock('asset')
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
    const entity = wrapAsset((...args) => adapterMock.makeRequest(...args), entityMock)
    return entity.processForAllLocales().then(() => {
      expect(httpMock.put.args[0][0]).equals(
        '/spaces/space-id/environments/environment-id/assets/id/files/en-US/process',
        'en-US locale is sent'
      )
      expect(httpMock.put.args[1][0]).equals(
        '/spaces/space-id/environments/environment-id/assets/id/files/de-DE/process',
        'de-DE locale is sent'
      )
      expect(httpMock.put.args[0][2].headers['X-Contentful-Version']).equals(
        2,
        'version header is sent for first locale'
      )
      expect(httpMock.put.args[1][2].headers['X-Contentful-Version']).equals(
        2,
        'version header is sent for second locale'
      )
      expect(httpMock.get.args[0][0]).equals(
        '/spaces/space-id/environments/environment-id/assets/id',
        'asset was checked after processing for first locale'
      )
      expect(httpMock.get.args[1][0]).equals(
        '/spaces/space-id/environments/environment-id/assets/id',
        'asset was checked after processing for second locale'
      )
    })
  })

  test('Asset processing for one locale succeeds', async () => {
    const responseMock = cloneMock('asset')
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
    const entity = wrapAsset((...args) => adapterMock.makeRequest(...args), entityMock)
    return entity.processForLocale('en-US').then(() => {
      expect(httpMock.put.args[0][0]).equals(
        '/spaces/space-id/environments/environment-id/assets/id/files/en-US/process',
        'correct locale is sent'
      )
      expect(httpMock.put.args[0][2].headers['X-Contentful-Version']).equals(
        2,
        'version header is sent'
      )
      expect(httpMock.get.args[0][0]).equals(
        '/spaces/space-id/environments/environment-id/assets/id',
        'asset was checked after processing'
      )
    })
  })

  /*
    - Test is failing
    - it also causes a memory leak in watch mode
   */
  test.skip('Asset processing for one locale fails due to timeout', async () => {
    const responseMock = cloneMock('asset')
    responseMock.fields = {
      file: { 'en-US': { fileName: 'filename.jpg' } }, // url property never sent in response
    }
    const { httpMock, entityMock, adapterMock } = setup(Promise.resolve({ data: responseMock }))
    entityMock.sys.version = 2
    const entity = wrapAsset((...args) => adapterMock.makeRequest(...args), entityMock)
    try {
      await entity.processForLocale('en-US')
    } catch (error) {
      expect(httpMock.get.callCount > 1, 'asset is checked multiple times').to.be.ok
      expect(error.name).equals('AssetProcessingTimeout', 'timeout is thrown')
    }
  })

  test('Asset processing for multiple locales succeeds', async () => {
    const responseMock = cloneMock('asset')
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
    const { httpMock, entityMock, adapterMock } = setup(Promise.resolve({ data: responseMock }))
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
    const entity = wrapAsset((...args) => adapterMock.makeRequest(...args), entityMock)
    return entity.processForAllLocales().then(() => {
      expect(httpMock.put.args[0][0]).equals(
        '/spaces/space-id/environments/environment-id/assets/id/files/en-US/process',
        'en-US locale is sent'
      )
      expect(httpMock.put.args[1][0]).equals(
        '/spaces/space-id/environments/environment-id/assets/id/files/de-DE/process',
        'de-DE locale is sent'
      )
      expect(httpMock.put.args[0][2].headers['X-Contentful-Version']).equals(
        2,
        'version header is sent for first locale'
      )
      expect(httpMock.put.args[1][2].headers['X-Contentful-Version']).equals(
        2,
        'version header is sent for second locale'
      )
      expect(httpMock.get.args[0][0]).equals(
        '/spaces/space-id/environments/environment-id/assets/id',
        'asset was checked after processing for first locale'
      )
      expect(httpMock.get.args[1][0]).equals(
        '/spaces/space-id/environments/environment-id/assets/id',
        'asset was checked after processing for second locale'
      )
    })
  })

  test('Asset processing for multiple locales fails due to timeout', async () => {
    const responseMock = cloneMock('asset')
    responseMock.fields = {
      file: {
        'en-US': { fileName: 'filename.jpg' }, // url property never sent
        'de-DE': { fileName: 'filename.jpg' }, // url property never sent
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
    const entity = wrapAsset((...args) => adapterMock.makeRequest(...args), entityMock)
    return entity.processForAllLocales().catch((error) => {
      expect(httpMock.get.callCount > 1, 'asset is checked multiple times').to.be.ok
      expect(error.name).equals('AssetProcessingTimeout', 'timeout is thrown')
    })
  })

  test('Asset update with tags works', async () => {
    const { adapterMock, httpMock } = setup()
    const entityMock = cloneMock('assetWithTags')
    entityMock.sys.version = 2
    const entity = wrapAsset((...args) => adapterMock.makeRequest(...args), entityMock)
    entity.metadata.tags[0] = {
      name: 'newname',
      sys: entityMock.metadata.tags[0].sys,
    }
    return entity.update().then((response) => {
      expect(response.toPlainObject, 'response is wrapped').to.be.ok
      expect(httpMock.put.args[0][1].metadata.tags[0].name).equals('newname', 'metadata is sent')
      expect(httpMock.put.args[0][2].headers['X-Contentful-Version']).equals(
        2,
        'version header is sent'
      )
      return {
        httpMock,
        entityMock,
        response,
      }
    })
  })

  test('API call createAssetFromFiles', async () => {
    const { httpMock, adapterMock } = setup(Promise.resolve({}))

    httpMock.post.onFirstCall().returns(
      Promise.resolve({
        data: {
          sys: {
            id: 'some_random_id',
          },
        },
      })
    )

    httpMock.post.onSecondCall().returns(
      Promise.resolve({
        data: {
          sys: {
            id: 'some_random_id',
          },
        },
      })
    )

    httpMock.post.onThirdCall().returns(
      Promise.resolve({
        data: assetWithFilesMock,
      })
    )

    return adapterMock
      .makeRequest({
        entityType: 'Asset',
        action: 'createFromFiles',
        params: { spaceId: 'id' },
        payload: {
          fields: {
            file: {
              locale: {
                contentType: 'image/svg+xml',
                fileName: 'filename.svg',
                file: '<svg xmlns="http://www.w3.org/2000/svg"><path fill="red" d="M50 50h150v50H50z"/></svg>',
              },
              locale2: {
                contentType: 'image/svg+xml',
                fileName: 'filename.svg',
                file: '<svg xmlns="http://www.w3.org/2000/svg"><path fill="blue" d="M50 50h150v50H50z"/></svg>',
              },
            },
          },
        },
      })
      .then(() => {
        expect(httpMock.post.args[0][1]).equals(
          '<svg xmlns="http://www.w3.org/2000/svg"><path fill="red" d="M50 50h150v50H50z"/></svg>',
          'uploads file #1 to upload endpoint'
        )
        expect(httpMock.post.args[1][1]).equals(
          '<svg xmlns="http://www.w3.org/2000/svg"><path fill="blue" d="M50 50h150v50H50z"/></svg>',
          'uploads file #2 to upload endpoint'
        )
      })
  })
})
