export default function spaceMembersTests (t, space) {
  t.test('Gets spaceMembers', t => {
    t.plan(3)
    return space.getSpaceMembers().then(response => {
      t.ok(response.sys, 'sys')
      t.ok(response.sys.type, 'Array')
      t.ok(response.items, 'items')
    })
  })
}
