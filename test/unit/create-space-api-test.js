/* global test, expect */
import { Promise } from 'es6-promise'

import { toPlainObject } from 'contentful-sdk-core'
import createSpaceApi, {__RewireAPI__ as createSpaceApiRewireApi} from '../../lib/create-space-api'
import {
  contentTypeMock,
  editorInterfaceMock,
  assetMock,
  assetWithFilesMock,
  uploadMock,
  entryMock,
  localeMock,
  webhookMock,
  spaceMembershipMock,
  roleMock,
  apiKeyMock,
  setupEntitiesMock,
  cloneMock
} from './mocks/entities'
import setupHttpMock from './mocks/http'
import {
  makeGetEntityTest,
  makeGetCollectionTest,
  makeCreateEntityTest,
  makeCreateEntityWithIdTest,
  makeEntityMethodFailingTest
} from './test-creators/static-entity-methods'

function setup (promise) {
  const entitiesMock = setupEntitiesMock(createSpaceApiRewireApi)
  const httpMock = setupHttpMock(promise)
  const httpUploadMock = setupHttpMock(promise)
  const api = createSpaceApi({ http: httpMock, httpUpload: httpUploadMock })
  return {
    api,
    httpMock,
    httpUploadMock,
    entitiesMock
  }
}

function teardown () {
  createSpaceApiRewireApi.__ResetDependency__('entities')
}

test('API call space delete', () => {
  const {api} = setup(Promise.resolve({}))

  return api.delete()
  .then((r) => {
    expect(true).toBeTruthy() // should pass
    teardown()
  })
})

test('API call space delete fails', () => {
  const error = cloneMock('error')
  const {api} = setup(Promise.reject(error))

  return api.delete()
  .catch((r) => {
    expect(r.name).toBe('404 Not Found')
    teardown()
  })
})

test('API call space update', () => {
  const responseData = {
    sys: { id: 'id', type: 'Space' },
    name: 'updatedname'
  }
  let {api, httpMock, entitiesMock} = setup(Promise.resolve({data: responseData}))
  entitiesMock.space.wrapSpace.returns(responseData)

  // mocks data that would exist in a space object already retrieved from the server
  api.sys = { id: 'id', type: 'Space', version: 2 }
  api = toPlainObject(api)

  api.name = 'updatedname'
  return api.update()
  .then((r) => {
    expect(r).toEqual(responseData)
    expect(httpMock.put.calls[0][1].name).toBe('updatedname')
    expect(httpMock.put.calls[0][2].headers['X-Contentful-Version']).toBe(2)
    teardown()
  })
})

test('API call space update fails', () => {
  const error = cloneMock('error')
  let {api} = setup(Promise.reject(error))

  // mocks data that would exist in a space object already retrieved from the server
  api.sys = { id: 'id', type: 'Space', version: 2 }
  api = toPlainObject(api)

  return api.update()
  .catch((r) => {
    expect(r.name).toBe('404 Not Found')
    teardown()
  })
})

test('API call getContentType', () => {
  makeGetEntityTest(setup, teardown, {
    entityType: 'contentType',
    mockToReturn: contentTypeMock,
    methodToTest: 'getContentType'
  })
})

test('API call getContentType fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getContentType'
  })
})

test('API call getContentTypes', () => {
  makeGetCollectionTest(setup, teardown, {
    entityType: 'contentType',
    mockToReturn: contentTypeMock,
    methodToTest: 'getContentTypes'
  })
})

test('API call getContentTypes fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getContentTypes'
  })
})

test('API call createContentType', () => {
  makeCreateEntityTest(setup, teardown, {
    entityType: 'contentType',
    mockToReturn: contentTypeMock,
    methodToTest: 'createContentType'
  })
})

test('API call createContentType fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'createContentType'
  })
})

test('API call createContentTypeWithId', () => {
  makeCreateEntityWithIdTest(setup, teardown, {
    entityType: 'contentType',
    mockToReturn: contentTypeMock,
    methodToTest: 'createContentTypeWithId',
    entityPath: 'content_types'
  })
})

test('API call createContentTypeWithId fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'createContentTypeWithId'
  })
})

