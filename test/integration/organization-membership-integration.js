import { before, describe, test } from 'mocha'
import { expect } from 'chai'
import { getTestOrganization } from '../helpers'
import { TestDefaults } from '../defaults'

const { organizationMembershipId } = TestDefaults

describe('OrganizationMembership Api', function () {
  let organization

  before(async () => {
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
})
