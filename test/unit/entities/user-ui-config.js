import { describe, test } from 'mocha'
import { wrapUserUIConfig } from '../../../lib/entities/user-ui-config'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'

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
