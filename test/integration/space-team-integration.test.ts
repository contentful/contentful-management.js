import { describe, it, beforeAll, afterAll } from 'vitest'
import { expect } from 'vitest'
import { getDefaultSpace, timeoutToCalmRateLimiting } from '../helpers'
import type { Space } from '../../lib/export-types'

describe('SpaceTeam API', () => {
  let space: Space

  beforeAll(async () => {
    space = await getDefaultSpace()
  })

  afterAll(timeoutToCalmRateLimiting)

  it('Gets teams for space', async () => {
    const response = await space.getTeams()

    expect(response.sys).toBeTruthy()
    expect(response.sys.type).toBe('Array')
    expect(response.items).toBeTruthy()
    expect(response.items[0].sys.type).toBe('Team')
  })
})
