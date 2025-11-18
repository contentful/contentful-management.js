import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import {
  initPlainClient,
  getDefaultSpace,
  createAppInstallation,
  getTestOrganization,
  timeoutToCalmRateLimiting,
} from '../helpers'
import { sign } from 'jsonwebtoken'
import type {
  AppDefinition,
  Organization,
  Space,
  Environment,
  PlainClientAPI,
  AppKeyProps,
} from '../../lib/index'

describe('AppAccessToken api', { sequential: true }, () => {
  let organization: Organization
  let appDefinition: AppDefinition
  let appKey: AppKeyProps
  let client: PlainClientAPI
  let space: Space
  let environment: Environment
  let entityId: { organizationId: string; appDefinitionId: string }
  let jwt: string

  beforeAll(async () => {
    space = await getDefaultSpace()
    environment = await space.getEnvironment('master')
    organization = await getTestOrganization()

    appDefinition = await organization.createAppDefinition({
      name: 'Test AppAccessToken',
    })

    entityId = {
      organizationId: appDefinition.sys.organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    }

    await createAppInstallation(entityId.appDefinitionId)

    client = initPlainClient({
      spaceId: space.sys.id,
      environmentId: environment.sys.id,
    })

    appKey = await client.appKey.create(entityId, { generate: true })

    const signOptions = { algorithm: 'RS256', issuer: appDefinition.sys.id, expiresIn: '10m' }
    jwt = sign({}, appKey.generated?.privateKey, signOptions)
  })

  afterAll(async () => {
    if (appDefinition) {
      if (appKey) {
        await client.appKey.delete({
          ...entityId,
          fingerprint: appKey.sys.id,
        })
      }
      await client.appInstallation.delete({ appDefinitionId: appDefinition.sys.id })
      await appDefinition.delete()
    }

    await timeoutToCalmRateLimiting()
  })

  test('createAppAccessToken', async () => {
    const appAccessToken = await client.appAccessToken.create(
      {
        spaceId: space.sys.id,
        environmentId: environment.sys.id,
        appDefinitionId: appDefinition.sys.id,
      },
      {
        jwt,
      },
    )

    // Token length not deterministic, but should be within a certain range
    expect(appAccessToken.token.length).toBeGreaterThanOrEqual(285)
    expect(appAccessToken.token.length).toBeLessThanOrEqual(300)
  })
})
