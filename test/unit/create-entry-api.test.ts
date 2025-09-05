import { expect, describe, test } from 'vitest'
import createEntryApi from '../../lib/create-entry-api.js'
import { wrapEntry, wrapEntryCollection } from '../../lib/entities/entry.js'
import { commentMock, cloneMock, taskMock } from './mocks/entities.js'
import setupMakeRequest from './mocks/makeRequest.js'
import {
  entityActionTest,
  entityCollectionActionTest,
  entityDeleteTest,
  entityPatchTest,
  entityPublishTest,
  entityReferenceCollectionTest,
  entityUpdateTest,
  failingActionTest,
  failingVersionActionTest,
  isArchivedTest,
  isDraftTest,
  isPublishedTest,
  isUpdatedTest,
} from './test-creators/instance-entity-methods.js'
import { makeEntityMethodFailingTest } from './test-creators/static-entity-methods.js'

function setup(promise: Promise<unknown>) {
  const makeRequest = setupMakeRequest(promise)
  const api = createEntryApi(makeRequest)
  const entryMock = cloneMock('entry')

  return {
    api: {
      ...api,
      toPlainObject: () => entryMock,
    },
    makeRequest,
    entityMock: entryMock,
  }
}

describe('createEntryApi', () => {
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

  test('Entry references', async () => {
    return entityReferenceCollectionTest(
      (promise) => {
        return {
          makeRequest: setupMakeRequest(promise),
          entityMock: cloneMock('entryReferencesCollection'),
        }
      },
      { wrapperMethod: wrapEntryCollection },
    )
  })

  test('Entry createTask', async () => {
    const { api, makeRequest } = setup(Promise.resolve(taskMock))
    return api.createTask(taskMock).then((r) => {
      expect(r).to.eql(taskMock)
      expect(makeRequest.mock.calls[0][0].payload).to.eql(taskMock, 'data is sent')
    })
  })

  test('Entry createTask fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createTask',
    })
  })

  test('Entry createComment', async () => {
    const { api, makeRequest } = setup(Promise.resolve(commentMock))
    return api.createComment(commentMock).then((r) => {
      expect(r).to.eql(commentMock)
      expect(makeRequest.mock.calls[0][0].payload).to.eql(commentMock, 'data is sent')
    })
  })

  test('Entry createComment fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createComment',
    })
  })
})
