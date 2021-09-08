import { expect } from 'chai'
import { readFileSync } from 'fs'
import { before, describe, test } from 'mocha'
import { getTestOrganization } from '../helpers'

describe.skip('AppSignedRequest api', function () {
  let organization
  // let appDefinition

  before(async () => {
    organization = await getTestOrganization()

    // appDefinition = await organization.createAppDefinition({
    //   name: 'Test AppSignedRequest',
    // })

    // TODO
    // I think this also requires implementation of the app signing secret entity
  })

  test('createAppSignedRequest', async () => {
    const appUpload = await organization.createAppUpload(
      readFileSync(`${__dirname}/fixtures/build.zip`)
    )

    expect(appUpload.sys.type).equals('AppUpload', 'type')

    await appUpload.delete()
  })
})
