import sinon from 'sinon'
import { environmentMock, mockCollection } from '../mocks/entities'
import {
  __RewireAPI__ as environmentRewireApi,
  wrapEnvironment,
  wrapEnvironmentCollection,
} from '../../../lib/entities/environment'
import { afterEach, beforeEach, describe, test } from 'mocha'
import { expect } from 'chai'

const httpMock = {
  httpClientParams: {},
  defaults: {
    baseURL: 'http://foo.bar/',
  },
  cloneWithNewParams: sinon.stub(),
}

describe('Entity Environment', () => {
  beforeEach(() => {
    environmentRewireApi.__Rewire__('rateLimit', sinon.stub())
  })

  afterEach(() => {
    environmentRewireApi.__ResetDependency__('rateLimit')
  })

  test('Environment is wrapped', async () => {
    const wrappedEnvironment = wrapEnvironment(httpMock, environmentMock)
    expect(wrappedEnvironment.toPlainObject()).eql(environmentMock)
    expect(httpMock.cloneWithNewParams.args[0][0].baseURL).equals(
      'http://foo.bar/environments/id',
      'adjust the baseURL to match environments'
    )
    expect(httpMock.cloneWithNewParams.args[1][0].space).equals(
      'id',
      'adjust the baseURL to match environments'
    )
  })

  test('Environment collection is wrapped', async () => {
    const environmentCollection = mockCollection(environmentMock)
    const wrappedEnvironment = wrapEnvironmentCollection(httpMock, environmentCollection)
    expect(wrappedEnvironment.toPlainObject()).eql(environmentCollection)
  })
})
