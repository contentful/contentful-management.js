import test from 'blue-tape'

import { toPlainObject } from 'contentful-sdk-core'
import createSpaceApi, {
  __RewireAPI__ as createSpaceApiRewireApi,
} from '../../lib/create-space-api'
import {
  spaceMock,
  webhookMock,
  spaceMemberMock,
  spaceMembershipMock,
  teamSpaceMembershipMock,
  roleMock,
  apiKeyMock,
  userMock,
  setupEntitiesMock,
  cloneMock,
  environmentAliasMock,
} from './mocks/entities'
import setupHttpMock from './mocks/http'
import {
  makeGetEntityTest,
  makeGetCollectionTest,
  makeCreateEntityTest,
  makeCreateEntityWithIdTest,
  makeEntityMethodFailingTest,
} from './test-creators/static-entity-methods'

function setup(promise) {
  const entitiesMock = setupEntitiesMock(createSpaceApiRewireApi)
  const httpMock = setupHttpMock(promise)
  const api = createSpaceApi({ http: httpMock })
  api.toPlainObject = () => spaceMock
  return {
    api,
    httpMock,
    entitiesMock,
  }
}

function teardown() {
  createSpaceApiRewireApi.__ResetDependency__('entities')
}

test('API call space delete', (t) => {
  t.plan(1)

  const data = { sys: { id: 'spaceId' } }

  const { api } = setup(
    Promise.resolve({
      data: data,
    })
  )

  api.toPlainObject = () => data

  return api.delete().then(() => {
    t.pass('space was deleted')
    teardown()
  })
})

test('API call space delete fails', (t) => {
  t.plan(1)
  const error = cloneMock('error')
  const { api } = setup(Promise.reject(error))

  api.toPlainObject = () => ({ sys: { id: 'spaceId' } })

  return api.delete().catch((r) => {
    t.equals(r.name, '404 Not Found')
    teardown()
  })
})

test('API call space update', (t) => {
  t.plan(3)
  const responseData = {
    sys: { id: 'id', type: 'Space' },
    name: 'updatedname',
  }
  let { api, httpMock, entitiesMock } = setup(Promise.resolve({ data: responseData }))
  entitiesMock.space.wrapSpace.returns(responseData)

  // mocks data that would exist in a space object already retrieved from the server
  api.sys = { id: 'id', type: 'Space', version: 2 }
  api = toPlainObject(api)

  api.name = 'updatedname'
  return api.update().then((r) => {
    t.looseEqual(r, responseData, 'space is wrapped')
    t.equals(httpMock.put.args[0][1].name, 'updatedname', 'data is sent')
    t.equals(httpMock.put.args[0][2].headers['X-Contentful-Version'], 2, 'version header is sent')
    teardown()
  })
})

test('API call space update fails', (t) => {
  t.plan(1)
  const error = cloneMock('error')
  let { api } = setup(Promise.reject(error))

  // mocks data that would exist in a space object already retrieved from the server
  api.sys = { id: 'id', type: 'Space', version: 2 }
  api = toPlainObject(api)

  return api.update().catch((r) => {
    t.equals(r.name, '404 Not Found')
    teardown()
  })
})

test('API call getWebhook', (t) => {
  makeGetEntityTest(t, setup, teardown, {
    entityType: 'webhook',
    mockToReturn: webhookMock,
    methodToTest: 'getWebhook',
  })
})

test('API call getWebhook fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'getWebhook',
  })
})

test('API call getWebhooks', (t) => {
  makeGetCollectionTest(t, setup, teardown, {
    entityType: 'webhook',
    mockToReturn: webhookMock,
    methodToTest: 'getWebhooks',
  })
})

test('API call getWebhooks fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'getWebhooks',
  })
})

test('API call createWebhook', (t) => {
  makeCreateEntityTest(t, setup, teardown, {
    entityType: 'webhook',
    mockToReturn: webhookMock,
    methodToTest: 'createWebhook',
  })
})

test('API call createWebhook fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'createWebhook',
  })
})

test('API call createWebhookWithId', (t) => {
  makeCreateEntityWithIdTest(t, setup, teardown, {
    entityType: 'webhook',
    mockToReturn: webhookMock,
    methodToTest: 'createWebhookWithId',
    entityPath: 'webhook_definitions',
  })
})

test('API call createWebhookWithId fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'createWebhookWithId',
  })
})

test('API call getSpaceMembers', (t) => {
  makeGetCollectionTest(t, setup, teardown, {
    entityType: 'spaceMember',
    mockToReturn: spaceMemberMock,
    methodToTest: 'getSpaceMembers',
  })
})

test('API call getSpaceMembership', (t) => {
  makeGetEntityTest(t, setup, teardown, {
    entityType: 'spaceMembership',
    mockToReturn: spaceMembershipMock,
    methodToTest: 'getSpaceMembership',
  })
})

test('API call getSpaceMembership fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'getSpaceMembership',
  })
})

test('API call getSpaceMemberships', (t) => {
  makeGetCollectionTest(t, setup, teardown, {
    entityType: 'spaceMembership',
    mockToReturn: spaceMembershipMock,
    methodToTest: 'getSpaceMemberships',
  })
})

test('API call getSpaceMemberships fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'getSpaceMemberships',
  })
})

test('API call createSpaceMembership', (t) => {
  makeCreateEntityTest(t, setup, teardown, {
    entityType: 'spaceMembership',
    mockToReturn: spaceMembershipMock,
    methodToTest: 'createSpaceMembership',
  })
})

