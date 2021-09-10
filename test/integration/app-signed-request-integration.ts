import { expect } from 'chai'
import { before, after, describe, test } from 'mocha'
import {
  initClient,
  initPlainClient,
  createTestEnvironment,
  getTestOrganization,
  createTestSpace,
} from '../helpers'

describe('AppSignedRequest api', function () {
  let appDefinition
  let appInstallation
  let environment
  let space
  let client
  let organization

  before(async () => {
    organization = await getTestOrganization()

    appDefinition = await organization.createAppDefinition({
      name: 'Test AppSignedRequest',
    })

    client = initPlainClient()

    await client.appSigningSecret.create(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { value: 'q_Oly53ipVRUxyoBmkG0MITMR9oca9wPsXOpsQ-bWdndmWwc_xT3AIJrJ_yWwI74' }
    )

    space = await createTestSpace(initClient(), 'SignedRequest')
    environment = await createTestEnvironment(space, 'Testing Environment')
    appInstallation = await environment.createAppInstallation(appDefinition.sys.id, {})
  })

  after(async () => {
    if (appInstallation) {
      await appInstallation.delete()
    }
    if (appDefinition) {
      await appDefinition.delete()
    }

    await client.appSigningSecret.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })

    if (environment) {
      await environment.delete()
    }
    if (space) {
      await space.delete()
    }
  })

  test('createAppSignedRequest', async () => {
    const signedRequest = await client.appSignedRequest.create(
      {
        spaceId: space.sys.id,
        environmentId: environment.sys.id,
        appDefinitionId: appDefinition.sys.id,
      },
      {
        method: 'POST',
        path: '/request_path',
        body: '{ "key": "data" }',
        headers: {
          'x-my-header': 'some-value',
        },
      }
    )

    expect(signedRequest.sys.type).equals('AppSignedRequest', 'type')
  })
})
