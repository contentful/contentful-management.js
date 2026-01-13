import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapVectorizationStatus } from '../../../lib/entities/vectorization-status'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'
import { describe, test } from 'vitest'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('vectorizationStatus'),
  }
}

describe('Entity VectorizationStatus', () => {
  test('VectorizationStatus is wrapped', async () => {
    return entityWrappedTest(setup, { wrapperMethod: wrapVectorizationStatus })
  })
})
