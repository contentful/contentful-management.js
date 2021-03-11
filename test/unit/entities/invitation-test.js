import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'
import { wrapOrganizationInvitation } from '../../../lib/entities/organization-invitation'
import { describe, test } from 'mocha'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('organizationInvitation'),
  }
}

describe('Entity OrganizationInvitation', () => {
  test('Organization invitation is wrapped', () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapOrganizationInvitation,
    })
  })
})
