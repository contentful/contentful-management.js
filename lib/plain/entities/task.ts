import { RawAxiosRequestHeaders } from 'axios'
import { GetTaskParams, GetEntryParams, QueryParams, CollectionProp } from '../../common-types'
import {
  CreateTaskParams,
  UpdateTaskParams,
  DeleteTaskParams,
  TaskProps,
  CreateTaskProps,
  UpdateTaskProps,
} from '../../entities/task'
import { OptionalDefaults } from '../wrappers/wrap'

export type TaskPlainClientAPI = {
  /** Fetches a task
   *
   * @param params Space ID, Entry ID, Environment ID, and Task ID
   * @returns the task
   * @throws if the request fails or the task is not found
   * @example
   * ```javascript
   * const task = await client.task.get({
   *   spaceId: '<space_id>',
   *   entryId: '<entry_id>',
   *   environmentId: '<environment_id>',
   *   taskId: '<task_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetTaskParams>): Promise<TaskProps>
  /** Fetches all tasks for a given entry
   *
   * @param params Space ID, Entry ID, Environment ID, and query parameters
   * @returns a collection of tasks
   * @throws if the request fails or the tasks are not found
   * @example
   * ```javascript
   * const tasks = await client.task.getMany({
   *   spaceId: '<space_id>',
   *   entryId: '<entry_id>',
   *   environmentId: '<environment_id>',
   *   query: {
   *    limit: 100,
   *   }
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetEntryParams & QueryParams>
  ): Promise<CollectionProp<TaskProps>>
  /** Creates a task
   *
   * @param params Space ID, Entry ID, Environment ID
   * @param rawData the task to create
   * @returns the created task
   * @throws if the request fails or or the payload is malformed
   * @example
   * ```javascript
   * const task = await client.task.create(
   *   {
   *     spaceId: '<space_id>',
   *     entryId: '<entry_id>',
   *     environmentId: '<environment_id>',
   *   },
   *   {
   *     body: "Review Translation",
   *     status: "active",
   *     assignedTo: {
   *       sys: {
   *         type: "Link",
   *          linkType: "User",
   *          id: <user_id>
   *       }
   *     }
   *   }
   * );
   * ```
   */
  create(
    params: OptionalDefaults<CreateTaskParams>,
    rawData: CreateTaskProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<TaskProps>
  /** Updates a task
   *
   * @param params Space ID, Entry ID, Environment ID, and Task ID
   * @param rawData the task update
   * @returns the updated task
   * @throws if the request fails, the task is not found, or the payload is malformed
   * @example
   * ```javascript
   * const task = await client.task.update(
   *   {
   *     spaceId: '<space_id>',
   *     entryId: '<entry_id>',
   *     environmentId: '<environment_id>',
   *     taskId: '<task_id>',
   *   },
   *   {
   *     body: "Review Translation",
   *     status: "active",
   *     assignedTo: {
   *       sys: {
   *         type: "Link",
   *          linkType: "User",
   *          id: <user_id>
   *       }
   *     }
   *   }
   * );
   * ```
   */
  update(
    params: OptionalDefaults<UpdateTaskParams>,
    rawData: UpdateTaskProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<TaskProps>
  /** Deletes a task
   *
   * @param params Space ID, Entry ID, Environment ID, and Task ID
   * @throws if the request fails or the task is not found
   * @example
   * ```javascript
   * await client.task.delete({
   *   spaceId: '<space_id>',
   *   entryId: '<entry_id>',
   *   environmentId: '<environment_id>',
   *   taskId: '<task_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<DeleteTaskParams>): Promise<void>
}
