import type { VectorizationStatusProps } from '../../entities/vectorization-status'
import type { OptionalDefaults } from '../wrappers/wrap'
import type { GetOrganizationParams } from '../../common-types'

export type VectorizationStatusPlainClientAPI = {
  /**
   * Fetches the vectorization status for all spaces in an organization.
   * @returns A promise that resolves to the vectorization status of spaces.
   */
  get(params: OptionalDefaults<GetOrganizationParams>): Promise<VectorizationStatusProps>;
}