import { describe, test } from 'vitest'
import { wrapUserUIConfig } from '../../../lib/entities/user-ui-config.js'
import { cloneMock } from '../mocks/entities.js'
import setupMakeRequest from '../mocks/makeRequest.js'
import { entityWrappedTest } from '../test-creators/instance-entity-methods.js'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('userUIConfig'),
  }
}

describe('Entity UserUIConfig', () => {
  test('UserUIConfig is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapUserUIConfig,
    })
  })
})
