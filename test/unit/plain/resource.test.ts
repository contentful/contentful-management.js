import { describe, test, expect } from 'vitest'
import { createClient } from '../../../lib/contentful-management'
import setupRestAdapter from '../adapters/REST/helpers/setupRestAdapter'
import { resourceMock } from '../mocks/entities'

describe('Resource', () => {
  const spaceId = 'spaceId'
  const environmentId = 'envId'
  const resourceTypeId = 'resourceTypeId'

  test('getForEnvironment', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: { items: [resourceMock] } }),
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.resource.getMany({
      spaceId,
      environmentId,
      resourceTypeId,
      query: {
        query: '',
        limit: 1,
      },
    })

    expect(response).toBeInstanceOf(Object)
    expect(response.items[0].sys.urn).toBe('resource-urn')

    expect(httpMock.get.mock.calls[0][0]).toBe(
      `/spaces/spaceId/environments/envId/resource_types/${resourceTypeId}/resources`,
    )
  })

  test('getMany with referencingEntryId parameter', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: { items: [resourceMock] } }),
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.resource.getMany({
      spaceId,
      environmentId,
      resourceTypeId,
      query: {
        query: 'test',
        referencingEntryId: 'entry-123',
      },
    })

    expect(response).toBeInstanceOf(Object)
    expect(httpMock.get.mock.calls[0][0]).toBe(
      `/spaces/spaceId/environments/envId/resource_types/${resourceTypeId}/resources`,
    )
    expect(httpMock.get.mock.calls[0][1]).toMatchObject({
      params: {
        query: 'test',
        referencingEntryId: 'entry-123',
      },
    })
  })

  test('getMany with locale parameter', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: { items: [resourceMock] } }),
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.resource.getMany({
      spaceId,
      environmentId,
      resourceTypeId,
      query: {
        'sys.urn[in]': '123,456',
        locale: 'en-US',
      },
    })

    expect(response).toBeInstanceOf(Object)
    expect(httpMock.get.mock.calls[0][1]).toMatchObject({
      params: {
        'sys.urn[in]': '123,456',
        locale: 'en-US',
      },
    })
  })

  test('getMany with multiple optional parameters', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: { items: [resourceMock] } }),
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.resource.getMany({
      spaceId,
      environmentId,
      resourceTypeId,
      query: {
        query: 'search term',
        locale: 'de-DE',
        referencingEntryId: 'entry-456',
        limit: 10,
      },
    })

    expect(response).toBeInstanceOf(Object)
    expect(httpMock.get.mock.calls[0][1]).toMatchObject({
      params: {
        query: 'search term',
        locale: 'de-DE',
        referencingEntryId: 'entry-456',
        limit: 10,
      },
    })
  })
})
