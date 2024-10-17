import { describe, it, beforeAll, afterAll } from 'vitest'
import { expect } from 'vitest'
import { initClient, createTestSpace, generateRandomId } from '../helpers'
import { TestDefaults } from '../defaults'
import type { Space } from '../../lib/export-types'

const { userEmail } = TestDefaults

describe('SpaceMembership API', () => {
  let space: Space

  beforeAll(async () => {
    space = await createTestSpace(initClient(), 'SMembership')
  })

  afterAll(async () => {
    if (space) {
      await space.delete()
    }
  })

  it('Gets space memberships', async () => {
    const response = await space.getSpaceMemberships()

    expect(response.sys).toBeTruthy()
    expect(response.items).toBeTruthy()
  })

  it('Creates space membership', async () => {
    const roles = await space.getRoles()
    const roleId = roles.items[0].sys.id
    const spaceMembership = await space.createSpaceMembership({
      admin: false,
      email: userEmail,
      roles: [
        {
          sys: {
            type: 'Link',
            linkType: 'Role',
            id: roleId,
          },
        },
      ],
    })

    expect(spaceMembership.user).toBeTruthy()
    expect(spaceMembership.admin).toBeFalsy()
    expect(spaceMembership.sys.type).toBe('SpaceMembership')

    await spaceMembership.delete()
  })

  it('Creates space membership with explicit id', async () => {
    const id = generateRandomId('spaceMembership')
    const roles = await space.getRoles()
    const roleId = roles.items[0].sys.id
    const spaceMembership = await space.createSpaceMembershipWithId(id, {
      admin: false,
      email: userEmail,
      roles: [
        {
          sys: {
            type: 'Link',
            linkType: 'Role',
            id: roleId,
          },
        },
      ],
    })

    expect(spaceMembership.sys.type).toBe('SpaceMembership')
    expect(spaceMembership.user).toBeTruthy()
    expect(spaceMembership.admin).toBeFalsy()
    expect(spaceMembership.sys.id).toBe(id)

    await spaceMembership.delete()
  })
})
