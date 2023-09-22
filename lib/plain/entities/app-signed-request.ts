import { GetAppInstallationParams } from '../../common-types'
import {
  AppSignedRequestProps,
  CreateAppSignedRequestProps,
} from '../../entities/app-signed-request'
import { OptionalDefaults } from '../wrappers/wrap'

export type AppSignedRequestPlainClientAPI = {
  /**
   * Creates a Signed Request for an App
   * @param params entity IDs to identify the App to make a signed request to
   * @param payload the Signed Request payload
   * @returns metadata about the Signed Request
   * @throws if the request fails, the App is not found, or the payload is malformed
   * @example
   * ```javascript
   * const signedRequest = await client.appSignedRequest.create(
   *   {
   *     spaceId: '<space_id>',
   *     organizationId: '<organization_id>',
   *     appDefinitionId: '<app_definition_id>',
   *   },
   *   {
   *     method: 'POST',
   *     path: 'https://your-app-backend.com/event-handler',
   *     headers: {
   *       'Content-Type': 'application/json',
   *       'X-some-header': 'some-value',
   *     },
   *     body: JSON.stringify({
   *       // ...
   *     }),
   *   }
   * );
   * ```
   */
  create(
    params: OptionalDefaults<GetAppInstallationParams>,
    payload: CreateAppSignedRequestProps
  ): Promise<AppSignedRequestProps>
}
