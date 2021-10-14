import { expect } from 'chai'
import { afterEach, describe, test } from 'mocha'
import createEntryApi, {
  __RewireAPI__ as createEntryApiRewireApi,
} from '../../lib/create-entry-api'
import { wrapEntry, wrapEntryCollection } from './../../lib/entities/entry'
import { cloneMock, setupEntitiesMock, taskMock } from './mocks/entities'
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

function setup(promise) {
  const makeRequest = setupMakeRequest(promise)
  const entryMock = cloneMock('entry')
  const api = createEntryApi(makeRequest)
  api.toPlainObject = () => entryMock
  return {
    api,
    makeRequest,
    entityMock: entryMock,
  }
}

describe('createEntryApi', () => {
  afterEach(() => {
    createEntryApiRewireApi.__ResetDependency__('entities')
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

  test('Entry references', async () => {
    return entityReferenceCollectionTest(
      (promise) => {
        return {
          makeRequest: setupMakeRequest(promise),
          entityMock: cloneMock('entryReferencesCollection'),
        }
      },
      { wrapperMethod: wrapEntryCollection }
    )
  })

  test('Entry createTask', async () => {
    const entitiesMock = setupEntitiesMock(createEntryApiRewireApi)
    entitiesMock.task.wrapTask.returns(taskMock)

    const { api, makeRequest } = setup(Promise.resolve({}))
    return api.createTask(taskMock).then((r) => {
      expect(r).to.eql(taskMock)
      expect(makeRequest.args[0][0].payload).to.eql(taskMock, 'data is sent')
    })
  })

  test('Entry createTask fails', async () => {
    return makeEntityMethodFailingTest(setup, {
      methodToTest: 'createTask',
    })
  })
})
