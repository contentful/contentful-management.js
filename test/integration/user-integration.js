import { before, describe, test } from 'mocha'
import { client } from '../helpers'
import { expect } from 'chai'

describe('User api', function () {
  this.timeout(60000)
  let organization

  before(async () => {
    organization = await client()
      .getOrganizations()
      .then((response) => response.items[0])
  })

  test('Gets organization users', async () => {
    return organization.getUsers().then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.items, 'items').ok
      expect(response.items[0].sys.type).equals('User')
    })
  })

  test('Gets organization user by id', async () => {
    return organization.getUser('4grQr6pMEy51ppQTRoQQDz').then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.sys.id).equals('4grQr6pMEy51ppQTRoQQDz')
      expect(response.sys.type).equals('User')
    })
  })
})
