import { describe } from 'mocha'
import { cloneMock } from '../../../mocks/entities'
import { expect } from 'chai'
import setupRestAdapter from '../helpers/setupRestAdapter'

describe('Environment Template', async () => {
  const mockName = 'environmentTemplate'
  const entityType = 'EnvironmentTemplate'

  const actions = [
    { name: 'create', httpMethod: 'post' },
    { name: 'update', httpMethod: 'put' },
    { name: 'versionUpdate', httpMethod: 'patch' },
    { name: 'validate', httpMethod: 'put' },
    { name: 'install', httpMethod: 'post' },
  ]

  actions.forEach((action) => {
    it(`propagates custom headers for ${action.name} request`, async () => {
      const { adapterMock, httpMock } = setupRestAdapter()

      const entityMock = cloneMock(mockName)

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
