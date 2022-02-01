import { expect } from 'chai'
import { before, after, describe, test } from 'mocha'
import {
  initClient,
  initPlainClient,
  createTestEnvironment,
  getTestOrganization,
  createTestSpace,
} from '../helpers'

describe('AppAction api', function () {
  let appDefinition
  let client
  let organization
  let appAction

  before(async () => {
    organization = await getTestOrganization()

    appDefinition = await organization.createAppDefinition({
      name: 'Test AppAction',
    })

    client = initPlainClient()
  })

  after(async () => {
    if (appDefinition) {
      await appDefinition.delete()
    }
  })

  test('createAppAction', async () => {
    appAction = await client.appAction.create(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { type: 'endpoint', name: 'my test action', url: 'https://www.somewhere.com' }
    )

    expect(appAction.sys.type).equals('AppAction', 'type')
    expect(appAction.type).equals('endpoint', 'action type')
    expect(appAction.name).equals('my test action', 'name')
    expect(appAction.url).equals('https://www.somewhere.com', 'url')
    await client.appAction.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
      appActionId: appAction.sys.id,
    })
  })

  test('updateAppAction', async () => {
    appAction = await client.appAction.create(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { type: 'endpoint', name: 'my test action', url: 'https://www.somewhere.com' }
    )

    const updated = await client.appAction.update(
      {
        organizationId: organization.sys.id,
        appDefinitionId: appDefinition.sys.id,
        appActionId: appAction.sys.id,
      },
      { type: 'endpoint', name: 'my updated action', url: 'https://www.elsewhere.com' }
    )

    expect(updated.sys.type).equals('AppAction', 'type')
    expect(updated.type).equals('endpoint', 'action type')
    expect(updated.name).equals('my updated action', 'name')
    expect(updated.url).equals('https://www.elsewhere.com', 'url')
    await client.appAction.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
      appActionId: appAction.sys.id,
    })
  })

  test('getAppAction', async () => {
    appAction = await client.appAction.create(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { type: 'endpoint', name: 'my test action', url: 'https://www.somewhere.com' }
    )

    const gotAppAction = await client.appAction.get({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
      appActionId: appAction.sys.id,
    })

    expect(gotAppAction.sys.type).equals('AppAction', 'type')
    expect(gotAppAction.type).equals('endpoint', 'action type')
    expect(gotAppAction.name).equals('my test action', 'name')
    expect(gotAppAction.url).equals('https://www.somewhere.com', 'url')
    await client.appAction.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
      appActionId: appAction.sys.id,
    })
  })

  test('getAppActions', async () => {
    appAction = await client.appAction.create(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      { type: 'endpoint', name: 'my test action', url: 'https://www.somewhere.com' }
    )

    const gotAppActions = await client.appAction.getMany({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })

    expect(gotAppActions.items).to.be.an('array')
    expect(gotAppActions.sys.type).equals('Array', 'type')

    await client.appAction.delete({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
      appActionId: appAction.sys.id,
    })
  })
})
