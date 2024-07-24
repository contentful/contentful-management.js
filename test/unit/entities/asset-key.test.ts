import { cloneMock } from '../mocks/entities'
import { wrapAssetKey } from '../../../lib/entities/asset-key'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'
import { describe, test } from 'vitest'
import setupMakeRequest from '../mocks/makeRequest'

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
