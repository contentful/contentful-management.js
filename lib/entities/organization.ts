/**
 * @module
 * @category Entities
 */
import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import type { ContentfulOrganizationAPI } from '../create-organization-api'
import createOrganizationApi from '../create-organization-api'
import { wrapCollection } from '../common-utils'
import type { MetaSysProps, DefaultElements, MakeRequest } from '../common-types'

export type Organization = DefaultElements<OrganizationProps> &
  OrganizationProps &
  ContentfulOrganizationAPI

export type OrganizationProps = {
  /**
   * System metadata
   */
  sys: MetaSysProps
  /**
   * Name
   */
  name: string
}

/**
 * @deprecated Use `OrganizationProps` instead.
 */
export type OrganizationProp = OrganizationProps

/**
 * This method creates the API for the given organization with all the methods for
 * reading and creating other entities. It also passes down a clone of the
 * http client with an organization id, so the base path for requests now has the
 * organization id already set.
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - API response for an Organization
 * @returns {Organization}
 */
export function wrapOrganization(makeRequest: MakeRequest, data: OrganizationProps): Organization {
  const org = toPlainObject(copy(data))
  const orgApi = createOrganizationApi(makeRequest)
  const enhancedOrganization = enhanceWithMethods(org, orgApi)
  return freezeSys(enhancedOrganization)
}

/**
 * This method normalizes each organization in a collection.
 * @private
 */
export const wrapOrganizationCollection = wrapCollection(wrapOrganization)
