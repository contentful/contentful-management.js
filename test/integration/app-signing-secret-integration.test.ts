import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import { initPlainClient, getTestOrganization } from '../helpers'
import type { PlainClientAPI, Organization, AppDefinition } from '../../lib/contentful-management'

describe('AppSigningSecret api', { sequential: true }, () => {
  let appDefinition: AppDefinition
  let client: PlainClientAPI
  let organization: Organization

  beforeAll(async () => {
    organization = await getTestOrganization()

    appDefinition = await organization.createAppDefinition({
      name: 'Test AppSignedRequest',
    })

    client = initPlainClient()
  })

  afterAll(async () => {
    if (appDefinition) {
      await appDefinition.delete()
    }
  })

  test('createAppSigningSecret', async () => {
    const signingSecret = await client.appSigningSecret.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { value: 'q_Oly53ipVRUxyoBmkG0MITMR9oca9wPsXOpsQ-bWdndmWwc_xT3AIJrJ_yWwI74' }
    )

    expect(signingSecret.redactedValue).toBe('wI74')

    await client.appSigningSecret.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })
  })

  test('getAppSigningSecret', async () => {
    await client.appSigningSecret.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { value: 'q_Oly53ipVRUxyoBmkG0MITMR9oca9wPsXOpsQ-bWdndmWwc_xT3AIJrJ_yWwI75' }
    )
    const signingSecret = await client.appSigningSecret.get({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })

    expect(signingSecret.redactedValue).toBe('wI75')
    await client.appSigningSecret.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })
  })

  test('updateAppSigningSecret', async () => {
    const signingSecret = await client.appSigningSecret.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { value: 'q_Oly53ipVRUxyoBmkG0MITMR9oca9wPsXOpsQ-bWdndmWwc_xT3AIJrJ_yWwI74' }
    )

    expect(signingSecret.redactedValue).toBe('wI74')

    const updatedSigningSecret = await client.appSigningSecret.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { value: 'q_Oly53ipVRUxyoBmkG0MITMR9oca9wPsXOpsQ-bWdndmWwc_xT3AIJrJ_yWwI76' }
    )

    expect(updatedSigningSecret.redactedValue).toBe('wI76')

    await client.appSigningSecret.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })
  })

  test('deleteAppSigningSecret', async () => {
    await client.appSigningSecret.upsert(
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
    ).rejects.toThrow('The resource could not be found')
  })
})
