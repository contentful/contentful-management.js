import type { RawAxiosRequestHeaders } from 'axios'
import type { CollectionProp, GetSpaceEnvironmentParams, QueryParams } from '../../common-types'
import type {
  AgentGeneratePayload,
  AgentProps,
  DefaultAgentGenerateMetadata,
} from '../../entities/agent'
import type { AgentRunProps } from '../../entities/agent-run'
import type { OptionalDefaults } from '../wrappers/wrap'

export type AgentPlainClientAPI = {
  /**
   * Fetches the AI Agent.
   * @param params Entity IDs to identify the AI Agent.
   * @returns The AI Agent.
   * @throws if the request fails or the AI Agent is not found.
   */
  get(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { agentId: string }>,
  ): Promise<AgentProps>
  /**
   * Fetches all AI Agents for the given space and environment.
   * @param params Entity IDs and query options.
   * @returns A collection containing an array of AI Agents.
   * @throws if the request fails or the entities are not found.
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>,
  ): Promise<CollectionProp<AgentProps>>
  /**
   * Generates a response from an AI Agent.
   * @param params Entity IDs to identify the AI Agent.
   * @param payload The generation payload.
   * @param headers Optional headers for the request.
   * @returns A promise resolving with the AI Agent generation response.
   * @throws if the request fails or the payload is malformed.
   */
  generate<METADATA = DefaultAgentGenerateMetadata>(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { agentId: string }>,
    payload: AgentGeneratePayload<METADATA>,
    headers?: Partial<RawAxiosRequestHeaders>,
  ): Promise<AgentRunProps>
}
