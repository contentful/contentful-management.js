/* global jest, test */
import {cloneMock} from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {wrapEntry, wrapEntryCollection} from '../../../lib/entities/entry'
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
  isDraftTest,
  isArchivedTest
} from '../test-creators/instance-entity-methods'

function setup (promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('entry')
  }
}

test('Entry is wrapped', () => {
  entityWrappedTest(jest, setup, {
    wrapperMethod: wrapEntry
  })
})

test('Entry collection is wrapped', () => {
  return entityCollectionWrappedTest(jest, setup, {
    wrapperMethod: wrapEntryCollection
  })
})

test('Entry update', () => {
  return entityUpdateTest(jest, setup, {
    wrapperMethod: wrapEntry
  })
})

test('Entry update fails', () => {
  return failingVersionActionTest(jest, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'update'
  })
})

test('Entry delete', () => {
  return entityDeleteTest(jest, setup, {
    wrapperMethod: wrapEntry
  })
})

test('Entry delete fails', () => {
  return failingActionTest(jest, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'delete'
  })
})

test('Entry publish', () => {
  return entityPublishTest(jest, setup, {
    wrapperMethod: wrapEntry
  })
})

test('Entry publish fails', () => {
  return failingVersionActionTest(jest, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'publish'
  })
})

test('Entry unpublish', () => {
  return entityActionTest(jest, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'unpublish'
  })
})

test('Entry unpublish fails', () => {
  return failingActionTest(jest, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'unpublish'
  })
})

test('Entry archive', () => {
  return entityActionTest(jest, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'archive'
  })
})

test('Entry archive fails', () => {
  return failingVersionActionTest(jest, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'archive'
  })
})

test('Entry unarchive', () => {
  return entityActionTest(jest, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'unarchive'
  })
})

test('Entry unarchive fails', () => {
  return failingActionTest(jest, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'unarchive'
  })
})

test('Entry isPublished', () => {
  isPublishedTest(jest, setup, {wrapperMethod: wrapEntry})
})

test('Entry isUpdated', () => {
  isUpdatedTest(jest, setup, {wrapperMethod: wrapEntry})
})

test('Entry isDraft', () => {
  isDraftTest(jest, setup, {wrapperMethod: wrapEntry})
})

test('Entry isArchived', () => {
  isArchivedTest(jest, setup, {wrapperMethod: wrapEntry})
})
