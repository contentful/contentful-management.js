import { afterAll, describe, it, expect, beforeAll } from 'vitest'
import { getDefaultSpace, initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { ScopeValues } from '../../lib/entities/oauth-application'
import type { PlainClientAPI, Space, Environment } from '../../lib/export-types'

const { userId } = TestDefaults

describe('OAuth Application API', function () {
  let plainClient: PlainClientAPI
  let space: Space
  let environment: Environment
  let oauthApplicationId: string

  beforeAll(async () => {
    space = await getDefaultSpace()
    environment = await space.getEnvironment('master')
    plainClient = initPlainClient({
      spaceId: space.sys.id,
      environmentId: environment.sys.id,
    })
  })

  afterAll(async () => {
    if (oauthApplicationId) {
      await plainClient.oauthApplication.delete({
        userId,
        oauthApplicationId,
      })
    }

    await timeoutToCalmRateLimiting()
  })

  it('creates a new oauth application', async () => {
    const response = await plainClient.oauthApplication.create(
      {
        userId,
      },
      {
        name: 'Test-Name',
        description: 'Test-Desc',
        scopes: [ScopeValues.Read],
        redirectUri: 'https://redirect.uri.com',
        confidential: true,
      }
    )

    expect(response.sys).toBeTruthy()
    expect(response.sys.type).toBe('OAuthApplication')
    expect(response.name).toBe('Test-Name')
    oauthApplicationId = response.sys.id
  })

  it('gets a specific oauth application', async () => {
    const response = await plainClient.oauthApplication.get({
      userId,
      oauthApplicationId,
    })

    expect(response.sys).toBeTruthy()
    expect(response.sys.id).toBe(oauthApplicationId)
    expect(response.sys.type).toBe('OAuthApplication')
  })

  // it('gets list of oauth applications', async () => {
  //   const response = await plainClient.oauthApplication.getManyForUser({
  //     userId,
  //     query: {
  //       limit: 10,
  //     },
  //   })

  //   expect(response.sys).toBeTruthy()
  //   expect(response.items).toBeTruthy()
  //   expect(response.items[0].sys.type).toBe('OAuthApplication')
  // })

  // it('updates an oauth application', async () => {
  //   const response = await plainClient.oauthApplication.update(
  //     {
  //       userId,
  //       oauthApplicationId,
  //     },
  //     {
  //       name: 'Upated-Name',
  //       confidential: false,
  //     }
  //   )

  //   expect(response.sys).toBeTruthy()
  //   expect(response.sys.type).toBe('OAuthApplication')
  //   expect(response.name).toBe('Upated-Name')
  // })

  // it('deletes an oauth application', async () => {
  //   const response = await plainClient.oauthApplication.delete({
  //     userId,
  //     oauthApplicationId,
  //   })

  //   expect(response).toBe(undefined)
  // })
})
