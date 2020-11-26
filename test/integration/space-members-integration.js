import { before, describe, test } from 'mocha'
import { client } from '../helpers'
import { expect } from 'chai'

describe('SpaceMembers Api', () => {
  let space

  before(async () => {
    space = await client(true).getSpace('w6xueg32zr68')
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
    return space.getSpaceMember('0PCYk22mt1xD7gTKZhHycN').then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.sys.type).equals('SpaceMember')
      expect(response.sys.id).equal('w6xueg32zr68-0PCYk22mt1xD7gTKZhHycN')
    })
  })
})
