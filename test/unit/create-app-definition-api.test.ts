import { expect, describe, test } from 'vitest'
import { toPlainObject } from 'contentful-sdk-core'
import createAppDefinitionApi from '../../lib/create-app-definition-api.js'
import {
  appBundleMock,
  appDefinitionMock,
  setupEntitiesMock,
  appInstallationsForOrgMock,
  resourceProviderMock,
} from './mocks/entities.js'
import setupMakeRequest from './mocks/makeRequest.js'
import {
  makeGetCollectionTest,
  makeGetEntityTest,
  makeEntityMethodFailingTest,
} from './test-creators/static-entity-methods.js'

function setup<T>(promise: Promise<T>) {
  const entitiesMock = setupEntitiesMock()
  const makeRequest = setupMakeRequest(promise)
  const api = createAppDefinitionApi(makeRequest)

  return {
    api: {
      ...api,
      toPlainObject: () => appDefinitionMock,
    },
    makeRequest,
    entitiesMock,
  }
}

describe('createAppDefinitionApi', () => {
  test('API call delete', async () => {
    const { api } = setup(Promise.resolve({}))
    expect(await api.delete()).to.not.throw
  })

  test('API call update', async () => {
    const responseData = {
      sys: {
        id: 'id',
        type: 'AppDefinition',
        organization: {
          sys: {
            type: 'Link',
            linkType: 'Organization',
            id: 'org-id',
          },
        },
      },
      name: 'Updated Name',
    }

    const { api: origApi, makeRequest, entitiesMock } = setup(Promise.resolve(responseData))
    entitiesMock.appDefinition.wrapAppDefinition.mockReturnValue(responseData)

    let api = origApi
    // @ts-expect-error mocks data that would exist
    api.sys = {
      id: 'id',
      type: 'AppDefinition',
      organization: {
        sys: {
          type: 'Link',
          linkType: 'Organization',
          id: 'org-id',
        },
      },
    }

    api = toPlainObject(api)
    // @ts-expect-error
    api.name = 'Updated Name'
    return api.update().then((r) => {
      expect(r).eql(responseData, 'app definition is wrapped')
      expect(makeRequest.mock.calls[0][0].payload.name).equals('Updated Name', 'data is sent')
    })
  })

  test('API call getInstallationsForOrg', async () => {
    const { api } = setup(Promise.resolve(appInstallationsForOrgMock))
    expect(await api.getInstallationsForOrg()).to.equal(appInstallationsForOrgMock)
  })

  test('API call getAppBundle', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'appBundle',
      mockToReturn: appBundleMock,
      methodToTest: 'getAppBundle',
    })
  })

  test('API call getAppBundle fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getAppBundle',
    })
  })

  test('API call getAppBundles', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'appBundle',
      mockToReturn: appBundleMock,
      methodToTest: 'getAppBundles',
    })
  })

  test('API call getAppBundles fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getAppBundles',
    })
  })

  test('API call createAppBundle', async () => {
    const { api, entitiesMock } = setup(Promise.resolve(appBundleMock))

    entitiesMock['appBundle']['wrapAppBundle'].mockReturnValue(appBundleMock)

    return api['createAppBundle']({ appBundleId: 'id' }).then((result) => {
      expect(result).toStrictEqual(appBundleMock)
    })
  })

  test('API call createAppBundle with functions', async () => {
    const appBundleWithFns = {
      ...appBundleMock,
      functions: [
        {
          id: 'myCustomId',
          name: 'My Contenful function',
          description: 'Function uploaded with bundle',
          path: 'functions/test.js',
        },
      ],
    }

    const { api, entitiesMock } = setup(Promise.resolve(appBundleWithFns))

    entitiesMock['appBundle']['wrapAppBundle'].mockRejectedValue(appBundleWithFns)

    return api['createAppBundle']({ appBundleId: 'id' }).then((result) => {
      expect(result).toStrictEqual(appBundleWithFns)
    })
  })

  test('API call createAppBundle fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createAppBundle',
    })
  })

  test('API call upsertResourceProvider', async () => {
    const { api, entitiesMock } = setup(Promise.resolve(resourceProviderMock))

    entitiesMock['resourceProvider']['wrapResourceProvider'].mockReturnValue(resourceProviderMock)

    return api['upsertResourceProvider']({
      sys: { id: 'id' },
      type: 'function',
      function: { sys: { id: 'id', type: 'Link', linkType: 'Function' } },
    }).then((result) => {
      expect(result).toStrictEqual(resourceProviderMock)
    })
  })

  test('API call upsertResourceProvider fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'upsertResourceProvider',
    })
  })

  test('API call getResourceProvider', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'resourceProvider',
      mockToReturn: resourceProviderMock,
      methodToTest: 'getResourceProvider',
    })
  })

  test('API call getResourceProvider fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getResourceProvider',
    })
  })
})
