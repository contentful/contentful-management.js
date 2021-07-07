import { before, describe, test } from 'mocha'
import { initClient } from '../helpers'
import { expect } from 'chai'
import { TestDefaults } from '../defaults'

const { teamId, teamMembershipId, organizationMembershipId2 } = TestDefaults

describe('TeamMembership Api', function () {
  let organization

  before(async () => {
    const organizations = await initClient().getOrganizations()
    organization = organizations.items[0]
  })

  test('Gets teamMemberships for team', async () => {
    return organization.getTeamMemberships({ teamId }).then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.items, 'items').ok
      expect(response.items[0].sys.type).equals('TeamMembership')
    })
  })

  test('Gets one teamMembership', async () => {
    return organization.getTeamMembership(teamId, teamMembershipId).then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.sys.id).equals(teamMembershipId)
      expect(response.sys.type).equals('TeamMembership')
    })
  })

  test('Create, update and delete teamMembership', async () => {
    return organization
      .createTeamMembership(teamId, {
        admin: true,
        organizationMembershipId: organizationMembershipId2,
      })
      .then(async (teamMembership) => {
        expect(teamMembership.sys, 'sys').ok
        expect(teamMembership.admin).equal(true)
        expect(teamMembership.sys.type).equals('TeamMembership')
        teamMembership.admin = false
        const updatedTeamMembership = await teamMembership.update()
        expect(updatedTeamMembership.sys, 'sys').ok
        expect(updatedTeamMembership.admin).equals(false)
        expect(updatedTeamMembership.sys.type).equals('TeamMembership')
        await updatedTeamMembership.delete()
      })
  })

  test('Gets teamMemberships for organization', async () => {
    return organization.getTeamMemberships().then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.items, 'items').ok
      expect(response.items[0].sys.type).equals('TeamMembership')
    })
  })

  test('Gets teamMemberships for organization with query', async () => {
    return organization.getTeamMemberships({ query: { limit: 1 } }).then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.items, 'items').ok
      expect(response.items.length).equals(1)
      expect(response.items[0].sys.type).equals('TeamMembership')
    })
  })
})
