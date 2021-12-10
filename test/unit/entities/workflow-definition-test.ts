import { describe, test } from 'mocha'
import {
  wrapWorkflowDefinition,
  wrapWorkflowDefinitionCollection,
} from '../../../lib/entities/workflow-definition'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
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
    entityMock: cloneMock('workflowDefinition'),
  }
}

describe('Entity WorkflowDefinition', () => {
  test('WorkflowDefinition is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapWorkflowDefinition,
    })
  })

  test('WorkflowDefinition collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapWorkflowDefinitionCollection,
    })
  })

  test('WorkflowDefinition update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapWorkflowDefinition,
    })
  })

  test('WorkflowDefinition update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapWorkflowDefinition,
      actionMethod: 'update',
    })
  })

  test('WorkflowDefinition delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapWorkflowDefinition,
    })
  })

  test('WorkflowDefinition delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapWorkflowDefinition,
      actionMethod: 'delete',
    })
  })
})
