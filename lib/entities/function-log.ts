import type { Link, DefaultElements } from '../common-types'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { wrapCollection } from '../common-utils'
import type { MakeRequest } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'
import createFunctionLogApi from '../create-function-log-api'

export type FunctionLogProps = {
  sys: {
    id: string
    type: 'FunctionLog'
    createdBy: Link<'User'> // Only users can CRUD
    createdAt: string
    space: Link<'Space'>
    environment: Link<'Environment'>
    appDefinition: Link<'AppDefinition'>
  }
  severity: {
    info: number
    warn: number
    error: number
  }
  requestId: string
  event: {
    type: string
    query: string
    isIntrospectionQuery: boolean
    variables: Record<string, any>
  }
  messages: Array<{
    timestamp: number
    type: 'INFO' | 'ERROR' | 'WARN'
    message: string
  }>
}

export interface FunctionLog extends FunctionLogProps, DefaultElements<FunctionLogProps> {}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - raw contentful-Function data
 * @return Wrapped Function data
 */
export function wrapFunctionLog(
  makeRequest: MakeRequest,
  data: FunctionLogProps
): FunctionLogProps & ReturnType<typeof createFunctionLogApi> {
  const appAction = toPlainObject(copy(data))

  const appActionWithMethods = enhanceWithMethods(appAction, createFunctionLogApi(makeRequest))

  return freezeSys(appActionWithMethods)
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - raw contentful-function data
 * @return Wrapped App Function collection data
 */
export const wrapFunctionLogCollection = wrapCollection(wrapFunctionLog)
