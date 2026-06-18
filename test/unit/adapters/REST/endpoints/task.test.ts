import { describe, expect, test } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'

const response = { data: { sys: { type: 'Task' }, body: 'Looks good', status: 'active' } }
const payload = {
  body: 'Looks good',
  status: 'active',
  assignedTo: { sys: { type: 'Link', linkType: 'User', id: 'user' } },
  sys: { version: 2 },
}

describe('Rest Task', { concurrent: true }, () => {
  const request = (action, params) => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve(response))

    adapterMock.makeRequest({
      entityType: 'Task',
      action,
      userAgent: 'mocked',
      params,
      payload,
    })

    return httpMock
  }

  test('getMany supports legacy entryId tasks', () => {
    const httpMock = request('getMany', {
      spaceId: 'space',
      environmentId: 'env',
      entryId: 'entry',
    })

    expect(httpMock.get.mock.calls[0][0]).toBe('/spaces/space/environments/env/entries/entry/tasks')
  })

  test.each([
    ['Experience', 'experiences'],
    ['Fragment', 'fragments'],
    ['Template', 'templates'],
    ['ComponentType', 'component_types'],
  ] as const)('getMany supports %s tasks', (parentEntityType, path) => {
    const httpMock = request('getMany', {
      spaceId: 'space',
      environmentId: 'env',
      parentEntityType,
      parentEntityId: 'parent',
    })

    expect(httpMock.get.mock.calls[0][0]).toBe(
      `/spaces/space/environments/env/${path}/parent/tasks`,
    )
  })

  test.each([
    ['get', 'get', '/task'],
    ['create', 'post', ''],
    ['update', 'put', '/task'],
    ['delete', 'delete', '/task'],
  ] as const)('%s supports ExO tasks', (action, method, suffix) => {
    const httpMock = request(action, {
      spaceId: 'space',
      environmentId: 'env',
      parentEntityType: 'ComponentType',
      parentEntityId: 'component-type',
      taskId: 'task',
      version: 2,
    })

    expect(httpMock[method].mock.calls[0][0]).toBe(
      `/spaces/space/environments/env/component_types/component-type/tasks${suffix}`,
    )
  })

  test.each([
    ['update', 'put'],
    ['delete', 'delete'],
  ] as const)('%s sends the version header', (action, method) => {
    const httpMock = request(action, {
      spaceId: 'space',
      environmentId: 'env',
      parentEntityType: 'Experience',
      parentEntityId: 'experience',
      taskId: 'task',
      version: 2,
    })

    const config =
      method === 'put' ? httpMock[method].mock.calls[0][2] : httpMock[method].mock.calls[0][1]

    expect(config.headers['X-Contentful-Version']).toBe(2)
  })
})
