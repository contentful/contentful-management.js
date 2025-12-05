import type { GetAppUploadParams, GetOrganizationParams } from '../../common-types'
import type { AppUploadProps } from '../../entities/app-upload'
import type { OptionalDefaults } from '../wrappers/wrap'
import type Stream from 'stream'

export type AppUploadPlainClientAPI = {
  /**
   * Fetches the App Upload
   * @param params entity IDs to identify the App Upload
   * @returns the App Upload
   * @throws if the request fails, or the App Upload is not found
   * @example
   * ```javascript
   * const appUpload = await client.appUpload.get({
   *   organizationId: '<organization_id>',
   *   appUploadId: '<app_upload_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetAppUploadParams>): Promise<AppUploadProps>
  /**
   * Deletes the App Upload
   * @param params entity IDs to identify the App Upload
   * @throws if the request fails, or the App Upload is not found
   * @example
   * ```javascript
   * await client.appUpload.delete({
   *   organizationId: '<organization_id>',
   *   appUploadId: '<app_upload_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetAppUploadParams>): Promise<void>
  /**
   * Creates an App Upload
   * @param params entity IDs to identify the Organization to upload the App to
   * @param payload the App Upload
   * @returns the App Upload
   * @throws if the request fails, or the Organization is not found
   * @example
   * ```javascript
   * const file = fs.readFileSync('<path_to_file>');
   * const appUpload = await client.appUpload.create(
   *   {
   *     organizationId: '<organization_id>',
   *   },
   *   {
   *     file: new ArrayBuffer(file.length),
   *   }
   * );
   * ```
   */
  create(
    params: OptionalDefaults<GetOrganizationParams>,
    payload: { file: string | ArrayBuffer | Stream },
  ): Promise<AppUploadProps>
}
