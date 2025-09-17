import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import { readFileSync } from 'fs'
import { getTestOrganization, timeoutToCalmRateLimiting } from '../helpers'
import type { Organization } from '../../lib/contentful-management'

describe('AppUpload api', { sequential: true }, () => {
  let organization: Organization

  beforeAll(async () => {
    organization = await getTestOrganization()
  })

  afterAll(timeoutToCalmRateLimiting)

  test('createAppUpload', async () => {
    const appUpload = await organization.createAppUpload(
      readFileSync(`${__dirname}/fixtures/build.zip`),
    )

    expect(appUpload.sys.type).toBe('AppUpload')

    await appUpload.delete()
  })

  test('getAppUpload', async () => {
    const appUpload = await organization.createAppUpload(
      readFileSync(`${__dirname}/fixtures/build.zip`),
    )

    const fetchedAppUpload = await organization.getAppUpload(appUpload.sys.id)

    expect(appUpload.sys.id).toBe(fetchedAppUpload.sys.id)

    await appUpload.delete()
  })

  test('delete', async () => {
    const appUpload = await organization.createAppUpload(
      readFileSync(`${__dirname}/fixtures/build.zip`),
    )

    await appUpload.delete()

    await expect(organization.getAppUpload(appUpload.sys.id)).rejects.toThrow(
      'The resource could not be found',
    )
  })
})
