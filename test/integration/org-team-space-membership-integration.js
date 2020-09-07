import { before, describe, test } from 'mocha'
import { client } from '../helpers'
import { expect } from 'chai'

describe('TeamSpaceMembership Api', function () {
  this.timeout(60000)

  let organization

  before(async () => {
    organization = await client()
      .getOrganizations()
      .then((response) => response.items[0])
  })

  test('Get a single Team Space Membership', async () => {
    // create space membership for existing team
    return organization.getTeamSpaceMembership('6KPB2kockewetUV71cryiw').then((response) => {
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
    return organization
      .getTeamSpaceMemberships({ teamId: '6mjkr732nwCxRTDuh2vWHn' })
      .then((response) => {
        expect(response.sys, 'sys').ok
        expect(response.items, 'items').ok
        expect(response.items[0].sys.type).equals('TeamSpaceMembership')
      })
  })
})
