import { cloneMock } from '../mocks/entities.js'
import setupMakeRequest from '../mocks/makeRequest.js'
import { entityWrappedTest } from '../test-creators/instance-entity-methods.js'
import { wrapOrganizationInvitation } from '../../../lib/entities/organization-invitation.js'
import { describe, test } from 'vitest'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('organizationInvitation'),
  }
}

describe('Entity OrganizationInvitation', () => {
  test('Organization invitation is wrapped', () => {
    entityWrappedTest(setup, {
      wrapperMethod: wrapOrganizationInvitation,
    })
  })
})
