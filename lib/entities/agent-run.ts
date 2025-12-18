import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, Link, MakeRequest, MetaSysProps } from '../common-types'
import { wrapCollection } from '../common-utils'

export type AgentRunStatus = 'IN_PROGRESS' | 'FAILED' | 'COMPLETED' | 'PENDING_REVIEW' | 'DRAFT'

export type AgentRunMessageRole = 'system' | 'user' | 'assistant' | 'tool'

export type AgentRunMessageType = 'text' | 'tool-call' | 'tool-result'

export type AgentRunMessageTextPart = {
  type: 'text'
  text: string
}

export type AgentRunMessageToolCallPart = {
  type: 'tool-call'
  toolCallId: string
  toolName: string
  args: unknown
}

export type AgentRunMessagePart = AgentRunMessageTextPart | AgentRunMessageToolCallPart

export type AgentRunMessage = {
  id: string
  createdAt: string
  role: AgentRunMessageRole
  type?: AgentRunMessageType
  content: {
    parts: Array<AgentRunMessagePart>
  }
}

export type AgentRunProps = {
  sys: MetaSysProps & {
    type: 'AgentRun'
    createdAt: string
    updatedAt?: string
    status: AgentRunStatus
    id: string
  }
  agent: {
    sys: Link<'Agent'>
  }
  space: {
    sys: Link<'Space'>
  }
  title: string
  messages?: Array<AgentRunMessage>
}

export type AgentRunQueryOptions = {
  agentIn?: string[]
  statusIn?: AgentRunStatus[]
}

export interface AgentRun extends AgentRunProps, DefaultElements<AgentRunProps> {}

export function wrapAgentRun(_makeRequest: MakeRequest, data: AgentRunProps): AgentRun {
  const agentRun = toPlainObject(copy(data))
  return freezeSys(agentRun)
}

export const wrapAgentRunCollection = wrapCollection(wrapAgentRun)
