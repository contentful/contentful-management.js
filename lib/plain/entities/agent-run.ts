import type { RawAxiosRequestHeaders } from 'axios'
import type { CollectionProp, GetSpaceEnvironmentParams } from '../../common-types'
import type {
  AgentGenerateResponse,
  AgentResumeRunPayload,
  AgentRunProps,
  AgentRunQueryOptions,
} from '../../entities/agent-run'
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
  /**
   * Resumes a suspended AI Agent Run that is in PENDING_REVIEW status.
   * @param params Entity IDs to identify the AI Agent Run.
   *               Must include spaceId, environmentId, and runId.
   * @param payload The resume payload containing data needed to resume the run.
   * @param headers Optional headers for the request.
   * @returns A promise resolving with a simplified response containing `sys.id`, `sys.type`, and `sys.status`.
   *          Use `agentRun.get()` with the returned `sys.id` to poll for full results.
   * @throws if the request fails or the AI Agent Run is not found.
   */
  resumeRun(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { runId: string }>,
    payload: AgentResumeRunPayload,
    headers?: Partial<RawAxiosRequestHeaders>,
  ): Promise<AgentGenerateResponse>
}
