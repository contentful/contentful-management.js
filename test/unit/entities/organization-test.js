import { afterEach, beforeEach, describe, test } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { mockCollection, organizationMock } from '../mocks/entities'
import {
  __RewireAPI__ as organizationRewireApi,
  wrapOrganization,
  wrapOrganizationCollection,
} from '../../../lib/entities/organization'

const httpMock = {
  defaults: {
    baseURL: 'http://foo.bar/spaces/',
  },
  httpClientParams: {},
  cloneWithNewParams: sinon.stub(),
}

describe('Entity Organization', () => {
  beforeEach(() => {
    organizationRewireApi.__Rewire__('rateLimit', sinon.stub())
  })

  afterEach(() => {
    organizationRewireApi.__ResetDependency__('rateLimit', sinon.stub())
  })

  test('Organization is wrapped', async () => {
    const wrappedOrg = wrapOrganization(httpMock, organizationMock)
    expect(wrappedOrg.toPlainObject()).eql(organizationMock)
    expect(httpMock.cloneWithNewParams.args[0][0].baseURL).equals(
      'http://foo.bar/organizations/id/',
      'adjust the baseURL to match organizations'
    )
  })

  test('Organization collection is wrapped', async () => {
    const orgCollection = mockCollection(organizationMock)
    const wrappedOrg = wrapOrganizationCollection(httpMock, orgCollection)
    expect(wrappedOrg.toPlainObject()).eql(orgCollection)
  })
})
