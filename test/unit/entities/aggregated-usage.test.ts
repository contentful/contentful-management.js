import { describe, test, expect } from 'vitest'
import { cloneMock, mockCollection } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  wrapAggregatedUsage,
  wrapAggregatedUsageCollection,
  wrapAssetBandwidthUsage,
  wrapAssetBandwidthUsageCollection,
} from '../../../lib/entities/usage'

function setupAggregated() {
  const makeRequest = setupMakeRequest(Promise.resolve())
  return { makeRequest, entityMock: cloneMock('aggregatedUsage') }
}

function setupAssetBandwidth() {
  const makeRequest = setupMakeRequest(Promise.resolve())
  return { makeRequest, entityMock: cloneMock('assetBandwidthUsage') }
}

describe('Entity AggregatedUsage', () => {
  test('wrapAggregatedUsage returns an object with toPlainObject', () => {
    const { makeRequest, entityMock } = setupAggregated()
    const wrapped = wrapAggregatedUsage(makeRequest, entityMock)
    expect(wrapped.toPlainObject()).toEqual(entityMock)
  })

  test('wrapAggregatedUsageCollection wraps each item', () => {
    const { makeRequest, entityMock } = setupAggregated()
    const collection = mockCollection(entityMock)
    const wrapped = wrapAggregatedUsageCollection(makeRequest, collection)
    expect(wrapped.items).toHaveLength(1)
    expect(wrapped.items[0].toPlainObject()).toEqual(entityMock)
  })

  test('wrapAggregatedUsageCollection preserves collection metadata', () => {
    const { makeRequest, entityMock } = setupAggregated()
    const collection = mockCollection(entityMock)
    const wrapped = wrapAggregatedUsageCollection(makeRequest, collection)
    expect(wrapped.total).toBe(1)
    expect(wrapped.limit).toBe(100)
    expect(wrapped.skip).toBe(0)
    expect(wrapped.sys.type).toBe('Array')
  })
})

describe('Entity AssetBandwidthUsage', () => {
  test('wrapAssetBandwidthUsage returns an object with toPlainObject', () => {
    const { makeRequest, entityMock } = setupAssetBandwidth()
    const wrapped = wrapAssetBandwidthUsage(makeRequest, entityMock)
    expect(wrapped.toPlainObject()).toEqual(entityMock)
  })

  test('wrapAssetBandwidthUsageCollection wraps each item', () => {
    const { makeRequest, entityMock } = setupAssetBandwidth()
    const collection = { sys: { type: 'Array' as const }, limit: 1, items: [entityMock] }
    const wrapped = wrapAssetBandwidthUsageCollection(makeRequest, collection)
    expect(wrapped.items).toHaveLength(1)
    expect(wrapped.items[0].toPlainObject()).toEqual(entityMock)
  })

  test('wrapAssetBandwidthUsageCollection preserves limit and sys', () => {
    const { makeRequest, entityMock } = setupAssetBandwidth()
    const collection = { sys: { type: 'Array' as const }, limit: 5, items: [entityMock] }
    const wrapped = wrapAssetBandwidthUsageCollection(makeRequest, collection)
    expect(wrapped.limit).toBe(5)
    expect(wrapped.sys.type).toBe('Array')
  })
})
