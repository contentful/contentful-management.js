import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
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

export type TaskStatus = 'active' | 'resolved'

export type TaskSysProps = Pick<
  BasicMetaSysProps,
  'id' | 'version' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'
> & {
  type: 'Task'
  space: SysLink
  environment: SysLink
  parentEntity: Link<'Entry'>
}

export type TaskProps = {
  sys: TaskSysProps
  body: string
  assignedTo: Link<'User' | 'Team'>
  status: TaskStatus
  dueDate?: string
}

export type CreateTaskProps = Omit<TaskProps, 'sys'>
export type UpdateTaskProps = Omit<TaskProps, 'sys'> & { sys: Pick<TaskSysProps, 'version'> }

export type CreateTaskParams = GetEntryParams
export type UpdateTaskParams = GetTaskParams
export type DeleteTaskParams = GetTaskParams & { version: number }

type TaskApi = {
  update(): Promise<Task>
  delete(): Promise<void>
}

export interface Task extends TaskProps, DefaultElements<TaskProps>, TaskApi {}

/**
 * @private
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
 * @private
 */
export function wrapTask(makeRequest: MakeRequest, data: TaskProps): Task {
  const task = toPlainObject(copy(data))
  const taskWithMethods = enhanceWithMethods(task, createTaskApi(makeRequest))
  return freezeSys(taskWithMethods)
}

/**
 * @private
 */
export const wrapTaskCollection = wrapCollection(wrapTask)
