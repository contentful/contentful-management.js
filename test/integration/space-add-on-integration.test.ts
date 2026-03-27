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

  it('Updates space add-on allocations', async () => {
    // First, get current add-ons to know what's available
    const currentAddOns = await space.getSpaceAddOns()

    if (currentAddOns.items.length === 0) {
      console.warn('No add-ons available in test space, skipping allocation update test')
      return
    }

    // Pick the first add-on and update its allocation
    const firstAddOn = currentAddOns.items[0]
    const addOnType = firstAddOn.sys.id as 'contentTypes' | 'environments' | 'records'
    const newAllocation = firstAddOn.allocated + 1

    const response = await space.updateSpaceAddOnAllocations([
      {
        add_on: addOnType,
        allocation: newAllocation,
      },
    ])

    expect(response.sys).toBeDefined()
    expect(response.sys.type).toBe('Array')
    expect(response.items).toBeDefined()
    expect(Array.isArray(response.items)).toBe(true)

    // Verify the update was applied
    const updatedAddOn = response.items.find((item) => item.sys.id === addOnType)
    expect(updatedAddOn).toBeDefined()
    expect(updatedAddOn?.allocated).toBe(newAllocation)
  })

  it('Updates multiple space add-on allocations', async () => {
    // Get current add-ons
    const currentAddOns = await space.getSpaceAddOns()

    if (currentAddOns.items.length < 2) {
      console.warn(
        'Not enough add-ons available in test space, skipping multiple allocation update test',
      )
      return
    }

    // Update allocations for multiple add-ons
    const allocations = currentAddOns.items.slice(0, 2).map((addOn) => ({
      add_on: addOn.sys.id as 'contentTypes' | 'environments' | 'records',
      allocation: addOn.allocated + 1,
    }))

    const response = await space.updateSpaceAddOnAllocations(allocations)

    expect(response.sys).toBeDefined()
    expect(response.items).toBeDefined()
    expect(response.items.length).toBeGreaterThanOrEqual(2)

    // Verify all updates were applied
    allocations.forEach((allocation) => {
      const updatedAddOn = response.items.find((item) => item.sys.id === allocation.add_on)
      expect(updatedAddOn).toBeDefined()
      expect(updatedAddOn?.allocated).toBe(allocation.allocation)
    })
  })
})
