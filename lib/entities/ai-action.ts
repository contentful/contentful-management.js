/**
 * @module
 * @category Entities
 */
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

/** Supported variable types for AI action instructions. */
export type VariableType =
  | 'ResourceLink'
  | 'Text'
  | 'StandardInput'
  | 'Locale'
  | 'MediaReference'
  | 'Reference'
  | 'SmartContext'

/** Configuration for a reference-type variable specifying allowed entity types. */
export type ReferenceVariableConfiguration = {
  allowedEntities: Array<'Entry'>
}

/** Configuration options for an AI action variable. */
export type VariableConfiguration =
  | {
      strict: boolean
      in: Array<string>
    }
  | ReferenceVariableConfiguration

/** A variable used within an AI action instruction template. */
export type Variable = {
  configuration?: VariableConfiguration
  description?: string
  name?: string
  type: VariableType
  id: string
}

/** An AI action instruction consisting of a template and its variables. */
export type Instruction = {
  variables: Array<Variable>
  template: string
}

/** Configuration for the AI model used by an AI action. */
export type Configuration = {
  modelType: string
  modelTemperature: number
}

/** A test case for validating an AI action's behavior. */
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

/** Query options for listing AI actions. */
export interface AiActionQueryOptions {
  limit?: number
  skip?: number
  status?: 'all' | 'published'
}

/** Properties of a Contentful AI action. */
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
  configuration: Configuration
  instruction: Instruction
  testCases?: Array<AiActionTestCase>
}

/** Properties required to create a new AI action. */
export type CreateAiActionProps = Pick<
  Omit<AiActionProps, 'sys'>,
  'name' | 'description' | 'configuration' | 'instruction' | 'testCases'
>

/** A Contentful AI action with methods for updating, deleting, publishing, and invoking. */
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
