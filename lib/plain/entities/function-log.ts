import type {
  CollectionProp,
  GetFunctionLogParams,
  GetManyFunctionLogParams,
} from '../../common-types'
import type { FunctionLogProps } from '../../entities/function-log'
import type { OptionalDefaults } from '../wrappers/wrap'

export type FunctionLogPlainClientAPI = {
  /**
   * Fetches the specified FunctionLog
   * @params spaceId, environmentId, appInstallationId, functionId, logId
   * @returns the FunctionLog
   * @throws if the request fails, or the FunctionLog is not found
   * @example
   * ```javascript
   * const functionLog = await client.functionLog.get({
   *    spaceId: '<space_id>',
   *    environmentId: '<environment_id>',
   *    appInstallationId: '<app_installation_id>',
   *    functionId: '<function_id>',
   *    logId: '<log_id>'
   * });
   * ```
   */
  get(params: OptionalDefaults<GetFunctionLogParams>): Promise<FunctionLogProps>

  /**
   * Fetches all FunctionLogs for the given function
   * @params spaceId, environmentId, appInstallationId, functionId, query
   * @returns an object containing an array of FunctionLogs
   * @throws if the request fails, or the FunctionLogs are not found
   * @example
   * ```javascript
   * const functionLogs = await client.functionLog.getAll({
   *    spaceId: '<space_id>',
   *    environmentId: '<environment_id>',
   *    appInstallationId: '<app_installation_id>',
   *    functionId: '<function_id>',
   *    query: { limit: 100 }
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetManyFunctionLogParams>
  ): Promise<CollectionProp<FunctionLogProps>>
}
