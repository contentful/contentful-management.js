import { afterAll, beforeAll, describe, test, expect } from 'vitest'
import {
  defaultClient,
  createTestSpace,
  generateRandomId,
  waitForEnvironmentToBeReady,
  getTestOrganization,
  getDefaultSpace,
  timeoutToCalmRateLimiting,
} from '../helpers'
import { readFileSync } from 'fs'
import type {
  Space,
  Environment,
  Organization,
  AppDefinition,
  AppUpload,
  AppBundle,
  AppInstallation,
  ResourceProvider,
  ResourceType,
} from '../../lib/export-types'

describe('Environment Api', () => {
  let space: Space

  beforeAll(async () => {
    space = await createTestSpace(defaultClient, 'Environment')
  })

  afterAll(async () => {
    if (space) {
      await space.delete()
    }
  })

  test('creates an environment', async () => {
    const envName = 'test-env'

    const environment = await space.createEnvironment({ name: envName })
    await waitForEnvironmentToBeReady(space, environment)

    expect(environment.sys.type).toBe('Environment')
    expect(environment.name).toBe(envName)
  })

  test('creates an environment with an id', async () => {
    const envName = 'env-name'
    const envId = generateRandomId('env')

    const environment = await space.createEnvironmentWithId(envId, { name: envName })
    await waitForEnvironmentToBeReady(space, environment)

    expect(environment.sys.type).toBe('Environment')
    expect(environment.name).toBe(envName)
    expect(environment.sys.id).toBe(envId)
  })

  describe('With a NER app installed in the environment', () => {
    const functionManifest = {
      id: 'tmdbMockFunction',
      name: 'Mocked TMDB lookup function',
      description: 'This is a mocked example to help test Apps with ERL.',
      path: 'functions/index.js',
      allowNetworks: ['api.themoviedb.org'],
      accepts: ['resources.lookup', 'resources.search'],
    }

    let organization: Organization
    let appDefinition: AppDefinition
    let appUpload: AppUpload
    let appBundle: AppBundle
    let appInstallation: AppInstallation
    let resourceProvider: ResourceProvider
    let resourceType: ResourceType
    let env: Environment

    beforeAll(async () => {
      organization = await getTestOrganization()
      appDefinition = await organization.createAppDefinition({
        name: 'Test',
        src: 'http://localhost:2222',
        locations: [{ location: 'app-config' }],
        parameters: {
          installation: [
            {
              id: 'tmdbAccessToken',
              name: 'TMDB Read token',
              type: 'Symbol',
              required: true,
              default: 'Test',
            },
          ],
        },
      })

      appUpload = await organization.createAppUpload(
        readFileSync(`${__dirname}/fixtures/build.zip`),
      )
      appBundle = await appDefinition.createAppBundle({
        appUploadId: appUpload.sys.id,
        comment: 'Testing ResourceTypeCreation',
        functions: [functionManifest],
      })

      appDefinition.bundle = { sys: { id: appBundle.sys.id, type: 'Link', linkType: 'AppBundle' } }
      appDefinition.src = undefined

      appDefinition = await appDefinition.update()

      resourceProvider = await appDefinition.upsertResourceProvider({
        sys: { id: 'TMDB' },
        type: 'function',
        function: { sys: { id: functionManifest.id, type: 'Link', linkType: 'Function' } },
      })

      resourceType = await resourceProvider.upsertResourceType('TMDB:Movie', {
        name: 'Movie',
        defaultFieldMapping: {
          title: 'title',
        },
      })

      const defaultSpace = await getDefaultSpace()
      env = await defaultSpace.getEnvironment('master')
      appInstallation = await env.createAppInstallation(
        appDefinition.sys.id,
        {
          parameters: {
            tmdbAccessToken: 'test',
          },
        },
        { acceptAllTerms: true },
      )
    })

    afterAll(async () => {
      if (appInstallation) {
        await appInstallation.delete()
      }
      if (resourceType) {
        await resourceType.delete()
      }
      if (resourceProvider) {
        await resourceProvider.delete()
      }

      if (appUpload) {
        await appUpload.delete()
      }

      if (appDefinition) {
        await appDefinition.delete()
      }

      await timeoutToCalmRateLimiting()
    })

    test('gets all resource types for that environment', async () => {
      const resourceTypes = await env.getResourceTypes()

      expect(resourceTypes.items.length).toBe(2)
      expect(resourceTypes.items[0].sys.id).toBe('Contentful:Entry')
      expect(resourceTypes.items[1].sys.id).toBe('TMDB:Movie')
    })
  })
})
