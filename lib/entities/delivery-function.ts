import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import { DefaultElements, Link, MakeRequest } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'
import copy from 'fast-copy'
import { wrapCollection } from '../common-utils'
import createDeliveryFunctionApi, {
  ContentfulDeliveryFunctionAPI,
} from '../create-delivery-function-api'

export type DeliveryFunctionProps = {
  sys: {
    id: string
    type: 'DeliveryFunction'
    createdBy: Link<'User'>
    createdAt: string
    updatedBy: Link<'User'>
    updatedAt: string
    organization: Link<'Organization'>
    appDefinition: Link<'AppDefinition'>
  }
  name: string
  description: string
  path: string
  allowNetworks?: string[]
}

export type DeliveryFunction = ContentfulDeliveryFunctionAPI &
  DeliveryFunctionProps &
  DefaultElements<DeliveryFunctionProps>

export function wrapDeliveryFunction(
  makeRequest: MakeRequest,
  data: DeliveryFunctionProps
): DeliveryFunction {
  const deliveryFunction = toPlainObject(copy(data))
  const deliveryFunctionWithMethods = enhanceWithMethods(
    deliveryFunction,
    createDeliveryFunctionApi(makeRequest)
  )
  return freezeSys(deliveryFunctionWithMethods)
}

export const wrapDeliveryFunctionCollection = wrapCollection(wrapDeliveryFunction)

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw DeliveryFunction data
 * @return Wrapped DeliveryFunction data
 */
export function wrapDeliveryFunctionResponse(makeRequest: MakeRequest, data: any) {
  const appActionCallResponse = toPlainObject(copy(data))
  const appActionCallResponseWithMethods = enhanceWithMethods(
    appActionCallResponse,
    createDeliveryFunctionApi(makeRequest)
  )
  return appActionCallResponseWithMethods
}
