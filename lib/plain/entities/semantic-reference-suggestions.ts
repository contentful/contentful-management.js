import type {
  GetSemanticReferenceSuggestionsProps,
  SemanticReferenceSuggestionsProps,
} from '../../entities/semantic-reference-suggestions'
import type { OptionalDefaults } from '../wrappers/wrap'
import type { GetSpaceEnvironmentParams } from '../../common-types'
import type { RawAxiosRequestHeaders } from 'axios'

export type SemanticReferenceSuggestionsPlainClientAPI = {
  /**
   * Retrieves Semantic Reference Suggestions for the given entity ID and its reference field ID.
   * @param params Parameters for getting the space and environment IDs.
   * @param payload Payload containing entity ID, reference field ID and optional filters.
   * @param headers Optional headers for the request.
   * @returns A promise that resolves to Semantic Reference Suggestions.
   */
  get(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    payload: GetSemanticReferenceSuggestionsProps,
    headers?: Partial<RawAxiosRequestHeaders>,
  ): Promise<SemanticReferenceSuggestionsProps>
}
