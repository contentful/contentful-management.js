import { cloneMock } from '../mocks/entities.js'
import setupMakeRequest from '../mocks/makeRequest.js'
import { wrapAiActionInvocation } from '../../../lib/entities/ai-action-invocation.js'
import { entityWrappedTest } from '../test-creators/instance-entity-methods.js'
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
})
