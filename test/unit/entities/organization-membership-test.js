import test from 'blue-tape'
import {cloneMock} from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {wrapOrganizationMembership, wrapOrganizationMembershipCollection} from '../../../lib/entities/organization-membership'
import {
  entityWrappedTest,
  entityCollectionWrappedTest,
  entityUpdateTest,
  entityDeleteTest,
  failingActionTest,
  failingVersionActionTest
} from '../test-creators/instance-entity-methods'

function setup (promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('organizationMembership')
  }
}

test('OrganizationMembership is wrapped', (t) => {
  entityWrappedTest(t, setup, {
    wrapperMethod: wrapOrganizationMembership
  })
})

test('OrganizationMembership collection is wrapped', (t) => {
  return entityCollectionWrappedTest(t, setup, {
    wrapperMethod: wrapOrganizationMembershipCollection
  })
})

test('OrganizationMembership update', (t) => {
  return entityUpdateTest(t, setup, {
    wrapperMethod: wrapOrganizationMembership
  })
})

test('OrganizationMembership update fails', (t) => {
  return failingVersionActionTest(t, setup, {
    wrapperMethod: wrapOrganizationMembership,
    actionMethod: 'update'
  })
})

test('OrganizationMembership delete', (t) => {
  return entityDeleteTest(t, setup, {
    wrapperMethod: wrapOrganizationMembership
  })
})

test('OrganizationMembership delete fails', (t) => {
  return failingActionTest(t, setup, {
    wrapperMethod: wrapOrganizationMembership,
    actionMethod: 'delete'
  })
})
