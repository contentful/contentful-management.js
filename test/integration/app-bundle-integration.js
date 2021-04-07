import { expect } from 'chai'
import { before, describe, test, after } from 'mocha'
import { readFileSync } from 'fs'
import { client } from '../helpers'

describe('AppBundle api', function () {
  let organization
  let appDefinition
  let appUpload

  before(async () => {
    organization = await client()
      .getOrganizations()
      .then((response) => response.items[0])

    appDefinition = await organization.createAppDefinition({
      name: 'Test AppBundle',
    })

    appUpload = await organization.createAppUpload(readFileSync(`${__dirname}/fixtures/build.zip`))
  })

  after(async () => {
    organization.getAppDefinitions().then((response) => {
      response.items.map((appDefinition) => appDefinition.delete())
    })

    if (appUpload) {
      appUpload.delete()
    }
  })

  test('Create, get, get all and delete AppBundle', async () => {
    return appDefinition
      .createAppBundle({ appUploadId: appUpload.sys.id, comment: 'Test comment' })
      .then((appBundle) => {
        expect(appBundle.sys.type).equals('AppBundle', 'type')
        expect(appBundle.comment).equals('Test comment', 'comment')
        expect(appBundle.files).to.be.an('array')
        return appDefinition.getAppBundle(appBundle.sys.id).then((response) => {
          expect(response.sys.id).equals(appBundle.sys.id)

          return appDefinition
            .getAppBundles()
            .then((response) => {
              expect(response.items.length).equals(
                response.total,
                'returns the just created app bundles'
              )
            })
            .then(() => appBundle.delete())
        })
      })
  })
})
