import { describe, test, expect, afterAll } from 'vitest'
import { defaultClient, getTestOrganizationId, initPlainClient, timeoutToCalmRateLimiting } from '../helpers'

describe('Usage API', async function () {
  afterAll(timeoutToCalmRateLimiting)

  const orgId = getTestOrganizationId()

  describe('Contentful client (legacy)', () => {
    describe('getUsageAggregated', () => {
      test('returns a collection with sys.type Array', async () => {
        const result = await defaultClient.getUsageAggregated(orgId, 'functions_invocations', {
          'date.gte': '2025-01-01',
          'date.lte': '2025-01-31',
          granularity: 'P1D',
        })
        expect(result.sys.type).toBe('Array')
        expect(typeof result.total).toBe('number')
        expect(typeof result.limit).toBe('number')
        expect(typeof result.skip).toBe('number')
        expect(Array.isArray(result.items)).toBe(true)
      })

      test('each item has the expected shape', async () => {
        const result = await defaultClient.getUsageAggregated(orgId, 'functions_invocations', {
          'date.gte': '2025-01-01',
          'date.lte': '2025-01-31',
        })
        for (const item of result.items) {
          expect(item.sys.key).toBe('functions_invocations')
          expect(item.sys.organization.sys.id).toBe(orgId)
          expect(Array.isArray(item.data)).toBe(true)
          expect(item.dateRange.start).toBeDefined()
          expect(item.dateRange.end).toBeDefined()
        }
      })

      test('respects limit and skip query params', async () => {
        const result = await defaultClient.getUsageAggregated(orgId, 'functions_invocations', {
          'date.gte': '2025-01-01',
          'date.lte': '2025-01-31',
          limit: 1,
          skip: 0,
        })
        expect(result.items.length).toBeLessThanOrEqual(1)
      })
    })

    describe('getUsageDetailedAssetBandwidth', () => {
      test('returns a collection with sys.type Array', async () => {
        const result = await defaultClient.getUsageDetailedAssetBandwidth(orgId, {
          'date.gte': '2025-01-01',
          'date.lte': '2025-01-31',
        })
        expect(result.sys.type).toBe('Array')
        expect(typeof result.limit).toBe('number')
        expect(Array.isArray(result.items)).toBe(true)
      })

      test('each item has the expected shape', async () => {
        const result = await defaultClient.getUsageDetailedAssetBandwidth(orgId, {
          'date.gte': '2025-01-01',
          'date.lte': '2025-01-31',
        })
        for (const item of result.items) {
          expect(item.sys.type).toBe('AssetBandwidthUsage')
          expect(item.sys.asset.sys.linkType).toBe('Asset')
          expect(item.sys.space.sys.linkType).toBe('Space')
          expect(typeof item.usedBandwidth).toBe('number')
        }
      })
    })

    describe('getOrganizationUsage (deprecated)', () => {
      test('still returns a collection', async () => {
        const result = await defaultClient.getOrganizationUsage(orgId, {
          'metric[in]': 'cma',
          'dateRange.startAt': '2019-10-01',
          'dateRange.endAt': '2019-10-31',
        })
        expect(result.sys.type).toBe('Array')
        expect(Array.isArray(result.items)).toBe(true)
      })
    })

    describe('getSpaceUsage (deprecated)', () => {
      test('still returns a collection', async () => {
        const result = await defaultClient.getSpaceUsage(orgId, {
          'metric[in]': 'cda',
          'dateRange.startAt': '2019-10-01',
          'dateRange.endAt': '2019-10-31',
        })
        expect(result.sys.type).toBe('Array')
        expect(Array.isArray(result.items)).toBe(true)
      })
    })
  })

  describe('PlainClient', () => {
    const plainClient = initPlainClient()

    describe('usage.getAggregated', () => {
      test('returns a collection with sys.type Array', async () => {
        const result = await plainClient.usage.getAggregated({
          organizationId: orgId,
          query: {
            'date.gte': '2025-01-01',
            'date.lte': '2025-01-31',
            granularity: 'P1D',
          },
        })
        expect(result.sys.type).toBe('Array')
        expect(typeof result.total).toBe('number')
        expect(Array.isArray(result.items)).toBe(true)
      })

      test('each item has key matching the requested metricKey', async () => {
        const result = await plainClient.usage.getAggregated({
          organizationId: orgId,
          metricKey: 'functions_invocations',
          query: {
            'date.gte': '2025-01-01',
            'date.lte': '2025-01-31',
          },
        })
        for (const item of result.items) {
          expect(item.sys.key).toBe('functions_invocations')
        }
      })
    })

    describe('usage.getDetailedAssetBandwidth', () => {
      test('returns a collection with sys.type Array', async () => {
        const result = await plainClient.usage.getDetailedAssetBandwidth({
          organizationId: orgId,
          query: {
            'date.gte': '2025-01-01',
            'date.lte': '2025-01-31',
          },
        })
        expect(result.sys.type).toBe('Array')
        expect(typeof result.limit).toBe('number')
        expect(Array.isArray(result.items)).toBe(true)
      })
    })

    describe('usage.getManyForOrganization (deprecated)', () => {
      test('still returns a collection', async () => {
        const result = await plainClient.usage.getManyForOrganization({
          organizationId: orgId,
          query: {
            'metric[in]': 'cma',
            'dateRange.startAt': '2019-10-01',
            'dateRange.endAt': '2019-10-31',
          },
        })
        expect(result.sys.type).toBe('Array')
        expect(Array.isArray(result.items)).toBe(true)
      })
    })
  })
})
