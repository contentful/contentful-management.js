import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import { readFileSync } from 'fs'
import {
  initPlainClient,
  getTestOrganization,
  getDefaultSpace,
  timeoutToCalmRateLimiting,
} from '../helpers'
import type {
  Organization,
  AppDefinition,
  AppUpload,
  Space,
  Environment,
  PlainClientAPI,
} from '../../lib/contentful-management'

describe('AppBundle api', { sequential: true }, () => {
  let organization: Organization
  let appDefinition: AppDefinition
  let appUpload: AppUpload
  let space: Space
  let env: Environment
  let client: PlainClientAPI

  beforeAll(async () => {
    space = await getDefaultSpace()
    env = await space.getEnvironment('master')
    organization = await getTestOrganization()

    client = initPlainClient({
      spaceId: space.sys.id,
      environmentId: 'master',
    })

    appDefinition = await organization.createAppDefinition({
      name: 'Test AppBundle',
    })

    appUpload = await organization.createAppUpload(readFileSync(`${__dirname}/fixtures/build.zip`))
  })

  afterAll(async () => {
    const { items: appDefinitions } = await organization.getAppDefinitions()
    const { items: appInstallations } = await env.getAppInstallations()

    for (const appInstallation of appInstallations) {
      await appInstallation.delete()
    }
    for (const appDefinition of appDefinitions) {
      await appDefinition.delete()
    }

    if (appUpload) {
      await appUpload.delete()
    }
    await timeoutToCalmRateLimiting()
  })

  test('getManyFunction', async () => {
    const funcs = await client.function.getMany({
      organizationId: organization.sys.id,
      appDefinitionId: appDefinition.sys.id,
    })
    expect(funcs).toBeDefined()
    expect(funcs.items).toBeInstanceOf(Array)
  })
})
