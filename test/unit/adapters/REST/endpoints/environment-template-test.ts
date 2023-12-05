import { describe } from 'mocha'
import { cloneMock } from '../../../mocks/entities'
import { expect } from 'chai'
import setupRestAdapter from '../helpers/setupRestAdapter'

describe('Environment Template', async () => {
  const mockName = 'environmentTemplate'
  const entityType = 'EnvironmentTemplate'

  const actions = [
    // { name: 'get', httpMethod: 'get' },
    // { name: 'getMany', httpMethod: 'get' },
    { name: 'create', httpMethod: 'post' },
    { name: 'update', httpMethod: 'put' },
    { name: 'versionUpdate', httpMethod: 'patch' },
    // { name: 'del', httpMethod: 'delete' },
    // { name: 'versions', httpMethod: 'get' },
    { name: 'validate', httpMethod: 'put' },
    { name: 'install', httpMethod: 'post' },
    // { name: 'disconnect', httpMethod: 'delete' },
  ]

  actions.forEach((action) => {
    it(`propagates custom headers for ${action.name} request`, async () => {
      const { adapterMock, httpMock } = setupRestAdapter()

      const entityMock = cloneMock(mockName)
      entityMock.name = 'updated name'
      entityMock.sys.version = 2

      await adapterMock.makeRequest({
        entityType,
        action: action.name,
        params: {},
        payload: entityMock,
        headers: { 'X-Test': 'test header' },
        userAgent: 'mockedAgent',
      })

      expect(httpMock[action.httpMethod].args[0][2].headers['X-Test']).equals('test header')
    })
  })
})
