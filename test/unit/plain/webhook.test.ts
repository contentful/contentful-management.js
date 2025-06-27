import { describe, test, expect } from 'vitest'
import { createClient } from '../../../lib/index.js'
import setupRestAdapter from '../adapters/REST/helpers/setupRestAdapter.js'

describe('Webhook', () => {
  const spaceId = 'space-id'

  test('getSigningSecret', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: { redactedValue: 'abcd' } })
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.webhook.getSigningSecret({ spaceId })

    expect(response).toBeInstanceOf(Object)
    expect(response.redactedValue).toBe('abcd')

    expect(httpMock.get).toHaveBeenCalledWith(`/spaces/space-id/webhook_settings/signing_secret`, {
      baseURL: 'https://api.contentful.com',
    })
  })

  test('upsertSigningSecret', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: { redactedValue: 'abcd' } })
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })

    const payload = { value: btoa(String(Math.random())).substring(0, 32) }
    const response = await plainClient.webhook.upsertSigningSecret({ spaceId }, payload)

    expect(response).toBeInstanceOf(Object)
    expect(response.redactedValue).toBe('abcd')

    expect(httpMock.put).toHaveBeenCalledWith(
      `/spaces/space-id/webhook_settings/signing_secret`,
      payload,
      {
        baseURL: 'https://api.contentful.com',
      }
    )
  })

  test('deleteSigningSecret', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: '' }))
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    await plainClient.webhook.deleteSigningSecret({ spaceId })

    expect(httpMock.delete).toHaveBeenCalledWith(
      `/spaces/space-id/webhook_settings/signing_secret`,
      {
        baseURL: 'https://api.contentful.com',
      }
    )
  })

  test('getRetryPolicy', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: { maxRetries: 15 } })
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.webhook.getRetryPolicy({ spaceId })

    expect(response).toBeInstanceOf(Object)
    expect(response.maxRetries).toBe(15)

    expect(httpMock.get).toHaveBeenCalledWith(`/spaces/space-id/webhook_settings/retry_policy`, {
      baseURL: 'https://api.contentful.com',
    })
  })

  test('upsertRetryPolicy', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: { maxRetries: 15 } })
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })

    const payload = { maxRetries: 15 }
    const response = await plainClient.webhook.upsertRetryPolicy({ spaceId }, payload)

    expect(response).toBeInstanceOf(Object)
    expect(response.maxRetries).toBe(15)

    expect(httpMock.put).toHaveBeenCalledWith(
      `/spaces/space-id/webhook_settings/retry_policy`,
      payload,
      {
        baseURL: 'https://api.contentful.com',
      }
    )
  })

  test('deleteRetryPolicy', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: '' }))
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    await plainClient.webhook.deleteRetryPolicy({ spaceId })

    expect(httpMock.delete).toHaveBeenCalledWith(`/spaces/space-id/webhook_settings/retry_policy`, {
      baseURL: 'https://api.contentful.com',
    })
  })
})
