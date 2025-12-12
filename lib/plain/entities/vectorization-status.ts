import type {
  UpdateVectorizationStatusProps,
  VectorizationStatusProps,
} from '../../entities/vectorization-status'
import type { OptionalDefaults } from '../wrappers/wrap'
import type { GetOrganizationParams } from '../../common-types'
import type { RawAxiosRequestHeaders } from 'axios'

export type VectorizationStatusPlainClientAPI = {
  /**
   * Fetches the vectorization status for all spaces in an organization.
   * @param params Parameters for getting the organization.
   * @param headers Optional headers for the request.
   * @returns A promise that resolves to the vectorization status of spaces.
   */
  get(
    params: OptionalDefaults<GetOrganizationParams>,
    headers?: Partial<RawAxiosRequestHeaders>,
  ): Promise<VectorizationStatusProps>

  /**
   * Updates the vectorization status for spaces within an organization.
   * @param params Parameters for getting the organization.
   * @param payload Payload containing the update information.
   * @param headers Optional headers for the request.
   * @returns A promise that resolves to the vectorization status of spaces.
   */
  update(
    params: OptionalDefaults<GetOrganizationParams>,
    payload: UpdateVectorizationStatusProps,
    headers?: Partial<RawAxiosRequestHeaders>,
  ): Promise<VectorizationStatusProps>
}
