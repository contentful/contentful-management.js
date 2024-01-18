import { before, describe, test } from 'mocha'
import { expect } from 'chai'
import { getTestOrganization } from '../helpers'

describe('Space api', function () {
  let organization

  before(async () => {
    organization = await getTestOrganization()
  })

  test('Gets organization spaces', async () => {
    return organization.getUsers().then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.items, 'items').ok
    })
  })
})
