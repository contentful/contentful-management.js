import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, MakeRequest, MetaSysProps } from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'

export type AiActionProps = {
  sys: MetaSysProps & {
    type: 'AiAction'
    space: { sys: { id: string } }
    environment: { sys: { id: string } }
  }
  name: string
  description: string
  configuration: {
    modelType: string
    modelTemperature: number
  }
  instruction: {
    template: string
    conditions?: Array<{
      variable: string
      id: string
      value?: string
      operator?: 'eq' | 'neq' | 'in' | 'nin'
    }>
    // Allowed variable types now: Text (combined), StandardInput, Reference, Locale, MediaReference, SmartContext.
    variables: Array<{
      id: string
      name: string
      description?: string
      type: 'Text' | 'StandardInput' | 'Reference' | 'Locale' | 'MediaReference' | 'SmartContext'
      /**
       * For Text variables, configuration (if provided) should have:
       *  - in: string[] (allowed values, at least one)
       *  - strict: boolean
       * For StandardInput, configuration can be omitted.
       */
      configuration?: any
    }>
  }
  testCases: any[]
}

export type CreateAiActionProps = Pick<
  AiActionProps,
  'name' | 'description' | 'configuration' | 'instruction' | 'testCases'
>

export interface AiAction extends AiActionProps, DefaultElements<AiActionProps> {
  update(): Promise<AiAction>
  delete(): Promise<void>
  publish(): Promise<AiAction>
  unpublish(): Promise<AiAction>
}

function createAiActionApi(makeRequest: MakeRequest) {
  const getParams = (data: AiActionProps) => ({
    spaceId: data.sys.space.sys.id,
    environmentId: data.sys.environment.sys.id,
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
        params: getParams(self),
        payload: self,
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
  }
}

export function wrapAiAction(makeRequest: MakeRequest, data: AiActionProps): AiAction {
  const aiAction = toPlainObject(copy(data))
  const aiActionWithMethods = enhanceWithMethods(aiAction, createAiActionApi(makeRequest))
  return freezeSys(aiActionWithMethods)
}

export const wrapAiActionCollection = wrapCollection(wrapAiAction)
