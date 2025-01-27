import type { MakeRequest } from './common-types'
import entities from './entities/index'
import type { FunctionProps } from './entities/function'

/**
 * @private
 */
export type ContentfulFunctionApi = ReturnType<typeof createFunctionApi>

/**
 * @private
 */
export default function createFunctionApi(makeRequest: MakeRequest) {
  const { wrapFunction, wrapFunctionCollection } = entities.func

  return {
    /**
     * Gets all Functions for an App Definition
     * @Param organizationId - Organization ID
     * @Param appDefinitionId - App Definition ID
     * @returns a collection of Functions
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.function.getMany({
     *   organizationId: <organizationId>,
     *   appDefinitionId: <appDefinitionId>
     * })
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getManyFunctions() {
      const raw = this.toPlainObject() as FunctionProps
      return makeRequest({
        entityType: 'Function',
        action: 'getMany',
        params: {
          appDefinitionId: raw.sys.appDefinition.sys.id,
          organizationId: raw.sys.organization.sys.id,
        },
      }).then((data) => wrapFunctionCollection(makeRequest, data))
    },

    /**
     * Gets a Function by ID
     * @Param organizationId - Organization ID
     * @Param appDefinitionId - App Definition ID
     * @Param functionId - Function ID
     * @returns a collection of Functions
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.function.get({
     *   organizationId: <organizationId>,
     *   appDefinitionId: <appDefinitionId>,
     *   functionId: <functionId>
     * })
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getFunction(functionId: string) {
      const raw = this.toPlainObject() as FunctionProps
      return makeRequest({
        entityType: 'Function',
        action: 'get',
        params: {
          appDefinitionId: raw.sys.appDefinition.sys.id,
          organizationId: raw.sys.organization.sys.id,
          functionId,
        },
      }).then((data) => wrapFunction(makeRequest, data))
    },

    /**
     * Gets all Functions for an Environment
     * @Param organizationId - Organization ID
     * @Param appDefinitionId - App Definition ID
     * @Param functionId - Function ID
     * @returns a collection of Functions
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.function.get({
     *   environmentId: <environmentId>,
     *   spaceId: <spaceId>,
     *   appInstallationId: <appInstallationId>
     * })
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getManyFunctionsForEnvironment(
      spaceId: string,
      environmentId: string,
      appInstallationId: string
    ) {
      return makeRequest({
        entityType: 'Function',
        action: 'getManyForEnvironment',
        params: {
          spaceId: spaceId,
          environmentId: environmentId,
          appInstallationId: appInstallationId,
        },
      }).then((data) => wrapFunctionCollection(makeRequest, data))
    },
  }
}
