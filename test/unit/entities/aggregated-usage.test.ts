import { describe, test, expect } from 'vitest'
import { cloneMock, mockCollection } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapAggregatedUsage, wrapAggregatedUsageCollection } from '../../../lib/entities/usage'

function setupAggregated() {
  const makeRequest = setupMakeRequest(Promise.resolve())
  return { makeRequest, entityMock: cloneMock('aggregatedUsage') }
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

  test('wrapAggregatedUsage handles monthly_active_profiles with dataLastUpdatedAt', () => {
    const makeRequest = setupMakeRequest(Promise.resolve())
    const entityMock = cloneMock('aggregatedUsageMonthlyActiveProfiles')
    const wrapped = wrapAggregatedUsage(makeRequest, entityMock)
    expect(wrapped.sys.key).toBe('monthly_active_profiles')
    expect(wrapped.dataLastUpdatedAt).toBe('2025-01-31T00:00:00Z')
    expect(wrapped.toPlainObject()).toEqual(entityMock)
  })
})
