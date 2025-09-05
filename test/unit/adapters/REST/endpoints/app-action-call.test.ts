import { expect, describe, it } from 'vitest'
import { cloneMock } from '../../../mocks/entities.js'
import setupRestAdapter from '../helpers/setupRestAdapter.js'

import type { CreateAppActionCallProps } from '../../../../../lib/entities/app-action-call.js'
import { wrapAppActionCallResponse } from '../../../../../lib/entities/app-action-call.js'
import type { MakeRequest, MakeRequestOptions } from '../../../../../lib/export-types.js'

function setup(promise, mockName, params = {}) {
  const entityMock = cloneMock(mockName)
  return {
    ...setupRestAdapter(promise, params),
    entityMock,
  }
}

describe('Rest App Action Call', { concurrent: true }, () => {
  it('should create a new App Action Call', async () => {
    const responseMock = cloneMock('appActionCallResponse')

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: responseMock }),
      'appActionCallResponse',
    )

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock,
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

    expect(httpMock.post.mock.calls[0][0]).toBe(
      `/spaces/space-id/environments/environment-id/app_installations/app-definiton-id/actions/app-action-id/calls`,
    )

    expect(httpMock.post.mock.calls[0][1]).toStrictEqual(payload)

    expect(httpMock.get.mock.calls[0][0]).toBe(
      `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`,
    )
  })

  it('re-polls if getCallDetails throws', async () => {
    const responseMock = cloneMock('appActionCallResponse')
    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: responseMock }),
      'appActionCallResponse',
    )

    httpMock.get.mockRejectedValue(Error('getCallDetails error'))

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock,
      { retryInterval: 100 },
    )

    await expect(entity.createWithResponse()).rejects.toThrow(
      'The app action response is taking longer than expected to process.',
    )

    expect(
      httpMock.get.mock.calls.filter((call) =>
        call.includes(
          `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`,
        ),
      ),
    ).toHaveLength(15)
  })

  it('should successfully retry and resolve after a non-successful status code', async () => {
    const responseMock = cloneMock('appActionCallResponse')

    const errorResponseMock = { ...responseMock, statusCode: 404 }

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: errorResponseMock }),
      'appActionCallResponse',
    )

    httpMock.get
      .mockImplementationOnce(() => Promise.resolve({ data: errorResponseMock }))
      .mockImplementationOnce(() => Promise.resolve({ data: errorResponseMock }))
      .mockImplementationOnce(() => Promise.resolve({ data: responseMock }))

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock,
      { retryInterval: 100 },
    )

    const result = await entity.createWithResponse()

    expect(result).to.deep.equal(responseMock)

    expect(
      httpMock.get.mock.calls.filter((call) =>
        call.includes(
          `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`,
        ),
      ),
    ).toHaveLength(3)
  })

  it('re-polls if getCallDetails returns 400', async () => {
    const responseMock = cloneMock('appActionCallResponse')
    responseMock.statusCode = 400

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: responseMock }),
      'appActionCallResponse',
    )

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock,
      { retryInterval: 100 },
    )

    await expect(entity.createWithResponse()).rejects.toThrow(
      'The app action response is taking longer than expected to process.',
    )

    expect(
      httpMock.get.mock.calls.filter((call) =>
        call.includes(
          `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`,
        ),
      ),
    ).toHaveLength(15)
  })

  it('re-polls if logs are not set yet (getCallDetails returns 404)', async () => {
    const responseMock = cloneMock('appActionCallResponse')
    responseMock.statusCode = 404

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: responseMock }),
      'appActionCallResponse',
    )

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock,
      { retryInterval: 100 },
    )

    await expect(entity.createWithResponse()).rejects.toThrow(
      'The app action response is taking longer than expected to process.',
    )

    expect(
      httpMock.get.mock.calls.filter((call) =>
        call.includes(
          `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`,
        ),
      ),
    ).toHaveLength(15)
  })

  it('stops re-polling if app action is not found', async () => {
    const responseMock = cloneMock('appActionCallResponse')
    responseMock.statusCode = 200
    responseMock.response = {
      statusCode: 404,
    }

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: responseMock }),
      'appActionCallResponse',
    )

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock,
    )

    await expect(entity.createWithResponse()).rejects.toThrow(
      'App action not found or lambda fails',
    )

    expect(
      httpMock.get.mock.calls.filter((call) =>
        call.includes(
          `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`,
        ),
      ),
    ).toHaveLength(1)
  })

  it('re-polls number of times and interval specified by retry options', async () => {
    const responseMock = cloneMock('appActionCallResponse')
    const numRetries = 5
    responseMock.statusCode = 404

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: responseMock }),
      'appActionCallResponse',
    )

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock,
      { retries: numRetries, retryInterval: 250 },
    )

    await expect(entity.createWithResponse()).rejects.toThrow(
      'The app action response is taking longer than expected to process.',
    )

    expect(
      httpMock.get.mock.calls.filter((call) =>
        call.includes(
          `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`,
        ),
      ),
    ).toHaveLength(numRetries)
  })

  it('stops re-polling if lambda fails', async () => {
    const responseMock = cloneMock('appActionCallResponse')
    responseMock.statusCode = 200
    responseMock.response = {
      statusCode: 500,
    }

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: responseMock }),
      'appActionCallResponse',
    )

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock,
    )

    await expect(entity.createWithResponse()).rejects.toThrow(
      'App action not found or lambda fails',
    )

    expect(
      httpMock.get.mock.calls.filter((call) =>
        call.includes(
          `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`,
        ),
      ),
    ).toHaveLength(1)
  })

  it('should get details of an App Action Call', async () => {
    const responseMock = cloneMock('appActionCallResponse')

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: responseMock }),
      'appActionCallResponse',
    )
    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock,
    )

    const response = await entity.getCallDetails()

    expect(response).to.be.an('object')
    expect(response).to.deep.equal(entityMock)

    expect(httpMock.get.mock.calls[0][0]).toBe(
      `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`,
    )
  })
})
