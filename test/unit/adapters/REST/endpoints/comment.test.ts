import { describe, expect, test } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'

const response = { data: { sys: { type: 'Comment' }, body: 'Looks good', status: 'active' } }

describe('Rest Comment', { concurrent: true }, () => {
  const request = (action, params) => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve(response))

    adapterMock.makeRequest({
      entityType: 'Comment',
      action,
      userAgent: 'mocked',
      params,
      payload: { body: 'Looks good', status: 'active', sys: { version: 1 } },
    })

    return httpMock
  }

  test.each([
    ['Experience', 'experiences'],
    ['Fragment', 'fragments'],
    ['ComponentType', 'component_types'],
    ['Template', 'templates'],
  ] as const)('getMany supports %s comments', (parentEntityType, path) => {
    const httpMock = request('getMany', {
      spaceId: 'space',
      environmentId: 'env',
      parentEntityType,
      parentEntityId: 'parent',
    })

    expect(httpMock.get.mock.calls[0][0]).toBe(`/spaces/space/environments/env/${path}/parent/comments`)
  })

  test.each([
    ['create', 'post', ''],
    ['update', 'put', '/comment'],
    ['delete', 'delete', '/comment'],
  ] as const)('%s supports ExO comments', (action, method, suffix) => {
    const httpMock = request(action, {
      spaceId: 'space',
      environmentId: 'env',
      parentEntityType: 'ComponentType',
      parentEntityId: 'component-type',
      commentId: 'comment',
      version: 1,
    })

    expect(httpMock[method].mock.calls[0][0]).toBe(
      `/spaces/space/environments/env/component_types/component-type/comments${suffix}`,
    )
  })
})
