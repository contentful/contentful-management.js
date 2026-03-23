import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type { CollectionProp, GetSpaceEnvironmentParams } from '../../../common-types'
import type { AgentRunProps, AgentRunQueryOptions } from '../../../entities/agent-run'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const AgentRunAlphaHeaders = {
  'x-contentful-enable-alpha-feature': 'agents-api',
}

export const get: RestEndpoint<'AgentRun', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { runId: string },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<AgentRunProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/ai/agents/runs/${params.runId}`,
    {
      headers: {
        ...AgentRunAlphaHeaders,
        ...headers,
      },
    },
  )
}

export const getMany: RestEndpoint<'AgentRun', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query?: AgentRunQueryOptions },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<CollectionProp<AgentRunProps>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/ai/agents/runs`,
    {
      params: params.query,
      headers: {
        ...AgentRunAlphaHeaders,
        ...headers,
      },
    },
  )
}
