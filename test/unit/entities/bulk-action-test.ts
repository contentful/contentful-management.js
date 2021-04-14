import { describe, it } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'

import { wrapBulkAction } from '../../../lib/entities/bulk-action'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('bulkAction'),
  }
}

describe('Entity ScheduledAction', () => {
  it('BulkAction is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapBulkAction,
    })
  })
})
