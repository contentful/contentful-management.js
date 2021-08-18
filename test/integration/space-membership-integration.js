// To test creating spaceMemberships user has to exist in the organization. Organization membership is produced also within invitation process.
import { initClient, createTestSpace, generateRandomId } from '../helpers'
import { TestDefaults } from '../defaults'

const { userEmail } = TestDefaults

import { after, before, describe, test } from 'mocha'
import { expect } from 'chai'

describe('SpaceMembership Api', function () {
  let space

  before(async () => {
    space = await createTestSpace(initClient(), 'SMembership')
  })

  after(async () => {
    if (space) {
      return space.delete()
    }
  })

  test('Gets spaceMemberships', async () => {
    return space.getSpaceMemberships().then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.items, 'fields').ok
    })
  })

  test('Create spaceMembership', async () => {
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

    expect(spaceMembership.user, 'user').ok
    expect(spaceMembership.admin, 'admin').not.ok
    expect(spaceMembership.sys.type).equal('SpaceMembership', 'type')
    return spaceMembership.delete()
  })

  test('Create spaceMembership with explicit id', async () => {
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
    expect(spaceMembership.sys.type).equal('SpaceMembership', 'type')
    expect(spaceMembership.user, 'user').ok
    expect(spaceMembership.admin, 'admin').not.ok
    expect(spaceMembership.sys.id).equals(id, 'id')
    return spaceMembership.delete()
  })
})
