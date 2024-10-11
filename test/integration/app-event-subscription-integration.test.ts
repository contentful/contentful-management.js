import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import { initPlainClient, getTestOrganization } from '../helpers'
import type { PlainClientAPI, Organization, AppDefinition } from '../../lib/contentful-management'

describe('AppEventSubscription api', { sequential: true }, () => {
  let appDefinition: AppDefinition
  let client: PlainClientAPI
  let organization: Organization
  let entityId: { organizationId: string; appDefinitionId: string }

  const targetUrl = 'https://contentful.fake/event-handler'

  beforeAll(async () => {
    organization = await getTestOrganization()

    appDefinition = await organization.createAppDefinition({
      name: 'Test AppEventSubscription',
    })

    entityId = { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id }

    client = initPlainClient()
  })

  afterAll(async () => {
    if (appDefinition) {
      await appDefinition.delete()
    }
  })

  test('createAppEventSubscription', async () => {
    const eventSubscription = await client.appEventSubscription.upsert(entityId, {
      targetUrl,
      topics: ['Entry.create'],
    })

    expect(eventSubscription.targetUrl).toBe(targetUrl)

    await client.appEventSubscription.delete(entityId)
  })

  test('getAppEventSubscription', async () => {
    await client.appEventSubscription.upsert(entityId, { targetUrl, topics: ['Entry.create'] })
    const eventSubscription = await client.appEventSubscription.get(entityId)

    expect(eventSubscription.targetUrl).toBe(targetUrl)
    await client.appEventSubscription.delete(entityId)
  })

  test('updateAppEventSubscription', async () => {
    const eventSubscription = await client.appEventSubscription.upsert(entityId, {
      targetUrl,
      topics: ['Entry.create'],
    })

    expect(eventSubscription.topics).toEqual(['Entry.create'])

    const updatedEventSubscription = await client.appEventSubscription.upsert(entityId, {
      targetUrl,
      topics: ['Entry.save'],
    })

    expect(updatedEventSubscription.topics).toEqual(['Entry.save'])

    await client.appEventSubscription.delete(entityId)
  })

  test('deleteAppEventSubscription', async () => {
    await client.appEventSubscription.upsert(entityId, { targetUrl, topics: ['Entry.create'] })

    await client.appEventSubscription.delete(entityId)

    await expect(client.appEventSubscription.get(entityId)).rejects.toThrow(
      'The resource could not be found'
    )
  })
})
