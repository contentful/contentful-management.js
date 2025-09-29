import { expect, describe, test } from 'vitest'
import { cloneMock } from '../../../mocks/entities.js'
import setupRestAdapter from '../helpers/setupRestAdapter.js'

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
          '/organizations/organization-id/taxonomy/concepts/concept-id',
        )
      })
  })

  describe('getMany', () => {
    const configs = [
      {
        name: 'without query params',
        params: {},
        // IMPORTANT: if we pass {} instead of undefined for params, axios adds ? which breaks the pre-appended url params
        expected: { url: '/organizations/organization-id/taxonomy/concepts', params: undefined },
      },
      {
        name: 'with pageUrl query params',
        params: {
          query: { pageUrl: 'page-url' },
        },
        // IMPORTANT: if we pass {} instead of undefined for params, axios adds ? which breaks the pre-appended url params
        expected: { url: 'page-url', params: undefined },
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
          '/organizations/organization-id/taxonomy/concepts/total',
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
          '/organizations/organization-id/taxonomy/concepts',
        )
      })
  })
  test('createWithId', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.put.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Concept',
        action: 'createWithId',
        params: {
          organizationId: 'organization-id',
          conceptId: 'concept-id',
        },
        payload: entityMock,
        userAgent: 'mocked',
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concepts/concept-id',
        )
      })
  })
  test('patch', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.patch.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Concept',
        action: 'patch',
        params: {
          organizationId: 'organization-id',
          conceptId: 'concept-id',
        },
        userAgent: 'mocked',
      })
      .then(() => {
        expect(httpMock.patch.mock.calls[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concepts/concept-id',
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
          '/organizations/organization-id/taxonomy/concepts/concept-id',
        )
      })
  })
  test('updatePut', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.put.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Concept',
        action: 'update',
        params: {
          organizationId: 'organization-id',
          conceptId: 'concept-id',
        },
        payload: entityMock,
        userAgent: 'mocked',
      })
      .then(() => {
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concepts/concept-id',
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
          '/organizations/organization-id/taxonomy/concepts/concept-id',
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
          '/organizations/organization-id/taxonomy/concepts/concept-id/descendants',
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
          '/organizations/organization-id/taxonomy/concepts/concept-id/ancestors',
        )
      })
  })
})
