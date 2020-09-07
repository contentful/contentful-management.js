// To test creating spaceMemberships user has to exist in the organization. Organization membership is produced also within invitation process.
import { client, generateRandomId } from '../helpers'

import { before, describe, test } from 'mocha'
import { expect } from 'chai'

describe('SpaceMembers Api', () => {
  let space
  let organization

  before(async () => {
    space = await client().getSpace('ezs1swce23xe')
    organization = await client()
      .getOrganizations()
      .then((response) => response.items[0])
  })

  test('Gets spaceMemberships', async () => {
    return space.getSpaceMemberships().then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.items, 'fields').ok
    })
  })

  test('Create spaceMembership with id', async () => {
    return organization
      .createOrganizationInvitation({
        email: 'test-spaceMembership-id.user@contentful.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'developer',
      })
      .then((response) => organization.getOrganizationInvitation(response.sys.id))
      .then((invitation) =>
        organization.getOrganizationMembership(invitation.sys.organizationMembership.sys.id)
      )
      .then((membership) => {
        const id = generateRandomId('spaceMembership')
        space.getRoles().then((roles) => {
          return space
            .createSpaceMembershipWithId(id, {
              admin: false,
              email: 'test-spaceMembership-id.user@contentful.com',
              roles: [
                {
                  sys: {
                    type: 'Link',
                    linkType: 'Role',
                    id: roles.items[0].sys.id,
                  },
                },
              ],
            })
            .then((spaceMembership) => {
              expect(spaceMembership.sys.id).equals(id, 'id')
              return spaceMembership.delete()
            })
            .then(() => {
              // delete organization membership
              membership.delete()
            })
        })
      })
  })

  test('Create spaceMembership', async () => {
    return organization
      .createOrganizationInvitation({
        email: 'test-spaceMembership.user@contentful.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'developer',
      })
      .then((response) => organization.getOrganizationInvitation(response.sys.id))
      .then((invitation) =>
        organization.getOrganizationMembership(invitation.sys.organizationMembership.sys.id)
      )
      .then((membership) => {
        space.getRoles().then((roles) => {
          return space
            .createSpaceMembership({
              admin: false,
              email: 'test-spaceMembership.user@contentful.com',
              roles: [
                {
                  sys: {
                    type: 'Link',
                    linkType: 'Role',
                    id: roles.items[0].sys.id,
                  },
                },
              ],
            })
            .then((spaceMembership) => {
              expect(spaceMembership.user, 'user').ok
              expect(spaceMembership.admin, 'admin').not.ok
              expect(spaceMembership.sys.type).equal('SpaceMembership', 'type')
              return spaceMembership.delete()
            })
            .then(() => {
              // delete organization membership
              membership.delete()
            })
        })
      })
  })
})
