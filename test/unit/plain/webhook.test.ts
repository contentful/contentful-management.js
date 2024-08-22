import { vi, describe, test, expect } from 'vitest'
import crypto from 'crypto'
import { createClient } from '../../../lib/contentful-management'
import setupRestAdapter from '../adapters/REST/helpers/setupRestAdapter'

vi.mock('contentful-sdk-core')

describe('Webhook', () => {
  const spaceId = 'space-id'

  test('getSigningSecret', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: { redactedValue: 'abcd' } })
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.webhook.getSigningSecret({ spaceId })

    expect(response).to.be.an('object')
    expect(response.redactedValue).to.equal('abcd')

    expect(httpMock.get).toHaveBeenCalledWith(`/spaces/space-id/webhook_settings/signing_secret`, {
      baseURL: 'https://api.contentful.com',
    })
  })

  test('upsertSigningSecret', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: { redactedValue: 'abcd' } })
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })

    const payload = { value: crypto.randomBytes(32).toString('hex') }
    const response = await plainClient.webhook.upsertSigningSecret({ spaceId }, payload)

    expect(response).to.be.an('object')
    expect(response.redactedValue).to.equal('abcd')

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

    expect(response).to.be.an('object')
    expect(response.maxRetries).to.equal(15)

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

    expect(response).to.be.an('object')
    expect(response.maxRetries).to.equal(15)

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
