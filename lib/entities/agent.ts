import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, MakeRequest, MetaSysProps } from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapAgentGenerateResponse, type AgentGenerateResponse } from './agent-run'

export type AgentToolLink = {
  sys: {
    type: 'Link'
    linkType: 'AgentTool'
    id: string
  }
}

export type AgentProps = {
  sys: MetaSysProps & {
    type: 'Agent'
    space: { sys: { id: string } }
    environment: { sys: { id: string } }
    createdAt: string
    id: string
  }
  name: string
  description: string
  tools?: Array<AgentToolLink>
  provider?: string
  modelId?: string
}

type AgentMessageRole = 'system' | 'user' | 'assistant' | 'tool'

export type AgentGeneratePayload<TMetadata = Record<string, unknown>> = {
  messages: Array<{
    parts: Array<{
      type: 'text'
      text: string
    }>
    id?: string
    role: AgentMessageRole
  }>
  threadId?: string
  metadata?: TMetadata
}

export interface Agent extends AgentProps, DefaultElements<AgentProps> {
  generate(payload: AgentGeneratePayload): Promise<AgentGenerateResponse>
}

function createAgentApi(makeRequest: MakeRequest) {
  const getParams = (data: AgentProps) => ({
    spaceId: data.sys.space.sys.id,
    environmentId: data.sys.environment.sys.id,
    agentId: data.sys.id,
  })

  return {
    generate: function generate(payload: AgentGeneratePayload) {
      const self = this as AgentProps
      return makeRequest({
        entityType: 'Agent',
        action: 'generate',
        params: getParams(self),
        payload,
      }).then((data) => wrapAgentGenerateResponse(makeRequest, data))
    },
  }
}

export function wrapAgent(makeRequest: MakeRequest, data: AgentProps): Agent {
  const agent = toPlainObject(copy(data))
  const agentWithMethods = enhanceWithMethods(agent, createAgentApi(makeRequest))
  return freezeSys(agentWithMethods)
}

export const wrapAgentCollection = wrapCollection(wrapAgent)
