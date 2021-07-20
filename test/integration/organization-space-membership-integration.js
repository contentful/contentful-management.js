import { before, describe, test } from 'mocha'
import { expect } from 'chai'
import { getTestOrganization } from '../helpers'
import { TestDefaults } from '../defaults'

const { organizationSpaceMembershipId } = TestDefaults

describe('OrganizationSpaceMembership Api', function () {
  let organization

  before(async () => {
    organization = await getTestOrganization()
  })

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
