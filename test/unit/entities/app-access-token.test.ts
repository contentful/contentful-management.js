import { describe, test } from 'vitest'
import { wrapAppAccessToken } from '../../../lib/entities/app-access-token'
import { appAccessTokenMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'

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
