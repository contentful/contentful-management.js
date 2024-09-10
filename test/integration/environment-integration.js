import { after, before, describe, test } from 'mocha'
import {
  initClient,
  createTestSpace,
  generateRandomId,
  waitForEnvironmentToBeReady,
  getTestOrganization,
  getDefaultSpace,
} from '../helpers'
import { expect } from 'chai'
import { readFileSync } from 'fs'

describe('Environment Api', function () {
  let space

  before(async () => {
    space = await createTestSpace(initClient(), 'Environment')
  })

  after(async () => {
    if (space) {
      return space.delete()
    }
  })

  test('creates an environment', async () => {
    const envName = 'test-env'

    const environment = await space.createEnvironment({ name: envName })
    await waitForEnvironmentToBeReady(space, environment)

    expect(environment.sys.type).equals('Environment', 'env is created')
    expect(environment.name).equals(envName, 'env is created with name')
  })

  test('creates an environment with an id', async () => {
    const envName = 'env-name'
    const envId = generateRandomId('env')

    const environment = await space.createEnvironmentWithId(envId, { name: envName })
    await waitForEnvironmentToBeReady(space, environment)

    expect(environment.sys.type).equals('Environment', 'env is created')
    expect(environment.name).equals(envName, 'env was created with correct name')
    expect(environment.sys.id).equals(envId, 'env was created with correct id')
  })

  describe('With a NER app installed in the environment', async () => {
    const functionManifest = {
      id: 'tmdbMockFunction',
      name: 'Mocked TMDB lookup function',
      description: 'This is a mocked example to help test Apps with ERL.',
      path: 'functions/index.js',
      allowNetworks: ['api.themoviedb.org'],
      accepts: ['resources.lookup', 'resources.search'],
    }

    let organization
    let appDefinition
    let appUpload
    let appBundle
    let appInstallation
    let resourceProvider
    let resourceType
    let env

    before(async () => {
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
        readFileSync(`${__dirname}/fixtures/build.zip`)
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

      const space = await getDefaultSpace()
      env = await space.getEnvironment('master')
      appInstallation = await env.createAppInstallation(
        appDefinition.sys.id,
        {
          parameters: {
            tmdbAccessToken: 'test',
          },
        },
        { acceptAllTerms: true }
      )
    })

    after(async () => {
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
    })

    test('gets all resource types for that environment', async () => {
      const resourceTypes = await env.getResourceTypes()

      expect(resourceTypes.items.length).equal(2)
      expect(resourceTypes.items[0].sys.id).equal('Contentful:Entry')
      expect(resourceTypes.items[1].sys.id).equal('TMDB:Movie')
    })

    test('gets all resources for a resource type in that environment', async () => {
      const resourceTypes = await env.getResourceTypes()
      const resources = await env.getResourcesForResourceType(resourceTypes.items[1].sys.id)

      expect(resources.items.length).equal(0)
    })
  })
})
