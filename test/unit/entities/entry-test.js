/* global test */
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
  entityWrappedTest(setup, {
    wrapperMethod: wrapEntry
  })
})

test('Entry collection is wrapped', () => {
  return entityCollectionWrappedTest(setup, {
    wrapperMethod: wrapEntryCollection
  })
})

test('Entry update', () => {
  return entityUpdateTest(setup, {
    wrapperMethod: wrapEntry
  })
})

test('Entry update fails', () => {
  return failingVersionActionTest(setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'update'
  })
})

test('Entry delete', () => {
  return entityDeleteTest(setup, {
    wrapperMethod: wrapEntry
  })
})

test('Entry delete fails', () => {
  return failingActionTest(setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'delete'
  })
})

test('Entry publish', () => {
  return entityPublishTest(setup, {
    wrapperMethod: wrapEntry
  })
})

test('Entry publish fails', () => {
  return failingVersionActionTest(setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'publish'
  })
})

test('Entry unpublish', () => {
  return entityActionTest(setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'unpublish'
  })
})

test('Entry unpublish fails', () => {
  return failingActionTest(setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'unpublish'
  })
})

test('Entry archive', () => {
  return entityActionTest(setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'archive'
  })
})

test('Entry archive fails', () => {
  return failingVersionActionTest(setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'archive'
  })
})

test('Entry unarchive', () => {
  return entityActionTest(setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'unarchive'
  })
})

test('Entry unarchive fails', () => {
  return failingActionTest(setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'unarchive'
  })
})

test('Entry isPublished', () => {
  isPublishedTest(setup, {wrapperMethod: wrapEntry})
})

test('Entry isUpdated', () => {
  isUpdatedTest(setup, {wrapperMethod: wrapEntry})
})

test('Entry isDraft', () => {
  isDraftTest(setup, {wrapperMethod: wrapEntry})
})

test('Entry isArchived', () => {
  isArchivedTest(setup, {wrapperMethod: wrapEntry})
})
