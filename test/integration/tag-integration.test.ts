import { describe, it, beforeAll, afterAll, afterEach } from 'vitest'
import { expect } from 'vitest'
import {
  defaultClient,
  generateRandomId,
  createTestSpace,
  timeoutToCalmRateLimiting,
} from '../helpers.js'
import type { Space, Environment, Tag, Link } from '../../lib/export-types.js'

function randomTagId(): string {
  return generateRandomId('test-tag')
}

async function createRandomTag(environment: Environment): Promise<Tag> {
  const tagId = randomTagId()
  const tagName = 'Tag ' + tagId
  return environment.createTag(tagId, tagName)
}

describe('Tags API', () => {
  let space: Space
  let environment: Environment

  beforeAll(async () => {
    space = await createTestSpace(defaultClient, 'Tags Api')
    environment = await space.getEnvironment('master')
  })

  afterEach(async () => {
    const tags = await environment.getTags({ limit: 1000 })
    const deleting = tags.items.map((tag) => tag.delete())
    await Promise.allSettled(deleting)
  })

  afterAll(async () => {
    await space.delete()

    await timeoutToCalmRateLimiting()
  })

  it('can create a tag with default visibility of "private"', async () => {
    const tagId = randomTagId()
    const tagName = 'Tag ' + tagId
    const newTag = await environment.createTag(tagId, tagName)
    expect(newTag.name).toBe(tagName)
    expect(newTag.sys.visibility).toBe('private')
  })

  it('can create a tag with explicit visibility of "public"', async () => {
    const tagId = randomTagId()
    const tagName = 'Tag ' + tagId
    const newTag = await environment.createTag(tagId, tagName, 'public')
    expect(newTag.name).toBe(tagName)
    expect(newTag.sys.visibility).toBe('public')
  })

  it('can read a tag', async () => {
    const tagId = randomTagId()
    const tagName = 'createReadTagTest-' + tagId
    await environment.createTag(tagId, tagName)
    const result = await environment.getTag(tagId)
    expect(result.name).toBe(tagName)
    expect(result.sys.id).toBe(tagId)
  })

  it('can read multiple tags', async () => {
    const tagId = randomTagId()
    const tagName = 'createReadTagsTest-' + tagId

    for (let index = 0; index < 10; index++) {
      const id = `${tagId}-${index}`
      await environment.createTag(id, `${tagName} ${index}`)
    }

    const result = await environment.getTags()
    expect(result.items.length).toBe(10)

    const filteredResult = await environment.getTags({ limit: 2 })
    expect(filteredResult.items.length).toBe(2)
  })

  it('can update a tag', async () => {
    const tagId = randomTagId()
    const tagName = 'Tag ' + tagId
    const tag = await environment.createTag(tagId, tagName)
    const newTagName = 'createUpdateTagTest-' + randomTagId()
    tag.name = newTagName
    const result = await tag.update()
    expect(result.name).toBe(newTagName)
    expect(result.sys.id).toBe(tagId)
  })

  it('can append a tag to an entity', async () => {
    const contentType = await environment.createContentTypeWithId('layout', {
      name: 'testCT',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Text',
          localized: false,
          required: false,
        },
      ],
    })
    await contentType.publish()

    const entity = await environment.createEntry('layout', { fields: {} })
    expect(entity.metadata?.tags.length).toBe(0)

    const tag = await createRandomTag(environment)
    const tagLink: Link<'Tag'> = {
      sys: {
        type: 'Link',
        linkType: 'Tag',
        id: tag.sys.id,
      },
    }

    if (!entity.metadata) {
      throw new Error('entity.metadata must be defined')
    }
    entity.metadata.tags.push(tagLink)
    const updatedEntity = await entity.update()
    if (!updatedEntity.metadata) {
      throw new Error('updatedEntity.metadata must be defined')
    }
    expect(updatedEntity.metadata.tags.length).toBe(1)
    expect(updatedEntity.metadata.tags[0]).toEqual(tagLink)

    updatedEntity.metadata.tags = []
    const noTagsEntity = await updatedEntity.update()
    if (!noTagsEntity.metadata) {
      throw new Error('noTagsEntity.metadata must be defined')
    }
    expect(noTagsEntity.metadata.tags.length).toBe(0)
  })
})
