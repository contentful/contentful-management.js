import { expect, describe, test } from 'vitest'
import { cloneMock } from '../../../mocks/entities'
import setupRestAdapter from '../helpers/setupRestAdapter'

function setup(promise, params = {}, type = 'concept') {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock(type),
  }
}

describe('Concept', () => {
  test('get', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.get.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Concept',
        action: 'get',
        userAgent: 'mocked',
        params: {
          organizationId: 'organization-id',
          conceptId: 'concept-id',
        },
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concepts/concept-id'
        )
      })
  })

  describe('getMany', () => {
    const configs = [
      {
        name: 'without query params',
        params: {},
        expected: { url: '/organizations/organization-id/taxonomy/concepts', params: {} },
      },
      {
        name: 'with pageUrl query params',
        params: {
          query: { pageUrl: 'page-url' },
        },
        expected: { url: 'page-url', params: {} },
      },
      {
        name: 'with conceptScheme query params',
        params: {
          query: { conceptSchemeId: 'concept-scheme-id' },
        },
        expected: {
          url: '/organizations/organization-id/taxonomy/concepts',
          params: { conceptSchemeId: 'concept-scheme-id' },
        },
      },
    ]

    configs.forEach(({ expected, params, name }) => {
      test(name, async () => {
        const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))
        httpMock.get.mockReturnValue(Promise.resolve({ data: { items: [entityMock] } }))

        return adapterMock
          .makeRequest({
            entityType: 'Concept',
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
  test('getTotal', async () => {
    const { httpMock, adapterMock } = setup(Promise.resolve({}))

    httpMock.get.mockReturnValue(Promise.resolve({ data: { total: 1 } }))

    return adapterMock
      .makeRequest({
        entityType: 'Concept',
        action: 'getTotal',
        userAgent: 'mocked',
        params: {
          organizationId: 'organization-id',
        },
      })
      .then(() => {
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concepts/total'
        )
      })
  })
  test('create', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.post.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Concept',
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
          '/organizations/organization-id/taxonomy/concepts'
        )
      })
  })
  test('update', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.patch.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Concept',
        action: 'update',
        userAgent: 'mocked',
        params: {
          organizationId: 'organization-id',
          conceptId: 'concept-id',
        },
      })
      .then(() => {
        expect(httpMock.patch.mock.calls[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concepts/concept-id'
        )
      })
  })
  test('delete', async () => {
    const { httpMock, adapterMock } = setup(Promise.resolve({}))

    httpMock.delete.mockReturnValue(Promise.resolve({ data: {} }))

    return adapterMock
      .makeRequest({
        entityType: 'Concept',
        action: 'delete',
        userAgent: 'mocked',
        params: {
          organizationId: 'organization-id',
          conceptId: 'concept-id',
        },
      })
      .then(() => {
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concepts/concept-id'
        )
      })
  })
  test('getDescendants', async () => {
    const { httpMock, adapterMock } = setup(Promise.resolve({}))

    httpMock.get.mockReturnValue(Promise.resolve({ data: {} }))

    return adapterMock
      .makeRequest({
        entityType: 'Concept',
        action: 'getDescendants',
        userAgent: 'mocked',
        params: {
          organizationId: 'organization-id',
          conceptId: 'concept-id',
        },
      })
      .then(() => {
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concepts/concept-id/descendants'
        )
      })
  })

  test('getAncestors', async () => {
    const { httpMock, adapterMock } = setup(Promise.resolve({}))

    httpMock.get.mockReturnValue(Promise.resolve({ data: {} }))

    return adapterMock
      .makeRequest({
        entityType: 'Concept',
        action: 'getAncestors',
        userAgent: 'mocked',
        params: {
          organizationId: 'organization-id',
          conceptId: 'concept-id',
        },
      })
      .then(() => {
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concepts/concept-id/ancestors'
        )
      })
  })
})
