import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { defaultClient, createTestSpace, timeoutToCalmRateLimiting } from '../helpers.js'
import type { Space } from '../../lib/export-types.js'
import type { WebhookRetryPolicyProps } from '../../lib/entities/webhook.js'

describe('Webhook API', () => {
  let space: Space

  beforeAll(async () => {
    space = await createTestSpace(defaultClient, 'Webhook')
  })

  afterAll(async () => {
    if (space) {
      await space.delete()
    }

    await timeoutToCalmRateLimiting()
  })

  it('Gets webhooks', async () => {
    const response = await space.getWebhooks()
    expect(response.sys).toBeTruthy()
    expect(response.items).toBeTruthy()
  })

  it('Creates, updates, and deletes webhook', async () => {
    const webhook = await space.createWebhook({
      name: 'testname',
      url: 'https://example.com',
      topics: ['Entry.publish'],
    })

    expect(webhook.name).toBe('testname')
    expect(webhook.url).toBeTruthy()

    webhook.name = 'updatedname'
    const updatedWebhook = await webhook.update()

    expect(updatedWebhook.name).toBe('updatedname')

    await updatedWebhook.delete()
  })

  it('Creates and deletes disabled webhook', async () => {
    const webhook = await space.createWebhook({
      name: 'testname',
      url: 'https://example.com',
      topics: ['Entry.publish'],
      active: false,
    })

    expect(webhook.active).toBe(false)
    expect(webhook.url).toBeTruthy()

    webhook.active = true
    const updatedWebhook = await webhook.update()

    expect(updatedWebhook.active).toBe(true)

    await updatedWebhook.delete()
  })

  it('Creates, gets, checks calls, and deletes webhook with ID', async () => {
    const id = 'webhook-id'
    const webhook = await space.createWebhookWithId(id, {
      name: 'testwebhook',
      url: 'https://example.com',
      topics: ['Entry.publish'],
    })

    expect(webhook.sys.id).toBe(id)

    const calls = await webhook.getCalls()
    expect(calls.items).toBeTruthy()

    const health = await webhook.getHealth()
    expect(health.calls).toBeTruthy()

    await webhook.delete()
  })

  // TODO: enable (and debug) these tests once this is not in EAP and feature flagged since space IDs are not stable
  describe.skip('TODO: Webhook retry policies', () => {
    let retryPolicy: WebhookRetryPolicyProps

    describe('given no webhook retry policy', () => {
      it('Gets webhook retry policy', async () => {
        const retryPolicy = await space.getWebhookRetryPolicy()
        expect(retryPolicy).toBeUndefined()
      })
    })

    describe('given a webhook retry policy', () => {
      beforeAll(async () => {
        retryPolicy = await space.upsertWebhookRetryPolicy({
          maxRetries: 15,
        })
      })

      it('Gets webhook retry policy', async () => {
        const policy = await space.getWebhookRetryPolicy()
        expect(policy.maxRetries).toBe(retryPolicy.maxRetries)
      })
    })

    it('Upserts webhook retry policy', async () => {
      await space.upsertWebhookRetryPolicy({
        maxRetries: 15,
      })

      const policy = await space.upsertWebhookRetryPolicy({
        maxRetries: 19,
      })

      expect(policy.maxRetries).toBe(19)
    })

    it('Deletes webhook retry policy', async () => {
      await space.deleteWebhookRetryPolicy()

      const retryPolicy = await space.getWebhookRetryPolicy()
      expect(retryPolicy).toBeUndefined()
    })
  })
})
