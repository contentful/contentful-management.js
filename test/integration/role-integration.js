import { initClient, createTestSpace, generateRandomId, getTestOrganization } from '../helpers'
import { after, before, describe, test } from 'mocha'
import { expect } from 'chai'

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
  permissions: {
    ContentModel: ['read'],
    Settings: [],
    ContentDelivery: [],
  },
}

describe('Role Api', function () {
  let org
  let space

  before(async () => {
    org = await getTestOrganization()
    space = await createTestSpace(initClient(), 'Role')
  })

  after(async () => {
    if (space) {
      return space.delete()
    }
  })

  test('Gets roles', async () => {
    return space.getRoles().then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.items, 'fields').ok
    })
  })

  test('Gets roles for organization', async () => {
    return org.getRoles().then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.items, 'fields').ok
    })
  })

  test('Create role with id', async () => {
    const id = generateRandomId('role')
    return space.createRoleWithId(id, roleDefinition).then((role) => {
      expect(role.sys.id).equals(id, 'id')
      return role.delete()
    })
  })

  test('Create role', async () => {
    return space.createRole(roleDefinition).then((role) => {
      expect(role.name).equals('Content Editor', 'name')
      role.name = 'updatedname'
      return role.update().then((updatedRole) => {
        expect(updatedRole.name).equals('updatedname', 'name')
        return updatedRole.delete()
      })
    })
  })
})
