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
   * }, {
   *   name: "name",
   *   description: "description",
   *   appliesTo: [
   *     {
   *       type: "Link",
   *       linkType: "Entry",
   *       validations: [
   *         {
   *           linkContentType: [
   *             "content_type_a",
   *             "content_type_b",
   *             "content_type_c"
   *           ]
   *         }
   *       ]
   *     }
   *   ],
   *   flowType: "strict_neighbor",
   *   startOnEntityCreation: true,
   *   steps: [
   *     {
   *       name: "To Do",
   *       description: "Move to the next step when starting work",
   *       permissions: [
   *         {
   *           type: "entity_permission",
   *           configuration: {
   *             actors: "all",
   *             effect: "deny",
   *             action: "publish"
   *           }
   *         },
   *         {
   *           type": "workflow_permission",
   *           configuration: {
   *             actors: [
   *               {
   *                 sys: {
   *                   type: "Link",
   *                   linkType: "User",
   *                   id: "<user_id>"
   *                 }
   *               }
   *             ],
   *             effect: "allow",
   *             action: "edit"
   *           }
   *         }
   *       ],
   *       annotations: [
   *         "cf-color-1",
   *         "some-custom-annotation"
   *       ],
   *       actions: [
   *         {
   *           type: "email",
   *           configuration: {
   *             recipients: [
   *               "custom@example.com",
   *               {
   *                 sys: {
   *                   type: "Link",
   *                   linkType: "Team",
   *                  id: "<team_id>"
   *                 }
   *               }
   *             ]
   *           }
   *         },
   *         {
   *           type: "task",
   *           configuration: {
   *             assignee: {
   *               sys: {
   *                 type: "Link",
   *                 linkType: "Team",
   *                 id: "<team_id>"
   *               }
   *             },
   *             body: "Please take care of this until Friday.",
   *             dueDate: "3"
   *           }
   *         },
   *         {
   *           type: "app",
   *           appId: "theSlackAppId",
   *           appActionId: "theSlackAppActionId",
   *           configuration: {
   *             body: {
   *               workspaceId: "someConnectedSlackWorkspaceId",
   *               channelId: "someSlackChannelId",
   *               message: "myCustomSlackMessage"
   *             }
   *           }
   *         }
   *       ]
   *     }
   *   ]
   * }
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
