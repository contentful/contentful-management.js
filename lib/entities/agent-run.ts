/**
 * @module
 * @category Shared Types
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, Link, MakeRequest, MetaSysProps } from '../common-types'
import { wrapCollection } from '../common-utils'

/** Possible statuses of an agent run. */
export type AgentRunStatus = 'IN_PROGRESS' | 'FAILED' | 'COMPLETED' | 'PENDING_REVIEW' | 'DRAFT'

/** Simplified response returned when starting an agent generation. */
export type AgentGenerateResponse = {
  sys: {
    id: string
    type: 'AgentRun'
    status: AgentRunStatus
  }
}

export type AgentResumeRunPayload<TResumePayload = Record<string, unknown>> = {
  resumePayload: TResumePayload
}

/** Role of a message within an agent run conversation. */
export type AgentRunMessageRole = 'system' | 'user' | 'assistant' | 'tool'

/** A text content part within an agent run message. */
export type AgentRunMessageTextPart = {
  type: 'text'
  text: string
}

/** A tool call content part within an agent run message. */
export type AgentRunMessageToolCallPart = {
  type: 'tool-call'
  toolCallId: string
  toolName: string
  args: unknown
}

/** A content part within an agent run message, either text or a tool call. */
export type AgentRunMessagePart = AgentRunMessageTextPart | AgentRunMessageToolCallPart

/** A single message exchanged during an agent run. */
export type AgentRunMessage = {
  id: string
  createdAt: string
  role: AgentRunMessageRole
  content: {
    parts: Array<AgentRunMessagePart>
  }
}

/** Properties of a Contentful agent run. */
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
  messages: Array<AgentRunMessage>
}

/** Query options for filtering agent runs. */
export type AgentRunQueryOptions = {
  agentIn?: string[]
  statusIn?: AgentRunStatus[]
}

/** A Contentful agent run representing a single execution of an agent. */
export interface AgentRun extends AgentRunProps, DefaultElements<AgentRunProps> {}

/**
 * @param _makeRequest - function to make requests via an adapter
 * @param data - Raw AgentRun data
 * @returns Wrapped AgentRun data
 */
export function wrapAgentRun(_makeRequest: MakeRequest, data: AgentRunProps): AgentRun {
  const agentRun = toPlainObject(copy(data))
  return freezeSys(agentRun)
}

/**
 * @param _makeRequest - function to make requests via an adapter
 * @param data - Raw Agent generate response data
 * @returns Wrapped Agent generate response data
 */
export function wrapAgentGenerateResponse(
  _makeRequest: MakeRequest,
  data: AgentGenerateResponse,
): AgentGenerateResponse {
  const response = toPlainObject(copy(data))
  return freezeSys(response)
}

export const wrapAgentRunCollection = wrapCollection(wrapAgentRun)
