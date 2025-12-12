import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapSemanticDuplicates } from '../../../lib/entities/semantic-duplicates'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'
import { describe, test } from 'vitest'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('semanticDuplicates'),
  }
}

describe('Entity SemanticDuplicates', () => {
  test('SemanticDuplicates is wrapped', async () => {
    return entityWrappedTest(setup, { wrapperMethod: wrapSemanticDuplicates })
  })
})
