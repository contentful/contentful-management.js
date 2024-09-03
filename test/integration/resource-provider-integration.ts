import { test } from 'mocha'
import { readFileSync } from 'fs'
import { expect } from 'chai'
import { getTestOrganization, initPlainClient } from '../helpers'
import type { Organization } from '../../lib/entities/organization'
import type { AppDefinition } from '../../lib/entities/app-definition'
import type { AppUpload } from '../../lib/entities/app-upload'
import type { AppBundle } from '../../lib/entities/app-bundle'

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
    organization = (await getTestOrganization()) as Organization
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
  })

  test('create ResourceProvider', async () => {
    const resourceProvider = await appDefinition.upsertResourceProvider({
      sys: { id: 'test' },
      type: 'function',
      function: { sys: { id: functionManifest.id, type: 'Link', linkType: 'Function' } },
    })

    expect(resourceProvider.sys.id).to.equal('test')
    expect(resourceProvider.type).to.equal('function')
    expect(resourceProvider.function.sys.id).to.equal(functionManifest.id)
  })

  test('update ResourceProvider', async () => {
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

    expect(updatedResourceProvider.sys.id).to.equal('test')
    expect(updatedResourceProvider.type).to.equal('function')
    expect(updatedResourceProvider.function.sys.id).to.equal(updateFunctionManifest.id)
  })

  test('get ResourceProvider', async () => {
    await appDefinition.upsertResourceProvider({
      sys: { id: 'test' },
      type: 'function',
      function: { sys: { id: functionManifest.id, type: 'Link', linkType: 'Function' } },
    })

    const resourceProvider = await appDefinition.getResourceProvider()

    expect(resourceProvider.sys.id).to.equal('test')
    expect(resourceProvider.type).to.equal('function')
    expect(resourceProvider.function.sys.id).to.equal(functionManifest.id)
  })

  test('delete ResourceProvider', async () => {
    const resourceProvider = await appDefinition.upsertResourceProvider({
      sys: { id: 'test' },
      type: 'function',
      function: { sys: { id: functionManifest.id, type: 'Link', linkType: 'Function' } },
    })

    await resourceProvider.delete()

    await expect(appDefinition.getResourceProvider()).to.be.rejectedWith(
      'The resource could not be found'
    )
  })

  test('upsertResourceType', async () => {
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

    expect(resourceType.sys.id).to.equal('test:resourceTypeId')
  })

  test('getResourceType', async () => {
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

    expect(resourceType.name).to.equal('resourceType')
  })

  describe('PlainClient', async () => {
    const plainClient = initPlainClient()
    test('create ResourceProvider', async () => {
      const resourceProvider = await plainClient.resourceProvider.upsert(
        { organizationId: organization.sys.id, appDefinitionId: appDefinition.sys.id },
        {
          sys: { id: 'test' },
          type: 'function',
          function: { sys: { id: functionManifest.id, type: 'Link', linkType: 'Function' } },
        }
      )

      expect(resourceProvider.sys.id).to.equal('test')
      expect(resourceProvider.type).to.equal('function')
      expect(resourceProvider.function.sys.id).to.equal(functionManifest.id)
    })

    test('update ResourceProvider', async () => {
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

      expect(updatedResourceProvider.sys.id).to.equal('test')
      expect(updatedResourceProvider.type).to.equal('function')
      expect(updatedResourceProvider.function.sys.id).to.equal(updateFunctionManifest.id)
    })

    test('get ResourceProvider', async () => {
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

      expect(resourceProvider.sys.id).to.equal('test')
      expect(resourceProvider.type).to.equal('function')
      expect(resourceProvider.function.sys.id).to.equal(functionManifest.id)
    })

    test('delete ResourceProvider', async () => {
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
      ).to.be.rejectedWith('The resource could not be found')
    })
  })
})
