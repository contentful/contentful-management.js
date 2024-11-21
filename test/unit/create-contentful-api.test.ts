import { describe, test, afterEach, expect, vi } from 'vitest'
import createEntryApi from '../../lib/create-entry-api'
import { wrapEntry, wrapEntryCollection } from '../../lib/entities/entry'
import { commentMock, cloneMock, taskMock } from './mocks/entities'
import setupMakeRequest from './mocks/makeRequest'
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
} from './test-creators/instance-entity-methods'
import { makeEntityMethodFailingTest } from './test-creators/static-entity-methods'

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
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('Entry patch', async () => {
    await entityPatchTest(setup, {
      wrapperMethod: wrapEntry,
    })
  })

  test('Entry update', async () => {
    await entityUpdateTest(setup, {
      wrapperMethod: wrapEntry,
    })
  })

  test('Entry update fails', async () => {
    await failingVersionActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'update',
    })
  })

  test('Entry delete', async () => {
    await entityDeleteTest(setup, {
      wrapperMethod: wrapEntry,
    })
  })

  test('Entry delete fails', async () => {
    await failingActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'delete',
    })
  })

  test('Entry publish', async () => {
    await entityPublishTest(setup, {
      wrapperMethod: wrapEntry,
    })
  })

  test('Entry publish fails', async () => {
    await failingVersionActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'publish',
    })
  })

  test('Entry unpublish', async () => {
    await entityActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'unpublish',
    })
  })

  test('Entry unpublish fails', async () => {
    await failingActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'unpublish',
    })
  })

  test('Entry archive', async () => {
    await entityActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'archive',
    })
  })

  test('Entry archive fails', async () => {
    await failingVersionActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'archive',
    })
  })

  test('Entry unarchive', async () => {
    await entityActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'unarchive',
    })
  })

  test('Entry unarchive fails', async () => {
    await failingActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'unarchive',
    })
  })

  test('Entry isPublished', async () => {
    await isPublishedTest(setup, { wrapperMethod: wrapEntry })
  })

  test('Entry isUpdated', async () => {
    await isUpdatedTest(setup, { wrapperMethod: wrapEntry })
  })

  test('Entry isDraft', async () => {
    await isDraftTest(setup, { wrapperMethod: wrapEntry })
  })

  test('Entry isArchived', async () => {
    await isArchivedTest(setup, { wrapperMethod: wrapEntry })
  })

  test('Entry getSnapshot fails', async () => {
    await failingActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'getSnapshot',
    })
  })

  test('Entry getSnapshot', async () => {
    await entityActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'getSnapshot',
    })
  })

  test('Entry getSnapshots fails', async () => {
    await failingActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'getSnapshots',
    })
  })

  test('Entry getSnapshots', async () => {
    await entityCollectionActionTest(setup, {
      wrapperMethod: wrapEntry,
      actionMethod: 'getSnapshots',
    })
  })

  test('Entry references', async () => {
    await entityReferenceCollectionTest(
      (promise) => ({
        makeRequest: setupMakeRequest(promise),
        entityMock: cloneMock('entryReferencesCollection'),
      }),
      { wrapperMethod: wrapEntryCollection }
    )
  })

  test('Entry createTask', async () => {
    const { api, makeRequest } = setup(Promise.resolve(taskMock))
    const result = await api.createTask(taskMock)

    expect(result).toEqual(taskMock)
    expect(makeRequest.mock.calls[0][0].payload).toEqual(taskMock)
  })

  test('Entry createTask fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'createTask',
    })
  })

  test('Entry createComment', async () => {
    const { api, makeRequest } = setup(Promise.resolve(commentMock))
    const result = await api.createComment(commentMock)

    expect(result).toEqual(commentMock)
    expect(makeRequest.mock.calls[0][0].payload).toEqual(commentMock)
  })

  test('Entry createComment fails', async () => {
    await makeEntityMethodFailingTest(setup, {
      methodToTest: 'createComment',
    })
  })
})
