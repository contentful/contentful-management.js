import { expect } from 'chai'
import { before, after, describe, test } from 'mocha'
import { initPlainClient, getTestOrganization } from '../helpers'

describe('AppSigningSecret api', function () {
  let appDefinition
  let client
  let organization

  before(async () => {
    organization = await getTestOrganization()

    appDefinition = await organization.createAppDefinition({
      name: 'Test AppSignedRequest',
    })

    client = initPlainClient()
  })

  after(async () => {
    if (appDefinition) {
      await appDefinition.delete()
    }
  })

  test('createAppSigningSecret', async () => {
    const signingSecret = await client.appSigningSecret.create(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { value: 'q_Oly53ipVRUxyoBmkG0MITMR9oca9wPsXOpsQ-bWdndmWwc_xT3AIJrJ_yWwI74' }
    )

    expect(signingSecret.redactedValue).equals('wI74')

    await client.appSigningSecret.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })
  })

  test('getAppSigningSecret', async () => {
    await client.appSigningSecret.create(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { value: 'q_Oly53ipVRUxyoBmkG0MITMR9oca9wPsXOpsQ-bWdndmWwc_xT3AIJrJ_yWwI75' }
    )
    const signingSecret = await client.appSigningSecret.get({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })

    expect(signingSecret.redactedValue).equals('wI75')
    await client.appSigningSecret.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })
  })

  test('updateAppSigningSecret', async () => {
    const signingSecret = await client.appSigningSecret.create(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { value: 'q_Oly53ipVRUxyoBmkG0MITMR9oca9wPsXOpsQ-bWdndmWwc_xT3AIJrJ_yWwI74' }
    )

    expect(signingSecret.redactedValue).equals('wI74')

    const updatedSigningSecret = await client.appSigningSecret.update(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { value: 'q_Oly53ipVRUxyoBmkG0MITMR9oca9wPsXOpsQ-bWdndmWwc_xT3AIJrJ_yWwI76' }
    )

    expect(updatedSigningSecret.redactedValue).equals('wI76')

    await client.appSigningSecret.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })
  })

  test('deleteAppSigningSecret', async () => {
    await client.appSigningSecret.create(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { value: 'q_Oly53ipVRUxyoBmkG0MITMR9oca9wPsXOpsQ-bWdndmWwc_xT3AIJrJ_yWwI74' }
    )

    await client.appSigningSecret.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })

    await expect(
      client.appSigningSecret.get({
        organizationId: organization.sys.id,
        appDefinitionId: appDefinition.sys.id,
      })
    ).to.be.rejectedWith('The resource could not be found')
  })
})
