import { before, describe, test } from 'mocha'
import { client } from '../helpers'
import { expect } from 'chai'

describe('Team api', function () {
  let organization

  before(async () => {
    const organizations = await client().getOrganizations()
    organization = organizations.items[0]
  })

  test('Gets teams', async () => {
    return organization.getTeams().then((response) => {
      expect(response.sys, 'sys').to.be.ok
      expect(response.items, 'items').to.be.ok
      expect(response.items[0].sys.type).equal('Team')
    })
  })

  test('Gets team', async () => {
    return organization.getTeam('7pIEx2fMx53SSR1jd7C46M').then((response) => {
      expect(response.sys, 'sys').to.be.ok
      expect(response.sys.id).equal('7pIEx2fMx53SSR1jd7C46M')
      expect(response.sys.type).equal('Team')
      expect(response.name).equal('SDK test team [DO NOT DELETE]')
    })
  })
  test('Create, update and delete team', async () => {
    return organization
      .createTeam({
        name: 'test team',
      })
      .then(async (team) => {
        expect(team.sys, 'sys').to.be.ok
        expect(team.name).equal('test team')
        expect(team.sys.type).equal('Team')
        team.description = 'test description'
        const updatedTeam = await team.update()
        expect(updatedTeam.sys, 'sys').to.be.ok
        expect(updatedTeam.name).equal('test team')
        expect(updatedTeam.sys.type).equal('Team')
        expect(updatedTeam.description).equal('test description')
        await updatedTeam.delete()
      })
  })
})
