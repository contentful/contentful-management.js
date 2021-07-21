import { after, before, describe, test } from 'mocha'
import { expect } from 'chai'
import { initClient, createTestSpace } from '../helpers'
import { TestDefaults } from '../defaults'

const { teamId } = TestDefaults

describe('TeamSpaceMembership Api', function () {
  let space

  before(async () => {
    space = await createTestSpace(initClient(), 'TSM')
  })

  after(async () => {
    if (space) {
      return space.delete()
    }
  })

  test('Create, update and delete teamSpaceMembership', async () => {
    const roles = await space.getRoles()
    const roleIds = roles.items.map(({ sys: { id } }) => id)
    const initialRole = {
      sys: {
        type: 'Link',
        linkType: 'Role',
        id: roleIds[0],
      },
    }
    const updatedRole = {
      sys: {
        type: 'Link',
        linkType: 'Role',
        id: roleIds[1],
      },
    }
    return space
      .createTeamSpaceMembership(teamId, {
        admin: false,
        roles: [initialRole],
      })
      .then((teamMembership) => {
        expect(teamMembership.sys.type).equals('TeamSpaceMembership', 'type')
        expect(teamMembership.sys.team, 'team').ok
        expect(teamMembership.roles).to.deep.equal([initialRole], 'roles')
        return space.getTeamSpaceMembership(teamMembership.sys.id)
      })
      .then((teamMembership) => {
        teamMembership.roles = [updatedRole]
        teamMembership.update()
        return teamMembership
      })
      .then((teamMembership) => {
        expect(teamMembership.sys.type).equals('TeamSpaceMembership', 'type')
        expect(teamMembership.sys.team, 'team').ok
        expect(teamMembership.roles).to.deep.equal([updatedRole], 'roles')
        return space.getTeamSpaceMembership(teamMembership.sys.id)
      })
      .then((membership) => {
        return membership.delete()
      })
      .then(() => {
        space.delete()
        space = null
      })
  })
})
