import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import {
  createTestSpace,
  defaultClient,
  timeoutToCalmRateLimiting,
  getTestOrganization,
} from '../helpers'
import type { Organization, Space } from '../../lib/contentful-management'

describe('VectorizationStatus api', () => {
  let organization: Organization
  let space: Space

  beforeAll(async () => {
    organization = await getTestOrganization()
    space = await createTestSpace(defaultClient, 'VectorizationStatus')
  })

  afterAll(async () => {
    if (space) {
      return space.delete()
    }
    await timeoutToCalmRateLimiting()
  })

  test('Correctly updates and fetches vectorization status', async () => {
    const enabledResponse = await organization.updateVectorizationStatus([
      { spaceId: space.sys.id, enabled: true },
    ])
    expect(enabledResponse.items).toHaveLength(1)
    expect(enabledResponse.items[0].sys.space.sys.id).toBe(space.sys.id)
    expect(enabledResponse.items[0].sys.status).toBe('ENABLED')

    const statusResponse = await organization.getVectorizationStatus()
    expect(statusResponse.items).toHaveLength(1)
    expect(statusResponse.items[0].sys.space.sys.id).toBe(space.sys.id)
    expect(statusResponse.items[0].sys.status).toBe('ENABLED')

    const disabledResponse = await organization.updateVectorizationStatus([
      { spaceId: space.sys.id, enabled: false },
    ])
    expect(disabledResponse.items).toHaveLength(1)
    expect(disabledResponse.items[0].sys.space.sys.id).toBe(space.sys.id)
    expect(disabledResponse.items[0].sys.status).toBe('DISABLED')
  })
})
