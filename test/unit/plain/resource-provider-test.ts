import { expect } from 'chai'
import { describe, test } from 'mocha'
import sinon from 'sinon'
import { createClient } from '../../../lib/contentful-management'
import setupRestAdapter from '../adapters/REST/helpers/setupRestAdapter'
import { resourceProviderMock } from '../mocks/entities'

describe('ResourceProvider', () => {
  const organizationId = 'organizationId'
  const appDefinitionId = 'appDefinitionId'

  test('get', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: resourceProviderMock })
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.resourceProvider.get({ organizationId, appDefinitionId })

    expect(response).to.be.an('object')
    expect(response.sys.id).to.equal('id')

    sinon.assert.calledWith(
      httpMock.get,
      `/organizations/organizationId/app_definitions/appDefinitionId/resource_provider`
    )
  })

  test('upsert', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: resourceProviderMock })
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.resourceProvider.upsert(
      { organizationId, appDefinitionId },
      {
        sys: { id: 'id' },
        type: 'function',
        function: { sys: { id: 'id', type: 'Link', linkType: 'Function' } },
      }
    )

    expect(response).to.be.an('object')
    expect(response.sys.id).to.equal('id')

    sinon.assert.calledWith(
      httpMock.put,
      `/organizations/organizationId/app_definitions/appDefinitionId/resource_provider`
    )
  })
  test('delete', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: '' }))
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    await plainClient.resourceProvider.delete({ organizationId, appDefinitionId })
    sinon.assert.calledWith(
      httpMock.delete,
      `/organizations/organizationId/app_definitions/appDefinitionId/resource_provider`
    )
  })
})
