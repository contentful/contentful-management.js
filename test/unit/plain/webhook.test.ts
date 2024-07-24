import { describe, test, expect } from 'vitest'
import sinon from 'sinon'
import { createClient } from '../../../lib/contentful-management'
import setupRestAdapter from '../adapters/REST/helpers/setupRestAdapter'
import crypto from 'crypto'

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

    sinon.assert.calledWith(httpMock.get, `/spaces/space-id/webhook_settings/signing_secret`)
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

    sinon.assert.calledWith(
      httpMock.put,
      `/spaces/space-id/webhook_settings/signing_secret`,
      payload
    )
  })

  test('deleteSigningSecret', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: '' }))
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    await plainClient.webhook.deleteSigningSecret({ spaceId })

    sinon.assert.calledWith(httpMock.delete, `/spaces/space-id/webhook_settings/signing_secret`)
  })

  test('getRetryPolicy', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: { maxRetries: 15 } })
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.webhook.getRetryPolicy({ spaceId })

    expect(response).to.be.an('object')
    expect(response.maxRetries).to.equal(15)

    sinon.assert.calledWith(httpMock.get, `/spaces/space-id/webhook_settings/retry_policy`)
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

    sinon.assert.calledWith(httpMock.put, `/spaces/space-id/webhook_settings/retry_policy`, payload)
  })

  test('deleteRetryPolicy', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: '' }))
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    await plainClient.webhook.deleteRetryPolicy({ spaceId })

    sinon.assert.calledWith(httpMock.delete, `/spaces/space-id/webhook_settings/retry_policy`)
  })
})
