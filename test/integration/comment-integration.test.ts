import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import {
  defaultClient,
  createTestEnvironment,
  createTestSpace,
  initPlainClient,
  timeoutToCalmRateLimiting,
  waitForEnvironmentToBeReady,
} from '../helpers'
import type { ContentType, Entry, Environment, PlainClientAPI, Space } from '../../lib/export-types'

describe('Comment Api', () => {
  let plainClient: PlainClientAPI
  let space: Space
  let environment: Environment
  let contentType: ContentType
  let entry: Entry
  const commentBody = 'JS SDK Comment Integration Test'
  const commentBodyReply = 'Reply comment'

  beforeAll(async () => {
    plainClient = initPlainClient()
    space = await createTestSpace(defaultClient, 'Comment')
    environment = await createTestEnvironment(
      space,
      'Comment Testing Environment',
    )
    await waitForEnvironmentToBeReady(space, environment)
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

  afterAll(async () => {
    if (space) {
      await space.delete()
    }
    await timeoutToCalmRateLimiting()
  })

  describe('Entry comment', () => {
    it('Get comments', async () => {
      const {
        sys: { id },
      } = await entry.createComment({
        body: commentBody,
      })

      const response = await entry.getComments()
      expect(response.items).toBeInstanceOf(Array)
      expect(response.items.map((item) => item.sys.id)).toContain(id)

      const comment = await entry.getComment(id)
      expect(comment.body).toBe(commentBody)
      await comment.delete()
    })

    it('Create, update, delete comment', async () => {
      const comment = await entry.createComment({
        body: commentBody,
      })

      expect(comment.body).toBe(commentBody)
      comment.body = 'new body'

      const updatedBody = await comment.update()
      expect(updatedBody.body).toBe('new body')

      await updatedBody.delete()
    })
  })

  describe('Content type comment', () => {
    it('Create, get, delete comment', async () => {
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
      expect(response.items).toBeInstanceOf(Array)
      expect(response.items.map((item) => item.sys.id)).toContain(id)

      await plainClient.comment.delete({
        ...params,
        commentId: id,
        version,
      })
    })

    it('Reply to comment', async () => {
      const params = {
        spaceId: space.sys.id,
        environmentId: environment.sys.id,
        parentEntityType: 'ContentType',
        parentEntityId: contentType.sys.id,
      }
      const parentComment = await plainClient.comment.create(params, { body: commentBody })

      const replyComment = await plainClient.comment.create(
        { ...params, parentCommentId: parentComment.sys.id },
        { body: commentBodyReply },
      )

      const response = await plainClient.comment.getMany(params)
      expect(response.items).toBeInstanceOf(Array)
      expect(response.items.find((item) => item.sys.id === replyComment.sys.id)?.body).toBe(
        commentBodyReply,
      )

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

    it('Parent reference', async () => {
      const params = {
        spaceId: space.sys.id,
        environmentId: environment.sys.id,
        parentEntityType: 'ContentType',
        parentEntityId: contentType.sys.id,
        parentEntityReference: 'fields.firstField',
      }
      const {
        sys: { id, version },
      } = await plainClient.comment.create(params, { body: commentBody })

      const response = await plainClient.comment.getMany(params)
      expect(response.items).toBeInstanceOf(Array)
      expect(response.items.map((item) => item.sys.id)).toContain(id)
      expect(
        response.items.map((item) => (item.sys.parentEntity.sys as { ref: string }).ref),
      ).toContain('fields.firstField')

      await plainClient.comment.delete({
        ...params,
        commentId: id,
        version,
      })
    })
  })
})
