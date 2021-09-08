import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { wrapAppSignedRequest } from '../../../lib/entities/app-signed-request'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'
import { describe, test } from 'mocha'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('assetKey'),
  }
}

describe('App SignedRequest', () => {
  test('SignedRequest is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAppSignedRequest,
    })
  })
})
