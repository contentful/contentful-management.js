import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import { initPlainClient, getTestOrganization } from '../helpers'
import type { PlainClientAPI, Organization, AppDefinition } from '../../lib/contentful-management'

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
  })

  test('createAppKey', async () => {
    const { sys, generated, jwk } = await client.appKey.create(entityId, { generate: true })
    entityId.fingerprint = sys.id

    expect(jwk.kty).toBe('RSA')
    expect(generated).toHaveProperty('privateKey')

    await client.appKey.delete(entityId)
  })

  test('getAppKey', { timeout: 15000 }, async () => {
    let key = await client.appKey.create(entityId, { generate: true })
    entityId.fingerprint = key.sys.id

    key = await client.appKey.get(entityId)

    expect(key.jwk.kty).toBe('RSA')
    await client.appKey.delete(entityId)
  })

  test('getAppKeys', { timeout: 15000 }, async () => {
    const key1 = await client.appKey.create(entityId, { generate: true })
    const key2 = await client.appKey.create(entityId, { generate: true })

    const { items } = await client.appKey.getMany(entityId)

    expect(items).toHaveLength(2)
    await client.appKey.delete({ ...entityId, fingerprint: key1.sys.id })
    await client.appKey.delete({ ...entityId, fingerprint: key2.sys.id })
  })

  test('deleteAppKey', { timeout: 15000 }, async () => {
    const key = await client.appKey.create(entityId, { generate: true })
    entityId.fingerprint = key.sys.id

    await client.appKey.delete(entityId)

    await expect(client.appKey.get(entityId)).rejects.toThrow('The resource could not be found')
  })
})
