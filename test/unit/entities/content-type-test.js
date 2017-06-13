/* global test */
import {cloneMock} from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {wrapContentType, wrapContentTypeCollection} from '../../../lib/entities/content-type'
import {
  entityWrappedTest,
  entityCollectionWrappedTest,
  entityUpdateTest,
  entityDeleteTest,
  entityPublishTest,
  entityActionTest,
  failingActionTest,
  failingVersionActionTest,
  isPublishedTest,
  isUpdatedTest,
  isDraftTest
} from '../test-creators/instance-entity-methods'

function setup (promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('contentType')
  }
}

test('ContentType is wrapped', () => {
  return entityWrappedTest(setup, {
    wrapperMethod: wrapContentType
  })
})

test('ContentType collection is wrapped', () => {
  return entityCollectionWrappedTest(setup, {
    wrapperMethod: wrapContentTypeCollection
  })
})

test('ContentType update', () => {
  return entityUpdateTest(setup, {
    wrapperMethod: wrapContentType
  })
})

test('ContentType update fails', () => {
  return failingVersionActionTest(setup, {
    wrapperMethod: wrapContentType,
    actionMethod: 'update'
  })
})

test('ContentType delete', () => {
  return entityDeleteTest(setup, {
    wrapperMethod: wrapContentType
  })
})

test('ContentType delete fails', () => {
  return failingActionTest(setup, {
    wrapperMethod: wrapContentType,
    actionMethod: 'delete'
  })
})

test('ContentType publish', () => {
  return entityPublishTest(setup, {
    wrapperMethod: wrapContentType
  })
})

test('ContentType publish fails', () => {
  return failingVersionActionTest(setup, {
    wrapperMethod: wrapContentType,
    actionMethod: 'publish'
  })
})

test('ContentType unpublish', () => {
  return entityActionTest(setup, {
    wrapperMethod: wrapContentType,
    actionMethod: 'unpublish'
  })
})

test('ContentType unpublish fails', () => {
  return failingActionTest(setup, {
    wrapperMethod: wrapContentType,
    actionMethod: 'unpublish'
  })
})

test('ContentType getEditorInterface', () => {
  return entityActionTest(setup, {
    wrapperMethod: wrapContentType,
    actionMethod: 'getEditorInterface'
  })
})

test('ContentType getEditorInterface fails', () => {
  return failingActionTest(setup, {
    wrapperMethod: wrapContentType,
    actionMethod: 'getEditorInterface'
  })
})

test('ContentType isPublished', () => {
  isPublishedTest(setup, {wrapperMethod: wrapContentType})
})

test('ContentType isUpdated', () => {
  isUpdatedTest(setup, {wrapperMethod: wrapContentType})
})

test('ContentType isDraft', () => {
  isDraftTest(setup, {wrapperMethod: wrapContentType})
})
