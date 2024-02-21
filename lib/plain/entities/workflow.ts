import { RawAxiosRequestHeaders } from 'axios'
import { GetSpaceEnvironmentParams, CollectionProp } from '../../common-types'
import {
  CreateWorkflowParams,
  UpdateWorkflowParams,
  CompleteWorkflowParams,
} from '../../entities/workflow'
import {
  WorkflowQueryOptions,
  WorkflowProps,
  CreateWorkflowProps,
  UpdateWorkflowProps,
  DeleteWorkflowParams,
} from '../../export-types'
import { OptionalDefaults } from '../wrappers/wrap'
import { CreateOrUpdate } from './base'

export type WorkflowPlainClientAPI = {
  /**
   * Query Workflows with certain filters
   * @param params entity IDs to identify the Space/Environment, optional query parameters to filter returned Workflows
   * @returns an object containing the list of Workflows
   * @throws if the request fails, or the Space/Environment is not found
   * @example
   * ```javascript
   * const workflows = await client.workflow.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: {
   *     limit: 10
   *   }
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { query?: WorkflowQueryOptions }>,
    headers?: RawAxiosRequestHeaders
  ): Promise<CollectionProp<WorkflowProps>>
  /**
   * Start a Workflow
   * @param params entity IDs to identify the Space/Environment
   * @param rawData the Workflow configuration, including the entity to start the Workflow on and the Workflow Definition to use
   * @returns the created Workflow
   * @throws if the request fails
   * @example
   * ```javascript
   * const workflow = await client.workflow.create({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * }, {
   *   entity: {
   *     sys: {
   *       type: 'Link',
   *       linkType: 'Entry',
   *       id: '<entry_id>'
   *     }
   *   },
   *   workflowDefinition: {
   *     sys: {
   *       type: 'Link',
   *       linkType: 'WorkflowDefinition',
   *       id: <workflow_definition_id>
   *     }
   *   }
   * });
   * ```
   */
  create(
    params: OptionalDefaults<CreateWorkflowParams>,
    rawData: CreateWorkflowProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<WorkflowProps>
  /**
   * Update a Workflow (i.e. move to another step)
   * @param params entity IDs to identify the Space/Environment and Workflow
   * @param rawData the step to move to
   * @returns the updated Workflow
   * @throws if the request fails
   * @example
   * ```javascript
   * const workflow = await client.workflow.update({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   workflowId: '<workflow_id>',
   * }, {
   *   stepId: '<step_id>'
   * });
   * ```
   */
  update: CreateOrUpdate<UpdateWorkflowParams, UpdateWorkflowProps, WorkflowProps>
  /**
   * Delete a Workflow
   * @param params entity IDs to identify the Space/Environment and Workflow
   * @throws if the request fails
   * @example
   * ```javascript
   * await client.workflow.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   workflowId: '<workflow_id>',
   * });
   * ```
   */
  delete(
    params: OptionalDefaults<DeleteWorkflowParams>,
    headers?: RawAxiosRequestHeaders
  ): Promise<void>
  /**
   * Complete a Workflow, allowing a new one to be created for the same entry
   * @param params entity IDs to identify the Space/Environment and Workflow
   * @throws if the request fails
   * @example
   * ```javascript
   * await client.workflow.complete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   workflowId: '<workflow_id>',
   * });
   * ```
   */
  complete(
    params: OptionalDefaults<CompleteWorkflowParams>,
    headers?: RawAxiosRequestHeaders
  ): Promise<void>
}
