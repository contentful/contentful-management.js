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
      { type: 'endpoint', name: 'my test action', url: 'http://www.somewhere.com' }
    )

    expect(appAction.sys.type).equals('AppAction', 'type')
    expect(appAction.type).equals('endpoint', 'action type')
    expect(appAction.name).equals('my test action', 'name')
    expect(appAction.url).equals('http://www.somewhere.com', 'url')
  })
})
