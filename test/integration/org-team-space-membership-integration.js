import { before, describe, test } from 'mocha'
import { initClient } from '../helpers'
import { TestDefaults } from '../defaults'
import { expect } from 'chai'

const { teamId, teamSpaceMembershipId } = TestDefaults

describe('TeamSpaceMembership Api', function () {
  let organization

  before(async () => {
    organization = await initClient()
      .getOrganizations()
      .then((response) => response.items[0])
  })

  test('Get a single Team Space Membership', async () => {
    return organization.getTeamSpaceMembership(teamSpaceMembershipId).then((response) => {
      expect(response.sys.type).equal('TeamSpaceMembership', 'type')
      expect(response.sys.team, 'team').ok
      expect(response.roles, 'roles').ok
    })
  })

  test('Gets all Team Space Memberships in organization', async () => {
    return organization.getTeamSpaceMemberships().then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.items, 'items').ok
      expect(response.items[0].sys.type).equal('TeamSpaceMembership')
    })
  })

  test('Gets all Team Space Memberships in a team', async () => {
    return organization.getTeamSpaceMemberships({ teamId }).then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.items, 'items').ok
      expect(response.items[0].sys.type).equals('TeamSpaceMembership')
    })
  })
})
