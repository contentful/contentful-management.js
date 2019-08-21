export function environmentAliasTests (t, space) {
  t.test('FeatureNotEnabled when attempting to get aliases', (t) => {
    t.plan(1)
    return space.getEnvironmentAliases()
      .catch(error => {
        t.equals(error.name, 'FeatureNotEnabled')
      })
  })
}

export function environmentAliasReadOnlyTests (t, space, waitForEnvironmentToBeReady) {
  t.test('Gets aliases', (t) => {
    t.plan(2)
    return space.getEnvironmentAliases()
      .then((response) => {
        t.equals(response.items[0].sys.id, 'master')
        t.equals(response.items[0].environment.sys.id, 'previously-master')
      })
  })

  t.test('Updates alias', (t) => {
    t.plan(5)
    return space.createEnvironmentWithId('test-env', {name: 'test-env'})
      .then(env => waitForEnvironmentToBeReady(space, env))
      .then(readyEnv => space.getEnvironmentAlias('master'))
      .then(alias => {
        t.equals(alias.sys.id, 'master')
        t.equals(alias.environment.sys.id, 'previously-master')
        // update the aliased env
        alias.environment.sys.id = 'test-env'
        return alias.update()
      })
      .then(updatedAlias => {
        t.equals(updatedAlias.sys.id, 'master')
        t.equals(updatedAlias.environment.sys.id, 'test-env')
        // clean back up by reverting to the old aliased env
        updatedAlias.environment.sys.id = 'previously-master'
        return updatedAlias.update()
      })
      .then(twiceUpdatedAlias => {
        t.equals(twiceUpdatedAlias.environment.sys.id, 'previously-master')
        return space.getEnvironment('test-env')
      })
      .then((env) => env.delete())
  })
}
