import generateRandomId from './generate-random-id'

const roleDefinition = {
  name: 'Content Editor',
  description: 'Can only edit content',
  policies: [
    {
      effect: 'allow',
      actions: 'all',
      constraint: { and: [{ equals: [{ doc: 'sys.type' }, 'Asset'] }] },
    },
    {
      effect: 'allow',
      actions: 'all',
      constraint: { and: [{ equals: [{ doc: 'sys.type' }, 'Entry'] }] },
    },
  ],
  permissions: { ContentModel: ['read'], Settings: [], ContentDelivery: [] },
}

export function roleTests(t, space) {
  t.test('Gets roles', (t) => {
    t.plan(3)
    return space.getRoles().then((response) => {
      t.ok(response.sys, 'sys')
      t.ok(response.items, 'fields')
      t.equal(response.items.length, 4)
    })
  })

  t.test('Gets roles with a limit parameter', (t) => {
    t.plan(2)
    return space
      .getRoles({
        limit: 2,
      })
      .then((response) => {
        t.ok(response.items, 'items')
        t.equal(response.items.length, 2)
      })
  })

  t.test('Gets roles with skip parameter', (t) => {
    t.plan(2)
    return space
      .getRoles({
        skip: 2,
      })
      .then((response) => {
        t.ok(response.items, 'items')
        t.equal(response.skip, 2)
      })
  })

  t.test('Create role with id', (t) => {
    const id = generateRandomId('role')
    return space.createRoleWithId(id, roleDefinition).then((role) => {
      t.equals(role.sys.id, id, 'id')
      return role.delete()
    })
  })

  t.test('Create role', (t) => {
    return space.createRole(roleDefinition).then((role) => {
      t.equals(role.name, 'Content Editor', 'name')
      role.name = 'updatedname'
      return role.update().then((updatedRole) => {
        t.equals(updatedRole.name, 'updatedname', 'name')
        return updatedRole.delete()
      })
    })
  })
}
