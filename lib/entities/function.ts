import type { Link, DefaultElements } from '../common-types'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { wrapCollection } from '../common-utils'
import type { MakeRequest } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'
import createFunctionApi from '../create-function-api'

export type FunctionProps = {
  sys: {
    id: string
    type: 'Function'
    createdBy: Link<'User'> // Only users can CRUD
    createdAt: string
    updatedBy: Link<'User'> // Only users can CRUD
    updatedAt: string
    organization: Link<'Organization'>
    appDefinition: Link<'AppDefinition'>
  }
  name: string
  description: string
  path: string
  accepts: string[]
  allowNetworks?: string[]
}

export interface Function extends FunctionProps, DefaultElements<FunctionProps> {}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Bundle data
 * @return Wrapped App Bundle data
 */
export function wrapFunction(
  makeRequest: MakeRequest,
  data: FunctionProps
): FunctionProps & ReturnType<typeof createFunctionApi> {
  const appAction = toPlainObject(copy(data))

  const appActionWithMethods = enhanceWithMethods(appAction, createFunctionApi(makeRequest))

  return freezeSys(appActionWithMethods)
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Bundle collection data
 * @return Wrapped App Bundle collection data
 */
export const wrapFunctionCollection = wrapCollection(wrapFunction)
