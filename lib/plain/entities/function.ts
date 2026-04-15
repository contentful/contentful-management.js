/**
 * @module function
 * @category Plain Client
 */
import type {
  CollectionProp,
  GetFunctionParams,
  GetFunctionForEnvParams,
  GetManyFunctionParams,
  AcceptsQueryParams,
} from '../../common-types'
import type { FunctionProps } from '../../entities/function'
import type { OptionalDefaults } from '../wrappers/wrap'

export type FunctionAPI = {
  /**
   * Fetches the specified Function
   * @param params the organization ID, app definition ID, and function ID
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
   * @param params the organization ID, app definition ID, and query options
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
   * @param params the space ID, environment ID, app installation ID, and query options
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
