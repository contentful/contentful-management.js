import { expect } from 'chai'
import { before, describe, test, after } from 'mocha'
import { initClient, createTestEnvironment, createTestSpace, initPlainClient } from '../helpers'
import { ContentType, Entry, Environment, PlainClientAPI, Space } from '../../lib/export-types'

describe('Comment Api', () => {
  let plainClient: PlainClientAPI
  let space: Space
  let environment: Environment
  let contentType: ContentType
  let entry: Entry
  const commentBody = 'JS SDK Comment Integration Test'
  const commentBodyReply = 'Reply comment'

  before(async () => {
    plainClient = initPlainClient()
    space = (await createTestSpace(initClient(), 'Comment')) as Space
    environment = (await createTestEnvironment(space, 'Comment Testing Environment')) as Environment
    contentType = await environment.createContentType({
      name: 'Content Type',
      fields: [
        {
          id: 'firstField',
          name: 'First Field',
          type: 'Text',
          required: false,
          localized: false,
        },
      ],
    })
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
        sys: { id, version },
      } = await plainClient.comment.create(params, { body: commentBody })

      const response = await plainClient.comment.getMany(params)
      expect(response.items).to.be.an('array')
      expect(response.items.map((item) => item.sys.id)).to.include(id)

      await plainClient.comment.delete({
        ...params,
        commentId: id,
        version,
      })
    })

    test('Reply to comment', async () => {
      // create
      const params = {
        spaceId: space.sys.id,
        environmentId: environment.sys.id,
        parentEntityType: 'ContentType',
        parentEntityId: contentType.sys.id,
      }
      const parentComment = await plainClient.comment.create(params, { body: commentBody })

      const replyComment = await plainClient.comment.create(
        { ...params, parentCommentId: parentComment.sys.id },
        { body: commentBodyReply }
      )

      // check
      const response = await plainClient.comment.getMany(params)
      expect(response.items).to.be.an('array')
      expect(response.items.find((item) => item.sys.id === replyComment.sys.id)).to.eq(
        parentComment.sys.id
      )

      // delete
      await plainClient.comment.delete({
        ...params,
        commentId: replyComment.sys.id,
        version: replyComment.sys.version,
      })

      await plainClient.comment.delete({
        ...params,
        commentId: parentComment.sys.id,
        version: parentComment.sys.version,
      })
    })

    test('Parent reference', async () => {
      // create
      const params = {
        spaceId: space.sys.id,
        environmentId: environment.sys.id,
        parentEntityType: 'ContentType',
        parentEntityId: contentType.sys.id,
        parentEntityReference: 'field',
      }
      const {
        sys: { id, version },
      } = await plainClient.comment.create(params, { body: commentBody })

      // check
      const response = await plainClient.comment.getMany(params)
      expect(response.items).to.be.an('array')
      expect(response.items.map((item) => item.sys.id)).to.include(id)
      expect(
        response.items.map((item) => (item.sys.parentEntity.sys as { ref: string }).ref)
      ).to.include('fields.firstField')

      // delete
      await plainClient.comment.delete({
        ...params,
        commentId: id,
        version,
      })
    })
  })
})
