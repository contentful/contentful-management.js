import test from 'blue-tape'
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

test('Tag update', (t) => {
  return entityUpdateTest(t, setup, {
    wrapperMethod: wrapTag,
  })
})

test('Tag update fails', (t) => {
  return failingActionTest(t, setup, {
    wrapperMethod: wrapTag,
    actionMethod: 'update',
  })
})

test('Tag delete', (t) => {
  return entityDeleteTest(t, setup, {
    wrapperMethod: wrapTag,
  })
})

test('Tag delete fails', (t) => {
  return failingActionTest(t, setup, {
    wrapperMethod: wrapTag,
    actionMethod: 'delete',
  })
})
