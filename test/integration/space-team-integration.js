import { before, describe, test } from 'mocha'
import { getDefaultSpace } from '../helpers'
import { expect } from 'chai'

describe('SpaceTeam Api', () => {
  let space

  before(async () => {
    space = await getDefaultSpace()
  })

  test('Gets teams for space', async () => {
    return space.getTeams().then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.sys.type, 'Array').ok
      expect(response.items, 'items').ok
      expect(response.items[0].sys.type).equals('Team')
    })
  })
})
