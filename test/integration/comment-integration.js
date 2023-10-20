import { expect } from 'chai'
import { before, describe, test, after } from 'mocha'
import { initClient, createTestEnvironment, createTestSpace, initPlainClient } from '../helpers'

describe('Comment Api', () => {
  let plainClient
  let space
  let environment
  let contentType
  let entry
  const commentBody = 'JS SDK Comment Integration Test'

  before(async () => {
    plainClient = initPlainClient()
    space = await createTestSpace(initClient(), 'Comment')
    environment = await createTestEnvironment(space, 'Comment Testing Environment')
    contentType = await environment.createContentType({ name: 'Content Type' })
    await contentType.publish()
    entry = await environment.createEntry(contentType.sys.id, { fields: {} })
  })

  after(async () => {
    if (space) {
      return space.delete()
    }
  })

  describe('Entry comment', () => {
    test('Get comments', async () => {
      const {
        sys: { id },
      } = await entry.createComment({
        body: commentBody,
      })

      const response = await entry.getComments()
      expect(response.items).to.be.an('array')
      expect(response.items.map((item) => item.sys.id)).to.include(id)

      const comment = await entry.getComment(id)
      expect(comment.body).to.eq(commentBody)
      await comment.delete()
    })

    describe('Create, update, delete comment', async () => {
      const comment = await entry.createComment({
        body: commentBody,
      })

      expect(comment.body).to.eq(commentBody, 'body is set')
      comment.body = 'new body'

      const updatedBody = await comment.update()
      expect(updatedBody.body).to.eq('new body')

      await updatedBody.delete()
    })
  })

  describe('Content type comment', () => {
    test('Create, get, delete comment', async () => {
      const params = {
        spaceId: space.sys.id,
        environmentId: environment.sys.id,
        parentEntityType: 'ContentType',
        parentEntityId: contentType.sys.id,
      }
      const {
        sys: { id },
      } = await plainClient.comment.create(params, { body: commentBody })

      const response = await plainClient.comment.getMany(params)
      expect(response.items).to.be.an('array')
      expect(response.items.map((item) => item.sys.id)).to.include(id)

      await plainClient.comment.delete({
        ...params,
        commentId: id,
      })
    })
  })
})
