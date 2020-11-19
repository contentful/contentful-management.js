export function environmentTests(t, space) {
  t.test('creates an environment', (t) => {
    t.plan(2)
    return space.createEnvironment({ name: 'test-env' }).then((response) => {
      t.ok(response.sys.type, 'Environment', 'env is created')
      t.ok(response.name, 'test-env', 'env is created with name')
    })
  })

  t.test('creates an environment with an id', (t) => {
    t.plan(2)
    return space.createEnvironmentWithId('myId', { name: 'myId' }).then((response) => {
      t.equals(response.name, 'myId', 'env was created with correct name')
      t.equals(response.sys.id, 'myId', 'env was created with id')
    })
  })
}
