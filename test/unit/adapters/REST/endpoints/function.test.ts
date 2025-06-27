import { expect, describe, test } from 'vitest'
import { cloneMock } from '../../../mocks/entities.js'
import setupRestAdapter from '../helpers/setupRestAdapter.js'

function setup(promise, params = {}) {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('function'),
  }
}

describe('Function', () => {
  test('get', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.get.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Function',
        action: 'get',
        userAgent: 'mocked',
        params: {
          organizationId: 'organization-id',
          appDefinitionId: 'app-definition-id',
          functionId: 'function-id',
        },
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/organizations/organization-id/app_definitions/app-definition-id/functions/function-id'
        )
      })
  })

  test('getMany', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.get.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Function',
        action: 'getMany',
        userAgent: 'mocked',
        params: {
          organizationId: 'organization-id',
          appDefinitionId: 'app-definition-id',
        },
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/organizations/organization-id/app_definitions/app-definition-id/functions'
        )
      })
  })

  test('getManyForEnvironment', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.get.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Function',
        action: 'getManyForEnvironment',
        userAgent: 'mocked',
        params: {
          spaceId: 'space-id',
          environmentId: 'environment-id',
          appInstallationId: 'app-installation-id',
        },
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space-id/environments/environment-id/app_installations/app-installation-id/functions'
        )
      })
  })
})
