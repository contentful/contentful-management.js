/**
 * Contentful Management API Client. Contains methods which allow access to
 * any operations that can be performed with a management token.
 */

import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { createRequestConfig } from 'contentful-sdk-core'
import errorHandler from './error-handler'
import entities from './entities'
import { CollectionProp, QueryOptions } from './common-types'
import { OrganizationProp } from './entities/organization'
import { SpaceProps } from './entities/space'
import { PersonalAccessTokenProp } from './entities/personal-access-token'

export type ClientAPI = ReturnType<typeof createClientApi>

/**
 * Creates API object with methods to access functionality from Contentful's
 * Management API
 * @param {Object} params - API initialization params
 * @prop {Object} http - HTTP client instance
 */
export default function createClientApi({ http }: { http: AxiosInstance }) {
  const { wrapSpace, wrapSpaceCollection } = entities.space
  const { wrapUser } = entities.user
  const {
    wrapPersonalAccessToken,
    wrapPersonalAccessTokenCollection,
  } = entities.personalAccessToken
  const { wrapOrganization, wrapOrganizationCollection } = entities.organization
  const { wrapUsageCollection } = entities.usage

  function getOrganizations() {
    const baseURL = http.defaults?.baseURL?.replace('/spaces/', '/organizations/')
    return http
      .get('', { baseURL })
      .then((response) => wrapOrganizationCollection(http, response.data), errorHandler)
  }

  function getOrganization(id: string) {
    const baseURL = http.defaults?.baseURL?.replace('/spaces/', '/organizations/')
    return http
      .get<CollectionProp<OrganizationProp>>('', { baseURL })
      .then((response) => {
        const org = response.data.items.find((org) => org.sys.id === id)
        if (!org) {
          const error = new Error(
            `No organization was found with the ID ${id} instead got ${JSON.stringify(response)}`
          )
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          error.status = 404
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          error.statusText = 'Not Found'
          return Promise.reject(error)
        }
        return wrapOrganization(http, org)
      }, errorHandler)
  }

  function getSpaces(query: QueryOptions = {}) {
    return http
      .get('', createRequestConfig({ query: query }))
      .then((response) => wrapSpaceCollection(http, response.data), errorHandler)
  }

  function getSpace(id: string) {
    return http.get(id).then((response) => wrapSpace(http, response.data), errorHandler)
  }

  function createSpace(data: Omit<SpaceProps, 'sys'>, organizationId: string) {
    return http
      .post('', data, {
        headers: organizationId ? { 'X-Contentful-Organization': organizationId } : {},
      })
      .then((response) => wrapSpace(http, response.data), errorHandler)
  }

  function getOrganizationUsage(organizationId: string, query: QueryOptions = {}) {
    const baseURL = http.defaults?.baseURL?.replace(
      '/spaces/',
      `/organizations/${organizationId}/organization_periodic_usages`
    )
    return http
      .get('', { baseURL, params: query })
      .then((response) => wrapUsageCollection(http, response.data), errorHandler)
  }

  function getSpaceUsage(organizationId: string, query: QueryOptions = {}) {
    const baseURL = http.defaults?.baseURL?.replace(
      '/spaces/',
      `/organizations/${organizationId}/space_periodic_usages`
    )
    return http
      .get('', { baseURL, params: query })
      .then((response) => wrapUsageCollection(http, response.data), errorHandler)
  }

  function getCurrentUser() {
    const baseURL = http.defaults?.baseURL?.replace('/spaces/', '/users/me/')
    return http
      .get('', {
        baseURL,
      })
      .then((response) => wrapUser(http, response.data), errorHandler)
  }

  function getPersonalAccessToken(tokenId: string) {
    const baseURL = http.defaults?.baseURL?.replace('/spaces/', '/users/me/access_tokens')
    return http
      .get(tokenId, {
        baseURL,
      })
      .then((response) => wrapPersonalAccessToken(http, response.data), errorHandler)
  }

  function getPersonalAccessTokens() {
    const baseURL = http.defaults?.baseURL?.replace('/spaces/', '/users/me/access_tokens')
    return http
      .get('', {
        baseURL,
      })
      .then((response) => wrapPersonalAccessTokenCollection(http, response.data), errorHandler)
  }

  function rawRequest(opts: AxiosRequestConfig) {
    return http(opts).then((response) => response.data, errorHandler)
  }

  return {
    getSpaces: getSpaces,
    getSpace: getSpace,
    createSpace: createSpace,
    getOrganization: getOrganization,
    getOrganizations: getOrganizations,
    getCurrentUser: getCurrentUser,
    /**
     * Creates a personal access token
     * @param data - personal access token config
     * @return Promise for a Token
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.createPersonalAccessToken(
     *  {
     *    "name": "My Token",
     *    "scope": [
     *      "content_management_manage"
     *    ]
     *  }
     * )
     * .then(personalAccessToken => console.log(personalAccessToken.token))
     * .catch(console.error)
     * ```
     */
    createPersonalAccessToken: function createPersonalAccessToken(
      data: Omit<PersonalAccessTokenProp, 'sys'>
    ) {
      const baseURL = http.defaults?.baseURL?.replace('/spaces/', '/users/me/access_tokens')
      return http
        .post('', data, {
          baseURL,
        })
        .then((response) => wrapPersonalAccessToken(http, response.data), errorHandler)
    },
    getPersonalAccessToken: getPersonalAccessToken,
    getPersonalAccessTokens: getPersonalAccessTokens,
    rawRequest: rawRequest,
    getOrganizationUsage: getOrganizationUsage,
    getSpaceUsage: getSpaceUsage,
  }
}
