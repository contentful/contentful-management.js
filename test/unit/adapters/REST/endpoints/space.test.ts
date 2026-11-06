import { describe, test, expect } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'

const spaceMockResponse = {
  sys: { type: 'Space', id: 'space-id' },
  name: 'Test Space',
}

const collectionMockResponse = {
  sys: { type: 'Array' },
  total: 1,
  skip: 0,
  limit: 100,
  items: [spaceMockResponse],
}

describe('Rest Space', { concurrent: true }, () => {
  describe('get', () => {
    test('fetches correct URL with no query params when include is not set', async () => {
      const { httpMock, adapterMock } = setupRestAdapter(
        Promise.resolve({ data: spaceMockResponse }),
      )

      await adapterMock.makeRequest({
        entityType: 'Space',
        action: 'get',
        userAgent: 'mocked',
        params: { spaceId: 'space-id' },
      })

      expect(httpMock.get.mock.calls[0][0]).to.eql('/spaces/space-id')
      expect(httpMock.get.mock.calls[0][1]?.params).toBeUndefined()
    })

    test('forwards include as HTTP query param', async () => {
      const { httpMock, adapterMock } = setupRestAdapter(
        Promise.resolve({ data: spaceMockResponse }),
      )

      await adapterMock.makeRequest({
        entityType: 'Space',
        action: 'get',
        userAgent: 'mocked',
        params: { spaceId: 'space-id', include: 'sys.license' },
      })

      expect(httpMock.get.mock.calls[0][0]).to.eql('/spaces/space-id')
      expect(httpMock.get.mock.calls[0][1].params).to.eql({ include: 'sys.license' })
    })
  })

  describe('getMany', () => {
    test('fetches correct URL', async () => {
      const { httpMock, adapterMock } = setupRestAdapter(
        Promise.resolve({ data: collectionMockResponse }),
      )

      await adapterMock.makeRequest({
        entityType: 'Space',
        action: 'getMany',
        userAgent: 'mocked',
        params: {},
      })

      expect(httpMock.get.mock.calls[0][0]).to.eql('/spaces')
    })

    test('merges include into HTTP params alongside query options', async () => {
      const { httpMock, adapterMock } = setupRestAdapter(
        Promise.resolve({ data: collectionMockResponse }),
      )

      await adapterMock.makeRequest({
        entityType: 'Space',
        action: 'getMany',
        userAgent: 'mocked',
        params: { query: { limit: 10 }, include: 'sys.license' },
      })

      expect(httpMock.get.mock.calls[0][1].params).to.eql({ limit: 10, include: 'sys.license' })
    })

    test('sets X-Contentful-Organization header from organizationId', async () => {
      const { httpMock, adapterMock } = setupRestAdapter(
        Promise.resolve({ data: collectionMockResponse }),
      )

      await adapterMock.makeRequest({
        entityType: 'Space',
        action: 'getMany',
        userAgent: 'mocked',
        params: { organizationId: 'org-id', include: 'sys.license' },
      })

      expect(httpMock.get.mock.calls[0][1].params).to.eql({ include: 'sys.license' })
      expect(httpMock.get.mock.calls[0][1].headers?.['X-Contentful-Organization']).to.eql('org-id')
    })
  })
})
