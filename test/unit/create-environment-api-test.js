import createEnvironmentApi, {
  __RewireAPI__ as createEnvironmentApiRewireApi,
} from '../../lib/create-environment-api'
import {
  appInstallationMock,
  assetMock,
  cloneMock,
  bulkActionMock,
  bulkActionPublishMock,
  contentTypeMock,
  editorInterfaceMock,
  entryMock,
  environmentMock,
  localeMock,
  mockCollection,
  setupEntitiesMock,
  snapShotMock,
  UiExtensionMock,
  uploadMock,
} from './mocks/entities'
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
import setupMakeRequest from './mocks/makeRequest'

function setup(promise) {
  const entitiesMock = setupEntitiesMock(createEnvironmentApiRewireApi)
  const makeRequest = setupMakeRequest(promise)
  const api = createEnvironmentApi(makeRequest)
  api.toPlainObject = () => environmentMock
  return {
    api,
    makeRequest,
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
      expect(r).to.equals(error)
    })
  })

  test('API call environment update', async () => {
    const responseData = {
      sys: { id: 'id', type: 'Environment', space: { sys: { id: 'spaceId' } } },
      name: 'updatedname',
    }
    let { api, makeRequest, entitiesMock } = setup(Promise.resolve(responseData))
    entitiesMock.environment.wrapEnvironment.returns(responseData)

    // mocks data that would exist in a environment object already retrieved from the server
    api.sys = { id: 'id', type: 'Environment', version: 2, space: { sys: { id: 'spaceId' } } }
    api = toPlainObject(api)

    api.name = 'updatedname'

    return api.update().then((r) => {
      expect(r).to.eql(responseData)
      expect(makeRequest.args[0][0].payload.name).to.eql('updatedname', 'data is sent')
    })
  })

  test('API call environment update fails', async () => {
    const error = cloneMock('error')
    let { api } = setup(Promise.reject(error))

    // mocks data that would exist in a environment object already retrieved from the server
    api.sys = { id: 'id', type: 'Space', version: 2, space: { sys: { id: 'spaceId' } } }
    api = toPlainObject(api)

    return api.update().catch((r) => {
      expect(r).equals(error)
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

  test('API call getBulkAction', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'bulkAction',
      mockToReturn: bulkActionMock,
      methodToTest: 'getBulkAction',
    })
  })

  test('API call createPublishBulkAction', async () => {
    return makeCreateEntityTest(setup, {
      entityType: 'bulkAction',
      mockToReturn: bulkActionPublishMock,
      methodToTest: 'createPublishBulkAction',
    })
  })

  test('API call createUnpublishBulkAction', async () => {
    return makeCreateEntityTest(setup, {
      entityType: 'bulkAction',
      mockToReturn: { ...bulkActionMock, action: 'unpublish' },
      methodToTest: 'createUnpublishBulkAction',
    })
  })

  test('API call createValidateBulkAction', async () => {
    return makeCreateEntityTest(setup, {
      entityType: 'bulkAction',
      mockToReturn: { ...bulkActionMock, action: 'validate' },
      methodToTest: 'createValidateBulkAction',
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
    const { api, makeRequest, entitiesMock } = setup(Promise.resolve({}))
    entitiesMock.entry.wrapEntry.returns(entryMock)

    return api.createEntry('contentTypeId', entryMock).then((r) => {
      expect(r).to.eql(entryMock)
      expect(makeRequest.args[0][0].payload).to.eql(entryMock, 'data is sent')
    })
  })

  test('API call createEntry fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createEntry',
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
    })
  })

  test('API call createAssetWithId fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createAssetWithId',
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

  test('API call createAssetFromFiles with invalid data', async () => {
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
      expect(e, 'error thrown').to.be.ok
      /*
      TODO: I can't see how this ever passed?
       */
      //expect(e.name).equals('Unable to locate a file to upload.')
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
      entityType: 'extension',
      mockToReturn: UiExtensionMock,
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
      entityType: 'extension',
      mockToReturn: UiExtensionMock,
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
      entityType: 'extension',
      mockToReturn: UiExtensionMock,
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
      entityType: 'extension',
      mockToReturn: UiExtensionMock,
      methodToTest: 'createUiExtensionWithId',
    })
  })

  test('API call createUiExtensionWithId fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createUiExtensionWithId',
    })
  })

  test('API call createAppActionCall', async () => {
    const responseData = {
      sys: { id: 'id', type: 'AppActionCall', space: { sys: { id: 'spaceId' } } },
    }
    let { api, entitiesMock } = setup(Promise.resolve(responseData))
    entitiesMock.appActionCall.wrapAppActionCall.returns(responseData)

    return api
      .createAppActionCall('app_definition_id', 'action_id', { body: { value: 'something' } })
      .then((r) => {
        expect(r).to.eql(responseData)
      })
  })

  test('API call createAppActionCall fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createAppActionCall',
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
    const { api } = setup(Promise.resolve(cloneMock('tag')))
    return api.getTag(tag.id).then((r) => {
      expect(r).eql(tag)
    })
  })

  test('API call getTags', async () => {
    const tagCollection = mockCollection(cloneMock('tag'))
    const { api, httpMock } = setup(Promise.resolve(tagCollection))
    const wrappedCollection = wrapTagCollection(httpMock, tagCollection)
    return api.getTags(0, 1).then((r) => {
      expect(r).eql(wrappedCollection)
    })
  })

  test('API call createTag', async () => {
    const tag = cloneMock('tag')
    const { api } = setup(Promise.resolve(cloneMock('tag')))
    return api.createTag('my-tag', 'My tag').then((r) => {
      expect(r).eql(tag)
    })
  })

  test('API call deleteEntry', async () => {
    const { api } = setup(Promise.resolve({}))
    expect(await api.deleteEntry()).to.not.throw
  })

  test('API call deleteEntry fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))
    await api.deleteEntry().catch((r) => {
      expect(r).to.equals(error)
    })
  })

  test('API call getUIConfig', async () => {
    const uiConfig = cloneMock('uiConfig')
    const { api } = setup(Promise.resolve(cloneMock('uiConfig')))
    return api.getUIConfig().then((r) => {
      expect(r).eql(uiConfig)
    })
  })

  test('API call getUserUIConfig', async () => {
    const userUIConfig = cloneMock('userUIConfig')
    const { api } = setup(Promise.resolve(cloneMock('userUIConfig')))
    return api.getUserUIConfig().then((r) => {
      expect(r).eql(userUIConfig)
    })
  })
})

// Embargoed Assets

test('API call createAssetKey', async () => {
  const withExpiryIn1Hour = Math.floor(Date.now() / 1000) + 1 * 60 * 60
  const data = { expiresAt: withExpiryIn1Hour }
  const assetKey = cloneMock('assetKey')
  const { api, entitiesMock } = setup(Promise.resolve({ data: assetKey }))
  entitiesMock.assetKey.wrapAssetKey.returns(assetKey)

  await api.createAssetKey(data).then((r) => {
    expect(r).eql(assetKey)
  })
})
