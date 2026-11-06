import { describe, test, expect } from 'vitest'
import { createClient } from '../../../lib/index'
import setupRestAdapter from '../adapters/REST/helpers/setupRestAdapter'
import { resourceProviderMock } from '../mocks/entities'

describe('ResourceProvider', () => {
  const organizationId = 'organizationId'
  const appDefinitionId = 'appDefinitionId'

  test('get', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: resourceProviderMock }),
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.resourceProvider.get({ organizationId, appDefinitionId })

    expect(response).toBeInstanceOf(Object)
    expect(response.sys.id).toBe('id')

    expect(httpMock.get.mock.calls[0][0]).toBe(
      `/organizations/organizationId/app_definitions/appDefinitionId/resource_provider`,
    )
  })

  test('upsert', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: resourceProviderMock }),
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.resourceProvider.upsert(
      { organizationId, appDefinitionId },
      {
        sys: { id: 'id' },
        type: 'function',
        function: { sys: { id: 'id', type: 'Link', linkType: 'Function' } },
      },
    )

    expect(response).toBeInstanceOf(Object)
    expect(response.sys.id).toBe('id')

    expect(httpMock.put.mock.calls[0][0]).toBe(
      `/organizations/organizationId/app_definitions/appDefinitionId/resource_provider`,
    )
  })

  test('delete', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: '' }))
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    await plainClient.resourceProvider.delete({ organizationId, appDefinitionId })

    expect(httpMock.delete.mock.calls[0][0]).toBe(
      `/organizations/organizationId/app_definitions/appDefinitionId/resource_provider`,
    )
  })
})
