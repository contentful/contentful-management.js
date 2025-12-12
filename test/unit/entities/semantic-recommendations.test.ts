import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapSemanticRecommendations } from '../../../lib/entities/semantic-recommendations'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'
import { describe, test } from 'vitest'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('semanticRecommendations'),
  }
}

describe('Entity SemanticRecommendations', () => {
  test('SemanticRecommendations is wrapped', async () => {
    return entityWrappedTest(setup, { wrapperMethod: wrapSemanticRecommendations })
  })
})
