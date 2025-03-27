import type { GetSpaceEnvironmentParams } from '../../common-types'
import type { AiActionInvocationProps } from '../../entities/ai-action-invocation'
import type { OptionalDefaults } from '../wrappers/wrap'
import type { RawAxiosRequestHeaders } from 'axios'

export type AiActionInvocationPlainClientAPI = {
  /**
   * Fetches an AI Action Invocation.
   * @param params Entity IDs to identify the AI Action Invocation.
   *               Must include spaceId, environmentId, aiActionId, and invocationId.
   * @param headers Optional headers for the request.
   * @returns A promise resolving with the AI Action Invocation.
   * @throws if the request fails or the AI Action Invocation is not found.
   */
  get(
    params: OptionalDefaults<
      GetSpaceEnvironmentParams & { aiActionId: string; invocationId: string }
    >,
    headers?: Partial<RawAxiosRequestHeaders>
  ): Promise<AiActionInvocationProps>
}
