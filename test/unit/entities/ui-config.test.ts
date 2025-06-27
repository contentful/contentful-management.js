import { describe, test } from 'vitest'
import { wrapUIConfig } from '../../../lib/entities/ui-config.js'
import { cloneMock } from '../mocks/entities.js'
import setupMakeRequest from '../mocks/makeRequest.js'
import { entityWrappedTest } from '../test-creators/instance-entity-methods.js'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('uiConfig'),
  }
}

describe('Entity UIConfig', () => {
  test('UIConfig is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapUIConfig,
    })
  })
})
