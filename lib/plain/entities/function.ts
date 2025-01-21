import type {
  CollectionProp,
  GetFunctionParams,
  GetFunctionForEnvParams,
  GetManyFunctionParams,
} from '../../common-types'
import type { FunctionProps } from '../../entities/function'
import type { OptionalDefaults } from '../wrappers/wrap'

export type FunctionPlainClientAPI = {
  /**
   * Fetches the specified Function
   * @param params organization ID, app definition ID, entity ID to identify the function
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
   * @param params organization ID, app definition ID to identify the functions
   * @returns an object containing an array of Functions
   * @throws if the request fails, or the App is not found
   * @example
   * ```javascript
   * const functions = await client.function.getMany({
   *   organizationId: "<org_id>",
   *   appDefinitionId: "<app_definition_id>",
   * });
   * ```
   */
  getMany(params: OptionalDefaults<GetManyFunctionParams>): Promise<CollectionProp<FunctionProps>>

  /**
   * Fetches all Functions for the given environment
   * @param params space ID, environment ID, app installation ID to identify the functions
   * @returns an object containing an array of Functions
   * @throws if the request fails, or the Environment is not found
   * @example
   * ```javascript
   * const functions = await client.function.getManyForEnvironment({
   *   spaceId: "<space_id>",
   *   environmentId: "<environment_id>",
   *   appInstallationId: "<app_installation_id>",
   * });
   * ```
   */
  getManyForEnvironment(
    params: OptionalDefaults<GetFunctionForEnvParams>
  ): Promise<CollectionProp<FunctionProps>>
}
