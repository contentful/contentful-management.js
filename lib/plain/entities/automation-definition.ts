import type { RawAxiosRequestHeaders } from 'axios'
import type {
  CollectionProp,
  GetAutomationDefinitionParams,
  GetSpaceEnvironmentParams,
} from '../../common-types'
import type { OptionalDefaults } from '../wrappers/wrap'
import type {
  AutomationDefinitionProps,
  AutomationDefinitionQueryOptions,
  CreateAutomationDefinitionProps,
  UpdateAutomationDefinitionProps,
} from '../../entities/automation-definition'

export type DeleteAutomationDefinitionParams = GetAutomationDefinitionParams & { version: number }

export type AutomationDefinitionPlainClientAPI = {
  /**
   * Fetch an Automation Definition
   * @param params entity IDs to identify the Automation Definition
   * @returns the Automation Definition
   * @throws if the request fails, or the Space/Environment is not found
   * @example
   * ```javascript
   * const automationDefinition = await client.automationDefinition.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   automationDefinitionId: '<automation_definition_id>',
   * });
   * ```
   */
  get(
    params: OptionalDefaults<GetAutomationDefinitionParams>,
    headers?: RawAxiosRequestHeaders,
  ): Promise<AutomationDefinitionProps>
  /**
   * Query Automation Definitions with certain filters
   * @param params entity IDs to identify the Space/Environment, optional query parameters to filter returned Automation Definitions
   * @returns an object containing the list of Automation Definitions
   * @throws if the request fails, or the Space/Environment is not found
   * @example
   * ```javascript
   * const automationDefinitions = await client.automationDefinition.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: {
   *     limit: 10,
   *   }
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<
      GetSpaceEnvironmentParams & { query?: AutomationDefinitionQueryOptions }
    >,
    headers?: RawAxiosRequestHeaders,
  ): Promise<CollectionProp<AutomationDefinitionProps>>
  /**
   * Create a new Automation Definition
   * @param params entity IDs to identify the Space/Environment to create the Automation Definition in
   * @param rawData the new Automation Definition
   * @throws if the request fails, or the Space/Environment is not found
   * @example
   * ```javascript
   * const automationDefinition = await client.automationDefinition.create({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * }, {
   *   name: 'My Automation',
   *   triggers: [{ type: 'manual' }],
   *   steps: [],
   *   status: 'draft',
   * });
   * ```
   */
  create(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    rawData: CreateAutomationDefinitionProps,
    headers?: RawAxiosRequestHeaders,
  ): Promise<AutomationDefinitionProps>
  /**
   * Update an Automation Definition
   * @param params entity IDs to identify the Space/Environment and Automation Definition
   * @param rawData the updated Automation Definition
   * @throws if the request fails, or the Space/Environment is not found
   * @example
   * ```javascript
   * const updatedAutomationDefinition = await client.automationDefinition.update({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   automationDefinitionId: '<automation_definition_id>',
   * }, {
   *   sys: { version: 1 },
   *   name: 'Updated Automation',
   *   triggers: [{ type: 'manual' }],
   *   steps: [],
   *   status: 'published',
   * });
   * ```
   */
  update(
    params: OptionalDefaults<GetAutomationDefinitionParams>,
    rawData: UpdateAutomationDefinitionProps,
    headers?: RawAxiosRequestHeaders,
  ): Promise<AutomationDefinitionProps>
  /**
   * Delete an Automation Definition
   * @param params entity IDs to identify the Space/Environment, Automation Definition, and version
   * @throws if the request fails, or the Space/Environment is not found
   * @example
   * ```javascript
   * await client.automationDefinition.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   automationDefinitionId: '<automation_definition_id>',
   *   version: 1
   * });
   * ```
   */
  delete(
    params: OptionalDefaults<DeleteAutomationDefinitionParams>,
    headers?: RawAxiosRequestHeaders,
  ): Promise<void>
}
