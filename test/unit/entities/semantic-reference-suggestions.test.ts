import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapSemanticReferenceSuggestions } from '../../../lib/entities/semantic-reference-suggestions'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'
import { describe, test } from 'vitest'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('semanticReferenceSuggestions'),
  }
}

describe('Entity SemanticReferenceSuggestions', () => {
  test('SemanticReferenceSuggestions is wrapped', async () => {
    return entityWrappedTest(setup, { wrapperMethod: wrapSemanticReferenceSuggestions })
  })
})
