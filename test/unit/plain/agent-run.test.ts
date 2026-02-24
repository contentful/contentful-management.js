import { describe, expect, test } from 'vitest'
import { createClient } from '../../../lib/contentful-management'
import setupRestAdapter from '../adapters/REST/helpers/setupRestAdapter'

describe('AgentRun', () => {
  const spaceId = 'space-id'
  const environmentId = 'env-id'
  const runId = 'run-id'

  const mockAgentRun = {
    sys: {
      type: 'AgentRun',
      id: runId,
      version: 1,
      createdAt: '2025-12-15T10:00:00.000Z',
      updatedAt: '2025-12-15T10:05:00.000Z',
      status: 'COMPLETED',
    },
    agent: {
      sys: {
        type: 'Link',
        linkType: 'Agent',
        id: 'agent-id',
      },
    },
    space: {
      sys: {
        type: 'Link',
        linkType: 'Space',
        id: spaceId,
      },
    },
    title: 'Test Agent Run',
    messages: [
      {
        id: 'msg-1',
        createdAt: '2025-12-15T10:00:00.000Z',
        role: 'user',
        content: {
          parts: [
            {
              type: 'text',
              text: 'Hello',
            },
          ],
        },
      },
    ],
  }

  test('get', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockAgentRun }))
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.agentRun.get({ spaceId, environmentId, runId })

    expect(response).toBeInstanceOf(Object)
    expect(response.sys.id).toBe(runId)
    expect(response.title).toBe('Test Agent Run')
    expect(response.sys.status).toBe('COMPLETED')

    expect(httpMock.get).toHaveBeenCalledWith(
      `/spaces/${spaceId}/environments/${environmentId}/ai/agents/runs/${runId}`,
      expect.objectContaining({
        baseURL: 'https://api.contentful.com',
        headers: expect.objectContaining({
          'x-contentful-enable-alpha-feature': 'agents-api',
        }),
      }),
    )
  })

  test('getMany', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: { items: [mockAgentRun], total: 1 } }),
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.agentRun.getMany({
      spaceId,
      environmentId,
      query: { statusIn: ['COMPLETED'] },
    })

    expect(response).toBeInstanceOf(Object)
    expect(response.items).toBeInstanceOf(Array)
    expect(response.items[0].sys.id).toBe(runId)
    expect(response.items[0].sys.status).toBe('COMPLETED')

    expect(httpMock.get).toHaveBeenCalledWith(
      `/spaces/${spaceId}/environments/${environmentId}/ai/agents/runs`,
      expect.objectContaining({
        baseURL: 'https://api.contentful.com',
        params: { statusIn: ['COMPLETED'] },
        headers: expect.objectContaining({
          'x-contentful-enable-alpha-feature': 'agents-api',
        }),
      }),
    )
  })

  test('getMany with agentIn filter', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: { items: [mockAgentRun], total: 1 } }),
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.agentRun.getMany({
      spaceId,
      environmentId,
      query: { agentIn: ['agent-1', 'agent-2'], statusIn: ['COMPLETED', 'IN_PROGRESS'] },
    })

    expect(response).toBeInstanceOf(Object)
    expect(response.items).toBeInstanceOf(Array)

    expect(httpMock.get).toHaveBeenCalledWith(
      `/spaces/${spaceId}/environments/${environmentId}/ai/agents/runs`,
      expect.objectContaining({
        baseURL: 'https://api.contentful.com',
        params: { agentIn: ['agent-1', 'agent-2'], statusIn: ['COMPLETED', 'IN_PROGRESS'] },
        headers: expect.objectContaining({
          'x-contentful-enable-alpha-feature': 'agents-api',
        }),
      }),
    )
  })
})
