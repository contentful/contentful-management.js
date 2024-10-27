import { beforeAll, describe, test, expect, afterAll } from 'vitest'
import type { Organization } from '../../lib/export-types'
import { getTestOrganization, timeoutToCalmRateLimiting } from '../helpers'
import { TestDefaults } from '../defaults'

const { organizationSpaceMembershipId } = TestDefaults

describe('OrganizationSpaceMembership Api', function () {
  let organization: Organization

  beforeAll(async () => {
    organization = await getTestOrganization()
  })

  afterAll(timeoutToCalmRateLimiting)

  test('Gets organizationSpaceMemberships', async () => {
    return organization.getOrganizationSpaceMemberships().then((response) => {
      expect(response.sys, 'sys')
      expect(response.items, 'fields')
    })
  })

  test('Gets organizationSpaceMembership', async () => {
    return organization
      .getOrganizationSpaceMembership(organizationSpaceMembershipId)
      .then((response) => {
        expect(response.sys, 'sys').ok
        expect(response.sys.id).equal(organizationSpaceMembershipId, 'id')
        expect(response.sys.type).equal('SpaceMembership', 'type')
        expect(response.user.sys.linkType).equal('User', 'user')
      })
  })
})
