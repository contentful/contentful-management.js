import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { Except } from 'type-fest'
import { BasicMetaSysProps, SysLink, DefaultElements, MakeRequest } from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'

type AppUploadSys = Except<BasicMetaSysProps, 'version'>

export type AppUploadProps = {
  sys: AppUploadSys & {
    expiresAt: string
    organization: SysLink
  }
}

export interface AppUpload extends AppUploadProps, DefaultElements<AppUploadProps> {
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
   * .then((org) => org.getAppUpload('<app_upload_id>'))
   * .then((appUpload) => appUpload.delete())
   * .then(() => console.log(`App Upload deleted.`))
   * .catch(console.error)
   * ```
   */
  delete(): Promise<void>
}

/**
 * @private
 */
function createAppUploadApi(makeRequest: MakeRequest) {
  const getParams = (data: AppUploadProps) => ({
    organizationId: data.sys.organization.sys.id,
    appUploadId: data.sys.id,
  })

  return {
    delete: function del() {
      const data = this.toPlainObject() as AppUploadProps
      return makeRequest({
        entityType: 'AppUpload',
        action: 'delete',
        params: getParams(data),
      })
    },
  }
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Upload data
 * @return Wrapped App Upload data
 */
export function wrapAppUpload(makeRequest: MakeRequest, data: AppUploadProps): AppUpload {
  const appUpload = toPlainObject(copy(data))
  const appUploadWithMethods = enhanceWithMethods(appUpload, createAppUploadApi(makeRequest))

  return freezeSys(appUploadWithMethods)
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Upload collection data
 * @return Wrapped App Upload collection data
 */
export const wrapAppUploadCollection = wrapCollection(wrapAppUpload)
