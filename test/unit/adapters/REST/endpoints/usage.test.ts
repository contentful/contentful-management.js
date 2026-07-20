import { describe, test, expect } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'

const collectionMockResponse = {
  sys: { type: 'Array' },
  total: 1,
  skip: 0,
  limit: 100,
  items: [
    {
      sys: {
        id: 'mock-metric-id',
        type: 'FunctionInvocation',
        key: 'api_call_cma',
        organization: { sys: { type: 'Link', linkType: 'Organization', id: 'org-id' } },
        unitOfMeasurement: 'Invocation',
        dimensions: {},
        accumulation: 'integrate',
      },
      dateRange: { start: '2026-06-01', end: '2026-06-30' },
      granularity: 'P1D',
      data: [1, 2, 3],
    },
  ],
}

describe('Rest Usage', { concurrent: true }, () => {
  describe('getAggregated', () => {
    test('fetches correct URL', async () => {
      const { httpMock, adapterMock } = setupRestAdapter(
        Promise.resolve({ data: collectionMockResponse }),
      )

      await adapterMock.makeRequest({
        entityType: 'Usage',
        action: 'getAggregated',
        userAgent: 'mocked',
        params: {
          organizationId: 'org-id',
          metricKey: 'api_call_cma',
          query: { 'date[gte]': '2026-06-01', 'date[lte]': '2026-06-30' },
        },
      })

      expect(httpMock.get.mock.calls[0][0]).to.eql('/organizations/org-id/usages/api_call_cma')
    })

    test('passes single-value filter as query param', async () => {
      const { httpMock, adapterMock } = setupRestAdapter(
        Promise.resolve({ data: collectionMockResponse }),
      )

      await adapterMock.makeRequest({
        entityType: 'Usage',
        action: 'getAggregated',
        userAgent: 'mocked',
        params: {
          organizationId: 'org-id',
          metricKey: 'api_call_cma',
          query: {
            'date[gte]': '2026-06-01',
            'date[lte]': '2026-06-30',
            'filter[sys.dimensions.space.sys.id]': 'space-id-1',
          },
        },
      })

      expect(httpMock.get.mock.calls[0][1].params).to.include({
        'filter[sys.dimensions.space.sys.id]': 'space-id-1',
      })
    })

    test('passes [in] multi-value filter as comma-separated string query param', async () => {
      const { httpMock, adapterMock } = setupRestAdapter(
        Promise.resolve({ data: collectionMockResponse }),
      )

      await adapterMock.makeRequest({
        entityType: 'Usage',
        action: 'getAggregated',
        userAgent: 'mocked',
        params: {
          organizationId: 'org-id',
          metricKey: 'api_call_cma',
          query: {
            'date[gte]': '2026-06-01',
            'date[lte]': '2026-06-30',
            'filter[sys.dimensions.space.sys.id][in]': 'id1,id2,id3',
          },
        },
      })

      expect(httpMock.get.mock.calls[0][1].params).to.include({
        'filter[sys.dimensions.space.sys.id][in]': 'id1,id2,id3',
      })
    })

    test('passes non-space dimension filter as query param', async () => {
      const { httpMock, adapterMock } = setupRestAdapter(
        Promise.resolve({ data: collectionMockResponse }),
      )

      await adapterMock.makeRequest({
        entityType: 'Usage',
        action: 'getAggregated',
        userAgent: 'mocked',
        params: {
          organizationId: 'org-id',
          metricKey: 'functions_invocations',
          query: {
            'date[gte]': '2026-06-01',
            'date[lte]': '2026-06-30',
            'filter[sys.dimensions.function.sys.id]': 'fn-id-1',
          },
        },
      })

      expect(httpMock.get.mock.calls[0][1].params).to.include({
        'filter[sys.dimensions.function.sys.id]': 'fn-id-1',
      })
    })
  })
})
