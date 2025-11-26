import { wrapAppSignedRequest } from '../../../lib/entities/app-signed-request.js'
import { entityWrappedTest } from '../test-creators/instance-entity-methods.js'
import { appSignedRequestMock } from '../mocks/entities.js'
import { describe, test } from 'vitest'
import setupMakeRequest from '../mocks/makeRequest.js'

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
