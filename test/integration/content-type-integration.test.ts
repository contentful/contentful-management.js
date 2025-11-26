import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import {
  defaultClient,
  createTestEnvironment,
  createTestSpace,
  generateRandomId,
  getDefaultSpace,
  timeoutToCalmRateLimiting,
} from '../helpers.js'
import type { Environment, ContentType, Space } from '../../lib/export-types.js'

describe('ContentType Api', () => {
  let readSpace: Space
  let readEnvironment: Environment
  let readContentType: ContentType
  let writeSpace: Space
  let writeEnvironment: Environment

  beforeAll(async () => {
    readSpace = await getDefaultSpace()
    readEnvironment = await readSpace.getEnvironment('master')
    readContentType = await readEnvironment.getContentType('vxVZs5JbhI9MwMupax3dm')

    writeSpace = await createTestSpace(defaultClient, 'ContentType')
    writeEnvironment = await createTestEnvironment(writeSpace, 'Testing Environment')
  })

  afterAll(async () => {
    if (writeSpace) {
      await writeSpace.delete()
    }
    await timeoutToCalmRateLimiting()
  })

  describe('read', () => {
    it('Gets content type', async () => {
      const response = await readEnvironment.getContentType(readContentType.sys.id)
      expect(response.sys).toBeTruthy()
      expect(response.name).toBeTruthy()
      expect(response.fields).toBeTruthy()
    })

    it('Gets ContentType snapshots', async () => {
      const contentType = await readEnvironment.getContentType(readContentType.sys.id)
      const response = await contentType.getSnapshots()
      expect(response).toBeTruthy()
      expect(response.items).toBeTruthy()
    })

    it('Gets content types', async () => {
      const response = await readEnvironment.getContentTypes()
      expect(response.items).toBeTruthy()
    })
  })

  describe('write', () => {
    it('Create, update, publish, getEditorInterface, unpublish and delete content type', async () => {
      const contentType = await writeEnvironment.createContentType({ name: 'testentity' })

      expect(contentType.isDraft()).toBeTruthy()
      expect(contentType.sys.type).toBe('ContentType')
      expect(contentType.name).toBe('testentity')

      const publishedContentType = await contentType.publish()
      expect(publishedContentType.isPublished()).toBeTruthy()

      publishedContentType.fields = [
        {
          id: 'field',
          name: 'field',
          type: 'Text',
        },
        {
          id: 'field2delete',
          name: 'field2delete',
          type: 'Text',
        },
        {
          id: 'multiRefXSpace',
          name: 'multiRefXSpace',
          type: 'Array',
          items: {
            type: 'ResourceLink',
            validations: [],
          },
          allowedResources: [
            {
              type: 'Contentful:Entry',
              source: 'crn:contentful:::content:spaces/bkg4k0bz2fhq',
              contentTypes: ['textBlock'],
            },
          ],
        },
      ]

      const tryContentType = await publishedContentType.update()
      expect(tryContentType.isUpdated()).toBeTruthy()

      const updatedContentType = await tryContentType.publish()
      expect(updatedContentType.isUpdated()).toBeFalsy()
      expect(updatedContentType.fields[0].id).toBe('field')
      expect(updatedContentType.fields[1].id).toBe('field2delete')
      expect(updatedContentType.fields[2].id).toBe('multiRefXSpace')

      const deletedFieldContentType = await updatedContentType.omitAndDeleteField('field2delete')
      expect(
        deletedFieldContentType.fields.filter((field) => field.id === 'field2delete'),
      ).toHaveLength(0)

      expect(deletedFieldContentType.getEditorInterface).toBeTruthy()

      const publishedAgainContentType = await deletedFieldContentType.publish()
      const editorInterface = await publishedAgainContentType.getEditorInterface()

      expect(editorInterface.controls).toBeTruthy()
      expect(editorInterface.sys).toBeTruthy()

      await editorInterface.update()

      const unpublishedContentType = await updatedContentType.unpublish()
      expect(unpublishedContentType.isDraft()).toBeTruthy()

      await unpublishedContentType.delete()
    })

    it('Create with id and delete content type', async () => {
      const id = generateRandomId('testCT')
      const contentType = await writeEnvironment.createContentTypeWithId(id, {
        name: 'testentitywithid',
      })

      expect(contentType.sys.id).toBe(id)
      expect(contentType.sys.type).toBe('ContentType')
      expect(contentType.name).toBe('testentitywithid')

      await contentType.delete()
    })
  })
})
