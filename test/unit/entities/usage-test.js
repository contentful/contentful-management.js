import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapUsageCollection } from '../../../lib/entities/usage'
import { entityCollectionWrappedTest } from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('usage'),
  }
}

describe('Entity Usage', () => {
  test('Usage period collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapUsageCollection,
    })
  })
})
