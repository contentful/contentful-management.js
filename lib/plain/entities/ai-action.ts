import type {
  CollectionProp,
  GetSpaceEnvironmentParams,
  GetSpaceParams,
  QueryParams,
} from '../../common-types'
import type { AiActionProps, CreateAiActionProps } from '../../entities/ai-action'
import type {
  AiActionInvocationProps,
  AiActionInvocationType,
} from '../../entities/ai-action-invocation'
import type { OptionalDefaults } from '../wrappers/wrap'
import type { RawAxiosRequestHeaders } from 'axios'

export type AiActionPlainClientAPI = {
  /**
   * Fetches the AI Action.
   * @param params Entity IDs to identify the AI Action.
   * @returns The AI Action.
   * @throws if the request fails or the AI Action is not found.
   */
  get(params: OptionalDefaults<GetSpaceParams & { aiActionId: string }>): Promise<AiActionProps>
  /**
   * Fetches all AI Actions for the given space and environment.
   * @param params Entity IDs and query options.
   * @returns A collection containing an array of AI Actions.
   * @throws if the request fails or the entities are not found.
   */
  getMany(
    params: OptionalDefaults<GetSpaceParams & QueryParams>,
  ): Promise<CollectionProp<AiActionProps>>
  /**
   * Deletes the AI Action.
   * @param params Entity IDs to identify the AI Action to delete.
   * @returns void.
   * @throws if the request fails or the AI Action is not found.
   */
  delete(params: OptionalDefaults<GetSpaceParams & { aiActionId: string }>): Promise<void>
  /**
   * Creates an AI Action.
   * @param params Entity IDs to scope where to create the AI Action.
   * @param payload The AI Action details.
   * @param headers Optional headers for the request.
   * @returns The created AI Action and its metadata.
   * @throws if the request fails or the payload is malformed.
   */
  create(
    params: OptionalDefaults<GetSpaceParams>,
    payload: CreateAiActionProps,
    headers?: Partial<RawAxiosRequestHeaders>,
  ): Promise<AiActionProps>
  /**
   * Updates an AI Action.
   * @param params Entity IDs to identify the AI Action.
   * @param payload The AI Action update.
   * @param headers Optional headers for the request.
   * @returns The updated AI Action and its metadata.
   * @throws if the request fails, the AI Action is not found, or the payload is malformed.
   */
  update(
    params: OptionalDefaults<GetSpaceParams & { aiActionId: string }>,
    payload: AiActionProps,
    headers?: Partial<RawAxiosRequestHeaders>,
  ): Promise<AiActionProps>
  /**
   * Publishes the AI Action.
   * @param params Entity IDs to identify the AI Action.
   * @param headers Optional headers for the request.
   * @returns The published AI Action and its metadata.
   * @throws if the request fails or the payload is malformed.
   */
  publish(
    params: OptionalDefaults<GetSpaceParams & { aiActionId: string; version: number }>,
    payload?: unknown,
    headers?: Partial<RawAxiosRequestHeaders>,
  ): Promise<AiActionProps>
  /**
   * Unpublishes the AI Action.
   * @param params Entity IDs to identify the AI Action.
   * @returns The unpublished AI Action and its metadata.
   * @throws if the request fails or the AI Action is not found.
   */
  unpublish(
    params: OptionalDefaults<GetSpaceParams & { aiActionId: string }>,
  ): Promise<AiActionProps>
  /**
   * Invokes an AI Action.
   * @param params Entity IDs to scope where to invoke the AI Action.
   *               Must include spaceId, environmentId, and aiActionId.
   * @param payload The invocation payload.
   * @param headers Optional headers for the request.
   * @returns A promise resolving with the AI Action Invocation and its metadata.
   * @throws if the request fails or the payload is malformed.
   */
  invoke(
    params: OptionalDefaults<
      GetSpaceEnvironmentParams & { aiActionId: string; query?: { status?: 'all' | 'published' } }
    >,
    payload: AiActionInvocationType,
    headers?: Partial<RawAxiosRequestHeaders>,
  ): Promise<AiActionInvocationProps>
}
