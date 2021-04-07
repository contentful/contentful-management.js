import { expect } from 'chai'
import { before, describe, test, after } from 'mocha'
import { client } from '../helpers'

describe('AppDefinition api', function () {
  let organization

  before(async () => {
    organization = await client()
      .getOrganizations()
      .then((response) => response.items[0])
  })

  after(async () => {
    const { items: appDefinitions } = await organization.getAppDefinitions()
    for (const appDefinition of appDefinitions) {
      await appDefinition.delete()
    }
  })

  test('createAppDefinition', async () => {
    const appDefinition = await organization.createAppDefinition({
      name: 'Test App',
      src: 'http://localhost:3000',
      locations: [
        {
          location: 'app-config',
        },
      ],
    })

    expect(appDefinition.sys.type).equals('AppDefinition', 'type')
    expect(appDefinition.name).equals('Test App', 'name')

    await appDefinition.delete()
  })

  test('getAppDefintion', async () => {
    const appDefinition = await organization.createAppDefinition({
      name: 'Test App',
      src: 'http://localhost:3000',
      locations: [
        {
          location: 'app-config',
        },
      ],
    })

    const fetchedAppDefinition = await organization.getAppDefinition(appDefinition.sys.id)

    expect(appDefinition.sys.id).equals(fetchedAppDefinition.sys.id)

    await appDefinition.delete()
  })

  test('getAppDefinitions', async () => {
    const appDefinitions = await organization.getAppDefinitions()

    expect(appDefinitions.items).to.be.an('array')
    expect(appDefinitions.sys.type).equals('Array', 'type')
  })

  test('delete', async () => {
    const appDefinition = await organization.createAppDefinition({
      name: 'Test App',
      src: 'http://localhost:3000',
      locations: [
        {
          location: 'app-config',
        },
      ],
    })

    await appDefinition.delete()

    await expect(organization.getAppDefinition(appDefinition.sys.id)).to.be.rejectedWith(
      'The resource could not be found'
    )
  })

  test('update', async () => {
    const appDefinition = await organization.createAppDefinition({
      name: 'Test App',
      src: 'http://localhost:3000',
      locations: [
        {
          location: 'app-config',
        },
      ],
    })

    appDefinition.name = 'Test App Updated'

    await appDefinition.update()

    expect(appDefinition.name).equals('Test App Updated', 'name')

    await appDefinition.delete()
  })
})
