import { describe, it, beforeAll, expect } from 'vitest'
import { getTestOrganization } from '../helpers'
import { TestDefaults } from '../defaults'
import type { Organization } from '../../lib/export-types'

const { userId } = TestDefaults

describe('User API', () => {
  let organization: Organization

  beforeAll(async () => {
    organization = await getTestOrganization()
  })

  it('Gets organization users', async () => {
    const response = await organization.getUsers()

    expect(response.sys).toBeTruthy()
    expect(response.items).toBeTruthy()
    expect(response.items[0].sys.type).toBe('User')
  })

  it('Gets organization user by ID', async () => {
    const response = await organization.getUser(userId)

    expect(response.sys).toBeTruthy()
    expect(response.sys.id).toBe(userId)
    expect(response.sys.type).toBe('User')
  })
})
