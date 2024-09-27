import { describe, test, expect, vi, afterEach } from 'vitest'
import { toPlainObject } from 'contentful-sdk-core'
import createSpaceApi from '../../lib/create-space-api'
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
import setupMakeRequest from './mocks/makeRequest'

function setup(promise) {
  const entitiesMock = setupEntitiesMock()
  const makeRequest = setupMakeRequest(promise)
  const api = createSpaceApi(makeRequest)

  return {
    api: {
      ...api,
      toPlainObject: () => spaceMock,
    },
    makeRequest,
    entitiesMock,
  }
}

describe('A createSpaceApi', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('API call space delete', async () => {
    const { api } = setup(Promise.resolve({}))
    await expect(api.delete()).resolves.not.toThrow()
  })

  test('API call space delete fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    await expect(api.delete()).rejects.toEqual(error)
  })

  test('API call space update', async () => {
    const responseData = {
      sys: {
        id: 'id',
        type: 'Space',
      },
      name: 'updatedname',
    }
    const { api, makeRequest, entitiesMock } = setup(Promise.resolve(responseData))
    entitiesMock.space.wrapSpace.mockReturnValue(responseData)

    api.sys = {
      id: 'id',
      type: 'Space',
      version: 2,
    }
    const plainApi = toPlainObject(api)

    plainApi.name = 'updatedname'
    const result = await plainApi.update()

    expect(result).toEqual(responseData)
    expect(makeRequest.mock.calls[0][0].payload.name).toBe('updatedname')
  })

  test('API call space update fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api.sys = {
      id: 'id',
      type: 'Space',
      version: 2,
    }
    const plainApi = toPlainObject(api)

    await expect(plainApi.update()).rejects.toEqual(error)
  })

  test('API call getWebhook', async () => {
    await makeGetEntityTest(setup, {
      entityType: 'webhook',
      mockToReturn: webhookMock,
      methodToTest: 'getWebhook',
    })
  })

  test('API call getWebhook fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'getWebhook',
    })
  })

  test('API call getWebhooks', async () => {
    await makeGetCollectionTest(setup, {
      entityType: 'webhook',
      mockToReturn: webhookMock,
      methodToTest: 'getWebhooks',
    })
  })

  test('API call getWebhooks fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'getWebhooks',
    })
  })

  test('API call createWebhook', async () => {
    await makeCreateEntityTest(setup, {
      entityType: 'webhook',
      mockToReturn: webhookMock,
      methodToTest: 'createWebhook',
    })
  })

  test('API call createWebhook fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'createWebhook',
    })
  })

  test('API call createWebhookWithId', async () => {
    await makeCreateEntityWithIdTest(setup, {
      entityType: 'webhook',
      mockToReturn: webhookMock,
      methodToTest: 'createWebhookWithId',
    })
  })

  test('API call createWebhookWithId fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'createWebhookWithId',
    })
  })

  test('API call getTeams', async () => {
    await makeGetCollectionTest(setup, {
      entityType: 'team',
      mockToReturn: teamMock,
      methodToTest: 'getTeams',
    })
  })

  test('API call getTeams fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'getTeams',
    })
  })

  test('API call getSpaceMembers', async () => {
    await makeGetCollectionTest(setup, {
      entityType: 'spaceMember',
      mockToReturn: spaceMemberMock,
      methodToTest: 'getSpaceMembers',
    })
  })

  test('API call getSpaceMembership', async () => {
    await makeGetEntityTest(setup, {
      entityType: 'spaceMembership',
      mockToReturn: spaceMembershipMock,
      methodToTest: 'getSpaceMembership',
    })
  })

  test('API call getSpaceMembership fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'getSpaceMembership',
    })
  })

  test('API call getSpaceMemberships', async () => {
    await makeGetCollectionTest(setup, {
      entityType: 'spaceMembership',
      mockToReturn: spaceMembershipMock,
      methodToTest: 'getSpaceMemberships',
    })
  })

  test('API call getSpaceMemberships fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'getSpaceMemberships',
    })
  })

  test('API call createSpaceMembership', async () => {
    await makeCreateEntityTest(setup, {
      entityType: 'spaceMembership',
      mockToReturn: spaceMembershipMock,
      methodToTest: 'createSpaceMembership',
    })
  })

  test('API call getTeamSpaceMembership', async () => {
    await makeGetEntityTest(setup, {
      entityType: 'teamSpaceMembership',
      mockToReturn: teamSpaceMembershipMock,
      methodToTest: 'getTeamSpaceMembership',
    })
  })

  test('API call getTeamSpaceMembership fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'getTeamSpaceMembership',
    })
  })

  test('API call getTeamSpaceMemberships', async () => {
    await makeGetCollectionTest(setup, {
      entityType: 'teamSpaceMembership',
      mockToReturn: teamSpaceMembershipMock,
      methodToTest: 'getTeamSpaceMemberships',
    })
  })

  test('API call getTeamSpaceMemberships fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'getTeamSpaceMemberships',
    })
  })

  test('API call createTeamSpaceMembership', async () => {
    const { api, entitiesMock } = setup(Promise.resolve(teamSpaceMembershipMock))
    entitiesMock.teamSpaceMembership.wrapTeamSpaceMembership.mockReturnValue(
      teamSpaceMembershipMock
    )

    const result = await api.createTeamSpaceMembership('team-id', { admin: true, roles: [] })
    expect(result).toStrictEqual(teamSpaceMembershipMock)
  })

  test('API call createSpaceMembership fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'createSpaceMembership',
    })
  })

  test('API call createSpaceMembershipWithId', async () => {
    await makeCreateEntityWithIdTest(setup, {
      entityType: 'spaceMembership',
      mockToReturn: spaceMembershipMock,
      methodToTest: 'createSpaceMembershipWithId',
    })
  })

  test('API call createSpaceMembershipWithId fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'createSpaceMembershipWithId',
    })
  })

  test('API call getSpaceUser', async () => {
    await makeGetEntityTest(setup, {
      entityType: 'user',
      mockToReturn: userMock,
      methodToTest: 'getSpaceUser',
    })
  })

  test('API call getSpaceUser fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'getSpaceUser',
    })
  })

  test('API call getSpaceUsers', async () => {
    await makeGetCollectionTest(setup, {
      entityType: 'user',
      mockToReturn: userMock,
      methodToTest: 'getSpaceUsers',
    })
  })

  test('API call getSpaceUsers fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'getSpaceUsers',
    })
  })

  test('API call getRole', async () => {
    await makeGetEntityTest(setup, {
      entityType: 'role',
      mockToReturn: roleMock,
      methodToTest: 'getRole',
    })
  })

  test('API call getRole fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'getRole',
    })
  })

  test('API call getRoles', async () => {
    await makeGetCollectionTest(setup, {
      entityType: 'role',
      mockToReturn: roleMock,
      methodToTest: 'getRoles',
    })
  })

  test('API call getRoles fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'getRoles',
    })
  })

  test('API call createRole', async () => {
    await makeCreateEntityTest(setup, {
      entityType: 'role',
      mockToReturn: roleMock,
      methodToTest: 'createRole',
    })
  })

  test('API call createRole fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'createRole',
    })
  })

  test('API call createRoleWithId', async () => {
    await makeCreateEntityWithIdTest(setup, {
      entityType: 'role',
      mockToReturn: roleMock,
      methodToTest: 'createRoleWithId',
    })
  })

  test('API call createRoleWithId fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'createRoleWithId',
    })
  })

  test('API call getApiKey', async () => {
    await makeGetEntityTest(setup, {
      entityType: 'apiKey',
      mockToReturn: apiKeyMock,
      methodToTest: 'getApiKey',
    })
  })

  test('API call getApiKey fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'getApiKey',
    })
  })

  test('API call getApiKeys', async () => {
    await makeGetCollectionTest(setup, {
      entityType: 'apiKey',
      mockToReturn: apiKeyMock,
      methodToTest: 'getApiKeys',
    })
  })

  test('API call getApiKeys fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'getApiKeys',
    })
  })

  test('API call createApiKey', async () => {
    await makeCreateEntityTest(setup, {
      entityType: 'apiKey',
      mockToReturn: apiKeyMock,
      methodToTest: 'createApiKey',
    })
  })

  test('API call createApiKey fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'createApiKey',
    })
  })

  test('API call createApiKeyWithId', async () => {
    await makeCreateEntityWithIdTest(setup, {
      entityType: 'apiKey',
      mockToReturn: apiKeyMock,
      methodToTest: 'createApiKeyWithId',
    })
  })

  test('API call createApiKeyWithId fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'createApiKeyWithId',
    })
  })

  test('API call getEnvironmentAlias', async () => {
    await makeGetEntityTest(setup, {
      entityType: 'environmentAlias',
      mockToReturn: environmentAliasMock,
      methodToTest: 'getEnvironmentAlias',
    })
  })

  test('API call getEnvironmentAlias fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'getEnvironmentAlias',
    })
  })

  test('API call getEnvironmentAliases', async () => {
    await makeGetCollectionTest(setup, {
      entityType: 'environmentAlias',
      mockToReturn: environmentAliasMock,
      methodToTest: 'getEnvironmentAliases',
    })
  })

  test('API call getEnvironmentAliases fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'getEnvironmentAliases',
    })
  })

  test('API call getScheduledActions', async () => {
    await makeGetCollectionTest(setup, {
      entityType: 'scheduledAction',
      mockToReturn: scheduledActionCollectionMock,
      methodToTest: 'getScheduledActions',
    })
  })

  test('API call getScheduledActions fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'getScheduledActions',
    })
  })

  test('API call createScheduledAction', async () => {
    await makeGetEntityTest(setup, {
      entityType: 'scheduledAction',
      mockToReturn: scheduledActionMock,
      methodToTest: 'createScheduledAction',
    })
  })

  test('API call createScheduledAction fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'createScheduledAction',
    })
  })

  test('API call updateScheduledAction', async () => {
    await makeGetEntityTest(setup, {
      entityType: 'scheduledAction',
      mockToReturn: scheduledActionMock,
      methodToTest: 'updateScheduledAction',
    })
  })

  test('API call updateScheduledAction fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'updateScheduledAction',
    })
  })
})
