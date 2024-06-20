import { describe, it, expect } from 'vitest'
import { RestAdapter, RestAdapterParams } from '../../lib/adapters/REST/rest-adapter'
import { createAdapter } from '../../lib/create-adapter'

describe('createAdapter', () => {
  it('returns adapter if provided', () => {
    const apiAdapter = new RestAdapter({ accessToken: 'token' } as RestAdapterParams)

    const createdAdapter = createAdapter({
      apiAdapter,
    })

    expect(createdAdapter).toBe(apiAdapter)
  })

  describe('creates RestAdapter', () => {
    it('if no apiAdapter is provided', () => {
      const createdAdapter = createAdapter({ accessToken: 'token' })
      expect(createdAdapter).toBeInstanceOf(RestAdapter)
    })
  })
})
