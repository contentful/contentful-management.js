import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  wrapOrganizationMembership,
  wrapOrganizationMembershipCollection,
} from '../../../lib/entities/organization-membership'
import {
  entityCollectionWrappedTest,
  entityWrappedTest,
  entityUpdateTest,
  failingActionTest,
} from '../test-creators/instance-entity-methods'
import { describe, test } from 'mocha'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('organizationMembership'),
  }
}

describe('Entity OrganizationMembership', () => {
  test('OrganizationMembership is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapOrganizationMembership,
    })
  })

  test('OrganizationMembership collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapOrganizationMembershipCollection,
    })
  })

  test('OrganizationMembership update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapOrganizationMembership,
    })
  })

  test('OrganizationMembership update fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapOrganizationMembership,
      actionMethod: 'update',
    })
  })

  test('OrganizationMembership delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapOrganizationMembership,
      actionMethod: 'delete',
    })
  })
})
