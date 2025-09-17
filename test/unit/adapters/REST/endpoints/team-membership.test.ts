import { expect, describe, test } from 'vitest'
import { cloneMock } from '../../../mocks/entities'
import { wrapTeamMembership } from '../../../../../lib/entities/team-membership'
import setupRestAdapter from '../helpers/setupRestAdapter'

function setup(promise, params = {}) {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('teamMembership'),
  }
}

describe('Rest Team Membership', () => {
  test('TeamMembership update', async () => {
    const { httpMock, entityMock, adapterMock } = setup(Promise.resolve({ data: {} }))
    entityMock.sys.version = 2
    entityMock.sys.team = { sys: { id: 'team1', linkType: 'Team', type: 'Link' } }
    const entity = wrapTeamMembership((...args) => adapterMock.makeRequest(...args), entityMock)
    entity.admin = true
    return entity.update().then((response) => {
      expect(response.toPlainObject, 'response is wrapped').to.be.ok
      expect(httpMock.put.mock.calls[0][0]).equals(
        `/organizations/mock-organization-id/teams/team1/team_memberships/${entityMock.sys.id}`,
        'url is correct',
      )
      expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).equals(
        2,
        'version header is sent',
      )
      return {
        httpMock,
        entityMock,
        response,
      }
    })
  })

  test('TeamMembership delete', async () => {
    const { httpMock, entityMock, adapterMock } = setup(Promise.resolve({ data: {} }))
    entityMock.sys.version = 2
    entityMock.sys.team = { sys: { id: 'team1', linkType: 'Team', type: 'Link' } }
    const entity = wrapTeamMembership((...args) => adapterMock.makeRequest(...args), entityMock)
    return entity.delete().then((response) => {
      expect(httpMock.delete.mock.calls[0][0]).equals(
        `/organizations/mock-organization-id/teams/team1/team_memberships/${entityMock.sys.id}`,
        'url is correct',
      )
      return {
        httpMock,
        entityMock,
        response,
      }
    })
  })
})
