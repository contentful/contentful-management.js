import { describe, it, beforeAll, beforeEach, afterEach, afterAll, expect } from 'vitest'
import { readFileSync } from 'fs'
import { getTestOrganization, initPlainClient, timeoutToCalmRateLimiting } from '../helpers.js'
import type { Organization } from '../../lib/entities/organization.js'
import type { AppDefinition } from '../../lib/entities/app-definition.js'
import type { AppUpload } from '../../lib/entities/app-upload.js'
import type { AppBundle } from '../../lib/entities/app-bundle.js'
import type {
  AppInstallationProps,
  PlainClientAPI,
  ResourceProvider,
  ResourceType,
  ResourceTypeProps,
} from '../../lib/export-types.js'
import { TestDefaults } from '../defaults.js'

describe('ResourceType API', () => {
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
  let appDefinitionNoProvider: AppDefinition
  let appUpload: AppUpload
  let appBundle: AppBundle
  let resourceProvider: ResourceProvider
  let resourceType: ResourceType | null
  let resourceTypePlain: ResourceTypeProps | null
  let appInstallationPlain: AppInstallationProps | null
  let plainClient: PlainClientAPI

  beforeAll(async () => {
    organization = await getTestOrganization()
    appDefinition = await organization.createAppDefinition({
      name: 'Test',
      src: 'http://localhost:2222',
      locations: [{ location: 'entry-sidebar' }],
    })

    appUpload = await organization.createAppUpload(readFileSync(`${__dirname}/fixtures/build.zip`))
    appBundle = await appDefinition.createAppBundle({
      appUploadId: appUpload.sys.id,
      comment: 'Testing ResourceTypeCreation',
      functions: [functionManifest],
    })

    appDefinition.bundle = { sys: { id: appBundle.sys.id, type: 'Link', linkType: 'AppBundle' } }
    appDefinition.src = undefined

    appDefinition = await appDefinition.update()

    resourceProvider = await appDefinition.upsertResourceProvider({
      sys: { id: 'resourceProvider' },
      type: 'function',
      function: { sys: { id: functionManifest.id, type: 'Link', linkType: 'Function' } },
    })

    appDefinitionNoProvider = await organization.createAppDefinition({
      name: 'TestNoProvider',
      src: 'http://localhost:2222',
      locations: [{ location: 'entry-sidebar' }],
    })

    plainClient = initPlainClient()
  })

  beforeEach(() => {
    resourceType = null
    resourceTypePlain = null
    appInstallationPlain = null
  })

  afterEach(async () => {
    if (appInstallationPlain) {
      await plainClient.appInstallation.delete({
        appDefinitionId: appDefinition.sys.id,
        environmentId: TestDefaults.environmentId,
        spaceId: TestDefaults.spaceId,
      })
    }
    if (resourceType) {
      await resourceType.delete()
    }

    if (resourceTypePlain) {
      await (await resourceProvider.getResourceType('resourceProvider:resourceTypeId')).delete()
    }
  })

  afterAll(async () => {
    if (resourceProvider) {
      await resourceProvider.delete()
    }

    if (appUpload) {
      await appUpload.delete()
    }

    if (appDefinition) {
      await appDefinition.delete()
    }

    if (appDefinitionNoProvider) {
      await appDefinitionNoProvider.delete()
    }

    await timeoutToCalmRateLimiting()
  })

  it('create ResourceType', async () => {
    resourceType = await resourceProvider.upsertResourceType('resourceProvider:resourceTypeId', {
      name: 'resourceType',
      defaultFieldMapping: {
        title: 'title',
      },
    })

    expect(resourceType.sys.id).toBe('resourceProvider:resourceTypeId')
    expect(resourceType.name).toBe('resourceType')
  })

  it('update ResourceType', async () => {
    resourceType = await resourceProvider.upsertResourceType('resourceProvider:resourceTypeId', {
      name: 'resourceType',
      defaultFieldMapping: {
        title: 'title',
      },
    })

    resourceType.name = 'updatedResourceType'

    const updatedResourceType = await resourceType.upsert()

    expect(updatedResourceType.sys.id).toBe('resourceProvider:resourceTypeId')
    expect(updatedResourceType.name).toBe('updatedResourceType')
  })

  it('get ResourceType', async () => {
    await resourceProvider.upsertResourceType('resourceProvider:resourceTypeId', {
      name: 'resourceType',
      defaultFieldMapping: {
        title: 'title',
      },
    })

    resourceType = await resourceProvider.getResourceType('resourceProvider:resourceTypeId')

    expect(resourceType.sys.id).toBe('resourceProvider:resourceTypeId')
    expect(resourceType.name).toBe('resourceType')
  })

  it('get ResourceTypes', async () => {
    await resourceProvider.upsertResourceType('resourceProvider:resourceTypeId', {
      name: 'resourceType',
      defaultFieldMapping: {
        title: 'title',
      },
    })

    const response = await resourceProvider.getResourceTypes()
    resourceType = response.items[0]

    expect(resourceType.sys.id).toBe('resourceProvider:resourceTypeId')
    expect(resourceType.name).toBe('resourceType')
  })

  it('delete ResourceType', async () => {
    const resourceType = await resourceProvider.upsertResourceType(
      'resourceProvider:resourceTypeId',
      {
        name: 'resourceType',
        defaultFieldMapping: {
          title: 'title',
        },
      },
    )

    await resourceType.delete()

    await expect(
      resourceProvider.getResourceType('resourceProvider:resourceTypeId'),
    ).rejects.toThrow('The resource could not be found')
  })

  describe('PlainClient', () => {
    it('create ResourceType', async () => {
      resourceTypePlain = await plainClient.resourceType.upsert(
        {
          organizationId: organization.sys.id,
          appDefinitionId: appDefinition.sys.id,
          resourceTypeId: 'resourceProvider:resourceTypeId',
        },
        {
          name: 'resourceType',
          defaultFieldMapping: {
            title: 'title',
          },
        },
      )

      expect(resourceTypePlain?.sys.id).toBe('resourceProvider:resourceTypeId')
      expect(resourceTypePlain?.name).toBe('resourceType')
    })

    it('creating ResourceType without Provider fails', async () => {
      await expect(
        plainClient.resourceType.upsert(
          {
            organizationId: organization.sys.id,
            appDefinitionId: appDefinitionNoProvider.sys.id,
            resourceTypeId: 'resourceProvider:resourceTypeId',
          },
          {
            name: 'resourceType',
            defaultFieldMapping: {
              title: 'title',
            },
          },
        ),
      ).rejects.toThrow('The resource could not be found')
    })

    it('update ResourceType', async () => {
      resourceTypePlain = await plainClient.resourceType.upsert(
        {
          organizationId: organization.sys.id,
          appDefinitionId: appDefinition.sys.id,
          resourceTypeId: 'resourceProvider:resourceTypeId',
        },
        {
          name: 'resourceType',
          defaultFieldMapping: {
            title: 'title',
          },
        },
      )

      const updatedResourceType = await plainClient.resourceType.upsert(
        {
          organizationId: organization.sys.id,
          appDefinitionId: appDefinition.sys.id,
          resourceTypeId: 'resourceProvider:resourceTypeId',
        },
        {
          name: 'updatedResourceType',
          defaultFieldMapping: {
            title: 'title',
          },
        },
      )

      expect(updatedResourceType.sys.id).toBe('resourceProvider:resourceTypeId')
      expect(updatedResourceType.name).toBe('updatedResourceType')
    })

    it('get ResourceType', async () => {
      await plainClient.resourceType.upsert(
        {
          organizationId: organization.sys.id,
          appDefinitionId: appDefinition.sys.id,
          resourceTypeId: 'resourceProvider:resourceTypeId',
        },
        {
          name: 'resourceType',
          defaultFieldMapping: {
            title: 'title',
          },
        },
      )

      resourceTypePlain = await plainClient.resourceType.get({
        organizationId: organization.sys.id,
        appDefinitionId: appDefinition.sys.id,
        resourceTypeId: 'resourceProvider:resourceTypeId',
      })

      expect(resourceTypePlain?.sys.id).toBe('resourceProvider:resourceTypeId')
      expect(resourceTypePlain?.name).toBe('resourceType')
    })

    it('get many ResourceTypes', async () => {
      await plainClient.resourceType.upsert(
        {
          organizationId: organization.sys.id,
          appDefinitionId: appDefinition.sys.id,
          resourceTypeId: 'resourceProvider:resourceTypeId',
        },
        {
          name: 'resourceType',
          defaultFieldMapping: {
            title: 'title',
          },
        },
      )

      const response = await plainClient.resourceType.getMany({
        organizationId: organization.sys.id,
        appDefinitionId: appDefinition.sys.id,
      })

      resourceTypePlain = response.items[0]

      expect(resourceTypePlain?.sys.id).toBe('resourceProvider:resourceTypeId')
      expect(resourceTypePlain?.name).toBe('resourceType')
    })

    it('getForEnvironment ResourceType', async () => {
      resourceTypePlain = await plainClient.resourceType.upsert(
        {
          organizationId: organization.sys.id,
          appDefinitionId: appDefinition.sys.id,
          resourceTypeId: 'resourceProvider:resourceTypeId',
        },
        {
          name: 'resourceType',
          defaultFieldMapping: {
            title: 'title',
          },
        },
      )

      const { spaceId, environmentId } = TestDefaults
      appInstallationPlain = await plainClient.appInstallation.upsert(
        { spaceId, environmentId, appDefinitionId: appDefinition.sys.id },
        { parameters: { tmdbAccessToken: 'testing' } },
        { acceptAllTerms: true },
      )

      const resourceTypesPlain = await plainClient.resourceType.getForEnvironment({
        spaceId,
        environmentId,
      })

      expect(resourceTypesPlain.items.length).toBe(2)
      expect(resourceTypesPlain.items[0].sys.id).toBe('Contentful:Entry')
      expect(resourceTypesPlain.items[1].sys.id).toBe('resourceProvider:resourceTypeId')
    })

    it('getMany returns empty array if no Resource Types are present', async () => {
      const response = await plainClient.resourceType.getMany({
        organizationId: organization.sys.id,
        appDefinitionId: appDefinition.sys.id,
      })

      expect(response.items).toBeInstanceOf(Array)
      expect(response.items).toHaveLength(0)
    })

    it('delete ResourceType', async () => {
      await plainClient.resourceType.upsert(
        {
          organizationId: organization.sys.id,
          appDefinitionId: appDefinition.sys.id,
          resourceTypeId: 'resourceProvider:resourceTypeId',
        },
        {
          name: 'resourceType',
          defaultFieldMapping: {
            title: 'title',
          },
        },
      )

      await plainClient.resourceType.delete({
        organizationId: organization.sys.id,
        appDefinitionId: appDefinition.sys.id,
        resourceTypeId: 'resourceProvider:resourceTypeId',
      })

      await expect(
        plainClient.resourceType.get({
          organizationId: organization.sys.id,
          appDefinitionId: appDefinition.sys.id,
          resourceTypeId: 'resourceProvider:resourceTypeId',
        }),
      ).rejects.toThrow('The resource could not be found')
    })
  })
})
