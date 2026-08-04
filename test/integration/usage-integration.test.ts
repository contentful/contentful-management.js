import { describe, test, expect, afterAll } from 'vitest'
import {
  defaultClient,
  getTestOrganizationId,
  initPlainClient,
  timeoutToCalmRateLimiting,
} from '../helpers'

function lastMonthRange() {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const end = new Date(now.getFullYear(), now.getMonth(), 0)
  const fmt = (d: Date) => d.toISOString().slice(0, 10)
  return { gte: fmt(start), lte: fmt(end) }
}

describe('Usage API', async function () {
  afterAll(timeoutToCalmRateLimiting)

  const orgId = getTestOrganizationId()
  const { gte, lte } = lastMonthRange()
  describe('Contentful client (legacy)', () => {
    describe('getUsageAggregated', () => {
      test('returns a collection with sys.type Array', async () => {
        const result = await defaultClient.getUsageAggregated(orgId, 'api_call_cma', {
          'date[gte]': gte,
          'date[lte]': lte,
          granularity: 'P1D',
        })
        expect(result.sys.type).toBe('Array')
        expect(typeof result.total).toBe('number')
        expect(typeof result.limit).toBe('number')
        expect(typeof result.skip).toBe('number')
        expect(Array.isArray(result.items)).toBe(true)
      })

      test('each item has the expected shape', async () => {
        const result = await defaultClient.getUsageAggregated(orgId, 'api_call_cma', {
          'date[gte]': gte,
          'date[lte]': lte,
        })
        for (const item of result.items) {
          expect(item.sys.key).toBe('api_call_cma')
          expect(item.sys.organization.sys.id).toBe(orgId)
          expect(Array.isArray(item.data)).toBe(true)
          expect(item.dateRange.start).toBeDefined()
          expect(item.dateRange.end).toBeDefined()
        }
      })

      test('respects limit and skip query params', async () => {
        const result = await defaultClient.getUsageAggregated(orgId, 'api_call_cma', {
          'date[gte]': gte,
          'date[lte]': lte,
          limit: 1,
          skip: 0,
        })
        expect(result.items.length).toBeLessThanOrEqual(1)
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
  })

  describe('PlainClient', () => {
    const plainClient = initPlainClient()

    describe('usage.getAggregated', () => {
      test('returns a collection with sys.type Array', async () => {
        const result = await plainClient.usage.getAggregated({
          organizationId: orgId,
          metricKey: 'api_call_cma',
          query: {
            'date[gte]': '2026-06-01',
            'date[lte]': '2026-06-30',
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
          metricKey: 'api_call_cma',
          query: {
            'date[gte]': '2026-06-01',
            'date[lte]': '2026-06-30',
          },
        })
        for (const item of result.items) {
          expect(item.sys.key).toBe('api_call_cma')
        }
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
