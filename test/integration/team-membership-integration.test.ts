import { describe, it, beforeAll, expect, afterAll } from 'vitest'
import { getTestOrganization, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'
import type { Organization } from '../../lib/export-types'

const { teamId, teamMembershipId, organizationMembershipId2 } = TestDefaults

describe('TeamMembership API', () => {
  let organization: Organization

  beforeAll(async () => {
    organization = await getTestOrganization()
  })

  afterAll(timeoutToCalmRateLimiting)

  it('Gets teamMemberships for a team', async () => {
    const response = await organization.getTeamMemberships({ teamId })

    expect(response.sys).toBeTruthy()
    expect(response.items).toBeTruthy()
    expect(response.items[0].sys.type).toBe('TeamMembership')
  })

  it('Gets one teamMembership', async () => {
    const response = await organization.getTeamMembership(teamId, teamMembershipId)

    expect(response.sys).toBeTruthy()
    expect(response.sys.id).toBe(teamMembershipId)
    expect(response.sys.type).toBe('TeamMembership')
  })

  it('Creates, updates, and deletes a teamMembership', async () => {
    const teamMembership = await organization.createTeamMembership(teamId, {
      admin: true,
      organizationMembershipId: organizationMembershipId2,
    })

    expect(teamMembership.sys).toBeTruthy()
    expect(teamMembership.admin).toBe(true)
    expect(teamMembership.sys.type).toBe('TeamMembership')

    teamMembership.admin = false
    const updatedTeamMembership = await teamMembership.update()

    expect(updatedTeamMembership.sys).toBeTruthy()
    expect(updatedTeamMembership.admin).toBe(false)
    expect(updatedTeamMembership.sys.type).toBe('TeamMembership')

    await updatedTeamMembership.delete()
  })

  it('Gets teamMemberships for an organization', async () => {
    const response = await organization.getTeamMemberships()

    expect(response.sys).toBeTruthy()
    expect(response.items).toBeTruthy()
    expect(response.items[0].sys.type).toBe('TeamMembership')
  })

  it('Gets teamMemberships for an organization with query', async () => {
    const response = await organization.getTeamMemberships({ query: { limit: 1 } })

    expect(response.sys).toBeTruthy()
    expect(response.items).toBeTruthy()
    expect(response.items.length).toBe(1)
    expect(response.items[0].sys.type).toBe('TeamMembership')
  })
})
