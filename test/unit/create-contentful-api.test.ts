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
import createClientApi from '../../lib/create-contentful-api'

function setup(promise: Promise<unknown>) {
  const makeRequest = setupMakeRequest(promise)
  const api = createClientApi(makeRequest)

  const entryApi = createEntryApi(makeRequest)
  const entryMock = cloneMock('entry')

  return {
    api: {
      ...entryApi,
      ...api,
      toPlainObject: () => entryMock,
    },
    makeRequest,
    entityMock: entryMock,
  }
}

describe('createClientApi', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('spaces', () => {
    afterEach(() => {
      vi.restoreAllMocks()
    })

    test('API call space create', async () => {
      const { api } = setup(Promise.resolve({}))
      await expect(
        api.createSpace({ name: 'test space', productId: 'test-product' }, 'test-org'),
      ).resolves.not.toThrow()
    })

    test('API call space create fails', async () => {
      const error = cloneMock('error')
      const { api } = setup(Promise.reject(error))

      await expect(
        api.createSpace({ name: 'test space', productId: 'test-product' }, 'test-org'),
      ).rejects.toEqual(error)
    })

    const collectionResponse = { sys: { type: 'Array' }, total: 0, skip: 0, limit: 100, items: [] }
    const cursorCollectionResponse = { sys: { type: 'Array' }, limit: 100, items: [], pages: {} }

    test('getSpaces calls getMany', async () => {
      const { api, makeRequest } = setup(Promise.resolve(collectionResponse))
      await api.getSpaces({ limit: 10 })
      expect(makeRequest).toHaveBeenCalledWith(
        expect.objectContaining({ entityType: 'Space', action: 'getMany' }),
      )
    })

    test('getSpaces with cursor:true normalizes query params (cursor flag not forwarded)', async () => {
      const { api, makeRequest } = setup(Promise.resolve(cursorCollectionResponse))
      await api.getSpaces({ cursor: true, limit: 10 })
      const [call] = makeRequest.mock.calls
      expect(call[0].action).toBe('getMany')
      expect(call[0].params.query).toMatchObject({ cursor: true, limit: 10 })
    })

    test('getSpaces with cursor:true and pageNext passes pageNext in query', async () => {
      const { api, makeRequest } = setup(Promise.resolve(cursorCollectionResponse))
      await api.getSpaces({ cursor: true, pageNext: 'next-token' })
      const [call] = makeRequest.mock.calls
      expect(call[0].params.query).toMatchObject({ cursor: true, pageNext: 'next-token' })
    })

    test('getSpaces with cursor:true returns cursor paginated collection', async () => {
      const { api } = setup(
        Promise.resolve({ ...cursorCollectionResponse, pages: { next: 'pageNext=abc' } }),
      )
      const result = await api.getSpaces({ cursor: true })
      expect(result).toHaveProperty('pages')
      expect(result).not.toHaveProperty('total')
    })

    test('getSpaces without cursor returns regular collection', async () => {
      const { api } = setup(Promise.resolve(collectionResponse))
      const result = await api.getSpaces()
      expect(result).toHaveProperty('total')
      expect(result).not.toHaveProperty('pages')
    })

    test('getSpaces with organizationId passes it in params', async () => {
      const { api, makeRequest } = setup(Promise.resolve(collectionResponse))
      await api.getSpaces({}, 'test-org')
      const [call] = makeRequest.mock.calls
      expect(call[0].params.organizationId).toBe('test-org')
    })

    test('getSpaces without organizationId omits it from params', async () => {
      const { api, makeRequest } = setup(Promise.resolve(collectionResponse))
      await api.getSpaces()
      const [call] = makeRequest.mock.calls
      expect(call[0].params.organizationId).toBeUndefined()
    })
  })
})

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
      { wrapperMethod: wrapEntryCollection },
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
