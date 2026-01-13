import type {
  GetSemanticRecommendationsProps,
  SemanticRecommendationsProps,
} from '../../entities/semantic-recommendations'
import type { OptionalDefaults } from '../wrappers/wrap'
import type { GetSpaceEnvironmentParams } from '../../common-types'
import type { RawAxiosRequestHeaders } from 'axios'

export type SemanticRecommendationsPlainClientAPI = {
  /**
   * Retrieves Semantic Recommendations for the given entity ID.
   * @param params Parameters for getting the space and environment IDs.
   * @param payload Payload containing entity ID and optional filters.
   * @param headers Optional headers for the request.
   * @returns A promise that resolves to Semantic Recommendations.
   */
  get(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    payload: GetSemanticRecommendationsProps,
    headers?: Partial<RawAxiosRequestHeaders>,
  ): Promise<SemanticRecommendationsProps>
}
