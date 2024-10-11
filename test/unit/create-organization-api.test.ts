import createOrganizationApi from '../../lib/create-organization-api'
import {
  appActionMock,
  appDefinitionMock,
  appUploadMock,
  appSigningSecretMock,
  appEventSubscriptionMock,
  appKeyMock,
  appDetailsMock,
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
import setupMakeRequest from './mocks/makeRequest'
import { expect, describe, test } from 'vitest'

function setup<T>(promise: Promise<T>) {
  const entitiesMock = setupEntitiesMock()
  const makeRequest = setupMakeRequest(promise)
  const api = createOrganizationApi(makeRequest)

  return {
    api: {
      ...api,
      toPlainObject: () => organizationMock,
    },
    makeRequest,
    entitiesMock,
  }
}

describe('A createOrganizationApi', () => {
  // afterEach(() => {
  //   createEnvironmentApiRewireApi.__ResetDependency__('entities')
  // })

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
    const { api, entitiesMock } = setup(Promise.resolve(teamMembershipMock))
    entitiesMock['teamMembership'][`wrapTeamMembership`].mockReturnValue(teamMembershipMock)

    return api
      .createTeamMembership('mockTeamId', {
        admin: true,
        organizationMembershipId: 'id',
      })
      .then((r) => {
        expect(r).eql(teamMembershipMock)
      })
  })

  test('API call getTeamMembership', async () => {
    const { api, entitiesMock } = setup(Promise.resolve(teamMembershipMock))
    entitiesMock['teamMembership'][`wrapTeamMembership`].mockReturnValue(teamMembershipMock)
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
    const { api } = setup(
      Promise.resolve({
        total: 100,
        skip: 0,
        limit: 10,
        items: [teamMembershipMock],
      })
    )
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

    return api['getTeamMembership']('mocked-team-id', 'mocked-team-membership-id').then(
      () => {},
      (r) => {
        expect(r).equals(error)
      }
    )
  })

  test('API call getTeamMemberships for all teams', async () => {
    const { api } = setup(
      Promise.resolve({
        total: 100,
        skip: 0,
        limit: 10,
        items: [teamMembershipMock],
      })
    )
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
    const { api, entitiesMock } = setup(Promise.resolve(teamSpaceMembershipMock))
    entitiesMock['teamSpaceMembership'][`wrapTeamSpaceMembership`].mockReturnValue(
      teamSpaceMembershipMock
    )
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
    const { api } = setup(
      Promise.resolve({
        total: 100,
        skip: 0,
        limit: 10,
        items: [teamSpaceMembershipMock],
      })
    )
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
    const { api } = setup(
      Promise.resolve({
        total: 100,
        skip: 0,
        limit: 10,
        items: [teamSpaceMembershipMock],
      })
    )
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
    const { api, entitiesMock } = setup(Promise.resolve(appUploadMock))
    entitiesMock['appUpload']['wrapAppUpload'].mockReturnValue(appUploadMock)
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
    const { api, entitiesMock } = setup(Promise.resolve(appUploadMock))
    entitiesMock['appUpload']['wrapAppUpload'].mockReturnValue(appUploadMock)
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

  test('API call createAppAction', async () => {
    const { api, entitiesMock } = setup(Promise.resolve(appActionMock))
    entitiesMock['appAction']['wrapAppAction'].mockReturnValue(appActionMock)
    return api['createAppAction']('app-def-id', {
      url: 'https://www.example.com',
      name: 'name',
      category: 'Entries.v1.0',
    }).then((result) => {
      expect(result).eql(appActionMock)
    })
  })

  test('API call createAppAction fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    return api['createAppAction']('app-def-id', {
      url: 'https://www.example.com',
      name: 'name',
      category: 'Entries.v1.0',
    }).then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call updateAppAction', async () => {
    const { api, entitiesMock } = setup(Promise.resolve(appActionMock))
    entitiesMock['appAction']['wrapAppAction'].mockReturnValue(appActionMock)
    return api['updateAppAction']('app-def-id', 'app-action-id', {
      url: 'https://www.example.com',
      name: 'name',
      category: 'Entries.v1.0',
    }).then((result) => {
      expect(result).eql(appActionMock)
    })
  })

  test('API call updateAppAction fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    return api['updateAppAction']('app-def-id', 'app-action-id', {
      url: 'https://www.example.com',
      name: 'name',
      category: 'Entries.v1.0',
    }).then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call getAppAction', async () => {
    const { api, entitiesMock } = setup(Promise.resolve(appActionMock))
    entitiesMock['appAction']['wrapAppAction'].mockReturnValue(appActionMock)
    return api['getAppAction']('app-def-id', 'app-action-id').then((result) => {
      expect(result).eql(appActionMock)
    })
  })

  test('API call getAppAction fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    return api['getAppAction']('app-def-id', 'app-action-id').then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call getAppActions', async () => {
    const { api } = setup(
      Promise.resolve({
        total: 100,
        skip: 0,
        limit: 10,
        items: [appActionMock],
      })
    )
    return api['getAppActions']('app-def-id').then((result) => {
      expect(result).eql({
        total: 100,
        skip: 0,
        limit: 10,
        items: [appActionMock],
      })
    })
  })

  test('API call getAppActions fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    return api['getAppActions']('app-def-id').then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call deleteAppAction', async () => {
    const { api, entitiesMock } = setup(Promise.resolve(appActionMock))
    entitiesMock['appAction']['wrapAppAction'].mockReturnValue(appActionMock)
    return api['deleteAppAction']('app-def-id', 'app-action-id').then((result) => {
      expect(result).eql(undefined)
    })
  })

  test('API call deleteAppAction fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    return api['deleteAppAction']('app-def-id', 'app-action-id').then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call createSigningSecret', async () => {
    const { api, entitiesMock } = setup(Promise.resolve(appSigningSecretMock))
    entitiesMock['appSigningSecret']['wrapAppSigningSecret'].mockReturnValue(appSigningSecretMock)
    return api['upsertAppSigningSecret']('app-def-id', { value: 'mocked-new-secret-id' }).then(
      (result) => {
        expect(result).eql(appSigningSecretMock)
      }
    )
  })

  test('API call createSigningSecret fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api['upsertAppSigningSecret']('app-def-id', { value: 'mocked-new-secret-id' }).then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call getAppSigningSecret', async () => {
    const { api, entitiesMock } = setup(Promise.resolve(appSigningSecretMock))
    entitiesMock['appSigningSecret']['wrapAppSigningSecret'].mockReturnValue(appSigningSecretMock)
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
    const { api, entitiesMock } = setup(Promise.resolve(undefined))
    entitiesMock['appSigningSecret']['wrapAppSigningSecret'].mockReturnValue(undefined)
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

  test('API call createEventSubscription', async () => {
    const { api, entitiesMock } = setup(Promise.resolve(appEventSubscriptionMock))
    entitiesMock['appEventSubscription']['wrapAppEventSubscription'].mockReturnValue(
      appEventSubscriptionMock
    )
    return api['upsertAppEventSubscription']('app-def-id', {
      targetUrl: 'https://contentful.fake/event-processor',
      topics: ['Entry.create'],
    }).then((result) => {
      expect(result).eql(appEventSubscriptionMock)
    })
  })

  test('API call createEventSubscription fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api['upsertAppEventSubscription']('app-def-id', {
      targetUrl: 'https://contentful.fake/event-processor',
      topics: ['Entry.create'],
    }).then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call getAppEventSubscription', async () => {
    const { api, entitiesMock } = setup(Promise.resolve(appEventSubscriptionMock))
    entitiesMock['appEventSubscription']['wrapAppEventSubscription'].mockReturnValue(
      appEventSubscriptionMock
    )
    return api['getAppEventSubscription']('app-def-id').then((result) => {
      expect(result).eql(appEventSubscriptionMock)
    })
  })

  test('API call getAppEventSubscription fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api['getAppEventSubscription']('app-def-id').then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call deleteAppEventSubscription', async () => {
    const { api, entitiesMock } = setup(Promise.resolve(undefined))
    entitiesMock['appEventSubscription']['wrapAppEventSubscription'].mockReturnValue(undefined)
    return api['deleteAppEventSubscription']('app-def-id').then((result) => {
      expect(result).eql(undefined)
    })
  })

  test('API call deleteAppEventSubscription fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api['deleteAppEventSubscription']('app-def-id').then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call createKey', async () => {
    const { api, entitiesMock } = setup(Promise.resolve(appKeyMock))
    entitiesMock['appKey']['wrapAppKey'].mockReturnValue(appKeyMock)
    return api['createAppKey']('app-def-id', { generate: true }).then((result) => {
      expect(result).eql(appKeyMock)
    })
  })

  test('API call createKey fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api['createAppKey']('app-def-id', { generate: true }).then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call getAppKey', async () => {
    const { api, entitiesMock } = setup(Promise.resolve(appKeyMock))
    entitiesMock['appKey']['wrapAppKey'].mockReturnValue(appKeyMock)
    return api['getAppKey']('app-def-id', 'fingerprint').then((result) => {
      expect(result).eql(appKeyMock)
    })
  })

  test('API call getAppKey fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api['getAppKey']('app-def-id', 'fingerprint').then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call getAppKeys', async () => {
    return makeGetCollectionTest(setup, {
      entityType: 'appKey',
      mockToReturn: appKeyMock,
      methodToTest: 'getAppKeys',
    })
  })

  test('API call getAppKeys fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api['getAppKeys']('app-def-id').then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call deleteAppKey', async () => {
    const { api, entitiesMock } = setup(Promise.resolve(undefined))
    entitiesMock['appKey']['wrapAppKey'].mockReturnValue(undefined)
    return api['deleteAppKey']('app-def-id', 'mocked-fingerprint').then((result) => {
      expect(result).eql(undefined)
    })
  })

  test('API call deleteAppKey fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api['deleteAppKey']('app-def-id', 'mocked-fingerprint').then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call createAppDetails', async () => {
    const { api, entitiesMock } = setup(Promise.resolve(appDetailsMock))
    entitiesMock['appDetails']['wrapAppDetails'].mockReturnValue(appDetailsMock)
    return api['upsertAppDetails']('app-def-id', {}).then((result) => {
      expect(result).eql(appDetailsMock)
    })
  })

  test('API call createAppDetails fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api['upsertAppDetails']('app-def-id', {}).then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call getAppDetails', async () => {
    const { api, entitiesMock } = setup(Promise.resolve(appDetailsMock))
    entitiesMock['appDetails']['wrapAppDetails'].mockReturnValue(appDetailsMock)
    return api['getAppDetails']('app-def-id').then((result) => {
      expect(result).eql(appDetailsMock)
    })
  })

  test('API call getAppDetails fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api['getAppDetails']('app-def-id').then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })

  test('API call deleteAppDetails', async () => {
    const { api, entitiesMock } = setup(Promise.resolve(undefined))
    entitiesMock['appDetails']['wrapAppDetails'].mockReturnValue(undefined)
    return api['deleteAppDetails']('app-def-id').then((result) => {
      expect(result).eql(undefined)
    })
  })

  test('API call deleteAppDetails fails', async () => {
    const error = cloneMock('error')
    const { api } = setup(Promise.reject(error))

    api['deleteAppDetails']('app-def-id').then(
      () => {},
      (errorResponse) => {
        expect(errorResponse).eql(error)
      }
    )
  })
})
