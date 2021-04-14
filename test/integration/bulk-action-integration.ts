import { expect } from 'chai'
import { before, after, describe, test } from 'mocha'
import {
  client,
  createTestEnvironment,
  createTestSpace,
  generateRandomId,
  getDefaultSpace,
} from '../helpers'

describe('BulkAction Api', async function () {
  let readSpace
  let readEnvironment
  let readContentType
  let writeSpace
  let writeEnvironment

  before(async () => {
    readSpace = await getDefaultSpace()
    readEnvironment = await readSpace.getEnvironment('master')
    readContentType = await readEnvironment.getContentType('vxVZs5JbhI9MwMupax3dm')

    writeSpace = await createTestSpace(client(), 'ContentType')
    writeEnvironment = await createTestEnvironment(writeSpace, 'Testing Environment')
  })

  after(async () => {
    if (writeSpace) {
      return writeSpace.delete()
    }
  })

  describe('read', () => {
    test('Gets content type', async () => {
      return readEnvironment.getContentType(readContentType.sys.id).then((response) => {
        expect(response.sys, 'sys').to.be.ok
        expect(response.name, 'name').to.be.ok
        expect(response.fields, 'fields').to.be.ok
      })
    })
  })
})
