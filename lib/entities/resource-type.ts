import type {
  BasicMetaSysProps,
  CursorPaginatedCollectionProp,
  DefaultElements,
  GetResourceTypeParams,
  MakeRequest,
  SysLink,
} from '../common-types'
import { toPlainObject, freezeSys } from 'contentful-sdk-core'
import copy from 'fast-copy'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCursorPaginatedCollection } from '../common-utils'

export type ResourceTypeProps = {
  /**
   * System metadata
   */
  sys: Omit<BasicMetaSysProps, 'version'> & {
    appDefinition: SysLink
    resourceProvider: SysLink
    organization: SysLink
  }
  /**
   * Resource Type name
   */
  name: string
  /**
   * Resource Type defaultFieldMapping
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
const publicResourceTypeFields = ['name'] as const

type OptionalSysFields =
  | 'createdAt'
  | 'createdBy'
  | 'updatedAt'
  | 'updatedBy'
  | 'appDefinition'
  | 'organization'

export type SpaceEnvResourceTypeProps = Pick<
  ResourceTypeProps,
  (typeof publicResourceTypeFields)[number]
> & {
  // we mark timestamps and users as optional to include system types like `Contentful:Entry` into the public response
  sys: Partial<Pick<ResourceTypeProps['sys'], OptionalSysFields>> &
    Omit<ResourceTypeProps['sys'], OptionalSysFields>
}

export type UpsertResourceTypeProps = Omit<ResourceTypeProps, 'sys'>

export interface ResourceType extends ResourceTypeProps, DefaultElements<ResourceTypeProps> {
  upsert(): Promise<ResourceType>
  delete(): Promise<void>
}

/**
 * @private
 */
function createResourceTypeApi(makeRequest: MakeRequest) {
  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @returns Object returned from the server with updated changes.
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
    upsert: function upsert() {
      const data = this.toPlainObject() as ResourceTypeProps

      return makeRequest({
        entityType: 'ResourceType',
        action: 'upsert',
        params: getParams(data),
        headers: {},
        payload: getUpsertParams(data),
      }).then((data) => wrapResourceType(makeRequest, data))
    },
    /**
     * Deletes this object on the server.
     * @returns Promise for the deletion. It contains no data, but the Promise error case should be handled.
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
    delete: function del() {
      const data = this.toPlainObject() as ResourceTypeProps

      return makeRequest({
        entityType: 'ResourceType',
        action: 'delete',
        params: getParams(data),
      })
    },
  }
}

const getParams = (data: ResourceTypeProps): GetResourceTypeParams => ({
  organizationId: data.sys.organization.sys.id,
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
 * @param data - Raw Resource Type data
 * @returns Wrapped Resource Type data
 */
export function wrapResourceType(makeRequest: MakeRequest, data: ResourceTypeProps): ResourceType {
  const resourceType = toPlainObject(copy(data))
  const ResourceTypeWithMethods = enhanceWithMethods(
    resourceType,
    createResourceTypeApi(makeRequest),
  )
  return freezeSys(ResourceTypeWithMethods)
}

export function wrapResourceTypeforEnvironment(
  makeRequest: MakeRequest,
  data: SpaceEnvResourceTypeProps,
): SpaceEnvResourceTypeProps {
  const resourceType = toPlainObject(data)
  return freezeSys(resourceType)
}

export const wrapResourceTypesForEnvironmentCollection: (
  makeRequest: MakeRequest,
  data: CursorPaginatedCollectionProp<SpaceEnvResourceTypeProps>,
) => CursorPaginatedCollectionProp<SpaceEnvResourceTypeProps> = wrapCursorPaginatedCollection(
  wrapResourceTypeforEnvironment,
)
