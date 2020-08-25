import createEnvironmentApi, {
  __RewireAPI__ as createEnvironmentApiRewireApi,
} from '../../lib/create-environment-api'
import {
  appInstallationMock,
  assetMock,
  assetWithFilesMock,
  cloneMock,
  contentTypeMock,
  editorInterfaceMock,
  entryMock,
  localeMock,
  mockCollection,
  setupEntitiesMock,
  snapShotMock,
  uiExtensionMock,
  uploadMock,
} from './mocks/entities'
import setupHttpMock from './mocks/http'
import { afterEach, describe, test } from 'mocha'
import { expect } from 'chai'
import { toPlainObject } from 'contentful-sdk-core'
import {
  makeCreateEntityTest,
  makeCreateEntityWithIdTest,
  makeEntityMethodFailingTest,
  makeGetCollectionTest,
  makeGetEntityTest,
  testGettingEntrySDKObject,
} from './test-creators/static-entity-methods'
import { wrapEntry } from '../../lib/entities/entry'
import { wrapAsset } from '../../lib/entities/asset'
import { wrapTagCollection } from '../../lib/entities/tag'

function setup(promise) {
  const entitiesMock = setupEntitiesMock(createEnvironmentApiRewireApi)
  const httpMock = setupHttpMock(promise)
  const httpUploadMock = setupHttpMock(promise)
  const api = createEnvironmentApi({
    http: httpMock,
    httpUpload: httpUploadMock,
  })
  return {
    api,
    httpMock,
    httpUploadMock,
    entitiesMock,
  }
}

