import test from 'blue-tape'
import sinon from 'sinon'
import { organizationMock, mockCollection } from '../mocks/entities'
import {
  wrapOrganization,
  wrapOrganizationCollection,
  __RewireAPI__ as organizationRewireApi,
} from '../../../lib/entities/organization'

const httpMock = {
  defaults: {
    baseURL: 'http://foo.bar/spaces/',
  },
  httpClientParams: {},
  cloneWithNewParams: sinon.stub(),
}

function setup() {
  organizationRewireApi.__Rewire__('rateLimit', sinon.stub())
}

function teardown() {
  organizationRewireApi.__ResetDependency__('rateLimit', sinon.stub())
}

test('Organization is wrapped', (t) => {
  setup()
  const wrappedOrg = wrapOrganization(httpMock, organizationMock)
  t.looseEqual(wrappedOrg.toPlainObject(), organizationMock)
  teardown()
  t.end()
})

test('Organization collection is wrapped', (t) => {
  setup()
  const orgCollection = mockCollection(organizationMock)
  const wrappedOrg = wrapOrganizationCollection(httpMock, orgCollection)
  t.looseEqual(wrappedOrg.toPlainObject(), orgCollection)
  teardown()
  t.end()
})
