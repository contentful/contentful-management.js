import { expect } from 'chai'
import { before, describe, test } from 'mocha'
import { getDefaultSpace } from '../helpers'
import { TestDefaults } from '../defaults'

const { userId } = TestDefaults

describe('SpaceUser Api', () => {
  let space

  before(async () => {
    space = await getDefaultSpace()
  })

  test('Gets users', async () => {
    return space.getSpaceUsers().then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.items, 'items').ok
      expect(response.items[0].sys.type).equals('User')
    })
  })

  test('Gets user by id', async () => {
    return space.getSpaceUser(userId).then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.sys.id).equals(userId)
      expect(response.sys.type).equals('User')
    })
  })
})
