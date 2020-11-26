import { before, describe, test } from 'mocha'
import { client } from '../helpers'
import { expect } from 'chai'

describe('OrganizationSpaceMembership Api', function () {
  let organization

  before(async () => {
    organization = await client()
      .getOrganizations()
      .then((response) => response.items[0])
  })

  test('Gets organizationSpaceMemberships', async () => {
    return organization.getOrganizationSpaceMemberships().then((response) => {
      expect(response.sys, 'sys')
      expect(response.items, 'fields')
    })
  })

  test('Gets organizationSpaceMembership', async () => {
    return organization
      .getOrganizationSpaceMembership('527cW1W5JNlOlJq38lfr1k')
      .then((response) => {
        expect(response.sys, 'sys').ok
        expect(response.sys.id).equal('527cW1W5JNlOlJq38lfr1k', 'id')
        expect(response.sys.type).equal('SpaceMembership', 'type')
        expect(response.user.sys.linkType).equal('User', 'user')
        expect(response.roles).eql([], 'roles')
      })
  })
})
