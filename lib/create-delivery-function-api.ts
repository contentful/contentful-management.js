import { MakeRequest, QueryOptions } from './common-types'
import entities from './entities'
import { AppDefinitionProps } from './entities/app-definition'

/**
 * @private
 */
export type ContentfulDeliveryFunctionAPI = ReturnType<typeof createAppDefinitionApi>

/**
 * @private
 */
export default function createAppDefinitionApi(makeRequest: MakeRequest) {
  const { wrapDeliveryFunctionCollection } = entities.deliveryFunction

  return {
    /**
     * Gets a collection of DeliveryFunctions
     * @return Promise for a collection of DeliveryFunctions
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_def_id>'))
     * .then((appDefinition) => appDefinition.getDeliveryFunctions())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getDeliveryFunctions(query: QueryOptions = {}) {
      const raw = this.toPlainObject() as AppDefinitionProps
      return makeRequest({
        entityType: 'DeliveryFunction',
        action: 'getMany',
        params: { organizationId: raw.sys.organization.sys.id, appDefinitionId: raw.sys.id, query },
      }).then((data) => wrapDeliveryFunctionCollection(makeRequest, data))
    },
  }
}
