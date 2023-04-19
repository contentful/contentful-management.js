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

function setup(params = {}) {
  const entityMock: AppActionCallResponse = cloneMock('appActionCall')
  const promise = Promise.resolve({ data: entityMock })
  return {
    ...setupRestAdapter(promise, params),
    entityMock,
  }
}

describe('Rest App Action Call', () => {
  it('should create a new App Action Call', async () => {
    const { httpMock, adapterMock, entityMock } = setup()
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
})
