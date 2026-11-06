import { describe, test, expect } from 'vitest'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  wrapAssetBandwidthUsage,
  wrapAssetBandwidthUsageDetailedCollection,
} from '../../../lib/entities/usage'
import type {
  AssetBandwidthUsageDetailedCollectionProps,
  AssetBandwidthUsageItemProps,
} from '../../../lib/entities/usage'

function setupAssetBandwidthUsage() {
  const makeRequest = setupMakeRequest(Promise.resolve())
  return { makeRequest, entityMock: cloneMock('assetBandwidthUsageDetailed') }
}

function mockAssetBandwidthCollection(
  entityMock: AssetBandwidthUsageItemProps,
): AssetBandwidthUsageDetailedCollectionProps {
  return {
    sys: { type: 'Array' },
    limit: 30,
    items: [entityMock],
  }
}

describe('Entity AssetBandwidthUsage', () => {
  test('wrapAssetBandwidthUsage returns an object with toPlainObject', () => {
    const { makeRequest, entityMock } = setupAssetBandwidthUsage()
    const wrapped = wrapAssetBandwidthUsage(makeRequest, entityMock)
    expect(wrapped.toPlainObject()).toEqual(entityMock)
  })

  test('wrapAssetBandwidthUsageDetailedCollection wraps each item', () => {
    const { makeRequest, entityMock } = setupAssetBandwidthUsage()
    const collection = mockAssetBandwidthCollection(entityMock)
    const wrapped = wrapAssetBandwidthUsageDetailedCollection(makeRequest, collection)
    expect(wrapped.items).toHaveLength(1)
    expect(wrapped.items[0].toPlainObject()).toEqual(entityMock)
  })

  test('wrapAssetBandwidthUsageDetailedCollection preserves collection metadata', () => {
    const { makeRequest, entityMock } = setupAssetBandwidthUsage()
    const collection = mockAssetBandwidthCollection(entityMock)
    const wrapped = wrapAssetBandwidthUsageDetailedCollection(makeRequest, collection)
    expect(wrapped.limit).toBe(30)
    expect(wrapped.sys.type).toBe('Array')
  })
})
