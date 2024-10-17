import { describe, it, beforeAll } from 'vitest'
import { expect } from 'vitest'
import { getDefaultSpace } from '../helpers'
import { TestDefaults } from '../defaults'
import type { Space } from '../../lib/export-types'

const { spaceId, userId } = TestDefaults

describe('SpaceMember API', () => {
  let space: Space

  beforeAll(async () => {
    space = await getDefaultSpace()
  })

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
