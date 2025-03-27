import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapAiAction, wrapAiActionCollection } from '../../../lib/entities/ai-action'
import {
  entityWrappedTest,
  entityCollectionWrappedTest,
  entityUpdateTest,
  failingVersionActionTest,
  entityDeleteTest,
  failingActionTest,
  entityActionTest,
} from '../test-creators/instance-entity-methods'
import { describe, test } from 'vitest'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('aiAction'),
  }
}

describe('Entity AiAction', () => {
  test('AiAction is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAiAction,
    })
  })

  test('AiAction collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapAiActionCollection,
    })
  })

  test('AiAction update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapAiAction,
    })
  })

  test('AiAction update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapAiAction,
      actionMethod: 'update',
    })
  })

  test('AiAction delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapAiAction,
    })
  })

  test('AiAction delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapAiAction,
      actionMethod: 'delete',
    })
  })

  test('AiAction publish', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapAiAction,
      actionMethod: 'publish',
    })
  })

  test('AiAction publish fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapAiAction,
      actionMethod: 'publish',
    })
  })

  test('AiAction unpublish', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapAiAction,
      actionMethod: 'unpublish',
    })
  })

  test('AiAction unpublish fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapAiAction,
      actionMethod: 'unpublish',
    })
  })

  test('AiAction invoke', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapAiAction,
      actionMethod: 'invoke',
    })
  })
})
