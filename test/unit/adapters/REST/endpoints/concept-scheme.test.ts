import { expect, describe, test } from 'vitest'

import { cloneMock } from '../../../mocks/entities'
import setupRestAdapter from '../helpers/setupRestAdapter'

function setup<T>(promise: Promise<T>, params = {}, type = 'conceptScheme') {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock(type),
  }
}

describe('ConceptScheme', () => {
  test('get', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))
    httpMock.get.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'ConceptScheme',
        action: 'get',
        userAgent: 'mocked',
        params: {
          organizationId: 'organization-id',
          conceptSchemeId: 'concept-scheme-id',
        },
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concept-schemes/concept-scheme-id'
        )
      })
  })

  test('getTotal', async () => {
    const { httpMock, adapterMock } = setup(Promise.resolve({}))
    httpMock.get.mockReturnValue(Promise.resolve({ data: { total: 1 } }))

    return adapterMock
      .makeRequest({
        entityType: 'ConceptScheme',
        action: 'getTotal',
        userAgent: 'mocked',
        params: {
          organizationId: 'organization-id',
        },
      })
      .then(() => {
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concept-schemes/total'
        )
      })
  })
  test('create', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))
    httpMock.post.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'ConceptScheme',
        action: 'create',
        userAgent: 'mocked',
        params: {
          organizationId: 'organization-id',
        },
        payload: entityMock,
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.post.mock.calls[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concept-schemes'
        )
      })
  })

  test('update', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))
    httpMock.patch.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'ConceptScheme',
        action: 'update',
        userAgent: 'mocked',
        params: {
          organizationId: 'organization-id',
          conceptSchemeId: 'concept-scheme-id',
        },
      })
      .then(() => {
        expect(httpMock.patch.mock.calls[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concept-schemes/concept-scheme-id'
        )
      })
  })

  test('delete', async () => {
    const { httpMock, adapterMock } = setup(Promise.resolve({}))
    httpMock.delete.mockReturnValue(Promise.resolve({ data: {} }))

    return adapterMock
      .makeRequest({
        entityType: 'ConceptScheme',
        action: 'delete',
        userAgent: 'mocked',
        params: {
          organizationId: 'organization-id',
          conceptSchemeId: 'concept-scheme-id',
          version: 1,
        },
      })
      .then(() => {
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concept-schemes/concept-scheme-id'
        )
        expect(httpMock.delete.mock.calls[0][1].headers).to.eql({ 'X-Contentful-Version': 1 })
      })
  })

  describe('getMany', () => {
    const configs = [
      {
        name: 'without query params',
        params: {},
        expected: {
          url: '/organizations/organization-id/taxonomy/concept-schemes',
          params: undefined,
        },
      },
      {
        name: 'with pageUrl query params',
        params: {
          query: { pageUrl: 'page-url', params: {} },
        },
        expected: { url: 'page-url', params: {} },
      },
    ]

    configs.forEach(({ expected, params, name }) => {
      test(name, async () => {
        const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))
        httpMock.get.mockReturnValue(Promise.resolve({ data: { items: [entityMock] } }))

        return adapterMock
          .makeRequest({
            entityType: 'ConceptScheme',
            action: 'getMany',
            userAgent: 'mocked',
            params: {
              organizationId: 'organization-id',
              ...params,
            },
          })
          .then((r) => {
            expect(r).to.eql({ items: [entityMock] })
            expect(httpMock.get.mock.calls[0][0]).to.eql(expected.url)
            expect(httpMock.get.mock.calls[0][1].params).to.eql(expected.params)
          })
      })
    })
  })
})
