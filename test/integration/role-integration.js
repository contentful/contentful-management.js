/* global expect, test */
import generateRandomId from './generate-random-id'
import { getSpace } from './utils'

const roleDefinition = {
  name: 'Content Editor',
  description: 'Can only edit content',
  policies:
  [ { effect: 'allow', actions: 'all', constraint: { and: [ { equals: [ { doc: 'sys.type' }, 'Asset' ] } ] } },
     { effect: 'allow', actions: 'all', constraint: { and: [ { equals: [ { doc: 'sys.type' }, 'Entry' ] } ] } } ],
  permissions: { ContentModel: [ 'read' ], Settings: [], ContentDelivery: [] }
}

export default function roleTests (space) {
  test('Gets roles', () => {
    return getSpace()
      .then((space) => {
        return space.getRoles()
          .then((response) => {
            expect(response.sys).toBeTruthy()
            expect(response.items).toBeTruthy()
          })
      })
  })

  test('Create role with id', () => {
    const id = generateRandomId('role')
    return getSpace()
      .then((space) => {
        return space.createRoleWithId(id, roleDefinition)
          .then((role) => {
            expect(role.sys.id).toBe(id)
            return role.delete()
          })
      })
  })

  test('Create role', () => {
    return getSpace()
      .then((space) => {
        return space.createRole(roleDefinition)
          .then((role) => {
            expect(role.name).toBe('Content Editor')
            role.name = 'updatedname'
            role.update()
              .then((updatedRole) => {
                expect(updatedRole.name).toBe('updatedname')
                return updatedRole.delete()
              })
          })
      })
  })
}
