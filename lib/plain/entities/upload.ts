import type { Stream } from 'stream'
import type { OptionalDefaults } from '../wrappers/wrap'
import type { GetSpaceEnvironmentParams, GetSpaceEnvironmentUploadParams } from '../../common-types'

export type UploadPlainClientAPI = {
  /** Fetches the Space Environment Upload
   *
   * @param params Upload Id, Space Id and Environment Id to identify the Space Environment Upload
   * @returns the Space Environment Upload
   * @throws if the request fails, or the Space Environment Upload is not found
   * @example
   * ```javascript
   * const upload = await client.upload.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   uploadId: '<upload_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetSpaceEnvironmentUploadParams>): Promise<any>
  /** Creates a Space Environment Upload
   *
   * @param params Space Id and Environment Id to identify the Space Environment
   * @param data the Space Environment Upload
   * @returns the Space Environment Upload
   * @throws if the request fails, or the Space Environment is not found
   * @example
   * ```javascript
   * const file = fs.readFileSync('<path_to_file>');
   * const upload = await client.upload.create(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *   },
   *   {
   *     file: new ArrayBuffer(file.length),
   *   }
   * );
   * ```
   */
  create(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    data: { file: string | ArrayBuffer | Stream }
  ): Promise<any>
  /** Deletes the Space Environment Upload
   *
   * @param params Space Id, Environment Id and Upload Id to identify the Space Environment Upload
   * @throws if the request fails, or the Space Environment Upload is not found
   * @example
   * ```javascript
   * await client.upload.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   uploadId: '<upload_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetSpaceEnvironmentUploadParams>): Promise<any>
}
