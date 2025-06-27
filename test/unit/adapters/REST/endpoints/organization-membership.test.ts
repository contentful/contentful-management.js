import { describe, test, expect } from 'vitest'
import { cloneMock } from '../../../mocks/entities.js'
import { wrapOrganizationMembership } from '../../../../../lib/entities/organization-membership.js'
import setupRestAdapter from '../helpers/setupRestAdapter.js'

function setup(promise, params = {}) {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('organizationMembership'),
  }
}

describe('Rest Organization Membership', () => {
  test('OrganizationMembership delete', async () => {
    const { httpMock, entityMock, adapterMock } = setup(Promise.resolve({}))
    entityMock.sys.version = 2
    const entity = wrapOrganizationMembership(
      (...args) => adapterMock.makeRequest(...args),
      entityMock,
      'org-id'
    )
    return entity.delete().then((response) => {
      expect(httpMock.delete.mock.calls[0][0]).equals(
        `/organizations/org-id/organization_memberships/${entityMock.sys.id}`,
        'url is correct'
      )
      return {
        httpMock,
        entityMock,
        response,
      }
    })
  })
})
