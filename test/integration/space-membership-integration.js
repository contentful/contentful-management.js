import generateRandomId from './generate-random-id'

// To test creating spaceMemberships user has to exist in the organization. Organization membership is produced also within invitation process.
export default function spaceMembershipTests (t, organization, space) {
  t.test('Gets spaceMemberships', (t) => {
    t.plan(2)
    return space.getSpaceMemberships()
      .then((response) => {
        t.ok(response.sys, 'sys')
        t.ok(response.items, 'fields')
      })
  })

  t.test('Create spaceMembership with id', (t) => {
    return organization.createOrganizationInvitation({
      email: 'test-spaceMembership-id.user@contentful.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'developer'
    })
      .then((response) => organization.getOrganizationInvitation(response.sys.id))
      .then((invitation) => organization.getOrganizationMembership(invitation.sys.organizationMembership.sys.id))
      .then((membership) => {
        const id = generateRandomId('spaceMembership')
        space.getRoles()
          .then((roles) => {
            return space.createSpaceMembershipWithId(id, {
              admin: false,
              email: 'test-spaceMembership-id.user@contentful.com',
              roles: [
                { sys: { type: 'Link', linkType: 'Role', id: roles.items[0].sys.id } }
              ]
            })
              .then((spaceMembership) => {
                t.equals(spaceMembership.sys.id, id, 'id')
                return spaceMembership.delete()
              })
              .then(() => {
                // delete organization membership
                membership.delete()
              })
          })
      })
  })

  t.test('Create spaceMembership', (t) => {
    return organization.createOrganizationInvitation({
      email: 'test-spaceMembership.user@contentful.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'developer'
    })
      .then((response) => organization.getOrganizationInvitation(response.sys.id))
      .then((invitation) => organization.getOrganizationMembership(invitation.sys.organizationMembership.sys.id))
      .then((membership) => {
        space.getRoles()
          .then((roles) => {
            return space.createSpaceMembership({
              admin: false,
              email: 'test-spaceMembership.user@contentful.com',
              roles: [
                { sys: { type: 'Link', linkType: 'Role', id: roles.items[0].sys.id } }
              ]
            })
              .then((spaceMembership) => {
                t.ok(spaceMembership.user, 'user')
                t.notOk(spaceMembership.admin, 'admin')
                t.equal(spaceMembership.sys.type, 'SpaceMembership', 'type')
                return spaceMembership.delete()
              })
              .then(() => {
                // delete organization membership
                membership.delete()
              })
          })
      })
  })
}
