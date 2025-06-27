import { describe, it, beforeAll, afterAll } from 'vitest'
import { expect } from 'vitest'
import { getDefaultSpace, timeoutToCalmRateLimiting } from '../helpers.js'
import { TestDefaults } from '../defaults.js'
import type { Space } from '../../lib/export-types.js'

const { spaceId, userId } = TestDefaults

describe('SpaceMember API', () => {
  let space: Space

  beforeAll(async () => {
    space = await getDefaultSpace()
  })

  afterAll(timeoutToCalmRateLimiting)

  it('Gets space members', async () => {
    const response = await space.getSpaceMembers()

    expect(response.sys).toBeTruthy()
    expect(response.sys.type).toBe('Array')
    expect(response.items).toBeTruthy()
    expect(response.items[0].sys.type).toBe('SpaceMember')
  })

  it('Gets space member by userId', async () => {
    const response = await space.getSpaceMember(userId)

    expect(response.sys).toBeTruthy()
    expect(response.sys.type).toBe('SpaceMember')
    expect(response.sys.id).toBe(`${spaceId}-${userId}`)
  })
})
