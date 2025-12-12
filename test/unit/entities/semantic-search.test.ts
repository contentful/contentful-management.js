import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapSemanticSearch } from '../../../lib/entities/semantic-search'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'
import { describe, test } from 'vitest'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('semanticSearch'),
  }
}

describe('Entity SemanticSearch', () => {
  test('SemanticSearch is wrapped', async () => {
    return entityWrappedTest(setup, { wrapperMethod: wrapSemanticSearch })
  })
})
