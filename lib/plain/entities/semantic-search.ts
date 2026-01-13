import type { GetSemanticSearchProps, SemanticSearchProps } from '../../entities/semantic-search'
import type { OptionalDefaults } from '../wrappers/wrap'
import type { GetSpaceEnvironmentParams } from '../../common-types'
import type { RawAxiosRequestHeaders } from 'axios'

export type SemanticSearchPlainClientAPI = {
  /**
   * Retrieves Semantic Search results for the given query.
   * @param params Parameters for getting the space and environment IDs.
   * @param payload Payload containing query and optional filters.
   * @param headers Optional headers for the request.
   * @returns A promise that resolves to Semantic Search results.
   */
  get(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    payload: GetSemanticSearchProps,
    headers?: Partial<RawAxiosRequestHeaders>,
  ): Promise<SemanticSearchProps>
}
