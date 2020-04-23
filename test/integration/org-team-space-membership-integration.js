export default function orgTeamSpaceMembershipTests (t, organization) {
  t.test('Get a single Team Space Membership', (t) => {
    t.plan(3)
    // create space membership for existing team
    return organization.getTeamSpaceMembership('5vllqmpyrhlgaz0xb2S90C', {
      admin: false,
      roles: [
        {
          sys: {
            type: 'Link',
            linkType: 'Role',
            id: '6YFO0dKMUjeXB5OPoWnoNm' // role developer
          }
        }
      ]
    })
  })

  t.test('Gets all Team Space Memberships in organization', (t) => {
    t.plan(3)
    return organization.getTeamSpaceMemberships()
      .then((response) => {
        t.ok(response.sys, 'sys')
        t.ok(response.items, 'items')
        t.equals(response.items[0].sys.type, 'TeamSpaceMembership')
      })
  })

  t.test('Gets all Team Space Memberships in a team', (t) => {
    t.plan(3)
    return organization.getTeamSpaceMemberships({teamId: '7pIEx2fMx53SSR1jd7C46M'})
      .then((response) => {
        t.ok(response.sys, 'sys')
        t.ok(response.items, 'items')
        t.equals(response.items[0].sys.type, 'TeamSpaceMembership')
      })
  })
}
