import { expect } from 'chai'
import { before, describe, test, after } from 'mocha'
import { initClient, createTestEnvironment, createTestSpace } from '../helpers'

describe('Comment Api', () => {
  let space
  let environment
  let entry
  const commentBody = 'JS SDK Comment Integration Test'

  before(async () => {
    space = await createTestSpace(initClient(), 'Comment')
    environment = await createTestEnvironment(space, 'Comment Testing Environment')
    const contentType = await environment.createContentType({ name: 'Content Type' })
    await contentType.publish()
    entry = await environment.createEntry(contentType.sys.id, { fields: {} })
  })

  after(async () => {
    if (space) {
      return space.delete()
    }
  })

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

  test('Create, update, delete comment', async () => {
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
