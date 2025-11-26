import { describe, test } from 'vitest'
import {
  wrapWorkflowsChangelogEntry,
  wrapWorkflowsChangelogEntryCollection,
} from '../../../lib/entities/workflows-changelog-entry.js'
import { cloneMock } from '../mocks/entities.js'
import setupMakeRequest from '../mocks/makeRequest.js'
import {
  entityCollectionWrappedTest,
  entityWrappedTest,
} from '../test-creators/instance-entity-methods.js'

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
