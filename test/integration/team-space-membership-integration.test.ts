import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initClient, createTestSpace } from '../helpers'
import { TestDefaults } from '../defaults'
import type { Space, Link } from '../../lib/export-types'

const { teamId } = TestDefaults

describe('TeamSpaceMembership API', () => {
  let space: Space | null

  beforeAll(async () => {
    space = await createTestSpace(initClient(), 'TSM')
  })

  afterAll(async () => {
    if (space) {
      await space.delete()
      space = null
    }
  })

  it('Creates, updates, and deletes teamSpaceMembership', async () => {
    if (!space) return

    const roles = await space.getRoles()
    const roleIds = roles.items.map(({ sys: { id } }) => id)

    const initialRole: Link<'Role'> = {
      sys: {
        type: 'Link',
        linkType: 'Role',
        id: roleIds[0],
      },
    }

    const updatedRole: Link<'Role'> = {
      sys: {
        type: 'Link',
        linkType: 'Role',
        id: roleIds[1],
      },
    }

    // Create TeamSpaceMembership
    const teamMembership = await space.createTeamSpaceMembership(teamId, {
      admin: false,
      roles: [initialRole],
    })

    expect(teamMembership.sys.type).toBe('TeamSpaceMembership')
    expect(teamMembership.sys.team).toBeTruthy()
    expect(teamMembership.roles).toEqual([initialRole])

    // Fetch and update TeamSpaceMembership
    const fetchedMembership = await space.getTeamSpaceMembership(teamMembership.sys.id)
    fetchedMembership.roles = [updatedRole]
    await fetchedMembership.update()

    expect(fetchedMembership.sys.type).toBe('TeamSpaceMembership')
    expect(fetchedMembership.sys.team).toBeTruthy()
    expect(fetchedMembership.roles).toEqual([updatedRole])

    // Delete TeamSpaceMembership
    await fetchedMembership.delete()
  })
})
