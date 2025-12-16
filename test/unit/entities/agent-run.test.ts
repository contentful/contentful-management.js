import { describe, test } from 'vitest'
import { wrapAgentRun, wrapAgentRunCollection } from '../../../lib/entities/agent-run'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  entityCollectionWrappedTest,
  entityWrappedTest,
} from '../test-creators/instance-entity-methods'

function setup(promise: any) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('agentRun'),
  }
}

describe('Entity AgentRun', () => {
  test('AgentRun is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAgentRun,
    })
  })

  test('AgentRun collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapAgentRunCollection,
    })
  })
})
