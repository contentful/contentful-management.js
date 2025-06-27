import { describe, it, beforeAll, expect, afterAll } from 'vitest'
import { getTestOrganization, timeoutToCalmRateLimiting } from '../helpers.js'
import { TestDefaults } from '../defaults.js'
import type { Organization } from '../../lib/export-types.js'

const { teamId, teamName } = TestDefaults

describe('Team API', () => {
  let organization: Organization

  beforeAll(async () => {
    organization = await getTestOrganization()
  })

  afterAll(timeoutToCalmRateLimiting)

  it('Gets teams', async () => {
    const response = await organization.getTeams()

    expect(response.sys).toBeTruthy()
    expect(response.items).toBeTruthy()
    expect(response.items[0].sys.type).toBe('Team')
  })

  it('Gets team by ID', async () => {
    const response = await organization.getTeam(teamId)

    expect(response.sys).toBeTruthy()
    expect(response.sys.id).toBe(teamId)
    expect(response.sys.type).toBe('Team')
    expect(response.name).toBe(teamName)
  })

  it('Creates, updates, and deletes a team', async () => {
    const team = await organization.createTeam({
      name: 'test team',
      description: 'mocked',
    })

    expect(team.sys).toBeTruthy()
    expect(team.name).toBe('test team')
    expect(team.sys.type).toBe('Team')

    team.description = 'test description'
    const updatedTeam = await team.update()

    expect(updatedTeam.sys).toBeTruthy()
    expect(updatedTeam.name).toBe('test team')
    expect(updatedTeam.sys.type).toBe('Team')
    expect(updatedTeam.description).toBe('test description')

    await updatedTeam.delete()
  })
})
