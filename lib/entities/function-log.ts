import type { Link, DefaultElements } from '../common-types'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { wrapCollection } from '../common-utils'
import type { MakeRequest } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'

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
 * @returns Wrapped Function data
 */
export function wrapFunctionLog(
  makeRequest: MakeRequest,
  data: FunctionLogProps,
): FunctionLogProps {
  const functionLog = toPlainObject(copy(data))
  return freezeSys(functionLog)
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - raw contentful-function data
 * @returns Wrapped App Function collection data
 */
export const wrapFunctionLogCollection = wrapCollection(wrapFunctionLog)
