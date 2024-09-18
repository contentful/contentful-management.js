import { expect } from 'chai'
import { describe, test } from 'mocha'
import sinon from 'sinon'
import { createClient } from '../../../lib/contentful-management'
import setupRestAdapter from '../adapters/REST/helpers/setupRestAdapter'
import { resourceMock } from '../mocks/entities'

describe('Resource', () => {
  const spaceId = 'spaceId'
  const environmentId = 'envId'
  const resourceTypeId = 'resourceTypeId'

  test('getForEnvironment', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: { items: [resourceMock] } })
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

    expect(response).to.be.an('object')
    expect(response.items[0].sys.urn).to.equal('resource-urn')

    sinon.assert.calledWith(
      httpMock.get,
      `/spaces/spaceId/environments/envId/resource_types/${resourceTypeId}/resources`
    )
  })
})
