import type { GetSpaceEnvironmentParams, MetaSysProps } from '../../common-types.js'
import type { OptionalDefaults } from '../wrappers/wrap.js'

export type UploadCredential = {
  /**
   * System metadata
   */
  sys: MetaSysProps & {
    type: 'UploadCredential'
  }

  /**
   * upload credentials
   */
  uploadCredentials: {
    policy: string
    signature: string
    expiresAt: string
    createdAt: string
  }
}

export type UploadCredentialAPI = {
  /** Creates a Space Environment UploadCredential for Filestack Upload
   *
   * @param params Space Id and Environment Id to identify the Space Environment
   * @param data the Space Environment Upload
   * @returns the Space Environment Upload
   * @throws if the request fails, or the Space Environment is not found
   * @example
   * ```javascript
   * const credential = await client.uploadCredential.create(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *   }
   * );
   * ```
   */
  create(params: OptionalDefaults<GetSpaceEnvironmentParams>): Promise<UploadCredential>
}
