import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  DefaultElements,
  MakeRequestWithoutUserAgent,
  MetaLinkProps,
  MetaSysProps,
} from '../common-types'
import { wrapCollection } from '../common-utils'

export type SpaceMemberProps = {
  sys: MetaSysProps
  /**
   * User is an admin
   */
  admin: boolean
  /**
   * Array of Role Links
   */
  roles: { sys: MetaLinkProps }[]
}

export interface SpaceMember extends SpaceMemberProps, DefaultElements<SpaceMemberProps> {}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw space member data
 * @return Wrapped space member data
 */
export function wrapSpaceMember(_makeRequest: MakeRequestWithoutUserAgent, data: SpaceMemberProps) {
  const spaceMember = toPlainObject(copy(data))
  return freezeSys(spaceMember)
}

/**
 * @private
 */
export const wrapSpaceMemberCollection = wrapCollection(wrapSpaceMember)
