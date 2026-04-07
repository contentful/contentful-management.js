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

  it('Gets eligible licenses', async () => {
    const response = await space.getEligibleLicenses()
    expect(response.sys).toBeDefined()
    expect(response.sys.type).toBe('Array')
    expect(response.items).toBeDefined()
    expect(Array.isArray(response.items)).toBe(true)

    // Verify structure of returned items if any exist
    if (response.items.length > 0) {
      const license = response.items[0]
      expect(license.id).toBeDefined()
      expect(license.name).toBeDefined()
      expect(license.quotas).toBeDefined()
      expect(license.requiredAddOnAllocation).toBeDefined()
    }
  })

  it('Gets eligible licenses with pagination', async () => {
    const response = await space.getEligibleLicenses({ limit: 5, skip: 0 })
    expect(response.sys).toBeDefined()
    expect(response.items).toBeDefined()
    if (response.limit !== undefined) {
      expect(response.limit).toBeLessThanOrEqual(5)
    }
  })
})
