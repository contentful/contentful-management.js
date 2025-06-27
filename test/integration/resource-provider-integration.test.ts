import { describe, it, beforeEach, afterEach, expect, beforeAll } from 'vitest'
import { readFileSync } from 'fs'
import { getTestOrganization, initPlainClient, timeoutToCalmRateLimiting } from '../helpers.js'
import type { Organization } from '../../lib/entities/organization.js'
import type { AppDefinition } from '../../lib/entities/app-definition.js'
import type { AppUpload } from '../../lib/entities/app-upload.js'
import type { AppBundle } from '../../lib/entities/app-bundle.js'
import type { PlainClientAPI } from '../../lib/export-types.js'

describe('ResourceProvider API', () => {
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

  beforeEach(async () => {
    await timeoutToCalmRateLimiting()

    organization = await getTestOrganization()
    appDefinition = await organization.createAppDefinition({
      name: 'Test',
      src: 'http://localhost:2222',
      locations: [{ location: 'entry-sidebar' }],
    })

    appUpload = await organization.createAppUpload(readFileSync(`${__dirname}/fixtures/build.zip`))
    appBundle = await appDefinition.createAppBundle({
      appUploadId: appUpload.sys.id,
      comment: 'Testing ResourceProviderCreation',
      functions: [functionManifest],
    })

    appDefinition.bundle = { sys: { id: appBundle.sys.id, type: 'Link', linkType: 'AppBundle' } }
    appDefinition.src = undefined

    appDefinition = await appDefinition.update()
  })

  afterEach(async () => {
    const { items: appDefinitions } = await organization.getAppDefinitions()

    if (appUpload) {
      await appUpload.delete()
    }

    for await (const appDefinition of appDefinitions) {
      await appDefinition.delete()
    }

    await timeoutToCalmRateLimiting()
  })

  it('create ResourceProvider', async () => {
    const resourceProvider = await appDefinition.upsertResourceProvider({
      sys: { id: 'test' },
      type: 'function',
      function: { sys: { id: functionManifest.id, type: 'Link', linkType: 'Function' } },
    })

    expect(resourceProvider.sys.id).toBe('test')
    expect(resourceProvider.type).toBe('function')
    expect(resourceProvider.function.sys.id).toBe(functionManifest.id)
  })

  it('update ResourceProvider', async () => {
    const resourceProvider = await appDefinition.upsertResourceProvider({
      sys: { id: 'test' },
      type: 'function',
      function: { sys: { id: functionManifest.id, type: 'Link', linkType: 'Function' } },
    })

    const updateFunctionManifest = { ...functionManifest, id: 'testMock' }
    appBundle = await appDefinition.createAppBundle({
      appUploadId: appUpload.sys.id,
      comment: 'Testing ResourceProviderCreation',
      functions: [updateFunctionManifest],
    })

    appDefinition.bundle = { sys: { id: appBundle.sys.id, type: 'Link', linkType: 'AppBundle' } }
    appDefinition.src = undefined

    appDefinition = await appDefinition.update()

    resourceProvider.function.sys.id = updateFunctionManifest.id
    const updatedResourceProvider = await resourceProvider.upsert()

    expect(updatedResourceProvider.sys.id).toBe('test')
    expect(updatedResourceProvider.type).toBe('function')
    expect(updatedResourceProvider.function.sys.id).toBe(updateFunctionManifest.id)
  })

  it('get ResourceProvider', async () => {
    await appDefinition.upsertResourceProvider({
      sys: { id: 'test' },
      type: 'function',
      function: { sys: { id: functionManifest.id, type: 'Link', linkType: 'Function' } },
    })

    const resourceProvider = await appDefinition.getResourceProvider()

    expect(resourceProvider.sys.id).toBe('test')
    expect(resourceProvider.type).toBe('function')
    expect(resourceProvider.function.sys.id).toBe(functionManifest.id)
  })

  it('delete ResourceProvider', async () => {
    const resourceProvider = await appDefinition.upsertResourceProvider({
      sys: { id: 'test' },
      type: 'function',
      function: { sys: { id: functionManifest.id, type: 'Link', linkType: 'Function' } },
    })

    await resourceProvider.delete()

    await expect(appDefinition.getResourceProvider()).rejects.toThrow(
      'The resource could not be found'
    )
  })

  it('upsertResourceType', async () => {
    const resourceProvider = await appDefinition.upsertResourceProvider({
      sys: { id: 'test' },
      type: 'function',
      function: { sys: { id: functionManifest.id, type: 'Link', linkType: 'Function' } },
    })

    const resourceType = await resourceProvider.upsertResourceType('test:resourceTypeId', {
      name: 'resourceType',
      defaultFieldMapping: {
        title: 'title',
      },
    })

    expect(resourceType.sys.id).toBe('test:resourceTypeId')
  })

  it('getResourceType', async () => {
    const resourceProvider = await appDefinition.upsertResourceProvider({
      sys: { id: 'test' },
      type: 'function',
      function: { sys: { id: functionManifest.id, type: 'Link', linkType: 'Function' } },
    })

    await resourceProvider.upsertResourceType('test:resourceTypeId', {
      name: 'resourceType',
      defaultFieldMapping: {
        title: 'title',
      },
    })

    const resourceType = await resourceProvider.getResourceType('test:resourceTypeId')

    expect(resourceType.name).toBe('resourceType')
  })

  describe('PlainClient', () => {
    let plainClient: PlainClientAPI

    beforeAll(() => {
      plainClient = initPlainClient()
    })

    it('create ResourceProvider', async () => {
      const resourceProvider = await plainClient.resourceProvider.upsert(
        { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
        {
          sys: { id: 'test' },
          type: 'function',
          function: { sys: { id: functionManifest.id, type: 'Link', linkType: 'Function' } },
        }
      )

      expect(resourceProvider.sys.id).toBe('test')
      expect(resourceProvider.type).toBe('function')
      expect(resourceProvider.function.sys.id).toBe(functionManifest.id)
    })

    it('update ResourceProvider', async () => {
      await plainClient.resourceProvider.upsert(
        { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
        {
          sys: { id: 'test' },
          type: 'function',
          function: { sys: { id: functionManifest.id, type: 'Link', linkType: 'Function' } },
        }
      )

      const updateFunctionManifest = { ...functionManifest, id: 'testMock' }
      const newAppBundle = await plainClient.appBundle.create(
        { appDefinitionId: appDefinition.sys.id, organizationId: organization.sys.id },
        {
          appUploadId: appUpload.sys.id,
          comment: 'Testing ResourceProviderCreation',
          functions: [updateFunctionManifest],
        }
      )

      await plainClient.appDefinition.update(
        { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
        {
          sys: appDefinition.sys,
          name: 'Testing ResourceProviderCreation',
          locations: [{ location: 'entry-sidebar' }],
          src: undefined,
          bundle: { sys: { id: newAppBundle.sys.id, type: 'Link', linkType: 'AppBundle' } },
        }
      )
      const updatedResourceProvider = await plainClient.resourceProvider.upsert(
        { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
        {
          sys: { id: 'test' },
          type: 'function',
          function: { sys: { id: updateFunctionManifest.id, type: 'Link', linkType: 'Function' } },
        }
      )

      expect(updatedResourceProvider.sys.id).toBe('test')
      expect(updatedResourceProvider.type).toBe('function')
      expect(updatedResourceProvider.function.sys.id).toBe(updateFunctionManifest.id)
    })

    it('get ResourceProvider', async () => {
      await plainClient.resourceProvider.upsert(
        { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
        {
          sys: { id: 'test' },
          type: 'function',
          function: { sys: { id: functionManifest.id, type: 'Link', linkType: 'Function' } },
        }
      )

      const resourceProvider = await plainClient.resourceProvider.get({
        organizationId: organization.sys.id,
        appDefinitionId: appDefinition.sys.id,
      })

      expect(resourceProvider.sys.id).toBe('test')
      expect(resourceProvider.type).toBe('function')
      expect(resourceProvider.function.sys.id).toBe(functionManifest.id)
    })

    it('delete ResourceProvider', async () => {
      await plainClient.resourceProvider.upsert(
        { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
        {
          sys: { id: 'test' },
          type: 'function',
          function: { sys: { id: functionManifest.id, type: 'Link', linkType: 'Function' } },
        }
      )

      await plainClient.resourceProvider.delete({
        organizationId: organization.sys.id,
        appDefinitionId: appDefinition.sys.id,
      })

      await expect(
        plainClient.resourceProvider.get({
          organizationId: organization.sys.id,
          appDefinitionId: appDefinition.sys.id,
        })
      ).rejects.toThrow('The resource could not be found')
    })
  })
})
