import { before, describe, test } from 'mocha'
import { getV2Space } from '../helpers'
import { expect } from 'chai'

describe('SpaceTeam Api', () => {
  let space

  before(async () => {
    space = await getV2Space()
  })

  test.only('Gets spaceTeams', async () => {
    return space.getSpaceTeams().then((response) => {
      console.log(response.items)
      expect(response.sys, 'sys').ok
      expect(response.sys.type, 'Array').ok
      expect(response.items, 'items').ok
      expect(response.items[0].sys.type).equals('Team')
    })
  })

  test('Gets spaceTeam', async () => {
    return space.getSpaceTeam('0PCYk22mt1xD7gTKZhHycN').then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.sys.type).equals('Team')
      expect(response.sys.id).equal('w6xueg32zr68-0PCYk22mt1xD7gTKZhHycN')
    })
  })
})
