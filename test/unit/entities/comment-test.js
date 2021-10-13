import { describe, test } from 'mocha'
import { wrapComment, wrapCommentCollection } from '../../../lib/entities/comment'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  entityCollectionWrappedTest,
  entityDeleteTest,
  entityUpdateTest,
  entityWrappedTest,
  failingActionTest,
  failingVersionActionTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('comment'),
  }
}

describe('Entity Comment', () => {
  test('Comment is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapComment,
    })
  })

  test('Comment collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapCommentCollection,
    })
  })

  test('Comment update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapComment,
    })
  })

  test('Comment update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapComment,
      actionMethod: 'update',
    })
  })

  test('Comment delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapComment,
    })
  })

  test('Comment delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapComment,
      actionMethod: 'delete',
    })
  })
})
