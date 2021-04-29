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

  test('createAppUpload', async () => {
    const appUpload = await organization.createAppUpload(
      readFileSync(`${__dirname}/fixtures/build.zip`)
    )

    expect(appUpload.sys.type).equals('AppUpload', 'type')

    await appUpload.delete()
  })

  test('getAppUpload', async () => {
    const appUpload = await organization.createAppUpload(
      readFileSync(`${__dirname}/fixtures/build.zip`)
    )

    const fetchedAppUpload = await organization.getAppUpload(appUpload.sys.id)

    expect(appUpload.sys.id).equals(fetchedAppUpload.sys.id)

    await appUpload.delete()
  })

  test('delete', async () => {
    const appUpload = await organization.createAppUpload(
      readFileSync(`${__dirname}/fixtures/build.zip`)
    )

    await appUpload.delete()

    await expect(organization.getAppUpload(appUpload.sys.id)).to.be.rejectedWith(
      'The resource could not be found'
    )
  })
})
