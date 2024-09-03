import { test } from 'mocha'
import { readFileSync } from 'fs'
import { expect } from 'chai'
import { getTestOrganization, initPlainClient } from '../helpers'
import type { Organization } from '../../lib/entities/organization'
import type { AppDefinition } from '../../lib/entities/app-definition'
import type { AppUpload } from '../../lib/entities/app-upload'
import type { AppBundle } from '../../lib/entities/app-bundle'
import type { ResourceProvider, ResourceType, ResourceTypeProps } from '../../lib/export-types'

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
  let appUpload: AppUpload
  let appBundle: AppBundle
  let resourceProvider: ResourceProvider
  let resourceType: ResourceType
  let resourceTypePlain: ResourceTypeProps

  before(async () => {
    organization = (await getTestOrganization()) as Organization
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
  })

  afterEach(async () => {
    if (resourceType) {
      await resourceType.delete(organization.sys.id)
    }

    if (resourceTypePlain) {
      ;(await resourceProvider.getResourceType('resourceProvider:resourceTypeId')).delete(
        organization.sys.id
      )
    }
  })

  after(async () => {
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

  test('create ResourceType', async () => {
    resourceType = await resourceProvider.upsertResourceType('resourceProvider:resourceTypeId', {
      name: 'resourceType',
      defaultFieldMapping: {
        title: 'title',
      },
    })

    expect(resourceType.sys.id).to.equal('resourceProvider:resourceTypeId')
    expect(resourceType.name).to.equal('resourceType')
  })

  test('update ResourceType', async () => {
    resourceType = await resourceProvider.upsertResourceType('resourceProvider:resourceTypeId', {
      name: 'resourceType',
      defaultFieldMapping: {
        title: 'title',
      },
    })

    resourceType.name = 'updatedResourceType'

    const updatedResourceType = await resourceType.upsert(organization.sys.id)

    expect(updatedResourceType.sys.id).to.equal('resourceProvider:resourceTypeId')
    expect(updatedResourceType.name).to.equal('updatedResourceType')
  })

  test('get ResourceType', async () => {
    await resourceProvider.upsertResourceType('resourceProvider:resourceTypeId', {
      name: 'resourceType',
      defaultFieldMapping: {
        title: 'title',
      },
    })

    resourceType = await resourceProvider.getResourceType('resourceProvider:resourceTypeId')

    expect(resourceType.sys.id).to.equal('resourceProvider:resourceTypeId')
    expect(resourceType.name).to.equal('resourceType')
  })

  test('delete ResourceType', async () => {
    const resourceType = await resourceProvider.upsertResourceType(
      'resourceProvider:resourceTypeId',
      {
        name: 'resourceType',
        defaultFieldMapping: {
          title: 'title',
        },
      }
    )

    await resourceType.delete(organization.sys.id)

    await expect(
      resourceProvider.getResourceType('resourceProvider:resourceTypeId')
    ).to.be.rejectedWith('The resource could not be found')
  })

  describe('PlainClient', async () => {
    const plainClient = initPlainClient()
    test('create ResourceType', async () => {
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
        }
      )

      expect(resourceTypePlain.sys.id).to.equal('resourceProvider:resourceTypeId')
      expect(resourceTypePlain.name).to.equal('resourceType')
    })

    test('update ResourceType', async () => {
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
        }
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
        }
      )

      expect(updatedResourceType.sys.id).to.equal('resourceProvider:resourceTypeId')
      expect(updatedResourceType.name).to.equal('updatedResourceType')
    })

    test('get ResourceType', async () => {
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
        }
      )

      resourceTypePlain = await plainClient.resourceType.get({
        organizationId: organization.sys.id,
        appDefinitionId: appDefinition.sys.id,
        resourceTypeId: 'resourceProvider:resourceTypeId',
      })

      expect(resourceTypePlain.sys.id).to.equal('resourceProvider:resourceTypeId')
      expect(resourceTypePlain.name).to.equal('resourceType')
    })

    test('delete ResourceType', async () => {
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
        }
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
        })
      ).to.be.rejectedWith('The resource could not be found')
    })
  })
})
