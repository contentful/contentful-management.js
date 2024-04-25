import { expect } from 'chai'
import { before, describe, test, after } from 'mocha'
import { readFileSync } from 'fs'
import { getTestOrganization, getDefaultSpace } from '../helpers'

describe('AppBundle api', function () {
  let organization
  let appDefinition
  let appUpload
  let space
  let env

  before(async () => {
    space = await getDefaultSpace()
    env = await space.getEnvironment('master')
    organization = await getTestOrganization()

    appDefinition = await organization.createAppDefinition({
      name: 'Test AppBundle',
    })

    appUpload = await organization.createAppUpload(readFileSync(`${__dirname}/fixtures/build.zip`))
  })

  after(async () => {
    const { items: appDefinitions } = await organization.getAppDefinitions()
    const { items: appInstallations } = await env.getAppInstallations()
    for await (const appInstallation of appInstallations) {
      await appInstallation.delete()
    }
    for await (const appDefinition of appDefinitions) {
      await appDefinition.delete()
    }

    if (appUpload) {
      await appUpload.delete()
    }
  })

  test('createAppBundle', async () => {
    const appBundle = await appDefinition.createAppBundle({
      appUploadId: appUpload.sys.id,
      comment: 'Test comment',
    })

    expect(appBundle.sys.type).equals('AppBundle', 'type')
    expect(appBundle.comment).equals('Test comment', 'comment')
    expect(appBundle.files).to.be.an('array')
    const indexFile = appBundle.files.filter((file) => file.name === 'index.html')
    expect(indexFile).to.exist

    await appBundle.delete()
  })

  test('getAppBundle', async () => {
    const appBundle = await appDefinition.createAppBundle({
      appUploadId: appUpload.sys.id,
      comment: 'Test comment',
    })

    const fetchedAppBundle = await appDefinition.getAppBundle(appBundle.sys.id)

    expect(appBundle.sys.id).equals(fetchedAppBundle.sys.id)

    await appBundle.delete()
  })

  test('getAppBundles', async () => {
    const response = await appDefinition.getAppBundles()

    expect(response.items).to.be.an('array')
    expect(response.sys.type).equals('Array', 'type')
  })

  test('delete', async () => {
    const appBundle = await appDefinition.createAppBundle({
      appUploadId: appUpload.sys.id,
      comment: 'Test comment',
    })

    await appBundle.delete()

    await expect(appDefinition.getAppBundle(appBundle.sys.id)).to.be.rejectedWith(
      'The resource could not be found'
    )
  })
})
