import errorHandler from './error-handler'
import entities from './entities'

const {wrapSpace, wrapSpaceCollection} = entities.space

/**
 * Contentful's Management API Client
 */
export class ClientAPI {
  /**
   * @param {Object} params - API initialization params
   * @param {Object} params.http - HTTP client instance
   */
  constructor ({ http }) {
    this._http = http
  }

  /**
   * Gets all spaces
   * @return {Promise<SpaceCollection>} Promise for a collection of Spaces
   * @example
   * client.getSpaces()
   * .then(spaces => console.log(spaces.items))
   */
  getSpaces () {
    console.dir(this._http)
    return this._http.get('')
    .then((response) => wrapSpaceCollection(this._http, response.data), errorHandler)
  }

  /**
   * Gets a space
   * @param {string} id - Space ID
   * @return {Promise<Space, ErrorResponse>} Promise for a Space
   * @example
   * client.getSpace('spaceid')
   * .then(space => console.log(space))
   */
  getSpace (id) {
    return this._http.get(id)
    .then((response) => wrapSpace(this._http, response.data), errorHandler)
  }

  /**
   * Creates a space
   * @see {Space}
   * @param {object} data - Object representation of the Space to be created
   * @param {string} [organizationId] - Organization ID, if the associated token can manage more than one organization.
   * @return {Promise<Space>} Promise for the newly created Space
   * @example
   * client.createSpace({name: 'Space Name'})
   * .then(space => console.log(space))
   */
  createSpace (data, organizationId) {
    return this._http.post('', data, {
      headers: organizationId ? {'X-Contentful-Organization': organizationId} : {}
    })
    .then((response) => wrapSpace(this._http, response.data), errorHandler)
  }
}

/**
 * Creates API object with methods to access functionality from Contentful's
 * Management API
 *
 * @param {Object} params - API initialization params
 * @param {Object} params.http - HTTP client instance
 * @param {Function} params.shouldLinksResolve - Link resolver preconfigured with global setting
 * @return {ClientAPI}
 */
export default function createClientAPI (params) {
  return new ClientAPI(params)
}
