import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapEntry, wrapEntryCollection } from '../../../lib/entities/entry'
import {
  entityWrappedTest,
  entityCollectionWrappedTest,
  entityPatchTest,
  entityUpdateTest,
  entityDeleteTest,
  entityPublishTest,
  entityActionTest,
  entityCollectionActionTest,
  failingActionTest,
  failingVersionActionTest,
  isPublishedTest,
  isUpdatedTest,
  isDraftTest,
  isArchivedTest,
} from '../test-creators/instance-entity-methods'
import { describe, test } from 'mocha'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('entry'),
  }
}

describe('Entity Entry', () => {
  test('Entry is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapEntry,
    })
  })

  test('Entry collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapEntryCollection,
    })
  })

  test('Entry patch', async () => {
    return entityPatchTest(setup, {
      wrapperMethod: wrapEntry,
    })
  })

  test('Entry update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapEntry,
    })
  })

  test('Entry update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'update',
    })
  })

  test('Entry delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapEntry,
    })
  })

  test('Entry delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'delete',
    })
  })

  test('Entry publish', async () => {
    return entityPublishTest(setup, {
      wrapperMethod: wrapEntry,
    })
  })

  test('Entry publish fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'publish',
    })
  })

  test('Entry unpublish', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'unpublish',
    })
  })

  test('Entry unpublish fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'unpublish',
    })
  })

  test('Entry archive', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'archive',
    })
  })

  test('Entry archive fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'archive',
    })
  })

  test('Entry unarchive', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'unarchive',
    })
  })

  test('Entry unarchive fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'unarchive',
    })
  })

  test('Entry isPublished', async () => {
    return isPublishedTest(setup, { wrapperMethod: wrapEntry })
  })

  test('Entry isUpdated', async () => {
    return isUpdatedTest(setup, { wrapperMethod: wrapEntry })
  })

  test('Entry isDraft', async () => {
    return isDraftTest(setup, { wrapperMethod: wrapEntry })
  })

  test('Entry isArchived', async () => {
    return isArchivedTest(setup, { wrapperMethod: wrapEntry })
  })

  test('Entry getSnapshot fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'getSnapshot',
    })
  })

  test('Entry getSnapshot', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'getSnapshot',
    })
  })

  test('Entry getSnapshots fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'getSnapshots',
    })
  })

  test('Entry getSnapshots', async () => {
    return entityCollectionActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'getSnapshots',
    })
  })
})