describe('A createEnvironmentApi', () => {
  afterEach(() => {
    createEnvironmentApiRewireApi.__ResetDependency__('entities')
  })

  test('API call environment delete', async () => {
    const { api } = setup(Promise.resolve({}))
    expect(await api.delete()).to.not.throw
  })

  test('API call environment delete fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))
    await api.delete().catch((r) => {
      expect(r.name).to.equals('404 Not Found')
    })
  })

  test('API call environment update', async () => {
    const responseData = {
      sys: {
        id: 'id',
        type: 'Environment',
      },
      name: 'updatedname',
    }
    let { api, httpMock, entitiesMock } = setup(Promise.resolve({ data: responseData }))
    entitiesMock.environment.wrapEnvironment.returns(responseData)

    // mocks data that would exist in a environment object already retrieved from the server
    api.sys = {
      id: 'id',
      type: 'Environment',
      version: 2,
    }
    api = toPlainObject(api)
    api.name = 'updatedname'

    return api.update().then((r) => {
      expect(r).to.eql(responseData)
      expect(httpMock.put.args[0][1].name).to.eql('updatedname', 'data is sent')
      expect(httpMock.put.args[0][2].headers['X-Contentful-Version']).to.eql(
        2,
        'version header is sent'
      )
    })
  })

  test('API call environment update fails', async () => {
    const error = cloneMock('error')
    let { api } = setup(Promise.reject(error))

    // mocks data that would exist in a environment object already retrieved from the server
    api.sys = {
      id: 'id',
      type: 'Space',
      version: 2,
    }
    api = toPlainObject(api)

    return api.update().catch((r) => {
      expect(r.name).equals('404 Not Found')
    })
  })

  test('API call getContentType', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'contentType',
      mockToReturn: contentTypeMock,
      methodToTest: 'getContentType',
    })
  })

  test('API call getContentType fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getContentType',
    })
  })

  test('API call getContentTypes', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'contentType',
      mockToReturn: contentTypeMock,
      methodToTest: 'getContentTypes',
    })
  })

  test('API call getContentTypes fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getContentTypes',
    })
  })

  test('API call createContentType', async () => {
    return makeCreateEntityTest(setup, {
      entityType: 'contentType',
      mockToReturn: contentTypeMock,
      methodToTest: 'createContentType',
    })
  })

  test('API call createContentType fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createContentType',
    })
  })
  test('API call createContentTypeWithId', async () => {
    return makeCreateEntityWithIdTest(setup, {
      entityType: 'contentType',
      mockToReturn: contentTypeMock,
      methodToTest: 'createContentTypeWithId',
      entityPath: 'content_types',
    })
  })

  test('API call createContentTypeWithId fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createContentTypeWithId',
    })
  })

  test('API call getEditorInterfaceForContentType', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'editorInterface',
      mockToReturn: editorInterfaceMock,
      methodToTest: 'getEditorInterfaceForContentType',
    })
  })

  test('API call getEditorInterfaceForContentType fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getEditorInterfaceForContentType',
    })
  })

  test('API call getEntry', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'entry',
      mockToReturn: entryMock,
      methodToTest: 'getEntry',
    })
  })

  test('GetSDKEntry from data', async () => {
    const expectedFunctions = [
      'toPlainObject',
      'update',
      'delete',
      'publish',
      'unpublish',
      'archive',
      'unarchive',
      'isPublished',
      'isUpdated',
      'isDraft',
      'isArchived',
    ]
    return testGettingEntrySDKObject(setup, {
      type: 'entry',
      wrapFunctionName: 'wrapEntry',
      resourceMock: entryMock,
      wrapFunction: wrapEntry,
      expectedFunctions: expectedFunctions,
      getResourceFromDataFunctionName: 'getEntryFromData',
    })
  })

  test('API call getEntry fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getEntry',
    })
  })

  test('API call getEntries', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'entry',
      mockToReturn: entryMock,
      methodToTest: 'getEntries',
    })
  })

  test('API call getEntries fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getEntries',
    })
  })

  test('API call createEntry', async () => {
    const { api, httpMock, entitiesMock } = setup(Promise.resolve({}))
    entitiesMock.entry.wrapEntry.returns(entryMock)

    return api.createEntry('contentTypeId', entryMock).then((r) => {
      expect(r).equals(entryMock)
      expect(httpMock.post.args[0][1]).equals(entryMock, 'data is sent')
      expect(httpMock.post.args[0][2].headers['X-Contentful-Content-Type']).equals(
        'contentTypeId',
        'content type is specified'
      )
    })
  })

  test('API call createEntry fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createEntry',
    })
  })

  test('API call createEntryWithId', async () => {
    const { api, httpMock, entitiesMock } = setup(Promise.resolve({}))
    entitiesMock.entry.wrapEntry.returns(entryMock)

    return api.createEntryWithId('contentTypeId', 'entryId', entryMock).then((r) => {
      expect(r).eql(entryMock)
      expect(httpMock.put.args[0][0]).equals('entries/entryId', 'entry id is sent')
      expect(httpMock.put.args[0][1]).equals(entryMock, 'data is sent')
      expect(httpMock.put.args[0][2].headers['X-Contentful-Content-Type']).equals(
        'contentTypeId',
        'content type is specified'
      )
    })
  })

  test('API call createEntryWithId fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createEntryWithId',
    })
  })

  test('API call getAsset', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'asset',
      mockToReturn: assetMock,
      methodToTest: 'getAsset',
    })
  })
  test('GetSDKAsset from data', async () => {
    const expectedFunctions = [
      'processForLocale',
      'processForAllLocales',
      'toPlainObject',
      'update',
      'delete',
      'publish',
      'unpublish',
      'archive',
      'unarchive',
    ]
    return testGettingEntrySDKObject(setup, {
      type: 'asset',
      wrapFunctionName: 'wrapAsset',
      resourceMock: assetMock,
      wrapFunction: wrapAsset,
      expectedFunctions: expectedFunctions,
      getResourceFromDataFunctionName: 'getAssetFromData',
    })
  })

  test('API call getAsset fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getAsset',
    })
  })

  test('API call getAssets', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'asset',
      mockToReturn: assetMock,
      methodToTest: 'getAssets',
    })
  })

  test('API call getAssets fails', () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getAssets',
    })
  })

  test('API call createAsset', async () => {
    return makeCreateEntityTest(setup, {
      entityType: 'asset',
      mockToReturn: assetMock,
      methodToTest: 'createAsset',
    })
  })

  test('API call createAsset fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createAsset',
    })
  })

  test('API call createAssetWithId', async () => {
    return makeCreateEntityWithIdTest(setup, {
      entityType: 'asset',
      mockToReturn: assetMock,
      methodToTest: 'createAssetWithId',
      entityPath: 'assets',
    })
  })

  test('API call createAssetWithId fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createAssetWithId',
    })
  })

  test('API call createAssetFromFiles', async () => {
    const { api, httpMock, httpUploadMock, entitiesMock } = setup(Promise.resolve({}))

    entitiesMock.upload.wrapUpload.returns(Promise.resolve(uploadMock))
    httpUploadMock.post.returns(
      Promise.resolve({
        data: {
          sys: {
            id: 'some_random_id',
          },
        },
      })
    )
    httpMock.post.returns(
      Promise.resolve({
        data: assetWithFilesMock,
      })
    )

    return api
      .createAssetFromFiles({
        fields: {
          file: {
            locale: {
              contentType: 'image/svg+xml',
              fileName: 'filename.svg',
              file:
                '<svg xmlns="http://www.w3.org/2000/svg"><path fill="red" d="M50 50h150v50H50z"/></svg>',
            },
            locale2: {
              contentType: 'image/svg+xml',
              fileName: 'filename.svg',
              file:
                '<svg xmlns="http://www.w3.org/2000/svg"><path fill="blue" d="M50 50h150v50H50z"/></svg>',
            },
          },
        },
      })
      .then(() => {
        expect(httpUploadMock.post.args[0][1]).equals(
          '<svg xmlns="http://www.w3.org/2000/svg"><path fill="red" d="M50 50h150v50H50z"/></svg>',
          'uploads file #1 to upload endpoint'
        )
        expect(httpUploadMock.post.args[1][1]).equals(
          '<svg xmlns="http://www.w3.org/2000/svg"><path fill="blue" d="M50 50h150v50H50z"/></svg>',
          'uploads file #2 to upload endpoint'
        )
        expect(entitiesMock.asset.wrapAsset.args[0][1]).deep.equals(
          assetWithFilesMock,
          'wrapAsset was called with proper asset'
        )
      })
  })

  test('API call getUpload', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'upload',
      mockToReturn: uploadMock,
      methodToTest: 'getUpload',
    })
  })

  test('API call getUpload fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getUpload',
    })
  })

  test('API call createUpload', async () => {
    const { api, httpUploadMock, entitiesMock } = setup(Promise.resolve({}))
    const mockedUpload = {
      sys: {
        id: 'some_random_id',
      },
    }
    httpUploadMock.post.returns(
      Promise.resolve({
        data: mockedUpload,
      })
    )

    return api
      .createUpload({
        contentType: 'image/svg',
        fileName: 'filename.svg',
        file: '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>',
      })
      .then(() => {
        expect(httpUploadMock.post.args[0][2].headers['Content-Type']).equals(
          'application/octet-stream'
        )
        expect(httpUploadMock.post.args[0][1]).equals(
          '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>',
          'uploads file to upload endpoint'
        )
        expect(entitiesMock.upload.wrapUpload.args[0][1]).deep.equals(
          mockedUpload,
          'wrapUpload was called with correct raw upload object'
        )
      })
  })

  test('API call createUpload defaults the content type to octet-stream', async () => {
    const { api, httpUploadMock, entitiesMock } = setup(Promise.resolve({}))
    const mockedUpload = {
      sys: {
        id: 'some_random_id',
      },
    }
    httpUploadMock.post.returns(
      Promise.resolve({
        data: mockedUpload,
      })
    )

    return api
      .createUpload({
        // no contentType set here
        fileName: 'filename.svg',
        file: '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>',
      })
      .then(() => {
        expect(httpUploadMock.post.args[0][2].headers['Content-Type']).equals(
          'application/octet-stream'
        )
        expect(httpUploadMock.post.args[0][1]).equals(
          '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>',
          'uploads file to upload endpoint'
        )
        expect(entitiesMock.upload.wrapUpload.args[0][1]).deep.equals(
          mockedUpload,
          'wrapUpload was called with correct raw upload object'
        )
      })
  })

  /*
  I can't see how this ever passed?
   */
  test.skip('API call createAssetFromFiles with invalid data', async () => {
    const { api } = setup(Promise.resolve({}))
    try {
      await api.createAssetFromFiles({
        fields: {
          file: {
            locale: {},
          },
        },
      })
    } catch (e) {
      expect(e.name).equals('Unable to locate a file to upload.')
    }
  })

  test('API call getLocale', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'locale',
      mockToReturn: localeMock,
      methodToTest: 'getLocale',
    })
  })

  test('API call getLocale fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getLocale',
    })
  })

  test('API call getLocales', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'locale',
      mockToReturn: localeMock,
      methodToTest: 'getLocales',
    })
  })

  test('API call getLocales fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getLocales',
    })
  })

  test('API call createLocale', async () => {
    return makeCreateEntityTest(setup, {
      entityType: 'locale',
      mockToReturn: localeMock,
      methodToTest: 'createLocale',
    })
  })

  test('API call createLocale fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createLocale',
    })
  })

  test('API call getEntrySnapshots snapshots', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'snapshot',
      mockToReturn: snapShotMock,
      methodToTest: 'getEntrySnapshots',
    })
  })

  test('API call getEntrySnapshots fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getEntrySnapshots',
    })
  })

  test('API call getContentTypeSnapshots snapshots', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'snapshot',
      mockToReturn: snapShotMock,
      methodToTest: 'getContentTypeSnapshots',
    })
  })

  test('API call getContentTypeSnapshots fails', () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getContentTypeSnapshots',
    })
  })

  test('API call getUiExtension', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'uiExtension',
      mockToReturn: uiExtensionMock,
      methodToTest: 'getUiExtension',
    })
  })

  test('API call getUiExtension fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getUiExtension',
    })
  })

  test('API call getUiExtensions', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'uiExtension',
      mockToReturn: uiExtensionMock,
      methodToTest: 'getUiExtensions',
    })
  })

  test('API call getUiExtensions fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getUiExtensions',
    })
  })

  test('API call createUiExtension', async () => {
    return makeEntityMethodFailingTest(setup, {
      entityType: 'uiExtension',
      mockToReturn: uiExtensionMock,
      methodToTest: 'createUiExtension',
    })
  })

  test('API call createUiExtension fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createUiExtension',
    })
  })

  test('API call createUiExtensionWithId', async () => {
    return makeCreateEntityWithIdTest(setup, {
      entityType: 'uiExtension',
      mockToReturn: uiExtensionMock,
      methodToTest: 'createUiExtensionWithId',
      entityPath: 'extensions',
    })
  })

  test('API call createUiExtensionWithId fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createUiExtensionWithId',
    })
  })

  test('API call getAppInstallation', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'appInstallation',
      mockToReturn: appInstallationMock,
      methodToTest: 'getAppInstallation',
    })
  })

  test('API call getAppInstallation fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getAppInstallation',
    })
  })

  test('API call getAppInstallations', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'appInstallation',
      mockToReturn: appInstallationMock,
      methodToTest: 'getAppInstallations',
    })
  })

  test('API call getAppInstallations fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getAppInstallations',
    })
  })

  test('API call getTag', async () => {
    const tag = cloneMock('tag')
    const { api } = setup(Promise.resolve({ data: cloneMock('tag') }))
    return api.getTag(tag.id).then((r) => {
      expect(r).eql(tag)
    })
  })

  test('API call getTags', async () => {
    const tagCollection = mockCollection(cloneMock('tag'))
    const { api, httpMock } = setup(Promise.resolve({ data: tagCollection }))
    const wrappedCollection = wrapTagCollection(httpMock, tagCollection)
    return api.getTags(0, 1).then((r) => {
      expect(r).eql(wrappedCollection)
    })
  })

  test('API call createTag', async () => {
    const tag = cloneMock('tag')
    const { api } = setup(Promise.resolve({ data: cloneMock('tag') }))
    return api.createTag('my-tag', 'My tag').then((r) => {
      expect(r).eql(tag)
    })
  })
})
