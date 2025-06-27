import { cloneMock } from '../mocks/entities.js'
import { wrapAssetKey } from '../../../lib/entities/asset-key.js'
import { entityWrappedTest } from '../test-creators/instance-entity-methods.js'
import { describe, test } from 'vitest'
import setupMakeRequest from '../mocks/makeRequest.js'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
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
