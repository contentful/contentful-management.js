import { describe, test } from 'mocha'
import { cloneMock } from '../../../mocks/entities'
import { expect } from 'chai'
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

    httpMock.get.returns(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Concept',
        action: 'get',
        params: {
          organizationId: 'organization-id',
          conceptId: 'concept-id',
        },
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.get.args[0][0]).to.eql(
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
        httpMock.get.returns(Promise.resolve({ data: { items: [entityMock] } }))

        return adapterMock
          .makeRequest({
            entityType: 'Concept',
            action: 'getMany',
            params: {
              organizationId: 'organization-id',
              ...params,
            },
          })
          .then((r) => {
            expect(r).to.eql({ items: [entityMock] })
            expect(httpMock.get.args[0][0]).to.eql(expected.url)
            expect(httpMock.get.args[0][1].params).to.eql(expected.params)
          })
      })
    })
  })
  test('getTotal', async () => {
    const { httpMock, adapterMock } = setup(Promise.resolve({}))

    httpMock.get.returns(Promise.resolve({ data: { total: 1 } }))

    return adapterMock
      .makeRequest({
        entityType: 'Concept',
        action: 'getTotal',
        params: {
          organizationId: 'organization-id',
        },
      })
      .then(() => {
        expect(httpMock.get.args[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concepts/total'
        )
      })
  })
  test('create', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.post.returns(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Concept',
        action: 'create',
        params: {
          organizationId: 'organization-id',
        },
        payload: entityMock,
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.post.args[0][0]).to.eql('/organizations/organization-id/taxonomy/concepts')
      })
  })
  test('update', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.patch.returns(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Concept',
        action: 'update',
        params: {
          organizationId: 'organization-id',
          conceptId: 'concept-id',
        },
      })
      .then(() => {
        expect(httpMock.patch.args[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concepts/concept-id'
        )
      })
  })
  test('delete', async () => {
    const { httpMock, adapterMock } = setup(Promise.resolve({}))

    httpMock.delete.returns(Promise.resolve({ data: {} }))

    return adapterMock
      .makeRequest({
        entityType: 'Concept',
        action: 'delete',
        params: {
          organizationId: 'organization-id',
          conceptId: 'concept-id',
        },
      })
      .then(() => {
        expect(httpMock.delete.args[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concepts/concept-id'
        )
      })
  })
  test('getDescendants', async () => {
    const { httpMock, adapterMock } = setup(Promise.resolve({}))

    httpMock.get.returns(Promise.resolve({ data: {} }))

    return adapterMock
      .makeRequest({
        entityType: 'Concept',
        action: 'getDescendants',
        params: {
          organizationId: 'organization-id',
          conceptId: 'concept-id',
        },
      })
      .then(() => {
        expect(httpMock.get.args[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concepts/concept-id/descendants'
        )
      })
  })

  test('getAncestors', async () => {
    const { httpMock, adapterMock } = setup(Promise.resolve({}))

    httpMock.get.returns(Promise.resolve({ data: {} }))

    return adapterMock
      .makeRequest({
        entityType: 'Concept',
        action: 'getAncestors',
        params: {
          organizationId: 'organization-id',
          conceptId: 'concept-id',
        },
      })
      .then(() => {
        expect(httpMock.get.args[0][0]).to.eql(
          '/organizations/organization-id/taxonomy/concepts/concept-id/ancestors'
        )
      })
  })
})
