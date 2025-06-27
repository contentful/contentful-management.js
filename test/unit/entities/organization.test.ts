import { describe, test, expect } from 'vitest'
import { cloneMock, mockCollection, organizationMock } from '../mocks/entities.js'
import type { Organization } from '../../../lib/entities/organization.js'
import { wrapOrganization, wrapOrganizationCollection } from '../../../lib/entities/organization.js'
import setupMakeRequest from '../mocks/makeRequest.js'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('organization'),
  }
}

describe('Entity Organization', () => {
  test('Organization is wrapped', async () => {
    const { makeRequest } = setup(Promise.resolve)
    const wrappedOrg = wrapOrganization(makeRequest, organizationMock)
    expect(wrappedOrg.toPlainObject()).eql(organizationMock)
  })

  test('Organization collection is wrapped', async () => {
    const { makeRequest } = setup(Promise.resolve)
    const orgCollection = mockCollection<Organization>(organizationMock)
    const wrappedOrg = wrapOrganizationCollection(makeRequest, orgCollection)
    expect(wrappedOrg.toPlainObject()).eql(orgCollection)
  })
})
