import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {
  wrapOrganizationMembership,
  wrapOrganizationMembershipCollection,
} from '../../../lib/entities/organization-membership'
import {
  entityCollectionWrappedTest,
  entityWrappedTest,
  failingActionTest,
} from '../test-creators/instance-entity-methods'
import { describe, test } from 'mocha'
import { expect } from 'chai'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
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
    const { httpMock, entityMock } = setup()
    entityMock.sys.version = 2
    const entity = wrapOrganizationMembership(httpMock, entityMock, 'org1')
    entity.role = 'member'
    return entity.update().then((response) => {
      expect(response.toPlainObject, 'response is wrapped').to.be.ok
      expect(httpMock.put.args[0][0]).equals(
        `organization_memberships/${entityMock.sys.id}`,
        'url is correct'
      )
      expect(httpMock.put.args[0][1]).eql({ role: 'member' }, 'data is sent')
      expect(httpMock.put.args[0][2].headers['X-Contentful-Version']).equals(
        2,
        'version header is sent'
      )
      return {
        httpMock,
        entityMock,
        response,
      }
    })
  })

  test('OrganizationMembership update fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapOrganizationMembership,
      actionMethod: 'update',
    })
  })

  test('OrganizationMembership delete', async () => {
    const { httpMock, entityMock } = setup()
    entityMock.sys.version = 2
    const entity = wrapOrganizationMembership(httpMock, entityMock, 'org1')
    return entity.delete().then((response) => {
      expect(httpMock.delete.args[0][0]).equals(
        `organization_memberships/${entityMock.sys.id}`,
        'url is correct'
      )
      return {
        httpMock,
        entityMock,
        response,
      }
    })
  })

  test('OrganizationMembership delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapOrganizationMembership,
      actionMethod: 'delete',
    })
  })
})
