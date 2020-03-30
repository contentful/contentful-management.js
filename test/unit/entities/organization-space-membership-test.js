import test from 'blue-tape'
import {cloneMock} from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {wrapOrganizationSpaceMembership, wrapOrganizationSpaceMembershipCollection} from '../../../lib/entities/organization-space-membership'
import {
  entityWrappedTest,
  entityCollectionWrappedTest
} from '../test-creators/instance-entity-methods'

function setup (promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('organizationSpaceMembership')
  }
}

test('OrganizationSpaceMembership is wrapped', (t) => {
  entityWrappedTest(t, setup, {
    wrapperMethod: wrapOrganizationSpaceMembership
  })
})

test('OrganizationMembership collection is wrapped', (t) => {
  return entityCollectionWrappedTest(t, setup, {
    wrapperMethod: wrapOrganizationSpaceMembershipCollection
  })
})
