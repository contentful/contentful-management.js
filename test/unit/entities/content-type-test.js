/* global jest, test */
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
  return entityWrappedTest(jest, setup, {
    wrapperMethod: wrapContentType
  })
})

test('ContentType collection is wrapped', () => {
  return entityCollectionWrappedTest(jest, setup, {
    wrapperMethod: wrapContentTypeCollection
  })
})

test('ContentType update', () => {
  return entityUpdateTest(jest, setup, {
    wrapperMethod: wrapContentType
  })
})

test('ContentType update fails', () => {
  return failingVersionActionTest(jest, setup, {
    wrapperMethod: wrapContentType,
    actionMethod: 'update'
  })
})

test('ContentType delete', () => {
  return entityDeleteTest(jest, setup, {
    wrapperMethod: wrapContentType
  })
})

test('ContentType delete fails', () => {
  return failingActionTest(jest, setup, {
    wrapperMethod: wrapContentType,
    actionMethod: 'delete'
  })
})

test('ContentType publish', () => {
  return entityPublishTest(jest, setup, {
    wrapperMethod: wrapContentType
  })
})

test('ContentType publish fails', () => {
  return failingVersionActionTest(jest, setup, {
    wrapperMethod: wrapContentType,
    actionMethod: 'publish'
  })
})

test('ContentType unpublish', () => {
  return entityActionTest(jest, setup, {
    wrapperMethod: wrapContentType,
    actionMethod: 'unpublish'
  })
})

test('ContentType unpublish fails', () => {
  return failingActionTest(jest, setup, {
    wrapperMethod: wrapContentType,
    actionMethod: 'unpublish'
  })
})

test('ContentType getEditorInterface', () => {
  return entityActionTest(jest, setup, {
    wrapperMethod: wrapContentType,
    actionMethod: 'getEditorInterface'
  })
})

test('ContentType getEditorInterface fails', () => {
  return failingActionTest(jest, setup, {
    wrapperMethod: wrapContentType,
    actionMethod: 'getEditorInterface'
  })
})

test('ContentType isPublished', () => {
  isPublishedTest(jest, setup, {wrapperMethod: wrapContentType})
})

test('ContentType isUpdated', () => {
  isUpdatedTest(jest, setup, {wrapperMethod: wrapContentType})
})

test('ContentType isDraft', () => {
  isDraftTest(jest, setup, {wrapperMethod: wrapContentType})
})
