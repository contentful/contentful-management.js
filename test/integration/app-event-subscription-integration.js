import { expect } from 'chai'
import { before, after, describe, test } from 'mocha'
import { initPlainClient, getTestOrganization } from '../helpers'

describe('AppEventSubscription api', function () {
  let appDefinition
  let client
  let organization
  let entityId

  let targetUrl = 'https://contentful.fake/event-handler'

  before(async () => {
    organization = await getTestOrganization()

    appDefinition = await organization.createAppDefinition({
      name: 'Test AppEventSubscription',
    })

    entityId = { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id }

    client = initPlainClient()
  })

  after(async () => {
    if (appDefinition) {
      await appDefinition.delete()
    }
  })

  test('createAppEventSubscription', async () => {
    const eventSubscription = await client.appEventSubscription.upsert(entityId, {
      targetUrl,
      topics: ['Entry.create'],
    })

    expect(eventSubscription.targetUrl).equals(targetUrl)

    await client.appEventSubscription.delete(entityId)
  })

  test('getAppEventSubscription', async () => {
    await client.appEventSubscription.upsert(entityId, { targetUrl, topics: ['Entry.create'] })
    const eventSubscription = await client.appEventSubscription.get(entityId)

    expect(eventSubscription.targetUrl).equals(targetUrl)
    await client.appEventSubscription.delete(entityId)
  })

  test('updateAppEventSubscription', async () => {
    const eventSubscription = await client.appEventSubscription.upsert(entityId, {
      targetUrl,
      topics: ['Entry.create'],
    })

    expect(eventSubscription.topics).deep.equals(['Entry.create'])

    const updatedEventSubscription = await client.appEventSubscription.upsert(entityId, {
      targetUrl,
      topics: ['Entry.save'],
    })

    expect(updatedEventSubscription.topics).deep.equals(['Entry.save'])

    await client.appEventSubscription.delete(entityId)
  })

  test('deleteAppEventSubscription', async () => {
    await client.appEventSubscription.upsert(entityId, { targetUrl, topics: ['Entry.create'] })

    await client.appEventSubscription.delete(entityId)

    await expect(client.appEventSubscription.get(entityId)).to.be.rejectedWith(
      'The resource could not be found'
    )
  })
})
