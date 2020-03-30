export default function organizationSpaceMembershipTests (t, organization) {
  t.test('Gets organizationSpaceMemberships', (t) => {
    t.plan(2)
    return organization.getOrganizationSpaceMemberships()
      .then((response) => {
        t.ok(response.sys, 'sys')
        t.ok(response.items, 'fields')
      })
  })

  t.test('Gets organizationSpaceMembership', (t) => {
    t.plan(5)
    return organization.getOrganizationSpaceMembership('527cW1W5JNlOlJq38lfr1k')
      .then((response) => {
        t.ok(response.sys, 'sys')
        t.ok(response.sys.id, '527cW1W5JNlOlJq38lfr1k')
        t.ok(response.sys.type, 'SpaceMembership')
        t.ok(response.user, 'user')
        t.ok(response.roles, 'roles')
      })
  })
}
