import test from 'blue-tape'
import sinon from 'sinon'
import {organizationMock, mockCollection} from '../mocks/entities'
import {wrapOrganization, wrapOrganizationCollection, __RewireAPI__ as organizationRewireApi} from '../../../lib/entities/organization'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'

const httpMock = {
  defaults: {
    baseURL: 'http://foo.bar/spaces/'
  },
  httpClientParams: {},
  cloneWithNewParams: sinon.stub()
}

function setup (promise) {
  organizationRewireApi.__Rewire__('rateLimit', sinon.stub())
}

function teardown () {
  organizationRewireApi.__ResetDependency__('rateLimit', sinon.stub())
}

test('Organization is wrapped', (t) => {
  entityWrappedTest(t, setup, {
    wrapperMethod: wrapOrganization
  })
})

test('Organization collection is wrapped', (t) => {
  setup()
  const orgCollection = mockCollection(organizationMock)
  const wrappedOrg = wrapOrganizationCollection(httpMock, orgCollection)
  t.looseEqual(wrappedOrg.toPlainObject(), orgCollection)
  teardown()
  t.end()
})
