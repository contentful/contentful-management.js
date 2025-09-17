import { describe, test } from 'vitest'
import { wrapAppAccessToken } from '../../../lib/entities/app-access-token.js'
import { appAccessTokenMock } from '../mocks/entities.js'
import setupMakeRequest from '../mocks/makeRequest.js'
import { entityWrappedTest } from '../test-creators/instance-entity-methods.js'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: appAccessTokenMock,
  }
}

describe('AppAccessToken', () => {
  test('AppAccessToken is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAppAccessToken,
    })
  })
})
