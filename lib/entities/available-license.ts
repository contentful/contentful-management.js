import copy from 'fast-copy'
import { toPlainObject } from 'contentful-sdk-core'
import { wrapCollection } from '../common-utils'
import type { DefaultElements, MakeRequest } from '../common-types'

/**
 * Available License quota information
 */
export type AvailableLicenseQuotas = {
  contentTypes: number | 'unlimited'
  records: number | 'unlimited'
  environments: number | 'unlimited'
}

/**
 * Available License properties returned from the API
 */
export type AvailableLicenseProps = {
  /**
   * License ID (offer ID)
   */
  id: string

  /**
   * License name
   */
  name: string

  /**
   * Count of available licenses for this offer
   */
  count: number

  /**
   * Quota limits for this license
   */
  quotas: AvailableLicenseQuotas
}

/**
 * Available License entity with enhanced methods
 */
export interface AvailableLicense
  extends AvailableLicenseProps,
    DefaultElements<AvailableLicenseProps> {}

/**
 * @internal
 * Wraps the raw available license data
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw available license data
 * @returns Wrapped available license data
 */
export function wrapAvailableLicense(
  makeRequest: MakeRequest,
  data: AvailableLicenseProps,
): AvailableLicense {
  return toPlainObject(copy(data))
}

/**
 * @internal
 */
export const wrapAvailableLicenseCollection = wrapCollection(wrapAvailableLicense)
