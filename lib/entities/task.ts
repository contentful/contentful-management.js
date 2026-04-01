/**
 * @module
 * @category Entities
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  BasicMetaSysProps,
  DefaultElements,
  GetEntryParams,
  GetTaskParams,
  Link,
  MakeRequest,
  SysLink,
} from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'

/** Status of a task */
export type TaskStatus = 'active' | 'resolved'

/** System metadata properties for a task */
export type TaskSysProps = Pick<
  BasicMetaSysProps,
  'id' | 'version' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'
> & {
  type: 'Task'
  space: SysLink
  environment: SysLink
  parentEntity: Link<'Entry'>
}

/** Properties of a task assigned to a user or team on an entry */
export type TaskProps = {
  sys: TaskSysProps
  body: string
  assignedTo: Link<'User' | 'Team'>
  status: TaskStatus
  dueDate?: string
}

/** Properties required to create a new task */
export type CreateTaskProps = Omit<TaskProps, 'sys'>
/** Properties for updating an existing task */
export type UpdateTaskProps = Omit<TaskProps, 'sys'> & { sys: Pick<TaskSysProps, 'version'> }

/** Parameters required to create a task on an entry */
export type CreateTaskParams = GetEntryParams
/** Parameters required to update a task */
export type UpdateTaskParams = GetTaskParams
/** Parameters required to delete a task */
export type DeleteTaskParams = GetTaskParams & { version: number }

type TaskApi = {
  update(): Promise<Task>
  delete(): Promise<void>
}

/** A task with methods to update and delete */
export interface Task extends TaskProps, DefaultElements<TaskProps>, TaskApi {}

/**
 * @internal
 */
export default function createTaskApi(makeRequest: MakeRequest): TaskApi {
  const getParams = (task: TaskProps): GetTaskParams => ({
    spaceId: task.sys.space.sys.id,
    environmentId: task.sys.environment.sys.id,
    entryId: task.sys.parentEntity.sys.id,
    taskId: task.sys.id,
  })

  return {
    update: function () {
      const raw = this.toPlainObject() as TaskProps

      return makeRequest({
        entityType: 'Task',
        action: 'update',
        params: getParams(raw),
        payload: raw,
      }).then((data) => wrapTask(makeRequest, data))
    },

    delete: function () {
      const raw = this.toPlainObject() as TaskProps

      return makeRequest({
        entityType: 'Task',
        action: 'delete',
        params: {
          ...getParams(raw),
          version: raw.sys.version,
        },
      }).then(() => {
        // noop
      })
    },
  }
}

/**
 * @internal
 */
export function wrapTask(makeRequest: MakeRequest, data: TaskProps): Task {
  const task = toPlainObject(copy(data))
  const taskWithMethods = enhanceWithMethods(task, createTaskApi(makeRequest))
  return freezeSys(taskWithMethods)
}

/**
 * @internal
 */
export const wrapTaskCollection = wrapCollection(wrapTask)
