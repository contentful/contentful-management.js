import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'
import { wrapOrganizationInvitation } from '../../../lib/entities/organization-invitation'
import { describe, test } from 'mocha'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
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
