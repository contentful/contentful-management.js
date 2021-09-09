import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { wrapAppSigningSecret } from '../../../lib/entities/app-signing-secret'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'
import { describe, test } from 'mocha'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('assetKey'),
  }
}

describe('App SigningSecret', () => {
  test('SigningSecret is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAppSigningSecret,
    })
  })
})
