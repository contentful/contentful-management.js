import type { RawAxiosRequestHeaders } from 'axios'
import type { CollectionProp, GetSpaceEnvironmentParams } from '../../common-types'
import type { AgentRunProps, AgentRunQueryOptions } from '../../entities/agent-run'
import type { OptionalDefaults } from '../wrappers/wrap'

export type AgentRunPlainClientAPI = {
  /**
   * Fetches an AI Agent Run.
   * @param params Entity IDs to identify the AI Agent Run.
   *               Must include spaceId, environmentId, and runId.
   * @param headers Optional headers for the request.
   * @returns A promise resolving with the AI Agent Run.
   * @throws if the request fails or the AI Agent Run is not found.
   */
  get(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { runId: string }>,
    headers?: Partial<RawAxiosRequestHeaders>,
  ): Promise<AgentRunProps>
  /**
   * Fetches all AI Agent Runs for the given space and environment.
   * @param params Entity IDs and query options.
   * @param headers Optional headers for the request.
   * @returns A promise resolving with a collection of AI Agent Runs.
   * @throws if the request fails or the entities are not found.
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { query?: AgentRunQueryOptions }>,
    headers?: Partial<RawAxiosRequestHeaders>,
  ): Promise<CollectionProp<AgentRunProps>>
}
