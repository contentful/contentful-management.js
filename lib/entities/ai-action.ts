import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, Link, MakeRequest, MetaSysProps } from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'
import {
  wrapAiActionInvocation,
  type AiActionInvocationType,
  type AiActionInvocation,
} from './ai-action-invocation'

export type AiActionVariableType =
  | 'ResourceLink'
  | 'Text'
  | 'StandardInput'
  | 'Locale'
  | 'MediaReference'
  | 'Reference'
  | 'SmartContext'

export type AiActionReferenceVariableConfiguration = {
  allowedEntities: Array<'Entry'>
}

export type AiActionVariableConfiguration =
  | {
      strict: boolean
      in: Array<string>
    }
  | AiActionReferenceVariableConfiguration

export type AiActionVariable = {
  configuration?: AiActionVariableConfiguration
  description?: string
  name?: string
  type: AiActionVariableType
  id: string
}

export const AiActionScope = {
  Entry: 'Entry',
  EntryField: 'EntryField',
} as const
export type AiActionScopeType = typeof AiActionScope[keyof typeof AiActionScope]

export const AiActionOutputType = {
  Generation: 'Generation',
  Suggestion: 'Suggestion',
} as const
export type AiActionOutputTypeType = typeof AiActionOutputType[keyof typeof AiActionOutputType]

export type AiActionInstruction = {
  variables: Array<AiActionVariable>
  template: string
}

export type AiActionConfiguration = {
  modelType: string
  modelTemperature: number
  scope?: AiActionScopeType
  outputType?: AiActionOutputTypeType
}

export type AiActionTestCase =
  | {
      type?: 'Text'
      value?: string
    }
  | {
      type?: 'Reference'
      value?: {
        entityPath?: string
        entityType?: 'Entry'
        entityId?: string
      }
    }

export interface AiActionQueryOptions {
  limit?: number
  skip?: number
  status?: 'all' | 'published'
}

export type AiActionProps = {
  sys: MetaSysProps & {
    type: 'AiAction'
    space: { sys: { id: string } }
    publishedBy?: Link<'User'> | Link<'AppDefinition'>
    updatedBy: Link<'User'> | Link<'AppDefinition'>
    createdBy: Link<'User'> | Link<'AppDefinition'>
    publishedVersion?: number
    version: number
    publishedAt?: string
    updatedAt: string
    createdAt: string
    id: string
  }
  name: string
  description: string
  configuration: AiActionConfiguration
  instruction: AiActionInstruction
  testCases?: Array<AiActionTestCase>
}

export type CreateAiActionProps = Pick<
  Omit<AiActionProps, 'sys'>,
  'name' | 'description' | 'configuration' | 'instruction' | 'testCases'
>

export interface AiAction extends AiActionProps, DefaultElements<AiActionProps> {
  update(): Promise<AiAction>
  delete(): Promise<void>
  publish(): Promise<AiAction>
  unpublish(): Promise<AiAction>
  invoke(environmentId: string, payload: AiActionInvocationType): Promise<AiActionInvocation>
}

function createAiActionApi(makeRequest: MakeRequest) {
  const getParams = (data: AiActionProps) => ({
    spaceId: data.sys.space.sys.id,
    aiActionId: data.sys.id,
  })

  return {
    update: function update() {
      const self = this as AiActionProps
      return makeRequest({
        entityType: 'AiAction',
        action: 'update',
        params: getParams(self),
        payload: self,
      }).then((data) => wrapAiAction(makeRequest, data))
    },

    delete: function del() {
      const self = this as AiActionProps
      return makeRequest({
        entityType: 'AiAction',
        action: 'delete',
        params: getParams(self),
      })
    },

    publish: function publish() {
      const self = this as AiActionProps
      return makeRequest({
        entityType: 'AiAction',
        action: 'publish',
        params: {
          aiActionId: self.sys.id,
          spaceId: self.sys.space.sys.id,
          version: self.sys.version,
        },
      }).then((data) => wrapAiAction(makeRequest, data))
    },

    unpublish: function unpublish() {
      const self = this as AiActionProps
      return makeRequest({
        entityType: 'AiAction',
        action: 'unpublish',
        params: getParams(self),
      }).then((data) => wrapAiAction(makeRequest, data))
    },

    invoke: function invoke(environmentId: string, payload: AiActionInvocationType) {
      const self = this as AiActionProps
      return makeRequest({
        entityType: 'AiAction',
        action: 'invoke',
        params: {
          spaceId: self.sys.space.sys.id,
          environmentId,
          aiActionId: self.sys.id,
        },
        payload,
      }).then((data) => wrapAiActionInvocation(makeRequest, data))
    },
  }
}

export function wrapAiAction(makeRequest: MakeRequest, data: AiActionProps): AiAction {
  const aiAction = toPlainObject(copy(data))
  const aiActionWithMethods = enhanceWithMethods(aiAction, createAiActionApi(makeRequest))
  return freezeSys(aiActionWithMethods)
}

export const wrapAiActionCollection = wrapCollection(wrapAiAction)
