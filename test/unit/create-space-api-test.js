import { afterEach, describe, test } from 'mocha'

import { toPlainObject } from 'contentful-sdk-core'
import createSpaceApi, {
  __RewireAPI__ as createSpaceApiRewireApi,
} from '../../lib/create-space-api'
import {
  apiKeyMock,
  assetMock,
  assetWithFilesMock,
  cloneMock,
  contentTypeMock,
  editorInterfaceMock,
  entryMock,
  environmentAliasMock,
  localeMock,
  roleMock,
  scheduledActionCollectionMock,
  scheduledActionMock,
  setupEntitiesMock,
  snapShotMock,
  spaceMemberMock,
  spaceMembershipMock,
  teamSpaceMembershipMock,
  uiExtensionMock,
  uploadMock,
  userMock,
  webhookMock,
} from './mocks/entities'
import setupHttpMock from './mocks/http'
import {
  makeCreateEntityTest,
  makeCreateEntityWithIdTest,
  makeEntityMethodFailingTest,
  makeGetCollectionTest,
  makeGetEntityTest,
} from './test-creators/static-entity-methods'
import { __RewireAPI__ as createEnvironmentApiRewireApi } from '../../lib/create-environment-api'
import { expect } from 'chai'

function setup(promise) {
  const entitiesMock = setupEntitiesMock(createSpaceApiRewireApi)
  const httpMock = setupHttpMock(promise)
  const httpUploadMock = setupHttpMock(promise)
  const api = createSpaceApi({
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

describe('A createSpaceApi', () => {
  afterEach(() => {
    createEnvironmentApiRewireApi.__ResetDependency__('entities')
  })

  test('API call space delete', async () => {
    const { api } = setup(Promise.resolve({}))
    expect(await api.delete()).to.not.throw
  })

  test('API call space delete fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    return api.delete().catch((r) => {
      expect(r.name).equals('404 Not Found')
    })
  })

  test('API call space update', async () => {
    const responseData = {
      sys: {
        id: 'id',
        type: 'Space',
      },
      name: 'updatedname',
    }
    let { api, httpMock, entitiesMock } = setup(Promise.resolve({ data: responseData }))
    entitiesMock.space.wrapSpace.returns(responseData)

    // mocks data that would exist in a space object already retrieved from the server
    api.sys = {
      id: 'id',
      type: 'Space',
      version: 2,
    }
    api = toPlainObject(api)

    api.name = 'updatedname'
    return api.update().then((r) => {
      expect(r).eql(responseData, 'space is wrapped')
      expect(httpMock.put.args[0][1].name).equals('updatedname', 'data is sent')
      expect(httpMock.put.args[0][2].headers['X-Contentful-Version']).equals(
        2,
        'version header is sent'
      )
    })
  })

  test('API call space update fails', async () => {
    const error = cloneMock('error')
    let { api } = setup(Promise.reject(error))

    // mocks data that would exist in a space object already retrieved from the server
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
      expect(r).eql(entryMock)
      expect(httpMock.post.args[0][1]).eql(entryMock, 'data is sent')
      expect(httpMock.post.args[0][2].headers['X-Contentful-Content-Type']).eql(
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

  test('API call getAssets fails', async () => {
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

  test('API call createAssetFromFiles with invalid data', async () => {
    const { api } = setup(Promise.resolve({}))
    try {
      api.createAssetFromFiles({
        fields: {
          file: {
            locale: {},
          },
        },
      })
    } catch (e) {
      expect(e).eql('Unable to locate a file to upload.')
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

  test('API call getWebhook', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'webhook',
      mockToReturn: webhookMock,
      methodToTest: 'getWebhook',
    })
  })

  test('API call getWebhook fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getWebhook',
    })
  })

  test('API call getWebhooks', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'webhook',
      mockToReturn: webhookMock,
      methodToTest: 'getWebhooks',
    })
  })

  test('API call getWebhooks fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getWebhooks',
    })
  })

  test('API call createWebhook', async () => {
    return makeCreateEntityTest(setup, {
      entityType: 'webhook',
      mockToReturn: webhookMock,
      methodToTest: 'createWebhook',
    })
  })

  test('API call createWebhook fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createWebhook',
    })
  })

  test('API call createWebhookWithId', async () => {
    return makeCreateEntityWithIdTest(setup, {
      entityType: 'webhook',
      mockToReturn: webhookMock,
      methodToTest: 'createWebhookWithId',
      entityPath: 'webhook_definitions',
    })
  })

  test('API call createWebhookWithId fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createWebhookWithId',
    })
  })

  test('API call getSpaceMembers', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'spaceMember',
      mockToReturn: spaceMemberMock,
      methodToTest: 'getSpaceMembers',
    })
  })

  test('API call getSpaceMembership', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'spaceMembership',
      mockToReturn: spaceMembershipMock,
      methodToTest: 'getSpaceMembership',
    })
  })

  test('API call getSpaceMembership fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getSpaceMembership',
    })
  })

  test('API call getSpaceMemberships', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'spaceMembership',
      mockToReturn: spaceMembershipMock,
      methodToTest: 'getSpaceMemberships',
    })
  })

  test('API call getSpaceMemberships fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getSpaceMemberships',
    })
  })

  test('API call createSpaceMembership', async () => {
    return makeCreateEntityTest(setup, {
      entityType: 'spaceMembership',
      mockToReturn: spaceMembershipMock,
      methodToTest: 'createSpaceMembership',
    })
  })

  test('API call getTeamSpaceMembership', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'teamSpaceMembership',
      mockToReturn: teamSpaceMembershipMock,
      methodToTest: 'getTeamSpaceMembership',
    })
  })

  test('API call getTeamSpaceMembership fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getTeamSpaceMembership',
    })
  })

  test('API call getTeamSpaceMemberships', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'teamSpaceMembership',
      mockToReturn: teamSpaceMembershipMock,
      methodToTest: 'getTeamSpaceMemberships',
    })
  })

  test('API call getTeamSpaceMemberships fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getTeamSpaceMemberships',
    })
  })

  test('API call createTeamSpaceMembership', async () => {
    const { api, entitiesMock } = setup(Promise.resolve({}))
    entitiesMock['teamSpaceMembership'][`wrapTeamSpaceMembership`].returns(teamSpaceMembershipMock)

    return api['createTeamSpaceMembership']({
      admin: false,
      teamId: 'id',
    }).then((r) => {
      expect(r).equals(teamSpaceMembershipMock)
    })
  })

  test('API call createSpaceMembership fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createSpaceMembership',
    })
  })

  test('API call createSpaceMembershipWithId', async () => {
    return makeCreateEntityWithIdTest(setup, {
      entityType: 'spaceMembership',
      mockToReturn: spaceMembershipMock,
      methodToTest: 'createSpaceMembershipWithId',
      entityPath: 'space_memberships',
    })
  })

  test('API call createSpaceMembershipWithId fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createSpaceMembershipWithId',
    })
  })

  test('API call getSpaceUser', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'user',
      mockToReturn: userMock,
      methodToTest: 'getSpaceUser',
    })
  })

  test('API call getSpaceUser fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getSpaceUser',
    })
  })

  test('API call getSpaceUsers', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'user',
      mockToReturn: userMock,
      methodToTest: 'getSpaceUsers',
    })
  })

  test('API call getSpaceUsers fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getSpaceUsers',
    })
  })

  test('API call getRole', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'role',
      mockToReturn: roleMock,
      methodToTest: 'getRole',
    })
  })

  test('API call getRole fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getRole',
    })
  })

  test('API call getRoles', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'role',
      mockToReturn: roleMock,
      methodToTest: 'getRoles',
    })
  })

  test('API call getRoles fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getRoles',
    })
  })

  test('API call createRole', async () => {
    return makeCreateEntityTest(setup, {
      entityType: 'role',
      mockToReturn: roleMock,
      methodToTest: 'createRole',
    })
  })

  test('API call createRole fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createRole',
    })
  })

  test('API call createRoleWithId', async () => {
    return makeCreateEntityWithIdTest(setup, {
      entityType: 'role',
      mockToReturn: roleMock,
      methodToTest: 'createRoleWithId',
      entityPath: 'roles',
    })
  })

  test('API call createRoleWithId fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createRoleWithId',
    })
  })

  test('API call getApiKey', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'apiKey',
      mockToReturn: apiKeyMock,
      methodToTest: 'getApiKey',
    })
  })

  test('API call getApiKey fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getApiKey',
    })
  })

  test('API call getApiKeys', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'apiKey',
      mockToReturn: apiKeyMock,
      methodToTest: 'getApiKeys',
    })
  })

  test('API call getApiKeys fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getApiKeys',
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

  test('API call getContentTypeSnapshots fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getContentTypeSnapshots',
    })
  })

  test('API call createApiKey', async () => {
    return makeCreateEntityTest(setup, {
      entityType: 'apiKey',
      mockToReturn: apiKeyMock,
      methodToTest: 'createApiKey',
    })
  })

  test('API call createApiKey fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createApiKey',
    })
  })

  test('API call createApiKeyWithId', async () => {
    return makeCreateEntityWithIdTest(setup, {
      entityType: 'apiKey',
      mockToReturn: apiKeyMock,
      methodToTest: 'createApiKeyWithId',
      entityPath: 'api_keys',
    })
  })

  test('API call createApiKeyWithId fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createApiKeyWithId',
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

  test('API call getEnvironmentAlias', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'environmentAlias',
      mockToReturn: environmentAliasMock,
      methodToTest: 'getEnvironmentAlias',
    })
  })

  test('API call getEnvironmentAlias fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getEnvironmentAlias',
    })
  })

  test('API call getEnvironmentAliases', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'environmentAlias',
      mockToReturn: environmentAliasMock,
      methodToTest: 'getEnvironmentAliases',
    })
  })

  test('API call getEnvironmentAliases fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getEnvironmentAliases',
    })
  })

  test('API call getScheduledActions', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'scheduledAction',
      mockToReturn: scheduledActionCollectionMock,
      methodToTest: 'getScheduledActions',
    })
  })

  test('API call getScheduledActions fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getScheduledActions',
    })
  })

  test('API call createScheduledAction', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'scheduledAction',
      mockToReturn: scheduledActionMock,
      methodToTest: 'createScheduledAction',
    })
  })

  test('API call createScheduledAction fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createScheduledAction',
    })
  })
})
