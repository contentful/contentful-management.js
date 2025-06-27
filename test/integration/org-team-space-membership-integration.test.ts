import { beforeAll, describe, it, expect, afterAll } from 'vitest'
import { getTestOrganization, timeoutToCalmRateLimiting } from '../helpers.js'
import { TestDefaults } from '../defaults.js'
import type { Organization } from '../../lib/export-types.js'

const { teamId, teamSpaceMembershipId } = TestDefaults

describe('TeamSpaceMembership API', () => {
  let organization: Organization

  beforeAll(async () => {
    organization = await getTestOrganization()
  })

  afterAll(timeoutToCalmRateLimiting)

  it('Gets a single Team Space Membership', async () => {
    const response = await organization.getTeamSpaceMembership(teamSpaceMembershipId)
    expect(response.sys.type).toBe('TeamSpaceMembership')
    expect(response.sys.team).toBeTruthy()
    expect(response.roles).toBeTruthy()
  })

  it('Gets all Team Space Memberships in organization', async () => {
    const response = await organization.getTeamSpaceMemberships()
    expect(response.sys).toBeTruthy()
    expect(response.items).toBeTruthy()
    expect(response.items[0].sys.type).toBe('TeamSpaceMembership')
  })

  it('Gets all Team Space Memberships in a team', async () => {
    const response = await organization.getTeamSpaceMemberships({ teamId })
    expect(response.sys).toBeTruthy()
    expect(response.items).toBeTruthy()
    expect(response.items[0].sys.type).toBe('TeamSpaceMembership')
  })
})
