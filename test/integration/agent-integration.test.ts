import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import type { Environment, Space } from '../../lib/export-types'
import { createTestSpace, defaultClient, timeoutToCalmRateLimiting } from '../helpers'

// Skip in CI since the endpoints are feature flagged and test spaces are not persistent
// Run locally when API_INTEGRATION_TESTS is set to point to local dev environment where access can be controlled
describe.skipIf(!process.env.API_INTEGRATION_TESTS)('Agent api', { sequential: true }, () => {
  let space: Space
  let environment: Environment

  beforeAll(async () => {
    space = await createTestSpace(defaultClient, 'Agent')
    environment = await space.getEnvironment('master')
  })

  afterAll(async () => {
    if (space) {
      return space.delete()
    }

    await timeoutToCalmRateLimiting()
  })

  test('Gets ai agents', async () => {
    return environment.getAgents().then((response) => {
      expect(response.sys, 'sys').to.be.ok
      expect(response.items, 'items').to.be.ok
    })
  })

  test('Gets ai agent runs', async () => {
    return environment.getAgentRuns().then((response) => {
      expect(response.sys, 'sys').to.be.ok
      expect(response.items, 'items').to.be.ok
    })
  })

  test('Get specific ai agent', async () => {
    const agentId = 'translation-agent'
    return environment.getAgent(agentId).then((agent) => {
      expect(agent.sys.id).equals(agentId)
    })
  })

  test('Generate with ai agent', async () => {
    const agentId = 'translation-agent'
    const result = await environment.generateWithAgent(agentId, {
      messages: [
        {
          parts: [
            {
              type: 'text',
              text: 'test',
            },
          ],
          id: 'YlOfVycwiPhTMX1G',
          role: 'user',
        },
      ],
    })
    expect(result.sys.id, 'sys.id').to.be.ok
    expect(result.sys.type, 'sys.type').equals('AgentRun')
    expect(result.sys.status, 'sys.status').to.be.ok
  })

  test('Get specific ai agent run', async () => {
    const runs = await environment.getAgentRuns()
    if (runs.items.length > 0) {
      const runId = runs.items[0].sys.id
      return environment.getAgentRun(runId).then((run) => {
        expect(run.sys.id).equals(runId)
        expect(run.sys.type).equals('AgentRun', 'type is AgentRun')
        expect(run.title).to.be.ok
        expect(run.agent).to.be.ok
        expect(run.space).to.be.ok
      })
    }
  })
})
