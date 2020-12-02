import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import { wrapCollection } from '../common-utils'
import { MetaSysProps, MetaLinkProps, DefaultElements } from '../common-types'
import type { AxiosInstance } from 'contentful-sdk-core'

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
export function wrapSpaceMember(http: AxiosInstance, data: SpaceMemberProps) {
  const spaceMember = toPlainObject(cloneDeep(data))
  return freezeSys(spaceMember)
}

/**
 * @private
 */
export const wrapSpaceMemberCollection = wrapCollection(wrapSpaceMember)
