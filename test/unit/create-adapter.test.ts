import { describe, it, expect } from 'vitest'
import type { RestAdapterParams } from '../../lib/adapters/REST/rest-adapter.js'
import { RestAdapter } from '../../lib/adapters/REST/rest-adapter.js'
import { createAdapter } from '../../lib/create-adapter.js'

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
