import { after, before, describe, test } from 'mocha'
import { client, createTestSpace } from '../helpers'
import { expect } from 'chai'

// Skipping the while suite for now to not create unused spaces.
describe.skip('TeamSpaceMembership Api', function () {
  let space

  before(async () => {
    space = await createTestSpace(client(), 'TSM')
  })

  after(async () => {
    if (space) {
      return space.delete()
    }
  })

  /*
  TODO: To make this test work, we first need to put the space in the required state.
  - create a team, receive id, and use this id for this test.
  - pull role id's dynamically from roles.
   */
  test.skip('Create, update and delete teamSpaceMembership', async () => {
    return space
      .createTeamSpaceMembership('5vllqmpyrhlgaz0xb2S90C', {
        admin: false,
        roles: [
          {
            sys: {
              type: 'Link',
              linkType: 'Role',
              id: '6YFO0dKMUjeXB5OPoWnoNm', // role developer
            },
          },
        ],
      })
      .then((response) => space.getTeamSpaceMembership(response.sys.id))
      .then((teamMembership) => {
        teamMembership.roles = [
          {
            sys: {
              type: 'Link',
              linkType: 'Role',
              id: '6YFc9mw7PREXh5FQ1lKSN6', // change role to author
            },
          },
        ]
        teamMembership.update()
        return teamMembership
      })
      .then((teamMembership) => {
        expect(teamMembership.sys.type).equals('TeamSpaceMembership', 'type')
        expect(teamMembership.sys.team, 'team').ok
        expect(teamMembership.roles, 'roles').ok
        return space.getTeamSpaceMembership(teamMembership.sys.id)
      })
      .then((membership) => {
        // delete team space membership
        membership.delete()
      })
  })
})
