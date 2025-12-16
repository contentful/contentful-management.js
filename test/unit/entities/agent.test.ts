import { describe, test } from 'vitest'
import { wrapAgent, wrapAgentCollection } from '../../../lib/entities/agent'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  entityActionTest,
  entityCollectionWrappedTest,
  entityWrappedTest,
  failingActionTest,
} from '../test-creators/instance-entity-methods'

function setup(promise: any) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('agent'),
  }
}

describe('Entity Agent', () => {
  test('Agent is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAgent,
    })
  })

  test('Agent collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapAgentCollection,
    })
  })

  test('Agent generate', async () => {
    return entityActionTest(
      setup,
      {
        wrapperMethod: wrapAgent,
        actionMethod: 'generate',
      },
      false,
    )
  })

  test('Agent generate fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapAgent,
      actionMethod: 'generate',
    })
  })
})
