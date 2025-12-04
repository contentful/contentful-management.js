import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import {
  createAppDefinition,
  getAppDefinition,
  getTestOrganization,
  createAppInstallation,
  timeoutToCalmRateLimiting,
} from '../helpers'
import type { Organization, AppInstallation } from '../../lib/contentful-management'

describe('AppDefinition api', { sequential: true }, () => {
  let organization: Organization

  beforeAll(async () => {
    organization = await getTestOrganization()
  })

  afterAll(async () => {
    await timeoutToCalmRateLimiting()
  })

  test('createAppDefinition', async () => {
    const appDefinition = await organization.createAppDefinition({
      name: 'Test createAppDefinition in CMA (delete if stale)',
      src: 'http://localhost:3000',
      locations: [
        {
          location: 'app-config',
        },
      ],
    })

    expect(appDefinition.sys.type).toBe('AppDefinition')
    expect(appDefinition.name).toBe('Test createAppDefinition in CMA (delete if stale)')

    //cleanup
    await appDefinition.delete()
  })

  test('createAppDefinition with secret installation param', async () => {
    const appDefinition = await organization.createAppDefinition({
      name: 'Test createAppDefinition with secret param in CMA (delete if stale)',
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
    expect(appDefinition.name).toBe(
      'Test createAppDefinition with secret param in CMA (delete if stale)',
    )
    if (!appDefinition.parameters || !appDefinition.parameters.installation) {
      throw new Error(
        `appDefinition.parameters or appDefinition.parameters.installation is not defined`,
      )
    }
    expect(appDefinition.parameters.installation[0].id).toBe('secret')

    //cleanup
    await appDefinition.delete()
  })

  test('getAppDefinition', async () => {
    const appDefinition = await organization.createAppDefinition({
      name: 'Test getAppDefinition in CMA (delete if stale)',
      src: 'http://localhost:3000',
      locations: [
        {
          location: 'app-config',
        },
      ],
    })

    const fetchedAppDefinition = await organization.getAppDefinition(appDefinition.sys.id)

    expect(appDefinition.sys.id).toBe(fetchedAppDefinition.sys.id)

    //cleanup
    await appDefinition.delete()
  })

  test('getAppDefinitions', async () => {
    const appDefinitions = await organization.getAppDefinitions()

    expect(Array.isArray(appDefinitions.items)).toBeTruthy()
    expect(appDefinitions.sys.type).toBe('Array')
  })

  test('delete', async () => {
    const appDefinition = await organization.createAppDefinition({
      name: 'Test Delete AppDefinition in CMA (delete if stale)',
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
      name: 'Test Update AppDefinition in CMA (delete if stale)',
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

    //cleanup
    await appDefinition.delete()
  })

  test('getAppDefinition (top level)', async () => {
    const { orgId, appId } = await createAppDefinition()
    const appDefinition = await getAppDefinition(orgId, appId)

    expect(appDefinition.sys.organization.sys.id).toBe(orgId)
    expect(appDefinition.sys.id).toBe(appId)

    //cleanup
    await appDefinition.delete()
  })

  test('getInstallationsForOrg returns', async () => {
    const { orgId, appId } = await createAppDefinition()
    const appDefinition = await getAppDefinition(orgId, appId)
    const installationsForOrg = await appDefinition.getInstallationsForOrg()
    expect(installationsForOrg.sys.type).toBe('Array')

    //cleanup
    await appDefinition.delete()
  })

  test('getInstallationsForOrg returns installations', async () => {
    const { orgId, appId } = await createAppDefinition()
    const appInstallation: AppInstallation = await createAppInstallation(appId)
    const appDefinition = await getAppDefinition(orgId, appId)
    const appInstallationsForOrg = await appDefinition.getInstallationsForOrg()

    expect(appInstallationsForOrg.items.length).toBe(1)
    await appInstallation.delete()

    //cleanup
    await appDefinition.delete()
  })
})
