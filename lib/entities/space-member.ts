import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import { CollectionProp, MetaSysProps, MetaLinkProps, DefaultElements } from '../types/common-types'
import { AxiosInstance } from 'axios'

export type SpaceMemberProps = {
  sys: MetaSysProps
  /**
   * User is an admin
   */
  admin: boolean
  /**
   * Array of Role Links
   */
  roles: MetaLinkProps[]
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
 * @param http - HTTP client instance
 * @param data - Raw space members collection data
 * @return Wrapped space members collection data
 */
export function wrapSpaceMemberCollection(
  http: AxiosInstance,
  data: CollectionProp<SpaceMemberProps>
) {
  const spaceMembers = toPlainObject(cloneDeep(data))
  spaceMembers.items = spaceMembers.items.map((entity) => wrapSpaceMember(http, entity))
  return freezeSys(spaceMembers)
}
