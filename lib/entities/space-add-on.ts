/**
 * @module
 * @category Entities
 */
import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import type { DefaultElements, BasicMetaSysProps, SysLink, MakeRequest } from '../common-types'

export type SpaceAddOnType = 'contentTypes' | 'environments' | 'records'

export type SpaceAddOnProps = {
  sys: BasicMetaSysProps & {
    organization: SysLink
    space: SysLink
  }
  name: string
  used: number
  allocated: number
}

export type UpdateSpaceAddOnAllocationProps = {
  add_on: SpaceAddOnType
  allocation: number
}

export interface SpaceAddOn extends SpaceAddOnProps, DefaultElements<SpaceAddOnProps> {}

/**
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw space add-on data
 * @returns Wrapped space add-on data
 */
export function wrapSpaceAddOn(makeRequest: MakeRequest, data: SpaceAddOnProps): SpaceAddOn {
  const spaceAddOn = toPlainObject(copy(data))
  const spaceAddOnWithMethods = enhanceWithMethods(spaceAddOn, {})
  return freezeSys(spaceAddOnWithMethods)
}

/**
 * @internal
 */
export const wrapSpaceAddOnCollection = wrapCollection(wrapSpaceAddOn)
