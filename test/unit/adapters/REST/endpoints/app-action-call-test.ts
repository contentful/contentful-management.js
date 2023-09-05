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

function setup(promise, mockName, params = {}) {
  const entityMock = cloneMock(mockName)
  return {
    ...setupRestAdapter(promise, params),
    entityMock,
  }
}

describe('Rest App Action Call', () => {
  it('should create a new App Action Call', async () => {
    const responseMock = cloneMock('appActionCallResponse')

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: responseMock }),
      'appActionCallResponse'
    )

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
    const responseMock = cloneMock('appActionCallResponse')

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: responseMock }),
      'appActionCallResponse'
    )

    httpMock.get = sinon.stub().returns(new Error('getCallDetails error'))
    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock
    )

    try {
      await entity.createWithResponse()
    } catch (error) {
      expect(error.message).to.equal(
        'The app action response is taking longer than expected to process.'
      )
    }

    sinon.assert.callCount(
      httpMock.get.withArgs(
        `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`
      ),
      10
    )
  })

  it('should successfully retry and resolve after a non-successful status code', async () => {
    const responseMock = cloneMock('appActionCallResponse')

    const errorResponseMock = { ...responseMock, statusCode: 404 }

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: errorResponseMock }),
      'appActionCallResponse'
    )

    httpMock.get.onFirstCall().returns(Promise.resolve({ data: errorResponseMock }))
    httpMock.get.onSecondCall().returns(Promise.resolve({ data: errorResponseMock }))
    httpMock.get.onThirdCall().returns(Promise.resolve({ data: responseMock }))

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock
    )

    const result = await entity.createWithResponse()

    expect(result).to.deep.equal(responseMock)

    sinon.assert.callCount(
      httpMock.get.withArgs(
        '/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id'
      ),
      3
    )
  })

  it('re-polls if getCallDetails returns 400', async () => {
    const responseMock = cloneMock('appActionCallResponse')
    responseMock.statusCode = 400

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: responseMock }),
      'appActionCallResponse'
    )

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock
    )

    try {
      await entity.createWithResponse()
    } catch (error) {
      expect(error.message).to.equal(
        'The app action response is taking longer than expected to process.'
      )
    }

    sinon.assert.callCount(
      httpMock.get.withArgs(
        `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`
      ),
      10
    )
  })

  it('re-polls if logs are not set yet (getCallDetails returns 404)', async () => {
    const responseMock = cloneMock('appActionCallResponse')
    responseMock.statusCode = 404

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: responseMock }),
      'appActionCallResponse'
    )

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock
    )

    try {
      await entity.createWithResponse()
    } catch (error) {
      expect(error.message).to.equal(
        'The app action response is taking longer than expected to process.'
      )
    }

    sinon.assert.callCount(
      httpMock.get.withArgs(
        `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`
      ),
      10
    )
  })

  it('stops re-polling if app action is not found', async () => {
    const responseMock = cloneMock('appActionCallResponse')
    responseMock.statusCode = 200
    responseMock.response = {
      statusCode: 404,
    }

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: responseMock }),
      'appActionCallResponse'
    )

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock
    )

    try {
      await entity.createWithResponse()
    } catch (error) {
      expect(error.message).to.equal('App action not found or lambda fails')
    }
    sinon.assert.callCount(
      httpMock.get.withArgs(
        `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`
      ),
      1
    )
  })

  it('re-polls number of times and interval specified by retry options', async () => {
    const responseMock = cloneMock('appActionCallResponse')
    const numRetries = 5
    responseMock.statusCode = 404

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: responseMock }),
      'appActionCallResponse'
    )

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock,
      { retries: numRetries, retryInterval: 500 }
    )

    try {
      await entity.createWithResponse()
    } catch (error) {
      expect(error.message).to.equal(
        'The app action response is taking longer than expected to process.'
      )
    }

    sinon.assert.callCount(
      httpMock.get.withArgs(
        `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`
      ),
      numRetries
    )
  })

  it('stops re-polling if lambda fails', async () => {
    const responseMock = cloneMock('appActionCallResponse')
    responseMock.statusCode = 200
    responseMock.response = {
      statusCode: 500,
    }

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: responseMock }),
      'appActionCallResponse'
    )

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock
    )

    try {
      await entity.createWithResponse()
    } catch (error) {
      expect(error.message).to.equal('App action not found or lambda fails')
    }
    sinon.assert.callCount(
      httpMock.get.withArgs(
        `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`
      ),
      1
    )
  })

  it('should get details of an App Action Call', async () => {
    const responseMock = cloneMock('appActionCallResponse')

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: responseMock }),
      'appActionCallResponse'
    )
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
