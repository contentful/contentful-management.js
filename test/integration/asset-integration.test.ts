const TEST_IMAGE_SOURCE_URL =
  'https://raw.githubusercontent.com/contentful/contentful-management.js/master/test/integration/fixtures/shiba-stuck-bush.jpg'

import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import {
  initClient,
  getDefaultSpace,
  createTestSpace,
  timeoutToCalmRateLimiting,
  initPlainClient,
  getTestOrganizationId,
} from '../helpers'
import type { ConceptProps, Environment, PlainClientAPI, Space } from '../../lib/export-types'
import { TestDefaults } from '../defaults'

describe('Asset API - Read', () => {
  let space: Space
  let environment: Environment

  beforeAll(async () => {
    space = await getDefaultSpace()
    environment = await space.getEnvironment('master')
  })

  test('Gets assets with only images', async () => {
    const response = await environment.getAssets({
      mimetype_group: 'image',
    })
    expect(response.items[0].fields.file['en-US'].contentType).toMatch(/image/)
  })

  test('Gets asset', async () => {
    const response = await environment.getAsset('1x0xpXu4pSGS4OukSyWGUK')
    expect(response.sys).toBeTruthy()
    expect(response.fields).toBeTruthy()
  })

  test('Gets assets', async () => {
    const response = await environment.getAssets()
    expect(response.items).toBeTruthy()
  })

  test('Gets published assets', async () => {
    const response = await environment.getPublishedAssets()
    expect(response.items).toBeTruthy()
  })

  test('Gets assets cursor', async () => {
    const response = await environment.getAssets({ cursor: true, limit: 1 })
    expect(response.items).toBeTruthy()
    expect(response.pages?.next).to.be.string
  })

  test('Gets published assets cursor', async () => {
    const response = await environment.getPublishedAssets({ cursor: true, limit: 1 })
    expect(response.items).toBeTruthy()
    expect(response.pages?.next).to.be.string
  })
})

describe('read plainClientApi', () => {
  const createEntryClient = initPlainClient({
    environmentId: TestDefaults.environmentId,
    spaceId: TestDefaults.spaceId,
  })

  test('getMany cursor', async () => {
    const response = await createEntryClient.asset.getMany({ query: { cursor: true, limit: 1 } })
    expect(response.items).lengthOf(1)
    expect(response.pages?.next).to.be.string
  })

  test('getMany published cursor', async () => {
    const response = await createEntryClient.asset.getPublished({
      query: {
        cursor: true,
        limit: 1,
      },
    })

    expect(response.items).lengthOf(1)
    expect(response.pages?.next).to.be.string
  })
})

