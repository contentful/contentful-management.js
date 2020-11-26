import { describe, test } from 'mocha'
import { wrapTag } from '../../../lib/entities/tag'
import setupHttpMock from '../mocks/http'
import { cloneMock } from '../mocks/entities'
import {
  entityDeleteTest,
  entityUpdateTest,
  failingActionTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('tag'),
  }
}

describe('Entity Tag', () => {
  test('Tag update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapTag,
    })
  })

  test('Tag update fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapTag,
      actionMethod: 'update',
    })
  })

  test('Tag delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapTag,
    })
  })

  test('Tag delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapTag,
      actionMethod: 'delete',
    })
  })
})
