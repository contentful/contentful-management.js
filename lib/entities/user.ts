import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import type { DefaultElements, BasicMetaSysProps, MakeRequest } from '../common-types'

export type UserProps = {
  /**
   * System metadata
   */
  sys: BasicMetaSysProps

  /**
   * First name of the user
   */
  firstName: string

  /**
   * Last name of the user
   */
  lastName: string

  /**
   * Url to the users avatar
   */
  avatarUrl: string

  /**
   * Email address of the user
   */
  email: string

  /**
   * Activation flag
   */
  activated: boolean

  /**
   * Number of sign ins
   */
  signInCount: number

  /**
   * User confirmation flag
   */
  confirmed: boolean

  '2faEnabled': boolean
  cookieConsentData: string
}

export interface User extends UserProps, DefaultElements<UserProps> {}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw data
 * @return Normalized user
 */
export function wrapUser<T = UserProps>(_makeRequest: MakeRequest, data: T) {
  const user = toPlainObject(copy(data))
  const userWithMethods = enhanceWithMethods(user, {})
  return freezeSys(userWithMethods)
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw data collection
 * @return Normalized user collection
 */
export const wrapUserCollection = wrapCollection(wrapUser)
