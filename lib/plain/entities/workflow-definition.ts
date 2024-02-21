import { RawAxiosRequestHeaders } from 'axios'
import {
  GetWorkflowDefinitionParams,
  GetSpaceEnvironmentParams,
  CollectionProp,
} from '../../common-types'
import {
  WorkflowDefinitionProps,
  WorkflowDefinitionQueryOptions,
  CreateWorkflowDefinitionParams,
  CreateWorkflowDefinitionProps,
  UpdateWorkflowDefinitionParams,
  UpdateWorkflowDefinitionProps,
  DeleteWorkflowDefinitionParams,
} from '../../export-types'
import { OptionalDefaults } from '../wrappers/wrap'
import { CreateOrUpdate } from './base'

export type WorkflowDefinitionPlainClientAPI = {
  /**
   * Fetch a Workflow Definition
   * @param params entity IDs to identify the Workflow Definition
   * @returns the Workflow Definition
   * @throws if the request fails, or the Space/Environment is not found
   * @example
   * ```javascript
   * const workflowDefinition = await client.workflowDefinition.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   workflowDefinitionId: '<workflow_definition_id>',
   * });
   * ```
   */
  get(
    params: OptionalDefaults<GetWorkflowDefinitionParams>,
    headers?: RawAxiosRequestHeaders
  ): Promise<WorkflowDefinitionProps>
  /**
   * Query Workflow Definitions with certain filters
   * @param params entity IDs to identify the Space/Environment, optional query parameters to filter returned Workflow Definitions
   * @returns an object containing the list of Workflow Definitions
   * @throws if the request fails, or the Space/Environment is not found
   * @example
   * ```javascript
   * const workflowDefinitions = await client.workflowDefinition.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: {
   *     limit: 10,
   *   }
   * });
   * ```
   * */
  getMany(
    params: OptionalDefaults<
      GetSpaceEnvironmentParams & { query?: WorkflowDefinitionQueryOptions }
    >,
    headers?: RawAxiosRequestHeaders
  ): Promise<CollectionProp<WorkflowDefinitionProps>>
  /**
   * Create a new Workflow Definition
   * @param params entity IDs to identify the Space/Environment to create the Workflow Definition in
   * @param rawData the new Workflow Definition
   * @throws if the request fails, or the Space/Environment is not found
   * @example
   * ```javascript
   * const workflowDefinition = await client.workflowDefinition.create({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * }, workflowDefinitionProps)
   * ```
   */
  create: CreateOrUpdate<
    CreateWorkflowDefinitionParams,
    CreateWorkflowDefinitionProps,
    WorkflowDefinitionProps
  >
  /**
   * Update a Workflow Definition
   * @param params entity IDs to identify the Space/Environment and Workflow Definition
   * @param rawData the updated Workflow Definition
   * @throws if the request fails, or the Space/Environment is not found
   * @example
   * ```javascript
   * const updatedWorkflowDefinition = await client.workflowDefinition.update({
   *  spaceId: '<space_id>',
   *  environmentId: '<environment_id>',
   * }, {
   *   ...workflowDefinition,
   *   steps: [
   *     ...workflowDefinition.steps,
   *     newStep,
   *   ]
   * }
   * ```
   */
  update: CreateOrUpdate<
    UpdateWorkflowDefinitionParams,
    UpdateWorkflowDefinitionProps,
    WorkflowDefinitionProps
  >
  /**
   * Delete a Workflow Definition
   * @param params entity IDs to identify the Space/Environment and Workflow Definition version
   * @throws if the request fails, or the Space/Environment is not found
   * @example
   * ```javascript
   * await client.workflowDefinition.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   workflowDefinitionId: '<workflow_definition_id>',
   *   version: 1
   * });
   * ```
   */
  delete(
    params: OptionalDefaults<DeleteWorkflowDefinitionParams>,
    headers?: RawAxiosRequestHeaders
  ): Promise<void>
}
