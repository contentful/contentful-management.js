import { wrapAppSignedRequest } from '../../../lib/entities/app-signed-request'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'
import { appSignedRequestMock } from '../mocks/entities'
import { describe, test } from 'vitest'
import setupMakeRequest from '../mocks/makeRequest'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: appSignedRequestMock,
  }
}

describe('App SignedRequest', () => {
  test('SignedRequest is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAppSignedRequest,
    })
  })
})
