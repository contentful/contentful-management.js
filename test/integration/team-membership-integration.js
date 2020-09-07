import { before, describe, test } from 'mocha'
import { client } from '../helpers'
import { expect } from 'chai'

describe('TeamMemberships api', function () {
  let organization

  before(async () => {
    const organizations = await client().getOrganizations()
    organization = organizations.items[0]
  })

  test('Gets teamMemberships for team', async () => {
    return organization
      .getTeamMemberships({ teamId: '7pIEx2fMx53SSR1jd7C46M' })
      .then((response) => {
        expect(response.sys, 'sys').ok
        expect(response.items, 'items').ok
        expect(response.items[0].sys.type).equals('TeamMembership')
      })
  })

  test('Gets one teamMembership', async () => {
    return organization
      .getTeamMembership('7pIEx2fMx53SSR1jd7C46M', '1tzDxN5zD2JbUjwzntAlLW')
      .then((response) => {
        expect(response.sys, 'sys').ok
        expect(response.sys.id).equals('1tzDxN5zD2JbUjwzntAlLW')
        expect(response.sys.type).equals('TeamMembership')
      })
  })

  test('Create, update and delete teamMembership', async () => {
    return organization
      .createTeamMembership('7pIEx2fMx53SSR1jd7C46M', {
        admin: true,
        organizationMembershipId: '5mDCHGHvePI8NOzw0WaY2Z',
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
