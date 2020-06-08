import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
// @ts-expect-error
import createOrganizationApi from '../create-organization-api'
import { AxiosInstance } from 'axios'
import { MetaSysProps, CollectionProp } from '../common-types'

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
 * @param  {Object} http - HTTP client instance
 * @param  {Object} data - API response for a Organization
 * @return {Organization}
 */
export function wrapOrganization(http: AxiosInstance, data: OrganizationProp) {
  const org = toPlainObject(cloneDeep(data))
  const baseURL =
    (http.defaults.baseURL || '').replace('/spaces/', '/organizations/') + org.sys.id + '/'

  // @ts-expect-error
  const orgScopedHttpClient = http.cloneWithNewParams({ baseURL })
  const orgApi = createOrganizationApi({
    http: orgScopedHttpClient,
  })
  const enhancedOrganization = enhanceWithMethods(org, orgApi)
  return freezeSys(enhancedOrganization)
}

/**
 * This method normalizes each organization in a collection.
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw organization collection data
 * @return {OrganizationCollection} Normalized organization collection data
 */
export function wrapOrganizationCollection(
  http: AxiosInstance,
  data: CollectionProp<OrganizationProp>
) {
  const organizations = toPlainObject(cloneDeep(data))
  organizations.items = organizations.items.map((entity) => wrapOrganization(http, entity))
  return freezeSys(organizations)
}
