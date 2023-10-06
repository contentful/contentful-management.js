import { expect } from 'chai'
import { before, after, describe, test } from 'mocha'
import { initPlainClient, getTestOrganization } from '../helpers'

describe('AppKey api', function () {
  let appDefinition
  let client
  let organization
  let entityId

  before(async () => {
    organization = await getTestOrganization()

    appDefinition = await organization.createAppDefinition({
      name: 'Test AppKey',
    })

    entityId = { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id }

    client = initPlainClient()
  })

  after(async () => {
    if (appDefinition) {
      await appDefinition.delete()
    }
  })

  test('createAppKey', async () => {
    const key = await client.appKey.create(entityId, { generate: true })
    entityId.fingerprint = key.sys.id

    expect(key.jwk.kty).equals('RSA')

    await client.appKey.delete(entityId)
  })

  test('getAppKey', async () => {
    let key = await client.appKey.create(entityId, { generate: true })
    entityId.fingerprint = key.sys.id

    key = await client.appKey.get(entityId)

    expect(key.jwk.kty).equals('RSA')
    await client.appKey.delete(entityId)
  })

  test('getAppKeys', async () => {
    const key1 = await client.appKey.create(entityId, { generate: true })
    const key2 = await client.appKey.create(entityId, { generate: true })

    const keys = await client.appKey.getMany(entityId)

    expect(keys).to.have.lengthOf(2)
    await client.appKey.delete({ ...entityId, fingerprint: key1.sys.id })
    await client.appKey.delete({ ...entityId, fingerprint: key2.sys.id })
  })

  test('deleteAppKey', async () => {
    const key = await client.appKey.create(entityId, { generate: true })
    entityId.fingerprint = key.sys.id

    await client.appKey.delete(entityId)

    await expect(client.appKey.get(entityId)).to.be.rejectedWith('The resource could not be found')
  })
})
