import { expect } from 'chai'
import { before, describe, test } from 'mocha'
import {
  initClient,
  initPlainClient,
  createTestEnvironment,
  getTestOrganization,
  createTestSpace,
} from '../helpers'

describe('AppSignedRequest api', function () {
  let appDefinition
  let environment
  let space
  let client

  before(async () => {
    const organization = await getTestOrganization()

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
    await environment.createAppInstallation(appDefinition.sys.id, {})
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
