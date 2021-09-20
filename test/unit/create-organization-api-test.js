import createOrganizationApi, {
  __RewireAPI__ as createOrganizationApiRewireApi,
} from '../../lib/create-organization-api'
import {
  appDefinitionMock,
  appUploadMock,
  appSigningSecretMock,
  appMetadataMock,
  cloneMock,
  organizationInvitationMock,
  organizationMembershipMock,
  organizationMock,
  setupEntitiesMock,
  spaceMembershipMock,
  teamMembershipMock,
  teamMock,
  teamSpaceMembershipMock,
  userMock,
} from './mocks/entities'
import {
  makeGetEntityTest,
  makeGetCollectionTest,
  makeCreateEntityTest,
  makeEntityMethodFailingTest,
} from './test-creators/static-entity-methods'
import { afterEach, describe, test } from 'mocha'
import { expect } from 'chai'
import setupMakeRequest from './mocks/makeRequest'

import { __RewireAPI__ as createEnvironmentApiRewireApi } from '../../lib/create-environment-api'

function setup(promise) {
  const entitiesMock = setupEntitiesMock(createOrganizationApiRewireApi)
  const makeRequest = setupMakeRequest(promise)
  const api = createOrganizationApi(makeRequest)
  api.toPlainObject = () => organizationMock
  return {
    api,
    makeRequest,
    entitiesMock,
  }
}

