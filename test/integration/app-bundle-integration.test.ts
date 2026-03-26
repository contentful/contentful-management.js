import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import { readFileSync } from 'fs'
import { getTestOrganization, timeoutToCalmRateLimiting } from '../helpers'
import type { Organization, AppDefinition, AppUpload } from '../../lib/index'

describe('AppBundle api', { sequential: true }, () => {
  let organization: Organization
  let appDefinition: AppDefinition
  let appUpload: AppUpload

  beforeAll(async () => {
    organization = await getTestOrganization()

    appDefinition = await organization.createAppDefinition({
      name: 'Test AppBundle Integration in CMA (delete if stale)',
    })

    appUpload = await organization.createAppUpload(readFileSync(`${__dirname}/fixtures/build.zip`))
  })

  afterAll(async () => {
    if (appUpload) {
      await appUpload.delete()
    }

    if (appDefinition) {
      await appDefinition.delete()
    }

    await timeoutToCalmRateLimiting()
  })

  test('createAppBundle', async () => {
    const appBundle = await appDefinition.createAppBundle({
      appUploadId: appUpload.sys.id,
      comment: 'Test comment',
    })

    expect(appBundle.sys.type).toBe('AppBundle')
    expect(appBundle.comment).toBe('Test comment')
    expect(Array.isArray(appBundle.files)).toBeTruthy()

    const indexFile = appBundle.files.find((file) => file.name === 'index.html')
    expect(indexFile).toBeTruthy()

    await appBundle.delete()
  })

  test('getAppBundle', async () => {
    const appBundle = await appDefinition.createAppBundle({
      appUploadId: appUpload.sys.id,
      comment: 'Test comment',
    })

    const fetchedAppBundle = await appDefinition.getAppBundle(appBundle.sys.id)

    expect(appBundle.sys.id).toBe(fetchedAppBundle.sys.id)

    await appBundle.delete()
  })

  test('getAppBundles', async () => {
    const response = await appDefinition.getAppBundles()

    expect(Array.isArray(response.items)).toBeTruthy()
    expect(response.sys.type).toBe('Array')
  })

  test('delete', async () => {
    const appBundle = await appDefinition.createAppBundle({
      appUploadId: appUpload.sys.id,
      comment: 'Test comment',
    })

    await appBundle.delete()

    await expect(appDefinition.getAppBundle(appBundle.sys.id)).rejects.toThrow(
      'The resource could not be found',
    )
  })
})
