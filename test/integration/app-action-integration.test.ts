import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import type { AppActionProps, PlainClientAPI } from '../../lib/contentful-management'
import {
  initPlainClient,
  getTestOrganization,
  getDefaultSpace,
  createAppInstallation,
  timeoutToCalmRateLimiting,
} from '../helpers'
import { afterEach } from 'node:test'

describe('AppAction api', function () {
  let appDefinition
  let client: PlainClientAPI
  let organization
  let space
  let appAction: AppActionProps

  beforeAll(async () => {
    organization = await getTestOrganization()
    space = await getDefaultSpace()

    appDefinition = await organization.createAppDefinition({
      name: 'Test AppAction',
    })

    client = initPlainClient({
      spaceId: space.sys.id,
      environmentId: 'master',
    })
  })

  // App actions need some extra timeouts
  afterEach(timeoutToCalmRateLimiting)

  afterAll(async () => {
    if (appDefinition) {
      await client.appInstallation.delete({ appDefinitionId: appDefinition.sys.id })
      await appDefinition.delete()
    }
  })

  test('createAppAction', { sequential: true }, async () => {
    appAction = await client.appAction.create(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      {
        category: 'Custom',
        name: 'my test action',
        url: 'https://www.somewhere.com',
        parameters: [],
      },
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

  test('listAppActionInEnv', async () => {
    appAction = await client.appAction.create(
      { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
      {
        category: 'Custom',
        name: 'my test action',
        url: 'https://www.somewhere.com',
        parameters: [],
      },
    )

    await createAppInstallation(appDefinition.sys.id)

    const actions = await client.appAction.getManyForEnvironment({
      spaceId: space.sys.id,
    })

    expect(actions.items.length).equals(1)
    const action = actions.items[0]

    expect(action.name).equals('my test action', 'name')
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
        category: 'Custom',
        name: 'my test action',
        url: 'https://www.somewhere.com',
        parameters: [],
      },
    )

    const updated = await client.appAction.update(
      {
        organizationId: organization.sys.id,
        appDefinitionId: appDefinition.sys.id,
        appActionId: appAction.sys.id,
      },
      {
        category: 'Custom',
        name: 'my updated action',
        url: 'https://www.elsewhere.com',
        parameters: [],
      },
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
        category: 'Custom',
        name: 'my test action',
        url: 'https://www.somewhere.com',
        parameters: [],
      },
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
        category: 'Custom',
        name: 'my test action',
        url: 'https://www.somewhere.com',
        parameters: [],
      },
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
