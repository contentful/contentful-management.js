import { expect } from 'chai'
import { before, describe, test, after } from 'mocha'
import {
  createAppDefinition,
  getAppDefinition,
  getTestOrganization,
  createAppInstallation,
} from '../helpers'

describe('AppDefinition api', function () {
  let organization

  before(async () => {
    organization = await getTestOrganization()
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
  })

  test('getAppDefinition (top level)', async () => {
    const { orgId, appId } = await createAppDefinition()
    const appDefinition = await getAppDefinition({ organizationId: orgId, appDefinitionId: appId })

    expect(appDefinition.sys.organization.sys.id).equals(orgId)
    expect(appDefinition.sys.id).equals(appId)
  })

  test('getInstallationsForOrg returns', async () => {
    const { orgId, appId } = await createAppDefinition()
    const appDefinition = await getAppDefinition({ organizationId: orgId, appDefinitionId: appId })
    const installationsForOrg = await appDefinition.getInstallationsForOrg()
    expect(installationsForOrg.sys.type).equals('Array')
  })

  test('getInstallationsForOrg returns installations', async () => {
    const { orgId, appId } = await createAppDefinition()
    const appInstallation = await createAppInstallation(appId)
    const appDefinition = await getAppDefinition({ organizationId: orgId, appDefinitionId: appId })
    const appInstallationsForOrg = await appDefinition.getInstallationsForOrg()

    expect(appInstallationsForOrg.items.length).to.equal(1)
    await appInstallation.delete()
  })
})
