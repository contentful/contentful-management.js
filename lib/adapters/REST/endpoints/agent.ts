import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type { CollectionProp, GetSpaceEnvironmentParams } from '../../../common-types'
import type { AgentGeneratePayload, AgentProps } from '../../../entities/agent'
import type { AgentGenerateResponse } from '../../../entities/agent-run'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const AgentAlphaHeaders = {
  'x-contentful-enable-alpha-feature': 'agents-api',
}

export const get: RestEndpoint<'Agent', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { agentId: string },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<AgentProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/ai_agents/agents/${params.agentId}`,
    {
      headers: {
        ...AgentAlphaHeaders,
        ...headers,
      },
    },
  )
}

export const getMany: RestEndpoint<'Agent', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<CollectionProp<AgentProps>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/ai_agents/agents`,
    {
      headers: {
        ...AgentAlphaHeaders,
        ...headers,
      },
    },
  )
}

export const generate: RestEndpoint<'Agent', 'generate'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { agentId: string },
  data: AgentGeneratePayload,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.post<AgentGenerateResponse>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/ai_agents/agents/${params.agentId}/generate`,
    data,
    {
      headers: {
        ...AgentAlphaHeaders,
        ...headers,
      },
    },
  )
}
