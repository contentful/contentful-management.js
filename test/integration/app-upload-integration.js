import { expect } from 'chai'
import { readFileSync } from 'fs'
import { before, describe, test } from 'mocha'
import { client } from '../helpers'

describe('AppUpload api', function () {
  let organization

  before(async () => {
    organization = await client()
      .getOrganizations()
      .then((response) => response.items[0])
  })

  test('Create, get and delete AppUpload', async () => {
    return organization
      .createAppUpload(readFileSync(`${__dirname}/fixtures/build.zip`))
      .then((appUpload) => {
        expect(appUpload.sys.type).equals('AppUpload', 'type')
        return organization
          .getAppUpload(appUpload.sys.id)
          .then((response) => {
            expect(response.sys.id).equals(appUpload.sys.id)
          })
          .then(() => appUpload.delete())
      })
  })
})
