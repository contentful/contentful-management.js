import { expect } from 'chai'
import { describe, it } from 'mocha'
import { cloneMock } from '../../../mocks/entities'
import setupRestAdapter from '../helpers/setupRestAdapter'
import sinon from 'sinon'
import {
  AppActionCallResponse,
  CreateAppActionCallProps,
  wrapAppActionCall,
} from '../../../../../lib/entities/app-action-call'
import { MakeRequest, MakeRequestOptions } from '../../../../../lib/export-types'

function setup(mockName, params = {}) {
  const entityMock: AppActionCallResponse = cloneMock(mockName)
  const promise = Promise.resolve({ data: entityMock })
  return {
    ...setupRestAdapter(promise, params),
    entityMock,
  }
}

describe('Rest App Action Call', () => {
  it('should create a new App Action Call', async () => {
    const { httpMock, adapterMock, entityMock } = setup('appActionCall')
    const entity = wrapAppActionCall(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock
    )

    const payload: CreateAppActionCallProps = {
      parameters: {
        recipient: 'Alice <alice@my-company.com>',
        message_body: 'Hello from Bob!',
      },
    }

    const response = await entity.create()

    expect(response).to.be.an('object')

    sinon.assert.calledWith(
      httpMock.post,
      `/spaces/space-id/environments/environment-id/app_installations/app-definiton-id/actions/app-action-id/calls`,
      payload
    )
  })

  it('should get details of an App Action Call', async () => {
    const { httpMock, adapterMock, entityMock } = setup('appActionCallDetails')
    const entity = wrapAppActionCall(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock
    )

    const response = await entity.getCallDetails()

    expect(response).to.be.an('object')

    sinon.assert.calledWith(
      httpMock.get,
      `/spaces/space-id/environments/environment-id/actions/app-action-id/calls/call-id`
    )
  })

  it('should throw an error if maximum retries is reached', async () => {
    const { httpMock } = setup('appActionCall')

    const callAppActionResultStub = sinon
      .stub()
      .rejects(new Error('The app action response is taking longer than expected to process.'))

    const params = {
      spaceId: 'space-id',
      environmentId: 'environment-id',
      appDefinitionId: 'app-definition-id',
      appActionId: 'app-action-id',
    }

    try {
      await callAppActionResultStub(httpMock, params, {
        resolve: sinon.fake(),
        reject: sinon.fake(),
        callId: 'call-id',
        retries: 2,
        checkCount: 2,
      })
    } catch (error) {
      expect(error.message).to.equal(
        'The app action response is taking longer than expected to process.'
      )
    }
  })
})
