import { expect } from 'chai'
import { describe, it } from 'mocha'
import { cloneMock } from '../../../mocks/entities'
import setupRestAdapter from '../helpers/setupRestAdapter'
import sinon from 'sinon'
import {
  CreateAppActionCallProps,
  wrapAppActionCallResponse,
} from '../../../../../lib/entities/app-action-call'
import { MakeRequest, MakeRequestOptions } from '../../../../../lib/export-types'

function setup(mockName, params = {}) {
  const entityMock = cloneMock(mockName)
  const promise = Promise.resolve({ data: entityMock })
  return {
    ...setupRestAdapter(promise, params),
    entityMock,
  }
}

describe('Rest App Action Call', () => {
  it('should create a new App Action Call', async () => {
    const { httpMock, adapterMock, entityMock } = setup('appActionCallResponse')
    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock
    )

    const payload: CreateAppActionCallProps = {
      parameters: {
        recipient: 'Alice <alice@my-company.com>',
        message_body: 'Hello from Bob!',
      },
    }

    const response = await entity.createWithResponse()

    expect(response).to.be.an('object')
    expect(response).to.deep.equal(entityMock)

    sinon.assert.calledWith(
      httpMock.post,
      `/spaces/space-id/environments/environment-id/app_installations/app-definiton-id/actions/app-action-id/calls`,
      payload
    )

    sinon.assert.calledWith(
      httpMock.get,
      `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`
    )
  })

  it('re-polls if getCallDetails throws', async () => {
    const { httpMock, adapterMock, entityMock } = setup('appActionCallResponse')

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock
    )

    entityMock.statusCode = 400

    try {
      await entity.createWithResponse()

      sinon.assert.callCount(
        httpMock.get.withArgs(
          `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`
        ),
        10
      )
    } catch (error) {
      expect(error.message).to.equal(
        'The app action response is taking longer than expected to process.'
      )
    }
  })

  it('re-polls if logs are not set yet (getCallDetails returns 404)', async () => {
    const { httpMock, adapterMock, entityMock } = setup('appActionCallResponse')

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock
    )

    entityMock.statusCode = 404

    try {
      await entity.createWithResponse()

      sinon.assert.callCount(
        httpMock.get.withArgs(
          `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`
        ),
        10
      )
    } catch (error) {
      expect(error.message).to.equal(
        'The app action response is taking longer than expected to process.'
      )
    }
  })

  it('stops re-polling if app action is not found', async () => {
    const { httpMock, adapterMock, entityMock } = setup('appActionCallResponse')

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock
    )

    entityMock.statusCode = 200
    entityMock.response = {
      statusCode: 404,
    }

    try {
      await entity.createWithResponse()

      sinon.assert.callCount(
        httpMock.get.withArgs(
          `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`
        ),
        1
      )
    } catch (error) {
      expect(error.message).to.equal('App action not found or lambda fails')
    }
  })

  it('stops re-polling if lambda fails', async () => {
    const { httpMock, adapterMock, entityMock } = setup('appActionCallResponse')

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock
    )

    entityMock.statusCode = 200
    entityMock.response = {
      statusCode: 500,
    }

    try {
      await entity.createWithResponse()

      sinon.assert.callCount(
        httpMock.get.withArgs(
          `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`
        ),
        1
      )
    } catch (error) {
      expect(error.message).to.equal('App action not found or lambda fails')
    }
  })

  it('should get details of an App Action Call', async () => {
    const { httpMock, adapterMock, entityMock } = setup('appActionCallDetails')
    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock
    )

    const response = await entity.getCallDetails()

    expect(response).to.be.an('object')
    expect(response).to.deep.equal(entityMock)

    sinon.assert.calledWith(
      httpMock.get,
      `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`
    )
  })
})