test('API call getEditorInterfaceForContentType', () => {
  makeGetEntityTest(setup, teardown, {
    entityType: 'editorInterface',
    mockToReturn: editorInterfaceMock,
    methodToTest: 'getEditorInterfaceForContentType'
  })
})

test('API call getEditorInterfaceForContentType fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getEditorInterfaceForContentType'
  })
})

test('API call getEntry', () => {
  makeGetEntityTest(setup, teardown, {
    entityType: 'entry',
    mockToReturn: entryMock,
    methodToTest: 'getEntry'
  })
})

test('API call getEntry fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getEntry'
  })
})

test('API call getEntries', () => {
  makeGetCollectionTest(setup, teardown, {
    entityType: 'entry',
    mockToReturn: entryMock,
    methodToTest: 'getEntries'
  })
})

test('API call getEntries fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getEntries'
  })
})

test('API call createEntry', () => {
  const {api, httpMock, entitiesMock} = setup(Promise.resolve({}))
  entitiesMock.entry.wrapEntry
  .returns(entryMock)

  return api.createEntry('contentTypeId', entryMock)
  .then((r) => {
    expect(r).toEqual(entryMock)
    expect(httpMock.post.calls[0][1]).toEqual(entryMock)
    expect(httpMock.post.calls[0][2].headers['X-Contentful-Content-Type']).toBe('contentTypeId')
    teardown()
  })
})

test('API call createEntry fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'createEntry'
  })
})

test('API call createEntryWithId', () => {
  const {api, httpMock, entitiesMock} = setup(Promise.resolve({}))
  entitiesMock.entry.wrapEntry
  .returns(entryMock)

  return api.createEntryWithId('contentTypeId', 'entryId', entryMock)
  .then((r) => {
    expect(r).toEqual(entryMock)
    expect(httpMock.put.calls[0][0]).toBe('entries/entryId')
    expect(httpMock.put.calls[0][1]).toEqual(entryMock)
    expect(httpMock.put.calls[0][2].headers['X-Contentful-Content-Type']).toBe('contentTypeId')
    teardown()
  })
})

test('API call createEntryWithId fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'createEntryWithId'
  })
})

test('API call getAsset', () => {
  makeGetEntityTest(setup, teardown, {
    entityType: 'asset',
    mockToReturn: assetMock,
    methodToTest: 'getAsset'
  })
})

test('API call getAsset fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getAsset'
  })
})

test('API call getAssets', () => {
  makeGetCollectionTest(setup, teardown, {
    entityType: 'asset',
    mockToReturn: assetMock,
    methodToTest: 'getAssets'
  })
})

test('API call getAssets fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getAssets'
  })
})

test('API call createAsset', () => {
  makeCreateEntityTest(setup, teardown, {
    entityType: 'asset',
    mockToReturn: assetMock,
    methodToTest: 'createAsset'
  })
})

test('API call createAsset fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'createAsset'
  })
})

test('API call createAssetWithId', () => {
  makeCreateEntityWithIdTest(setup, teardown, {
    entityType: 'asset',
    mockToReturn: assetMock,
    methodToTest: 'createAssetWithId',
    entityPath: 'assets'
  })
})

test('API call createAssetWithId fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'createAssetWithId'
  })
})

test('API call createAssetFromFiles', () => {
  const { api, httpMock, httpUploadMock, entitiesMock } = setup(Promise.resolve({}))

  entitiesMock.upload.wrapUpload.returns(Promise.resolve(uploadMock))
  httpUploadMock.post.returns(Promise.resolve({
    data: {
      sys: {
        id: 'some_random_id'
      }
    }
  }))
  httpMock.post.returns(Promise.resolve({
    data: assetWithFilesMock
  }))

  return api.createAssetFromFiles({
    fields: {
      file: {
        locale: {
          contentType: 'image/svg+xml',
          fileName: 'filename.svg',
          file: '<svg xmlns="http://www.w3.org/2000/svg"><path fill="red" d="M50 50h150v50H50z"/></svg>'
        },
        locale2: {
          contentType: 'image/svg+xml',
          fileName: 'filename.svg',
          file: '<svg xmlns="http://www.w3.org/2000/svg"><path fill="blue" d="M50 50h150v50H50z"/></svg>'
        }
      }
    }
  })
  .then(() => {
    expect(httpUploadMock.post.calls[0][1]).toBe('<svg xmlns="http://www.w3.org/2000/svg"><path fill="red" d="M50 50h150v50H50z"/></svg>')
    expect(httpUploadMock.post.calls[1][1]).toBe('<svg xmlns="http://www.w3.org/2000/svg"><path fill="blue" d="M50 50h150v50H50z"/></svg>')
    expect(entitiesMock.asset.wrapAsset.calls[0][1]).toEqual(assetWithFilesMock)
  })
})

