import { afterAll, describe, it, expect, beforeAll } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import { ScopeValues } from '../../lib/entities/oauth-application'
import type { PlainClientAPI } from '../../lib/export-types'

const { userId, oauthApplicationId } = TestDefaults

describe('OrganizationMembership Api', function () {
  let plainClient: PlainClientAPI
  afterAll(async () => {
    await timeoutToCalmRateLimiting()
  })

  beforeAll(async () => {
    plainClient = initPlainClient()
  })

  it('gets list pf oauth applications', async () => {
    const response = await plainClient.oauthApplication.getManyForUser({
      userId,
      query: {
        limit: 10,
      },
    })

    expect(response.sys).toBeTruthy()
    expect(response.items).toBeTruthy()
    expect(response.items[0].sys.type).toBe('OAuthApplication')
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
  })

  it('updates an oauth application', async () => {
    const response = await plainClient.oauthApplication.update(
      {
        userId,
        oauthApplicationId,
      },
      {
        name: 'Upated-Name',
        confidential: false,
      }
    )

    expect(response.sys).toBeTruthy()
    expect(response.sys.type).toBe('OAuthApplication')
    expect(response.name).toBe('Upated-Name')
  })

  it('deletes an oauth application', async () => {
    const response = await plainClient.oauthApplication.delete({
      userId,
      oauthApplicationId,
    })

    expect(response).toBe(undefined)
  })
})
