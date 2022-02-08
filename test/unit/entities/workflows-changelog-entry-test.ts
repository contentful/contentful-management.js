import { describe, test } from 'mocha'
import {
  wrapWorkflowsChangelogEntry,
  wrapWorkflowsChangelogEntryCollection,
} from '../../../lib/entities/workflows-changelog-entry'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  entityCollectionWrappedTest,
  entityWrappedTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('workflowsChangelogEntry'),
  }
}

describe('Entity WorkflowsChangelogEntry', () => {
  test('WorkflowsChangelogEntry is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapWorkflowsChangelogEntry,
    })
  })

  test('WorkflowsChangelogEntry collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapWorkflowsChangelogEntryCollection,
    })
  })
})
