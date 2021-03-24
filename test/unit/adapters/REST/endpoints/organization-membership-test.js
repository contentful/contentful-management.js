import { expect } from 'chai'
import { describe, test } from 'mocha'
import { cloneMock } from '../../../mocks/entities'
import { wrapOrganizationMembership } from '../../../../../lib/entities/organization-membership'
import setupRestAdapter from '../helpers/setupRestAdapter'

function setup(promise, params = {}) {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('organizationMembership'),
  }
}

describe('Rest Organization Membership', () => {
  test('OrganizationMembership delete', async () => {
    const { httpMock, entityMock, adapterMock } = setup()
    entityMock.sys.version = 2
    const entity = wrapOrganizationMembership(
      (...args) => adapterMock.makeRequest(...args),
      entityMock,
      'org-id'
    )
    return entity.delete().then((response) => {
      expect(httpMock.delete.args[0][0]).equals(
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