describe('A createOrganizationApi', () => {
  afterEach(() => {
    createEnvironmentApiRewireApi.__ResetDependency__('entities')
  })

  test('API call getAppDefinition', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'appDefinition',
      mockToReturn: appDefinitionMock,
      methodToTest: 'getAppDefinition',
    })
  })

  test('API call getAppDefinition fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getAppDefinition',
    })
  })

  test('API call getAppDefinitions', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'appDefinition',
      mockToReturn: appDefinitionMock,
      methodToTest: 'getAppDefinitions',
    })
  })

  test('API call getAppDefinitions fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getAppDefinitions',
    })
  })

  test('API call getUser', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'user',
      mockToReturn: userMock,
      methodToTest: 'getUser',
    })
  })

  test('API call getUser fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getUser',
    })
  })

  test('API call getUsers', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'user',
      mockToReturn: userMock,
      methodToTest: 'getUsers',
    })
  })

  test('API call getUsers fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getUsers',
    })
  })

  test('API call createAppDefinition', async () => {
    return makeCreateEntityTest(setup, {
      entityType: 'appDefinition',
      mockToReturn: appDefinitionMock,
      methodToTest: 'createAppDefinition',
    })
  })

  test('API call createAppDefinition fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createAppDefinition',
    })
  })

  test('API call getOrganizationMembership', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'organizationMembership',
      mockToReturn: organizationMembershipMock,
      methodToTest: 'getOrganizationMembership',
    })
  })

  test('API call getOrganizationMembership fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getOrganizationMembership',
    })
  })

  test('API call getOrganizationMemberships', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'organizationMembership',
      mockToReturn: organizationMembershipMock,
      methodToTest: 'getOrganizationMemberships',
    })
  })

  test('API call getOrganizationMemberships fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getOrganizationMemberships',
    })
  })

  test('API call getOrganizationSpaceMembership', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'spaceMembership',
      mockToReturn: spaceMembershipMock,
      methodToTest: 'getOrganizationSpaceMembership',
    })
  })

  test('API call getOrganizationSpaceMembership fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getOrganizationSpaceMembership',
    })
  })

  test('API call getOrganizationInvitation', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'organizationInvitation',
      mockToReturn: organizationInvitationMock,
      methodToTest: 'getOrganizationInvitation',
    })
  })

  test('API call getOrganizationInvitation fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getOrganizationInvitation',
    })
  })

  test('API call createOrganizationInvitation', async () => {
    return makeCreateEntityTest(setup, {
      entityType: 'organizationInvitation',
      mockToReturn: organizationInvitationMock,
      methodToTest: 'createOrganizationInvitation',
    })
  })

  test('API call createOrganizationInvitation fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createOrganizationInvitation',
    })
  })

  test('API call getSpaceOrganizationMemberships', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'spaceMembership',
      mockToReturn: spaceMembershipMock,
      methodToTest: 'getOrganizationSpaceMemberships',
    })
  })

  test('API call getOrganizationSpaceMemberships fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getOrganizationSpaceMemberships',
    })
  })

  test('API call createTeam', async () => {
    return makeCreateEntityTest(setup, {
      entityType: 'team',
      mockToReturn: teamMock,
      methodToTest: 'createTeam',
    })
  })

  test('API call createTeam fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createTeam',
    })
  })

  test('API call getTeam', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'team',
      mockToReturn: teamMock,
      methodToTest: 'getTeam',
    })
  })

  test('API call getTeam fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'getTeam',
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

  test('API call createTeamMembership', async () => {
    const { api, entitiesMock } = setup(Promise.resolve({}))
    entitiesMock['teamMembership'][`wrapTeamMembership`].returns(teamMembershipMock)

    return api['createTeamMembership']({
      admin: true,
      organizationMembershipId: 'id',
    }).then((r) => {
      expect(r).eql(teamMembershipMock)
    })
  })

  test('API call getTeamMembership', async () => {
    const { api, entitiesMock } = setup(Promise.resolve({}))
    entitiesMock['teamMembership'][`wrapTeamMembership`].returns(teamMembershipMock)
    return api['getTeamMembership']('teamid', 'eid').then((r) => {
      expect(r).eql(teamMembershipMock)
    })
  })

  test('API call getTeamMembership fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    return api['getTeamMembership']('teamid', 'eid').then(
      () => {},
      (r) => {
        expect(r).equals(error)
      }
    )
  })

  test('API call getTeamMemberships', async () => {
    const { api, entitiesMock } = setup(Promise.resolve({}))
    entitiesMock['teamMembership'][`wrapTeamMembershipCollection`].returns({
      total: 100,
      skip: 0,
      limit: 10,
      items: [teamMembershipMock],
    })
    return api['getTeamMemberships']({ teamId: 'teamid' }).then((r) => {
      expect(r).eql({
        total: 100,
        skip: 0,
        limit: 10,
        items: [teamMembershipMock],
      })
    })
  })

  test('API call getTeamMemberships fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    return api['getTeamMembership']({ teamId: 'teamid' }).then(
      () => {},
      (r) => {
        expect(r).equals(error)
      }
    )
  })

  test('API call getTeamMemberships for all teams', async () => {
    const { api, entitiesMock } = setup(Promise.resolve({}))
    entitiesMock['teamMembership'][`wrapTeamMembershipCollection`].returns({
      total: 100,
      skip: 0,
      limit: 10,
      items: [teamMembershipMock],
    })
    return api['getTeamMemberships']().then((r) => {
      expect(r).eql({
        total: 100,
        skip: 0,
        limit: 10,
        items: [teamMembershipMock],
      })
    })
  })

  test('API call getTeamSpaceMembership', async () => {
    const { api, entitiesMock } = setup(Promise.resolve({}))
    entitiesMock['teamSpaceMembership'][`wrapTeamSpaceMembership`].returns(teamSpaceMembershipMock)
    return api['getTeamSpaceMembership']('eid').then((r) => {
      expect(r).eql(teamSpaceMembershipMock)
    })
  })

  test('API call getTeamSpaceMembership fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    return api['getTeamSpaceMembership']('eid').then(
      () => {},
      (r) => {
        expect(r).equals(error)
      }
    )
  })

  test('API call getTeamSpaceMemberships', async () => {
    const { api, entitiesMock } = setup(Promise.resolve({}))
    entitiesMock['teamSpaceMembership'][`wrapTeamSpaceMembershipCollection`].returns({
      total: 100,
      skip: 0,
      limit: 10,
      items: [teamSpaceMembershipMock],
    })
    return api['getTeamSpaceMemberships']({ teamId: 'teamid' }).then((r) => {
      expect(r).eql({
        total: 100,
        skip: 0,
        limit: 10,
        items: [teamSpaceMembershipMock],
      })
    })
  })

  test('API call getTeamMemberships fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    return api['getTeamSpaceMemberships']({ teamId: 'teamid' }).then(
      () => {},
      (r) => {
        expect(r).eql(error)
      }
    )
  })

  test('API call getTeamMemberships for all teams', async () => {
    const { api, entitiesMock } = setup(Promise.resolve({}))
    entitiesMock['teamSpaceMembership'][`wrapTeamSpaceMembershipCollection`].returns({
      total: 100,
      skip: 0,
      limit: 10,
      items: [teamSpaceMembershipMock],
    })
    return api['getTeamSpaceMemberships']().then((r) => {
      expect(r).eql({
        total: 100,
        skip: 0,
        limit: 10,
        items: [teamSpaceMembershipMock],
      })
    })
  })

  test('API call getAppUpload', async () => {
    const { api, entitiesMock } = setup(Promise.resolve({}))
    entitiesMock['appUpload']['wrapAppUpload'].returns(appUploadMock)
    return api['getAppUpload']('upload-id').then((result) => {
      expect(result).eql(appUploadMock)
    })
  })

  test('API call getAppUpload fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api['getAppUpload']('app-upload-id').then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call createAppUpload', async () => {
    const { api, entitiesMock } = setup(Promise.resolve({}))
    entitiesMock['appUpload']['wrapAppUpload'].returns(appUploadMock)
    return api['createAppUpload']('content-of-zip-file').then((result) => {
      expect(result).eql(appUploadMock)
    })
  })

  test('API call createAppUpload fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api['createAppUpload']('content-of-zip-file').then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call createSigningSecret', async () => {
    const { api, entitiesMock } = setup(Promise.resolve({}))
    entitiesMock['appSigningSecret']['wrapAppSigningSecret'].returns(appSigningSecretMock)
    return api['upsertAppSigningSecret']('app-def-id', { method: 'GET', path: '/some_path' }).then(
      (result) => {
        expect(result).eql(appSigningSecretMock)
      }
    )
  })

  test('API call createSigningSecret fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api['upsertAppSigningSecret']('app-def-id', { method: 'GET', path: '/some_path' }).then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call getAppSigningSecret', async () => {
    const { api, entitiesMock } = setup(Promise.resolve({}))
    entitiesMock['appSigningSecret']['wrapAppSigningSecret'].returns(appSigningSecretMock)
    return api['getAppSigningSecret']('app-def-id').then((result) => {
      expect(result).eql(appSigningSecretMock)
    })
  })

  test('API call getAppSigningSecret fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api['getAppSigningSecret']('app-def-id').then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call deleteAppSigningSecret', async () => {
    const { api, entitiesMock } = setup(Promise.resolve({}))
    entitiesMock['appSigningSecret']['wrapAppSigningSecret'].returns(undefined)
    return api['deleteAppSigningSecret']('app-def-id').then((result) => {
      expect(result).eql(undefined)
    })
  })

  test('API call deleteAppSigningSecret fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api['deleteAppSigningSecret']('app-def-id').then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call createAppMetadata', async () => {
    const { api, entitiesMock } = setup(Promise.resolve({}))
    entitiesMock['appMetadata']['wrapAppMetadata'].returns(appMetadataMock)
    return api['upsertAppMetadata']('app-def-id', { method: 'GET', path: '/some_path' }).then(
      (result) => {
        expect(result).eql(appMetadataMock)
      }
    )
  })

  test('API call createAppMetadata fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api['upsertAppMetadata']('app-def-id', { method: 'GET', path: '/some_path' }).then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call getAppMetadata', async () => {
    const { api, entitiesMock } = setup(Promise.resolve({}))
    entitiesMock['appMetadata']['wrapAppMetadata'].returns(appMetadataMock)
    return api['getAppMetadata']('app-def-id').then((result) => {
      expect(result).eql(appMetadataMock)
    })
  })

  test('API call getAppMetadata fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api['getAppMetadata']('app-def-id').then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call deleteAppMetadata', async () => {
    const { api, entitiesMock } = setup(Promise.resolve({}))
    entitiesMock['appMetadata']['wrapAppMetadata'].returns(undefined)
    return api['deleteAppMetadata']('app-def-id').then((result) => {
      expect(result).eql(undefined)
    })
  })

  test('API call deleteAppMetadata fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api['deleteAppMetadata']('app-def-id').then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })
})
