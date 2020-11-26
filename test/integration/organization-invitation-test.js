import { before, describe, test } from 'mocha'
import { client } from '../helpers'
import { expect } from 'chai'

describe('OrganizationMembership Invitation Api', function () {
  let organization

  before(async () => {
    organization = await client()
      .getOrganizations()
      .then((response) => response.items[0])
  })

  test('Creates, gets an invitation in the organization and remove membership after test', async () => {
    return organization
      .createOrganizationInvitation({
        email: 'test.user@contentful.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'developer',
      })
      .then((response) => organization.getOrganizationInvitation(response.sys.id))
      .then((invitation) => {
        expect(invitation.sys.type).equal('Invitation', 'type')
        expect(invitation.sys.status).equal('open', 'status')
        expect(invitation.sys.user).equal(null, 'user')
        expect(invitation.sys.organizationMembership.sys.type).equal('Link', 'type')
        expect(invitation.sys.organizationMembership.sys.linkType).equal(
          'OrganizationMembership',
          'linkType'
        )

        return organization.getOrganizationMembership(invitation.sys.organizationMembership.sys.id)
      })
      .then((membership) => {
        // delete membership means also delete the invitation for this user
        membership.delete()
      })
  })
})
