import type {
  CollectionProp,
  GetFunctionParams,
  GetFunctionForEnvParams,
  GetManyFunctionParams,
  AcceptsQueryParams,
} from '../../common-types'
import type { FunctionProps } from '../../entities/function'
import type { OptionalDefaults } from '../wrappers/wrap'

export type FunctionPlainClientAPI = {
  /**
   * Fetches the specified Function
   * @params organizationId, appDefinitionId, functionId
   * @returns the Function
   * @throws if the request fails, or the Function is not found
   * @example
   * ```javascript
   * const func = await client.function.get({
   *   organizationId: "<org_id>",
   *   appDefinitionId: "<app_definition_id>",
   *   functionId: "<function_id>",
   * });
   * ```
   */
  get(params: OptionalDefaults<GetFunctionParams>): Promise<FunctionProps>

  /**
   * Fetches all Functions for the given app
   * @params organizationId, appDefinitionId, query
   * @returns an object containing an array of Functions
   * @throws if the request fails, or the App is not found
   * @example
   * ```javascript
   * const functions = await client.function.getMany({
   *   organizationId: "<org_id>",
   *   appDefinitionId: "<app_definition_id>",
   *   query: { 'accepts[all]': '<action>' },
   * });
   * ```
   */
  getMany(params: OptionalDefaults<GetManyFunctionParams>): Promise<CollectionProp<FunctionProps>>

  /**
   * Fetches all Functions for the given environment
   * @params spaceId, environmentId, appInstallationId, query
   * @returns an object containing an array of Functions
   * @throws if the request fails, or the Environment is not found
   * @example
   * ```javascript
   * const functions = await client.function.getManyForEnvironment({
   *   spaceId: "<space_id>",
   *   environmentId: "<environment_id>",
   *   appInstallationId: "<app_installation_id>",
   *   query: { 'accepts[all]': '<action>' },
   * });
   * ```
   */
  getManyForEnvironment(
    params: OptionalDefaults<GetFunctionForEnvParams>,
  ): Promise<CollectionProp<FunctionProps>>
}
