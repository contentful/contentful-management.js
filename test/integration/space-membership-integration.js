/* global expect, test */
import generateRandomId from './generate-random-id'
import { getSpace } from './utils'

export default function spaceMembershipTests (space) {
  test('Gets spaceMemberships', () => {
    return getSpace()
      .then((space) => {
        return space.getSpaceMemberships()
          .then((response) => {
            expect(response.sys).toBeTruthy()
            expect(response.items).toBeTruthy()
          })
      })
  })

  test('Create spaceMembership with id', () => {
    const id = generateRandomId('spaceMembership')
    const email = generateRandomId('js-cma-sdk-tests') + '@contentful.com'
    return getSpace()
      .then((space) => {
        return space.getRoles()
          .then((roles) => {
            return space.createSpaceMembershipWithId(id, {
              admin: false,
              email: email,
              roles: [
                { sys: { type: 'Link', linkType: 'Role', id: roles.items[0].sys.id } }
              ]
            })
              .then((spaceMembership) => {
                expect(spaceMembership.sys.id).toBe(id)
                return spaceMembership.delete()
              })
          })
      })
  })

  test('Create spaceMembership', () => {
    const email = generateRandomId('js-cma-sdk-tests') + '@contentful.com'
    return getSpace()
      .then((space) => {
        return space.getRoles()
          .then((roles) => {
            return space.createSpaceMembership({
              admin: false,
              email: email,
              roles: [
                { sys: { type: 'Link', linkType: 'Role', id: roles.items[0].sys.id } }
              ]
            })
              .then((spaceMembership) => {
                expect(spaceMembership.user).toBeTruthy()
                expect(spaceMembership.admin).toBeFalsy()
                delete spaceMembership.user
                spaceMembership.admin = true
                spaceMembership.update()
                  .then((updatedSpaceMembership) => {
                    expect(spaceMembership.admin).toBeTruthy()
                    return updatedSpaceMembership.delete()
                  })
              })
          })
      })
  })
}
