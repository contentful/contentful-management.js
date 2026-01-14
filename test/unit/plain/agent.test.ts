import { describe, expect, test } from 'vitest'
import { AgentGeneratePayload, createClient } from '../../../lib/contentful-management'
import setupRestAdapter from '../adapters/REST/helpers/setupRestAdapter'

describe('Agent', () => {
  const spaceId = 'space-id'
  const environmentId = 'env-id'
  const agentId = 'agent-id'

  const mockAgent = {
    sys: {
      type: 'Agent',
      id: agentId,
      version: 1,
      space: { sys: { id: spaceId } },
      environment: { sys: { id: environmentId } },
      createdAt: '2025-12-15T10:00:00.000Z',
      updatedAt: '2025-12-15T10:00:00.000Z',
    },
    name: 'Test AI Agent',
    description: 'Test description',
    provider: 'openai',
    modelId: 'gpt-4',
  }

  test('get', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockAgent }))
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.agent.get({ spaceId, environmentId, agentId })

    expect(response).toBeInstanceOf(Object)
    expect(response.sys.id).toBe(agentId)
    expect(response.name).toBe('Test AI Agent')

    expect(httpMock.get).toHaveBeenCalledWith(
      `/spaces/${spaceId}/environments/${environmentId}/ai_agents/agents/${agentId}`,
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
      Promise.resolve({ data: { items: [mockAgent], total: 1 } }),
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.agent.getMany({
      spaceId,
      environmentId,
    })

    expect(response).toBeInstanceOf(Object)
    expect(response.items).toBeInstanceOf(Array)
    expect(response.items[0].sys.id).toBe(agentId)

    expect(httpMock.get).toHaveBeenCalledWith(
      `/spaces/${spaceId}/environments/${environmentId}/ai_agents/agents`,
      expect.objectContaining({
        baseURL: 'https://api.contentful.com',
        headers: expect.objectContaining({
          'x-contentful-enable-alpha-feature': 'agents-api',
        }),
      }),
    )
  })

  test('generate', async () => {
    const mockResponse = {
      result: 'Generated response',
    }
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })

    type CustomMetadata = {
      customData: string
    }

    const payload: AgentGeneratePayload<CustomMetadata> = {
      messages: [{ parts: [{ type: 'text' as const, text: 'Hello' }], role: 'user' as const }],
      metadata: {
        customData: 'my-custom-data',
      },
    }

    const response = await plainClient.agent.generate({ spaceId, environmentId, agentId }, payload)

    expect(response).toBeInstanceOf(Object)
    expect(response.result).toBe('Generated response')

    expect(httpMock.post).toHaveBeenCalledWith(
      `/spaces/${spaceId}/environments/${environmentId}/ai_agents/agents/${agentId}/generate`,
      payload,
      expect.objectContaining({
        baseURL: 'https://api.contentful.com',
        headers: expect.objectContaining({
          'x-contentful-enable-alpha-feature': 'agents-api',
        }),
      }),
    )
  })
})
