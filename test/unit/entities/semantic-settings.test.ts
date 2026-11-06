import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapContentSemanticsSettings } from '../../../lib/entities/semantic-settings'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'
import { describe, test } from 'vitest'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('semanticSettings'),
  }
}

describe('Entity SemanticSettings', () => {
  test('SemanticSettings is wrapped', async () => {
    return entityWrappedTest(setup, { wrapperMethod: wrapContentSemanticsSettings })
  })
})