describe('Asset API - Write', { concurrent: true }, () => {
  let space: Space
  let environment: Environment

  beforeAll(async () => {
    space = await createTestSpace(initClient({ retryOnError: false }), 'Assets')
    environment = await space.getEnvironment('master')
    await environment.createLocale({
      name: 'German (Germany)',
      code: 'de-DE',
      fallbackCode: 'en-US',
    })
  })

  afterAll(async () => {
    if (space) {
      await space.delete()
    }
    await timeoutToCalmRateLimiting()
  })

  test('Create, process, update, publish, unpublish, archive, unarchive and delete asset', async () => {
    const asset = await environment.createAsset({
      fields: {
        title: { 'en-US': 'this is the title' },
        file: {
          'en-US': {
            contentType: 'image/jpeg',
            fileName: 'shiba-stuck.jpg',
            upload: TEST_IMAGE_SOURCE_URL,
          },
        },
      },
    })
    expect(asset.fields.title['en-US']).toBe('this is the title')

    const processedAsset = await asset.processForLocale('en-US', { processingCheckWait: 10000 })
    expect(asset.isDraft()).toBe(true)
    expect(processedAsset.fields.file['en-US'].url).toBeTruthy()

    const publishedAsset = await processedAsset.publish()
    expect(publishedAsset.isPublished()).toBe(true)

    publishedAsset.fields.title['en-US'] = 'title has changed'
    const updatedAsset = await publishedAsset.update()
    expect(updatedAsset.isUpdated()).toBe(true)
    expect(updatedAsset.fields.title['en-US']).toBe('title has changed')

    const unpublishedAsset = await updatedAsset.unpublish()
    expect(unpublishedAsset.isDraft()).toBe(true)

    const archivedAsset = await unpublishedAsset.archive()
    expect(archivedAsset.isArchived()).toBe(true)

    const unarchivedAsset = await archivedAsset.unarchive()
    expect(unarchivedAsset.isArchived()).toBe(false)
    expect(unarchivedAsset.isDraft()).toBe(true)

    await unarchivedAsset.delete()
  })

  test('Create and process asset with multiple locales', async () => {
    const asset = await environment.createAsset({
      fields: {
        title: { 'en-US': 'this is the title' },
        file: {
          'en-US': {
            contentType: 'image/jpeg',
            fileName: 'shiba-stuck.jpg',
            upload: TEST_IMAGE_SOURCE_URL,
          },
          'de-DE': {
            contentType: 'image/jpeg',
            fileName: 'shiba-stuck.jpg',
            upload: TEST_IMAGE_SOURCE_URL,
          },
        },
      },
    })

    const processedAsset = await asset.processForAllLocales({ processingCheckWait: 5000 })
    expect(processedAsset.fields.file['en-US'].url).toBeTruthy()
    expect(processedAsset.fields.file['de-DE'].url).toBeTruthy()
  })

  test('Upload and process asset from files with multiple locales', async () => {
    const asset = await environment.createAssetFromFiles({
      fields: {
        title: { 'en-US': 'SVG upload test' },
        description: { 'en-US': '' },
        file: {
          'en-US': {
            contentType: 'image/svg+xml',
            fileName: 'blue-square.svg',
            file: '<svg xmlns="http://www.w3.org/2000/svg"><path fill="blue" d="M50 50h150v50H50z"/></svg>',
          },
          'de-DE': {
            contentType: 'image/svg+xml',
            fileName: 'red-square.svg',
            file: '<svg xmlns="http://www.w3.org/2000/svg"><path fill="red" d="M50 50h150v50H50z"/></svg>',
          },
        },
      },
    })

    const processedAsset = await asset.processForAllLocales({ processingCheckWait: 5000 })
    expect(processedAsset.fields.file['en-US'].url).toBeTruthy()
    expect(processedAsset.fields.file['de-DE'].url).toBeTruthy()
  })

  test.skip('Upload and process asset from files with multiple locales in non-master environment', async () => {
    environment = await space.createEnvironment({ name: 'Asset Processing Non-Master' })
    const asset = await environment.createAssetFromFiles({
      fields: {
        title: { 'en-US': 'SVG upload test' },
        description: { 'en-US': '' },
        file: {
          'en-US': {
            contentType: 'image/svg+xml',
            fileName: 'blue-square.svg',
            file: '<svg xmlns="http://www.w3.org/2000/svg"><path fill="blue" d="M50 50h150v50H50z"/></svg>',
          },
          'de-DE': {
            contentType: 'image/svg+xml',
            fileName: 'red-square.svg',
            file: '<svg xmlns="http://www.w3.org/2000/svg"><path fill="red" d="M50 50h150v50H50z"/></svg>',
          },
        },
      },
    })
    const processedAsset = await asset.processForAllLocales({ processingCheckWait: 5000 })
    expect(processedAsset.fields.file['en-US'].url).toBeTruthy()
    expect(processedAsset.fields.file['de-DE'].url).toBeTruthy()
  })

  test('Upload and process asset with short custom timeout times out', async () => {
    await expect(
      environment.createAssetFromFiles(
        {
          fields: {
            title: { 'en-US': 'SVG upload test' },
            description: { 'en-US': '' },
            file: {
              'en-US': {
                contentType: 'image/svg+xml',
                fileName: 'blue-square.svg',
                file: '<svg xmlns="http://www.w3.org/2000/svg"><path fill="blue" d="M50 50h150v50H50z"/></svg>',
              },
            },
          },
        },
        {
          uploadTimeout: 1,
        },
      ),
    ).rejects.toThrow(Error)
  })

  describe('Taxonomy', () => {
    const conceptsToCleanUp: ConceptProps[] = []

    let plainClient: PlainClientAPI

    beforeAll(() => {
      plainClient = initPlainClient({
        organizationId: getTestOrganizationId(),
      })
    })

    afterAll(async () => {
      for (const conceptToBeDeleted of conceptsToCleanUp) {
        await plainClient.concept.delete({
          conceptId: conceptToBeDeleted.sys.id,
          version: conceptToBeDeleted.sys.version,
        })
      }
    })

    test('should create asset with concepts assigned when concepts provided', async () => {
      const newConcept = await plainClient.concept.create(
        {},
        {
          prefLabel: {
            'en-US': 'Concept to be assigned',
          },
        },
      )
      conceptsToCleanUp.push(newConcept)

      const createdAsset = await environment.createAsset({
        fields: {
          title: {
            'en-US': 'this is the title of a newly created asset with a concept assigned',
          },
          file: {
            'en-US': {
              contentType: 'image/jpeg',
              fileName: 'shiba-stuck.jpg',
              upload: TEST_IMAGE_SOURCE_URL,
            },
          },
        },
        metadata: {
          concepts: [
            {
              sys: {
                id: newConcept.sys.id,
                linkType: 'TaxonomyConcept',
                type: 'Link',
              },
            },
          ],
          tags: [],
        },
      })

      if (!createdAsset.metadata?.concepts) {
        throw new Error('created asset is missing metadata concepts')
      }
      expect(createdAsset.metadata.concepts).lengthOf(1)
      expect(createdAsset.metadata.concepts[0].sys.id).to.eq(newConcept.sys.id)
    })

    test('should update asset with concepts assigned when concepts are provided', async () => {
      const newConcept = await plainClient.concept.create(
        {},
        {
          prefLabel: {
            'en-US': 'Concept to be assigned',
          },
        },
      )
      conceptsToCleanUp.push(newConcept)

      const assetToUpdate = await environment.createAsset({
        fields: {
          title: { 'en-US': 'this asset should be updated with a concept assigned' },
          file: {
            'en-US': {
              contentType: 'image/jpeg',
              fileName: 'shiba-stuck.jpg',
              upload: TEST_IMAGE_SOURCE_URL,
            },
          },
        },
        // `metadata` intentionally omitted
      })
      if (!assetToUpdate.metadata?.concepts) {
        throw new Error('asset to update is missing metadata concepts')
      }
      expect(assetToUpdate.metadata.concepts).to.be.an('array').that.is.empty

      assetToUpdate.metadata = {
        concepts: [
          {
            sys: {
              id: newConcept.sys.id,
              linkType: 'TaxonomyConcept',
              type: 'Link',
            },
          },
        ],
        tags: [],
      }
      const updatedAsset = await assetToUpdate.update()
      if (!updatedAsset.metadata?.concepts) {
        throw new Error('asset to update is missing metadata concepts')
      }
      expect(updatedAsset.metadata.concepts).lengthOf(1)
      expect(updatedAsset.metadata.concepts[0].sys.id).to.eq(newConcept.sys.id)
    })

    test('should update asset with concepts removed when concepts already exist', async () => {
      const newConcept = await plainClient.concept.create(
        {},
        {
          prefLabel: {
            'en-US': 'Concept to be assigned',
          },
        },
      )
      conceptsToCleanUp.push(newConcept)
      const assetToDeleteConceptFrom = await environment.createAsset({
        fields: {
          title: { 'en-US': 'this is the title of an asset with a concept already assigned' },
          file: {
            'en-US': {
              contentType: 'image/jpeg',
              fileName: 'shiba-stuck.jpg',
              upload: TEST_IMAGE_SOURCE_URL,
            },
          },
        },
        metadata: {
          concepts: [
            {
              sys: {
                id: newConcept.sys.id,
                linkType: 'TaxonomyConcept',
                type: 'Link',
              },
            },
          ],
          tags: [],
        },
      })
      if (!assetToDeleteConceptFrom.metadata?.concepts) {
        throw new Error('asset to delete is missing metadata concepts')
      }
      expect(assetToDeleteConceptFrom.metadata.concepts).lengthOf(1)

      assetToDeleteConceptFrom.metadata.concepts = []
      const updatedAsset = await assetToDeleteConceptFrom.update()
      if (!updatedAsset.metadata?.concepts) {
        throw new Error('updated asset is missing metadata concepts')
      }

      expect(updatedAsset.metadata.concepts).to.be.an('array').that.is.empty
    })
  })
})
