import type {
  GetSemanticDuplicatesProps,
  SemanticDuplicatesProps,
} from '../../entities/semantic-duplicates'
import type { OptionalDefaults } from '../wrappers/wrap'
import type { GetSpaceEnvironmentParams } from '../../common-types'
import type { RawAxiosRequestHeaders } from 'axios'

export type SemanticDuplicatesPlainClientAPI = {
  /**
   * Retrieves Semantic Duplicates for the given entity ID.
   * @param params Parameters for getting the space and environment IDs.
   * @param payload Payload containing entity ID and optional filters.
   * @param headers Optional headers for the request.
   * @returns A promise that resolves to Semantic Duplicates.
   */
  get(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    payload: GetSemanticDuplicatesProps,
    headers?: Partial<RawAxiosRequestHeaders>,
  ): Promise<SemanticDuplicatesProps>
}
