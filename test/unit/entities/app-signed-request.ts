import setupHttpMock from '../mocks/http'
import { wrapAppSignedRequest } from '../../../lib/entities/app-signed-request'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'
import { appSignedRequestMock } from '../mocks/entities'
import { describe, test } from 'mocha'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
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