test('API call getUpload', () => {
  makeGetEntityTest(setup, teardown, {
    entityType: 'upload',
    mockToReturn: uploadMock,
    methodToTest: 'getUpload'
  })
})

test('API call getUpload fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getUpload'
  })
})

test('API call createUpload', () => {
  const { api, httpUploadMock, entitiesMock } = setup(Promise.resolve({}))
  const mockedUpload = {
    sys: {
      id: 'some_random_id'
    }
  }
  httpUploadMock.post.returns(Promise.resolve({
    data: mockedUpload
  }))

  return api.createUpload({
    contentType: 'image/svg',
    fileName: 'filename.svg',
    file: '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>'
  })
  .then(() => {
    expect(httpUploadMock.post.calls[0][2].headers['Content-Type']).toBe('application/octet-stream')
    expect(httpUploadMock.post.calls[0][1]).toBe('<svg><path fill="red" d="M50 50h150v50H50z"/></svg>')
    expect(entitiesMock.upload.wrapUpload.calls[0][1]).toEqual(mockedUpload)
  })
})

test('API call createUpload defaults the content type to octet-stream', () => {
  const { api, httpUploadMock, entitiesMock } = setup(Promise.resolve({}))
  const mockedUpload = {
    sys: {
      id: 'some_random_id'
    }
  }
  httpUploadMock.post.returns(Promise.resolve({
    data: mockedUpload
  }))

  return api.createUpload({ // no contentType set here
    fileName: 'filename.svg',
    file: '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>'
  })
  .then(() => {
    expect(httpUploadMock.post.calls[0][2].headers['Content-Type']).toBe('application/octet-stream')
    expect(httpUploadMock.post.calls[0][1]).toBe('<svg><path fill="red" d="M50 50h150v50H50z"/></svg>')
    expect(entitiesMock.upload.wrapUpload.calls[0][1]).toEqual(mockedUpload)
  })
})

test('API call createAssetFromFiles with invalid data', () => {
  const { api } = setup(Promise.resolve({}))
  return expect(api.createAssetFromFiles({
    fields: {
      file: {
        locale: {}
      }
    }
  })).toThrowError(new Error('Unable to locate a file to upload.'))
})

test('API call getLocale', () => {
  makeGetEntityTest(setup, teardown, {
    entityType: 'locale',
    mockToReturn: localeMock,
    methodToTest: 'getLocale'
  })
})

test('API call getLocale fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getLocale'
  })
})

test('API call getLocales', () => {
  makeGetCollectionTest(setup, teardown, {
    entityType: 'locale',
    mockToReturn: localeMock,
    methodToTest: 'getLocales'
  })
})

test('API call getLocales fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getLocales'
  })
})

test('API call createLocale', () => {
  makeCreateEntityTest(setup, teardown, {
    entityType: 'locale',
    mockToReturn: localeMock,
    methodToTest: 'createLocale'
  })
})

test('API call createLocale fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'createLocale'
  })
})

test('API call getWebhook', () => {
  makeGetEntityTest(setup, teardown, {
    entityType: 'webhook',
    mockToReturn: webhookMock,
    methodToTest: 'getWebhook'
  })
})

test('API call getWebhook fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getWebhook'
  })
})

test('API call getWebhooks', () => {
  makeGetCollectionTest(setup, teardown, {
    entityType: 'webhook',
    mockToReturn: webhookMock,
    methodToTest: 'getWebhooks'
  })
})

test('API call getWebhooks fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getWebhooks'
  })
})

