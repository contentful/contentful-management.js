import test from 'tape'
import {cloneMock} from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {wrapContentType, wrapContentTypeCollection} from '../../../lib/entities/content-type'
import {wrapEditorInterface} from '../../../lib/entities/editor-interface'
import {wrapSnapshot, wrapSnapshotCollection} from '../../../lib/entities/snapshot'
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

test('ContentType is wrapped', (t) => {
  return entityWrappedTest(t, setup, {
    wrapperMethod: wrapContentType
  })
})

test('ContentType collection is wrapped', (t) => {
  return entityCollectionWrappedTest(t, setup, {
    wrapperMethod: wrapContentTypeCollection
  })
})

test('ContentType update', (t) => {
  return entityUpdateTest(t, setup, {
    wrapperMethod: wrapContentType
  })
})

test('ContentType update fails', (t) => {
  return failingVersionActionTest(t, setup, {
    wrapperMethod: wrapContentType,
    actionMethod: 'update'
  })
})

test('ContentType delete', (t) => {
  return entityDeleteTest(t, setup, {
    wrapperMethod: wrapContentType
  })
})

test('ContentType delete fails', (t) => {
  return failingActionTest(t, setup, {
    wrapperMethod: wrapContentType,
    actionMethod: 'delete'
  })
})

test('ContentType publish', (t) => {
  return entityPublishTest(t, setup, {
    wrapperMethod: wrapContentType
  })
})

test('ContentType publish fails', (t) => {
  return failingVersionActionTest(t, setup, {
    wrapperMethod: wrapContentType,
    actionMethod: 'publish'
  })
})

test('ContentType unpublish', (t) => {
  return entityActionTest(t, setup, {
    wrapperMethod: wrapContentType,
    actionMethod: 'unpublish'
  })
})

test('ContentType unpublish fails', (t) => {
  return failingActionTest(t, setup, {
    wrapperMethod: wrapContentType,
    actionMethod: 'unpublish'
  })
})

test('ContentType getSnapshots fails', (t) => {
  return failingActionTest(t, setup, {
    wrapperMethod: wrapSnapshotCollection,
    actionMethod: 'getSnapshots'
  })
})

test('ContentType getSnapshot fails', (t) => {
  return failingActionTest(t, setup, {
    wrapperMethod: wrapSnapshot,
    actionMethod: 'getSnapshot'
  })
})

test('ContentType getSnapshot', (t) => {
  return entityActionTest(t, setup, {
    wrapperMethod: wrapEditorInterface,
    actionMethod: 'getSnapshot'
  })
})

test('ContentType getSnapshots', (t) => {
  return entityActionTest(t, setup, {
    wrapperMethod: wrapEditorInterface,
    actionMethod: 'getSnapshots'
  })
})

test('ContentType getEditorInterface fails', (t) => {
  return failingActionTest(t, setup, {
    wrapperMethod: wrapEditorInterface,
    actionMethod: 'getEditorInterface'
  })
})

test('ContentType isPublished', (t) => {
  isPublishedTest(t, setup, {wrapperMethod: wrapContentType})
})

test('ContentType isUpdated', (t) => {
  isUpdatedTest(t, setup, {wrapperMethod: wrapContentType})
})

test('ContentType isDraft', (t) => {
  isDraftTest(t, setup, {wrapperMethod: wrapContentType})
})
