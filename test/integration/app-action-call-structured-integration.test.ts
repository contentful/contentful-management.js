import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import type {
  PlainClientAPI,
  AppActionCallProps,
  AppActionProps,
} from '../../lib/contentful-management'
import {
  initPlainClient,
  getTestOrganization,
  getDefaultSpace,
  createAppInstallation,
  timeoutToCalmRateLimiting,
} from '../helpers'

describe('AppActionCall structured endpoints', function () {
  let client: PlainClientAPI
  let organization
  let space
  let appDefinition
  let appAction: AppActionProps | undefined

  beforeAll(async () => {
    organization = await getTestOrganization()
    space = await getDefaultSpace()

    // Create an app definition for installation context
    appDefinition = await organization.createAppDefinition({
      name: 'Structured AppActionCall Test',
    })

    client = initPlainClient({
      spaceId: space.sys.id,
      environmentId: 'master',
    })

    await createAppInstallation(appDefinition.sys.id)

    // Ensure the App Signing Secret exists to allow invoking App Action Calls
    await client.appSigningSecret.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { value: 'q_Oly53ipVRUxyoBmkG0MITMR9oca9wPsXOpsQ-bWdndmWwc_xT3AIJrJ_yWwI74' }
    )

    // Create an App Action to target in this suite
    appAction = await client.appAction.create(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      {
        category: 'Custom',
        name: 'structured test action',
        url: 'https://www.somewhere.com',
        parameters: [],
      }
    )
  })

  afterAll(async () => {
    if (appDefinition) {
      // Clean up signing secret and installation
      await client.appSigningSecret.delete({
        organizationId: organization.sys.id,
        appDefinitionId: appDefinition.sys.id,
      })
      await client.appInstallation.delete({ appDefinitionId: appDefinition.sys.id })
      if (appAction) {
        await client.appAction.delete({
          organizationId: organization.sys.id,
          appDefinitionId: appDefinition.sys.id,
          appActionId: appAction.sys.id,
        })
      }
      await appDefinition.delete()
    }
  })

  afterAll(timeoutToCalmRateLimiting)

  test('createWithResult returns a completed structured AppActionCall', async () => {
    // Use the action created in beforeAll
    const appActionId = appAction!.sys.id

    const call: AppActionCallProps = await client.appActionCall.createWithResult(
      {
        spaceId: space.sys.id,
        environmentId: 'master',
        appDefinitionId: appDefinition.sys.id,
        appActionId,
      },
      { parameters: {} }
    )

    expect(['succeeded', 'failed', 'processing']).toContain(call.status)
  })

  test('get and getResponse endpoints are reachable for a known call id', async () => {
    const appActionId = appAction!.sys.id

    const created = await client.appActionCall.create(
      {
        spaceId: space.sys.id,
        environmentId: 'master',
        appDefinitionId: appDefinition.sys.id,
        appActionId,
      },
      { parameters: {} }
    )

    const call = await client.appActionCall.get({
      spaceId: space.sys.id,
      environmentId: 'master',
      appDefinitionId: appDefinition.sys.id,
      appActionId,
      callId: created.sys.id,
    })

    expect(call.sys.type).toBe('AppActionCall')

    const raw = await client.appActionCall.getResponse({
      spaceId: space.sys.id,
      environmentId: 'master',
      appDefinitionId: appDefinition.sys.id,
      appActionId,
      callId: created.sys.id,
    })

    expect(raw.sys.type).toBe('AppActionCallResponse')
  })
})
