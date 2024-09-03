import type {
  BasicMetaSysProps,
  DefaultElements,
  GetResourceTypeParams,
  MakeRequest,
  SysLink,
} from '../common-types'
import { toPlainObject, freezeSys } from 'contentful-sdk-core'
import copy from 'fast-copy'
import enhanceWithMethods from '../enhance-with-methods'

export type ResourceTypeProps = {
  /**
   * System metadata
   */
  sys: Omit<BasicMetaSysProps, 'version'> & {
    appDefinition: SysLink
    resourceProvider: SysLink
  }
  /**
   * Resource Provider name, TODO
   */
  name: string
  /**
   * Resource Provider defaultFieldMapping, TODO
   */
  defaultFieldMapping: {
    title: string
    subtitle?: string
    description?: string
    externalUrl?: string
    image?: {
      url: string
      altText?: string
    }
    badge?: {
      label: string
      variant: string
    }
  }
}

export type UpsertResourceTypeProps = Omit<ResourceTypeProps, 'sys'>

export interface ResourceType extends ResourceTypeProps, DefaultElements<ResourceTypeProps> {
  upsert(organizationId: string): Promise<ResourceType>
  delete(organizationId: string): Promise<void>
}

/**
 * @private
 */
function createResourceTypeApi(makeRequest: MakeRequest) {
  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @return Object returned from the server with updated changes.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_def_id>'))
     * .then((appDefinition) => appDefinition.getResourceType())
     * .then((resourceType) => {
     *    resourceType.name = '<new_name>'
     *    return resourceType.upsert()
     * })
     * .catch(console.error)
     * ```
     */
    upsert: function upsert(organizationId: string) {
      const data = this.toPlainObject() as ResourceTypeProps

      return makeRequest({
        entityType: 'ResourceType',
        action: 'upsert',
        params: getParams(organizationId, data),
        headers: {},
        payload: getUpsertParams(data),
      }).then((data) => wrapResourceType(makeRequest, data))
    },
    /**
     * Deletes this object on the server.
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_def_id>'))
     * .then((appDefinition) => appDefinition.getResourceType())
     * .then((resourceType) => resourceType.delete())
     * .catch(console.error)
     * ```
     */
    delete: function del(organizationId: string) {
      const data = this.toPlainObject() as ResourceTypeProps

      return makeRequest({
        entityType: 'ResourceType',
        action: 'delete',
        params: getParams(organizationId, data),
      })
    },
  }
}

const getParams = (organizationId: string, data: ResourceTypeProps): GetResourceTypeParams => ({
  organizationId,
  appDefinitionId: data.sys.appDefinition.sys.id,
  resourceTypeId: data.sys.id,
})

const getUpsertParams = (data: ResourceTypeProps): UpsertResourceTypeProps => ({
  name: data.name,
  defaultFieldMapping: data.defaultFieldMapping,
})

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw Resource Provider data
 * @return Wrapped Resource Provider data
 */
export function wrapResourceType(makeRequest: MakeRequest, data: ResourceTypeProps): ResourceType {
  const resourceType = toPlainObject(copy(data))
  const ResourceTypeWithMethods = enhanceWithMethods(
    resourceType,
    createResourceTypeApi(makeRequest)
  )
  return freezeSys(ResourceTypeWithMethods)
}
