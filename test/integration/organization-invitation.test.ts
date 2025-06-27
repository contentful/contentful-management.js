import { beforeAll, describe, test, expect, afterAll } from 'vitest'
import { getTestOrganization, timeoutToCalmRateLimiting } from '../helpers.js'
import type { Organization } from '../../lib/export-types.js'

describe('OrganizationMembership Invitation API', () => {
  let organization: Organization

  beforeAll(async () => {
    organization = await getTestOrganization()
  })

  afterAll(timeoutToCalmRateLimiting)

  test('Creates, gets an invitation in the organization and removes membership after test', async () => {
    const response = await organization.createOrganizationInvitation({
      email: 'test.user@contentful.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'developer',
    })

    const invitation = await organization.getOrganizationInvitation(response.sys.id)

    expect(invitation.sys.type).toBe('Invitation')
    expect(invitation.sys.status).toBe('open')
    expect(invitation.sys.user).toBe(null)
    expect(invitation.sys.organizationMembership.sys.type).toBe('Link')
    expect(invitation.sys.organizationMembership.sys.linkType).toBe('OrganizationMembership')

    const membership = await organization.getOrganizationMembership(
      invitation.sys.organizationMembership.sys.id
    )

    // Delete membership, which also deletes the invitation for this user
    await membership.delete()
  })
})
