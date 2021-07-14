import { afterEach, describe, test } from 'mocha'

import { toPlainObject } from 'contentful-sdk-core'
import createSpaceApi, {
  __RewireAPI__ as createSpaceApiRewireApi,
} from '../../lib/create-space-api'
import {
  apiKeyMock,
  cloneMock,
  environmentAliasMock,
  roleMock,
  scheduledActionCollectionMock,
  scheduledActionMock,
  setupEntitiesMock,
  spaceMemberMock,
  spaceMembershipMock,
  spaceMock,
  teamMock,
  teamSpaceMembershipMock,
  userMock,
  webhookMock,
} from './mocks/entities'
import {
  makeCreateEntityTest,
  makeCreateEntityWithIdTest,
  makeEntityMethodFailingTest,
  makeGetCollectionTest,
  makeGetEntityTest,
} from './test-creators/static-entity-methods'
import { __RewireAPI__ as createEnvironmentApiRewireApi } from '../../lib/create-environment-api'
import { expect } from 'chai'
import setupMakeRequest from './mocks/makeRequest'

function setup(promise) {
  const entitiesMock = setupEntitiesMock(createSpaceApiRewireApi)
  const makeRequest = setupMakeRequest(promise)
  const api = createSpaceApi(makeRequest)
  api.toPlainObject = () => spaceMock
  return {
    api,
    makeRequest,
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
      expect(r).equals(error)
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
    let { api, makeRequest, entitiesMock } = setup(Promise.resolve({ data: responseData }))
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
      expect(makeRequest.args[0][0].payload.name).equals('updatedname', 'data is sent')
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
      expect(r).equals(error)
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
    })
  })

  test('API call createWebhookWithId fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createWebhookWithId',
    })
  })

  test('API call getTeams', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'team',
      mockToReturn: teamMock,
      methodToTest: 'getTeams',
    })
  })

  test('API call getTeams fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getTeams',
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
    })
  })

  test('API call createApiKeyWithId fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createApiKeyWithId',
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

  test('API call updateScheduledAction', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'scheduledAction',
      mockToReturn: scheduledActionMock,
      methodToTest: 'updateScheduledAction',
    })
  })

  test('API call updateScheduledAction fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'updateScheduledAction',
    })
  })
})
