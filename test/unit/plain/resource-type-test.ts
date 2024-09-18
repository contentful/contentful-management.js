import { expect } from 'chai'
import { describe, test } from 'mocha'
import sinon from 'sinon'
import { createClient } from '../../../lib/contentful-management'
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

    expect(response).to.be.an('object')
    expect(response.sys.id).to.equal('id')

    sinon.assert.calledWith(
      httpMock.get,
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

    expect(response).to.be.an('object')
    expect(response.items[0].sys.id).to.equal('id')

    sinon.assert.calledWith(
      httpMock.get,
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

    expect(response).to.be.an('object')
    expect(response.items[0].sys.id).to.equal('id')

    sinon.assert.calledWith(httpMock.get, `/spaces/spaceId/environments/envId/resource_types`)
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

    expect(response).to.be.an('object')
    expect(response.sys.id).to.equal('id')

    sinon.assert.calledWith(
      httpMock.put,
      `/organizations/organizationId/app_definitions/appDefinitionId/resource_provider/resource_types/resourceTypeId`
    )
  })
  test('delete', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: '' }))
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    await plainClient.resourceType.delete({ organizationId, appDefinitionId, resourceTypeId })
    sinon.assert.calledWith(
      httpMock.delete,
      `/organizations/organizationId/app_definitions/appDefinitionId/resource_provider/resource_types/resourceTypeId`
    )
  })
})
