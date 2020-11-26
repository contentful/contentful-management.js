import { expect } from 'chai'
import { before, describe, test } from 'mocha'
import { client } from '../helpers'

describe('SpaceUser Api', () => {
  let space

  before(async () => {
    space = await client(true).getSpace('w6xueg32zr68')
  })

  test('Gets users', async () => {
    return space.getSpaceUsers().then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.items, 'items').ok
      expect(response.items[0].sys.type).equals('User')
    })
  })

  test('Gets user by id', async () => {
    return space.getSpaceUser('4grQr6pMEy51ppQTRoQQDz').then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.sys.id).equals('4grQr6pMEy51ppQTRoQQDz')
      expect(response.sys.type).equals('User')
    })
  })
})
