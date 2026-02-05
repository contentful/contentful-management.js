import type { RawAxiosRequestHeaders } from 'axios'
import type { CollectionProp, GetSpaceEnvironmentParams } from '../../common-types'
import type { OptionalDefaults } from '../wrappers/wrap'
import type {
  AutomationExecutionProps,
  AutomationExecutionQueryOptions,
} from '../../entities/automation-execution'

export type GetAutomationExecutionParams = GetSpaceEnvironmentParams & {
  automationExecutionId: string
}

export type AutomationExecutionPlainClientAPI = {
  /**
   * Fetch an Automation Execution
   * @param params entity IDs to identify the Automation Execution
   * @returns the Automation Execution
   * @throws if the request fails, or the Space/Environment is not found
   * @example
   * ```javascript
   * const automationExecution = await client.automationExecution.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   automationExecutionId: '<automation_execution_id>',
   * });
   * ```
   */
  get(
    params: OptionalDefaults<GetAutomationExecutionParams>,
    headers?: RawAxiosRequestHeaders,
  ): Promise<AutomationExecutionProps>
  /**
   * Query Automation Executions with certain filters
   * @param params entity IDs to identify the Space/Environment, optional query parameters to filter returned Automation Executions
   * @returns an object containing the list of Automation Executions
   * @throws if the request fails, or the Space/Environment is not found
   * @example
   * ```javascript
   * const automationExecutions = await client.automationExecution.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: {
   *     'sys.automationDefinition.sys.id': '<automation_definition_id>',
   *   }
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<
      GetSpaceEnvironmentParams & { query?: AutomationExecutionQueryOptions }
    >,
    headers?: RawAxiosRequestHeaders,
  ): Promise<CollectionProp<AutomationExecutionProps>>
}
