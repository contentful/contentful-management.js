const TEST_IMAGE_SOURCE_URL =
  'https://raw.githubusercontent.com/contentful/contentful-management.js/master/test/integration/fixtures/shiba-stuck-bush.jpg'

import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import { initClient, getDefaultSpace, createTestSpace } from '../helpers'
import type { Environment, Space } from '../../lib/contentful-management'

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
        }
      )
    ).rejects.toThrow(Error)
  })
})
