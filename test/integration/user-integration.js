import { before, describe, test } from 'mocha'
import { expect } from 'chai'
import { getTestOrganization } from '../helpers'
import { TestDefaults } from '../defaults'

const { userId } = TestDefaults

describe('User api', function () {
  let organization

  before(async () => {
    organization = await getTestOrganization()
  })

  test('Gets organization users', async () => {
    return organization.getUsers().then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.items, 'items').ok
      expect(response.items[0].sys.type).equals('User')
    })
  })

  test('Gets organization user by id', async () => {
    return organization.getUser(userId).then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.sys.id).equals(userId)
      expect(response.sys.type).equals('User')
    })
  })
})
