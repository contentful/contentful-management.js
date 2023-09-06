import { expect } from 'chai'
import { describe, it } from 'mocha'
import { cloneMock } from '../../../mocks/entities'
import setupRestAdapter from '../helpers/setupRestAdapter'
import sinon from 'sinon'
import { wrapDeliveryFunctionResponse } from '../../../../../lib/entities/delivery-function'
import { MakeRequest, MakeRequestOptions } from '../../../../../lib/export-types'

function setup(promise, mockName, params = {}) {
  const entityMock = cloneMock(mockName)
  return {
    ...setupRestAdapter(promise, params),
    entityMock,
  }
}

describe('Rest Delivery Function', () => {
  it('should get details of an Delivery Function', async () => {
    const responseMock = cloneMock('deliveryFunctionResponse')

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: responseMock }),
      'deliveryFunctionResponse'
    )
    const entity = wrapDeliveryFunctionResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock
    )

    const response = await entity.getCallDetails()

    expect(response).to.be.an('object')
    expect(response).to.deep.equal(entityMock)

    sinon.assert.calledWith(
      httpMock.get,
      `/organizations/org-id/app_definitions/app-id/delivery_functions`
    )
  })
})
