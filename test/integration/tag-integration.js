import { expect } from 'chai'
import { after, afterEach, beforeEach, describe, it } from 'mocha'
import { client, generateRandomId } from '../helpers'

const suiteTags = []

function randomTagId() {
  const id = generateRandomId('test-tag')
  suiteTags.push(id)
  return id
}

async function createRandomTag(environment) {
  const tagId = randomTagId()
  const tagName = 'Tag ' + tagId
  return environment.createTag(tagId, tagName)
}

describe('Tags api', function () {
  this.timeout(20000)

  let environment

  beforeEach(async () => {
    const space = await client(true).getSpace('w6xueg32zr68')
    environment = await space.getEnvironment('master')
  })

  afterEach(async () => {
    const tags = await environment.getTags(0, 1000)
    const deleting = tags.items
      .filter((tag) => suiteTags.includes(tag.sys.id))
      .map((tag) => tag.delete())
    await Promise.all(deleting)
  })

  after(async () => {
    const tags = await environment.getTags(0, 1000)
    await Promise.all(tags.items.map((tag) => tag.delete()))
  })

  it('can create a tag', async () => {
    const tagId = randomTagId()
    const tagName = 'Tag ' + tagId
    const newTag = await environment.createTag(tagId, tagName)
    expect(newTag.name).to.eq(tagName)
  })

  it('can read a tag', async () => {
    const tagId = randomTagId()
    const tagName = 'createReadTagTest-' + tagId
    await environment.createTag(tagId, tagName)
    const result = await environment.getTag(tagId)
    expect(result.name).to.eq(tagName)
    expect(result.sys.id).to.eq(tagId)
  })

  it('can read multiple tags', async () => {
    const tagId = randomTagId()
    const tagName = 'createReadTagsTest-' + tagId

    for (let index = 0; index < 10; index++) {
      const id = `${tagId}-${index}`
      suiteTags.push(id)
      await environment.createTag(id, `${tagName} ${index}`)
    }

    const result = await environment.getTags()
    expect(result.items).to.have.lengthOf(10)
    const filteredResult = await environment.getTags({ limit: 2 })
    expect(filteredResult.items).to.have.lengthOf(2)
  })

  it('can update a tag', async () => {
    const tagId = randomTagId()
    const tagName = 'Tag ' + tagId
    const tag = await environment.createTag(tagId, tagName)
    const newTagName = 'createUpdateTagTest-' + randomTagId()
    tag.name = newTagName
    const result = await tag.update()
    expect(result.name).to.eq(newTagName)
    expect(result.sys.id).to.eq(tagId)
  })

  it('append a tag to an entity', async () => {
    const entity = await environment.createEntry('layout', { fields: {} })
    expect(entity.metadata.tags).to.have.lengthOf(0)
    const tag = await createRandomTag(environment)
    const tagLink = {
      sys: {
        type: 'Link',
        linkType: 'Tag',
        id: tag.sys.id,
      },
    }
    entity.metadata.tags.push(tagLink)
    const updatedEntity = await entity.update()
    expect(updatedEntity.metadata.tags).to.have.lengthOf(1)
    expect(updatedEntity.metadata.tags[0]).to.eql(tagLink)
    updatedEntity.metadata.tags = []
    const noTagsEntity = await updatedEntity.update()
    expect(noTagsEntity.metadata.tags).to.have.lengthOf(0)
  })
})
