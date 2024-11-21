import { vi, expect, describe, it } from 'vitest'
import { RestAdapter } from '../../../../lib/adapters/REST/rest-adapter'
import setupRestAdapter from './helpers/setupRestAdapter'

vi.mock('contentful-sdk-core')

describe('Rest Adapter', () => {
  it('throws if no accessToken is defined', () => {
    // @ts-expect-error we skip accessToken parameter to trigger error
    expect(() => new RestAdapter({})).toThrowError('Expected parameter accessToken')
  })

  it('throws if unknown endpoint is called', async () => {
    const { adapterMock } = setupRestAdapter(Promise.resolve)

    await expect(() =>
      adapterMock.makeRequest({
        // @ts-expect-error we pass nothing to trigger unkown endpoint rejection
        entityType: 'nothing',
        action: 'nothing',
        userAgent: 'test-runner',
      })
    ).rejects.toThrowError('Unknown endpoint')
  })
})
