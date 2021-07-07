import { before, describe, test } from 'mocha'
import { expect } from 'chai'
import { getDefaultSpace } from '../helpers'
import { TestDefaults } from '../defaults'

const { spaceId, userId } = TestDefaults

describe('SpaceMember Api', () => {
  let space

  before(async () => {
    space = await getDefaultSpace()
  })

  test('Gets spaceMembers', async () => {
    return space.getSpaceMembers().then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.sys.type, 'Array').ok
      expect(response.items, 'items').ok
      expect(response.items[0].sys.type).equals('SpaceMember')
    })
  })

  test('Gets spaceMember', async () => {
    return space.getSpaceMember(userId).then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.sys.type).equals('SpaceMember')
      expect(response.sys.id).equal(`${spaceId}-${userId}`)
    })
  })
})
