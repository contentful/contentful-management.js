import { describe, expect } from 'vitest'
import { cloneMock } from '../../../mocks/entities.js'
import setupRestAdapter from '../helpers/setupRestAdapter.js'

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
      const { adapterMock, httpMock } = setupRestAdapter(Promise.resolve({}))

      const entityMock = cloneMock(mockName)

      await adapterMock.makeRequest({
        entityType,
        action: action.name,
        params: {},
        payload: entityMock,
        headers: { 'X-Test': 'test header' },
        userAgent: 'mockedAgent',
      })

      expect(httpMock[action.httpMethod].mock.calls[0][2].headers['X-Test']).equals('test header')
    })
  })
})