test('API call createWebhook', () => {
  makeCreateEntityTest(setup, teardown, {
    entityType: 'webhook',
    mockToReturn: webhookMock,
    methodToTest: 'createWebhook'
  })
})

test('API call createWebhook fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'createWebhook'
  })
})

test('API call createWebhookWithId', () => {
  makeCreateEntityWithIdTest(setup, teardown, {
    entityType: 'webhook',
    mockToReturn: webhookMock,
    methodToTest: 'createWebhookWithId',
    entityPath: 'webhook_definitions'
  })
})

test('API call createWebhookWithId fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'createWebhookWithId'
  })
})

test('API call getSpaceMembership', () => {
  makeGetEntityTest(setup, teardown, {
    entityType: 'spaceMembership',
    mockToReturn: spaceMembershipMock,
    methodToTest: 'getSpaceMembership'
  })
})

test('API call getSpaceMembership fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getSpaceMembership'
  })
})

test('API call getSpaceMemberships', () => {
  makeGetCollectionTest(setup, teardown, {
    entityType: 'spaceMembership',
    mockToReturn: spaceMembershipMock,
    methodToTest: 'getSpaceMemberships'
  })
})

test('API call getSpaceMemberships fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getSpaceMemberships'
  })
})

test('API call createSpaceMembership', () => {
  makeCreateEntityTest(setup, teardown, {
    entityType: 'spaceMembership',
    mockToReturn: spaceMembershipMock,
    methodToTest: 'createSpaceMembership'
  })
})

test('API call createSpaceMembership fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'createSpaceMembership'
  })
})

test('API call createSpaceMembershipWithId', () => {
  makeCreateEntityWithIdTest(setup, teardown, {
    entityType: 'spaceMembership',
    mockToReturn: spaceMembershipMock,
    methodToTest: 'createSpaceMembershipWithId',
    entityPath: 'space_memberships'
  })
})

test('API call createSpaceMembershipWithId fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'createSpaceMembershipWithId'
  })
})

test('API call getRole', () => {
  makeGetEntityTest(setup, teardown, {
    entityType: 'role',
    mockToReturn: roleMock,
    methodToTest: 'getRole'
  })
})

test('API call getRole fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getRole'
  })
})

test('API call getRoles', () => {
  makeGetCollectionTest(setup, teardown, {
    entityType: 'role',
    mockToReturn: roleMock,
    methodToTest: 'getRoles'
  })
})

test('API call getRoles fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getRoles'
  })
})

test('API call createRole', () => {
  makeCreateEntityTest(setup, teardown, {
    entityType: 'role',
    mockToReturn: roleMock,
    methodToTest: 'createRole'
  })
})

test('API call createRole fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'createRole'
  })
})

test('API call createRoleWithId', () => {
  makeCreateEntityWithIdTest(setup, teardown, {
    entityType: 'role',
    mockToReturn: roleMock,
    methodToTest: 'createRoleWithId',
    entityPath: 'roles'
  })
})

test('API call createRoleWithId fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'createRoleWithId'
  })
})

test('API call getApiKey', () => {
  makeGetEntityTest(setup, teardown, {
    entityType: 'apiKey',
    mockToReturn: apiKeyMock,
    methodToTest: 'getApiKey'
  })
})

test('API call getApiKey fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getApiKey'
  })
})

test('API call getApiKeys', () => {
  makeGetCollectionTest(setup, teardown, {
    entityType: 'apiKey',
    mockToReturn: apiKeyMock,
    methodToTest: 'getApiKeys'
  })
})

test('API call getApiKeys fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getApiKeys'
  })
})

test('API call createApiKey', () => {
  makeCreateEntityTest(setup, teardown, {
    entityType: 'apiKey',
    mockToReturn: apiKeyMock,
    methodToTest: 'createApiKey'
  })
})

test('API call createApiKey fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'createApiKey'
  })
})

test('API call createApiKeyWithId', () => {
  makeCreateEntityWithIdTest(setup, teardown, {
    entityType: 'apiKey',
    mockToReturn: apiKeyMock,
    methodToTest: 'createApiKeyWithId',
    entityPath: 'api_keys'
  })
})

test('API call createApiKeyWithId fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'createApiKeyWithId'
  })
})
