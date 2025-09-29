import { expect, describe, it } from 'vitest'
import { cloneMock } from '../../../mocks/entities'
import setupRestAdapter from '../helpers/setupRestAdapter'

import type { CreateAppActionCallProps } from '../../../../../lib/entities/app-action-call'
import { wrapAppActionCallResponse } from '../../../../../lib/entities/app-action-call'
import * as rest from '../../../../../lib/adapters/REST/endpoints/app-action-call'
import type { MakeRequest, MakeRequestOptions } from '../../../../../lib/export-types'

function setup(promise, mockName, params = {}) {
  const entityMock = cloneMock(mockName)
  return {
    ...setupRestAdapter(promise, params),
    entityMock,
  }
}

describe('Rest App Action Call', { concurrent: true }, () => {
  it('should get structured App Action Call', async () => {
    const structuredCall: any = {
      sys: { id: 'call-id', type: 'AppActionCall', status: 'processing' },
    }

    const { httpMock } = setup(Promise.resolve({ data: structuredCall }), 'appActionCallResponse')

    const result = await rest.get(httpMock as any, {
      spaceId: 'space-id',
      environmentId: 'environment-id',
      appDefinitionId: 'app-definiton-id',
      appActionId: 'app-action-id',
      callId: 'call-id',
    })

    expect(result).to.deep.equal(structuredCall)
    expect(httpMock.get.mock.calls[0][0]).toBe(
      `/spaces/space-id/environments/environment-id/app_installations/app-definiton-id/actions/app-action-id/calls/call-id`,
    )
  })

  it('should get raw response', async () => {
    const rawResponse: any = {
      sys: { id: 'call-id', type: 'AppActionCallResponse' },
      response: { body: 'OK', headers: { contentType: 'application/json' } },
    }

    const { httpMock } = setup(Promise.resolve({ data: rawResponse }), 'appActionCallResponse')

    const result = await rest.getResponse(httpMock as any, {
      spaceId: 'space-id',
      environmentId: 'environment-id',
      appDefinitionId: 'app-definiton-id',
      appActionId: 'app-action-id',
      callId: 'call-id',
    })

    expect(result).to.deep.equal(rawResponse)
    expect(httpMock.get.mock.calls[0][0]).toBe(
      `/spaces/space-id/environments/environment-id/app_installations/app-definiton-id/actions/app-action-id/calls/call-id/response`,
    )
  })

  it('should create with result and poll until completion', async () => {
    // First POST and next GET returns processing call with sys.id; , then succeeded
    const processing: any = { sys: { id: 'call-id', type: 'AppActionCall', status: 'processing' } }
    const succeeded: any = {
      sys: { id: 'call-id', type: 'AppActionCall', status: 'succeeded', result: { ok: true } },
    }

    const { httpMock } = setup(Promise.resolve({ data: processing }), 'appActionCallResponse')

    httpMock.get
      .mockImplementationOnce(() => Promise.resolve({ data: processing }))
      .mockImplementationOnce(() => Promise.resolve({ data: succeeded }))

    const result = await rest.createWithResult(
      httpMock as any,
      {
        spaceId: 'space-id',
        environmentId: 'environment-id',
        appDefinitionId: 'app-definiton-id',
        appActionId: 'app-action-id',
        retryInterval: 10,
        retries: 5,
      },
      { parameters: {} },
    )

    expect(result).to.deep.equal(succeeded)

    expect(httpMock.post.mock.calls[0][0]).toBe(
      `/spaces/space-id/environments/environment-id/app_installations/app-definiton-id/actions/app-action-id/calls`,
    )

    expect(
      httpMock.get.mock.calls.filter((call) =>
        call.includes(
          `/spaces/space-id/environments/environment-id/app_installations/app-definiton-id/actions/app-action-id/calls/call-id`,
        ),
      ),
    ).toHaveLength(2)
  })

  it('createWithResult times out when status stays processing', async () => {
    const processing: any = { sys: { id: 'call-id', type: 'AppActionCall', status: 'processing' } }

    const { httpMock } = setup(Promise.resolve({ data: processing }), 'appActionCallResponse')

    // Always return processing to trigger timeout
    httpMock.get.mockImplementation(() => Promise.resolve({ data: processing }))

    const numRetries = 4

    await expect(
      rest.createWithResult(
        httpMock as any,
        {
          spaceId: 'space-id',
          environmentId: 'environment-id',
          appDefinitionId: 'app-definiton-id',
          appActionId: 'app-action-id',
          retryInterval: 5,
          retries: numRetries,
        },
        { parameters: {} },
      ),
    ).rejects.toThrow('The app action result is taking longer than expected to process.')

    expect(
      httpMock.get.mock.calls.filter((call) =>
        call.includes(
          `/spaces/space-id/environments/environment-id/app_installations/app-definiton-id/actions/app-action-id/calls/call-id`,
        ),
      ),
    ).toHaveLength(numRetries)
  })

  it('createWithResult resolves with failed status and error intact', async () => {
    const createdCall: any = { sys: { id: 'call-id', type: 'AppActionCall', status: 'processing' } }
    const failed: any = {
      sys: {
        id: 'call-id',
        type: 'AppActionCall',
        status: 'failed',
        error: { sys: { type: 'Error', id: 'ValidationError' }, message: 'invalid' },
      },
    }

    const { httpMock } = setup(Promise.resolve({ data: createdCall }), 'appActionCallResponse')
    httpMock.get.mockImplementationOnce(() => Promise.resolve({ data: failed }))

    const result = await rest.createWithResult(
      httpMock as any,
      {
        spaceId: 'space-id',
        environmentId: 'environment-id',
        appDefinitionId: 'app-definiton-id',
        appActionId: 'app-action-id',
        retryInterval: 5,
        retries: 3,
      },
      { parameters: {} },
    )

    expect(result).to.deep.equal(failed)
  })

  it('createWithResult retries on thrown GET errors then times out', async () => {
    const createdCall: any = { sys: { id: 'call-id', type: 'AppActionCall', status: 'processing' } }
    const { httpMock } = setup(Promise.resolve({ data: createdCall }), 'appActionCallResponse')

    httpMock.get.mockRejectedValue(new Error('not ready'))

    const numRetries = 3

    await expect(
      rest.createWithResult(
        httpMock as any,
        {
          spaceId: 'space-id',
          environmentId: 'environment-id',
          appDefinitionId: 'app-definiton-id',
          appActionId: 'app-action-id',
          retryInterval: 5,
          retries: numRetries,
        },
        { parameters: {} },
      ),
    ).rejects.toThrow('The app action result is taking longer than expected to process.')

    expect(
      httpMock.get.mock.calls.filter((call) =>
        call.includes(
          `/spaces/space-id/environments/environment-id/app_installations/app-definiton-id/actions/app-action-id/calls/call-id`,
        ),
      ),
    ).toHaveLength(numRetries)
  })

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

    const response = await entity.createWithResponse(
      {
        spaceId: 'space-id',
        environmentId: 'environment-id',
        appDefinitionId: 'app-definiton-id',
        appActionId: 'app-action-id',
      },
      payload,
    )

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

    await expect(
      entity.createWithResponse(
        {
          spaceId: 'space-id',
          environmentId: 'environment-id',
          appDefinitionId: 'app-definiton-id',
          appActionId: 'app-action-id',
        },
        { parameters: {} },
      ),
    ).rejects.toThrow('The app action response is taking longer than expected to process.')

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

    const result = await entity.createWithResponse(
      {
        spaceId: 'space-id',
        environmentId: 'environment-id',
        appDefinitionId: 'app-definiton-id',
        appActionId: 'app-action-id',
      },
      { parameters: {} },
    )

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

    await expect(
      entity.createWithResponse(
        {
          spaceId: 'space-id',
          environmentId: 'environment-id',
          appDefinitionId: 'app-definiton-id',
          appActionId: 'app-action-id',
        },
        { parameters: {} },
      ),
    ).rejects.toThrow('The app action response is taking longer than expected to process.')

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

    await expect(
      entity.createWithResponse(
        {
          spaceId: 'space-id',
          environmentId: 'environment-id',
          appDefinitionId: 'app-definiton-id',
          appActionId: 'app-action-id',
        },
        { parameters: {} },
      ),
    ).rejects.toThrow('The app action response is taking longer than expected to process.')

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
      url: '',
      method: '',
      headers: {},
      body: '',
    }

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: responseMock }),
      'appActionCallResponse',
    )

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock,
    )

    await expect(
      entity.createWithResponse(
        {
          spaceId: 'space-id',
          environmentId: 'environment-id',
          appDefinitionId: 'app-definiton-id',
          appActionId: 'app-action-id',
        },
        { parameters: {} },
      ),
    ).rejects.toThrow('App action not found or lambda fails')

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

    await expect(
      entity.createWithResponse(
        {
          spaceId: 'space-id',
          environmentId: 'environment-id',
          appDefinitionId: 'app-definiton-id',
          appActionId: 'app-action-id',
        },
        { parameters: {} },
      ),
    ).rejects.toThrow('The app action response is taking longer than expected to process.')

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
      url: '',
      method: '',
      headers: {},
      body: '',
    }

    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: responseMock }),
      'appActionCallResponse',
    )

    const entity = wrapAppActionCallResponse(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock,
    )

    await expect(
      entity.createWithResponse(
        {
          spaceId: 'space-id',
          environmentId: 'environment-id',
          appDefinitionId: 'app-definiton-id',
          appActionId: 'app-action-id',
        },
        { parameters: {} },
      ),
    ).rejects.toThrow('App action not found or lambda fails')

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

    const response = await entity.getCallDetails({
      spaceId: 'space-id',
      environmentId: 'environment-id',
      appActionId: 'app-action-id',
      callId: 'call-id',
    })

    expect(response).to.be.an('object')
    expect(response).to.deep.equal(entityMock)

    expect(httpMock.get.mock.calls[0][0]).toBe(
      `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`,
    )
  })
})
