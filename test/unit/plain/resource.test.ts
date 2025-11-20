import { describe, test, expect } from 'vitest'
import { createClient } from '../../../lib/index'
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
})
