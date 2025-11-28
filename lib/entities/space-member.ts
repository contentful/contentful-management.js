/**
 * @module
 * @category Entities
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, MakeRequest, SysLink, MetaSysProps } from '../common-types'
import { wrapCollection } from '../common-utils'

export type SpaceMemberProps = {
  sys: MetaSysProps & {
    user: SysLink
    relatedMemberships: SysLink[]
  }
  /**
   * User is an admin
   */
  admin: boolean
  /**
   * Array of Role Links
   */
  roles: SysLink[]
}

export interface SpaceMember extends SpaceMemberProps, DefaultElements<SpaceMemberProps> {}

/**
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw space member data
 * @returns Wrapped space member data
 */
export function wrapSpaceMember(_makeRequest: MakeRequest, data: SpaceMemberProps) {
  const spaceMember = toPlainObject(copy(data))
  return freezeSys(spaceMember)
}

/**
 * @internal
 */
export const wrapSpaceMemberCollection = wrapCollection(wrapSpaceMember)
