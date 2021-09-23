import { expect } from 'chai'
import { before, after, describe, test } from 'mocha'
import { initPlainClient, getTestOrganization } from '../helpers'

describe('AppDetails api', function () {
  let appDefinition
  let client
  let organization
  const imageOne = {
    value: 'some image in base 64',
    type: 'base64',
  }
  const imageTwo = {
    value: 'some other image in base 64',
    type: 'base64',
  }

  before(async () => {
    organization = await getTestOrganization()

    appDefinition = await organization.createAppDefinition({
      name: 'Test AppDetails',
    })

    client = initPlainClient()
  })

  after(async () => {
    if (appDefinition) {
      await appDefinition.delete()
    }
  })

  test('createAppDetails', async () => {
    const details = await client.appDetails.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { icon: imageOne }
    )

    expect(details.icon).equals(imageOne)

    await client.appDetails.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })
  })

  test('getAppDetails', async () => {
    await client.appDetails.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { icon: imageOne }
    )
    const details = await client.appDetails.get({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })

    expect(details.icon).equals(imageOne)
    await client.appDetails.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })
  })

  test('updateAppDetails', async () => {
    const details = await client.appDetails.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { icon: imageOne }
    )

    expect(details.icon).equals(imageOne)

    const updatedDetails = await client.appDetails.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { icon: imageTwo }
    )

    expect(updatedDetails.icon).equals(imageTwo)

    await client.appDetails.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })
  })

  test('deleteAppDetails', async () => {
    await client.appDetails.upsert(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { icon: imageOne }
    )

    await client.appDetails.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })

    await expect(
      client.appDetails.get({
        organizationId: organization.sys.id,
        appDefinitionId: appDefinition.sys.id,
      })
    ).to.be.rejectedWith('The resource could not be found')
  })
})
