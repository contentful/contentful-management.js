import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  BasicMetaSysProps,
  DefaultElements,
  GetEntryParams,
  GetTaskParentEntityParams,
  GetTaskParams,
  Link,
  MakeRequest,
  SysLink,
} from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'

export type TaskStatus = 'active' | 'resolved'

export type TaskParentEntityType =
  | 'Entry'
  | 'Experience'
  | 'Fragment'
  | 'Template'
  | 'ComponentType'

export type TaskParentEntityPath =
  | 'entries'
  | 'experiences'
  | 'fragments'
  | 'templates'
  | 'component_types'

export type TaskSysProps = Pick<
  BasicMetaSysProps,
  'id' | 'version' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'
> & {
  type: 'Task'
  space: SysLink
  environment: SysLink
  parentEntity: Link<TaskParentEntityType>
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

// Keep GetEntryParams for backwards compatibility with existing entry task callers.
// New task parent entity support should use GetTaskParentEntityParams.
export type CreateTaskParams = GetEntryParams | GetTaskParentEntityParams
export type UpdateTaskParams = GetTaskParams
export type DeleteTaskParams = GetTaskParams & { version: number }

type TaskApi = {
  update(): Promise<Task>
  delete(): Promise<void>
}

export interface Task extends TaskProps, DefaultElements<TaskProps>, TaskApi {}

/**
 * @internal
 */
export default function createTaskApi(makeRequest: MakeRequest): TaskApi {
  const getParams = (task: TaskProps): GetTaskParams => {
    const parentEntity = task.sys.parentEntity

    return {
      spaceId: task.sys.space.sys.id,
      environmentId: task.sys.environment.sys.id,
      parentEntityType: parentEntity.sys.linkType,
      parentEntityId: parentEntity.sys.id,
      taskId: task.sys.id,
    }
  }

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
