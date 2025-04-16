import { describe, test, expect } from 'vitest'
import { createClient } from '../../../lib'
import setupRestAdapter from '../adapters/REST/helpers/setupRestAdapter'
import { resourceTypeMock } from '../mocks/entities'

describe('ResourceType', () => {
  const organizationId = 'organizationId'
  const appDefinitionId = 'appDefinitionId'
  const resourceTypeId = 'resourceTypeId'

  test('get', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: resourceTypeMock }))
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.resourceType.get({
      organizationId,
      appDefinitionId,
      resourceTypeId,
    })

    expect(response).toBeInstanceOf(Object)
    expect(response.sys.id).toBe('id')

    expect(httpMock.get.mock.calls[0][0]).toBe(
      `/organizations/organizationId/app_definitions/appDefinitionId/resource_provider/resource_types/resourceTypeId`
    )
  })

  test('getMany', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: { items: [resourceTypeMock] } })
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.resourceType.getMany({
      organizationId,
      appDefinitionId,
    })

    expect(response).toBeInstanceOf(Object)
    expect(response.items[0].sys.id).toBe('id')

    expect(httpMock.get.mock.calls[0][0]).toBe(
      `/organizations/organizationId/app_definitions/appDefinitionId/resource_provider/resource_types`
    )
  })

  test('getForEnvironment', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: { items: [resourceTypeMock] } })
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.resourceType.getForEnvironment({
      spaceId: 'spaceId',
      environmentId: 'envId',
    })

    expect(response).toBeInstanceOf(Object)
    expect(response.items[0].sys.id).toBe('id')

    expect(httpMock.get.mock.calls[0][0]).toBe(`/spaces/spaceId/environments/envId/resource_types`)
  })

  test('upsert', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: resourceTypeMock }))
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.resourceType.upsert(
      { organizationId, appDefinitionId, resourceTypeId },
      {
        name: 'resourceType',
        defaultFieldMapping: {
          title: 'title',
        },
      }
    )

    expect(response).toBeInstanceOf(Object)
    expect(response.sys.id).toBe('id')

    expect(httpMock.put.mock.calls[0][0]).toBe(
      `/organizations/organizationId/app_definitions/appDefinitionId/resource_provider/resource_types/resourceTypeId`
    )
  })

  test('delete', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: '' }))
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    await plainClient.resourceType.delete({ organizationId, appDefinitionId, resourceTypeId })

    expect(httpMock.delete.mock.calls[0][0]).toBe(
      `/organizations/organizationId/app_definitions/appDefinitionId/resource_provider/resource_types/resourceTypeId`
    )
  })
})
