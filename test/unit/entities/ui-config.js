import { describe, test } from 'mocha'
import { wrapUIConfig } from '../../../lib/entities/ui-config'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'

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
