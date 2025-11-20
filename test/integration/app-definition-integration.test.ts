import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import {
  createAppDefinition,
  getAppDefinition,
  getTestOrganization,
  createAppInstallation,
  getDefaultSpace,
  timeoutToCalmRateLimiting,
} from '../helpers'
import type {
  Organization,
  Space,
  Environment,
  AppInstallation,
} from '../../lib/index'

describe('AppDefinition api', { sequential: true }, () => {
  let organization: Organization
  let space: Space
  let env: Environment

  beforeAll(async () => {
    organization = await getTestOrganization()
    space = await getDefaultSpace()
    env = await space.getEnvironment('master')
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
    await timeoutToCalmRateLimiting()
  })

  test('createAppDefinition', async () => {
    const appDefinition = await organization.createAppDefinition({
      name: 'Test App',
      src: 'http://localhost:3000',
      locations: [
        {
          location: 'app-config',
        },
      ],
    })

    expect(appDefinition.sys.type).toBe('AppDefinition')
    expect(appDefinition.name).toBe('Test App')
  })

  test('createAppDefinition with secret installation param', async () => {
    const appDefinition = await organization.createAppDefinition({
      name: 'Test App',
      src: 'http://localhost:3000',
      locations: [
        {
          location: 'app-config',
        },
      ],
      parameters: {
        installation: [
          {
            name: 'my-secret-param',
            id: 'secret',
            type: 'Secret',
          },
        ],
      },
    })

    expect(appDefinition.sys.type).toBe('AppDefinition')
    expect(appDefinition.name).toBe('Test App')
    if (!appDefinition.parameters || !appDefinition.parameters.installation) {
      throw new Error(
        `appDefinition.parameters or appDefinition.parameters.installation is not defined`,
      )
    }
    expect(appDefinition.parameters.installation[0].id).toBe('secret')
  })

  test('getAppDefinition', async () => {
    const appDefinition = await organization.createAppDefinition({
      name: 'Test App',
      src: 'http://localhost:3000',
      locations: [
        {
          location: 'app-config',
        },
      ],
    })

    const fetchedAppDefinition = await organization.getAppDefinition(appDefinition.sys.id)

    expect(appDefinition.sys.id).toBe(fetchedAppDefinition.sys.id)
  })

  test('getAppDefinitions', async () => {
    const appDefinitions = await organization.getAppDefinitions()

    expect(Array.isArray(appDefinitions.items)).toBeTruthy()
    expect(appDefinitions.sys.type).toBe('Array')
  })

  test('delete', async () => {
    const appDefinition = await organization.createAppDefinition({
      name: 'Test App',
      src: 'http://localhost:3000',
      locations: [
        {
          location: 'app-config',
        },
      ],
    })

    await appDefinition.delete()

    await expect(organization.getAppDefinition(appDefinition.sys.id)).rejects.toThrow(
      'The resource could not be found',
    )
  })

  test('update', async () => {
    const appDefinition = await organization.createAppDefinition({
      name: 'Test App',
      src: 'http://localhost:3000',
      locations: [
        {
          location: 'app-config',
        },
      ],
    })

    appDefinition.name = 'Test App Updated'
    await appDefinition.update()

    expect(appDefinition.name).toBe('Test App Updated')
  })

  test('getAppDefinition (top level)', async () => {
    const { orgId, appId } = await createAppDefinition()
    const appDefinition = await getAppDefinition(orgId, appId)

    expect(appDefinition.sys.organization.sys.id).toBe(orgId)
    expect(appDefinition.sys.id).toBe(appId)
  })

  test('getInstallationsForOrg returns', async () => {
    const { orgId, appId } = await createAppDefinition()
    const appDefinition = await getAppDefinition(orgId, appId)
    const installationsForOrg = await appDefinition.getInstallationsForOrg()
    expect(installationsForOrg.sys.type).toBe('Array')
  })

  test('getInstallationsForOrg returns installations', async () => {
    const { orgId, appId } = await createAppDefinition()
    const appInstallation: AppInstallation = await createAppInstallation(appId)
    const appDefinition = await getAppDefinition(orgId, appId)
    const appInstallationsForOrg = await appDefinition.getInstallationsForOrg()

    expect(appInstallationsForOrg.items.length).toBe(1)
    await appInstallation.delete()
  })
})
