/**
 * Contentful Management API Client. Contains methods which allow access to
 * any operations that can be performed with a management token.
 * @packageDocumentation
 */

/**
 * Types for meta information found across the different entities in Contentful
 * @namespace Meta
 */

/**
 * System metadata. See <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/introduction/common-resource-attributes">Common Resource Attributes</a> for more details.
 * @memberof Meta
 * @typedef Sys
 * @prop {string} type
 * @prop {string} id
 * @prop {Meta.Link} space
 * @prop {string} createdAt
 * @prop {string} updatedAt
 * @prop {number} revision
 */

/**
 * Link to another entity. See <a href="https://www.contentful.com/developers/docs/concepts/links/">Links</a> for more details.
 * @memberof Meta
 * @typedef Link
 * @prop {string} type - type of this entity. Always link.
 * @prop {string} id
 * @prop {string} linkType - type of this link. If defined, either Entry or Asset
 */

import { createRequestConfig } from 'contentful-sdk-core'
import errorHandler from './error-handler'
import entities from './entities'
import * as endpoints from './plain'

/**
 * Creates API object with methods to access functionality from Contentful's
 * Management API
 * @param {Object} params - API initialization params
 * @prop {Object} http - HTTP client instance
 * @prop {Function} shouldLinksResolve - Link resolver preconfigured with global setting
 */
export default function createClientApi({ http }) {
  const { wrapSpace, wrapSpaceCollection } = entities.space
  const { wrapUser } = entities.user
  const {
    wrapPersonalAccessToken,
    wrapPersonalAccessTokenCollection,
  } = entities.personalAccessToken
  const { wrapOrganization, wrapOrganizationCollection } = entities.organization
  const { wrapUsageCollection } = entities.usage

  function getOrganizations() {
    const baseURL = http.defaults.baseURL.replace('/spaces/', '/organizations/')
    return http
      .get('', { baseURL })
      .then((response) => wrapOrganizationCollection(http, response.data), errorHandler)
  }

  function getOrganization(id) {
    const baseURL = http.defaults.baseURL.replace('/spaces/', '/organizations/')
    return http.get('', { baseURL }).then((response) => {
      const org = response.data.items.find((org) => org.sys.id === id)
      if (!org) {
        const error = new Error(
          `No organization was found with the ID ${id} instead got ${JSON.stringify(response)}`
        )
        error.status = 404
        error.statusText = 'Not Found'
        return Promise.reject(error)
      }
      return wrapOrganization(http, org)
    }, errorHandler)
  }

  function getSpaces(query = {}) {
    return http
      .get('', createRequestConfig({ query: query }))
      .then((response) => wrapSpaceCollection(http, response.data), errorHandler)
  }

  function getSpace(id) {
    return endpoints.space.get(http, { spaceId: id }).then((data) => wrapSpace(http, data))
  }

  function createSpace(data, organizationId) {
    return http
      .post('', data, {
        headers: organizationId ? { 'X-Contentful-Organization': organizationId } : {},
      })
      .then((response) => wrapSpace(http, response.data), errorHandler)
  }

  function getOrganizationUsage(organizationId, query = {}) {
    const baseURL = http.defaults.baseURL.replace(
      '/spaces/',
      `/organizations/${organizationId}/organization_periodic_usages`
    )
    return http
      .get('', { baseURL, params: query })
      .then((response) => wrapUsageCollection(http, response.data), errorHandler)
  }

  function getSpaceUsage(organizationId, query = {}) {
    const baseURL = http.defaults.baseURL.replace(
      '/spaces/',
      `/organizations/${organizationId}/space_periodic_usages`
    )
    return http
      .get('', { baseURL, params: query })
      .then((response) => wrapUsageCollection(http, response.data), errorHandler)
  }

  function getCurrentUser() {
    const baseURL = http.defaults.baseURL.replace('/spaces/', '/users/me/')
    return http
      .get('', {
        baseURL,
      })
      .then((response) => wrapUser(http, response.data), errorHandler)
  }

  function createPersonalAccessToken(data) {
    const baseURL = http.defaults.baseURL.replace('/spaces/', '/users/me/access_tokens')
    return http
      .post('', data, {
        baseURL,
      })
      .then((response) => wrapPersonalAccessToken(http, response.data), errorHandler)
  }

  function getPersonalAccessToken(tokenId) {
    const baseURL = http.defaults.baseURL.replace('/spaces/', '/users/me/access_tokens')
    return http
      .get(tokenId, {
        baseURL,
      })
      .then((response) => wrapPersonalAccessToken(http, response.data), errorHandler)
  }

  function getPersonalAccessTokens() {
    const baseURL = http.defaults.baseURL.replace('/spaces/', '/users/me/access_tokens')
    return http
      .get('', {
        baseURL,
      })
      .then((response) => wrapPersonalAccessTokenCollection(http, response.data), errorHandler)
  }

  function rawRequest(opts) {
    return http(opts).then((response) => response.data, errorHandler)
  }

  return {
    getSpaces: getSpaces,
    getSpace: getSpace,
    createSpace: createSpace,
    getOrganization: getOrganization,
    getOrganizations: getOrganizations,
    getCurrentUser: getCurrentUser,
    createPersonalAccessToken: createPersonalAccessToken,
    getPersonalAccessToken: getPersonalAccessToken,
    getPersonalAccessTokens: getPersonalAccessTokens,
    rawRequest: rawRequest,
    getOrganizationUsage: getOrganizationUsage,
    getSpaceUsage: getSpaceUsage,
  }
}
