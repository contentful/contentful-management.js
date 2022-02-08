import { describe, test } from 'mocha'
import { wrapWorkflow, wrapWorkflowCollection } from '../../../lib/entities/workflow'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  entityActionTest,
  entityCollectionWrappedTest,
  entityDeleteTest,
  entityUpdateTest,
  entityWrappedTest,
  failingActionTest,
  failingVersionActionTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('workflow'),
  }
}

describe('Entity Workflow', () => {
  test('Workflow is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapWorkflow,
    })
  })

  test('Workflow collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapWorkflowCollection,
    })
  })

  test('Workflow update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapWorkflow,
    })
  })

  test('Workflow update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapWorkflow,
      actionMethod: 'update',
    })
  })

  test('Workflow delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapWorkflow,
    })
  })

  test('Workflow delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapWorkflow,
      actionMethod: 'delete',
    })
  })

  test('Workflow complete', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapWorkflow,
      actionMethod: 'complete',
    })
  })

  test('Workflow complete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapWorkflow,
      actionMethod: 'complete',
    })
  })
})
