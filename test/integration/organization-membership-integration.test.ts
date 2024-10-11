import { beforeAll, describe, test, expect } from 'vitest'
import { getTestOrganization } from '../helpers'
import type { Organization } from '../../lib/export-types'
import { TestDefaults } from '../defaults'

const { organizationMembershipId } = TestDefaults

describe('OrganizationMembership Api', function () {
  let organization: Organization

  beforeAll(async () => {
    organization = await getTestOrganization()
  })

  test('Gets organizationMemberships', async () => {
    return organization.getOrganizationMemberships().then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.items, 'fields').ok
    })
  })

  test('Gets organizationMembership', async () => {
    return organization.getOrganizationMembership(organizationMembershipId).then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.sys.id).equals(organizationMembershipId)
      expect(response.sys.type).equals('OrganizationMembership')
    })
  })

  test('Gets organizationMemberships paged', async () => {
    return organization
      .getOrganizationMemberships({
        query: {
          limit: 1,
          skip: 1,
        },
      })
      .then((response) => {
        expect(response.sys, 'sys').ok
        expect(response.limit).equals(1)
        expect(response.skip).equals(1)
        expect(response.items.length).equals(1)
      })
  })
})
