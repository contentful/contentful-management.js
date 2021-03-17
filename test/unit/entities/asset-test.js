import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapAsset, wrapAssetCollection } from '../../../lib/entities/asset'
import {
  entityActionTest,
  entityCollectionWrappedTest,
  entityDeleteTest,
  entityPublishTest,
  entityUpdateTest,
  entityWrappedTest,
  failingActionTest,
  failingVersionActionTest,
  isArchivedTest,
  isDraftTest,
  isPublishedTest,
  isUpdatedTest,
} from '../test-creators/instance-entity-methods'
import { describe, test } from 'mocha'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('asset'),
  }
}

describe('Entity Asset', () => {
  test('Asset is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAsset,
    })
  })

  test('Asset collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapAssetCollection,
    })
  })

  test('Asset update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapAsset,
    })
  })

  test('Asset update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapAsset,
      actionMethod: 'update',
    })
  })

  test('Asset delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapAsset,
    })
  })

  test('Asset delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapAsset,
      actionMethod: 'delete',
    })
  })

  test('Asset publish', async () => {
    return entityPublishTest(setup, {
      wrapperMethod: wrapAsset,
    })
  })

  test('Asset publish fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapAsset,
      actionMethod: 'publish',
    })
  })

  test('Asset unpublish', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapAsset,
      actionMethod: 'unpublish',
    })
  })

  test('Asset unpublish fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapAsset,
      actionMethod: 'unpublish',
    })
  })

  test('Asset archive', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapAsset,
      actionMethod: 'archive',
    })
  })

  test('Asset archive fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapAsset,
      actionMethod: 'archive',
    })
  })

  test('Asset unarchive', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapAsset,
      actionMethod: 'unarchive',
    })
  })

  test('Asset unarchive fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapAsset,
      actionMethod: 'unarchive',
    })
  })

  test('Asset isPublished', async () => {
    return isPublishedTest(setup, { wrapperMethod: wrapAsset })
  })

  test('Asset isUpdated', async () => {
    return isUpdatedTest(setup, { wrapperMethod: wrapAsset })
  })

  test('Asset isDraft', async () => {
    return isDraftTest(setup, { wrapperMethod: wrapAsset })
  })

  test('Asset isArchived', async () => {
    return isArchivedTest(setup, { wrapperMethod: wrapAsset })
  })
})
