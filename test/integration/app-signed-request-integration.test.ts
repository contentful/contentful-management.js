import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import { initPlainClient, getTestOrganization, timeoutToCalmRateLimiting } from '../helpers.js'
import type { PlainClientAPI, Organization, AppDefinition } from '../../lib/index.js'

describe('AppKey api', { sequential: true }, () => {
  let appDefinition: AppDefinition
  let client: PlainClientAPI
  let organization: Organization
  let entityId: { organizationId: string; appDefinitionId: string; fingerprint: string }

  beforeAll(async () => {
    organization = await getTestOrganization()

    appDefinition = await organization.createAppDefinition({
      name: 'Test AppKey',
    })

    entityId = {
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
      fingerprint: 'mocked',
    }

    client = initPlainClient()
  })

  afterAll(async () => {
    if (appDefinition) {
      await appDefinition.delete()
    }
    await timeoutToCalmRateLimiting()
  })

  test('createAppKey', async () => {
    const { sys, generated, jwk } = await client.appKey.create(entityId, { generate: true })
    entityId.fingerprint = sys.id

    expect(jwk.kty).toBe('RSA')
    expect(generated).toHaveProperty('privateKey')

    await client.appKey.delete(entityId)
  })

  test('getAppKey', async () => {
    let key = await client.appKey.create(entityId, { generate: true })
    entityId.fingerprint = key.sys.id

    key = await client.appKey.get(entityId)

    expect(key.jwk.kty).toBe('RSA')
    await client.appKey.delete(entityId)
  })

  test('getAppKeys', async () => {
    const key1 = await client.appKey.create(entityId, { generate: true })
    const key2 = await client.appKey.create(entityId, { generate: true })

    const { items } = await client.appKey.getMany(entityId)

    expect(items).toHaveLength(2)
    await client.appKey.delete({ ...entityId, fingerprint: key1.sys.id })
    await client.appKey.delete({ ...entityId, fingerprint: key2.sys.id })
  })

  test('deleteAppKey', async () => {
    const key = await client.appKey.create(entityId, { generate: true })
    entityId.fingerprint = key.sys.id

    await client.appKey.delete(entityId)

    await expect(client.appKey.get(entityId)).rejects.toThrow('The resource could not be found')
  })
})
