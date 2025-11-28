/**
 * @module
 * @category Entities
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { Except } from 'type-fest'
import { wrapCollection } from '../common-utils'
import type { BasicMetaSysProps, DefaultElements, MakeRequest, SysLink } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'

type AppBundleSys = Except<BasicMetaSysProps, 'version'> & {
  appDefinition: SysLink
  organization: SysLink
}

interface ActionManifestProps {
  id?: string
  name: string
  description: string
  category: string
  path: string
  allowNetworks?: string[]
}

interface FunctionManifestProps {
  id: string
  name: string
  description: string
  path: string
  accepts?: string[]
  allowNetworks?: string[]
}

export type AppBundleFile = {
  name: string
  size: number
  md5: string
}

export type CreateAppBundleProps = {
  appUploadId: string
  comment?: string
  actions?: ActionManifestProps[]
  functions?: FunctionManifestProps[]
}

export type AppBundleProps = {
  /**
   * System metadata
   */
  sys: AppBundleSys
  /**
   * List of all the files that are in this bundle
   */
  files: AppBundleFile[]
  /**
   * A comment that describes this bundle
   */
  comment?: string
  /**
   * List of all functions in the bundle
   */
  functions?: FunctionManifestProps[]
}

export interface AppBundle extends AppBundleProps, DefaultElements<AppBundleProps> {
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
   * .then((appDefinition) => appDefinition.getAppBundle('<app-bundle-id>'))
   * .then((appBundle) => appBundle.delete())
   * .catch(console.error)
   * ```
   */
  delete(): Promise<void>
}

/**
 * @internal
 */
function createAppBundleApi(makeRequest: MakeRequest) {
  const getParams = (data: AppBundleProps) => ({
    organizationId: data.sys.organization.sys.id,
    appDefinitionId: data.sys.appDefinition.sys.id,
    appBundleId: data.sys.id,
  })

  return {
    delete: function del() {
      const data = this.toPlainObject() as AppBundleProps
      return makeRequest({
        entityType: 'AppBundle',
        action: 'delete',
        params: getParams(data),
      })
    },
  }
}

/**
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Bundle data
 * @returns Wrapped App Bundle data
 */
export function wrapAppBundle(makeRequest: MakeRequest, data: AppBundleProps): AppBundle {
  const appBundle = toPlainObject(copy(data))

  const appBundleWithMethods = enhanceWithMethods(appBundle, createAppBundleApi(makeRequest))

  return freezeSys(appBundleWithMethods)
}

/**
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Bundle collection data
 * @returns Wrapped App Bundle collection data
 */
export const wrapAppBundleCollection = wrapCollection(wrapAppBundle)
