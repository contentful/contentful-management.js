import { expect } from 'chai'
import { afterEach, describe, test } from 'mocha'
import { toPlainObject } from 'contentful-sdk-core'
import createAppDefinitionApi, {
  __RewireAPI__ as createAppDefinitionApiRewireApi,
} from '../../lib/create-app-definition-api'
import { appBundleMock, appDefinitionMock, setupEntitiesMock } from './mocks/entities'
import setupMakeRequest from './mocks/makeRequest'
import {
  makeGetCollectionTest,
  makeGetEntityTest,
  makeEntityMethodFailingTest,
} from './test-creators/static-entity-methods'

function setup(promise) {
  const entitiesMock = setupEntitiesMock(createAppDefinitionApiRewireApi)
  const makeRequest = setupMakeRequest(promise)
  const api = createAppDefinitionApi(makeRequest)

  api.toPlainObject = () => appDefinitionMock

  return {
    api,
    makeRequest,
    entitiesMock,
  }
}

describe('createAppDefinitionApi', () => {
  afterEach(() => {
    createAppDefinitionApiRewireApi.__ResetDependency__('entities')
  })

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

    let { api, makeRequest, entitiesMock } = setup(Promise.resolve(responseData))
    entitiesMock.appDefinition.wrapAppDefinition.returns(responseData)

    // mocks data that would exist
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

    api.name = 'Updated Name'
    return api.update().then((r) => {
      expect(r).eql(responseData, 'app definition is wrapped')
      expect(makeRequest.args[0][0].payload.name).equals('Updated Name', 'data is sent')
    })
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
    const { api, entitiesMock } = setup(Promise.resolve({}))

    entitiesMock['appBundle']['wrapAppBundle'].returns(appBundleMock)

    return api['createAppBundle']({ appBundleId: 'id' }).then((result) => {
      expect(result).equals(appBundleMock)
    })
  })

  test('API call createAppBundle fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createAppBundle',
    })
  })
})
