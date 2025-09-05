import { expect, describe, test } from 'vitest'
import { cloneMock } from '../../../mocks/entities.js'
import setupRestAdapter from '../helpers/setupRestAdapter.js'

function setup(promise, params = {}) {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('functionLog'),
  }
}

describe('FunctionLog', () => {
  test('get', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.get.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'FunctionLog',
        action: 'get',
        userAgent: 'mocked',
        params: {
          spaceId: 'space-id',
          environmentId: 'environment-id',
          appInstallationId: 'app-installation-id',
          functionId: 'function-id',
          logId: 'log-id',
        },
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space-id/environments/environment-id/app_installations/app-installation-id/functions/function-id/logs/log-id',
        )
      })
  })

  test('getAll', () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.get.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'FunctionLog',
        action: 'getMany',
        userAgent: 'mocked',
        params: {
          spaceId: 'space-id',
          environmentId: 'environment-id',
          appInstallationId: 'app-installation-id',
          functionId: 'function-id',
        },
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space-id/environments/environment-id/app_installations/app-installation-id/functions/function-id/logs',
        )
      })
  })
})
