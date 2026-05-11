import copy from 'fast-copy'
import { toPlainObject } from 'contentful-sdk-core'
import { wrapCollection } from '../common-utils'
import type { DefaultElements, MakeRequest } from '../common-types'

/**
 * Eligible License quota information
 */
export type EligibleLicenseQuotas = {
  contentTypes: number | 'unlimited'
  records: number | 'unlimited'
  environments: number | 'unlimited'
}

/**
 * Required add-on allocation to support space usage
 */
export type RequiredAddOnAllocation = {
  contentTypes: number
  records: number
  environments: number
}

/**
 * Eligible License properties returned from the API
 */
export type EligibleLicenseProps = {
  /**
   * License ID (offer ID)
   */
  id: string

  /**
   * License name
   */
  name: string

  /**
   * Count of eligible licenses for this offer
   */
  count: number

  /**
   * Required add-on allocation needed beyond the license quota
   */
  requiredAddOnAllocation: RequiredAddOnAllocation

  /**
   * Quota limits for this license
   */
  quotas: EligibleLicenseQuotas
}

/**
 * Eligible License entity with enhanced methods
 */
export interface EligibleLicense
  extends EligibleLicenseProps,
    DefaultElements<EligibleLicenseProps> {}

/**
 * @internal
 * Wraps the raw eligible license data
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw eligible license data
 * @returns Wrapped eligible license data
 */
export function wrapEligibleLicense(
  makeRequest: MakeRequest,
  data: EligibleLicenseProps,
): EligibleLicense {
  return toPlainObject(copy(data))
}

/**
 * @internal
 */
export const wrapEligibleLicenseCollection = wrapCollection(wrapEligibleLicense)
