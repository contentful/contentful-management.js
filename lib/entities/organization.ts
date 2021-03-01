import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import createOrganizationApi, { ContentfulOrganizationAPI } from '../create-organization-api'
import { wrapCollection } from '../common-utils'
import { MetaSysProps, DefaultElements, MakeRequestWithoutUserAgent } from '../common-types'

export type Organization = DefaultElements<OrganizationProp> &
  OrganizationProp &
  ContentfulOrganizationAPI

export type OrganizationProp = {
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
 * This method creates the API for the given organization with all the methods for
 * reading and creating other entities. It also passes down a clone of the
 * http client with an organization id, so the base path for requests now has the
 * organization id already set.
 * @private
 * @param http - HTTP client instance
 * @param data - API response for an Organization
 * @return {Organization}
 */
export function wrapOrganization(
  makeRequest: MakeRequestWithoutUserAgent,
  data: OrganizationProp
): Organization {
  const org = toPlainObject(copy(data))
  const orgApi = createOrganizationApi({
    makeRequest,
  })
  const enhancedOrganization = enhanceWithMethods(org, orgApi)
  return freezeSys(enhancedOrganization)
}

/**
 * This method normalizes each organization in a collection.
 * @private
 */
export const wrapOrganizationCollection = wrapCollection(wrapOrganization)
