export default function organizationMembershipTests (t, organization) {
  t.test('Gets organizationMemberships', (t) => {
    t.plan(2)
    return organization.getOrganizationMemberships()
      .then((response) => {
        t.ok(response.sys, 'sys')
        t.ok(response.items, 'fields')
      })
  })

  t.test('Gets organizationMembership', (t) => {
    t.plan(3)
    return organization.getOrganizationMembership('0U1TTDC1ve5uNbgh93Wl7l')
      .then((response) => {
        t.ok(response.sys, 'sys')
        t.ok(response.sys.id, '0U1TTDC1ve5uNbgh93Wl7l')
        t.ok(response.sys.type, 'OrganizationMembership')
      })
  })
}
