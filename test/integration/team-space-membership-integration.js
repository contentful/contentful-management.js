import { after, before, describe, test } from 'mocha'
import { client, createTestSpace } from '../helpers'
import { expect } from 'chai'

describe('TeamSpaceMembership api', function () {
  let space

  before(async () => {
    space = await createTestSpace(client(), 'TSM')
  })

  after(async () => {
    return space.delete()
  })

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
