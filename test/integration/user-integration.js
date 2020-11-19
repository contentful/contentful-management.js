export function userTests(t, organization) {
  t.test('Gets organization users', (t) => {
    t.plan(3)
    return organization.getUsers().then((response) => {
      t.ok(response.sys, 'sys')
      t.ok(response.items, 'items')
      t.ok(response.items[0].sys.type, 'User')
    })
  })
  t.test('Gets organization user by id', (t) => {
    t.plan(3)
    return organization.getUser('4grQr6pMEy51ppQTRoQQDz').then((response) => {
      t.ok(response.sys, 'sys')
      t.ok(response.sys.id, '4grQr6pMEy51ppQTRoQQDz')
      t.ok(response.sys.type, 'User')
    })
  })
}