test('API call getTeamSpaceMembership', (t) => {
  makeGetEntityTest(t, setup, teardown, {
    entityType: 'teamSpaceMembership',
    mockToReturn: teamSpaceMembershipMock,
    methodToTest: 'getTeamSpaceMembership',
  })
})

test('API call getTeamSpaceMembership fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'getTeamSpaceMembership',
  })
})

test('API call getTeamSpaceMemberships', (t) => {
  makeGetCollectionTest(t, setup, teardown, {
    entityType: 'teamSpaceMembership',
    mockToReturn: teamSpaceMembershipMock,
    methodToTest: 'getTeamSpaceMemberships',
  })
})

test('API call getTeamSpaceMemberships fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'getTeamSpaceMemberships',
  })
})

test('API call createTeamSpaceMembership', (t) => {
  t.plan(1)
  const { api, entitiesMock } = setup(Promise.resolve({}))
  entitiesMock['teamSpaceMembership'][`wrapTeamSpaceMembership`].returns(teamSpaceMembershipMock)

  return api['createTeamSpaceMembership']({ admin: false, teamId: 'id' }).then((r) => {
    t.looseEqual(r, teamSpaceMembershipMock)
    teardown()
  })
})

test('API call createSpaceMembership fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'createSpaceMembership',
  })
})

test('API call createSpaceMembershipWithId', (t) => {
  makeCreateEntityWithIdTest(t, setup, teardown, {
    entityType: 'spaceMembership',
    mockToReturn: spaceMembershipMock,
    methodToTest: 'createSpaceMembershipWithId',
    entityPath: 'space_memberships',
  })
})

test('API call createSpaceMembershipWithId fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'createSpaceMembershipWithId',
  })
})

test('API call getSpaceUser', (t) => {
  makeGetEntityTest(t, setup, teardown, {
    entityType: 'user',
    mockToReturn: userMock,
    methodToTest: 'getSpaceUser',
  })
})

test('API call getSpaceUser fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'getSpaceUser',
  })
})

test('API call getSpaceUsers', (t) => {
  makeGetCollectionTest(t, setup, teardown, {
    entityType: 'user',
    mockToReturn: userMock,
    methodToTest: 'getSpaceUsers',
  })
})

test('API call getSpaceUsers fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'getSpaceUsers',
  })
})

test('API call getRole', (t) => {
  makeGetEntityTest(t, setup, teardown, {
    entityType: 'role',
    mockToReturn: roleMock,
    methodToTest: 'getRole',
  })
})

test('API call getRole fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'getRole',
  })
})

test('API call getRoles', (t) => {
  makeGetCollectionTest(t, setup, teardown, {
    entityType: 'role',
    mockToReturn: roleMock,
    methodToTest: 'getRoles',
  })
})

test('API call getRoles fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'getRoles',
  })
})

test('API call createRole', (t) => {
  makeCreateEntityTest(t, setup, teardown, {
    entityType: 'role',
    mockToReturn: roleMock,
    methodToTest: 'createRole',
  })
})

test('API call createRole fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'createRole',
  })
})

test('API call createRoleWithId', (t) => {
  makeCreateEntityWithIdTest(t, setup, teardown, {
    entityType: 'role',
    mockToReturn: roleMock,
    methodToTest: 'createRoleWithId',
    entityPath: 'roles',
  })
})

test('API call createRoleWithId fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'createRoleWithId',
  })
})

test('API call getApiKey', (t) => {
  makeGetEntityTest(t, setup, teardown, {
    entityType: 'apiKey',
    mockToReturn: apiKeyMock,
    methodToTest: 'getApiKey',
  })
})

test('API call getApiKey fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'getApiKey',
  })
})

test('API call getApiKeys', (t) => {
  makeGetCollectionTest(t, setup, teardown, {
    entityType: 'apiKey',
    mockToReturn: apiKeyMock,
    methodToTest: 'getApiKeys',
  })
})

test('API call getApiKeys fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'getApiKeys',
  })
})

test('API call createApiKey', (t) => {
  makeCreateEntityTest(t, setup, teardown, {
    entityType: 'apiKey',
    mockToReturn: apiKeyMock,
    methodToTest: 'createApiKey',
  })
})

test('API call createApiKey fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'createApiKey',
  })
})

test('API call createApiKeyWithId', (t) => {
  makeCreateEntityWithIdTest(t, setup, teardown, {
    entityType: 'apiKey',
    mockToReturn: apiKeyMock,
    methodToTest: 'createApiKeyWithId',
    entityPath: 'api_keys',
  })
})

test('API call createApiKeyWithId fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'createApiKeyWithId',
  })
})

test('API call getEnvironmentAlias', (t) => {
  makeGetEntityTest(t, setup, teardown, {
    entityType: 'environmentAlias',
    mockToReturn: environmentAliasMock,
    methodToTest: 'getEnvironmentAlias',
  })
})

test('API call getEnvironmentAlias fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'getEnvironmentAlias',
  })
})

test('API call getEnvironmentAliases', (t) => {
  makeGetCollectionTest(t, setup, teardown, {
    entityType: 'environmentAlias',
    mockToReturn: environmentAliasMock,
    methodToTest: 'getEnvironmentAliases',
  })
})

test('API call getEnvironmentAliases fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'getEnvironmentAliases',
  })
})
