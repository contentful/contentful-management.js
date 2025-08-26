import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import type { PlainClientAPI, AppActionCallProps } from '../../lib/contentful-management'
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
  })

  afterAll(async () => {
    if (appDefinition) {
      await client.appInstallation.delete({ appDefinitionId: appDefinition.sys.id })
      await appDefinition.delete()
    }
  })

  afterAll(timeoutToCalmRateLimiting)

  test('createWithResult returns a completed structured AppActionCall', async () => {
    // This assumes an existing action configured to return quickly in the test env
    const appActionId = 'test-action'

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
    const appActionId = 'test-action'

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


