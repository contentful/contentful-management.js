export default function userTests (t, space) {
  t.test('Gets users', (t) => {
    t.plan(2)
    return space.getSpaceUsers()
      .then((response) => {
        t.ok(response.sys, 'sys')
        t.ok(response.items, 'fields')
      })
  })
}
