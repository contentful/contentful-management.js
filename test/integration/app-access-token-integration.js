import { expect } from 'chai'
import { before, after, describe, test } from 'mocha'
import {
  initPlainClient,
  getDefaultSpace,
  createAppInstallation,
  getTestOrganization,
} from '../helpers'
import { sign } from 'jsonwebtoken'

describe('AppAccessToken api', function () {
  let organization
  let appDefinition
  let appKey
  let client
  let space
  let environment
  let entityId
  let jwt

  before(async () => {
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

    client = initPlainClient()

    appKey = await client.appKey.create(entityId, { generate: true })

    const signOptions = { algorithm: 'RS256', issuer: appDefinition.sys.id, expiresIn: '10m' }
    jwt = sign({}, appKey.generated.privateKey, signOptions)
  })

  after(async () => {
    if (appDefinition) {
      if (appKey) {
        await client.appKey.delete({
          ...entityId,
          fingerprint: appKey.sys.id,
        })
      }
      await appDefinition.delete()
    }
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
      }
    )

    expect(appAccessToken.token).to.have.lengthOf(292)
  })
})
