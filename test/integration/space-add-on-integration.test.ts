import type { Space } from '../../lib/export-types'
import { defaultClient, createTestSpace, timeoutToCalmRateLimiting } from '../helpers'
import { beforeAll, afterAll, describe, it, expect } from 'vitest'

describe('Space Add-On API', () => {
  let space: Space

  beforeAll(async () => {
    space = await createTestSpace(defaultClient, 'SpaceAddOn')
  })

  afterAll(async () => {
    if (space) {
      await space.delete()
    }

    await timeoutToCalmRateLimiting()
  })

  it('Gets space add-ons', async () => {
    const response = await space.getSpaceAddOns()
    expect(response.sys).toBeDefined()
    expect(response.sys.type).toBe('Array')
    expect(response.items).toBeDefined()
    expect(Array.isArray(response.items)).toBe(true)

    // Verify structure of returned items if any exist
    if (response.items.length > 0) {
      const addOn = response.items[0]
      expect(addOn.sys).toBeDefined()
      expect(addOn.sys.type).toBe('SpaceAddOn')
      expect(addOn.sys.id).toBeDefined()
      expect(addOn.name).toBeDefined()
      expect(typeof addOn.used).toBe('number')
      expect(typeof addOn.allocated).toBe('number')
    }
  })

  it('Gets space add-ons with pagination', async () => {
    const response = await space.getSpaceAddOns({ limit: 1 })
    expect(response.sys).toBeDefined()
    expect(response.items).toBeDefined()
    expect(response.limit).toBe(1)
  })
})
