import { describe, test } from 'vitest'
import { cloneMock } from '../mocks/entities.js'
import setupMakeRequest from '../mocks/makeRequest.js'
import { wrapUsageCollection } from '../../../lib/entities/usage.js'
import { entityCollectionWrappedTest } from '../test-creators/instance-entity-methods.js'

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
