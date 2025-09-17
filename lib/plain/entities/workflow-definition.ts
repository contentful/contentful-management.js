import type { RawAxiosRequestHeaders } from 'axios'
import type {
  GetWorkflowDefinitionParams,
  GetSpaceEnvironmentParams,
  CollectionProp,
} from '../../common-types.js'
import type { OptionalDefaults } from '../wrappers/wrap.js'
import type {
  CreateWorkflowDefinitionParams,
  CreateWorkflowDefinitionProps,
  DeleteWorkflowDefinitionParams,
  UpdateWorkflowDefinitionParams,
  UpdateWorkflowDefinitionProps,
  WorkflowDefinitionProps,
  WorkflowDefinitionQueryOptions,
} from '../../entities/workflow-definition.js'

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
    headers?: RawAxiosRequestHeaders,
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
    headers?: RawAxiosRequestHeaders,
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
   * }, workflowDefinitionProps);
   * ```
   */
  create(
    params: OptionalDefaults<CreateWorkflowDefinitionParams>,
    rawData: CreateWorkflowDefinitionProps,
    headers?: RawAxiosRequestHeaders,
  ): Promise<WorkflowDefinitionProps>
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
   *  workflowDefinitionId: '<workflow_definition_id>',
   * }, {
   *   ...workflowDefinition,
   *   steps: [
   *     ...workflowDefinition.steps,
   *     newStep,
   *   ]
   * });
   * ```
   */
  update(
    params: OptionalDefaults<UpdateWorkflowDefinitionParams>,
    rawData: UpdateWorkflowDefinitionProps,
    headers?: RawAxiosRequestHeaders,
  ): Promise<WorkflowDefinitionProps>
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
    headers?: RawAxiosRequestHeaders,
  ): Promise<any>
}
