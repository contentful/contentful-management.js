import { expect } from 'chai'
import { before, after, describe, test } from 'mocha'
import { AppActionCategory, AppActionProps, PlainClientAPI } from '../../lib/contentful-management'
import { initPlainClient, getTestOrganization } from '../helpers'

describe('AppAction api', function () {
  let appDefinition
  let client: PlainClientAPI
  let organization
  let appAction: AppActionProps

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
      {
        category: 'Custom' as AppActionCategory,
        name: 'my test action',
        url: 'https://www.somewhere.com',
        parameters: [],
      }
    )

    expect(appAction.sys.type).equals('AppAction', 'type')
    expect(appAction.category).equals('Custom', 'app category')
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
      {
        category: 'Custom' as AppActionCategory,
        name: 'my test action',
        url: 'https://www.somewhere.com',
        parameters: [],
      }
    )

    const updated = await client.appAction.update(
      {
        organizationId: organization.sys.id,
        appDefinitionId: appDefinition.sys.id,
        appActionId: appAction.sys.id,
      },
      {
        category: 'Custom' as AppActionCategory,
        name: 'my updated action',
        url: 'https://www.elsewhere.com',
        parameters: [],
      }
    )

    expect(updated.sys.type).equals('AppAction', 'type')
    expect(appAction.category).equals('Custom', 'app category')
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
      {
        category: 'Custom' as AppActionCategory,
        name: 'my test action',
        url: 'https://www.somewhere.com',
        parameters: [],
      }
    )

    const gotAppAction = await client.appAction.get({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
      appActionId: appAction.sys.id,
    })

    expect(gotAppAction.sys.type).equals('AppAction', 'type')
    expect(appAction.category).equals('Custom', 'app category')
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
      {
        category: 'Custom' as AppActionCategory.Custom,
        name: 'my test action',
        url: 'https://www.somewhere.com',
        parameters: [],
      }
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
