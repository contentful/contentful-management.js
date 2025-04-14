import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, MakeRequest, MetaSysProps } from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'
import {
  wrapAiActionInvocation,
  type AiActionInvocationType,
  type AiActionInvocation,
} from './ai-action-invocation'

export enum StatusFilter {
  ALL = 'all',
  PUBLISHED = 'published',
}

export enum VariableType {
  RESOURCE_LINK = 'ResourceLink',
  TEXT = 'Text',
  STANDARD_INPUT = 'StandardInput',
  LOCALE = 'Locale',
  MEDIA_REFERENCE = 'MediaReference',
  REFERENCE = 'Reference',
  SMART_CONTEXT = 'SmartContext',
}

export enum EntityTypeEntry {
  ENTRY = 'Entry',
}

export type ReferenceVariableConfiguration = {
  allowedEntities: Array<EntityTypeEntry>
}

export type VariableConfiguration =
  | {
      strict: boolean
      in: Array<string>
    }
  | ReferenceVariableConfiguration

export type Variable = {
  configuration?: VariableConfiguration
  description?: string
  name?: string
  type: VariableType
  id: string
}

export type Instruction = {
  variables: Array<Variable>
  template: string
}

export type Configuration = {
  modelType: string
  modelTemperature: number
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

export type SysLinkUserOrApp = {
  sys: {
    id: string
    linkType: 'User' | 'App'
    type: 'Link'
  }
}

export interface AiActionQueryOptions {
  limit?: number
  skip?: number
  status?: StatusFilter
}

export type AiActionProps = {
  sys: MetaSysProps & {
    type: 'AiAction'
    space: { sys: { id: string } }
    publishedBy?: SysLinkUserOrApp
    updatedBy: SysLinkUserOrApp
    createdBy: SysLinkUserOrApp
    publishedVersion?: number
    version: number
    publishedAt?: string
    updatedAt: string
    createdAt: string
    id: string
  }
  name: string
  description: string
  configuration: Configuration
  instruction: Instruction
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
