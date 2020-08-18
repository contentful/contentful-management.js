export function environmentAliasTests(t, space) {
  t.test('Gets aliases', (t) => {
    t.plan(2)
    return space.getEnvironmentAliases().then((response) => {
      t.equals(response.items[0].sys.id, 'master')
      t.equals(response.items[0].environment.sys.id, 'previously-master')
    })
  })

  t.test('Updates master alias', (t) => {
    t.plan(4)
    return space
      .getEnvironmentAlias('master')
      .then((alias) => {
        t.equals(alias.sys.id, 'master')
        t.equals(alias.environment.sys.id, 'previously-master')
        alias.environment.sys.id = 'feature-13'
        return alias.update()
      })
      .then((updatedAlias) => {
        t.equals(updatedAlias.sys.id, 'master')
        t.equals(updatedAlias.environment.sys.id, 'feature-13')
      })
  })

  t.test('Creates custom alias', (t) => {
    t.plan(2)
    return space
      .createEnvironmentAliasWithId('new-alias', {
        environment: {
          sys: {
            type: 'Link',
            linkType: 'Environment',
            id: 'previously-master',
          },
        },
      })
      .then((alias) => {
        t.equals(alias.sys.id, 'new-alias')
        t.equals(alias.environment.sys.id, 'previously-master')
      })
  })

  t.test('Deletes custom alias', (t) => {
    t.plan(3)
    return space
      .getEnvironmentAlias('new-alias')
      .then((alias) => {
        t.equals(alias.sys.id, 'new-alias')
        t.equals(alias.environment.sys.id, 'previously-master')
        return alias.delete()
      })
      .then(() => {
        return space.getEnvironmentAlias('new-alias')
      })
      .catch((err) => {
        t.equals(err.name, 'NotFound')
      })
  })
}
