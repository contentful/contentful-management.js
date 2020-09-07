import { before, describe, test } from 'mocha'
import { client } from '../helpers'
import { expect } from 'chai'

describe('OrganizationMembership Api', function () {
  let organization

  before(async () => {
    organization = await client()
      .getOrganizations()
      .then((response) => response.items[0])
  })

  test('Gets organizationMemberships', async () => {
    return organization.getOrganizationMemberships().then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.items, 'fields').ok
    })
  })

  test('Gets organizationMembership', async () => {
    return organization.getOrganizationMembership('3ugleZJgHKk89I1P5MSDuY').then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.sys.id).equals('3ugleZJgHKk89I1P5MSDuY')
      expect(response.sys.type).equals('OrganizationMembership')
    })
  })
})

export default function organizationMembershipTests(t, organization) {}
