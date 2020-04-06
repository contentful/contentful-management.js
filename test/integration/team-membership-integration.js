export default function teamMembershipTests (t, organization) {
  t.test('Gets teamMemberships', (t) => {
    t.plan(3)
    return organization.getTeamMemberships('4bsQOABPBKerHD35NPGEPh')
      .then((response) => {
        t.ok(response.sys, 'sys')
        t.ok(response.items, 'items')
        t.ok(response.items[0].sys.type, 'TeamMembership')
      })
  })

  t.test('Gets organizationMembership', (t) => {
    t.plan(3)
    return organization.getTeamMembership('4bsQOABPBKerHD35NPGEPh', '4NcpxJYamTkuHxWMVqoLaI')
      .then((response) => {
        t.ok(response.sys, 'sys')
        t.ok(response.sys.id, '4NcpxJYamTkuHxWMVqoLaI')
        t.ok(response.sys.type, 'TeamMembership')
      })
  })
}
