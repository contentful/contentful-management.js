import { before, describe, test } from 'mocha'
import { getV2Space } from '../helpers'
import { expect } from 'chai'

describe('SpaceMember Api', () => {
  let space

  before(async () => {
    space = await getV2Space()
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
