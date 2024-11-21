import { describe, it, beforeAll, afterAll } from 'vitest'
import { expect } from 'vitest'
import { getDefaultSpace, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import type { Space } from '../../lib/export-types'

const { userId } = TestDefaults

describe('SpaceUser API', () => {
  let space: Space

  beforeAll(async () => {
    space = await getDefaultSpace()
  })

  afterAll(timeoutToCalmRateLimiting)

  it('Gets users', async () => {
    const response = await space.getSpaceUsers()

    expect(response.sys).toBeTruthy()
    expect(response.items).toBeTruthy()
    expect(response.items[0].sys.type).toBe('User')
  })

  it('Gets user by id', async () => {
    const response = await space.getSpaceUser(userId)

    expect(response.sys).toBeTruthy()
    expect(response.sys.id).toBe(userId)
    expect(response.sys.type).toBe('User')
  })
})
