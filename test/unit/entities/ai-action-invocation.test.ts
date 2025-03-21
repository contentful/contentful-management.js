import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  wrapAiActionInvocation,
  wrapAiActionInvocationCollection,
} from '../../../lib/entities/ai-action-invocation'
import {
  entityWrappedTest,
  entityCollectionWrappedTest,
} from '../test-creators/instance-entity-methods'
import { describe, test } from 'vitest'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('aiActionInvocation'),
  }
}

describe('Entity AiActionInvocation', () => {
  test('AiActionInvocation is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAiActionInvocation,
    })
  })

  test('AiActionInvocation collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapAiActionInvocationCollection,
    })
  })
})
