import { describe, test } from 'vitest'
import { expect } from 'chai'
import { cloneMock, mockCollection, organizationMock } from '../mocks/entities'
import {
  Organization,
  wrapOrganization,
  wrapOrganizationCollection,
} from '../../../lib/entities/organization'
import setupMakeRequest from '../mocks/makeRequest'

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
