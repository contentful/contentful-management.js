import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { wrapAssetKey } from '../../../lib/entities/asset-key'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'
import { describe, test } from 'mocha'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('assetKey'),
  }
}

describe('Entity AssetKey', () => {
  test('AssetKey is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAssetKey,
    })
  })
})
