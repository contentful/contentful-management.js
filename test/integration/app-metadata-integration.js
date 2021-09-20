import { expect } from 'chai'
import { before, after, describe, test } from 'mocha'
import { initPlainClient, getTestOrganization } from '../helpers'

describe('AppMetadata api', function () {
  let appDefinition
  let client
  let organization
  const imageOne = 'some image in base 64'
  const imageTwo = 'some other image in base 64'

  before(async () => {
    organization = await getTestOrganization()

    appDefinition = await organization.createAppDefinition({
      name: 'Test AppMetadata',
    })

    client = initPlainClient()
  })

  after(async () => {
    if (appDefinition) {
      await appDefinition.delete()
    }
  })

  test('createAppMetadata', async () => {
    const metadata = await client.appMetadata.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { icon: imageOne }
    )

    expect(metadata.icon).equals(imageOne)

    await client.appMetadata.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })
  })

  test('getAppMetadata', async () => {
    await client.appMetadata.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { icon: imageOne }
    )
    const metadata = await client.appMetadata.get({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })

    expect(metadata.icon).equals(imageOne)
    await client.appMetadata.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })
  })

  test('updateAppMetadata', async () => {
    const metadata = await client.appMetadata.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { icon: imageOne }
    )

    expect(metadata.icon).equals(imageOne)

    const updatedMetadata = await client.appMetadata.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { icon: imageTwo }
    )

    expect(updatedMetadata.icon).equals(imageTwo)

    await client.appMetadata.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })
  })

  test('deleteAppMetadata', async () => {
    await client.appMetadata.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { icon: imageOne }
    )

    await client.appMetadata.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })

    await expect(
      client.appMetadata.get({
        organizationId: organization.sys.id,
        appDefinitionId: appDefinition.sys.id,
      })
    ).to.be.rejectedWith('The resource could not be found')
  })
})
