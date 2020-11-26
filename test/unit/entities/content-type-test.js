import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { wrapContentType, wrapContentTypeCollection } from '../../../lib/entities/content-type'
import {
  entityActionTest,
  entityCollectionActionTest,
  entityCollectionWrappedTest,
  entityDeleteTest,
  entityPublishTest,
  entityUpdateTest,
  entityWrappedTest,
  failingActionTest,
  failingOmitAndDeleteFieldTest,
  failingVersionActionTest,
  isDraftTest,
  isPublishedTest,
  isUpdatedTest,
  omitAndDeleteFieldTest,
} from '../test-creators/instance-entity-methods'
import { describe, test } from 'mocha'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('contentType'),
  }
}

describe('Entity ContentType', () => {
  test('ContentType is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapContentType,
    })
  })

  test('ContentType collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapContentTypeCollection,
    })
  })

  test('ContentType update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapContentType,
    })
  })

  test('ContentType update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapContentType,
      actionMethod: 'update',
    })
  })

  test('ContentType delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapContentType,
    })
  })

  test('ContentType delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapContentType,
      actionMethod: 'delete',
    })
  })

  test('ContentType publish', async () => {
    return entityPublishTest(setup, {
      wrapperMethod: wrapContentType,
    })
  })

  test('ContentType publish fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapContentType,
      actionMethod: 'publish',
    })
  })

  test('ContentType unpublish', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapContentType,
      actionMethod: 'unpublish',
    })
  })

  test('ContentType unpublish fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapContentType,
      actionMethod: 'unpublish',
    })
  })

  test('ContentType getSnapshots fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapContentType,
      actionMethod: 'getSnapshots',
    })
  })

  test('ContentType getSnapshot fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapContentType,
      actionMethod: 'getSnapshot',
    })
  })

  test('ContentType getEditorInterface', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapContentType,
      actionMethod: 'getEditorInterface',
    })
  })

  test('ContentType getEditorInterface fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapContentType,
      actionMethod: 'getEditorInterface',
    })
  })

  test('ContentType getSnapshots', async () => {
    return entityCollectionActionTest(setup, {
      wrapperMethod: wrapContentType,
      actionMethod: 'getSnapshots',
    })
  })

  test('ContentType getSnapshot', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapContentType,
      actionMethod: 'getSnapshot',
    })
  })

  test('ContentType isPublished', async () => {
    return isPublishedTest(setup, { wrapperMethod: wrapContentType })
  })

  test('ContentType isUpdated', async () => {
    return isUpdatedTest(setup, { wrapperMethod: wrapContentType })
  })

  test('ContentType isDraft', async () => {
    return isDraftTest(setup, { wrapperMethod: wrapContentType })
  })

  test('ContentType omitAndDeleteField', async () => {
    return omitAndDeleteFieldTest(setup, { wrapperMethod: wrapContentType })
  })

  test('ContentType omitAndDeleteField fails', async () => {
    return failingOmitAndDeleteFieldTest(setup, { wrapperMethod: wrapContentType })
  })
})
